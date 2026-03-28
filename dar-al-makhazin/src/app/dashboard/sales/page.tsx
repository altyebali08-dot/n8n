'use client';

import { Plus, Receipt, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const sales = [
  { id: '1', invoiceNumber: 'INV-2024-001', customer: 'سوبرماركت الأمل', warehouse: 'المخزن الرئيسي', total: 45000, status: 'مدفوع', date: '2024-03-15' },
  { id: '2', invoiceNumber: 'INV-2024-002', customer: 'بقالة الحي', warehouse: 'فرع أمدرمان', total: 28000, status: 'معلق', date: '2024-03-15' },
  { id: '3', invoiceNumber: 'INV-2024-003', customer: 'تموينات الخرطوم', warehouse: 'المخزن الرئيسي', total: 67000, status: 'مدفوع', date: '2024-03-14' },
  { id: '4', invoiceNumber: 'INV-2024-004', customer: 'متجر البركة', warehouse: 'فرع بحري', total: 32000, status: 'مدفوع جزئياً', date: '2024-03-14' },
  { id: '5', invoiceNumber: 'INV-2024-005', customer: 'سوبرماركت النور', warehouse: 'المخزن الرئيسي', total: 89000, status: 'ملغي', date: '2024-03-13' },
  { id: '6', invoiceNumber: 'INV-2024-006', customer: 'مطعم السلام', warehouse: 'فرع أمدرمان', total: 15000, status: 'مدفوع', date: '2024-03-13' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  'مدفوع': 'success',
  'معلق': 'secondary',
  'مدفوع جزئياً': 'warning',
  'ملغي': 'destructive',
};

const columns = [
  { key: 'invoiceNumber', label: 'رقم الفاتورة', render: (item: typeof sales[0]) => <span className="font-medium font-mono">{item.invoiceNumber}</span> },
  { key: 'customer', label: 'العميل' },
  { key: 'warehouse', label: 'المخزن' },
  { key: 'total', label: 'الإجمالي', render: (item: typeof sales[0]) => <span>{item.total.toLocaleString('ar-SD')} ج.س</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof sales[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'date', label: 'التاريخ' },
  { key: 'actions', label: '', render: (item: typeof sales[0]) => (
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

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">فواتير البيع</h1>
          <p className="text-muted-foreground">إدارة فواتير البيع للعملاء</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={sales}
        searchKey="invoiceNumber"
        searchPlaceholder="بحث برقم الفاتورة..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />فاتورة جديدة</Button>}
      />
    </div>
  );
}
