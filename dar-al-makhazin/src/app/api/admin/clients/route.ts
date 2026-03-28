import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth, createPaginationParams } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = createPaginationParams(searchParams);

    const [tenants, total] = await Promise.all([
      db.tenant.findMany({
        include: {
          _count: { select: { users: true, warehouses: true } },
          subscriptions: { take: 1, orderBy: { createdAt: 'desc' }, include: { plan: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      db.tenant.count(),
    ]);

    return NextResponse.json({
      data: tenants,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  });
}
