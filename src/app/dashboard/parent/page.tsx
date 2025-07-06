"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Users, DollarSign, Calendar, TrendingUp, Clock, BookOpen } from "lucide-react";

import Announcements from "@/components/Events/Announcements";
import BigCalendarContainer from "@/components/Calendar/BigCalendarContainer";
import SchoolFee from "@/components/Charts/SchoolFee";
import UserCard from "@/components/Card/UserCard";

interface ParentDashboardData {
    overview: {
        children: number;
        totalPayments: number;
        totalFeesPaid: number;
        recentPayments: number;
    };
    children: Array<{
        id: string;
        name: string;
        class: string;
        admissionNumber: string;
        school: string;
    }>;
    attendance: {
        present: number;
        total: number;
        percentage: number;
    };
}

const Parent = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState<ParentDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "loading") return;
        
        if (!session) {
            router.push("/auth/signin");
            return;
        }
        
        if (session.user.role !== "parent") {
            router.push(`/dashboard/${session.user.role}`);
            return;
        }

        fetchDashboardData();
    }, [session, status, router]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`/api/dashboard?role=parent`, {
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
                    children: 0,
                    totalPayments: 0,
                    totalFeesPaid: 0,
                    recentPayments: 0,
                },
                children: [],
                attendance: {
                    present: 0,
                    total: 0,
                    percentage: 0,
                },
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

    if (!session || session.user.role !== "parent") {
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
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                Welcome back, {session.user.name}
                            </h1>
                            <p className="text-gray-600">
                                Monitor your {dashboardData?.overview.children || 0} child{(dashboardData?.overview.children || 0) !== 1 ? 'ren' : ''}'s progress
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 flex-col xl:flex-row">
                    {/* LEFT COLUMN */}
                    <div className="w-full xl:w-2/3 flex flex-col gap-8">
                        {/* OVERVIEW CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                            <UserCard
                                type="children"
                                icon={Users}
                                bgColor="bg-blue-100"
                                color="text-blue-600"
                                delta="enrolled"
                                deltaLabel="students"
                                data={{ count: dashboardData?.overview.children || 0 }}
                            />
                            <UserCard
                                type="payment"
                                icon={DollarSign}
                                bgColor="bg-green-100"
                                color="text-green-600"
                                delta={`₦${(dashboardData?.overview.totalFeesPaid || 0).toLocaleString()}`}
                                deltaLabel="total paid"
                                data={{ count: dashboardData?.overview.totalPayments || 0 }}
                            />
                            <UserCard
                                type="attendance"
                                icon={Clock}
                                bgColor="bg-orange-100"
                                color="text-orange-600"
                                delta={`${dashboardData?.attendance.percentage || 0}%`}
                                deltaLabel="attendance rate"
                                data={{ count: dashboardData?.attendance.present || 0 }}
                            />
                            <UserCard
                                type="recent"
                                icon={BookOpen}
                                bgColor="bg-purple-100"
                                color="text-purple-600"
                                delta={`${dashboardData?.overview.recentPayments || 0} recent`}
                                deltaLabel="this month"
                                data={{ count: dashboardData?.overview.totalPayments || 0 }}
                            />
                        </div>

                        {/* CHILDREN SCHEDULES */}
                        <div className="space-y-6">
                            {dashboardData?.children && dashboardData.children.length > 0 ? (
                                dashboardData.children.map((child) => (
                                    <div key={child.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Calendar className="text-blue-600" size={24} />
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-800">
                                                    {child.name}'s Schedule
                                                </h2>
                                                <p className="text-gray-600 text-sm">
                                                    {child.class} • {child.admissionNumber}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-[400px]">
                                            <BigCalendarContainer type="classid" id={child.id} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="text-center py-12">
                                        <Users size={48} className="mx-auto mb-4 text-gray-300" />
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Children Found</h3>
                                        <p className="text-gray-600">No student records found for your account.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SCHOOL FEE CHART */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <DollarSign className="text-green-600" size={24} />
                                <h2 className="text-xl font-semibold text-gray-800">School Fee Payments</h2>
                            </div>
                            <SchoolFee />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full xl:w-1/3 flex flex-col gap-8">
                        <Announcements />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Parent;