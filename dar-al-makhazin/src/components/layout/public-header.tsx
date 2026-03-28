'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'المميزات', href: '/features' },
  { label: 'الأسعار', href: '/pricing' },
  { label: 'كيف يعمل', href: '/how-it-works' },
  { label: 'عن المنصة', href: '/about' },
  { label: 'الأسئلة الشائعة', href: '/faq' },
  { label: 'تواصل معنا', href: '/contact' },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Warehouse className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-primary">دار المخازن</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">تسجيل الدخول</Link>
          </Button>
          <Button asChild>
            <Link href="/register">ابدأ الآن</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t">
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/login">تسجيل الدخول</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/register">ابدأ الآن</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
