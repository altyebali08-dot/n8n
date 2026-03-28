import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const [
      totalTenants,
      activeTenants,
      totalUsers,
      activeSubscriptions,
      expiredSubscriptions,
      pendingPayments,
      totalRevenue,
    ] = await Promise.all([
      db.tenant.count(),
      db.tenant.count({ where: { isActive: true } }),
      db.user.count(),
      db.subscription.count({ where: { status: 'ACTIVE' } }),
      db.subscription.count({ where: { status: 'EXPIRED' } }),
      db.payment.count({ where: { status: 'PENDING' } }),
      db.payment.aggregate({ where: { status: 'APPROVED' }, _sum: { amount: true } }),
    ]);

    return NextResponse.json({
      data: {
        totalTenants,
        activeTenants,
        totalUsers,
        activeSubscriptions,
        expiredSubscriptions,
        pendingPayments,
        totalRevenue: totalRevenue._sum.amount || 0,
      },
    });
  });
}
