export default function PrivacyPage() {
  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">سياسة الخصوصية</h1>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl prose prose-lg mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. جمع البيانات</h2>
              <p className="text-muted-foreground leading-relaxed">
                نجمع البيانات الضرورية لتقديم الخدمة فقط، وتشمل: الاسم، البريد الإلكتروني، رقم الهاتف،
                بيانات المنشأة، وبيانات المخزون التي يدخلها المستخدم.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">2. استخدام البيانات</h2>
              <p className="text-muted-foreground leading-relaxed">
                نستخدم بياناتك لتوفير خدمات المنصة وتحسينها، إرسال إشعارات مهمة،
                ومعالجة المدفوعات والاشتراكات.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">3. حماية البيانات</h2>
              <p className="text-muted-foreground leading-relaxed">
                نستخدم تقنيات تشفير متقدمة لحماية بياناتك. كل عميل لديه بيئة معزولة تماماً.
                نجري نسخاً احتياطية يومية لضمان سلامة البيانات.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">4. مشاركة البيانات</h2>
              <p className="text-muted-foreground leading-relaxed">
                لا نشارك بياناتك مع أي أطراف ثالثة إلا بموافقتك الصريحة أو عند الضرورة القانونية.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">5. حقوق المستخدم</h2>
              <p className="text-muted-foreground leading-relaxed">
                يحق لك الوصول إلى بياناتك وتعديلها وطلب حذفها في أي وقت.
                يمكنك التواصل معنا لممارسة هذه الحقوق.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">6. التواصل</h2>
              <p className="text-muted-foreground leading-relaxed">
                لأي استفسارات حول سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني: privacy@dar-almakhazin.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
