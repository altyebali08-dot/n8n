import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withTenantAuth, createPaginationParams } from '@/lib/api-helpers';
import { productSchema } from '@/lib/validations';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = createPaginationParams(searchParams);
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId');

    const where = {
      tenantId: session.tenantId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { sku: { contains: search, mode: 'insensitive' as const } },
          { barcode: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(categoryId && { categoryId }),
    };

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true } },
          stocks: { include: { warehouse: { select: { id: true, name: true } } } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json({
      data: products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  });
}

export async function POST(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const body = await request.json();
    const validation = productSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.errors[0].message }, { status: 400 });
    }

    const existingSku = await db.product.findFirst({
      where: { tenantId: session.tenantId, sku: validation.data.sku },
    });

    if (existingSku) {
      return NextResponse.json({ error: 'رمز المنتج مستخدم مسبقاً' }, { status: 409 });
    }

    const product = await db.product.create({
      data: {
        ...validation.data,
        tenantId: session.tenantId,
      },
    });

    await createAuditLog({
      userId: session.userId,
      tenantId: session.tenantId,
      action: 'CREATE',
      entity: 'Product',
      entityId: product.id,
    });

    return NextResponse.json({ data: product }, { status: 201 });
  });
}
