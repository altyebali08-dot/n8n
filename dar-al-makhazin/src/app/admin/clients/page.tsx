'use client';

import { Building2, MoreHorizontal, Eye, Ban, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';

const clients = [
  { id: '1', name: 'شركة النيل للتجارة', email: 'info@nile-trade.sd', phone: '0912345678', plan: 'سنوي', users: 8, warehouses: 3, status: 'active', joinDate: '2024-01-15' },
  { id: '2', name: 'صيدلية الشفاء', email: 'info@shifa-pharm.sd', phone: '0923456789', plan: 'سنوي', users: 4, warehouses: 2, status: 'active', joinDate: '2024-02-01' },
  { id: '3', name: 'مجموعة البركة', email: 'info@baraka-group.sd', phone: '0934567890', plan: 'سنوي', users: 12, warehouses: 5, status: 'active', joinDate: '2024-01-20' },
  { id: '4', name: 'متجر الأمل', email: 'info@amal-store.sd', phone: '0945678901', plan: 'سنوي', users: 2, warehouses: 1, status: 'expired', joinDate: '2023-12-01' },
  { id: '5', name: 'مخازن السلام', email: 'info@salam-stores.sd', phone: '0956789012', plan: 'سنوي', users: 6, warehouses: 2, status: 'suspended', joinDate: '2024-03-01' },
  { id: '6', name: 'تجارة الرياض', email: 'info@riyadh-trade.sd', phone: '0967890123', plan: 'تجريبي', users: 3, warehouses: 1, status: 'trial', joinDate: '2024-03-10' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  active: 'success', expired: 'warning', suspended: 'destructive', trial: 'secondary',
};
const statusLabel: Record<string, string> = {
  active: 'نشط', expired: 'منتهي', suspended: 'موقوف', trial: 'تجريبي',
};

const columns = [
  { key: 'name', label: 'اسم العميل', render: (item: typeof clients[0]) => <span className="font-medium">{item.name}</span> },
  { key: 'email', label: 'البريد' },
  { key: 'plan', label: 'الخطة' },
  { key: 'users', label: 'المستخدمين' },
  { key: 'warehouses', label: 'المخازن' },
  { key: 'status', label: 'الحالة', render: (item: typeof clients[0]) => <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge> },
  { key: 'joinDate', label: 'تاريخ التسجيل' },
  { key: 'actions', label: '', render: (item: typeof clients[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Eye className="h-4 w-4 ml-2" />عرض التفاصيل</DropdownMenuItem>
        <DropdownMenuItem><CheckCircle2 className="h-4 w-4 ml-2" />تفعيل</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><Ban className="h-4 w-4 ml-2" />إيقاف</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function AdminClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة العملاء</h1>
        <p className="text-muted-foreground">عرض وإدارة جميع عملاء المنصة</p>
      </div>
      <DataTable columns={columns} data={clients} searchKey="name" searchPlaceholder="بحث في العملاء..." />
    </div>
  );
}
