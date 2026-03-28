'use client';

import {
  BarChart3, Package, Receipt, ShoppingCart, TrendingUp,
  Warehouse, ArrowLeftRight, Calendar, Download, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const reports = [
  { id: '1', title: 'تقرير المخزون الحالي', description: 'عرض شامل لجميع المنتجات وكمياتها في كل المخازن', icon: Package, category: 'المخزون' },
  { id: '2', title: 'تقرير المبيعات', description: 'تفاصيل المبيعات حسب الفترة والعميل والمنتج', icon: Receipt, category: 'المبيعات' },
  { id: '3', title: 'تقرير المشتريات', description: 'تفاصيل المشتريات حسب المورد والفترة الزمنية', icon: ShoppingCart, category: 'المشتريات' },
  { id: '4', title: 'تقرير الأرباح والخسائر', description: 'ملخص الإيرادات والمصروفات وصافي الربح', icon: TrendingUp, category: 'المالية' },
  { id: '5', title: 'تقرير حركة المخزون', description: 'جميع الحركات الواردة والصادرة والتحويلات', icon: ArrowLeftRight, category: 'المخزون' },
  { id: '6', title: 'تقرير المنتجات المنخفضة', description: 'المنتجات التي وصلت للحد الأدنى من المخزون', icon: Warehouse, category: 'المخزون' },
  { id: '7', title: 'تقرير الصلاحية', description: 'المنتجات القريبة من تاريخ انتهاء الصلاحية', icon: Calendar, category: 'المخزون' },
  { id: '8', title: 'تقرير أداء المخازن', description: 'مقارنة أداء المخازن المختلفة من حيث الحركة', icon: BarChart3, category: 'التشغيل' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">التقارير</h1>
          <p className="text-muted-foreground">استعراض وتصدير التقارير المتنوعة</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{report.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{report.category}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <FileText className="h-4 w-4 ml-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 ml-1" />
                    تصدير
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
