'use client';

import { Plus, Package, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const products = [
  { id: '1', name: 'أرز بسمتي 5 كجم', sku: 'RIC-001', category: 'أغذية', stock: 500, minStock: 100, price: 3500, status: 'متوفر' },
  { id: '2', name: 'سكر أبيض 1 كجم', sku: 'SUG-001', category: 'أغذية', stock: 50, minStock: 100, price: 1200, status: 'منخفض' },
  { id: '3', name: 'زيت طعام 1 لتر', sku: 'OIL-001', category: 'أغذية', stock: 0, minStock: 50, price: 2800, status: 'نفد' },
  { id: '4', name: 'شاي كرك 500 جم', sku: 'TEA-001', category: 'مشروبات', stock: 300, minStock: 80, price: 1500, status: 'متوفر' },
  { id: '5', name: 'دقيق أبيض 2 كجم', sku: 'FLR-001', category: 'أغذية', stock: 200, minStock: 100, price: 2000, status: 'متوفر' },
  { id: '6', name: 'حليب بودرة 400 جم', sku: 'MLK-001', category: 'ألبان', stock: 75, minStock: 80, price: 4500, status: 'منخفض' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive'> = {
  'متوفر': 'success',
  'منخفض': 'warning',
  'نفد': 'destructive',
};

const columns = [
  { key: 'name', label: 'المنتج' },
  { key: 'sku', label: 'الرمز' },
  { key: 'category', label: 'التصنيف' },
  { key: 'stock', label: 'المخزون', render: (item: typeof products[0]) => <span className="font-medium">{item.stock}</span> },
  { key: 'price', label: 'السعر', render: (item: typeof products[0]) => <span>{item.price.toLocaleString('ar-SD')} ج.س</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof products[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'actions', label: '', render: (item: typeof products[0]) => (
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

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">المنتجات</h1>
          <p className="text-muted-foreground">إدارة منتجاتك ومخزونك</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={products}
        searchKey="name"
        searchPlaceholder="بحث في المنتجات..."
        actions={
          <Button><Plus className="h-4 w-4 ml-1" />إضافة منتج</Button>
        }
      />
    </div>
  );
}
