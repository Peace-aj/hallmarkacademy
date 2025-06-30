"use client";

import Hero from "./hero";
import Features from "./features";
import WhyChooseUs from "./why-choose-us";
import GetStarted from "./get-started";
import News from "./news";

const Landing = () => {
    return (
        <article className="relative flex flex-col items-center justify-start w-full min-h-screen">
            <Hero />
            <Features />
            <WhyChooseUs />
            <GetStarted />
            <News />
        </article>
    );
};

export default Landing;