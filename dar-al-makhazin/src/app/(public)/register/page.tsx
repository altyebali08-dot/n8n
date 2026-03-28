'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Warehouse, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          phone: formData.get('phone'),
          businessName: formData.get('businessName'),
          businessAddress: formData.get('businessAddress'),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'خطأ في التسجيل');
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container flex justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
              <Warehouse className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
            <CardDescription>سجّل منشأتك وابدأ إدارة مخزونك</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input id="name" name="name" placeholder="أدخل اسمك" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" name="phone" placeholder="0912345678" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" name="email" type="email" placeholder="أدخل بريدك الإلكتروني" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="password" name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="8 أحرف على الأقل"
                    required minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName">اسم المنشأة</Label>
                <Input id="businessName" name="businessName" placeholder="اسم شركتك أو متجرك" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessAddress">عنوان المنشأة (اختياري)</Label>
                <Input id="businessAddress" name="businessAddress" placeholder="العنوان" />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                إنشاء الحساب
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                لديك حساب بالفعل؟{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">سجّل الدخول</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
