import { Target, Eye, Heart, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  { title: 'رؤيتنا', desc: 'أن نكون المنصة الرائدة لإدارة المخازن في السودان وشرق أفريقيا.', icon: <Eye className="h-8 w-8" /> },
  { title: 'مهمتنا', desc: 'تمكين المنشآت السودانية من إدارة مخزونها بكفاءة عالية وتكلفة مناسبة.', icon: <Target className="h-8 w-8" /> },
  { title: 'قيمنا', desc: 'الأمانة والشفافية والابتكار وخدمة العملاء المتميزة.', icon: <Heart className="h-8 w-8" /> },
  { title: 'التميز', desc: 'نسعى دائماً لتقديم أفضل تجربة مستخدم وأحدث التقنيات.', icon: <Award className="h-8 w-8" /> },
];

export default function AboutPage() {
  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">عن المنصة</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">تعرّف على قصة دار المخازن ورؤيتنا</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">قصتنا</h2>
            <p className="text-muted-foreground leading-relaxed">
              انطلقت منصة دار المخازن من إيمان عميق بأن المنشآت السودانية تستحق أدوات إدارة مخزون
              حديثة ومتطورة بأسعار مناسبة. لاحظنا أن كثيراً من المخازن والمتاجر تعاني من فوضى
              المخزون واستخدام الدفاتر الورقية أو جداول البيانات البسيطة. فقررنا بناء منصة سحابية
              متكاملة مصممة خصيصاً للسوق السوداني، تدعم اللغة العربية وطرق الدفع المحلية.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} className="card-hover text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3 text-center">
            <div>
              <p className="text-4xl font-extrabold text-primary">500+</p>
              <p className="text-muted-foreground mt-1">منشأة مسجلة</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary">1M+</p>
              <p className="text-muted-foreground mt-1">عملية مخزون</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-primary">99.9%</p>
              <p className="text-muted-foreground mt-1">وقت التشغيل</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
