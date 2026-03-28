'use client';

import { useState } from 'react';
import { CheckCircle2, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SUBSCRIPTION_PRICE, PAYMENT_METHODS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export default function SubscribePage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="py-16 md:py-24">
        <div className="container flex justify-center">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2">تم استلام طلبك</h2>
              <p className="text-muted-foreground">
                سيتم مراجعة إثبات الدفع وتفعيل اشتراكك خلال 24 ساعة.
                سنرسل لك إشعاراً عند التفعيل.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">الاشتراك</h1>
          <p className="mt-4 text-lg text-white/80">اشترك الآن وابدأ إدارة مخزونك باحترافية</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل الاشتراك</CardTitle>
              <CardDescription>الباقة السنوية الشاملة - {formatCurrency(SUBSCRIPTION_PRICE)}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div>
                  <Label className="mb-3 block">اختر طريقة الدفع</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMethod(m.id)}
                        className={`flex items-center gap-3 rounded-xl border-2 p-4 text-right transition-all ${
                          selectedMethod === m.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-2xl">{m.icon}</span>
                        <span className="font-medium">{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proof">إرفاق إثبات الدفع</Label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">اضغط لرفع صورة إثبات الدفع</span>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                  <Textarea id="notes" placeholder="أي ملاحظات إضافية..." />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={!selectedMethod}>
                  إرسال طلب الاشتراك
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
