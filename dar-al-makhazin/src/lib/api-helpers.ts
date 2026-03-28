import { NextRequest, NextResponse } from 'next/server';
import { getSession, type JWTPayload } from '@/lib/auth';
import { rateLimit, getRateLimitKey } from '@/lib/rate-limit';

export async function withAuth(
  request: NextRequest,
  handler: (session: JWTPayload, request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
  }
  return handler(session, request);
}

export async function withTenantAuth(
  request: NextRequest,
  handler: (session: JWTPayload & { tenantId: string }, request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
  }
  if (!session.tenantId) {
    return NextResponse.json({ error: 'لا توجد منشأة مرتبطة' }, { status: 403 });
  }
  return handler(session as JWTPayload & { tenantId: string }, request);
}

export async function withAdminAuth(
  request: NextRequest,
  handler: (session: JWTPayload, request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح بالوصول' }, { status: 401 });
  }
  if (session.role !== 'PLATFORM_ADMIN') {
    return NextResponse.json({ error: 'صلاحيات غير كافية' }, { status: 403 });
  }
  return handler(session, request);
}

export async function withRateLimit(
  request: NextRequest,
  endpoint: string,
  limit: number,
  windowMs: number,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const key = getRateLimitKey(ip, endpoint);
  
  if (!rateLimit(key, limit, windowMs)) {
    return NextResponse.json(
      { error: 'تم تجاوز عدد الطلبات المسموحة. يرجى المحاولة لاحقاً.' },
      { status: 429 }
    );
  }

  return handler();
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function createPaginationParams(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10')));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
