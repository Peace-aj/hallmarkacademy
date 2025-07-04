"use client";

import { useSession } from "next-auth/react";
import { Skeleton } from "primereact/skeleton";
import LinkItem from './LinkItem';

const menuItems = [
    {
        title: 'MENU',
        items: [
            { icon: '/assets/home.png', label: 'Home', href: '/', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/teacher.png', label: 'Teachers', href: '/dashboard/list/teachers', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/student.png', label: 'Students', href: '/dashboard/list/students', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/parent.png', label: 'Parents', href: '/dashboard/list/parents', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/subject.png', label: 'Subjects', href: '/dashboard/list/subjects', visible: ['admin'] },
            { icon: '/assets/class.png', label: 'Classes', href: '/dashboard/list/classes', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/lesson.png', label: 'Lessons', href: '/dashboard/list/lessons', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/exam.png', label: 'Exams', href: '/dashboard/list/exams', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/assignment.png', label: 'Assignments', href: '/dashboard/list/assignments', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/result.png', label: 'Results', href: '/dashboard/list/results', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/attendance.png', label: 'Attendance', href: '/dashboard/list/attendance', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/calendar.png', label: 'Events', href: '/dashboard/list/events', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/message.png', label: 'Messages', href: '/dashboard/list/messages', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/announcement.png', label: 'Announcements', href: '/dashboard/list/announcements', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
        ],
    },
    {
        title: 'OTHER',
        items: [
            { icon: '/assets/profile.png', label: 'Profile', href: '/dashboard/profile', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/setting.png', label: 'Settings', href: '/dashboard/settings', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
        ],
    },
];

const Menu = () => {
    const { data: session, status } = useSession();
    
    if (status === "loading") {
        return (
            <aside className="p-4 h-full space-y-6">
                {[1, 2].map((section) => (
                    <div key={section}>
                        <Skeleton width="60%" height="0.8rem" className="mb-3" />
                        <div className="space-y-2">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-center gap-3 p-2">
                                    <Skeleton shape="circle" size="1.5rem" />
                                    <Skeleton width="70%" height="1rem" className="hidden lg:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </aside>
        );
    }

    const role = session?.user?.role || 'guest';

    return (
        <aside className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
            <nav className="space-y-6">
                {menuItems.map(section => (
                    <div key={section.title}>
                        <h3 className="text-white/80 uppercase tracking-wider text-xs mb-3 px-3 hidden lg:block">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items
                                .filter(item => item.visible.includes(role))
                                .map(item => (
                                    <li key={item.label}>
                                        <LinkItem item={item} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Menu;