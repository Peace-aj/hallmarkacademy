import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // Define role-based access
        const roleRoutes = {
            super: ["/super"],
            admin: ["/admin"],
            management: ["/management"],
            teacher: ["/teacher"],
            student: ["/student"],
            parent: ["/parent"],
        };

        // Check if user is accessing a protected route
        for (const [role, routes] of Object.entries(roleRoutes)) {
            for (const route of routes) {
                if (pathname.startsWith(route)) {
                    if (token?.role !== role) {
                        // Redirect to appropriate dashboard based on user's role
                        return NextResponse.redirect(new URL(`/${token?.role || 'auth/signin'}`, req.url));
                    }
                }
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;

                // Allow access to public routes
                if (pathname === "/" || pathname.startsWith("/auth/")) {
                    return true;
                }

                // Require authentication for all other routes
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
    ],
};