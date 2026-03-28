'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'يناير', sales: 45000, purchases: 32000 },
  { month: 'فبراير', sales: 52000, purchases: 28000 },
  { month: 'مارس', sales: 48000, purchases: 35000 },
  { month: 'أبريل', sales: 61000, purchases: 42000 },
  { month: 'مايو', sales: 55000, purchases: 38000 },
  { month: 'يونيو', sales: 67000, purchases: 45000 },
];

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip
          contentStyle={{ fontFamily: 'Tajawal', direction: 'rtl', borderRadius: '8px' }}
          formatter={(value: number) => [value.toLocaleString('ar-SD') + ' ج.س', '']}
        />
        <Bar dataKey="sales" name="المبيعات" fill="hsl(217, 91%, 30%)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="purchases" name="المشتريات" fill="hsl(187, 72%, 41%)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
