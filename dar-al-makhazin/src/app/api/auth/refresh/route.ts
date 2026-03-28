import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyRefreshToken, createAccessToken, createRefreshToken, setAuthCookies } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const refreshTokenCookie = request.cookies.get('refresh_token')?.value;
    
    if (!refreshTokenCookie) {
      return NextResponse.json({ error: 'جلسة منتهية' }, { status: 401 });
    }

    const payload = await verifyRefreshToken(refreshTokenCookie);
    if (!payload) {
      return NextResponse.json({ error: 'جلسة منتهية' }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: payload.userId } });
    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'الحساب غير موجود أو معطل' }, { status: 401 });
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };

    const accessToken = await createAccessToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);
    const cookies = setAuthCookies(accessToken, refreshToken);

    const response = NextResponse.json({ success: true });
    response.cookies.set(cookies.accessToken);
    response.cookies.set(cookies.refreshToken);

    return response;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
