import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // read from the incoming request
        get: (name: string) => req.cookies.get(name)?.value,
        // write to the outgoing response
        set: (name: string, value: string, options: any) => {
          res.cookies.set(name, value, options);
        },
        remove: (name: string, options: any) => {
          // clearing cookie = set same name with maxAge 0
          res.cookies.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );

  await supabase.auth.signOut(); // clears SSR cookies on the response
  return res;
}
