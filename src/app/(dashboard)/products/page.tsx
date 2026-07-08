"use client";

import { productCosts } from "@/lib/dashboard-data";

export default function ProductsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Product management
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Cost and margin analysis
          </h2>
        </div>
      </header>

      <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Product cost details
          </p>
          <h3 className="text-xl font-semibold text-white">
            Variation cost management
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-400">
                <th className="px-3 py-3">Design</th>
                <th className="px-3 py-3">Collection</th>
                <th className="px-3 py-3">Color</th>
                <th className="px-3 py-3">Size</th>
                <th className="px-3 py-3">Production</th>
                <th className="px-3 py-3">Selling</th>
                <th className="px-3 py-3">Margin</th>
              </tr>
            </thead>
            <tbody>
              {productCosts.map((item) => (
                <tr
                  key={`${item.design}-${item.color}-${item.size}`}
                  className="border-b border-white/5 text-zinc-300"
                >
                  <td className="px-3 py-3">{item.design}</td>
                  <td className="px-3 py-3">{item.collection}</td>
                  <td className="px-3 py-3">{item.color}</td>
                  <td className="px-3 py-3">{item.size}</td>
                  <td className="px-3 py-3">
                    $
                    {(
                      item.productionCost +
                      item.printing +
                      item.packaging +
                      item.shipping +
                      item.other
                    ).toFixed(2)}
                  </td>
                  <td className="px-3 py-3">${item.sellingPrice}</td>
                  <td className="px-3 py-3 text-emerald-300">{item.margin}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
