"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdLibraryBooks, MdSubject } from "react-icons/md";
import { BookOpen, Users, Calendar, TrendingUp } from "lucide-react";

import Announcements from "@/components/Events/Announcements";
import BigCalendarContainer from "@/components/Calendar/BigCalendarContainer";
import EventCalendarContainer from "@/components/Calendar/EventCalendarContainer";
import UserCard from "@/components/Card/UserCard";

interface TeacherDashboardData {
    overview: {
        subjects: number;
        lessons: number;
        students: number;
        classes: number;
        assignments: number;
        tests: number;
    };
    activity: {
        pendingTests: number;
        completedTests: number;
    };
}

const Teacher = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState<TeacherDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Memoize searchParams to prevent unnecessary re-renders
    const searchParams = useMemo(() => {
        if (typeof window !== 'undefined') {
            return new URLSearchParams(window.location.search);
        }
        return new URLSearchParams();
    }, []);

    useEffect(() => {
        if (status === "loading") return;
        
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        
        if (session.user.role !== "teacher") {
            router.push(`/dashboard/${session.user.role}`);
            return;
        }

        fetchDashboardData();
    }, [session, status, router]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`/api/dashboard?role=teacher`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'default'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success && data.data) {
                setDashboardData(data.data);
            } else {
                throw new Error(data.details || 'Failed to fetch dashboard data');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
            
            // Set fallback data to prevent blank dashboard
            setDashboardData({
                overview: {
                    subjects: 0,
                    lessons: 0,
                    students: 0,
                    classes: 0,
                    assignments: 0,
                    tests: 0,
                },
                activity: {
                    pendingTests: 0,
                    completedTests: 0,
                }
            });
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

    if (!session || session.user.role !== "teacher") {
        return null;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchDashboardData}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="p-4 lg:p-6 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                Welcome back, {session.user.name}
                            </h1>
                            <p className="text-gray-600">
                                Here's your teaching overview for today.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 flex-col xl:flex-row">
                    {/* LEFT COLUMN */}
                    <div className="w-full xl:w-2/3 flex flex-col gap-8">
                        {/* USER CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            <UserCard
                                type="student"
                                icon={FaUserGraduate}
                                bgColor="bg-cyan-100"
                                color="text-cyan-500"
                                delta={`${dashboardData?.overview.classes || 0} classes`}
                                deltaLabel="teaching"
                                data={{ count: dashboardData?.overview.students || 0 }}
                            />
                            <UserCard
                                type="subject"
                                icon={MdSubject}
                                bgColor="bg-orange-100"
                                color="text-orange-500"
                                delta={`${dashboardData?.overview.assignments || 0} assignments`}
                                deltaLabel="created"
                                data={{ count: dashboardData?.overview.subjects || 0 }}
                            />
                            <UserCard
                                type="lesson"
                                icon={MdLibraryBooks}
                                bgColor="bg-purple-100"
                                color="text-purple-500"
                                delta={`${dashboardData?.overview.tests || 0} tests`}
                                deltaLabel="scheduled"
                                data={{ count: dashboardData?.overview.lessons || 0 }}
                            />
                        </div>

                        {/* SCHEDULE */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="text-blue-600" size={24} />
                                <h2 className="text-xl font-semibold text-gray-800">My Schedule</h2>
                            </div>
                            <div className="h-[500px]">
                                <BigCalendarContainer type="teacherid" id={session.user.id} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full xl:w-1/3 flex flex-col gap-8">
                        <EventCalendarContainer searchParams={Object.fromEntries(searchParams)} />
                        <Announcements />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teacher;