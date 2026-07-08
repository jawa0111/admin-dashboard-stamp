"use client";

import { budgetItems } from "@/lib/dashboard-data";

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Budget planner
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Launch budget and allocation
          </h2>
        </div>
      </header>

      <div className="space-y-4">
        {budgetItems.map((item) => (
          <div
            key={item.name}
            className="rounded-[24px] border border-white/10 bg-zinc-900/70 p-4 shadow-lg shadow-black/20 backdrop-blur"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-white">{item.name}</p>
              <p className="text-sm text-zinc-400">{item.usage}% used</p>
            </div>
            <div className="mb-3 h-2 rounded-full bg-zinc-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-600"
                style={{ width: `${item.usage}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-zinc-400">Allocated</p>
                <p className="font-semibold text-white">${item.allocated.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-zinc-400">Spent</p>
                <p className="font-semibold text-white">${item.spent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-zinc-400">Remaining</p>
                <p className="font-semibold text-emerald-300">${item.remaining.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}