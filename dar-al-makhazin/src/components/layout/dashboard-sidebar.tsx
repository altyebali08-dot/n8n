'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Tags, Warehouse, Truck, Users,
  ShoppingCart, Receipt, ArrowLeftRight, Repeat, RotateCcw,
  Calendar, Bell, BarChart3, UserCog, BellRing, CreditCard,
  ChevronRight, LogOut, X, Warehouse as WarehouseIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { useAuthStore } from '@/store/auth-store';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Package, Tags, Warehouse, Truck, Users,
  ShoppingCart, Receipt, ArrowLeftRight, Repeat, RotateCcw,
  Calendar, Bell, BarChart3, UserCog, BellRing, CreditCard,
};

const navItems = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'المنتجات', href: '/dashboard/products', icon: 'Package' },
  { label: 'التصنيفات', href: '/dashboard/categories', icon: 'Tags' },
  { label: 'المخازن', href: '/dashboard/warehouses', icon: 'Warehouse' },
  { label: 'الموردين', href: '/dashboard/suppliers', icon: 'Truck' },
  { label: 'العملاء', href: '/dashboard/customers', icon: 'Users' },
  { label: 'أوامر الشراء', href: '/dashboard/purchases', icon: 'ShoppingCart' },
  { label: 'فواتير البيع', href: '/dashboard/sales', icon: 'Receipt' },
  { label: 'حركة المخزون', href: '/dashboard/stock-movements', icon: 'ArrowLeftRight' },
  { label: 'التحويلات', href: '/dashboard/transfers', icon: 'Repeat' },
  { label: 'المرتجعات', href: '/dashboard/returns', icon: 'RotateCcw' },
  { label: 'تتبع الصلاحية', href: '/dashboard/expiry', icon: 'Calendar' },
  { label: 'التنبيهات', href: '/dashboard/alerts', icon: 'Bell' },
  { label: 'التقارير', href: '/dashboard/reports', icon: 'BarChart3' },
  { label: 'المستخدمين', href: '/dashboard/users', icon: 'UserCog' },
  { label: 'الإشعارات', href: '/dashboard/notifications', icon: 'BellRing' },
  { label: 'الاشتراك', href: '/dashboard/subscription', icon: 'CreditCard' },
];

export function DashboardSidebar() {
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
          'fixed right-0 top-0 z-50 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:sticky lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <WarehouseIcon className="h-4 w-4" />
            </div>
            <span className="font-bold">دار المخازن</span>
          </Link>
          <button className="lg:hidden text-sidebar-foreground/70" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
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

        <div className="border-t border-sidebar-border p-3">
          <button onClick={logout} className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
