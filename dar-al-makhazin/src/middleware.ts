import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

const publicPaths = ['/', '/features', '/pricing', '/how-it-works', '/about', '/faq', '/contact', '/login', '/register', '/subscribe', '/terms', '/privacy'];
const authPaths = ['/login', '/register'];
const dashboardPaths = ['/dashboard'];
const adminPaths = ['/admin'];
const apiPublicPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Public paths - allow through
  if (publicPaths.some(p => pathname === p)) {
    return response;
  }

  // API public paths
  if (apiPublicPaths.some(p => pathname.startsWith(p))) {
    return response;
  }

  // Static and API health
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/health') || pathname.includes('.')) {
    return response;
  }

  // Check authentication for protected routes
  const token = request.cookies.get('access_token')?.value;
  
  if (!token) {
    if (dashboardPaths.some(p => pathname.startsWith(p)) || adminPaths.some(p => pathname.startsWith(p))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  const payload = await verifyAccessToken(token);

  if (!payload) {
    // Try refresh
    const refreshToken = request.cookies.get('refresh_token')?.value;
    if (!refreshToken) {
      if (dashboardPaths.some(p => pathname.startsWith(p)) || adminPaths.some(p => pathname.startsWith(p))) {
        const loginUrl = new URL('/login', request.url);
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete('access_token');
        res.cookies.delete('refresh_token');
        return res;
      }
      return response;
    }
    return response;
  }

  // Redirect authenticated users away from auth pages
  if (authPaths.some(p => pathname === p)) {
    if (payload.role === 'PLATFORM_ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Admin route protection
  if (adminPaths.some(p => pathname.startsWith(p)) && payload.role !== 'PLATFORM_ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Dashboard route protection
  if (dashboardPaths.some(p => pathname.startsWith(p)) && payload.role === 'PLATFORM_ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
