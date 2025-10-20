// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Public routes
  const isAuthRoute =
    pathname === '/sign-in' ||
    pathname === '/sign-up' ||
    pathname.startsWith('/auth'); // keep /auth/refresh public

  // ✅ Supabase sets these cookies; if present, treat as logged-in
  const access = req.cookies.get('sb-access-token')?.value;
  const refresh = req.cookies.get('sb-refresh-token')?.value;
  const isLoggedIn = Boolean(access || refresh);

  // Gate protected areas
  if (!isLoggedIn && !isAuthRoute && (pathname === '/' || pathname.startsWith('/transactions'))) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    const qs = searchParams.toString();
    url.search = `?redirect=${encodeURIComponent(pathname + (qs ? `?${qs}` : ''))}`;
    return NextResponse.redirect(url);
  }

  // Send logged users away from auth (and from '/')
  if (isLoggedIn && (isAuthRoute || pathname === '/')) {
    const url = req.nextUrl.clone();
    url.pathname = '/transactions';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/transactions/:path*', '/sign-in', '/sign-up'], // keep /auth/refresh out
};
