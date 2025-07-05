import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  classId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const classId = searchParams.get("classId");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (classId) {
      where.classId = classId;
    }
    
    if (from) {
      where.startTime = { ...where.startTime, gte: new Date(from) };
    }
    
    if (to) {
      where.startTime = { ...where.startTime, lte: new Date(to) };
    }

    // Role-based filtering
    switch (session.user.role) {
      case "student":
        // Students see events for their class
        const student = await prisma.student.findUnique({
          where: { id: session.user.id },
          select: { classid: true }
        });
        if (student) {
          where.OR = [
            { classId: student.classid },
            { classId: null } // General events
          ];
        }
        break;
      case "teacher":
        // Teachers see events for classes they teach
        const teacherClasses = await prisma.lesson.findMany({
          where: { teacherid: session.user.id },
          select: { classid: true },
          distinct: ['classid']
        });
        const classIds = teacherClasses.map(l => l.classid);
        where.OR = [
          { classId: { in: classIds } },
          { classId: null } // General events
        ];
        break;
      case "parent":
        // Parents see events for their children's classes
        const children = await prisma.student.findMany({
          where: { parentid: session.user.id },
          select: { classid: true }
        });
        const childClassIds = children.map(c => c.classid);
        where.OR = [
          { classId: { in: childClassIds } },
          { classId: null } // General events
        ];
        break;
      // admin, super, management can see all events
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        include: {
          class: {
            select: {
              name: true
            }
          }
        },
        orderBy: { startTime: "asc" },
      }),
      prisma.event.count({ where }),
    ]);

    return NextResponse.json({
      data: events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["admin", "super", "management", "teacher"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = eventSchema.parse(body);

    const event = await prisma.event.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        startTime: new Date(validatedData.startTime),
        endTime: new Date(validatedData.endTime),
        classId: validatedData.classId || null,
      },
      include: {
        class: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}