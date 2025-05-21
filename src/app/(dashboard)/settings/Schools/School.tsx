import React from 'react';
import Link from 'next/link';
import { Badge } from 'primereact/badge';
import type { School } from '@/generated/prisma';

interface SchoolPageProps {
    school: School & {
        students?: { id: string }[];
        teachers?: { id: string }[];
        subjects?: { id: string }[];
    };
    onClose: () => void;
}

const SchoolPage: React.FC<SchoolPageProps> = ({ school, onClose }) => {

    return (
        <div className='w-full flex flex-col md:flex-row gap-3 bg-gray-100 p-3'>
            <div className='w-full md:w-2/5 rounded-lg shadow-lg bg-white'>
                <div className='w-full flex md:flex-col gap-3'>
                    <div className='flex items-center justify-center p-4'>
                        <img
                            alt="Logo"
                            src={school.logo ?? '/assets/profile.png'}
                            style={{ width: '100%', height: '100%', }}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-center uppercase text-gray-800 font-bold border-b border-gray-300 py-3'>
                            {school.name}
                        </div>
                        <div className='text-center text-gray-500 font-semibold py-2'>
                            {school.subtitle}
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full md:w-3/5 rounded-lg shadow-lg bg-white'>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>School Type:</span>
                    <p className='text-gray-400'>{school.schooltype}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Phone:</span>
                    <p className='text-gray-400'>{school.phone}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Email Address:</span>
                    <p className='text-gray-400'>{school.email}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Address:</span>
                    <p className='text-gray-400'>{school.address}</p>
                </div>
                <h1 className='uppercase border-b border-gray-300 py-2 text-center font-bold'>Contact Person</h1>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Name:</span>
                    <p className='text-gray-400'>{school.contactperson}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Phone:</span>
                    <p className='text-gray-400'>{school.contactpersonphone}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Email:</span>
                    <p className='text-gray-400'>{school.contactpersonemail}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Students:</span>
                    <Badge value={school.students?.length ?? 0} severity={'info'} security='info' className='p-m-2 px-2' />
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Teachers:</span>
                    <Badge value={school.teachers?.length ?? 0} severity={'info'} security='info' className='p-m-2' />
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Subjects:</span>
                    <Badge value={school.subjects?.length ?? 0} severity={'info'} security='info' className='p-m-2' />
                </div>
                <h1 className='uppercase border-b border-gray-300 py-2 text-center font-bold'>Registration Number</h1>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Count:</span>
                    <p className='text-gray-400'>{school.regnumbercount}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Append:</span>
                    <p className='text-gray-400'>{school.regnumberappend}</p>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Prepend:</span>
                    <p className='text-gray-400'>{school.regnumberprepend}</p>
                </div>
                <h1 className='uppercase border-b border-gray-300 py-2 text-center font-bold'>Social Media</h1>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Facebook:</span>
                    <Link href={school.facebook || ''} target='_blank' className='text-blue-500'>{school.facebook}</Link>
                </div>
                <div className='flex gap-4 border-b border-gray-300 py-2'>
                    <span className='font-bold pl-2'>Youtube:</span>
                    <Link href={school.youtube || ''} target='_blank' className='text-blue-500'>{school.youtube}</Link>
                </div>
            </div>
        </div>
    );
};

export default SchoolPage;
