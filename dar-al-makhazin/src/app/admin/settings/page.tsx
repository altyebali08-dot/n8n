'use client';

import { Settings, Globe, CreditCard, Bell, Shield, Database, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إعدادات النظام</h1>
        <p className="text-muted-foreground">إدارة إعدادات المنصة والتكوينات العامة</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="payment">الدفع</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="backup">النسخ الاحتياطي</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                الإعدادات العامة
              </CardTitle>
              <CardDescription>إعدادات المنصة الأساسية ومعلومات الاتصال</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="platformName">اسم المنصة</Label>
                  <Input id="platformName" defaultValue="دار المخازن" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platformUrl">رابط المنصة</Label>
                  <Input id="platformUrl" defaultValue="https://dar-almakhazin.sd" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">بريد الدعم</Label>
                  <Input id="supportEmail" defaultValue="support@dar-almakhazin.sd" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">هاتف الدعم</Label>
                  <Input id="supportPhone" defaultValue="+249 912 345 678" dir="ltr" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="platformDescription">وصف المنصة</Label>
                  <Textarea id="platformDescription" defaultValue="منصة دار المخازن - نظام إدارة المخازن والمستودعات السحابي الأول في السودان" rows={3} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">إعدادات الفترة التجريبية</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="trialDays">مدة الفترة التجريبية (بالأيام)</Label>
                    <Input id="trialDays" type="number" defaultValue="14" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trialMaxUsers">الحد الأقصى لمستخدمي التجربة</Label>
                    <Input id="trialMaxUsers" type="number" defaultValue="2" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="autoTrial" defaultChecked />
                  <Label htmlFor="autoTrial">تفعيل الفترة التجريبية تلقائياً للعملاء الجدد</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>حفظ التغييرات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                إعدادات الدفع
              </CardTitle>
              <CardDescription>تكوين طرق الدفع المتاحة وإعدادات المدفوعات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">طرق الدفع المتاحة</h3>
                <div className="space-y-3">
                  {[
                    { id: 'bankak', name: 'بنكك', enabled: true },
                    { id: 'fawry', name: 'فوري', enabled: true },
                    { id: 'bank-transfer', name: 'تحويل بنكي', enabled: true },
                    { id: 'ocash', name: 'أو-كاش', enabled: true },
                    { id: 'ecash', name: 'إي-كاش', enabled: true },
                  ].map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm font-medium">{method.name}</span>
                      <Switch defaultChecked={method.enabled} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bankName">اسم البنك</Label>
                  <Input id="bankName" defaultValue="بنك الخرطوم" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">رقم الحساب</Label>
                  <Input id="accountNumber" defaultValue="XXXX-XXXX-XXXX" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">اسم صاحب الحساب</Label>
                  <Input id="accountName" defaultValue="شركة دار المخازن المحدودة" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">العملة</Label>
                  <Select defaultValue="sdg">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sdg">جنيه سوداني (ج.س)</SelectItem>
                      <SelectItem value="usd">دولار أمريكي ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>حفظ التغييرات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                إعدادات الإشعارات
              </CardTitle>
              <CardDescription>تكوين الإشعارات والتنبيهات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">إشعارات البريد الإلكتروني</h3>
                <div className="space-y-3">
                  {[
                    { id: 'new-client', label: 'عميل جديد يسجل في المنصة' },
                    { id: 'new-payment', label: 'طلب دفع جديد يحتاج مراجعة' },
                    { id: 'sub-expiring', label: 'اشتراك على وشك الانتهاء' },
                    { id: 'new-ticket', label: 'تذكرة دعم جديدة' },
                    { id: 'ticket-reply', label: 'رد على تذكرة دعم' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">{item.label}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">إعدادات البريد</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">خادم SMTP</Label>
                    <Input id="smtpHost" defaultValue="smtp.example.com" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">المنفذ</Label>
                    <Input id="smtpPort" type="number" defaultValue="587" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">اسم المستخدم</Label>
                    <Input id="smtpUser" defaultValue="noreply@dar-almakhazin.sd" dir="ltr" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPass">كلمة المرور</Label>
                    <Input id="smtpPass" type="password" defaultValue="********" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">إرسال بريد تجريبي</Button>
                <Button>حفظ التغييرات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                إعدادات الأمان
              </CardTitle>
              <CardDescription>إعدادات الحماية والتحكم في الوصول</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">سياسات كلمة المرور</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="minPassword">الحد الأدنى لطول كلمة المرور</Label>
                    <Input id="minPassword" type="number" defaultValue="8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">مهلة الجلسة (بالدقائق)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'require-uppercase', label: 'يجب أن تحتوي على حروف كبيرة' },
                    { id: 'require-number', label: 'يجب أن تحتوي على أرقام' },
                    { id: 'require-special', label: 'يجب أن تحتوي على رموز خاصة' },
                    { id: 'two-factor', label: 'تفعيل المصادقة الثنائية' },
                    { id: 'ip-whitelist', label: 'تقييد الوصول بعنوان IP' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">{item.label}</span>
                      <Switch defaultChecked={item.id !== 'ip-whitelist'} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">تحديد معدل الطلبات</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">الحد الأقصى للطلبات في الدقيقة</Label>
                    <Input id="rateLimit" type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">محاولات تسجيل الدخول قبل القفل</Label>
                    <Input id="loginAttempts" type="number" defaultValue="5" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>حفظ التغييرات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                النسخ الاحتياطي
              </CardTitle>
              <CardDescription>إدارة النسخ الاحتياطي واستعادة البيانات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">النسخ الاحتياطي التلقائي</h3>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">تفعيل النسخ الاحتياطي التلقائي</span>
                  <Switch defaultChecked />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>تكرار النسخ الاحتياطي</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">كل ساعة</SelectItem>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retentionDays">الاحتفاظ بالنسخ (بالأيام)</Label>
                    <Input id="retentionDays" type="number" defaultValue="30" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">آخر النسخ الاحتياطية</h3>
                <div className="space-y-2">
                  {[
                    { date: '2024-03-15 03:00', size: '2.4 GB', status: 'success' },
                    { date: '2024-03-14 03:00', size: '2.3 GB', status: 'success' },
                    { date: '2024-03-13 03:00', size: '2.3 GB', status: 'success' },
                  ].map((backup) => (
                    <div key={backup.date} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm font-medium font-mono">{backup.date}</p>
                        <p className="text-xs text-muted-foreground">{backup.size}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="success">مكتمل</Badge>
                        <Button variant="outline" size="sm">استعادة</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">إنشاء نسخة احتياطية الآن</Button>
                <Button>حفظ التغييرات</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
