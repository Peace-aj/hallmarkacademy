"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, GraduationCap, School, BookOpen, TrendingUp, Calendar } from "lucide-react";

import UserCard from "@/components/Card/UserCard";
import CountChartContainer from "@/components/Charts/CountChartContainer";
import AttendanceChartContainer from "@/components/Charts/AttendanceChartContainer";
import FinanceChart from "@/components/Charts/FinanceChart";
import EventCalendarContainer from "@/components/Calendar/EventCalendarContainer";
import Announcements from "@/components/Events/Announcements";

interface SuperProps {
    searchParams: { [key: string]: string | undefined };
}

interface DashboardStats {
    students: number;
    teachers: number;
    classes: number;
    subjects: number;
    parents: number;
    admins: number;
    recentStudents: number;
    recentTeachers: number;
    studentsByGender: Array<{ gender: string; _count: { _all: number } }>;
}

const Super = ({ searchParams }: SuperProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;
        
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        
        if (session.user.role !== "super") {
            router.push(`/dashboard/${session.user.role}`);
            return;
        }

        fetchDashboardData();
    }, [session, status, router]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/stats?role=super`);
            if (!response.ok) throw new Error('Failed to fetch stats');
            
            const data = await response.json();
            setStats(data.stats);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!session || session.user.role !== "super") {
        return null;
    }

    return (
        <section className="p-4 lg:p-6 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                Welcome back, {session.user.name}
                            </h1>
                            <p className="text-gray-600">
                                Here's what's happening at Hallmark Academy today.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 flex-col xl:flex-row">
                    {/* LEFT COLUMN */}
                    <div className="w-full xl:w-2/3 flex flex-col gap-8">
                        {/* USER CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            <UserCard
                                type="admin"
                                icon={Users}
                                bgColor="bg-blue-100"
                                color="text-blue-600"
                                delta={`${stats?.admins || 0} total`}
                                deltaLabel="administrators"
                                data={{ count: stats?.admins || 0 }}
                            />
                            <UserCard
                                type="teacher"
                                icon={GraduationCap}
                                bgColor="bg-green-100"
                                color="text-green-600"
                                delta={`${stats?.recentTeachers || 0} new`}
                                deltaLabel="this month"
                                data={{ count: stats?.teachers || 0 }}
                            />
                            <UserCard
                                type="student"
                                icon={School}
                                bgColor="bg-purple-100"
                                color="text-purple-600"
                                delta={`${stats?.recentStudents || 0} new`}
                                deltaLabel="this month"
                                data={{ count: stats?.students || 0 }}
                            />
                            <UserCard
                                type="parent"
                                icon={Users}
                                bgColor="bg-orange-100"
                                color="text-orange-600"
                                delta={`${stats?.parents || 0} total`}
                                deltaLabel="registered"
                                data={{ count: stats?.parents || 0 }}
                            />
                        </div>

                        {/* MIDDLE CHARTS */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <div className="lg:col-span-2 h-[450px]">
                                <CountChartContainer data={stats?.studentsByGender} />
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