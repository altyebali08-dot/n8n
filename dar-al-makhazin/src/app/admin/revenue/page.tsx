'use client';

import {
  DollarSign, TrendingUp, TrendingDown, Wallet,
  CreditCard, ArrowUpLeft, Receipt
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber } from '@/lib/utils';

const monthlyRevenue = [
  { month: 'يناير', revenue: 1800000, subscriptions: 12, refunds: 0 },
  { month: 'فبراير', revenue: 2700000, subscriptions: 18, refunds: 150000 },
  { month: 'مارس', revenue: 3600000, subscriptions: 24, refunds: 0 },
  { month: 'أبريل', revenue: 2250000, subscriptions: 15, refunds: 300000 },
  { month: 'مايو', revenue: 3150000, subscriptions: 21, refunds: 0 },
  { month: 'يونيو', revenue: 4200000, subscriptions: 28, refunds: 150000 },
  { month: 'يوليو', revenue: 3300000, subscriptions: 22, refunds: 0 },
  { month: 'أغسطس', revenue: 4500000, subscriptions: 30, refunds: 0 },
  { month: 'سبتمبر', revenue: 3900000, subscriptions: 26, refunds: 300000 },
  { month: 'أكتوبر', revenue: 4800000, subscriptions: 32, refunds: 0 },
  { month: 'نوفمبر', revenue: 5250000, subscriptions: 35, refunds: 150000 },
  { month: 'ديسمبر', revenue: 5700000, subscriptions: 38, refunds: 0 },
];

const revenueByMethod = [
  { method: 'بنكك', amount: 18500000, percentage: 40 },
  { method: 'تحويل بنكي', amount: 13875000, percentage: 30 },
  { method: 'فوري', amount: 9250000, percentage: 20 },
  { method: 'أو-كاش', amount: 2312500, percentage: 5 },
  { method: 'إي-كاش', amount: 2312500, percentage: 5 },
];

const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
const totalRefunds = monthlyRevenue.reduce((sum, m) => sum + m.refunds, 0);
const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

export default function AdminRevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الإيرادات</h1>
        <p className="text-muted-foreground">تحليل الإيرادات والمدفوعات</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="إجمالي الإيرادات" value={formatCurrency(totalRevenue)} icon={<DollarSign className="h-5 w-5" />} change="للسنة الحالية" trend="up" />
        <StatCard title="إيرادات الشهر الحالي" value={formatCurrency(5700000)} icon={<TrendingUp className="h-5 w-5" />} change="+8.6% عن الشهر الماضي" trend="up" />
        <StatCard title="المبالغ المستردة" value={formatCurrency(totalRefunds)} icon={<TrendingDown className="h-5 w-5" />} change={`${((totalRefunds / totalRevenue) * 100).toFixed(1)}% من الإيرادات`} trend="down" />
        <StatCard title="متوسط قيمة الاشتراك" value={formatCurrency(150000)} icon={<Receipt className="h-5 w-5" />} change="لكل عميل سنوياً" trend="neutral" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              الإيرادات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyRevenue.map((item) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-muted-foreground shrink-0">{item.month}</span>
                  <div className="flex-1">
                    <div className="h-7 rounded-md bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-md bg-primary/80 flex items-center justify-end px-2 transition-all"
                        style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                      >
                        <span className="text-[10px] font-medium text-primary-foreground">
                          {formatCurrency(item.revenue)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-left">{item.subscriptions} اشتراك</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              حسب طريقة الدفع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByMethod.map((item) => (
                <div key={item.method} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.method}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{formatCurrency(item.amount)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
