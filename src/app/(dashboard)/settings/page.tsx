import { currentUser } from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';

import SuperSettings from "./super";

const Settings = async () => {
    const user = await currentUser();
    const role = (user?.publicMetadata.role as string) || 'guest';

    const schools = await prisma.school.findMany({});
    const terms = await prisma.term.findMany({});
    const classes = await prisma.class.findMany({});
    const teachers = await prisma.teacher.findMany({});

    let content = (
        <p>This is the setup page</p>
    )
    if (role === 'super') {
        const initialData = {
            schools: schools,
            terms: terms,
            classes: classes,
            teachers: teachers,
        }
        content = (
            <SuperSettings initialData={initialData} role={role} />
        )
    }
    return (
        <section className='flex flex-col bg-white rounded-md shadow-md m-4'>
            {content}
        </section>
    )
}

export default Settings;