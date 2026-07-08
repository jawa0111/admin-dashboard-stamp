"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { orderGrowth, salesByProduct } from "@/lib/dashboard-data";

export default function SalesPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Sales operations
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Order growth and performance
          </h2>
        </div>
      </header>

      <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">Monthly order growth</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderGrowth}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="orders" fill="#00d4ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {salesByProduct.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur"
          >
            <p className="text-sm text-zinc-400">{item.name}</p>
            <p className="text-2xl font-semibold text-white">{item.sales} sold</p>
          </div>
        ))}
      </div>
    </div>
  );
}