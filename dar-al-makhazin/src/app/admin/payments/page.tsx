'use client';

import { Wallet, MoreHorizontal, CheckCircle2, XCircle, Eye, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { formatCurrency } from '@/lib/utils';

const payments = [
  { id: '1', client: 'شركة النيل للتجارة', amount: 150000, method: 'بنكك', proofUrl: '/proof-1.jpg', status: 'pending', date: '2024-03-15', notes: '' },
  { id: '2', client: 'صيدلية الشفاء', amount: 150000, method: 'فوري', proofUrl: '/proof-2.jpg', status: 'approved', date: '2024-03-14', notes: 'تم التحقق' },
  { id: '3', client: 'مجموعة البركة', amount: 150000, method: 'تحويل بنكي', proofUrl: '/proof-3.jpg', status: 'pending', date: '2024-03-14', notes: '' },
  { id: '4', client: 'متجر الأمل', amount: 150000, method: 'أو-كاش', proofUrl: '/proof-4.jpg', status: 'rejected', date: '2024-03-13', notes: 'إثبات غير واضح' },
  { id: '5', client: 'مخازن السلام', amount: 150000, method: 'إي-كاش', proofUrl: '/proof-5.jpg', status: 'approved', date: '2024-03-13', notes: 'تم التحقق' },
  { id: '6', client: 'تجارة الرياض', amount: 150000, method: 'بنكك', proofUrl: '/proof-6.jpg', status: 'pending', date: '2024-03-12', notes: '' },
];

const statusVariant: Record<string, 'warning' | 'success' | 'destructive'> = {
  pending: 'warning', approved: 'success', rejected: 'destructive',
};
const statusLabel: Record<string, string> = {
  pending: 'بانتظار المراجعة', approved: 'مقبول', rejected: 'مرفوض',
};

const columns = [
  { key: 'client', label: 'العميل', render: (item: typeof payments[0]) => <span className="font-medium">{item.client}</span> },
  { key: 'amount', label: 'المبلغ', render: (item: typeof payments[0]) => formatCurrency(item.amount) },
  { key: 'method', label: 'طريقة الدفع' },
  { key: 'date', label: 'التاريخ' },
  { key: 'status', label: 'الحالة', render: (item: typeof payments[0]) => <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge> },
  { key: 'notes', label: 'ملاحظات', render: (item: typeof payments[0]) => <span className="text-muted-foreground text-xs">{item.notes || '-'}</span> },
  { key: 'actions', label: '', render: (item: typeof payments[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Image className="h-4 w-4 ml-2" />عرض إثبات الدفع</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><CheckCircle2 className="h-4 w-4 ml-2 text-success" />قبول وتفعيل</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><XCircle className="h-4 w-4 ml-2" />رفض</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة المدفوعات</h1>
        <p className="text-muted-foreground">مراجعة وإدارة إثباتات الدفع</p>
      </div>
      <DataTable columns={columns} data={payments} searchKey="client" searchPlaceholder="بحث في المدفوعات..." />
    </div>
  );
}
