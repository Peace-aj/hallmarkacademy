import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

import logo from '@/assets/logo.png';

interface SubItem {
    label: string;
    icon: string;
    subtext: string;
    url: string;
}

interface MenuSection {
    title?: string;
    items: SubItem[];
}

interface TopItem {
    label: string;
    url?: string;
    subSections?: MenuSection[];
}

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menu: TopItem[] = [
        {
            label: 'Home',
            url: '/',
        },
        {
            label: 'About Us',
            subSections: [
                {
                    items: [
                        {
                            label: 'Our Mission',
                            icon: 'pi pi-bolt',
                            subtext: 'What drives us',
                            url: '/about/mission',
                        },
                        {
                            label: 'Our Vision',
                            icon: 'pi pi-eye',
                            subtext: 'Where we are going',
                            url: '/about/vision',
                        },
                        {
                            label: 'History',
                            icon: 'pi pi-history',
                            subtext: 'Our journey so far',
                            url: '/about/history',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Admissions',
            subSections: [
                {
                    items: [
                        {
                            label: 'Apply Now',
                            icon: 'pi pi-check-circle',
                            subtext: 'Start your application',
                            url: '/admissions/apply',
                        },
                        {
                            label: 'Tuition & Fees',
                            icon: 'pi pi-wallet',
                            subtext: 'Cost overview',
                            url: '/admissions/tuition',
                        },
                        {
                            label: 'Scholarships',
                            icon: 'pi pi-star',
                            subtext: 'Funding opportunities',
                            url: '/admissions/scholarships',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Academics',
            subSections: [
                {
                    items: [
                        {
                            label: 'Departments',
                            icon: 'pi pi-sitemap',
                            subtext: 'Our academic units',
                            url: '/academics/departments',
                        },
                        {
                            label: 'Programs',
                            icon: 'pi pi-graduation-cap',
                            subtext: 'Degree offerings',
                            url: '/academics/programs',
                        },
                        {
                            label: 'Curriculum',
                            icon: 'pi pi-list',
                            subtext: 'Course details',
                            url: '/academics/curriculum',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Student Life',
            subSections: [
                {
                    items: [
                        {
                            label: 'Clubs & Societies',
                            icon: 'pi pi-users',
                            subtext: 'Join the community',
                            url: '/student-life/clubs',
                        },
                        {
                            label: 'Events',
                            icon: 'pi pi-calendar',
                            subtext: 'Upcoming activities',
                            url: '/student-life/events',
                        },
                        {
                            label: 'Accommodation',
                            icon: 'pi pi-home',
                            subtext: 'Housing options',
                            url: '/student-life/accommodation',
                        },
                    ],
                },
            ],
        },
        {
            label: 'Contact',
            subSections: [
                {
                    items: [
                        {
                            label: 'Reach Us',
                            icon: 'pi pi-phone',
                            subtext: 'Get in touch',
                            url: '/contact',
                        },
                        {
                            label: 'Map & Directions',
                            icon: 'pi pi-map-marker',
                            subtext: 'Find our campus',
                            url: '/contact/directions',
                        },
                        {
                            label: 'FAQs',
                            icon: 'pi pi-question-circle',
                            subtext: 'Common queries',
                            url: '/contact/faqs',
                        },
                    ],
                },
            ],
        },
    ];

    const toggleMobile = () => {
        setMobileOpen(prev => !prev);
        setOpenDropdown(null);
    };

    const toggleDropdown = (label: string) => {
        setOpenDropdown(prev => (prev === label ? null : label));
    };

    return (
        <header
            className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? 'bg-black/70 backdrop-blur-sm' : 'bg-transparent'}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo + Site Title */}
                    <div className="flex items-center">
                        <div className="h-12 w-12 mr-2 rounded-full shadow-lg overflow-hidden">
                            <Image src={logo} alt="school logo" className="object-cover h-full w-full" />
                        </div>
                        <span
                            className={`
                text-xl font-bold uppercase transition-colors 
                ${isScrolled ? 'text-white' : 'text-gray-900'}
              `}
                        >
                            Hallmark Academy Lafia
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        {menu.map((item) => (
                            <div key={item.label} className="relative group">
                                {item.url ? (
                                    <Link href={item.url}>
                                        <a
                                            className={`
                        flex items-center space-x-1 px-3 py-2 rounded-2xl transition-colors 
                        ${isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'}
                      `}
                                        >
                                            <span>{item.label}</span>
                                        </a>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => toggleDropdown(item.label)}
                                        className={`
                      flex items-center space-x-1 px-3 py-2 rounded-2xl transition-colors 
                      ${isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'}
                    `}
                                    >
                                        <span>{item.label}</span>
                                        <FiChevronDown
                                            className={`
                        transition-transform duration-200 
                        ${openDropdown === item.label ? 'rotate-180' : 'rotate-0'}
                      `}
                                        />
                                    </button>
                                )}

                                {/* Dropdown / Mega Menu */}
                                {item.subSections && (
                                    <div
                                        className={`
                      absolute top-full left-0 mt-2 w-screen max-w-md 
                      bg-white rounded-lg shadow-lg transition-opacity duration-200 
                      ${openDropdown === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'} 
                    `}
                                        onMouseLeave={() => setOpenDropdown(null)}
                                    >
                                        <div className="p-6 grid grid-cols-1 gap-6">
                                            {item.subSections.map((section, secIdx) => (
                                                <div key={secIdx} className="">
                                                    {section.items.map((sub) => (
                                                        <Link href={sub.url} key={sub.label}>
                                                            <a className="flex items-start space-x-3 p-3 hover:bg-gray-100 rounded-lg">
                                                                <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-10 h-10 flex-shrink-0">
                                                                    <i className={`${sub.icon} text-lg`} />
                                                                </span>
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-lg text-gray-900">{sub.label}</span>
                                                                    <span className="text-sm text-gray-600">{sub.subtext}</span>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* User Button */}
                        <div>
                            <UserButton />
                        </div>
                    </nav>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleMobile}
                            className={`
                p-2 rounded-md focus:outline-none transition-colors 
                ${isScrolled ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'}
              `}
                        >
                            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`
          lg:hidden bg-white transition-max-height duration-300 overflow-hidden 
          ${mobileOpen ? 'max-h-screen' : 'max-h-0'}
        `}
            >
                <div className="px-4 pt-4 pb-6 space-y-1">
                    {menu.map((item) => (
                        <div key={item.label} className="border-b border-gray-200">
                            {item.url && !item.subSections ? (
                                <Link href={item.url}>
                                    <a
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        {item.label}
                                    </a>
                                </Link>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => toggleDropdown(item.label)}
                                        className="w-full flex items-center justify-between px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                    >
                                        <span>{item.label}</span>
                                        <FiChevronDown
                                            className={`
                        transition-transform duration-200 
                        ${openDropdown === item.label ? 'rotate-180' : 'rotate-0'}
                      `}
                                        />
                                    </button>
                                    {/* Nested items */}
                                    {item.subSections && openDropdown === item.label && (
                                        <div className="pl-4 pt-2 space-y-1">
                                            {item.subSections.map((section, secIdx) =>
                                                section.items.map((sub) => (
                                                    <Link href={sub.url} key={sub.label}>
                                                        <a
                                                            onClick={() => setMobileOpen(false)}
                                                            className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
                                                        >
                                                            <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-8 h-8 flex-shrink-0">
                                                                <i className={`${sub.icon} text-lg`} />
                                                            </span>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-gray-800">{sub.label}</span>
                                                                <span className="text-sm text-gray-500">{sub.subtext}</span>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Mobile User Button */}
                    <div className="pt-4">
                        <UserButton />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
