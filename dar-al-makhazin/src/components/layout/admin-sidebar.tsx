'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, CreditCard, Wallet, TrendingUp,
  DollarSign, Megaphone, Layers, LifeBuoy, ScrollText,
  Settings, FileText, LogOut, X, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { useAuthStore } from '@/store/auth-store';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Building2, CreditCard, Wallet, TrendingUp,
  DollarSign, Megaphone, Layers, LifeBuoy, ScrollText,
  Settings, FileText,
};

const navItems = [
  { label: 'لوحة التحكم', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'إدارة العملاء', href: '/admin/clients', icon: 'Building2' },
  { label: 'الاشتراكات', href: '/admin/subscriptions', icon: 'CreditCard' },
  { label: 'المدفوعات', href: '/admin/payments', icon: 'Wallet' },
  { label: 'تحليلات المنصة', href: '/admin/analytics', icon: 'TrendingUp' },
  { label: 'الإيرادات', href: '/admin/revenue', icon: 'DollarSign' },
  { label: 'الإعلانات', href: '/admin/announcements', icon: 'Megaphone' },
  { label: 'الخطط', href: '/admin/plans', icon: 'Layers' },
  { label: 'تذاكر الدعم', href: '/admin/tickets', icon: 'LifeBuoy' },
  { label: 'سجل العمليات', href: '/admin/audit-logs', icon: 'ScrollText' },
  { label: 'إعدادات النظام', href: '/admin/settings', icon: 'Settings' },
  { label: 'إدارة المحتوى', href: '/admin/content', icon: 'FileText' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const { logout } = useAuthStore();

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-screen w-64 flex-col bg-[hsl(222,47%,8%)] text-sidebar-foreground transition-transform duration-300 lg:sticky lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/20">
              <Shield className="h-4 w-4 text-red-400" />
            </div>
            <div>
              <span className="font-bold text-sm">دار المخازن</span>
              <span className="block text-[10px] text-red-400 font-medium">لوحة الإدارة</span>
            </div>
          </Link>
          <button className="lg:hidden text-sidebar-foreground/70" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn('sidebar-item', isActive && 'sidebar-item-active')}
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" />}
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button onClick={logout} className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
