import { AdminSidebar } from '@/components/layout/admin-sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  );
}
