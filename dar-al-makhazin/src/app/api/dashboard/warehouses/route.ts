import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withTenantAuth, createPaginationParams } from '@/lib/api-helpers';
import { warehouseSchema } from '@/lib/validations';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const warehouses = await db.warehouse.findMany({
      where: { tenantId: session.tenantId },
      include: {
        manager: { select: { id: true, name: true } },
        _count: { select: { stocks: true, purchases: true, sales: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: warehouses });
  });
}

export async function POST(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const body = await request.json();
    const validation = warehouseSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }

    const warehouse = await db.warehouse.create({
      data: { ...validation.data, tenantId: session.tenantId },
    });

    await createAuditLog({
      userId: session.userId,
      tenantId: session.tenantId,
      action: 'CREATE',
      entity: 'Warehouse',
      entityId: warehouse.id,
    });

    return NextResponse.json({ data: warehouse }, { status: 201 });
  });
}
