import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "../Events/EventList";

interface EventCalendarContainerProps {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

const EventCalendarContainer = async ({
    searchParams,
}: EventCalendarContainerProps) => {
    const { date } = await searchParams;

    return (
        <div className="bg-white p-4 rounded-md">
            <EventCalendar />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Events</h1>
                <Image
                    src="/assets/moreDark.png"
                    alt="More options"
                    width={20}
                    height={20}
                />
            </div>
            <div className="flex flex-col gap-4">
                <EventList dateParam={date} />
            </div>
        </div>
    );
};

export default EventCalendarContainer;
