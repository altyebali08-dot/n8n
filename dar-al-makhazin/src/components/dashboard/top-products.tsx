import { Progress } from '@/components/ui/progress';

const products = [
  { name: 'أرز بسمتي 5 كجم', sold: 1250, percentage: 95 },
  { name: 'سكر أبيض 1 كجم', sold: 980, percentage: 78 },
  { name: 'زيت طعام 1 لتر', sold: 870, percentage: 70 },
  { name: 'دقيق أبيض 2 كجم', sold: 650, percentage: 52 },
  { name: 'شاي كرك 500 جم', sold: 520, percentage: 42 },
];

export function TopProducts() {
  return (
    <div className="space-y-4">
      {products.map((p) => (
        <div key={p.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{p.name}</span>
            <span className="text-muted-foreground">{p.sold} وحدة</span>
          </div>
          <Progress value={p.percentage} />
        </div>
      ))}
    </div>
  );
}
