'use client';

import { ScrollText, Filter, User, Settings, CreditCard, Building2, Shield, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const auditLogs = [
  { id: '1', action: 'تسجيل دخول', entity: 'المستخدم', entityName: 'admin@dar-almakhazin.sd', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-15 14:32:00', category: 'auth' },
  { id: '2', action: 'قبول دفعة', entity: 'المدفوعات', entityName: 'شركة النيل للتجارة - 150,000 ج.س', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-15 14:15:00', category: 'payment' },
  { id: '3', action: 'تفعيل اشتراك', entity: 'الاشتراكات', entityName: 'شركة النيل للتجارة - سنوي', user: 'النظام', userRole: 'نظام', ip: '-', timestamp: '2024-03-15 14:15:01', category: 'subscription' },
  { id: '4', action: 'إنشاء عميل', entity: 'العملاء', entityName: 'تجارة الرياض', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-15 13:45:00', category: 'client' },
  { id: '5', action: 'تحديث إعدادات', entity: 'النظام', entityName: 'إعدادات الدفع', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-15 12:30:00', category: 'settings' },
  { id: '6', action: 'رفض دفعة', entity: 'المدفوعات', entityName: 'متجر الأمل - 150,000 ج.س', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-13 16:20:00', category: 'payment' },
  { id: '7', action: 'إيقاف عميل', entity: 'العملاء', entityName: 'مخازن السلام', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-13 15:10:00', category: 'client' },
  { id: '8', action: 'نشر إعلان', entity: 'الإعلانات', entityName: 'تحديث النظام v2.5', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-12 10:00:00', category: 'content' },
  { id: '9', action: 'تحديث خطة', entity: 'الخطط', entityName: 'الباقة السنوية - تعديل السعر', user: 'مدير النظام', userRole: 'مدير', ip: '196.29.45.12', timestamp: '2024-03-11 09:30:00', category: 'plan' },
  { id: '10', action: 'نسخ احتياطي', entity: 'النظام', entityName: 'نسخة احتياطية كاملة', user: 'النظام', userRole: 'نظام', ip: '-', timestamp: '2024-03-11 03:00:00', category: 'system' },
];

const categoryConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; variant: 'default' | 'secondary' | 'warning' | 'destructive' | 'success' | 'outline' }> = {
  auth: { label: 'مصادقة', icon: Shield, variant: 'secondary' },
  payment: { label: 'مدفوعات', icon: CreditCard, variant: 'warning' },
  subscription: { label: 'اشتراكات', icon: CreditCard, variant: 'success' },
  client: { label: 'عملاء', icon: Building2, variant: 'default' },
  settings: { label: 'إعدادات', icon: Settings, variant: 'outline' },
  content: { label: 'محتوى', icon: ScrollText, variant: 'secondary' },
  plan: { label: 'خطط', icon: Database, variant: 'outline' },
  system: { label: 'نظام', icon: Database, variant: 'secondary' },
};

const columns = [
  { key: 'timestamp', label: 'التاريخ والوقت', render: (item: typeof auditLogs[0]) => <span className="text-xs font-mono whitespace-nowrap">{item.timestamp}</span> },
  { key: 'action', label: 'الإجراء', render: (item: typeof auditLogs[0]) => <span className="font-medium text-sm">{item.action}</span> },
  { key: 'category', label: 'التصنيف', render: (item: typeof auditLogs[0]) => {
    const config = categoryConfig[item.category];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  }},
  { key: 'entityName', label: 'التفاصيل', render: (item: typeof auditLogs[0]) => (
    <div>
      <p className="text-sm">{item.entityName}</p>
      <p className="text-xs text-muted-foreground">{item.entity}</p>
    </div>
  )},
  { key: 'user', label: 'المستخدم', render: (item: typeof auditLogs[0]) => (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
        <User className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm">{item.user}</p>
        <p className="text-xs text-muted-foreground">{item.userRole}</p>
      </div>
    </div>
  )},
  { key: 'ip', label: 'عنوان IP', render: (item: typeof auditLogs[0]) => <span className="font-mono text-xs">{item.ip}</span> },
];

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">سجل العمليات</h1>
        <p className="text-muted-foreground">سجل جميع الإجراءات والتغييرات في النظام</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">تصفية:</span>
        </div>
        <Select>
          <SelectTrigger className="w-40"><SelectValue placeholder="التصنيف" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="auth">مصادقة</SelectItem>
            <SelectItem value="payment">مدفوعات</SelectItem>
            <SelectItem value="subscription">اشتراكات</SelectItem>
            <SelectItem value="client">عملاء</SelectItem>
            <SelectItem value="settings">إعدادات</SelectItem>
            <SelectItem value="system">نظام</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-40"><SelectValue placeholder="المستخدم" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="admin">مدير النظام</SelectItem>
            <SelectItem value="system">النظام</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={auditLogs} searchKey="action" searchPlaceholder="بحث في السجل..." />
    </div>
  );
}
