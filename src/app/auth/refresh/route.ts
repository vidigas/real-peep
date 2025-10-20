// app/auth/refresh/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { access_token, refresh_token, expires_at } = await req
    .json()
    .catch(() => ({}));
  const res = NextResponse.json({ ok: true });

  if (!access_token || !refresh_token) {
    res.cookies.set("sb-access-token", "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });
    res.cookies.set("sb-refresh-token", "", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 0,
    });
    return res;
  }

  const maxAge = Math.max(
    0,
    Math.floor(Number(expires_at) - Date.now() / 1000)
  );
  res.cookies.set("sb-access-token", access_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge,
  });
  res.cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
