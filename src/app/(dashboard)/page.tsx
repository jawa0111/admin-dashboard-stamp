"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CircleDollarSign,
  Plus,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useExpenses } from "@/lib/expense-context";
import {
  kpis,
  revenueData,
  profitData,
  expenseBreakdown,
  salesByProduct,
} from "@/lib/dashboard-data";

export default function OverviewPage() {
  const { expenses, addExpense } = useExpenses();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlerts, setShowAlerts] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "Production",
    vendor: "",
    amount: "",
    date: "",
    method: "Card",
    status: "Approved",
    description: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.amount) {
      toast.error("Please fill the expense name and amount.");
      return;
    }

    addExpense({
      name: form.name,
      category: form.category,
      vendor: form.vendor,
      amount: Number(form.amount),
      date: form.date || "2026-07-08",
      method: form.method,
      status: form.status,
    });

    setForm({
      name: "",
      category: "Production",
      vendor: "",
      amount: "",
      date: "",
      method: "Card",
      status: "Approved",
      description: "",
      notes: "",
    });
    setIsDialogOpen(false);
    toast.success("Expense added and synced to your dashboard.");
  };

  const filteredExpenses = expenses.filter((expense) => {
    const query = searchQuery.toLowerCase();
    return (
      expense.name.toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query) ||
      expense.vendor.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <header className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              Premium operations board
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
              Streetwear finance and inventory command center
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400">
              <Search className="h-4 w-4" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="bg-transparent outline-none"
                placeholder="Search expenses"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowAlerts((prev) => !prev)}
              className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-zinc-200"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
          {showAlerts && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/70 p-3 text-sm text-zinc-300">
              <p className="mb-2 font-medium text-white">Live alerts</p>
              <ul className="space-y-2">
                <li>• Low stock on Phase Jacket and Studio Hoody</li>
                <li>• Marketing budget at 86% usage</li>
                <li>• Two pending supplier payments</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="rounded-[24px] border border-white/10 bg-zinc-900/70 p-4 shadow-lg shadow-black/20 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-400">{item.label}</p>
              <div className="rounded-full bg-pink-500/10 p-2 text-cyan-400">
                <CircleDollarSign className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
            <p className={`mt-2 text-sm ${item.tone}`}>{item.delta}</p>
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Revenue pulse
              </p>
              <h3 className="text-xl font-semibold text-white">
                Monthly revenue vs expenses
              </h3>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
              +18.2% QoQ
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ff1493"
                      stopOpacity={0.45}
                    />
                    <stop
                      offset="100%"
                      stopColor="#ff1493"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#71717a"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ff1493"
                  fill="url(#revenueFill)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#00d4ff"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Expense mix
              </p>
              <h3 className="text-xl font-semibold text-white">
                Category breakdown
              </h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {expenseBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Profit trend
              </p>
              <h3 className="text-xl font-semibold text-white">
                Monthly profit growth
              </h3>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
              <TrendingUp className="h-4 w-4" />
              +11.4%
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitData}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#71717a"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#ff1493"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                Recent activity
              </p>
              <h3 className="text-xl font-semibold text-white">
                Live operations
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                label: "Low stock alert",
                text: "Phase Jacket sizes M and XL are below 40 units",
              },
              {
                label: "Payment pending",
                text: "Supplier invoice due in 2 days",
              },
              {
                label: "Budget threshold",
                text: "Marketing spend crossed 85% for the month",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-cyan-400" />
                  <p className="text-sm font-medium text-white">{item.label}</p>
                </div>
                <p className="text-sm text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Expense management
            </p>
            <h3 className="text-xl font-semibold text-white">
              Operational spend control
            </h3>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-transparent bg-pink-500 px-2.5 text-sm font-medium whitespace-nowrap text-black transition-all hover:bg-pink-600">
              <Plus className="h-4 w-4" />
              Add Expense
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Create expense entry
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Expense name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="Studio lighting package"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>Production</option>
                    <option>Photography</option>
                    <option>Fabric</option>
                    <option>Marketing</option>
                    <option>Meta Ads</option>
                    <option>Google Ads</option>
                    <option>TikTok Ads</option>
                    <option>Packaging</option>
                    <option>Shipping</option>
                    <option>Website</option>
                    <option>Software</option>
                    <option>Miscellaneous</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={form.vendor}
                    onChange={(event) =>
                      setForm({ ...form, vendor: event.target.value })
                    }
                    placeholder="Supplier or agency"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={form.amount}
                    onChange={(event) =>
                      setForm({ ...form, amount: event.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm({ ...form, date: event.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method">Payment method</Label>
                  <select
                    id="method"
                    value={form.method}
                    onChange={(event) =>
                      setForm({ ...form, method: event.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>Card</option>
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                    <option>PayPal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(event) =>
                      setForm({ ...form, status: event.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Needs Review</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(event) =>
                      setForm({ ...form, description: event.target.value })
                    }
                    placeholder="Add the operational context"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(event) =>
                      setForm({ ...form, notes: event.target.value })
                    }
                    placeholder="Invoice references or approval notes"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-pink-500 text-black hover:bg-pink-600"
                >
                  Save expense
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">Largest expense</p>
            <p className="text-lg text-white">Fabric roll order</p>
            <p className="text-sm text-cyan-400">$12.25K</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">Average monthly spend</p>
            <p className="text-lg text-white">$9.3K</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">Approval rate</p>
            <p className="text-lg text-white">92%</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-400">
                <th className="px-3 py-3">Expense</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Vendor</th>
                <th className="px-3 py-3">Amount</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr
                    key={`${expense.name}-${expense.date}`}
                    className="border-b border-white/5 text-zinc-300"
                  >
                    <td className="px-3 py-3">{expense.name}</td>
                    <td className="px-3 py-3">{expense.category}</td>
                    <td className="px-3 py-3">{expense.vendor}</td>
                    <td className="px-3 py-3">
                      ${expense.amount.toLocaleString()}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          expense.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-pink-500/10 text-pink-300"
                        }`}
                      >
                        {expense.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-3 py-6 text-center text-zinc-400"
                    colSpan={5}
                  >
                    No expenses match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
