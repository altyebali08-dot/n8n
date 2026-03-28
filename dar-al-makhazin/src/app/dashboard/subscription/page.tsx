'use client';

import { CreditCard, Check, Crown, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const currentPlan = {
  name: 'الخطة الاحترافية',
  price: '299',
  period: 'شهرياً',
  renewDate: '2024-04-15',
  users: { used: 6, limit: 15 },
  warehouses: { used: 4, limit: 10 },
  products: { used: 1248, limit: 5000 },
};

const plans = [
  {
    name: 'الأساسية',
    price: '99',
    icon: Zap,
    features: ['مخزن واحد', '3 مستخدمين', '500 منتج', 'تقارير أساسية', 'دعم بالبريد الإلكتروني'],
    current: false,
  },
  {
    name: 'الاحترافية',
    price: '299',
    icon: Crown,
    features: ['10 مخازن', '15 مستخدم', '5,000 منتج', 'تقارير متقدمة', 'دعم أولوية', 'تتبع الصلاحية', 'التحويلات بين المخازن'],
    current: true,
  },
  {
    name: 'المؤسسية',
    price: '599',
    icon: Building2,
    features: ['مخازن غير محدودة', 'مستخدمين غير محدود', 'منتجات غير محدودة', 'تقارير مخصصة', 'دعم مخصص 24/7', 'API كامل', 'تكامل مع أنظمة خارجية', 'نسخ احتياطي يومي'],
    current: false,
  },
];

const invoices = [
  { id: '1', date: '2024-03-15', amount: '299', status: 'مدفوع' },
  { id: '2', date: '2024-02-15', amount: '299', status: 'مدفوع' },
  { id: '3', date: '2024-01-15', amount: '299', status: 'مدفوع' },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الاشتراك</h1>
        <p className="text-muted-foreground">إدارة خطة اشتراكك والفواتير</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>الخطة الحالية</CardTitle>
            <Badge variant="success">نشط</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{currentPlan.name}</h3>
              <p className="text-muted-foreground">{currentPlan.price} ج.س / {currentPlan.period} · يتجدد في {currentPlan.renewDate}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>المستخدمين</span>
                <span className="text-muted-foreground">{currentPlan.users.used} / {currentPlan.users.limit}</span>
              </div>
              <Progress value={(currentPlan.users.used / currentPlan.users.limit) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>المخازن</span>
                <span className="text-muted-foreground">{currentPlan.warehouses.used} / {currentPlan.warehouses.limit}</span>
              </div>
              <Progress value={(currentPlan.warehouses.used / currentPlan.warehouses.limit) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>المنتجات</span>
                <span className="text-muted-foreground">{currentPlan.products.used.toLocaleString('ar-SD')} / {currentPlan.products.limit.toLocaleString('ar-SD')}</span>
              </div>
              <Progress value={(currentPlan.products.used / currentPlan.products.limit) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-bold mb-4">الخطط المتاحة</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card key={plan.name} className={cn(plan.current && 'border-primary ring-2 ring-primary/20')}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base">{plan.name}</CardTitle>
                    {plan.current && <Badge>الحالية</Badge>}
                  </div>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm"> ج.س / شهرياً</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.current ? 'outline' : 'default'} disabled={plan.current}>
                    {plan.current ? 'خطتك الحالية' : 'ترقية'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>سجل الفواتير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">فاتورة اشتراك - {inv.date}</p>
                    <p className="text-xs text-muted-foreground">{inv.amount} ج.س</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{inv.status}</Badge>
                  <Button variant="ghost" size="sm">تحميل</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
