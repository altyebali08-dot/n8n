'use client';

import { useState } from 'react';
import { FileText, MoreHorizontal, Edit, Eye, Trash2, Plus, Globe, Image, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/dashboard/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';

const pages = [
  { id: '1', title: 'الصفحة الرئيسية', slug: '/', section: 'رئيسي', status: 'published', lastUpdated: '2024-03-15' },
  { id: '2', title: 'المميزات', slug: '/features', section: 'رئيسي', status: 'published', lastUpdated: '2024-03-14' },
  { id: '3', title: 'الأسعار', slug: '/pricing', section: 'رئيسي', status: 'published', lastUpdated: '2024-03-14' },
  { id: '4', title: 'من نحن', slug: '/about', section: 'رئيسي', status: 'published', lastUpdated: '2024-03-12' },
  { id: '5', title: 'تواصل معنا', slug: '/contact', section: 'رئيسي', status: 'published', lastUpdated: '2024-03-12' },
  { id: '6', title: 'الأسئلة الشائعة', slug: '/faq', section: 'دعم', status: 'published', lastUpdated: '2024-03-10' },
  { id: '7', title: 'سياسة الخصوصية', slug: '/privacy', section: 'قانوني', status: 'published', lastUpdated: '2024-03-05' },
  { id: '8', title: 'شروط الاستخدام', slug: '/terms', section: 'قانوني', status: 'published', lastUpdated: '2024-03-05' },
  { id: '9', title: 'كيف يعمل النظام', slug: '/how-it-works', section: 'رئيسي', status: 'draft', lastUpdated: '2024-03-01' },
];

const faqs = [
  { id: '1', question: 'ما هي دار المخازن؟', answer: 'نظام إدارة مخازن سحابي متكامل مصمم خصيصاً للسوق السوداني', order: 1, status: 'published' },
  { id: '2', question: 'كيف يمكنني البدء؟', answer: 'سجل حساب جديد واحصل على فترة تجريبية مجانية لمدة 14 يوم', order: 2, status: 'published' },
  { id: '3', question: 'ما طرق الدفع المتاحة؟', answer: 'ندعم بنكك، فوري، تحويل بنكي، أو-كاش، وإي-كاش', order: 3, status: 'published' },
  { id: '4', question: 'هل البيانات آمنة؟', answer: 'نعم، نستخدم أحدث تقنيات التشفير وننشئ نسخ احتياطية يومية', order: 4, status: 'published' },
  { id: '5', question: 'هل يمكنني استخدام النظام من الهاتف؟', answer: 'نعم، النظام متجاوب ويعمل على جميع الأجهزة', order: 5, status: 'draft' },
];

const statusVariant: Record<string, 'success' | 'secondary'> = {
  published: 'success', draft: 'secondary',
};
const statusLabel: Record<string, string> = {
  published: 'منشور', draft: 'مسودة',
};

const pageColumns = [
  { key: 'title', label: 'العنوان', render: (item: typeof pages[0]) => (
    <div>
      <p className="font-medium">{item.title}</p>
      <p className="text-xs text-muted-foreground font-mono" dir="ltr">{item.slug}</p>
    </div>
  )},
  { key: 'section', label: 'القسم', render: (item: typeof pages[0]) => <Badge variant="outline">{item.section}</Badge> },
  { key: 'status', label: 'الحالة', render: (item: typeof pages[0]) => <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge> },
  { key: 'lastUpdated', label: 'آخر تحديث' },
  { key: 'actions', label: '', render: (item: typeof pages[0]) => (
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

const faqColumns = [
  { key: 'order', label: '#', render: (item: typeof faqs[0]) => <span className="text-muted-foreground">{item.order}</span> },
  { key: 'question', label: 'السؤال', render: (item: typeof faqs[0]) => (
    <div>
      <p className="font-medium text-sm">{item.question}</p>
      <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">{item.answer}</p>
    </div>
  )},
  { key: 'status', label: 'الحالة', render: (item: typeof faqs[0]) => <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge> },
  { key: 'actions', label: '', render: (item: typeof faqs[0]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem><Edit className="h-4 w-4 ml-2" />تعديل</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 ml-2" />حذف</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )},
];

export default function AdminContentPage() {
  const [showPageForm, setShowPageForm] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة المحتوى</h1>
        <p className="text-muted-foreground">إدارة صفحات الموقع والمحتوى المعروض</p>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">الصفحات</TabsTrigger>
          <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
          <TabsTrigger value="seo">إعدادات SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setShowPageForm(!showPageForm)}>
                <Plus className="h-4 w-4 ml-2" />
                صفحة جديدة
              </Button>
            </div>

            {showPageForm && (
              <Card>
                <CardHeader>
                  <CardTitle>إنشاء صفحة جديدة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pageTitle">عنوان الصفحة</Label>
                      <Input id="pageTitle" placeholder="أدخل عنوان الصفحة" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pageSlug">الرابط</Label>
                      <Input id="pageSlug" placeholder="/page-slug" dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <Label>القسم</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="اختر القسم" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="main">رئيسي</SelectItem>
                          <SelectItem value="support">دعم</SelectItem>
                          <SelectItem value="legal">قانوني</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch id="pagePublished" />
                      <Label htmlFor="pagePublished">نشر فوراً</Label>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="pageContent">المحتوى</Label>
                      <Textarea id="pageContent" placeholder="أدخل محتوى الصفحة" rows={6} />
                    </div>
                    <div className="flex gap-2 sm:col-span-2">
                      <Button>إنشاء الصفحة</Button>
                      <Button variant="ghost" onClick={() => setShowPageForm(false)}>إلغاء</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <DataTable columns={pageColumns} data={pages} searchKey="title" searchPlaceholder="بحث في الصفحات..." />
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                سؤال جديد
              </Button>
            </div>
            <DataTable columns={faqColumns} data={faqs} searchKey="question" searchPlaceholder="بحث في الأسئلة..." />
          </div>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                إعدادات محركات البحث
              </CardTitle>
              <CardDescription>تحسين ظهور الموقع في نتائج البحث</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="metaTitle">عنوان الموقع (Meta Title)</Label>
                  <Input id="metaTitle" defaultValue="دار المخازن - نظام إدارة المخازن السحابي" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="metaDescription">وصف الموقع (Meta Description)</Label>
                  <Textarea id="metaDescription" defaultValue="منصة دار المخازن - نظام إدارة المخازن والمستودعات السحابي الأول في السودان. إدارة مخزونك بسهولة وأمان." rows={3} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="metaKeywords">الكلمات المفتاحية</Label>
                  <Input id="metaKeywords" defaultValue="إدارة مخازن، نظام مستودعات، مخزون، السودان، سحابي" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ogImage">صورة المشاركة (OG Image)</Label>
                  <Input id="ogImage" defaultValue="/og-image.png" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon">أيقونة الموقع (Favicon)</Label>
                  <Input id="favicon" defaultValue="/favicon.ico" dir="ltr" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">تفعيل خريطة الموقع (Sitemap)</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">تفعيل ملف robots.txt</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">تفعيل Google Analytics</span>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>حفظ التغييرات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
