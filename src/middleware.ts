import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, extractTokenFromHeader } from '@/lib/jwt'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    (pathname === '/api/user' && request.method === 'POST') ||
    (pathname === '/api/user/login' && request.method === 'POST')
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/user/')) {
    const token = extractTokenFromHeader(request.headers.get('authorization')) ||
                  request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/user/:path*',
  ],
} 