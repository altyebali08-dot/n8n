'use client';

import { Plus, Tags, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/data-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const categories = [
  { id: '1', name: 'أغذية', description: 'المواد الغذائية الأساسية', products: 45 },
  { id: '2', name: 'مشروبات', description: 'المشروبات بأنواعها', products: 23 },
  { id: '3', name: 'ألبان', description: 'منتجات الألبان والأجبان', products: 18 },
  { id: '4', name: 'منظفات', description: 'مواد التنظيف والمنظفات', products: 32 },
  { id: '5', name: 'أدوات منزلية', description: 'الأدوات والمستلزمات المنزلية', products: 15 },
];

const columns = [
  { key: 'name', label: 'التصنيف', render: (item: typeof categories[0]) => <span className="font-medium">{item.name}</span> },
  { key: 'description', label: 'الوصف' },
  { key: 'products', label: 'عدد المنتجات', render: (item: typeof categories[0]) => <span>{item.products} منتج</span> },
  { key: 'actions', label: '', render: (item: typeof categories[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Pencil className="h-4 w-4 ml-2" />تعديل</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 ml-2" />حذف</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">التصنيفات</h1>
          <p className="text-muted-foreground">إدارة تصنيفات المنتجات</p>
        </div>
      </div>
      <DataTable columns={columns} data={categories} searchKey="name" searchPlaceholder="بحث في التصنيفات..." actions={<Button><Plus className="h-4 w-4 ml-1" />إضافة تصنيف</Button>} />
    </div>
  );
}
