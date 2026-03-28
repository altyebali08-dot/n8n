'use client';

import { Plus, UserCog, MoreHorizontal, Pencil, Trash2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const users = [
  { id: '1', name: 'أحمد محمد عبدالله', email: 'ahmed@daralmakhazin.sd', role: 'مدير', warehouse: 'جميع المخازن', lastLogin: '2024-03-15 10:30', status: 'نشط' },
  { id: '2', name: 'فاطمة عبدالله حسن', email: 'fatima@daralmakhazin.sd', role: 'مشرف', warehouse: 'فرع أمدرمان', lastLogin: '2024-03-15 09:15', status: 'نشط' },
  { id: '3', name: 'خالد إبراهيم محمد', email: 'khaled@daralmakhazin.sd', role: 'موظف مخزن', warehouse: 'المخزن الرئيسي', lastLogin: '2024-03-14 16:00', status: 'نشط' },
  { id: '4', name: 'سارة أحمد عمر', email: 'sara@daralmakhazin.sd', role: 'موظف مخزن', warehouse: 'فرع بحري', lastLogin: '2024-03-14 14:20', status: 'نشط' },
  { id: '5', name: 'عمر حسن علي', email: 'omar@daralmakhazin.sd', role: 'محاسب', warehouse: 'جميع المخازن', lastLogin: '2024-03-10 08:00', status: 'معطل' },
  { id: '6', name: 'مريم خالد أحمد', email: 'mariam@daralmakhazin.sd', role: 'موظف مبيعات', warehouse: 'المخزن الرئيسي', lastLogin: '2024-03-15 11:00', status: 'نشط' },
];

const statusVariant: Record<string, 'success' | 'destructive'> = {
  'نشط': 'success',
  'معطل': 'destructive',
};

const roleVariant: Record<string, 'default' | 'secondary' | 'warning'> = {
  'مدير': 'default',
  'مشرف': 'warning',
  'موظف مخزن': 'secondary',
  'محاسب': 'secondary',
  'موظف مبيعات': 'secondary',
};

const columns = [
  { key: 'name', label: 'الاسم', render: (item: typeof users[0]) => <span className="font-medium">{item.name}</span> },
  { key: 'email', label: 'البريد الإلكتروني', render: (item: typeof users[0]) => <span dir="ltr" className="text-sm">{item.email}</span> },
  { key: 'role', label: 'الدور', render: (item: typeof users[0]) => <Badge variant={roleVariant[item.role]}>{item.role}</Badge> },
  { key: 'warehouse', label: 'المخزن' },
  { key: 'lastLogin', label: 'آخر دخول', render: (item: typeof users[0]) => <span className="text-sm text-muted-foreground">{item.lastLogin}</span> },
  { key: 'status', label: 'الحالة', render: (item: typeof users[0]) => <Badge variant={statusVariant[item.status]}>{item.status}</Badge> },
  { key: 'actions', label: '', render: (item: typeof users[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Pencil className="h-4 w-4 ml-2" />تعديل</DropdownMenuItem>
        <DropdownMenuItem><Shield className="h-4 w-4 ml-2" />الصلاحيات</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 ml-2" />حذف</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">المستخدمين</h1>
          <p className="text-muted-foreground">إدارة المستخدمين والصلاحيات</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        searchPlaceholder="بحث في المستخدمين..."
        actions={<Button><Plus className="h-4 w-4 ml-1" />إضافة مستخدم</Button>}
      />
    </div>
  );
}
