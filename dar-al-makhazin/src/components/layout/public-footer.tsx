import Link from 'next/link';
import { Warehouse } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                <Warehouse className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">دار المخازن</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              منصة سحابية متكاملة لإدارة المخازن والمخزون، مصممة خصيصاً للسوق السوداني.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">المنصة</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-primary transition-colors">المميزات</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">الأسعار</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">كيف يعمل</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">عن المنصة</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">قانوني</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} دار المخازن. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
