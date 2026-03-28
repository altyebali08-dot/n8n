import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, createAccessToken, createRefreshToken, setAuthCookies } from '@/lib/auth';
import { registerSchema } from '@/lib/validations';
import { rateLimit, getRateLimitKey } from '@/lib/rate-limit';
import { createAuditLog } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = getRateLimitKey(ip, 'register');
    
    if (!rateLimit(rateLimitKey, 3, 60000)) {
      return NextResponse.json(
        { error: 'تم تجاوز عدد المحاولات المسموحة. يرجى المحاولة بعد دقيقة.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = registerSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, phone, businessName, businessAddress } = validation.data;

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'البريد الإلكتروني مسجل مسبقاً' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const slug = businessName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '') + '-' + Date.now().toString(36);

    const result = await db.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name: businessName,
          slug,
          address: businessAddress || null,
          phone,
          email,
        },
      });

      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phone,
          role: 'TENANT_OWNER',
          tenantId: tenant.id,
        },
      });

      const plan = await tx.subscriptionPlan.findFirst({
        where: { isActive: true },
        orderBy: { price: 'asc' },
      });

      if (plan) {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 14);

        await tx.subscription.create({
          data: {
            tenantId: tenant.id,
            planId: plan.id,
            status: 'ACTIVE',
            startDate: now,
            endDate,
          },
        });
      }

      return { user, tenant };
    });

    const tokenPayload = {
      userId: result.user.id,
      email: result.user.email,
      role: result.user.role,
      tenantId: result.tenant.id,
    };

    const accessToken = await createAccessToken(tokenPayload);
    const refreshToken = await createRefreshToken(tokenPayload);
    const cookies = setAuthCookies(accessToken, refreshToken);

    await createAuditLog({
      userId: result.user.id,
      tenantId: result.tenant.id,
      action: 'REGISTER',
      entity: 'User',
      entityId: result.user.id,
      ipAddress: ip,
    });

    const response = NextResponse.json({
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        tenantId: result.tenant.id,
      },
    });

    response.cookies.set(cookies.accessToken);
    response.cookies.set(cookies.refreshToken);

    return response;
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.' },
      { status: 500 }
    );
  }
}
