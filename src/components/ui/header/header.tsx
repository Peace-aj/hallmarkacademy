"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import logo from "@/assets/logo.png";

interface NavItem {
    label: string;
    href: string;
    children?: {
        label: string;
        href: string;
        icon: React.ReactNode;
        description: string;
    }[];
}

const navigation: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        href: "/about",
        children: [
            {
                label: "Our Mission",
                href: "/about/mission",
                icon: "⚡",
                description: "What drives us",
            },
            {
                label: "Our Vision",
                href: "/about/vision",
                icon: "👁️",
                description: "Where we are going",
            },
            {
                label: "History",
                href: "/about/history",
                icon: "📚",
                description: "Our journey so far",
            },
        ],
    },
    {
        label: "Admissions",
        href: "/admissions",
        children: [
            {
                label: "Apply Now",
                href: "/admissions/apply",
                icon: "✅",
                description: "Start your application",
            },
            {
                label: "Tuition & Fees",
                href: "/admissions/tuition",
                icon: "💰",
                description: "Cost overview",
            },
            {
                label: "Scholarships",
                href: "/admissions/scholarships",
                icon: "⭐",
                description: "Funding opportunities",
            },
        ],
    },
    {
        label: "Academics",
        href: "/academics",
        children: [
            {
                label: "Departments",
                href: "/academics/departments",
                icon: "🏛️",
                description: "Our academic units",
            },
            {
                label: "Programs",
                href: "/academics/programs",
                icon: "🎓",
                description: "Degree offerings",
            },
            {
                label: "Curriculum",
                href: "/academics/curriculum",
                icon: "📝",
                description: "Course details",
            },
        ],
    },
    {
        label: "Student Life",
        href: "/student-life",
        children: [
            {
                label: "Clubs & Societies",
                href: "/student-life/clubs",
                icon: "👥",
                description: "Join the community",
            },
            {
                label: "Events",
                href: "/student-life/events",
                icon: "📅",
                description: "Upcoming activities",
            },
            {
                label: "Accommodation",
                href: "/student-life/accommodation",
                icon: "🏠",
                description: "Housing options",
            },
        ],
    },
    { label: "Contact", href: "/contact" },
];

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-black/60 backdrop-blur-2xl shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            {/* Logo container enlarged to h-16 w-16 */}
                            <div className="h-16 w-16 relative">
                                <Image
                                    src={logo}
                                    alt="Hallmark Academy"
                                    className="object-contain h-full w-full bg-gray-300 border-gray-300 rounded-full shadow-md"
                                    fill
                                    sizes="180px"
                                    priority
                                />
                            </div>
                            <span
                                className={cn(
                                    "text-xl sm:text-3xl font-bold hidden sm:block",
                                    isScrolled ? "text-white" : "text-gray-800/80"
                                )}
                            >
                                Hallmark Academy
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {item.children ? (
                                    <button
                                        type="button"
                                        className={cn(
                                            "flex items-center space-x-1 px-3 py-2 rounded-md text-md font-medium transition-colors",
                                            isScrolled
                                                ? "text-gray-100 hover:text-gray-300"
                                                : "text-gray-900/80 hover:text-gray-700/80"
                                        )}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center space-x-1 px-3 py-2 rounded-md text-md font-medium transition-colors",
                                            isScrolled
                                                ? "text-gray-100 hover:text-gray-300"
                                                : "text-gray-900/80 hover:text-gray-700/80"
                                        )}
                                    >
                                        <span>{item.label}</span>
                                    </Link>
                                )}

                                {/* Dropdown panel – always in DOM to allow transitions */}
                                {item.children && (
                                    <div
                                        className={cn(
                                            "absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white/60 backdrop-blur-2xl ring-1 ring-white ring-opacity-5 transform origin-top transition-all duration-200 ease-out",
                                            openDropdown === item.label
                                                ? "opacity-100 scale-y-100 visible pointer-events-auto"
                                                : "opacity-0 scale-y-75 invisible pointer-events-none"
                                        )}
                                        style={{ transformOrigin: "top center" }}
                                    >
                                        <div className="py-2">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="group flex items-center px-4 py-3 hover:bg-gray-50/60 backdrop-blur-2xl"
                                                >
                                                    <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-primary-100 text-xl">
                                                        {child.icon}
                                                    </span>
                                                    <div className="ml-4">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-900">
                                                            {child.label}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-500">
                                                            {child.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <UserButton afterSignOutUrl="/" />
                    </nav>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden items-center">
                        <UserButton afterSignOutUrl="/" />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={cn(
                                "ml-4 p-2 rounded-md",
                                isScrolled ? "text-gray-100" : "text-gray-900"
                            )}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className={cn(
                        "lg:hidden transition-colors duration-300",
                        isScrolled
                            ? "bg-black/60 backdrop-blur-2xl"
                            : "bg-black/40 backdrop-blur-2xl"
                    )}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <div key={item.label}>
                                <button
                                    onClick={() =>
                                        setOpenDropdown(
                                            openDropdown === item.label ? null : item.label
                                        )
                                    }
                                    className={cn(
                                        "w-full text-left px-3 py-2 text-base font-medium rounded-md flex justify-between items-center",
                                        isScrolled
                                            ? "text-gray-100 hover:text-gray-300"
                                            : "text-gray-900 hover:text-gray-700"
                                    )}
                                >
                                    <span>{item.label}</span>
                                    {item.children && (
                                        <ChevronDown
                                            className={cn(
                                                "h-4 w-4 transition-transform",
                                                openDropdown === item.label ? "rotate-180" : ""
                                            )}
                                        />
                                    )}
                                </button>

                                {/* Mobile submenu – transitions on height & opacity */}
                                {item.children && (
                                    <div
                                        className={cn(
                                            "pl-4 space-y-1 overflow-hidden transition-all duration-200 ease-out",
                                            openDropdown === item.label
                                                ? "max-h-screen opacity-100"
                                                : "max-h-0 opacity-0"
                                        )}
                                    >
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={cn(
                                                    "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                                                    isScrolled
                                                        ? "text-gray-100 hover:text-gray-300"
                                                        : "text-gray-100 hover:text-gray-300"
                                                )}
                                            >
                                                <span className="mr-2">{child.icon}</span>
                                                <span>{child.label}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
