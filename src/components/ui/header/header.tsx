import React, { useState, useEffect } from 'react';
import { MegaMenu } from 'primereact/megamenu';
import { Ripple } from 'primereact/ripple';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';
import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/logo.png';
type BaseItem = Omit<MenuItem, 'items'>;

export interface CustomMenuItem extends BaseItem {
    root?: boolean;
    subtext?: string;
    image?: string;
    items?: GroupItem[][];
}

export interface GroupItem {
    items: CustomMenuItem[];
}

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const itemRenderer: NonNullable<MenuItem['template']> = (item, options) => {
        const custom = item as CustomMenuItem;
        if (custom.root) {
            return (
                <Link
                    href={custom.url || '#'}
                    className="flex items-center justify-center px-3 py-2 font-semibold p-ripple hover:surface-ground rounded-2xl"
                /* onClick={(e) => options.onClick(e)} */
                >
                    {custom.icon && <span className={custom.icon} />}
                    <span className="ml-2 text-center">{custom.label}</span>
                    <Ripple />
                </Link>
            );
        }
        if (custom.image) {
            return (
                <Link
                    href={custom.url || '#'}
                    className="flex flex-col gap-3"
                /* onClick={(e) => options.onClick(e)} */
                >
                    <img src={custom.image} alt={custom.label} className="w-full" />
                    {custom.subtext && <span>{custom.subtext}</span>}
                    <Button label={custom.label} className="p-button-outlined" />
                </Link>
            );
        }
        return (
            <Link
                href={custom.url || '#'}
                className="flex items-center gap-2 p-3 mb-2"
            /* onClick={(e) => options.onClick(e)} */
            >
                <span className="inline-flex items-center justify-center bg-primary border-circle w-12 h-12">
                    <i className={`${custom.icon} text-lg`} />
                </span>
                <div className="flex flex-col gap-1">
                    <span className="font-medium text-lg">{custom.label}</span>
                    {custom.subtext && <span className="whitespace-nowrap text-sm text-gray-600">{custom.subtext}</span>}
                </div>
            </Link>
        );
    };

    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            root: true,
            url: '/'
        },
        {
            label: 'About Us',
            root: true,
            template: itemRenderer,
            items: [
                [
                    {
                        items: [
                            { label: 'Our Mission', icon: 'pi pi-bolt', subtext: 'What drives us', url: '/about/mission', template: itemRenderer },
                            { label: 'Our Vision', icon: 'pi pi-eye', subtext: 'Where we are going', url: '/about/vision', template: itemRenderer },
                            { label: 'History', icon: 'pi pi-history', subtext: 'Our journey so far', url: '/about/history', template: itemRenderer }
                        ]
                    }
                ]
            ]
        },
        {
            label: 'Admissions',
            root: true,
            template: itemRenderer,
            items: [
                [
                    {
                        items: [
                            { label: 'Apply Now', icon: 'pi pi-check-circle', subtext: 'Start your application', url: '/admissions/apply', template: itemRenderer },
                            { label: 'Tuition & Fees', icon: 'pi pi-wallet', subtext: 'Cost overview', url: '/admissions/tuition', template: itemRenderer },
                            { label: 'Scholarships', icon: 'pi pi-star', subtext: 'Funding opportunities', url: '/admissions/scholarships', template: itemRenderer }
                        ]
                    }
                ]
            ]
        },
        {
            label: 'Academics',
            root: true,
            template: itemRenderer,
            items: [
                [
                    {
                        items: [
                            { label: 'Departments', icon: 'pi pi-sitemap', subtext: 'Our academic units', url: '/academics/departments', template: itemRenderer },
                            { label: 'Programs', icon: 'pi pi-graduation-cap', subtext: 'Degree offerings', url: '/academics/programs', template: itemRenderer },
                            { label: 'Curriculum', icon: 'pi pi-list', subtext: 'Course details', url: '/academics/curriculum', template: itemRenderer }
                        ]
                    }
                ]
            ]
        },
        {
            label: 'Student Life',
            root: true,
            template: itemRenderer,
            items: [
                [
                    {
                        items: [
                            { label: 'Clubs & Societies', icon: 'pi pi-users', subtext: 'Join the community', url: '/student-life/clubs', template: itemRenderer },
                            { label: 'Events', icon: 'pi pi-calendar', subtext: 'Upcoming activities', url: '/student-life/events', template: itemRenderer },
                            { label: 'Accommodation', icon: 'pi pi-home', subtext: 'Housing options', url: '/student-life/accommodation', template: itemRenderer }
                        ]
                    }
                ]
            ]
        },
        {
            label: 'Contact',
            root: true,
            template: itemRenderer,
            items: [
                [
                    {
                        items: [
                            { label: 'Reach Us', icon: 'pi pi-phone', subtext: 'Get in touch', url: '/contact', template: itemRenderer },
                            { label: 'Map & Directions', icon: 'pi pi-map-marker', subtext: 'Find our campus', url: '/contact/directions', template: itemRenderer },
                            { label: 'FAQs', icon: 'pi pi-question-circle', subtext: 'Common queries', url: '/contact/faqs', template: itemRenderer }
                        ]
                    }
                ]
            ]
        }
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                        <div className="h-16 w-16 mr-2 rounded-full shadow-lg overflow-hidden">
                            <Image src={logo} alt="school logo" className="object-cover h-full w-full" />
                        </div>
                        <span className={`text-xl font-bold uppercase transition ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
                            Hallmark Academy Lafia
                        </span>
                    </div>

                    <nav className="hidden sm:flex space-x-6">
                        <MegaMenu model={items} orientation="horizontal" breakpoint="960px" className="bg-transparent border-none text-white" />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
