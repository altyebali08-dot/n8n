export default function TermsPage() {
  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">الشروط والأحكام</h1>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl prose prose-lg mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. مقدمة</h2>
              <p className="text-muted-foreground leading-relaxed">
                مرحباً بك في منصة دار المخازن. باستخدامك لهذه المنصة فإنك توافق على الالتزام بهذه الشروط والأحكام.
                يرجى قراءتها بعناية قبل استخدام المنصة.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">2. تعريفات</h2>
              <p className="text-muted-foreground leading-relaxed">
                &ldquo;المنصة&rdquo; تشير إلى منصة دار المخازن لإدارة المخازن والمخزون.
                &ldquo;المستخدم&rdquo; يشير إلى أي شخص أو منشأة تستخدم المنصة.
                &ldquo;الاشتراك&rdquo; يشير إلى الخطة المدفوعة للوصول إلى خدمات المنصة.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">3. الاشتراك والدفع</h2>
              <p className="text-muted-foreground leading-relaxed">
                الاشتراك السنوي بقيمة 150,000 جنيه سوداني. يتم تفعيل الاشتراك بعد التحقق من إثبات الدفع.
                يمكن الدفع عبر طرق الدفع المحلية المعتمدة. لا يتم استرداد المبالغ المدفوعة بعد تفعيل الاشتراك.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">4. استخدام المنصة</h2>
              <p className="text-muted-foreground leading-relaxed">
                يلتزم المستخدم باستخدام المنصة لأغراض إدارة المخزون المشروعة فقط.
                يُمنع استخدام المنصة لأي نشاط غير قانوني أو مخالف للقوانين السودانية.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">5. حماية البيانات</h2>
              <p className="text-muted-foreground leading-relaxed">
                نلتزم بحماية بيانات المستخدمين وعدم مشاركتها مع أطراف ثالثة.
                يتم تشفير جميع البيانات الحساسة وتخزينها بشكل آمن.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">6. إخلاء المسؤولية</h2>
              <p className="text-muted-foreground leading-relaxed">
                نسعى لتوفير خدمة مستقرة وموثوقة، لكننا لا نضمن عدم حدوث انقطاعات تقنية.
                لا نتحمل مسؤولية أي خسائر ناتجة عن سوء استخدام المنصة.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
