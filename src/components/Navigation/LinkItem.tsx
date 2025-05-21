"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface LinkItemProps {
    item: {
        href: string;
        icon: string;
        label: string;
    };
}

const LinkItem: FC<LinkItemProps> = ({ item }) => {
    const pathname = usePathname();

    return (
        <Link
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-200 hover:bg-gray-700 transition-colors duration-200 ${pathname === item.href ? 'bg-gray-700' : ''}`}
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
    )
};

export default LinkItem;
