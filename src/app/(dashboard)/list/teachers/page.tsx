import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import Teachers from './Teachers';

export default async function TeachersPage() {
    const user = await currentUser();
    const role = (user?.publicMetadata.role as string) || 'guest';
    // Fetch teacher data on the server
    const teachers = await prisma.teacher.findMany({});

    return <Teachers initialTeachers={teachers} role={role} />;
}