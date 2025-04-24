"use client";

import Hero from "./hero";
import Features from "./features";
import News from "./news";

const Landing = () => {
    return (
        <article className="relative flex flex-col items-center justify-start w-full min-h-screen pt-0 bg-cover bg-center">
            <Hero />
            <Features />
            <News />
        </article>
    );
};

export default Landing;