"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  Package,
  Plus,
  ReceiptText,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
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

const navItems = [
  { label: "Overview", id: "overview", icon: LayoutDashboard },
  { label: "Expenses", id: "expenses", icon: ReceiptText },
  { label: "Products", id: "products", icon: Package },
  { label: "Inventory", id: "inventory", icon: Boxes },
  { label: "Sales", id: "sales", icon: ShoppingCart },
  { label: "Budget", id: "budget", icon: Wallet },
  { label: "Marketing", id: "marketing", icon: BarChart3 },
  { label: "Profit", id: "profit", icon: Calculator },
  { label: "Reports", id: "reports", icon: TrendingUp },
  { label: "Settings", id: "settings", icon: Settings },
];

const kpis = [
  { label: "Total Revenue", value: "$1.24M", delta: "+12.4%", tone: "text-emerald-400" },
  { label: "Total Expenses", value: "$486K", delta: "+4.8%", tone: "text-amber-400" },
  { label: "Net Profit", value: "$312K", delta: "+9.1%", tone: "text-emerald-400" },
  { label: "Gross Profit", value: "$754K", delta: "+15.2%", tone: "text-emerald-400" },
  { label: "Monthly Profit", value: "$84K", delta: "+8.3%", tone: "text-emerald-400" },
  { label: "Total Orders", value: "2,184", delta: "+6.7%", tone: "text-sky-400" },
  { label: "Inventory Value", value: "$342K", delta: "-1.2%", tone: "text-amber-400" },
  { label: "Available Cash", value: "$126K", delta: "+3.4%", tone: "text-emerald-400" },
  { label: "Pending Payments", value: "$18K", delta: "2 pending", tone: "text-amber-400" },
  { label: "Marketing Spend", value: "$43K", delta: "+2.1%", tone: "text-sky-400" },
];

const revenueData = [
  { month: "Jan", revenue: 118000, expenses: 76000 },
  { month: "Feb", revenue: 132000, expenses: 81000 },
  { month: "Mar", revenue: 145000, expenses: 84000 },
  { month: "Apr", revenue: 158000, expenses: 90000 },
  { month: "May", revenue: 171000, expenses: 96000 },
  { month: "Jun", revenue: 187000, expenses: 104000 },
];

const profitData = [
  { month: "Jan", profit: 42000 },
  { month: "Feb", profit: 51000 },
  { month: "Mar", profit: 61000 },
  { month: "Apr", profit: 68000 },
  { month: "May", profit: 75000 },
  { month: "Jun", profit: 83000 },
];

const expenseBreakdown = [
  { name: "Production", value: 34, color: "#d4af37" },
  { name: "Marketing", value: 22, color: "#f59e0b" },
  { name: "Shipping", value: 16, color: "#71717a" },
  { name: "Software", value: 12, color: "#fbbf24" },
  { name: "Other", value: 16, color: "#e5e7eb" },
];

const salesByProduct = [
  { name: "Midnight Drop", sales: 320 },
  { name: "Chrome Tee", sales: 280 },
  { name: "Studio Hoody", sales: 240 },
  { name: "Phase Jacket", sales: 180 },
];

const collections = [
  { name: "Urban Pulse", revenue: 242000 },
  { name: "After Dark", revenue: 186000 },
  { name: "Cold Steel", revenue: 158000 },
];

const cashFlow = [
  { month: "Jan", inflow: 132000, outflow: 98000 },
  { month: "Feb", inflow: 141000, outflow: 101000 },
  { month: "Mar", inflow: 154000, outflow: 108000 },
  { month: "Apr", inflow: 168000, outflow: 112000 },
  { month: "May", inflow: 182000, outflow: 118000 },
  { month: "Jun", inflow: 198000, outflow: 127000 },
];

const orderGrowth = [
  { month: "Jan", orders: 312 },
  { month: "Feb", orders: 347 },
  { month: "Mar", orders: 389 },
  { month: "Apr", orders: 418 },
  { month: "May", orders: 467 },
  { month: "Jun", orders: 514 },
];

const initialExpenses = [
  { name: "Studio lighting package", category: "Photography", vendor: "Lumen Works", amount: 2800, date: "2026-07-03", method: "Card", status: "Approved" },
  { name: "Fabric roll order", category: "Fabric", vendor: "Blackline Textile", amount: 12250, date: "2026-07-01", method: "Bank Transfer", status: "Pending" },
  { name: "Meta ad boost", category: "Meta Ads", vendor: "Meta Business", amount: 5400, date: "2026-06-29", method: "Card", status: "Approved" },
];

const productCosts = [
  { design: "Midnight Drop", collection: "Urban Pulse", variation: "Classic Tee", color: "Black", size: "M", productionCost: 18.5, printing: 3.4, packaging: 1.2, shipping: 2.1, other: 0.8, sellingPrice: 49, profit: 23, margin: 47 },
  { design: "Chrome Tee", collection: "After Dark", variation: "Oversized", color: "Charcoal", size: "L", productionCost: 21.2, printing: 3.8, packaging: 1.4, shipping: 2.3, other: 0.9, sellingPrice: 59, profit: 29.4, margin: 50 },
];

const inventoryRows = [
  { design: "Studio Hoody", variation: "Heavy", size: "M", color: "Gold", quantity: 84, available: 72, reserved: 8, sold: 164, damaged: 2, returns: 3 },
  { design: "Phase Jacket", variation: "Shell", size: "XL", color: "Black", quantity: 46, available: 37, reserved: 4, sold: 92, damaged: 1, returns: 1 },
];

const budgetItems = [
  { name: "Production Budget", allocated: 120000, spent: 84500, remaining: 35500, usage: 70 },
  { name: "Marketing Budget", allocated: 50000, spent: 43200, remaining: 6800, usage: 86 },
  { name: "Photography Budget", allocated: 18000, spent: 11200, remaining: 6800, usage: 62 },
  { name: "Packaging Budget", allocated: 12000, spent: 6800, remaining: 5200, usage: 57 },
];

const marketingRows = [
  { channel: "Meta Ads", spend: 13200, reach: 184000, clicks: 4620, conversions: 318, cpo: 41.5, roas: 3.8, roi: 280 },
  { channel: "TikTok Ads", spend: 9800, reach: 216000, clicks: 5210, conversions: 402, cpo: 24.4, roas: 4.6, roi: 360 },
  { channel: "Influencer", spend: 7400, reach: 128000, clicks: 2040, conversions: 176, cpo: 42.0, roas: 3.2, roi: 220 },
];

const reports = [
  { name: "Income Statement", status: "Ready", type: "PDF" },
  { name: "Cash Flow", status: "Updated", type: "Excel" },
  { name: "Inventory Cost Report", status: "Queued", type: "CSV" },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
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

  const handleSubmit = () => {
    if (!form.name || !form.amount) {
      toast.error("Please fill the expense name and amount.");
      return;
    }

    setExpenses((prev) => [
      {
        name: form.name,
        category: form.category,
        vendor: form.vendor,
        amount: Number(form.amount),
        date: form.date || "2026-07-08",
        method: form.method,
        status: form.status,
      },
      ...prev,
    ]);
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

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    toast.success(`${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section opened.`);
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_30%),linear-gradient(135deg,_#060606_0%,_#0f0f0f_45%,_#090909_100%)] text-zinc-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6 lg:py-6">
        <aside className="w-full rounded-[28px] border border-white/10 bg-black/50 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl lg:w-72 lg:p-5">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 text-black">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Stamp</p>
              <h1 className="text-lg font-semibold text-white">Studio Admin</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigation(item.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm transition ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-amber-500/20 to-transparent text-amber-300"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-200">Launch-ready economy</p>
            <p className="mt-1 text-2xl font-semibold text-white">84% runway health</p>
            <p className="mt-2 text-sm text-zinc-400">Healthy cash flow, under budget, and rising conversion velocity.</p>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <header className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-400">Premium operations board</p>
                <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">Streetwear finance and inventory command center</h2>
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
                <button
                  onClick={toggleTheme}
                  className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200"
                >
                  {isDark ? "Light" : "Dark"} mode
                </button>
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-sm font-semibold text-black">
                    AM
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">A. Malik</p>
                    <p className="text-xs text-zinc-500">Finance Lead</p>
                  </div>
                </div>
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

          <section id="overview" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                  <div className="rounded-full bg-amber-500/10 p-2 text-amber-400">
                    <CircleDollarSign className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
                <p className={`mt-2 text-sm ${item.tone}`}>{item.delta}</p>
              </motion.div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Revenue pulse</p>
                  <h3 className="text-xl font-semibold text-white">Monthly revenue vs expenses</h3>
                </div>
                <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">+18.2% QoQ</div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#facc15" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#facc15" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717a" tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#facc15" fill="url(#revenueFill)" />
                    <Area type="monotone" dataKey="expenses" stroke="#64748b" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Expense mix</p>
                  <h3 className="text-xl font-semibold text-white">Category breakdown</h3>
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={expenseBreakdown} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={2}>
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
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Profit trend</p>
                  <h3 className="text-xl font-semibold text-white">Monthly profit growth</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                  <TrendingUp className="h-4 w-4" />
                  +11.4%
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717a" tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Recent activity</p>
                  <h3 className="text-xl font-semibold text-white">Live operations</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Low stock alert", text: "Phase Jacket sizes M and XL are below 40 units" },
                  { label: "Payment pending", text: "Supplier invoice due in 2 days" },
                  { label: "Budget threshold", text: "Marketing spend crossed 85% for the month" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="mb-1 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400" />
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
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Expense management</p>
                <h3 className="text-xl font-semibold text-white">Operational spend control</h3>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-transparent bg-amber-500 px-2.5 text-sm font-medium whitespace-nowrap text-black transition-all hover:bg-amber-400">
                  <Plus className="h-4 w-4" />
                  Add Expense
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Create expense entry</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Expense name</Label>
                      <Input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Studio lighting package" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select id="category" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
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
                      <Input id="vendor" value={form.vendor} onChange={(event) => setForm({ ...form, vendor: event.target.value })} placeholder="Supplier or agency" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">Payment method</Label>
                      <select id="method" value={form.method} onChange={(event) => setForm({ ...form, method: event.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Card</option>
                        <option>Bank Transfer</option>
                        <option>Cash</option>
                        <option>PayPal</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <select id="status" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Approved</option>
                        <option>Pending</option>
                        <option>Needs Review</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Add the operational context" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Invoice references or approval notes" />
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} className="bg-amber-500 text-black hover:bg-amber-400">Save expense</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mb-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="text-sm text-zinc-400">Largest expense</p>
                <p className="text-lg text-white">Fabric roll order</p>
                <p className="text-sm text-amber-400">$12.25K</p>
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
                      <tr key={`${expense.name}-${expense.date}`} className="border-b border-white/5 text-zinc-300">
                        <td className="px-3 py-3">{expense.name}</td>
                        <td className="px-3 py-3">{expense.category}</td>
                        <td className="px-3 py-3">{expense.vendor}</td>
                        <td className="px-3 py-3">${expense.amount.toLocaleString()}</td>
                        <td className="px-3 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs ${expense.status === "Approved" ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"}`}>
                            {expense.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-3 py-6 text-center text-zinc-400" colSpan={5}>No expenses match your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section id="products" className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Product cost</p>
                  <h3 className="text-xl font-semibold text-white">Variation cost management</h3>
                </div>
                <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">Auto-calculated</div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-zinc-400">
                      <th className="px-3 py-3">Design</th>
                      <th className="px-3 py-3">Cost</th>
                      <th className="px-3 py-3">Selling</th>
                      <th className="px-3 py-3">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productCosts.map((item) => (
                      <tr key={item.design} className="border-b border-white/5 text-zinc-300">
                        <td className="px-3 py-3">{item.design}</td>
                        <td className="px-3 py-3">${(item.productionCost + item.printing + item.packaging + item.shipping + item.other).toFixed(1)}</td>
                        <td className="px-3 py-3">${item.sellingPrice}</td>
                        <td className="px-3 py-3">{item.margin}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div id="inventory" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Inventory</p>
                  <h3 className="text-xl font-semibold text-white">Low stock and valuation</h3>
                </div>
              </div>
              <div className="space-y-3">
                {inventoryRows.map((item) => (
                  <div key={item.design} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">{item.design}</p>
                      <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">{item.available} left</span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{item.color} · {item.size} · Reserved {item.reserved}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <motion.div id="sales" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Sales operations</p>
                  <h3 className="text-xl font-semibold text-white">Order growth and top products</h3>
                </div>
              </div>
              <div className="mb-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orderGrowth}>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="month" stroke="#71717a" tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#facc15" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {salesByProduct.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-sm text-zinc-400">{item.name}</p>
                    <p className="text-xl font-semibold text-white">{item.sales} sold</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div id="budget" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Budget planner</p>
                  <h3 className="text-xl font-semibold text-white">Launch budget health</h3>
                </div>
              </div>
              <div className="space-y-3">
                {budgetItems.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-sm text-zinc-400">{item.usage}% used</p>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{ width: `${item.usage}%` }} />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
                      <span>Spent ${item.spent.toLocaleString()}</span>
                      <span>Remaining ${item.remaining.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <motion.div id="marketing" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Marketing tracker</p>
                  <h3 className="text-xl font-semibold text-white">Channel performance</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-zinc-400">
                      <th className="px-3 py-3">Channel</th>
                      <th className="px-3 py-3">Spend</th>
                      <th className="px-3 py-3">Reach</th>
                      <th className="px-3 py-3">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketingRows.map((item) => (
                      <tr key={item.channel} className="border-b border-white/5 text-zinc-300">
                        <td className="px-3 py-3">{item.channel}</td>
                        <td className="px-3 py-3">${item.spend.toLocaleString()}</td>
                        <td className="px-3 py-3">{item.reach.toLocaleString()}</td>
                        <td className="px-3 py-3 text-emerald-300">{item.roas}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div id="profit" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Profit calculator</p>
                  <h3 className="text-xl font-semibold text-white">Live margin engine</h3>
                </div>
              </div>
              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm text-zinc-400">Revenue</p>
                    <p className="text-2xl font-semibold text-white">$248K</p>
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-zinc-400">Expenses</p>
                    <p className="text-2xl font-semibold text-white">$119K</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-zinc-800/70 p-3">
                    <p className="text-sm text-zinc-400">Gross Profit</p>
                    <p className="text-lg font-semibold text-emerald-300">$129K</p>
                  </div>
                  <div className="rounded-2xl bg-zinc-800/70 p-3">
                    <p className="text-sm text-zinc-400">Net Profit</p>
                    <p className="text-lg font-semibold text-emerald-300">$96K</p>
                  </div>
                  <div className="rounded-2xl bg-zinc-800/70 p-3">
                    <p className="text-sm text-zinc-400">Margin</p>
                    <p className="text-lg font-semibold text-amber-300">38.7%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="reports" className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Financial reports</p>
                <h3 className="text-xl font-semibold text-white">Export-ready insights</h3>
              </div>
              <button
                type="button"
                onClick={() => toast.success("Export bundle started. Your reports will arrive shortly.")}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300"
              >
                Export bundle
              </button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {reports.map((item) => (
                <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium text-white">{item.name}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>{item.status}</span>
                    <span className="text-amber-300">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="settings" className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">User roles</p>
                <h3 className="text-xl font-semibold text-white">Role-based access</h3>
              </div>
              <div className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">RBAC enabled</div>
            </div>
            <div className="grid gap-3 md:grid-cols-4">
              {[
                { role: "Admin", scope: "Full access" },
                { role: "Finance Manager", scope: "Budgets & reports" },
                { role: "Inventory Manager", scope: "Stock & cost control" },
                { role: "Marketing Manager", scope: "Campaign tracking" },
              ].map((entry) => (
                <div key={entry.role} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-amber-300">
                    <Users className="h-4 w-4" />
                    <p className="font-medium text-white">{entry.role}</p>
                  </div>
                  <p className="text-sm text-zinc-400">{entry.scope}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <button
        type="button"
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-5 right-5 flex items-center gap-2 rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-black shadow-xl shadow-amber-500/20 transition hover:bg-amber-400"
      >
        <Plus className="h-4 w-4" />
        Add Expense
      </button>

      <Toaster position="top-right" theme={isDark ? "dark" : "light"} />
    </div>
  );
}
