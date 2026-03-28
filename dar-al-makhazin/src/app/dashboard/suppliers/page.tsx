'use client';

import { Plus, Truck, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const suppliers = [
  { id: '1', name: 'شركة السودان للتجارة', phone: '0912345678', email: 'info@sudantrade.sd', totalPurchases: 1250000, status: 'نشط' },
  { id: '2', name: 'مؤسسة النيل للاستيراد', phone: '0923456789', email: 'sales@nileimport.sd', totalPurchases: 980000, status: 'نشط' },
  { id: '3', name: 'شركة الخرطوم الغذائية', phone: '0934567890', email: 'orders@krtfood.sd', totalPurchases: 750000, status: 'نشط' },
  { id: '4', name: 'مصنع الشمال للمنظفات', phone: '0945678901', email: 'info@shamalnorth.sd', totalPurchases: 430000, status: 'نشط' },
  { id: '5', name: 'شركة البحر الأحمر', phone: '0956789012', email: 'contact@redsea.sd', totalPurchases: 280000, status: 'معلق' },
  { id: '6', name: 'مؤسسة الجزيرة التجارية', phone: '0967890123', email: 'info@gezira.sd', totalPurchases: 150000, status: 'نشط' },
];

const statusVariant: Record<string, 'success' | 'warning'> = {
  'نشط': 'success',
  'معلق': 'warning',
};

const columns = [
  { key: 'name', label: 'اسم المورد', render: (item: typeof suppliers[0]) => <span className="font-medium">{item.name}</span> },
  { key: 'phone', label: 'الهاتف', render: (item: typeof suppliers[0]) => <span dir="ltr">{item.phone}</span> },
  { key: 'email', label: 'البريد الإلكتروني', render: (item: typeof suppliers[0]) => <span dir="ltr" className="text-sm">{item.email}</span> },
  { key: 'totalPurchases', label: 'إجمالي المشتريات', render: (item: typeof suppliers[0]) => <span>{item.totalPurchases.toLocaleString('ar-SD')} ج.س</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof suppliers[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'actions', label: '', render: (item: typeof suppliers[0]) => (
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

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الموردين</h1>
          <p className="text-muted-foreground">إدارة الموردين والمشتريات</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={suppliers}
        searchKey="name"
        searchPlaceholder="بحث في الموردين..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />إضافة مورد</Button>}
      />
    </div>
  );
}
