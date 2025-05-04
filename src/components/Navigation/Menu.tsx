
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
    {
        title: 'MENU',
        items: [
            { icon: '/assets/home.png', label: 'Home', href: '/', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/teacher.png', label: 'Teachers', href: '/list/teachers', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/student.png', label: 'Students', href: '/list/students', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/parent.png', label: 'Parents', href: '/list/parents', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/subject.png', label: 'Subjects', href: '/list/subjects', visible: ['admin'] },
            { icon: '/assets/class.png', label: 'Classes', href: '/list/classes', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/lesson.png', label: 'Lessons', href: '/list/lessons', visible: ['admin', 'super', 'management', 'teacher'] },
            { icon: '/assets/exam.png', label: 'Exams', href: '/list/exams', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/assignment.png', label: 'Assignments', href: '/list/assignments', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/result.png', label: 'Results', href: '/list/results', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/attendance.png', label: 'Attendance', href: '/list/attendance', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/calendar.png', label: 'Events', href: '/list/events', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/message.png', label: 'Messages', href: '/list/messages', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/announcement.png', label: 'Announcements', href: '/list/announcements', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
        ],
    },
    {
        title: 'OTHER',
        items: [
            { icon: '/assets/profile.png', label: 'Profile', href: '/profile', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/setting.png', label: 'Settings', href: '/settings', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
            { icon: '/assets/logout.png', label: 'Logout', href: '/logout', visible: ['admin', 'super', 'management', 'teacher', 'student', 'parent'] },
        ],
    },
];

const Menu = async () => {
    const user = await currentUser();
    const role = (user?.publicMetadata.role as string) || 'guest';

    return (
        <aside
            className="
        p-4 h-[calc(100vh-2rem)] max-h-screen
        overflow-y-auto
        scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700
      "
        >
            <nav className="space-y-6">
                {menuItems.map(section => (
                    <div key={section.title}>
                        <h3 className="text-white/80 uppercase tracking-wider text-xs mb-2">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items
                                .filter(item => item.visible.includes(role))
                                .map(item => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="
                        flex items-center gap-3
                        px-3 py-2
                        rounded-md
                        text-gray-200
                        hover:bg-gray-700
                        transition-colors duration-200
                      "
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={20}
                                                height={20}
                                                className="flex-shrink-0"
                                            />
                                            <span className="hidden lg:block">{item.label}</span>
                                        </Link>
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
