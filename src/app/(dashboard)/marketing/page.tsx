"use client";

import { marketingRows } from "@/lib/dashboard-data";

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Marketing tracker
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Channel performance and ROAS
          </h2>
        </div>
      </header>

      <div className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-400">
                <th className="px-3 py-3">Channel</th>
                <th className="px-3 py-3">Spend</th>
                <th className="px-3 py-3">Reach</th>
                <th className="px-3 py-3">Clicks</th>
                <th className="px-3 py-3">Conversions</th>
                <th className="px-3 py-3">ROAS</th>
                <th className="px-3 py-3">ROI</th>
              </tr>
            </thead>
            <tbody>
              {marketingRows.map((item) => (
                <tr key={item.channel} className="border-b border-white/5 text-zinc-300">
                  <td className="px-3 py-3">{item.channel}</td>
                  <td className="px-3 py-3">${item.spend.toLocaleString()}</td>
                  <td className="px-3 py-3">{item.reach.toLocaleString()}</td>
                  <td className="px-3 py-3">{item.clicks.toLocaleString()}</td>
                  <td className="px-3 py-3">{item.conversions}</td>
                  <td className="px-3 py-3 text-emerald-300">{item.roas}x</td>
                  <td className="px-3 py-3 text-emerald-300">{item.roi}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}