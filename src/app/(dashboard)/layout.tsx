"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Toaster } from "sonner";
import {
  BarChart3,
  Boxes,
  Calculator,
  ChevronRight,
  LayoutDashboard,
  Moon,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  Sparkles,
  Sun,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { navItems } from "@/lib/dashboard-data";
import { ExpenseProvider } from "@/lib/expense-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const stored = window.localStorage.getItem("stamp-theme");
    const prefersDark = stored ? stored === "dark" : true;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("stamp-theme", next ? "dark" : "light");
  };

  // Check if current path matches a nav item
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,20,147,0.1),_transparent_50%),linear-gradient(135deg,_#0a0e27_0%,_#141d3a_45%,_#0f1628_100%)] text-zinc-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6 lg:py-6">
          <aside className="w-full rounded-[28px] border border-white/10 bg-black/50 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl lg:w-72 lg:p-5 lg:sticky lg:h-screen lg:top-0">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-pink-700 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Stamp</p>
                <h1 className="text-lg font-semibold text-white">Studio Admin</h1>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon =
                  {
                    overview: LayoutDashboard,
                    expenses: ReceiptText,
                    products: Package,
                    inventory: Boxes,
                    sales: ShoppingCart,
                    budget: Wallet,
                    marketing: BarChart3,
                    profit: Calculator,
                    reports: TrendingUp,
                    settings: Settings,
                  }[item.id] || LayoutDashboard;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm transition ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-pink-500/20 to-transparent text-pink-400"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-3xl border border-pink-500/20 bg-pink-500/10 p-4">
              <p className="text-sm text-pink-200">Launch-ready economy</p>
              <p className="mt-1 text-2xl font-semibold text-white">84% runway health</p>
              <p className="mt-2 text-sm text-zinc-400">
                Healthy cash flow, under budget, and rising conversion velocity.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
              <span className="text-xs text-zinc-400">Theme</span>
              <button
                onClick={toggleTheme}
                className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </aside>

          <main className="flex-1">{children}</main>
        </div>

        <Toaster />
      </div>
    </ExpenseProvider>
  );
}
