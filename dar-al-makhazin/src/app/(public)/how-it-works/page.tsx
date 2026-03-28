import { Globe, Package, ArrowLeftRight, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const steps = [
  { num: 1, title: 'سجّل حسابك', desc: 'أنشئ حساب منشأتك مجاناً في أقل من دقيقتين. أدخل بيانات المنشأة وابدأ فوراً.', icon: <Globe className="h-10 w-10" />, details: ['تسجيل سريع وسهل', 'تجربة مجانية 14 يوم', 'بدون بطاقة ائتمان'] },
  { num: 2, title: 'أضف بياناتك', desc: 'أضف مخازنك ومنتجاتك ومورديك وعملائك. النظام مصمم لتسهيل عملية الإدخال.', icon: <Package className="h-10 w-10" />, details: ['استيراد البيانات دفعة واحدة', 'قوالب جاهزة', 'واجهة عربية سهلة'] },
  { num: 3, title: 'أدِر عملياتك', desc: 'سجّل عمليات البيع والشراء والتحويل. تابع حركة المخزون لحظة بلحظة.', icon: <ArrowLeftRight className="h-10 w-10" />, details: ['تتبع في الوقت الفعلي', 'تنبيهات تلقائية', 'عمليات سريعة'] },
  { num: 4, title: 'نمّ أعمالك', desc: 'استخدم التقارير والتحليلات لفهم أداء مخزونك واتخاذ قرارات أفضل.', icon: <Zap className="h-10 w-10" />, details: ['تقارير مفصلة', 'رسوم بيانية تفاعلية', 'توصيات ذكية'] },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">كيف يعمل النظام</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">أربع خطوات بسيطة تفصلك عن إدارة مخزون احترافية</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={step.num} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold mb-4">{step.num}</div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="h-48 w-48 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">{step.icon}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button size="xl" asChild>
              <Link href="/subscribe">ابدأ الآن مجاناً</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
