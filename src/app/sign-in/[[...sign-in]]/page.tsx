"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/ui/footer/footer";

const Signin = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            const role = user?.publicMetadata.role;
            if (role) {
                console.log('user role:', role)
                const path = `/${role}`;
                console.log("Redirecting to:", path);
                router.push(path);
            }
        }

    }, [isLoaded, isSignedIn, user, router]);

    return (
        <article className="w-full min-h-screen flex flex-col bg-neutral-900 text-neutral-200 font-[family-name:var(--font-geist-sans)]">
            <section className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
                <SignIn.Root
                    path="/sign-in"
                >
                    <SignIn.Step
                        name="start"
                        className="bg-white rounded-md shadow-2xl flex gap-3 w-[70%] sm:w-[70%] lg:w-[45%] max-w-6xl mx-auto">
                        <div className="hidden sm:flex flex-col bg-gradient-to-br from-cyan-600 to-blue-800 text-white py-4 ">
                            <Link href="/" className="flex items-center justify-center">
                                <h1 className="text-xl font-bold flex flex-col items-center justify-center gap-2">
                                    <Image src="/assets/logo.png" alt="logo" className="" width={80} height={80} />
                                    Welcome Back
                                </h1>
                            </Link>
                            <p className="text-sm text-white/90 text-center pb-2">To Hallmark Academy Lafia.</p>
                            <hr className="border-gray-300 w-full" />
                            <p className="text-sm text-white text-justify py-2 px-3">
                                Dive into your world of learning—check today’s assignments, track your progress, and connect with teachers and classmates.
                                Please enter your credentials below to continue your journey.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 py-12 px-8">

                            <h2 className="text-gray-500 text-center font-bold text-xl">Sign in to your account</h2>
                            <Clerk.GlobalError className="text-sm text-red-400" />
                            <Clerk.Field name="identifier" className="flex flex-col gap-2">
                                <Clerk.Label className="text-base text-gray-400 font-semibold">Email</Clerk.Label>
                                <Clerk.Input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 transition"
                                    placeholder="you@example.com" />
                                <Clerk.FieldError className="text-sm text-red-400 mt-1" />
                            </Clerk.Field>

                            <Clerk.Field name="password" className="flex flex-col gap-2">
                                <Clerk.Label className="text-base text-gray-400 font-semibold">Password</Clerk.Label>
                                <Clerk.Input
                                    type="password"
                                    required
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 transition"
                                    placeholder="********" />
                                <Clerk.FieldError className="text-sm text-red-400 mt-1" />
                            </Clerk.Field>

                            <SignIn.Action
                                submit
                                className="w-full py-2 mt-4 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition"
                            >
                                Sign In
                            </SignIn.Action>
                        </div>
                    </SignIn.Step>
                </SignIn.Root>
            </section>
            <Footer />
        </article>
    )
};

export default Signin;