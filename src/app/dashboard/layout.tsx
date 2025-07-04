"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import Menu from "@/components/Navigation/Menu";
import Navbar from "@/components/Navigation/Navbar";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Still loading
        
        if (!session) {
            router.push("/auth/signin");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    return (
        <article className="h-screen flex bg-gray-100 text-gray-900 overflow-hidden">
            {/* LEFT SIDEBAR */}
            <aside className="w-16 md:w-20 lg:w-64 xl:w-72 bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col transition-all duration-300">
                <Link
                    href="/"
                    className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 p-4 lg:p-6 border-b border-gray-700"
                >
                    <Image 
                        src="/assets/logo.png" 
                        alt="Hallmark Academy Logo" 
                        width={48} 
                        height={48}
                        className="lg:w-12 lg:h-12"
                    />
                    <div className="hidden lg:block">
                        <span className="font-bold text-lg text-white">Hallmark Academy</span>
                        <p className="text-xs text-gray-300 mt-1">Education Management</p>
                    </div>
                </Link>
                
                <div className="flex-1 overflow-y-auto">
                    <Menu />
                </div>
            </aside>

            {/* RIGHT CONTENT */}
            <section className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </section>
        </article>
    );
};

export default DashboardLayout;