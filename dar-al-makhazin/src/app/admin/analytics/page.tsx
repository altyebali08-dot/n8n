'use client';

import {
  Building2, Users, Package, Warehouse,
  TrendingUp, ArrowUpLeft, ArrowDownLeft, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { formatNumber } from '@/lib/utils';

const monthlyGrowth = [
  { month: 'يناير', clients: 12, users: 45, revenue: 1800000 },
  { month: 'فبراير', clients: 18, users: 72, revenue: 2700000 },
  { month: 'مارس', clients: 24, users: 98, revenue: 3600000 },
  { month: 'أبريل', clients: 15, users: 63, revenue: 2250000 },
  { month: 'مايو', clients: 21, users: 84, revenue: 3150000 },
  { month: 'يونيو', clients: 28, users: 112, revenue: 4200000 },
  { month: 'يوليو', clients: 22, users: 88, revenue: 3300000 },
  { month: 'أغسطس', clients: 30, users: 120, revenue: 4500000 },
  { month: 'سبتمبر', clients: 26, users: 104, revenue: 3900000 },
  { month: 'أكتوبر', clients: 32, users: 128, revenue: 4800000 },
  { month: 'نوفمبر', clients: 35, users: 140, revenue: 5250000 },
  { month: 'ديسمبر', clients: 38, users: 152, revenue: 5700000 },
];

const topClients = [
  { name: 'مجموعة البركة', users: 12, warehouses: 5, products: 1250 },
  { name: 'شركة النيل للتجارة', users: 8, warehouses: 3, products: 890 },
  { name: 'مخازن السلام', users: 6, warehouses: 2, products: 650 },
  { name: 'صيدلية الشفاء', users: 4, warehouses: 2, products: 420 },
  { name: 'تجارة الرياض', users: 3, warehouses: 1, products: 180 },
];

const planDistribution = [
  { plan: 'الباقة السنوية', count: 98, percentage: 63 },
  { plan: 'الباقة نصف السنوية', count: 36, percentage: 23 },
  { plan: 'تجريبي', count: 22, percentage: 14 },
];

export default function AdminAnalyticsPage() {
  const maxClients = Math.max(...monthlyGrowth.map((m) => m.clients));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تحليلات المنصة</h1>
        <p className="text-muted-foreground">إحصائيات شاملة عن أداء المنصة واستخدامها</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="إجمالي العملاء" value={formatNumber(156)} icon={<Building2 className="h-5 w-5" />} change="+38 هذا العام" trend="up" />
        <StatCard title="المستخدمين النشطين" value={formatNumber(423)} icon={<Users className="h-5 w-5" />} change="+152 هذا العام" trend="up" />
        <StatCard title="إجمالي المنتجات" value={formatNumber(45200)} icon={<Package className="h-5 w-5" />} change="عبر جميع العملاء" trend="up" />
        <StatCard title="إجمالي المخازن" value={formatNumber(312)} icon={<Warehouse className="h-5 w-5" />} change="+28 هذا الشهر" trend="up" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              نمو العملاء الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyGrowth.map((item) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-muted-foreground shrink-0">{item.month}</span>
                  <div className="flex-1">
                    <div className="h-6 rounded-md bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-md bg-primary/80 transition-all"
                        style={{ width: `${(item.clients / maxClients) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium w-8 text-left">{item.clients}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                توزيع الخطط
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planDistribution.map((item) => (
                  <div key={item.plan} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.plan}</span>
                      <span className="text-muted-foreground">{item.count} عميل ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>أكثر العملاء استخداماً</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topClients.map((client, i) => (
                  <div key={client.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.users} مستخدم · {client.warehouses} مخزن</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{formatNumber(client.products)} منتج</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
