"use client";

import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface FlareProps {
    imageSrc: StaticImageData | string;
    alt?: string;
}

/**
 * Flare
 * A decorative transition component showing a full-width image on
 * a matching-bg gradient that fades from the Hero color into white.
 */
const Flare: React.FC<FlareProps> = ({ imageSrc, alt = 'section divider' }) => (
    <div className="relative w-full overflow-hidden bg-blue-50">
        <div className="absolute inset-0 pointer-events-none
                    bg-gradient-to-b from-blue-50 via-blue-50/50 to-white" />
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
            <Image
                src={imageSrc}
                alt={alt}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
            />
        </div>
    </div>
);

export default Flare;
