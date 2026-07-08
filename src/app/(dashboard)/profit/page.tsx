"use client";

export default function ProfitPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Profit calculator
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Financial performance analysis
          </h2>
        </div>
      </header>

      <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-sm text-zinc-400">Revenue</p>
              <p className="text-2xl font-semibold text-white">$248K</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-zinc-400">Total Expenses</p>
              <p className="text-2xl font-semibold text-white">$119K</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-zinc-800/70 p-3">
              <p className="text-sm text-zinc-400">Gross Profit</p>
              <p className="text-lg font-semibold text-emerald-300">$129K</p>
              <p className="mt-1 text-xs text-zinc-500">52% margin</p>
            </div>
            <div className="rounded-2xl bg-zinc-800/70 p-3">
              <p className="text-sm text-zinc-400">Net Profit</p>
              <p className="text-lg font-semibold text-emerald-300">$96K</p>
              <p className="mt-1 text-xs text-zinc-500">39% margin</p>
            </div>
            <div className="rounded-2xl bg-zinc-800/70 p-3">
              <p className="text-sm text-zinc-400">Profit Margin</p>
              <p className="text-lg font-semibold text-pink-300">38.7%</p>
              <p className="mt-1 text-xs text-zinc-500">Excellent health</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}