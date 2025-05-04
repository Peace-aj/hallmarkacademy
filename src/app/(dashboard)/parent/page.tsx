import { auth } from "@clerk/nextjs/server";

import Announcements from "@/components/Events/Announcements";
import BigCalendarContainer from "@/components/Calendar/BigCalendarContainer";
import SchoolFee from "@/components/Charts/SchoolFee";
import prisma from "@/lib/prisma";

const Parent = async () => {
    const { userId } = await auth();
    const currentUserId = userId;

    const students = await prisma.student.findMany({
        where: {
            parentid: currentUserId!,
        },
    });

    return (
        <section className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
            {/* LEFT */}
            <div className="w-full xl:w-2/3 flex flex-col gap-8">
                <div className="">
                    {students.length <= 0 ? (
                        <div className="h-full bg-white p-4 rounded-md">
                            <h1 className="text-xl font-semibold">No students schedules found</h1>
                        </div>
                    ) : students.map((student) => (
                        <div className="w-full xl:w-2/3" key={student.id}>
                            <div className="h-full bg-white p-4 rounded-md">
                                <h1 className="text-xl font-semibold">
                                    Schedule ({student.firstname + " " + student.surname})
                                </h1>
                                <BigCalendarContainer type="classid" id={student.classid} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-full bg-white p-4 rounded-md">
                    <SchoolFee />
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </section>
    );
};

export default Parent;
