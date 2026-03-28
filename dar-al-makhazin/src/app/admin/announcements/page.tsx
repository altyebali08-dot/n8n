'use client';

import { useState } from 'react';
import { Megaphone, MoreHorizontal, Plus, Eye, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/dashboard/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

const announcements = [
  { id: '1', title: 'تحديث النظام v2.5', content: 'تم إضافة ميزات جديدة لإدارة المخزون تشمل التتبع التلقائي والتنبيهات الذكية', type: 'تحديث', audience: 'الكل', status: 'published', date: '2024-03-15' },
  { id: '2', title: 'صيانة مجدولة', content: 'سيتم إجراء صيانة دورية يوم الجمعة من الساعة 2 إلى 4 صباحاً', type: 'صيانة', audience: 'الكل', status: 'published', date: '2024-03-14' },
  { id: '3', title: 'عرض خاص - خصم 20%', content: 'خصم 20% على الاشتراكات السنوية الجديدة حتى نهاية الشهر', type: 'عرض', audience: 'عملاء جدد', status: 'published', date: '2024-03-12' },
  { id: '4', title: 'ميزة التقارير المتقدمة', content: 'قريباً - تقارير متقدمة مع رسوم بيانية تفاعلية وتحليلات مفصلة', type: 'تحديث', audience: 'المشتركين', status: 'draft', date: '2024-03-10' },
  { id: '5', title: 'تغيير في سياسة الاسترجاع', content: 'تم تحديث سياسة الاسترجاع لتكون أكثر مرونة', type: 'سياسة', audience: 'الكل', status: 'draft', date: '2024-03-08' },
];

const typeVariant: Record<string, 'default' | 'secondary' | 'warning' | 'destructive'> = {
  'تحديث': 'default', 'صيانة': 'warning', 'عرض': 'success' as 'default', 'سياسة': 'secondary',
};

const statusVariant: Record<string, 'success' | 'secondary'> = {
  published: 'success', draft: 'secondary',
};
const statusLabel: Record<string, string> = {
  published: 'منشور', draft: 'مسودة',
};

const columns = [
  { key: 'title', label: 'العنوان', render: (item: typeof announcements[0]) => (
    <div>
      <p className="font-medium">{item.title}</p>
      <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">{item.content}</p>
    </div>
  )},
  { key: 'type', label: 'النوع', render: (item: typeof announcements[0]) => <Badge variant="outline">{item.type}</Badge> },
  { key: 'audience', label: 'الجمهور' },
  { key: 'date', label: 'التاريخ' },
  { key: 'status', label: 'الحالة', render: (item: typeof announcements[0]) => <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge> },
  { key: 'actions', label: '', render: (item: typeof announcements[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Eye className="h-4 w-4 ml-2" />معاينة</DropdownMenuItem>
        <DropdownMenuItem><Edit className="h-4 w-4 ml-2" />تعديل</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 ml-2" />حذف</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function AdminAnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الإعلانات</h1>
          <p className="text-muted-foreground">إدارة الإعلانات والتنبيهات للعملاء</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 ml-2" />
          إعلان جديد
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>إنشاء إعلان جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">عنوان الإعلان</Label>
                <Input id="title" placeholder="أدخل عنوان الإعلان" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="content">المحتوى</Label>
                <Textarea id="content" placeholder="أدخل محتوى الإعلان" rows={4} />
              </div>
              <div className="space-y-2">
                <Label>النوع</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="اختر النوع" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="update">تحديث</SelectItem>
                    <SelectItem value="maintenance">صيانة</SelectItem>
                    <SelectItem value="offer">عرض</SelectItem>
                    <SelectItem value="policy">سياسة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>الجمهور المستهدف</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="اختر الجمهور" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="subscribers">المشتركين</SelectItem>
                    <SelectItem value="new">عملاء جدد</SelectItem>
                    <SelectItem value="trial">الفترة التجريبية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button>نشر الإعلان</Button>
                <Button variant="outline">حفظ كمسودة</Button>
                <Button variant="ghost" onClick={() => setShowForm(false)}>إلغاء</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={announcements} searchKey="title" searchPlaceholder="بحث في الإعلانات..." />
    </div>
  );
}
