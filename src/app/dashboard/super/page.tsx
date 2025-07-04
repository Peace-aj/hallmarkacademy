"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiUsers } from "react-icons/fi";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";

import UserCard from "@/components/Card/UserCard";
import CountChartContainer from "@/components/Charts/CountChartContainer";
import AttendanceChartContainer from "@/components/Charts/AttendanceChartContainer";
import FinanceChart from "@/components/Charts/FinanceChart";
import EventCalendarContainer from "@/components/Calendar/EventCalendarContainer";
import Announcements from "@/components/Events/Announcements";

interface SuperProps {
    searchParams: { [key: string]: string | undefined };
}

const Super = ({ searchParams }: SuperProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Still loading
        
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        
        if (session.user.role !== "super") {
            router.push(`/dashboard/${session.user.role}`);
            return;
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!session || session.user.role !== "super") {
        return null; // Will redirect
    }

    return (
        <section className="p-4 lg:p-6 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                        Welcome back, {session.user.name}
                    </h1>
                    <p className="text-gray-600">
                        Here's what's happening at Hallmark Academy today.
                    </p>
                </div>

                <div className="flex gap-6 flex-col xl:flex-row">
                    {/* LEFT COLUMN */}
                    <div className="w-full xl:w-2/3 flex flex-col gap-8">
                        {/* USER CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            <UserCard
                                type="admin"
                                icon={FiUsers}
                                bgColor="bg-blue-100"
                                color="text-blue-500"
                                delta="2 new"
                                deltaLabel="this month"
                            />
                            <UserCard
                                type="teacher"
                                icon={FaChalkboardTeacher}
                                bgColor="bg-orange-100"
                                color="text-orange-500"
                                delta="5 new"
                                deltaLabel="this month"
                            />
                            <UserCard
                                type="student"
                                icon={FaUserGraduate}
                                bgColor="bg-cyan-100"
                                color="text-cyan-500"
                                delta="24 new"
                                deltaLabel="this month"
                            />
                            <UserCard
                                type="parent"
                                icon={MdFamilyRestroom}
                                bgColor="bg-purple-100"
                                color="text-purple-500"
                                delta="18 new"
                                deltaLabel="this month"
                            />
                        </div>

                        {/* MIDDLE CHARTS */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <div className="lg:col-span-2 h-[450px]">
                                <CountChartContainer />
                            </div>
                            <div className="lg:col-span-3 h-[450px]">
                                <AttendanceChartContainer />
                            </div>
                        </div>

                        {/* BOTTOM CHART */}
                        <div className="w-full h-[500px]">
                            <FinanceChart />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full xl:w-1/3 flex flex-col gap-8">
                        <EventCalendarContainer searchParams={searchParams} />
                        <Announcements />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Super;