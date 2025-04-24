'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel } from 'primereact/carousel';

interface NewsItem {
    id: number;
    title: string;
    date: string;
    description: string;
    image: string;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        title: 'Hallmark Academy Wins Regional Science Fair',
        date: 'April 15, 2025',
        description:
            'Our students showcased exceptional talent at the regional science fair, bringing home multiple awards.',
        image: require('@/assets/student.jpg'),
    },
    {
        id: 2,
        title: 'Annual Sports Day Highlights',
        date: 'March 30, 2025',
        description:
            'A day filled with enthusiasm and sportsmanship as students participated in various athletic events.',
        image: require('@/assets/student.jpg'),
    },
    {
        id: 3,
        title: 'New Library Inauguration',
        date: 'March 10, 2025',
        description:
            'We proudly opened our state-of-the-art library, providing students with a vast collection of resources.',
        image: require('@/assets/student.jpg'),
    },
    {
        id: 4,
        title: 'Art Exhibition: Creativity Unleashed',
        date: 'February 25, 2025',
        description:
            'Our budding artists displayed their masterpieces, reflecting the vibrant creativity nurtured at our academy.',
        image: require('@/assets/student.jpg'),
    },
];

const News: React.FC = () => {
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const newsTemplate = (news: NewsItem) => {
        return (
            <div className="p-4 h-full">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                    <div className="relative h-48 w-full">
                        <Image
                            src={news.image}
                            alt={news.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-blue-800 mb-2">{news.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{news.date}</p>
                        <p className="text-gray-700 flex-grow">{news.description}</p>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <section className="py-20 bg-gradient-to-b from-white to-black text-white w-full">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-4xl sm:text-6xl font-bold text-blue-900">Latest News</h2>
                <p className="text-white text-xl sm:text-2xl mt-4">
                    Stay updated with the latest happenings and achievements at Hallmark Academy.
                </p>
            </div>

            <div className="container mx-auto px-4 flex">
                <Carousel
                    value={newsData}
                    itemTemplate={newsTemplate}
                    numVisible={3}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    circular
                    autoplayInterval={3000}
                    className="custom-carousel w-full"
                />
            </div>
        </section>
    );
};

export default News;
