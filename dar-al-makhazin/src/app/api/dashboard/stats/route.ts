import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withTenantAuth } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  return withTenantAuth(request, async (session) => {
    const [
      totalProducts,
      totalWarehouses,
      totalSuppliers,
      totalCustomers,
      lowStockProducts,
      outOfStockProducts,
    ] = await Promise.all([
      db.product.count({ where: { tenantId: session.tenantId, isActive: true } }),
      db.warehouse.count({ where: { tenantId: session.tenantId, isActive: true } }),
      db.supplier.count({ where: { tenantId: session.tenantId, isActive: true } }),
      db.customer.count({ where: { tenantId: session.tenantId, isActive: true } }),
      db.productStock.count({
        where: {
          tenantId: session.tenantId,
          quantity: { gt: 0 },
          product: { minStock: { gt: 0 } },
        },
      }),
      db.productStock.count({
        where: { tenantId: session.tenantId, quantity: { lte: 0 } },
      }),
    ]);

    return NextResponse.json({
      data: {
        totalProducts,
        totalWarehouses,
        totalSuppliers,
        totalCustomers,
        lowStockProducts,
        outOfStockProducts,
      },
    });
  });
}
