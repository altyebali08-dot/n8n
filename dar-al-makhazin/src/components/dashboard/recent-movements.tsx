import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, ArrowLeftRight, RotateCcw } from 'lucide-react';

const movements = [
  { id: 1, product: 'أرز بسمتي 5 كجم', type: 'IN', quantity: 500, warehouse: 'المخزن الرئيسي', date: '2024-03-15', user: 'أحمد محمد' },
  { id: 2, product: 'سكر أبيض 1 كجم', type: 'OUT', quantity: 200, warehouse: 'فرع أمدرمان', date: '2024-03-15', user: 'فاطمة عبدالله' },
  { id: 3, product: 'زيت طعام 1 لتر', type: 'TRANSFER', quantity: 100, warehouse: 'المخزن الرئيسي', date: '2024-03-14', user: 'خالد إبراهيم' },
  { id: 4, product: 'شاي كرك 500 جم', type: 'RETURN', quantity: 25, warehouse: 'فرع بحري', date: '2024-03-14', user: 'سارة أحمد' },
  { id: 5, product: 'دقيق أبيض 2 كجم', type: 'IN', quantity: 1000, warehouse: 'المخزن الرئيسي', date: '2024-03-14', user: 'أحمد محمد' },
];

const typeConfig: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' | 'warning'; icon: React.ReactNode }> = {
  IN: { label: 'وارد', variant: 'default', icon: <ArrowDown className="h-3 w-3" /> },
  OUT: { label: 'صادر', variant: 'destructive', icon: <ArrowUp className="h-3 w-3" /> },
  TRANSFER: { label: 'تحويل', variant: 'secondary', icon: <ArrowLeftRight className="h-3 w-3" /> },
  RETURN: { label: 'مرتجع', variant: 'warning', icon: <RotateCcw className="h-3 w-3" /> },
};

export function RecentMovements() {
  return (
    <div className="space-y-4">
      {movements.map((m) => {
        const config = typeConfig[m.type];
        return (
          <div key={m.id} className="flex items-center gap-4 rounded-lg border p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              {config.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{m.product}</p>
              <p className="text-xs text-muted-foreground">{m.warehouse} · {m.user}</p>
            </div>
            <div className="text-left">
              <Badge variant={config.variant}>{config.label}</Badge>
              <p className="text-xs text-muted-foreground mt-1">{m.quantity} وحدة</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
