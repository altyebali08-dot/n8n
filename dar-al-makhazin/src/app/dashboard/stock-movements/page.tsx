'use client';

import { Plus, ArrowLeftRight, ArrowDown, ArrowUp, RotateCcw, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';

const movements = [
  { id: '1', product: 'أرز بسمتي 5 كجم', type: 'IN', quantity: 500, warehouse: 'المخزن الرئيسي', user: 'أحمد محمد', date: '2024-03-15' },
  { id: '2', product: 'سكر أبيض 1 كجم', type: 'OUT', quantity: 200, warehouse: 'فرع أمدرمان', user: 'فاطمة عبدالله', date: '2024-03-15' },
  { id: '3', product: 'زيت طعام 1 لتر', type: 'TRANSFER', quantity: 100, warehouse: 'المخزن الرئيسي', user: 'خالد إبراهيم', date: '2024-03-14' },
  { id: '4', product: 'شاي كرك 500 جم', type: 'RETURN', quantity: 25, warehouse: 'فرع بحري', user: 'سارة أحمد', date: '2024-03-14' },
  { id: '5', product: 'دقيق أبيض 2 كجم', type: 'IN', quantity: 1000, warehouse: 'المخزن الرئيسي', user: 'أحمد محمد', date: '2024-03-14' },
  { id: '6', product: 'حليب بودرة 400 جم', type: 'OUT', quantity: 150, warehouse: 'فرع أمدرمان', user: 'فاطمة عبدالله', date: '2024-03-13' },
  { id: '7', product: 'صابون غسيل 1 كجم', type: 'TRANSFER', quantity: 80, warehouse: 'فرع بحري', user: 'عمر حسن', date: '2024-03-13' },
];

const typeConfig: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' | 'warning' }> = {
  IN: { label: 'وارد', variant: 'default' },
  OUT: { label: 'صادر', variant: 'destructive' },
  TRANSFER: { label: 'تحويل', variant: 'secondary' },
  RETURN: { label: 'مرتجع', variant: 'warning' },
};

const columns = [
  { key: 'product', label: 'المنتج', render: (item: typeof movements[0]) => <span className="font-medium">{item.product}</span> },
  { key: 'type', label: 'النوع', render: (item: typeof movements[0]) => {
    const config = typeConfig[item.type];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  }},
  { key: 'quantity', label: 'الكمية', render: (item: typeof movements[0]) => <span>{item.quantity} وحدة</span> },
  { key: 'warehouse', label: 'المخزن' },
  { key: 'user', label: 'بواسطة' },
  { key: 'date', label: 'التاريخ' },
];

export default function StockMovementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">حركة المخزون</h1>
          <p className="text-muted-foreground">تتبع جميع حركات المخزون الواردة والصادرة</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={movements}
        searchKey="product"
        searchPlaceholder="بحث بالمنتج..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />تسجيل حركة</Button>}
      />
    </div>
  );
}
