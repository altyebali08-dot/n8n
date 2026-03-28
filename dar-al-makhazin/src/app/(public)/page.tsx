import Link from 'next/link';
import {
  Warehouse, ArrowLeftRight, Receipt, Bell, BarChart3, Users,
  Shield, CreditCard, Clock, Smartphone, CheckCircle2,
  ArrowLeft, Zap, Globe, Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FEATURES, TESTIMONIALS, SUBSCRIPTION_PRICE } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  Warehouse: <Warehouse className="h-6 w-6" />,
  ArrowLeftRight: <ArrowLeftRight className="h-6 w-6" />,
  Receipt: <Receipt className="h-6 w-6" />,
  Bell: <Bell className="h-6 w-6" />,
  BarChart3: <BarChart3 className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
  CreditCard: <CreditCard className="h-6 w-6" />,
};

const trustIndicators = [
  { icon: <Shield className="h-5 w-5" />, label: 'أمان متقدم' },
  { icon: <Clock className="h-5 w-5" />, label: 'متاح 24/7' },
  { icon: <Smartphone className="h-5 w-5" />, label: 'يعمل على الجوال' },
  { icon: <CreditCard className="h-5 w-5" />, label: 'دفع محلي' },
];

const steps = [
  { num: '١', title: 'سجّل حسابك', desc: 'أنشئ حساب منشأتك في دقائق معدودة', icon: <Globe className="h-8 w-8" /> },
  { num: '٢', title: 'أضف بياناتك', desc: 'أضف منتجاتك ومخازنك ومورديك بسهولة', icon: <Package className="h-8 w-8" /> },
  { num: '٣', title: 'أدِر مخزونك', desc: 'تتبع حركة المخزون والمبيعات والمشتريات', icon: <ArrowLeftRight className="h-8 w-8" /> },
  { num: '٤', title: 'نمّ أعمالك', desc: 'استخدم التقارير والتحليلات لاتخاذ قرارات أفضل', icon: <Zap className="h-8 w-8" /> },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEuMDkgMCAyIC45MSAyIDJzLS45MSAyLTIgMi0yLS45MS0yLTIgLjkxLTIgMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
              ودّع فوضى المخزون
            </h1>
            <p className="mt-2 text-2xl font-bold text-white/90 sm:text-3xl md:text-4xl animate-fade-in-up animate-delay-100">
              أدِر مخازنك باحترافية
            </p>
            <p className="mt-6 text-lg text-white/80 md:text-xl max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
              منصة سحابية متكاملة لإدارة المخازن والمخزون مصممة خصيصاً للسوق السوداني.
              تتبع مخزونك، أدر مبيعاتك ومشترياتك، وراقب أداء أعمالك من أي مكان.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
              <Button size="xl" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto" asChild>
                <Link href="/subscribe">ابدأ الاشتراك</Link>
              </Button>
              <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto" asChild>
                <Link href="/contact">احجز عرض توضيحي</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
                <Link href="/login">تسجيل الدخول <ArrowLeft className="h-4 w-4 mr-1" /></Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 animate-fade-in-up animate-delay-400">
              {trustIndicators.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/70">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">كل ما تحتاجه لإدارة مخزونك</h2>
            <p className="mt-4 section-subtitle max-w-2xl mx-auto">
              أدوات متكاملة وذكية تمنحك السيطرة الكاملة على مخازنك
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, i) => (
              <Card key={feature.title} className="card-hover group">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {iconMap[feature.icon]}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">كيف يعمل النظام؟</h2>
            <p className="mt-4 section-subtitle">أربع خطوات بسيطة لبدء إدارة مخزونك</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">ماذا يقول عملاؤنا</h2>
            <p className="mt-4 section-subtitle">قصص نجاح حقيقية من السوق السوداني</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="card-hover">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">اشتراك سنوي بسعر منافس</h2>
            <p className="mt-4 section-subtitle">جميع المميزات في باقة واحدة شاملة</p>
            <Card className="mt-10 card-hover overflow-hidden">
              <div className="gradient-primary p-6">
                <p className="text-white/80 text-sm mb-1">الاشتراك السنوي</p>
                <p className="text-4xl font-extrabold text-white">{formatCurrency(SUBSCRIPTION_PRICE)}</p>
                <p className="text-white/70 text-sm mt-1">سنوياً</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-right mb-6">
                  {['إدارة مخازن غير محدودة', 'عدد غير محدود من المنتجات', 'فواتير بيع وأوامر شراء', 'تقارير وتحليلات شاملة', 'تنبيهات ذكية', 'دعم فني مستمر', 'تحديثات مجانية', 'نسخ احتياطي يومي'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="w-full" asChild>
                  <Link href="/subscribe">ابدأ الاشتراك الآن</Link>
                </Button>
                <p className="text-xs text-muted-foreground mt-3">تجربة مجانية 14 يوم بدون التزام</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">جاهز لإدارة مخزونك باحترافية؟</h2>
            <p className="mt-4 section-subtitle">
              انضم إلى مئات المنشآت السودانية التي تثق بدار المخازن
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild>
                <Link href="/subscribe">ابدأ التجربة المجانية</Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/contact">تواصل مع فريق المبيعات</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
