import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withTenantAuth } from '@/lib/api-helpers';
import { categorySchema } from '@/lib/validations';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const categories = await db.category.findMany({
      where: { tenantId: session.tenantId },
      include: { _count: { select: { products: true } }, children: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ data: categories });
  });
}

export async function POST(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const body = await request.json();
    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }
    const category = await db.category.create({
      data: { ...validation.data, tenantId: session.tenantId },
    });
    await createAuditLog({
      userId: session.userId, tenantId: session.tenantId,
      action: 'CREATE', entity: 'Category', entityId: category.id,
    });
    return NextResponse.json({ data: category }, { status: 201 });
  });
}
