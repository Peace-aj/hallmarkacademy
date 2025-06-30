import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { schoolSchema } from "@/lib/schemas";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const schools = await prisma.school.findMany({
            include: {
                _count: {
                    select: {
                        students: true,
                        teachers: true,
                        subjects: true
                    }
                }
            }
        });

        return NextResponse.json(schools);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !["super", "admin"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = schoolSchema.parse(body);

        const school = await prisma.school.create({
            data: {
                name: validatedData.name,
                subtitle: validatedData.subtitle || null,
                schooltype: validatedData.schooltype,
                email: validatedData.email,
                phone: validatedData.phone || null,
                address: validatedData.address,
                logo: validatedData.logo || null,
                contactperson: validatedData.contactperson || null,
                contactpersonphone: validatedData.contactpersonphone || null,
                contactpersonemail: validatedData.contactpersonemail || null,
                youtube: validatedData.youtube || null,
                facebook: validatedData.facebook || null,
                regnumbercount: validatedData.regnumbercount || 0,
                regnumberprepend: validatedData.regnumberprepend || null,
                regnumberappend: validatedData.regnumberappend || null,
            }
        });

        return NextResponse.json(school, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create school" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !["super", "admin"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse all ?ids=… params from the URL
        const url = new URL(request.url);
        const ids = url.searchParams.getAll("ids");

        if (ids.length === 0 || ids.some(id => !id)) {
            return NextResponse.json(
                { error: "Valid school ID(s) are required" },
                { status: 400 }
            );
        }

        // Bulk-delete those schools
        await prisma.school.deleteMany({
            where: {
                id: { in: ids },
            },
        });

        // 204 No Content on success
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting schools:", error);
        if (error instanceof NextResponse) throw error;

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}