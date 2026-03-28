import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withTenantAuth } from '@/lib/api-helpers';
import { supplierSchema } from '@/lib/validations';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const suppliers = await db.supplier.findMany({
      where: { tenantId: session.tenantId },
      include: { _count: { select: { purchases: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: suppliers });
  });
}

export async function POST(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const body = await request.json();
    const validation = supplierSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }
    const supplier = await db.supplier.create({
      data: { ...validation.data, tenantId: session.tenantId },
    });
    await createAuditLog({
      userId: session.userId, tenantId: session.tenantId,
      action: 'CREATE', entity: 'Supplier', entityId: supplier.id,
    });
    return NextResponse.json({ data: supplier }, { status: 201 });
  });
}
