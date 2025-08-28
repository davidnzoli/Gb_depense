"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Janvier", dépenses: 4000, revenus: 2400 },
  { name: "Février", dépenses: 3000, revenus: 1398 },
  { name: "Mars", dépenses: 2000, revenus: 9800 },
  { name: "Avril", dépenses: 2780, revenus: 3908 },
  { name: "Mai", dépenses: 1890, revenus: 4800 },
  { name: "Juin", dépenses: 2390, revenus: 3800 },
  { name: "Juillet", dépenses: 3490, revenus: 4300 },
];

export default function ChartDemo() {
  return (
    <div className="w-full h-[400px] p-4 rounded-2xl shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-4">Revenus vs Dépenses</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="dépenses" fill="#f87171" radius={[4, 4, 0, 0]} />
          <Bar dataKey="revenus" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
