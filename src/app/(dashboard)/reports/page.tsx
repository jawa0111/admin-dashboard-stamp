"use client";

import { CheckCircle2 } from "lucide-react";
import { reports } from "@/lib/dashboard-data";

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Financial reports
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Export-ready financial insights
          </h2>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {reports.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur"
          >
            <div className="mb-3 flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <p className="font-medium text-white">{item.name}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span>{item.status}</span>
              <span className="text-pink-300">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}