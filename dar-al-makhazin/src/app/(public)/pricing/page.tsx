import Link from 'next/link';
import { CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SUBSCRIPTION_PRICE, PAYMENT_METHODS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const features = [
  'إدارة مخازن غير محدودة',
  'عدد غير محدود من المنتجات والتصنيفات',
  'فواتير بيع وأوامر شراء احترافية',
  'تتبع حركة المخزون في الوقت الفعلي',
  'التحويل بين المخازن',
  'إدارة الموردين والعملاء',
  'تتبع صلاحية المنتجات',
  'تنبيهات نقص المخزون',
  'تقارير وتحليلات شاملة',
  'تصدير التقارير PDF/Excel',
  'إدارة المستخدمين والصلاحيات',
  'نسخ احتياطي يومي',
  'دعم فني عبر التذاكر',
  'تحديثات مجانية مستمرة',
  'تطبيق متجاوب للجوال',
];

export default function PricingPage() {
  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">الأسعار</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            باقة واحدة شاملة بسعر منافس - كل المميزات بلا قيود
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-lg">
            <Card className="overflow-hidden shadow-xl border-primary/20">
              <div className="gradient-primary p-8 text-center">
                <div className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs text-white mb-4">
                  <Star className="h-3 w-3" /> الباقة الشاملة
                </div>
                <p className="text-5xl font-extrabold text-white">{formatCurrency(SUBSCRIPTION_PRICE)}</p>
                <p className="text-white/70 mt-2">سنوياً</p>
              </div>
              <CardContent className="p-8">
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button size="xl" className="w-full" asChild>
                  <Link href="/subscribe">ابدأ الاشتراك الآن</Link>
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  تجربة مجانية 14 يوم - بدون التزام - إلغاء في أي وقت
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6">طرق الدفع المتاحة</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {PAYMENT_METHODS.map((m) => (
                <div key={m.id} className="flex items-center gap-2 rounded-xl border bg-card px-5 py-3">
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-sm font-medium">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
