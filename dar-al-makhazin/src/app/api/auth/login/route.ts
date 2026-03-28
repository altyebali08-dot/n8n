import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, createAccessToken, createRefreshToken, setAuthCookies } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';
import { rateLimit, getRateLimitKey } from '@/lib/rate-limit';
import { createAuditLog } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = getRateLimitKey(ip, 'login');
    
    if (!rateLimit(rateLimitKey, 5, 60000)) {
      return NextResponse.json(
        { error: 'تم تجاوز عدد المحاولات المسموحة. يرجى المحاولة بعد دقيقة.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await db.user.findUnique({
      where: { email },
      include: { tenant: true },
    });

    if (!user || !await verifyPassword(password, user.password)) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'الحساب معطل. يرجى التواصل مع الدعم الفني.' },
        { status: 403 }
      );
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

    await createAuditLog({
      userId: user.id,
      tenantId: user.tenantId,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      ipAddress: ip,
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      },
    });

    response.cookies.set(cookies.accessToken);
    response.cookies.set(cookies.refreshToken);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
