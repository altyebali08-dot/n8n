import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withTenantAuth } from '@/lib/api-helpers';
import { customerSchema } from '@/lib/validations';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const customers = await db.customer.findMany({
      where: { tenantId: session.tenantId },
      include: { _count: { select: { sales: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: customers });
  });
}

export async function POST(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const body = await request.json();
    const validation = customerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }
    const customer = await db.customer.create({
      data: { ...validation.data, tenantId: session.tenantId },
    });
    await createAuditLog({
      userId: session.userId, tenantId: session.tenantId,
      action: 'CREATE', entity: 'Customer', entityId: customer.id,
    });
    return NextResponse.json({ data: customer }, { status: 201 });
  });
}
