"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { name: "Week 1", revenue: 4000, expected: 4400 },
  { name: "Week 2", revenue: 3000, expected: 3200 },
  { name: "Week 3", revenue: 2000, expected: 2400 },
  { name: "Week 4", revenue: 2780, expected: 2900 },
  { name: "Week 5", revenue: 1890, expected: 2100 },
  { name: "Week 6", revenue: 2390, expected: 2500 },
  { name: "Week 7", revenue: 3490, expected: 3800 },
];

export function RevenueForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
        <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Line type="monotone" dataKey="expected" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
        <Line type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
