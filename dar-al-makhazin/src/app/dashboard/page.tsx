import {
  Package, AlertTriangle, XCircle, DollarSign,
  ShoppingCart, Receipt, TrendingUp, ArrowLeftRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/stat-card';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { RecentMovements } from '@/components/dashboard/recent-movements';
import { TopProducts } from '@/components/dashboard/top-products';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على مخزونك وعملياتك</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي المنتجات"
          value={formatNumber(1248)}
          icon={<Package className="h-5 w-5" />}
          change="+12 هذا الشهر"
          trend="up"
        />
        <StatCard
          title="منتجات منخفضة المخزون"
          value={formatNumber(23)}
          icon={<AlertTriangle className="h-5 w-5" />}
          change="تحتاج إعادة تعبئة"
          trend="down"
        />
        <StatCard
          title="منتجات نفدت"
          value={formatNumber(5)}
          icon={<XCircle className="h-5 w-5" />}
          change="يجب الطلب فوراً"
          trend="down"
        />
        <StatCard
          title="قيمة المخزون"
          value={formatCurrency(2450000)}
          icon={<DollarSign className="h-5 w-5" />}
          change="+8% عن الشهر الماضي"
          trend="up"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="مشتريات الشهر"
          value={formatCurrency(350000)}
          icon={<ShoppingCart className="h-5 w-5" />}
          change="15 أمر شراء"
          trend="neutral"
        />
        <StatCard
          title="مبيعات الشهر"
          value={formatCurrency(520000)}
          icon={<Receipt className="h-5 w-5" />}
          change="42 فاتورة"
          trend="up"
        />
        <StatCard
          title="صافي الربح"
          value={formatCurrency(170000)}
          icon={<TrendingUp className="h-5 w-5" />}
          change="+15% عن الشهر الماضي"
          trend="up"
        />
        <StatCard
          title="حركات المخزون"
          value={formatNumber(156)}
          icon={<ArrowLeftRight className="h-5 w-5" />}
          change="هذا الشهر"
          trend="neutral"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>المبيعات والمشتريات</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>آخر حركات المخزون</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentMovements />
        </CardContent>
      </Card>
    </div>
  );
}
