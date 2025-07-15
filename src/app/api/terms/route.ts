import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const termSchema = z.object({
  session: z.string().min(1, "Session is required"),
  term: z.enum(["First", "Second", "Third"]),
  start: z.string().datetime(),
  end: z.string().datetime(),
  nextterm: z.string().datetime(),
  daysopen: z.number().int().min(1).optional(),
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
    const status = searchParams.get("status");
    const session_param = searchParams.get("session");

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (session_param) where.session = session_param;

    const [terms, total] = await Promise.all([
      prisma.term.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { status: "desc" }, // Active terms first
          { createdAt: "desc" }
        ],
      }),
      prisma.term.count({ where }),
    ]);

    return NextResponse.json({
      data: terms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching terms:", error);
    return NextResponse.json(
      { error: "Failed to fetch terms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !["admin", "super", "management"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = termSchema.parse(body);

    // Calculate days open if not provided
    const startDate = new Date(validatedData.start);
    const endDate = new Date(validatedData.end);
    const daysopen = validatedData.daysopen || Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Start a transaction to handle term creation and status updates
    const result = await prisma.$transaction(async (tx) => {
      // Set all existing terms to Inactive
      await tx.term.updateMany({
        where: { status: "Active" },
        data: { status: "Inactive" }
      });

      // Create new term as Active
      const newTerm = await tx.term.create({
        data: {
          session: validatedData.session,
          term: validatedData.term,
          start: startDate,
          end: endDate,
          nextterm: new Date(validatedData.nextterm),
          daysopen,
          status: "Active", // New term is always active
        },
      });

      return newTerm;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating term:", error);
    return NextResponse.json(
      { error: "Failed to create term" },
      { status: 500 }
    );
  }
}