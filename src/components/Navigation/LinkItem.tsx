"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";
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
    const isActive = pathname === item.href;

    return (
        <>
            <Tooltip target={`.tooltip-${item.label.replace(/\s+/g, '-').toLowerCase()}`} position="right" />
            <Link
                href={item.href}
                className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg text-gray-200 
                    hover:bg-gray-700 hover:text-white transition-all duration-200 
                    group relative
                    ${isActive ? 'bg-gray-700 text-white shadow-lg' : ''}
                `}
                data-pr-tooltip={item.label}
                data-pr-position="right"
            >
                {/* Active indicator */}
                {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 rounded-r-full" />
                )}
                
                <div className={`
                    tooltip-${item.label.replace(/\s+/g, '-').toLowerCase()}
                    flex items-center justify-center w-6 h-6 flex-shrink-0
                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                    transition-transform duration-200
                `}>
                    <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                </div>
                
                <span className="hidden lg:block font-medium truncate">
                    {item.label}
                </span>
                
                {/* Hover effect */}
                <div className={`
                    absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                    rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    ${isActive ? 'opacity-100' : ''}
                `} />
            </Link>
        </>
    );
};

export default LinkItem;