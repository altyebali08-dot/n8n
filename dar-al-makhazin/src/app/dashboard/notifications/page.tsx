'use client';

import { BellRing, CheckCircle, Package, Receipt, ShoppingCart, UserCog, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const notifications = [
  { id: '1', title: 'تم استلام أمر الشراء PO-2024-002', description: 'تم استلام 8 أصناف من مؤسسة النيل للاستيراد في فرع أمدرمان', icon: ShoppingCart, time: 'منذ 10 دقائق', read: false },
  { id: '2', title: 'فاتورة بيع جديدة INV-2024-006', description: 'تم إنشاء فاتورة بيع لمطعم السلام بقيمة 15,000 ج.س', icon: Receipt, time: 'منذ 30 دقيقة', read: false },
  { id: '3', title: 'تنبيه: مخزون منخفض', description: 'سكر أبيض 1 كجم وصل للحد الأدنى (50 وحدة متبقية)', icon: Package, time: 'منذ ساعة', read: false },
  { id: '4', title: 'مستخدم جديد تم إضافته', description: 'تمت إضافة مريم خالد أحمد كموظف مبيعات في المخزن الرئيسي', icon: UserCog, time: 'منذ ساعتين', read: true },
  { id: '5', title: 'تحويل مخزون مكتمل', description: 'تم إكمال التحويل TR-2024-001 من المخزن الرئيسي إلى فرع أمدرمان', icon: Package, time: 'منذ 3 ساعات', read: true },
  { id: '6', title: 'فاتورة بيع مدفوعة', description: 'تم تأكيد دفع الفاتورة INV-2024-003 من تموينات الخرطوم', icon: Receipt, time: 'أمس 4:30 م', read: true },
  { id: '7', title: 'أمر شراء جديد PO-2024-006', description: 'تم إنشاء أمر شراء جديد من مؤسسة الجزيرة التجارية بقيمة 78,000 ج.س', icon: ShoppingCart, time: 'أمس 2:15 م', read: true },
  { id: '8', title: 'تحذير: منتج قارب على الانتهاء', description: 'زيت طعام 1 لتر - دفعة BTH-002 تنتهي خلال 5 أيام', icon: Package, time: 'أمس 9:00 ص', read: true },
];

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الإشعارات</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `لديك ${unreadCount} إشعارات غير مقروءة` : 'جميع الإشعارات مقروءة'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 ml-1" />
            تحديد الكل كمقروء
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 ml-1" />
            مسح الكل
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <Card
              key={notif.id}
              className={cn(
                'transition-colors hover:bg-muted/50 cursor-pointer',
                !notif.read && 'border-r-4 border-r-primary bg-primary/5'
              )}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                  notif.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={cn('text-sm', !notif.read && 'font-semibold')}>{notif.title}</h3>
                    {!notif.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{notif.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
