'use client';

import { LifeBuoy, MoreHorizontal, Eye, MessageSquare, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import { StatCard } from '@/components/dashboard/stat-card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { formatNumber } from '@/lib/utils';

const tickets = [
  { id: 'TK-001', subject: 'مشكلة في تسجيل الدخول', client: 'شركة النيل للتجارة', user: 'أحمد محمد', priority: 'high', status: 'open', category: 'تقني', created: '2024-03-15', lastReply: '2024-03-15' },
  { id: 'TK-002', subject: 'طلب إضافة مخزن جديد', client: 'صيدلية الشفاء', user: 'فاطمة علي', priority: 'medium', status: 'in_progress', category: 'طلب', created: '2024-03-14', lastReply: '2024-03-15' },
  { id: 'TK-003', subject: 'خطأ في حساب المخزون', client: 'مجموعة البركة', user: 'عمر حسن', priority: 'high', status: 'open', category: 'تقني', created: '2024-03-14', lastReply: '2024-03-14' },
  { id: 'TK-004', subject: 'استفسار عن التقارير', client: 'متجر الأمل', user: 'سارة أحمد', priority: 'low', status: 'resolved', category: 'استفسار', created: '2024-03-13', lastReply: '2024-03-14' },
  { id: 'TK-005', subject: 'مشكلة في طباعة الباركود', client: 'مخازن السلام', user: 'خالد إبراهيم', priority: 'medium', status: 'in_progress', category: 'تقني', created: '2024-03-13', lastReply: '2024-03-13' },
  { id: 'TK-006', subject: 'طلب تدريب على النظام', client: 'تجارة الرياض', user: 'نورا عبدالله', priority: 'low', status: 'open', category: 'تدريب', created: '2024-03-12', lastReply: '2024-03-12' },
  { id: 'TK-007', subject: 'بطء في تحميل الصفحات', client: 'شركة النيل للتجارة', user: 'أحمد محمد', priority: 'high', status: 'resolved', category: 'تقني', created: '2024-03-11', lastReply: '2024-03-13' },
  { id: 'TK-008', subject: 'طلب تغيير الباقة', client: 'صيدلية الشفاء', user: 'فاطمة علي', priority: 'medium', status: 'closed', category: 'حساب', created: '2024-03-10', lastReply: '2024-03-12' },
];

const priorityConfig: Record<string, { label: string; variant: 'destructive' | 'warning' | 'secondary' }> = {
  high: { label: 'عاجل', variant: 'destructive' },
  medium: { label: 'متوسط', variant: 'warning' },
  low: { label: 'منخفض', variant: 'secondary' },
};

const statusConfig: Record<string, { label: string; variant: 'warning' | 'default' | 'success' | 'secondary' }> = {
  open: { label: 'مفتوحة', variant: 'warning' },
  in_progress: { label: 'قيد المعالجة', variant: 'default' },
  resolved: { label: 'تم الحل', variant: 'success' },
  closed: { label: 'مغلقة', variant: 'secondary' },
};

const columns = [
  { key: 'id', label: 'رقم التذكرة', render: (item: typeof tickets[0]) => <span className="font-mono text-xs">{item.id}</span> },
  { key: 'subject', label: 'الموضوع', render: (item: typeof tickets[0]) => (
    <div>
      <p className="font-medium text-sm">{item.subject}</p>
      <p className="text-xs text-muted-foreground">{item.client} - {item.user}</p>
    </div>
  )},
  { key: 'category', label: 'التصنيف', render: (item: typeof tickets[0]) => <Badge variant="outline">{item.category}</Badge> },
  { key: 'priority', label: 'الأولوية', render: (item: typeof tickets[0]) => <Badge variant={priorityConfig[item.priority].variant}>{priorityConfig[item.priority].label}</Badge> },
  { key: 'status', label: 'الحالة', render: (item: typeof tickets[0]) => <Badge variant={statusConfig[item.status].variant}>{statusConfig[item.status].label}</Badge> },
  { key: 'created', label: 'تاريخ الإنشاء' },
  { key: 'lastReply', label: 'آخر رد' },
  { key: 'actions', label: '', render: (item: typeof tickets[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Eye className="h-4 w-4 ml-2" />عرض التذكرة</DropdownMenuItem>
        <DropdownMenuItem><MessageSquare className="h-4 w-4 ml-2" />الرد</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><CheckCircle2 className="h-4 w-4 ml-2" />إغلاق التذكرة</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function AdminTicketsPage() {
  const openCount = tickets.filter((t) => t.status === 'open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'in_progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'resolved').length;
  const highPriorityCount = tickets.filter((t) => t.priority === 'high' && t.status !== 'resolved' && t.status !== 'closed').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">تذاكر الدعم</h1>
        <p className="text-muted-foreground">إدارة تذاكر الدعم الفني للعملاء</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="تذاكر مفتوحة" value={formatNumber(openCount)} icon={<LifeBuoy className="h-5 w-5" />} change="بحاجة للرد" trend="down" />
        <StatCard title="قيد المعالجة" value={formatNumber(inProgressCount)} icon={<Clock className="h-5 w-5" />} change="يتم العمل عليها" trend="neutral" />
        <StatCard title="تم حلها" value={formatNumber(resolvedCount)} icon={<CheckCircle2 className="h-5 w-5" />} change="هذا الشهر" trend="up" />
        <StatCard title="عاجلة" value={formatNumber(highPriorityCount)} icon={<AlertTriangle className="h-5 w-5" />} change="تحتاج اهتمام فوري" trend="down" />
      </div>

      <DataTable columns={columns} data={tickets} searchKey="subject" searchPlaceholder="بحث في التذاكر..." />
    </div>
  );
}
