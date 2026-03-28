import {
  Warehouse, ArrowLeftRight, Receipt, Bell, BarChart3, Users,
  Shield, CreditCard, Package, Truck, RotateCcw, Calendar,
  Search, Download, Smartphone, Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const allFeatures = [
  { title: 'إدارة مخازن متعددة', desc: 'أدر عدد غير محدود من المخازن والفروع من حساب واحد مع تتبع المخزون لكل مخزن.', icon: <Warehouse className="h-7 w-7" /> },
  { title: 'إدارة المنتجات', desc: 'قاعدة بيانات شاملة للمنتجات مع التصنيفات والباركود والصور.', icon: <Package className="h-7 w-7" /> },
  { title: 'تتبع حركة المخزون', desc: 'رصد كل حركة دخول وخروج وتحويل وتعديل في المخزون.', icon: <ArrowLeftRight className="h-7 w-7" /> },
  { title: 'فواتير وأوامر شراء', desc: 'إنشاء فواتير بيع وأوامر شراء احترافية مع إمكانية الطباعة.', icon: <Receipt className="h-7 w-7" /> },
  { title: 'إدارة الموردين', desc: 'قاعدة بيانات الموردين مع سجل التعاملات والمشتريات.', icon: <Truck className="h-7 w-7" /> },
  { title: 'إدارة العملاء', desc: 'سجل كامل للعملاء وتاريخ مشترياتهم ومعاملاتهم.', icon: <Users className="h-7 w-7" /> },
  { title: 'المرتجعات', desc: 'إدارة مرتجعات المشتريات والمبيعات مع تحديث المخزون تلقائياً.', icon: <RotateCcw className="h-7 w-7" /> },
  { title: 'تتبع الصلاحية', desc: 'تنبيهات قبل انتهاء صلاحية المنتجات لتجنب الخسائر.', icon: <Calendar className="h-7 w-7" /> },
  { title: 'تنبيهات ذكية', desc: 'تنبيهات فورية لنقص المخزون والأحداث المهمة.', icon: <Bell className="h-7 w-7" /> },
  { title: 'تقارير وتحليلات', desc: 'تقارير شاملة ولوحات بيانات تفاعلية لاتخاذ قرارات مدروسة.', icon: <BarChart3 className="h-7 w-7" /> },
  { title: 'بحث وفلترة متقدمة', desc: 'محرك بحث قوي مع فلاتر متعددة للوصول السريع للبيانات.', icon: <Search className="h-7 w-7" /> },
  { title: 'تصدير التقارير', desc: 'تصدير كل التقارير بصيغة PDF أو Excel بضغطة واحدة.', icon: <Download className="h-7 w-7" /> },
  { title: 'تصميم متجاوب', desc: 'يعمل بكفاءة على الكمبيوتر والتابلت والجوال.', icon: <Smartphone className="h-7 w-7" /> },
  { title: 'دفع محلي', desc: 'دعم كامل لطرق الدفع السودانية.', icon: <CreditCard className="h-7 w-7" /> },
  { title: 'أمان متقدم', desc: 'تشفير البيانات وصلاحيات متعددة المستويات.', icon: <Shield className="h-7 w-7" /> },
  { title: 'عزل البيانات', desc: 'كل عميل لديه بيئة معزولة تماماً عن العملاء الآخرين.', icon: <Lock className="h-7 w-7" /> },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">مميزات المنصة</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            كل ما تحتاجه لإدارة مخازنك باحترافية في منصة واحدة متكاملة
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allFeatures.map((f) => (
              <Card key={f.title} className="card-hover group">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
