"use client";

import { useEffect, useState, useRef } from "react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/ui/footer/footer";
import Loader from "@/components/ui/Loader/Loader";

const Signin = () => {
    const { isLoaded: clerkLoaded, isSignedIn: clerkSignedIn, user } = useUser();
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

    const toast = useRef<Toast>(null);

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // If Clerk has already signed the user in, redirect by role.
    useEffect(() => {
        if (clerkLoaded && clerkSignedIn) {
            const role = user?.publicMetadata.role;
            if (role) {
                router.push(`/${role}`);
            }
        }
    }, [clerkLoaded, clerkSignedIn, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Avoid double-submitting if Clerk isn’t ready or we’re already loading
        if (!isLoaded || loading) return;

        setLoading(true);

        try {
            // 1. Create a sign-in attempt (email + password)
            const result = await signIn.create({
                identifier,
                password,
            });

            // 2. If status is “complete,” set active session and redirect:
            if (result.status === "complete" && result.createdSessionId) {
                await setActive({ session: result.createdSessionId });
                // Once setActive finishes, the useEffect above will fire and redirect by role.
            } else {
                // Sometimes Clerk returns a status other than “complete” (e.g. 2FA). 
                // You could handle that here (e.g. navigate to a “verifications” step),
                // but in most basic cases, “complete” is what we expect.
                setLoading(false);
                toast.current?.show({
                    severity: "warn",
                    summary: "Additional steps required",
                    detail: "Please check your email or complete verification.",
                });
            }
        } catch (err: any) {
            // If ClerkAPI throws, format Clerk’s error into a user-friendly string:
            let errMessage = "Unknown error, please try again.";

            // ClerkAPI errors come back as an array of objects under err.errors
            if (Array.isArray(err.errors) && err.errors.length > 0) {
                // Just take the first error’s message
                errMessage = err.errors[0].longMessage || err.errors[0].message;
            } else if (err.message) {
                errMessage = err.message;
            }

            setLoading(false);
            toast.current?.show({
                severity: "error",
                summary: "Sign-in failed",
                detail: errMessage,
                life: 5000,
            });
        }
    };

    return (
        <article className="w-full min-h-screen flex flex-col bg-neutral-900 text-neutral-200 font-[family-name:var(--font-geist-sans)]">
            {/* PrimeReact Toast container: we’ll fire toasts from handleSubmit */}
            <Toast ref={toast} />

            {/* Full-screen loader overlay */}
            {loading && <Loader visible={loading} onHide={() => setLoading(false)} />}

            <section className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
                <div className="bg-white rounded-md shadow-2xl flex gap-3 w-[70%] sm:w-[70%] lg:w-[45%] max-w-6xl mx-auto">
                    {/* LEFT PANEL (welcome text + logo) */}
                    <div className="hidden sm:flex flex-col bg-gradient-to-br from-cyan-600 to-blue-800 text-white py-4">
                        <Link href="/" className="flex items-center justify-center">
                            <h1 className="text-xl font-bold flex flex-col items-center justify-center gap-2">
                                <Image
                                    src="/assets/logo.png"
                                    alt="logo"
                                    width={80}
                                    height={80}
                                />
                                Welcome Back
                            </h1>
                        </Link>
                        <p className="text-sm text-white/90 text-center pb-2">
                            To Hallmark Academy Lafia.
                        </p>
                        <hr className="border-gray-300 w-full" />
                        <p className="text-sm text-white text-justify py-2 px-3">
                            Dive into your world of learning—check today’s assignments, track
                            your progress, and connect with teachers and classmates. Please
                            enter your credentials below to continue your journey.
                        </p>
                    </div>

                    {/* RIGHT PANEL (form fields) */}
                    <div className="flex flex-col gap-0 sm:gap-3 py-12 px-6 sm:px-8 w-full">
                        <h2 className="text-gray-500 text-center font-bold text-lg sm:text-xl mb-3">
                            Sign in to your account
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {/* Email / Identifier */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="identifier"
                                    className="text-base text-gray-400 font-semibold"
                                >
                                    Email
                                </label>
                                <input
                                    id="identifier"
                                    type="email"
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 transition"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="password"
                                    className="text-base text-gray-400 font-semibold"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-500 transition"
                                    placeholder="********"
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="w-full py-2 mt-4 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </article>
    );
};

export default Signin;
