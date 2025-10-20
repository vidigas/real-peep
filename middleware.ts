// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // ✅ cookies: plain object with get / set / remove
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options?: any) => {
          // mirror to the outgoing response
          res.cookies.set({ name, value, ...(options || {}) });
        },
        remove: (name: string, options?: any) => {
          // delete on the outgoing response (maxAge: 0)
          res.cookies.set({ name, value: '', ...(options || {}), maxAge: 0 });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, searchParams } = req.nextUrl;
  const isAuthRoute =
    pathname === '/sign-in' || pathname === '/sign-up' || pathname.startsWith('/auth');

  // 🔐 Gate app routes for logged-out users
  if (!user && !isAuthRoute && (pathname === '/' || pathname.startsWith('/transactions'))) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    const qs = searchParams.toString();
    url.search = `?redirect=${encodeURIComponent(pathname + (qs ? `?${qs}` : ''))}`;
    return NextResponse.redirect(url);
  }

  // ↪️ Redirect logged-in users away from auth pages (and from '/')
  if (user && (isAuthRoute || pathname === '/')) {
    const url = req.nextUrl.clone();
    url.pathname = '/transactions';
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ['/', '/transactions/:path*', '/sign-in', '/sign-up'],
};
