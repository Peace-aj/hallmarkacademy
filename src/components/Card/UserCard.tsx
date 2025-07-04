"use client";

import { useState, useEffect } from 'react';
import { IconType } from 'react-icons';
import { Skeleton } from 'primereact/skeleton';

type UserType = 'super' | 'management' | 'admin' | 'teacher' | 'student' | 'parent' | 'class' | 'lesson' | 'subject';

interface Props {
    type: UserType;
    icon: IconType;
    bgColor?: string;
    color?: string;
    delta?: string;
    deltaLabel?: string;
}

interface CountData {
    count: number;
    delta?: string;
    deltaLabel?: string;
}

const UserCard: React.FC<Props> = ({
    type,
    icon: Icon,
    bgColor = 'bg-blue-100',
    color = 'text-blue-500',
    delta,
    deltaLabel,
}) => {
    const [data, setData] = useState<CountData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                setLoading(true);
                setError(null);

                let endpoint = '';
                switch (type) {
                    case 'teacher':
                        endpoint = '/api/teachers';
                        break;
                    case 'student':
                        endpoint = '/api/students';
                        break;
                    case 'parent':
                        endpoint = '/api/parents';
                        break;
                    case 'subject':
                        endpoint = '/api/subjects';
                        break;
                    case 'class':
                        endpoint = '/api/classes';
                        break;
                    case 'lesson':
                        endpoint = '/api/lessons';
                        break;
                    case 'super':
                    case 'management':
                    case 'admin':
                        endpoint = `/api/administration?role=${type.toUpperCase()}`;
                        break;
                    default:
                        throw new Error(`Unsupported type: ${type}`);
                }

                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${type} data`);
                }

                const result = await response.json();
                
                // Handle different response formats
                let count = 0;
                if (Array.isArray(result)) {
                    count = result.length;
                } else if (result.data && Array.isArray(result.data)) {
                    count = result.data.length;
                } else if (result.pagination) {
                    count = result.pagination.total;
                } else if (typeof result.count === 'number') {
                    count = result.count;
                }

                setData({
                    count,
                    delta: delta || "24 new",
                    deltaLabel: deltaLabel || "since last visit"
                });
            } catch (err) {
                console.error(`Error fetching ${type} count:`, err);
                setError(err instanceof Error ? err.message : 'Failed to load data');
                // Set fallback data
                setData({
                    count: 0,
                    delta: delta || "0 new",
                    deltaLabel: deltaLabel || "since last visit"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, [type, delta, deltaLabel]);

    const title = type.charAt(0).toUpperCase() + type.slice(1) + 's';

    if (loading) {
        return (
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <Skeleton width="60%" height="1rem" className="mb-2" />
                        <Skeleton width="40%" height="2rem" />
                    </div>
                    <Skeleton shape="circle" size="3rem" />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton width="30%" height="0.8rem" />
                    <Skeleton width="40%" height="0.8rem" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
            {/* Top: Title & Count with Icon */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <span className="block text-gray-600 font-medium text-sm mb-2 group-hover:text-gray-800 transition-colors">
                        {title}
                    </span>
                    <div className="text-gray-900 font-bold text-2xl lg:text-3xl">
                        {error ? '—' : data?.count.toLocaleString()}
                    </div>
                </div>
                <div className={`
                    flex items-center justify-center
                    ${bgColor} rounded-xl
                    w-12 h-12 lg:w-14 lg:h-14
                    group-hover:scale-110 transition-transform duration-300
                `}>
                    <Icon className={`${color} text-xl lg:text-2xl`} />
                </div>
            </div>

            {/* Bottom: Delta info */}
            {data?.delta && data?.deltaLabel && (
                <div className="flex justify-between items-center text-sm">
                    <span className="text-green-500 font-medium">
                        {data.delta}
                    </span>
                    <span className="text-gray-500">
                        {data.deltaLabel}
                    </span>
                </div>
            )}

            {error && (
                <div className="text-xs text-red-500 mt-2">
                    Failed to load data
                </div>
            )}
        </div>
    );
};

export default UserCard;