import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';

    if (path.startsWith('/_next')) {
        return NextResponse.next();
    };

    const isPublic = path === '/' ||
        path.startsWith('/login') ||
        path.startsWith('/signup') ||
        path.startsWith('/password') ||
        path.startsWith('/password/reset') ||
        path.startsWith('/api/login') ||
        path.startsWith('/api/signup') ||
        path.startsWith('/api/status') ||
        path.startsWith('/api/password') ||
        path.startsWith('/api/password/reset')

    if (isPublic && token) {
        return NextResponse.redirect(new URL(`/${token}`, request.url));
    };

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    };

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/',
        '/:path*',
        '/login',
        '/signup',
        '/logout',
        '/verifyemail',
        '/post',
        '/post/:path*',
        '/password',
        '/password/reset',
        '/api/login',
        '/api/signup',
        '/api/logout',
        '/api/status',
        '/api/verifyemail',
        '/api/users',
        '/api/users/:path*',
        '/api/password',
        '/api/password/reset',
    ],
};

