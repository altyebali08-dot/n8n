'use client';

import { CreditCard, MoreHorizontal, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';

const subscriptions = [
  { id: '1', client: 'شركة النيل للتجارة', plan: 'الباقة السنوية', amount: 150000, startDate: '2024-01-15', endDate: '2025-01-15', status: 'active' },
  { id: '2', client: 'صيدلية الشفاء', plan: 'الباقة السنوية', amount: 150000, startDate: '2024-02-01', endDate: '2025-02-01', status: 'active' },
  { id: '3', client: 'مجموعة البركة', plan: 'الباقة السنوية', amount: 150000, startDate: '2024-01-20', endDate: '2025-01-20', status: 'active' },
  { id: '4', client: 'متجر الأمل', plan: 'الباقة السنوية', amount: 150000, startDate: '2023-12-01', endDate: '2024-12-01', status: 'expired' },
  { id: '5', client: 'تجارة الرياض', plan: 'تجريبي', amount: 0, startDate: '2024-03-10', endDate: '2024-03-24', status: 'trial' },
];

const statusVariant: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  active: 'success', expired: 'warning', cancelled: 'destructive', trial: 'secondary',
};
const statusLabel: Record<string, string> = {
  active: 'نشط', expired: 'منتهي', cancelled: 'ملغي', trial: 'تجريبي',
};

const columns = [
  { key: 'client', label: 'العميل', render: (item: typeof subscriptions[0]) => <span className="font-medium">{item.client}</span> },
  { key: 'plan', label: 'الخطة' },
  { key: 'amount', label: 'المبلغ', render: (item: typeof subscriptions[0]) => <span>{formatCurrency(item.amount)}</span> },
  { key: 'startDate', label: 'تاريخ البدء' },
  { key: 'endDate', label: 'تاريخ الانتهاء' },
  { key: 'status', label: 'الحالة', render: (item: typeof subscriptions[0]) => <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge> },
  { key: 'actions', label: '', render: (item: typeof subscriptions[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><RefreshCw className="h-4 w-4 ml-2" />تجديد</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><XCircle className="h-4 w-4 ml-2" />إلغاء</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة الاشتراكات</h1>
        <p className="text-muted-foreground">عرض وإدارة جميع اشتراكات العملاء</p>
      </div>
      <DataTable columns={columns} data={subscriptions} searchKey="client" searchPlaceholder="بحث في الاشتراكات..." />
    </div>
  );
}
