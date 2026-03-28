'use client';

import { useState } from 'react';
import { Layers, MoreHorizontal, Plus, Edit, Trash2, CheckCircle2, XCircle, Users, Warehouse, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { formatCurrency, formatNumber } from '@/lib/utils';

const plans = [
  {
    id: '1',
    name: 'تجريبي',
    nameEn: 'Trial',
    price: 0,
    duration: '14 يوم',
    maxUsers: 2,
    maxWarehouses: 1,
    maxProducts: 100,
    features: ['إدارة المخزون الأساسية', 'تقارير محدودة', 'مستخدمان كحد أقصى'],
    subscribersCount: 22,
    status: 'active',
  },
  {
    id: '2',
    name: 'الباقة السنوية',
    nameEn: 'Annual',
    price: 150000,
    duration: '12 شهر',
    maxUsers: 15,
    maxWarehouses: 10,
    maxProducts: -1,
    features: ['إدارة مخزون كاملة', 'تقارير متقدمة', 'إدارة المستخدمين', 'الدعم الفني', 'التنبيهات الذكية', 'التكامل مع API'],
    subscribersCount: 98,
    status: 'active',
  },
  {
    id: '3',
    name: 'الباقة نصف السنوية',
    nameEn: 'Semi-Annual',
    price: 90000,
    duration: '6 أشهر',
    maxUsers: 10,
    maxWarehouses: 5,
    maxProducts: 5000,
    features: ['إدارة مخزون كاملة', 'تقارير متقدمة', 'إدارة المستخدمين', 'الدعم الفني'],
    subscribersCount: 36,
    status: 'active',
  },
  {
    id: '4',
    name: 'الباقة المؤسسية',
    nameEn: 'Enterprise',
    price: 500000,
    duration: '12 شهر',
    maxUsers: -1,
    maxWarehouses: -1,
    maxProducts: -1,
    features: ['جميع الميزات', 'مستخدمين غير محدودين', 'مخازن غير محدودة', 'دعم فني مخصص', 'تدريب الفريق', 'تخصيص كامل'],
    subscribersCount: 5,
    status: 'active',
  },
];

export default function AdminPlansPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">إدارة الخطط</h1>
          <p className="text-muted-foreground">إدارة خطط الاشتراك والباقات المتاحة</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 ml-2" />
          خطة جديدة
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>إنشاء خطة جديدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="planName">اسم الخطة</Label>
                <Input id="planName" placeholder="مثال: الباقة الذهبية" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planPrice">السعر (ج.س)</Label>
                <Input id="planPrice" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planDuration">المدة</Label>
                <Input id="planDuration" placeholder="مثال: 12 شهر" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxUsers">الحد الأقصى للمستخدمين</Label>
                <Input id="maxUsers" type="number" placeholder="-1 لغير محدود" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxWarehouses">الحد الأقصى للمخازن</Label>
                <Input id="maxWarehouses" type="number" placeholder="-1 لغير محدود" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxProducts">الحد الأقصى للمنتجات</Label>
                <Input id="maxProducts" type="number" placeholder="-1 لغير محدود" />
              </div>
              <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-3">
                <Switch id="planActive" />
                <Label htmlFor="planActive">تفعيل الخطة فوراً</Label>
              </div>
              <div className="flex gap-2 sm:col-span-2 lg:col-span-3">
                <Button>إنشاء الخطة</Button>
                <Button variant="ghost" onClick={() => setShowForm(false)}>إلغاء</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant={plan.status === 'active' ? 'success' : 'secondary'}>
                  {plan.status === 'active' ? 'نشطة' : 'معطلة'}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem><Edit className="h-4 w-4 ml-2" />تعديل</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 ml-2" />حذف</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <CardDescription>{plan.nameEn}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-3xl font-bold">{plan.price === 0 ? 'مجاني' : formatCurrency(plan.price)}</span>
                {plan.price > 0 && <span className="text-sm text-muted-foreground"> / {plan.duration}</span>}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{plan.maxUsers === -1 ? 'غير محدود' : plan.maxUsers} مستخدم</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Warehouse className="h-4 w-4" />
                  <span>{plan.maxWarehouses === -1 ? 'غير محدود' : plan.maxWarehouses} مخزن</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{plan.maxProducts === -1 ? 'غير محدود' : formatNumber(plan.maxProducts)} منتج</span>
                </div>
              </div>

              <Separator />

              <ul className="space-y-1.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-lg bg-muted p-2 text-center">
                <span className="text-sm font-medium">{formatNumber(plan.subscribersCount)}</span>
                <span className="text-xs text-muted-foreground mr-1">مشترك حالي</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
