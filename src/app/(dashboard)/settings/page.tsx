"use client";

import { Users } from "lucide-react";

const userRoles = [
  {
    role: "Admin",
    scope: "Full system access & settings management",
    email: "admin@stampstudio.com",
  },
  {
    role: "Finance Manager",
    scope: "Finances, expenses, budget, and profit tracking",
    email: "finance@stampstudio.com",
  },
  {
    role: "Inventory Manager",
    scope: "Inventory, products, and stock management",
    email: "inventory@stampstudio.com",
  },
  {
    role: "Marketing Manager",
    scope: "Marketing analytics, budgets, and channels",
    email: "marketing@stampstudio.com",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Settings
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
            User roles and permissions
          </h2>
        </div>
      </header>

      <div className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Role-based access control</h3>
          <div className="rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-1 text-sm text-pink-300">
            RBAC enabled
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {userRoles.map((entry) => (
            <div
              key={entry.role}
              className="rounded-[24px] border border-white/10 bg-white/5 p-4"
            >
              <div className="mb-2 flex items-center gap-2 text-pink-300">
                <Users className="h-4 w-4" />
                <p className="font-medium text-white">{entry.role}</p>
              </div>
              <p className="mb-2 text-sm text-zinc-400">{entry.scope}</p>
              <p className="text-xs text-zinc-500">{entry.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}