// components/BigCalendarContainer.tsx
import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

type BigCalendarContainerProps = {
    type: "teacherid" | "classid";
    id: string | number;
};

const BigCalendarContainer = async ({
    type,
    id,
}: BigCalendarContainerProps) => {
    // Normalize to string since Prisma model fields are String
    const idStr = String(id);

    // Build a typed filter matching your Prisma schema
    const filter =
        type === "teacherid"
            ? { teacherid: idStr }
            : { classid: idStr };

    // Query lessons using the correct filter shape
    const lessons = await prisma.lesson.findMany({
        where: filter,
    });

    // Map lessons into calendar event shapes
    const events = lessons.map((lesson) => ({
        title: lesson.name,
        start: lesson.startTime,
        end: lesson.endTime,
    }));

    // Adjust dates to the current week
    const schedule = adjustScheduleToCurrentWeek(events);

    return (
        <div className="w-full h-full">
            <BigCalendar data={schedule} />
        </div>
    );
};

export default BigCalendarContainer;
