'use client';

import { Bell, AlertTriangle, Calendar, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const alerts = [
  { id: '1', type: 'low_stock', title: 'مخزون منخفض - سكر أبيض 1 كجم', description: 'الكمية المتبقية 50 وحدة (الحد الأدنى: 100)', severity: 'تحذير', date: '2024-03-15 10:30', read: false },
  { id: '2', type: 'expiry', title: 'قرب انتهاء صلاحية - زيت طعام 1 لتر', description: 'دفعة BTH-002 تنتهي خلال 5 أيام (45 وحدة)', severity: 'حرج', date: '2024-03-15 09:15', read: false },
  { id: '3', type: 'out_of_stock', title: 'نفاد مخزون - زيت طعام 1 لتر', description: 'نفد المخزون من المخزن الرئيسي', severity: 'حرج', date: '2024-03-14 16:00', read: false },
  { id: '4', type: 'low_stock', title: 'مخزون منخفض - حليب بودرة 400 جم', description: 'الكمية المتبقية 75 وحدة (الحد الأدنى: 80)', severity: 'تحذير', date: '2024-03-14 14:20', read: true },
  { id: '5', type: 'expiry', title: 'قرب انتهاء صلاحية - عصير مانجو 1 لتر', description: 'دفعة BTH-004 تنتهي خلال 3 أيام (80 وحدة)', severity: 'حرج', date: '2024-03-14 08:00', read: true },
  { id: '6', type: 'expiry', title: 'منتج منتهي الصلاحية - لبن رائب 500 مل', description: 'دفعة BTH-007 انتهت صلاحيتها (60 وحدة)', severity: 'حرج', date: '2024-03-13 07:00', read: true },
  { id: '7', type: 'low_stock', title: 'مخزون منخفض - معكرونة 500 جم', description: 'الكمية المتبقية 30 وحدة (الحد الأدنى: 50)', severity: 'تحذير', date: '2024-03-12 11:45', read: true },
];

const severityVariant: Record<string, 'warning' | 'destructive'> = {
  'تحذير': 'warning',
  'حرج': 'destructive',
};

const typeIcon: Record<string, React.ReactNode> = {
  low_stock: <Package className="h-5 w-5 text-yellow-500" />,
  out_of_stock: <AlertTriangle className="h-5 w-5 text-red-500" />,
  expiry: <Calendar className="h-5 w-5 text-red-500" />,
};

export default function AlertsPage() {
  const unreadCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">التنبيهات</h1>
          <p className="text-muted-foreground">تنبيهات المخزون المنخفض وانتهاء الصلاحية</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CheckCircle className="h-4 w-4 ml-1" />
            تحديد الكل كمقروء
          </Button>
        </div>
      </div>

      {unreadCount > 0 && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="font-medium text-destructive">لديك {unreadCount} تنبيهات غير مقروءة تحتاج انتباهك</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className={alert.read ? 'opacity-70' : 'border-r-4 border-r-destructive'}>
            <CardContent className="flex items-start gap-4 p-4">
              <div className="mt-0.5">{typeIcon[alert.type]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm">{alert.title}</h3>
                  {!alert.read && <span className="h-2 w-2 rounded-full bg-destructive" />}
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.date}</p>
              </div>
              <Badge variant={severityVariant[alert.severity]}>{alert.severity}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
