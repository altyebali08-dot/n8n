'use client';

import { Plus, ShoppingCart, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const purchases = [
  { id: '1', orderNumber: 'PO-2024-001', supplier: 'شركة السودان للتجارة', warehouse: 'المخزن الرئيسي', total: 185000, status: 'مكتمل', date: '2024-03-15' },
  { id: '2', orderNumber: 'PO-2024-002', supplier: 'مؤسسة النيل للاستيراد', warehouse: 'فرع أمدرمان', total: 92000, status: 'قيد التنفيذ', date: '2024-03-14' },
  { id: '3', orderNumber: 'PO-2024-003', supplier: 'شركة الخرطوم الغذائية', warehouse: 'المخزن الرئيسي', total: 145000, status: 'مكتمل', date: '2024-03-13' },
  { id: '4', orderNumber: 'PO-2024-004', supplier: 'مصنع الشمال للمنظفات', warehouse: 'فرع بحري', total: 67000, status: 'معلق', date: '2024-03-12' },
  { id: '5', orderNumber: 'PO-2024-005', supplier: 'شركة البحر الأحمر', warehouse: 'مخزن بورتسودان', total: 210000, status: 'ملغي', date: '2024-03-11' },
  { id: '6', orderNumber: 'PO-2024-006', supplier: 'مؤسسة الجزيرة التجارية', warehouse: 'المخزن الرئيسي', total: 78000, status: 'قيد التنفيذ', date: '2024-03-10' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  'مكتمل': 'success',
  'قيد التنفيذ': 'warning',
  'معلق': 'secondary',
  'ملغي': 'destructive',
};

const columns = [
  { key: 'orderNumber', label: 'رقم الأمر', render: (item: typeof purchases[0]) => <span className="font-medium font-mono">{item.orderNumber}</span> },
  { key: 'supplier', label: 'المورد' },
  { key: 'warehouse', label: 'المخزن' },
  { key: 'total', label: 'الإجمالي', render: (item: typeof purchases[0]) => <span>{item.total.toLocaleString('ar-SD')} ج.س</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof purchases[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'date', label: 'التاريخ' },
  { key: 'actions', label: '', render: (item: typeof purchases[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Eye className="h-4 w-4 ml-2" />عرض</DropdownMenuItem>
        <DropdownMenuItem><Pencil className="h-4 w-4 ml-2" />تعديل</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 ml-2" />حذف</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function PurchasesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">أوامر الشراء</h1>
          <p className="text-muted-foreground">إدارة أوامر الشراء من الموردين</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={purchases}
        searchKey="orderNumber"
        searchPlaceholder="بحث برقم الأمر..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />أمر شراء جديد</Button>}
      />
    </div>
  );
}
