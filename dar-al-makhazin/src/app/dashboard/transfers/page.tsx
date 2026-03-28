'use client';

import { Plus, Repeat, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const transfers = [
  { id: '1', transferNumber: 'TR-2024-001', fromWarehouse: 'المخزن الرئيسي', toWarehouse: 'فرع أمدرمان', items: 12, status: 'مكتمل', date: '2024-03-15' },
  { id: '2', transferNumber: 'TR-2024-002', fromWarehouse: 'المخزن الرئيسي', toWarehouse: 'فرع بحري', items: 8, status: 'قيد التنفيذ', date: '2024-03-14' },
  { id: '3', transferNumber: 'TR-2024-003', fromWarehouse: 'فرع أمدرمان', toWarehouse: 'المخزن الرئيسي', items: 5, status: 'مكتمل', date: '2024-03-13' },
  { id: '4', transferNumber: 'TR-2024-004', fromWarehouse: 'المخزن الرئيسي', toWarehouse: 'مخزن بورتسودان', items: 20, status: 'في الطريق', date: '2024-03-12' },
  { id: '5', transferNumber: 'TR-2024-005', fromWarehouse: 'فرع بحري', toWarehouse: 'فرع أمدرمان', items: 3, status: 'ملغي', date: '2024-03-11' },
  { id: '6', transferNumber: 'TR-2024-006', fromWarehouse: 'المخزن الرئيسي', toWarehouse: 'فرع بحري', items: 15, status: 'معلق', date: '2024-03-10' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive' | 'secondary' | 'default'> = {
  'مكتمل': 'success',
  'قيد التنفيذ': 'warning',
  'في الطريق': 'default',
  'معلق': 'secondary',
  'ملغي': 'destructive',
};

const columns = [
  { key: 'transferNumber', label: 'رقم التحويل', render: (item: typeof transfers[0]) => <span className="font-medium font-mono">{item.transferNumber}</span> },
  { key: 'fromWarehouse', label: 'من مخزن' },
  { key: 'toWarehouse', label: 'إلى مخزن' },
  { key: 'items', label: 'عدد الأصناف', render: (item: typeof transfers[0]) => <span>{item.items} صنف</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof transfers[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'date', label: 'التاريخ' },
  { key: 'actions', label: '', render: (item: typeof transfers[0]) => (
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

export default function TransfersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">التحويلات</h1>
          <p className="text-muted-foreground">إدارة تحويلات المخزون بين المخازن</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={transfers}
        searchKey="transferNumber"
        searchPlaceholder="بحث برقم التحويل..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />تحويل جديد</Button>}
      />
    </div>
  );
}
