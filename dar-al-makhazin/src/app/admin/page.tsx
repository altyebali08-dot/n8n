import {
  Building2, Users, CreditCard, DollarSign,
  TrendingUp, AlertTriangle, CheckCircle2, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/lib/utils';

const recentPayments = [
  { id: 1, client: 'شركة النيل للتجارة', amount: 150000, method: 'بنكك', status: 'pending', date: '2024-03-15' },
  { id: 2, client: 'صيدلية الشفاء', amount: 150000, method: 'فوري', status: 'approved', date: '2024-03-14' },
  { id: 3, client: 'مجموعة البركة', amount: 150000, method: 'تحويل بنكي', status: 'pending', date: '2024-03-14' },
  { id: 4, client: 'متجر الأمل', amount: 150000, method: 'أو-كاش', status: 'rejected', date: '2024-03-13' },
  { id: 5, client: 'مخازن السلام', amount: 150000, method: 'إي-كاش', status: 'approved', date: '2024-03-13' },
];

const statusConfig: Record<string, { label: string; variant: 'warning' | 'success' | 'destructive' }> = {
  pending: { label: 'بانتظار المراجعة', variant: 'warning' },
  approved: { label: 'مقبول', variant: 'success' },
  rejected: { label: 'مرفوض', variant: 'destructive' },
};

const recentClients = [
  { name: 'مخازن الرياض', plan: 'سنوي', date: '2024-03-15', status: 'active' },
  { name: 'تجارة الأمل', plan: 'سنوي', date: '2024-03-14', status: 'trial' },
  { name: 'صيدليات الحياة', plan: 'سنوي', date: '2024-03-13', status: 'active' },
  { name: 'مجموعة النور', plan: 'سنوي', date: '2024-03-12', status: 'pending' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">لوحة إدارة المنصة</h1>
        <p className="text-muted-foreground">نظرة شاملة على أداء المنصة</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="إجمالي العملاء" value={formatNumber(156)} icon={<Building2 className="h-5 w-5" />} change="+12 هذا الشهر" trend="up" />
        <StatCard title="المستخدمين النشطين" value={formatNumber(423)} icon={<Users className="h-5 w-5" />} change="+35 هذا الأسبوع" trend="up" />
        <StatCard title="الاشتراكات النشطة" value={formatNumber(134)} icon={<CreditCard className="h-5 w-5" />} change="85% من العملاء" trend="up" />
        <StatCard title="الإيرادات الشهرية" value={formatCurrency(4500000)} icon={<DollarSign className="h-5 w-5" />} change="+18% عن الشهر الماضي" trend="up" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="اشتراكات منتهية" value={formatNumber(22)} icon={<AlertTriangle className="h-5 w-5" />} change="تحتاج تجديد" trend="down" />
        <StatCard title="طلبات دفع معلقة" value={formatNumber(8)} icon={<Clock className="h-5 w-5" />} change="بانتظار المراجعة" trend="neutral" />
        <StatCard title="تذاكر دعم مفتوحة" value={formatNumber(5)} icon={<AlertTriangle className="h-5 w-5" />} change="2 عاجلة" trend="down" />
        <StatCard title="نسبة الاحتفاظ" value="92%" icon={<TrendingUp className="h-5 w-5" />} change="+3% عن الشهر الماضي" trend="up" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>طلبات الدفع الأخيرة</CardTitle>
            <Button variant="outline" size="sm">عرض الكل</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((p) => {
                const config = statusConfig[p.status];
                return (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{p.client}</p>
                      <p className="text-xs text-muted-foreground">{p.method} · {p.date}</p>
                    </div>
                    <div className="text-left flex items-center gap-2">
                      <span className="text-sm font-medium">{formatCurrency(p.amount)}</span>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>العملاء الجدد</CardTitle>
            <Button variant="outline" size="sm">عرض الكل</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentClients.map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.plan} · {c.date}</p>
                  </div>
                  <Badge variant={c.status === 'active' ? 'success' : c.status === 'trial' ? 'secondary' : 'warning'}>
                    {c.status === 'active' ? 'نشط' : c.status === 'trial' ? 'تجريبي' : 'معلق'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
