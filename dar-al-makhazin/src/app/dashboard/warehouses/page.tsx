'use client';

import { Plus, Warehouse, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const warehouses = [
  { id: '1', name: 'المخزن الرئيسي', address: 'الخرطوم - الصناعية', phone: '0912345678', manager: 'أحمد محمد', products: 450, status: 'نشط' },
  { id: '2', name: 'فرع أمدرمان', address: 'أمدرمان - السوق الكبير', phone: '0923456789', manager: 'فاطمة عبدالله', products: 280, status: 'نشط' },
  { id: '3', name: 'فرع بحري', address: 'بحري - الحلفايا', phone: '0934567890', manager: 'خالد إبراهيم', products: 195, status: 'نشط' },
  { id: '4', name: 'مخزن بورتسودان', address: 'بورتسودان - الميناء', phone: '0945678901', manager: 'سارة أحمد', products: 320, status: 'نشط' },
  { id: '5', name: 'مخزن مدني', address: 'ود مدني - السوق المركزي', phone: '0956789012', manager: 'عمر حسن', products: 0, status: 'معطل' },
];

const statusVariant: Record<string, 'success' | 'destructive'> = {
  'نشط': 'success',
  'معطل': 'destructive',
};

const columns = [
  { key: 'name', label: 'اسم المخزن', render: (item: typeof warehouses[0]) => <span className="font-medium">{item.name}</span> },
  { key: 'address', label: 'العنوان' },
  { key: 'phone', label: 'الهاتف', render: (item: typeof warehouses[0]) => <span dir="ltr">{item.phone}</span> },
  { key: 'manager', label: 'المدير' },
  { key: 'products', label: 'عدد المنتجات', render: (item: typeof warehouses[0]) => <span>{item.products} منتج</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof warehouses[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'actions', label: '', render: (item: typeof warehouses[0]) => (
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

export default function WarehousesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">المخازن</h1>
          <p className="text-muted-foreground">إدارة المخازن والفروع</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={warehouses}
        searchKey="name"
        searchPlaceholder="بحث في المخازن..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />إضافة مخزن</Button>}
      />
    </div>
  );
}
