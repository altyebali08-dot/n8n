import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAdminAuth } from '@/lib/api-helpers';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async () => {
    const payments = await db.payment.findMany({
      include: {
        tenant: { select: { name: true } },
        subscription: { include: { plan: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ data: payments });
  });
}

export async function PATCH(request: NextRequest) {
  return withAdminAuth(request, async (session) => {
    const body = await request.json();
    const { paymentId, status, notes } = body;

    if (!paymentId || !['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 });
    }

    const payment = await db.payment.update({
      where: { id: paymentId },
      data: {
        status,
        notes,
        reviewedBy: session.userId,
        reviewedAt: new Date(),
      },
    });

    if (status === 'APPROVED') {
      const sub = await db.subscription.findUnique({ where: { id: payment.subscriptionId } });
      if (sub) {
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1);
        await db.subscription.update({
          where: { id: sub.id },
          data: { status: 'ACTIVE', startDate: new Date(), endDate },
        });
      }
    }

    await createAuditLog({
      userId: session.userId,
      action: `PAYMENT_${status}`,
      entity: 'Payment',
      entityId: paymentId,
    });

    return NextResponse.json({ data: payment });
  });
}
