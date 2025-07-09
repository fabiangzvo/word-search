import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const isLogin = req.nextUrl.pathname === '/login'
  const isSignUp = req.nextUrl.pathname === '/sign-up'
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isPublicRoute = req.nextUrl.pathname.match(
    /\/(explore|puzzle\/[a-f0-9]{24}\/detail)/
  )

  if (!session && !isLogin && !isSignUp && !isPublicRoute)
    return NextResponse.redirect(new URL('/login', req.url))

  if (session && (isLogin || isSignUp) && !isPublicRoute)
    return NextResponse.redirect(new URL('/dashboard', req.url))

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/sign-up',
    '/game/:path*',
    '/puzzle/:path*',
    '/dashboard/:path*',
  ],
}
