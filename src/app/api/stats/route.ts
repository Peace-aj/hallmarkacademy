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

        // Base stats that all roles can see
        const baseStats = {
            students: await prisma.student.count(),
            teachers: await prisma.teacher.count(),
            classes: await prisma.class.count(),
            subjects: await prisma.subject.count(),
        };

        // Role-specific stats
        let roleSpecificStats = {};

        switch (role) {
            case "super":
            case "management":
            case "admin":
                roleSpecificStats = {
                    ...baseStats,
                    parents: await prisma.parent.count(),
                    admins: await prisma.administration.count({ where: { role: "Admin" } }),
                    announcements: await prisma.announcement.count(),
                    events: await prisma.event.count(),
                    // Gender distribution
                    studentsByGender: await prisma.student.groupBy({
                        by: ['gender'],
                        _count: { _all: true },
                    }),
                    // Recent activity
                    recentStudents: await prisma.student.count({
                        where: {
                            createdAt: {
                                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
                            }
                        }
                    }),
                    recentTeachers: await prisma.teacher.count({
                        where: {
                            createdAt: {
                                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                            }
                        }
                    }),
                };
                break;

            case "teacher":
                const teacherSubjects = await prisma.subject.findMany({
                    where: { teachers: { some: { id: session.user.id } } },
                    include: { _count: { select: { students: true } } }
                });
                
                roleSpecificStats = {
                    mySubjects: teacherSubjects.length,
                    myStudents: teacherSubjects.reduce((total, subject) => total + subject._count.students, 0),
                    myClasses: await prisma.class.count({
                        where: { lessons: { some: { teacherid: session.user.id } } }
                    }),
                    assignments: await prisma.assignment.count({
                        where: { teacherid: session.user.id }
                    }),
                };
                break;

            case "student":
                const studentData = await prisma.student.findUnique({
                    where: { id: session.user.id },
                    include: { class: true }
                });
                
                roleSpecificStats = {
                    myClass: studentData?.class?.name || "Not assigned",
                    classmates: await prisma.student.count({
                        where: { classid: studentData?.classid }
                    }) - 1, // Exclude self
                    assignments: await prisma.assignment.count({
                        where: { students: { some: { id: session.user.id } } }
                    }),
                    attendance: await prisma.attendance.count({
                        where: { 
                            studentId: session.user.id,
                            present: true,
                            date: {
                                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                            }
                        }
                    }),
                };
                break;

            case "parent":
                const children = await prisma.student.findMany({
                    where: { parentid: session.user.id },
                    include: { class: true }
                });
                
                roleSpecificStats = {
                    children: children.length,
                    childrenNames: children.map(child => `${child.firstname} ${child.surname}`),
                    totalFees: children.length * 50000, // Mock calculation
                    paidFees: children.length * 30000, // Mock calculation
                };
                break;

            default:
                roleSpecificStats = baseStats;
        }

        // Attendance data for charts (last 7 days)
        const attendanceData = await prisma.attendance.findMany({
            where: {
                date: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
            },
            select: {
                date: true,
                present: true,
            }
        });

        // Process attendance for chart
        const attendanceByDay = attendanceData.reduce((acc: any, record) => {
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

        return NextResponse.json({
            success: true,
            role,
            stats: roleSpecificStats,
            charts: {
                attendance: chartData,
                studentsByGender: roleSpecificStats.studentsByGender || [],
            },
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch statistics" },
            { status: 500 }
        );
    }
}