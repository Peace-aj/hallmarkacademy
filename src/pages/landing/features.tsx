"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';

// Import your school images
import nurseryImage from '@/assets/class.jpg';
import primaryImage from '@/assets/student.jpg';
import secondaryImage from '@/assets/students2.jpg';

interface SchoolFeature {
    title: string;
    description: string;
    imageSrc: StaticImageData;
    alt: string;
}

const features: SchoolFeature[] = [
    {
        title: 'Nursery School',
        description:
            'Our Nursery program provides a safe and nurturing environment for early learners, focusing on social, emotional, and fundamental motor skills development through play-based activities.',
        imageSrc: nurseryImage,
        alt: 'Nursery students at play',
    },
    {
        title: 'Primary School',
        description:
            'At Hallmark Academy Primary, we build strong foundations in literacy, numeracy, and critical thinking with hands-on projects and collaborative learning experiences.',
        imageSrc: primaryImage,
        alt: 'Primary classroom interaction',
    },
    {
        title: 'Secondary School',
        description:
            'Our Secondary curriculum prepares students for complex problem-solving and leadership, offering advanced coursework and extracurricular programs for holistic growth.',
        imageSrc: secondaryImage,
        alt: 'Secondary school students in science lab',
    },
];

const Features: React.FC = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-black-50 to-white">
            <div className="container mx-auto px-4 text-center mb-12">
                <h2 className="text-4xl sm:text-8xl font-bold text-white">Hallmark Academy</h2>
                <p className="text-cyan-300 text-xl sm:text-2xl mt-2 max-w-2xl mx-auto">
                    Explore the distinct programs and nurturing environments across our different levels of education.
                </p>
            </div>

            <div className="grid gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:-translate-y-2"
                    >
                        <div className="relative w-full h-48 ">
                            <Image
                                src={feature.imageSrc}
                                alt={feature.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover object-center"
                                priority={idx === 0}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-blue-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
