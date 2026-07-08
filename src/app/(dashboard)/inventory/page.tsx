"use client";

import { inventoryRows } from "@/lib/dashboard-data";

export default function InventoryPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Inventory
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            Stock levels and availability
          </h2>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {inventoryRows.map((item) => (
          <div
            key={`${item.design}-${item.color}`}
            className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{item.design}</p>
                <p className="text-sm text-zinc-400">{item.color} · {item.size}</p>
              </div>
              <span className="rounded-full bg-pink-500/10 px-3 py-1 text-sm text-pink-300">
                {item.available} left
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Total:</span>
                <span className="text-white">{item.quantity}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Available:</span>
                <span className="text-white">{item.available}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Reserved:</span>
                <span className="text-white">{item.reserved}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Sold:</span>
                <span className="text-emerald-300">{item.sold}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}