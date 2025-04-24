"use client";

import Header from "@/components/ui/header/header";
import Landing from "@/pages/landing/landing";
import Footer from "@/components/ui/footer/footer";

const App = () => {
  return (
    <article className="w-full min-h-screen flex flex-col bg-neutral-900 text-neutral-200 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Landing />
      <Footer />
    </article>
  );
};

export default App;