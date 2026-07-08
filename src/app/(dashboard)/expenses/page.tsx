"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AlertTriangle, Plus, Search } from "lucide-react";
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

export default function ExpensesPage() {
  const { expenses, addExpense } = useExpenses();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    toast.success("Expense added successfully!");
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
              Expense management
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
              Track and approve operational expenses
            </h2>
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
      </header>

      <div className="rounded-[28px] border border-white/10 bg-zinc-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <div className="mb-4 flex gap-2">
          <label className="flex flex-1 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-400">
            <Search className="h-4 w-4" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="flex-1 bg-transparent outline-none"
              placeholder="Search expenses by name, category, or vendor..."
            />
          </label>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">Total expenses</p>
            <p className="text-lg text-white">
              ${expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">Average expense</p>
            <p className="text-lg text-white">
              ${expenses.length > 0 ? Math.round(expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length).toLocaleString() : "0"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-sm text-zinc-400">Total count</p>
            <p className="text-lg text-white">{expenses.length}</p>
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
                <th className="px-3 py-3">Date</th>
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
                    <td className="px-3 py-3">{expense.date}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          expense.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : expense.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-300"
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
                    colSpan={6}
                  >
                    No expenses match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
