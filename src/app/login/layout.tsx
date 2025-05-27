
"use client";

import { ReactNode, Suspense } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-screen">
                    Loading…
                </div>
            }
        >
            {children}
        </Suspense>
    );
}
