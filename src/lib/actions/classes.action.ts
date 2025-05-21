"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { ClassSchema, classSchema } from "../schemas";

/**
 * Standard response for actions
 */
interface ActionResponse {
    success: boolean;
    error: boolean;
    message: string;
    data?: any;
}

/**
 * Create a new Class record.
 * @param _prev previous response (not used)
 * @param payload plain object matching ClassSchema
 */
export async function create(
    _prev: ActionResponse,
    payload: ClassSchema
): Promise<ActionResponse> {
    try {
        const parsed = classSchema.safeParse(payload);
        if (!parsed.success) {
            return { success: false, error: true, message: "Validation failed." };
        }

        const formmasterid =
            parsed.data.formmasterid && parsed.data.formmasterid.trim() !== ""
                ? parsed.data.formmasterid
                : null;

        if (formmasterid) {
            const teacher = await prisma.teacher.findUnique({
                where: { id: formmasterid },
            });
            if (!teacher) {
                return {
                    success: false,
                    error: true,
                    message: "A teacher with that ID does not exist.",
                };
            }
        }

        const data = await prisma.class.create({
            data: {
                name: parsed.data.name,
                category: parsed.data.category,
                level: parsed.data.level,
                capacity: parsed.data.capacity ?? null,
                formmaster: formmasterid
                    ? { connect: { id: formmasterid } }
                    : undefined,
            },
        });

        revalidatePath("/classes");
        return {
            success: true,
            error: false,
            message: "Class created successfully.",
            data,
        };
    } catch (err: any) {
        if (err.code === "P2002") {
            const fields = err.meta.target as string[];
            let msg = "Unique constraint violation.";
            if (fields.includes("name")) {
                msg = "A class with that name already exists.";
            }
            return { success: false, error: true, message: msg };
        }
        console.error("An error occurred:", err);
        return { success: false, error: true, message: "Failed to create class." };
    }
}


/**
 * Update an existing Class record.
 */
export async function update(
    _prev: ActionResponse,
    payload: ClassSchema
): Promise<ActionResponse> {
    try {
        const parsed = classSchema.safeParse(payload);
        if (!parsed.success || !parsed.data.id) {
            return { success: false, error: true, message: "Validation failed or missing ID." };
        }

        const data = await prisma.class.update({
            where: { id: parsed.data.id },
            data: {
                name: parsed.data.name,
                category: parsed.data.category,
                level: parsed.data.level,
                capacity: parsed.data.capacity ?? undefined,
                formmasterid: parsed.data.formmasterid ?? undefined,
                updateAt: new Date(),
            },
        });

        revalidatePath("/classes");
        return { success: true, error: false, message: "Class updated successfully.", data };
    } catch (err: any) {
        if (err.code === "P2002") {
            const fields = err.meta.target as string[];
            let msg = "Unique constraint violation.";
            if (fields.includes("name")) {
                msg = "A class with that name already exists.";
            }
            return { success: false, error: true, message: msg };
        }
        return { success: false, error: true, message: "Failed to update class." };
    }
}

/**
 * Delete one or more Class records.
 */
export async function remove(
    _prev: ActionResponse = { success: false, error: false, message: "" },
    ids: string[]
): Promise<ActionResponse> {
    try {
        const result = await prisma.class.deleteMany({ where: { id: { in: ids } } });
        revalidatePath("/classes");
        return {
            success: true,
            error: false,
            message: `${result.count} class(es) deleted successfully.`,
            data: { count: result.count },
        };
    } catch (err: any) {
        return { success: false, error: true, message: "Failed to delete class(es)." };
    }
}
