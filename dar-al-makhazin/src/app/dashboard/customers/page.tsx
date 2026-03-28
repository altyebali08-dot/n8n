'use client';

import { Plus, Users, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const customers = [
  { id: '1', name: 'سوبرماركت الأمل', phone: '0911234567', email: 'alamal@store.sd', totalSales: 890000, status: 'نشط' },
  { id: '2', name: 'بقالة الحي', phone: '0922345678', email: 'alhay@store.sd', totalSales: 650000, status: 'نشط' },
  { id: '3', name: 'تموينات الخرطوم', phone: '0933456789', email: 'krt@tamwinat.sd', totalSales: 520000, status: 'نشط' },
  { id: '4', name: 'متجر البركة', phone: '0944567890', email: 'baraka@shop.sd', totalSales: 380000, status: 'نشط' },
  { id: '5', name: 'سوبرماركت النور', phone: '0955678901', email: 'nour@market.sd', totalSales: 270000, status: 'معلق' },
  { id: '6', name: 'مطعم السلام', phone: '0966789012', email: 'salam@rest.sd', totalSales: 190000, status: 'نشط' },
];

const statusVariant: Record<string, 'success' | 'warning'> = {
  'نشط': 'success',
  'معلق': 'warning',
};

const columns = [
  { key: 'name', label: 'اسم العميل', render: (item: typeof customers[0]) => <span className="font-medium">{item.name}</span> },
  { key: 'phone', label: 'الهاتف', render: (item: typeof customers[0]) => <span dir="ltr">{item.phone}</span> },
  { key: 'email', label: 'البريد الإلكتروني', render: (item: typeof customers[0]) => <span dir="ltr" className="text-sm">{item.email}</span> },
  { key: 'totalSales', label: 'إجمالي المبيعات', render: (item: typeof customers[0]) => <span>{item.totalSales.toLocaleString('ar-SD')} ج.س</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof customers[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'actions', label: '', render: (item: typeof customers[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Pencil className="h-4 w-4 ml-2" />تعديل</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 ml-2" />حذف</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">العملاء</h1>
          <p className="text-muted-foreground">إدارة العملاء والمبيعات</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={customers}
        searchKey="name"
        searchPlaceholder="بحث في العملاء..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />إضافة عميل</Button>}
      />
    </div>
  );
}
