import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role") || session.user.role;

    // Get current date for recent activity calculations
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    let dashboardData: any = {};

    switch (role) {
      case "super":
      case "admin":
      case "management":
        // Administrative dashboard data
        const [
          totalStudents,
          totalTeachers,
          totalParents,
          totalClasses,
          totalSubjects,
          totalSchools,
          recentStudents,
          recentTeachers,
          studentsByGender,
          recentAnnouncements,
          upcomingEvents,
          attendanceStats
        ] = await Promise.all([
          prisma.student.count(),
          prisma.teacher.count(),
          prisma.parent.count(),
          prisma.class.count(),
          prisma.subject.count(),
          prisma.school.count(),
          prisma.student.count({
            where: { createdAt: { gte: thirtyDaysAgo } }
          }),
          prisma.teacher.count({
            where: { createdAt: { gte: thirtyDaysAgo } }
          }),
          prisma.student.groupBy({
            by: ['gender'],
            _count: { _all: true },
          }),
          prisma.announcement.findMany({
            take: 5,
            orderBy: { date: "desc" },
            include: {
              class: { select: { name: true } }
            }
          }),
          prisma.event.findMany({
            take: 5,
            where: {
              startTime: { gte: new Date() }
            },
            orderBy: { startTime: "asc" },
            include: {
              class: { select: { name: true } }
            }
          }),
          prisma.attendance.findMany({
            where: {
              date: { gte: sevenDaysAgo }
            },
            select: {
              date: true,
              present: true,
            }
          })
        ]);

        // Process attendance data for charts
        const attendanceByDay = attendanceStats.reduce((acc: any, record) => {
          const day = new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' });
          if (!acc[day]) acc[day] = { present: 0, absent: 0 };
          if (record.present) {
            acc[day].present++;
          } else {
            acc[day].absent++;
          }
          return acc;
        }, {});

        const chartData = Object.entries(attendanceByDay).map(([day, data]: [string, any]) => ({
          name: day,
          present: data.present,
          absent: data.absent,
        }));

        dashboardData = {
          overview: {
            students: totalStudents,
            teachers: totalTeachers,
            parents: totalParents,
            classes: totalClasses,
            subjects: totalSubjects,
            schools: totalSchools,
          },
          recent: {
            students: recentStudents,
            teachers: recentTeachers,
          },
          charts: {
            studentsByGender,
            attendance: chartData,
          },
          activity: {
            announcements: recentAnnouncements,
            events: upcomingEvents,
          }
        };
        break;

      case "teacher":
        // Teacher dashboard data
        const teacherSubjects = await prisma.subject.findMany({
          where: {
            teachers: {
              some: { id: session.user.id }
            }
          },
          include: {
            _count: {
              select: {
                assignments: true,
                tests: true,
                lessons: true
              }
            }
          }
        });

        const teacherLessons = await prisma.lesson.findMany({
          where: { teacherid: session.user.id },
          include: {
            class: {
              include: {
                _count: {
                  select: { students: true }
                }
              }
            }
          }
        });

        const uniqueClassIds = [...new Set(teacherLessons.map(lesson => lesson.classid))];
        const totalStudentsTeaching = teacherLessons.reduce((total, lesson) => {
          return total + (lesson.class._count.students || 0);
        }, 0);

        const [teacherAssignments, teacherTests, pendingTests, completedTests] = await Promise.all([
          prisma.assignment.count({
            where: { teacherid: session.user.id }
          }),
          prisma.test.count({
            where: { teacherid: session.user.id }
          }),
          prisma.test.count({
            where: { 
              teacherid: session.user.id,
              status: "Pending"
            }
          }),
          prisma.test.count({
            where: { 
              teacherid: session.user.id,
              status: "Completed"
            }
          })
        ]);

        dashboardData = {
          overview: {
            subjects: teacherSubjects.length,
            lessons: teacherLessons.length,
            students: totalStudentsTeaching,
            classes: uniqueClassIds.length,
            assignments: teacherAssignments,
            tests: teacherTests,
          },
          activity: {
            pendingTests,
            completedTests,
          }
        };
        break;

      case "student":
        // Student dashboard data
        const studentData = await prisma.student.findUnique({
          where: { id: session.user.id },
          include: {
            class: true,
            parent: {
              select: {
                firstname: true,
                surname: true,
                phone: true,
                email: true
              }
            },
            school: {
              select: { name: true }
            }
          }
        });

        if (studentData) {
          const [
            classmatesCount,
            studentAssignments,
            studentTests,
            studentAttendance,
            totalAttendanceDays,
            studentSubmissions,
            studentAnswers
          ] = await Promise.all([
            prisma.student.count({
              where: { 
                classid: studentData.classid,
                id: { not: session.user.id }
              }
            }),
            prisma.assignment.count({
              where: {
                students: {
                  some: { id: session.user.id }
                }
              }
            }),
            prisma.test.count({
              where: {
                subject: {
                  lessons: {
                    some: {
                      classid: studentData.classid
                    }
                  }
                }
              }
            }),
            prisma.attendance.count({
              where: {
                studentId: session.user.id,
                present: true,
                date: { gte: thirtyDaysAgo }
              }
            }),
            prisma.attendance.count({
              where: {
                studentId: session.user.id,
                date: { gte: thirtyDaysAgo }
              }
            }),
            prisma.submission.count({
              where: { studentId: session.user.id }
            }),
            prisma.answer.count({
              where: { studentid: session.user.id }
            })
          ]);

          dashboardData = {
            overview: {
              class: studentData.class?.name || "Not assigned",
              classmates: classmatesCount,
              assignments: studentAssignments,
              tests: studentTests,
              submissions: studentSubmissions,
              answers: studentAnswers,
            },
            attendance: {
              present: studentAttendance,
              total: totalAttendanceDays,
              percentage: totalAttendanceDays > 0 ? Math.round((studentAttendance / totalAttendanceDays) * 100) : 0
            },
            profile: {
              parent: {
                name: `${studentData.parent.firstname} ${studentData.parent.surname}`,
                phone: studentData.parent.phone,
                email: studentData.parent.email
              },
              school: {
                name: studentData.school?.name || "Unknown"
              }
            }
          };
        }
        break;

      case "parent":
        // Parent dashboard data
        const children = await prisma.student.findMany({
          where: { parentid: session.user.id },
          include: {
            class: { select: { name: true } },
            school: { select: { name: true } },
            payments: {
              select: {
                amount: true,
                createdAt: true
              }
            }
          }
        });

        const totalFees = children.reduce((total, child) => {
          return total + child.payments.reduce((sum, payment) => sum + payment.amount, 0);
        }, 0);

        const [
          totalPayments,
          recentPayments,
          childrenAttendance,
          totalChildrenAttendanceDays
        ] = await Promise.all([
          prisma.payment.count({
            where: {
              student: {
                parentid: session.user.id
              }
            }
          }),
          prisma.payment.count({
            where: {
              student: {
                parentid: session.user.id
              },
              createdAt: { gte: thirtyDaysAgo }
            }
          }),
          prisma.attendance.count({
            where: {
              student: {
                parentid: session.user.id
              },
              present: true,
              date: { gte: sevenDaysAgo }
            }
          }),
          prisma.attendance.count({
            where: {
              student: {
                parentid: session.user.id
              },
              date: { gte: sevenDaysAgo }
            }
          })
        ]);

        dashboardData = {
          overview: {
            children: children.length,
            totalPayments,
            totalFeesPaid: totalFees,
            recentPayments,
          },
          children: children.map(child => ({
            id: child.id,
            name: `${child.firstname} ${child.surname}`,
            class: child.class?.name || "Not assigned",
            admissionNumber: child.admissionnumber,
            school: child.school?.name || "Unknown"
          })),
          attendance: {
            present: childrenAttendance,
            total: totalChildrenAttendanceDays,
            percentage: totalChildrenAttendanceDays > 0 ? Math.round((childrenAttendance / totalChildrenAttendanceDays) * 100) : 0
          }
        };
        break;

      default:
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Get current term information
    const currentTerm = await prisma.term.findFirst({
      where: { status: "Active" },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({
      success: true,
      role,
      data: dashboardData,
      currentTerm: currentTerm ? {
        id: currentTerm.id,
        session: currentTerm.session,
        term: currentTerm.term,
        start: currentTerm.start,
        end: currentTerm.end,
        nextterm: currentTerm.nextterm,
        daysOpen: currentTerm.daysopen,
        status: currentTerm.status
      } : null,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch dashboard data",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}