"use client";

import { useState, useEffect, useCallback } from "react";
import { Skeleton } from "primereact/skeleton";

interface Event {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    classId?: string;
}

const EventList = ({ dateParam }: { dateParam: string | undefined }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const date = dateParam ? new Date(dateParam) : new Date();

    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // For now, we'll use mock data since there's no events API endpoint
            // In a real application, you would fetch from /api/events
            const mockEvents = [
                {
                    id: 1,
                    title: "Mathematics Quiz",
                    description: "Weekly mathematics assessment for JSS 2 students",
                    startTime: new Date().toISOString(),
                    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                    classId: null
                },
                {
                    id: 2,
                    title: "Science Fair Preparation",
                    description: "Students prepare their projects for the upcoming science fair",
                    startTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
                    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
                    classId: null
                },
                {
                    id: 3,
                    title: "Parent-Teacher Meeting",
                    description: "Monthly meeting to discuss student progress",
                    startTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
                    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
                    classId: null
                }
            ];

            // Filter events for the selected date
            const selectedDate = date.toDateString();
            const filteredEvents = mockEvents.filter(event => {
                const eventDate = new Date(event.startTime).toDateString();
                return eventDate === selectedDate;
            });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            setEvents(filteredEvents);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError(err instanceof Error ? err.message : 'Failed to load events');
        } finally {
            setLoading(false);
        }
    }, [date]);

    useEffect(() => {
        // Only fetch when date changes
        fetchEvents();
    }, [fetchEvents]);

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <Skeleton width="70%" height="1.2rem" />
                            <Skeleton width="20%" height="1rem" />
                        </div>
                        <Skeleton width="100%" height="2rem" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">⚠️</div>
                <p>Failed to load events</p>
                <button 
                    onClick={fetchEvents}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📅</div>
                <p>No events scheduled for this date</p>
                <p className="text-sm mt-1">Check other dates or add new events</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {events.map((event) => (
                <div
                    className="p-4 rounded-lg border-2 border-gray-100 border-t-4 odd:border-t-blue-400 even:border-t-purple-400 hover:shadow-sm transition-shadow cursor-pointer"
                    key={event.id}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="font-semibold text-gray-700">{event.title}</h1>
                        <span className="text-gray-400 text-xs">
                            {new Date(event.startTime).toLocaleTimeString("en-UK", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                </div>
            ))}
        </div>
    );
};

export default EventList;