'use client';

import { Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';

const expiryItems = [
  { id: '1', product: 'حليب بودرة 400 جم', batch: 'BTH-001', warehouse: 'المخزن الرئيسي', quantity: 120, expiryDate: '2024-04-15', daysLeft: 30, status: 'قريب الانتهاء' },
  { id: '2', product: 'زيت طعام 1 لتر', batch: 'BTH-002', warehouse: 'فرع أمدرمان', quantity: 45, expiryDate: '2024-03-20', daysLeft: 5, status: 'حرج' },
  { id: '3', product: 'شاي كرك 500 جم', batch: 'BTH-003', warehouse: 'المخزن الرئيسي', quantity: 200, expiryDate: '2024-06-30', daysLeft: 107, status: 'آمن' },
  { id: '4', product: 'عصير مانجو 1 لتر', batch: 'BTH-004', warehouse: 'فرع بحري', quantity: 80, expiryDate: '2024-03-18', daysLeft: 3, status: 'حرج' },
  { id: '5', product: 'سمن نباتي 500 جم', batch: 'BTH-005', warehouse: 'المخزن الرئيسي', quantity: 300, expiryDate: '2024-05-20', daysLeft: 66, status: 'قريب الانتهاء' },
  { id: '6', product: 'معجون طماطم 400 جم', batch: 'BTH-006', warehouse: 'مخزن بورتسودان', quantity: 150, expiryDate: '2024-08-10', daysLeft: 148, status: 'آمن' },
  { id: '7', product: 'لبن رائب 500 مل', batch: 'BTH-007', warehouse: 'فرع أمدرمان', quantity: 60, expiryDate: '2024-03-16', daysLeft: 1, status: 'منتهي' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  'آمن': 'success',
  'قريب الانتهاء': 'warning',
  'حرج': 'destructive',
  'منتهي': 'destructive',
};

const columns = [
  { key: 'product', label: 'المنتج', render: (item: typeof expiryItems[0]) => <span className="font-medium">{item.product}</span> },
  { key: 'batch', label: 'رقم الدفعة', render: (item: typeof expiryItems[0]) => <span className="font-mono text-sm">{item.batch}</span> },
  { key: 'warehouse', label: 'المخزن' },
  { key: 'quantity', label: 'الكمية', render: (item: typeof expiryItems[0]) => <span>{item.quantity} وحدة</span> },
  { key: 'expiryDate', label: 'تاريخ الانتهاء' },
  { key: 'daysLeft', label: 'الأيام المتبقية', render: (item: typeof expiryItems[0]) => (
    <span className={item.daysLeft <= 7 ? 'text-destructive font-bold' : item.daysLeft <= 30 ? 'text-yellow-600 font-medium' : ''}>
      {item.daysLeft} يوم
    </span>
  )},
  { key: 'status', label: 'الحالة', render: (item: typeof expiryItems[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
];

export default function ExpiryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">تتبع الصلاحية</h1>
          <p className="text-muted-foreground">مراقبة تواريخ انتهاء صلاحية المنتجات</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={expiryItems}
        searchKey="product"
        searchPlaceholder="بحث بالمنتج..."
        actions={
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 ml-1" />
            المنتجات الحرجة فقط
          </Button>
        }
      />
    </div>
  );
}
