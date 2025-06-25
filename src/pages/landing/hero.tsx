"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "primereact/button";

import heroImage from "@/assets/students2.jpg";
import Flare from "@/components/ui/flare/flare";

const Hero = () => {
    return (
        <section className="w-full min-h-screen flex items-center bg-blue-50 text-gray-900 pt-28">
            <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center z-20 pb-22">
                <div className="space-y-4 text-center lg:text-left lg:col-span-1">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-blue-900">
                        Welcome to Hallmark Academy
                    </h1>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl text-blue-700 font-semibold">
                        Your All‑in‑One Educational Platform
                    </h2>
                    <p className="max-w-2xl mx-auto lg:mx-0 text-gray-700 text-base sm:text-lg leading-relaxed text-justify">
                        Hallmark Academy eLearning Platform represents an innovative leap in education,
                        offering accessible and personalized learning. The future of education is
                        increasingly online, focusing on interactive, student-centered methods.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-4">
                        <Link href="/sign-in" passHref>
                            <Button label="Get Started" raised className="px-6 py-3" />
                        </Link>
                        <Link href="/how-it-work" passHref>
                            <Button label="How It Works" outlined className="px-6 py-3 hover:bg-cyan-500 hover:text-white" />
                        </Link>
                    </div>
                </div>

                {/* Background decoration */}
                {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div> */}

                <div className="hidden lg:flex relative w-full h-64 sm:h-80 md:h-96 lg:h-[600px] overflow-hidden rounded-lg lg:col-span-2 border-b border-white">
                    <Image
                        src={heroImage}
                        alt="Hallmark Academy students"
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover object-center hero-clip"
                        priority
                    />
                </div>
            </div>

            <div className="absolute left-0 mt-88 w-full z-10">
                <Flare
                    imageSrc={`/assets/waves.svg`}
                    alt="wave"
                />
            </div>
        </section>
    );
};

export default Hero;
