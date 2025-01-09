import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const isLogin = req.nextUrl.pathname === '/login'
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  if (req.nextUrl.pathname.startsWith('/explore')) return NextResponse.next()

  if (!session && !isLogin)
    return NextResponse.redirect(new URL('/login', req.url))

  if (session && isLogin)
    return NextResponse.redirect(new URL('/dashboard', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/game/:path*', '/puzzle/:path*', '/dashboard/:path*'],
}
