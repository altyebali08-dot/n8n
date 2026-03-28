'use client';

import { Plus, RotateCcw, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const returns = [
  { id: '1', returnNumber: 'RT-2024-001', type: 'عميل', entity: 'سوبرماركت الأمل', product: 'أرز بسمتي 5 كجم', quantity: 50, reason: 'عيب في التغليف', status: 'مقبول', date: '2024-03-15' },
  { id: '2', returnNumber: 'RT-2024-002', type: 'مورد', entity: 'شركة السودان للتجارة', product: 'زيت طعام 1 لتر', quantity: 30, reason: 'منتهي الصلاحية', status: 'قيد المراجعة', date: '2024-03-14' },
  { id: '3', returnNumber: 'RT-2024-003', type: 'عميل', entity: 'بقالة الحي', product: 'حليب بودرة 400 جم', quantity: 20, reason: 'تلف أثناء النقل', status: 'مقبول', date: '2024-03-13' },
  { id: '4', returnNumber: 'RT-2024-004', type: 'مورد', entity: 'مؤسسة النيل للاستيراد', product: 'شاي كرك 500 جم', quantity: 100, reason: 'خطأ في الطلب', status: 'مرفوض', date: '2024-03-12' },
  { id: '5', returnNumber: 'RT-2024-005', type: 'عميل', entity: 'تموينات الخرطوم', product: 'سكر أبيض 1 كجم', quantity: 15, reason: 'عيب في المنتج', status: 'مقبول', date: '2024-03-11' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive'> = {
  'مقبول': 'success',
  'قيد المراجعة': 'warning',
  'مرفوض': 'destructive',
};

const typeVariant: Record<string, 'default' | 'secondary'> = {
  'عميل': 'default',
  'مورد': 'secondary',
};

const columns = [
  { key: 'returnNumber', label: 'رقم المرتجع', render: (item: typeof returns[0]) => <span className="font-medium font-mono">{item.returnNumber}</span> },
  { key: 'type', label: 'النوع', render: (item: typeof returns[0]) => <Badge variant={typeVariant[item.type]}>{item.type}</Badge> },
  { key: 'entity', label: 'الجهة' },
  { key: 'product', label: 'المنتج' },
  { key: 'quantity', label: 'الكمية', render: (item: typeof returns[0]) => <span>{item.quantity} وحدة</span> },
  { key: 'reason', label: 'السبب' },
  { key: 'status', label: 'الحالة', render: (item: typeof returns[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'date', label: 'التاريخ' },
  { key: 'actions', label: '', render: (item: typeof returns[0]) => (
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

export default function ReturnsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">المرتجعات</h1>
          <p className="text-muted-foreground">إدارة مرتجعات العملاء والموردين</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={returns}
        searchKey="returnNumber"
        searchPlaceholder="بحث برقم المرتجع..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />تسجيل مرتجع</Button>}
      />
    </div>
  );
}
