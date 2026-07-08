// Navigation items
export const navItems = [
  { label: "Overview", id: "overview", href: "/" },
  { label: "Expenses", id: "expenses", href: "/expenses" },
  { label: "Products", id: "products", href: "/products" },
  { label: "Inventory", id: "inventory", href: "/inventory" },
  { label: "Sales", id: "sales", href: "/sales" },
  { label: "Budget", id: "budget", href: "/budget" },
  { label: "Marketing", id: "marketing", href: "/marketing" },
  { label: "Profit", id: "profit", href: "/profit" },
  { label: "Reports", id: "reports", href: "/reports" },
  { label: "Settings", id: "settings", href: "/settings" },
];

// KPI Data
export const kpis = [
  { label: "Total Revenue", value: "$1.24M", delta: "+12.4%", tone: "text-emerald-400" },
  { label: "Total Expenses", value: "$486K", delta: "+4.8%", tone: "text-cyan-400" },
  { label: "Net Profit", value: "$312K", delta: "+9.1%", tone: "text-emerald-400" },
  { label: "Gross Profit", value: "$754K", delta: "+15.2%", tone: "text-emerald-400" },
  { label: "Monthly Profit", value: "$84K", delta: "+8.3%", tone: "text-emerald-400" },
  { label: "Total Orders", value: "2,184", delta: "+6.7%", tone: "text-sky-400" },
  { label: "Inventory Value", value: "$342K", delta: "-1.2%", tone: "text-cyan-400" },
  { label: "Available Cash", value: "$126K", delta: "+3.4%", tone: "text-emerald-400" },
  { label: "Pending Payments", value: "$18K", delta: "2 pending", tone: "text-cyan-400" },
  { label: "Marketing Spend", value: "$43K", delta: "+2.1%", tone: "text-sky-400" },
];

// Revenue and Expenses Data
export const revenueData = [
  { month: "Jan", revenue: 118000, expenses: 76000 },
  { month: "Feb", revenue: 132000, expenses: 81000 },
  { month: "Mar", revenue: 145000, expenses: 84000 },
  { month: "Apr", revenue: 158000, expenses: 90000 },
  { month: "May", revenue: 171000, expenses: 96000 },
  { month: "Jun", revenue: 187000, expenses: 104000 },
];

// Profit Data
export const profitData = [
  { month: "Jan", profit: 42000 },
  { month: "Feb", profit: 51000 },
  { month: "Mar", profit: 61000 },
  { month: "Apr", profit: 68000 },
  { month: "May", profit: 75000 },
  { month: "Jun", profit: 83000 },
];

// Expense Breakdown
export const expenseBreakdown = [
  { name: "Production", value: 34, color: "#d4af37" },
  { name: "Marketing", value: 22, color: "#f59e0b" },
  { name: "Shipping", value: 16, color: "#71717a" },
  { name: "Software", value: 12, color: "#fbbf24" },
  { name: "Other", value: 16, color: "#e5e7eb" },
];

// Sales by Product
export const salesByProduct = [
  { name: "Midnight Drop", sales: 320 },
  { name: "Chrome Tee", sales: 280 },
  { name: "Studio Hoody", sales: 240 },
  { name: "Phase Jacket", sales: 180 },
];

// Collections
export const collections = [
  { name: "Urban Pulse", revenue: 242000 },
  { name: "After Dark", revenue: 186000 },
  { name: "Cold Steel", revenue: 158000 },
];

// Cash Flow
export const cashFlow = [
  { month: "Jan", inflow: 132000, outflow: 98000 },
  { month: "Feb", inflow: 141000, outflow: 101000 },
  { month: "Mar", inflow: 154000, outflow: 108000 },
  { month: "Apr", inflow: 168000, outflow: 112000 },
  { month: "May", inflow: 182000, outflow: 118000 },
  { month: "Jun", inflow: 198000, outflow: 127000 },
];

// Order Growth
export const orderGrowth = [
  { month: "Jan", orders: 312 },
  { month: "Feb", orders: 347 },
  { month: "Mar", orders: 389 },
  { month: "Apr", orders: 418 },
  { month: "May", orders: 467 },
  { month: "Jun", orders: 514 },
];

// Initial Expenses
export const initialExpenses = [
  {
    name: "Studio lighting package",
    category: "Photography",
    vendor: "Lumen Works",
    amount: 2800,
    date: "2026-07-03",
    method: "Card",
    status: "Approved",
  },
  {
    name: "Fabric roll order",
    category: "Fabric",
    vendor: "Blackline Textile",
    amount: 12250,
    date: "2026-07-01",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    name: "Meta ad boost",
    category: "Meta Ads",
    vendor: "Meta Business",
    amount: 5400,
    date: "2026-06-29",
    method: "Card",
    status: "Approved",
  },
];

// Product Costs
export const productCosts = [
  {
    design: "Midnight Drop",
    collection: "Urban Pulse",
    variation: "Classic Tee",
    color: "Black",
    size: "M",
    productionCost: 18.5,
    printing: 3.4,
    packaging: 1.2,
    shipping: 2.1,
    other: 0.8,
    sellingPrice: 49,
    profit: 23,
    margin: 47,
  },
  {
    design: "Chrome Tee",
    collection: "After Dark",
    variation: "Oversized",
    color: "Charcoal",
    size: "L",
    productionCost: 21.2,
    printing: 3.8,
    packaging: 1.4,
    shipping: 2.3,
    other: 0.9,
    sellingPrice: 59,
    profit: 29.4,
    margin: 50,
  },
];

// Inventory Rows
export const inventoryRows = [
  {
    design: "Studio Hoody",
    variation: "Heavy",
    size: "M",
    color: "Gold",
    quantity: 84,
    available: 72,
    reserved: 8,
    sold: 164,
    damaged: 2,
    returns: 3,
  },
  {
    design: "Phase Jacket",
    variation: "Shell",
    size: "XL",
    color: "Black",
    quantity: 46,
    available: 37,
    reserved: 4,
    sold: 92,
    damaged: 1,
    returns: 1,
  },
];

// Budget Items
export const budgetItems = [
  { name: "Production Budget", allocated: 120000, spent: 84500, remaining: 35500, usage: 70 },
  { name: "Marketing Budget", allocated: 50000, spent: 43200, remaining: 6800, usage: 86 },
  { name: "Photography Budget", allocated: 18000, spent: 11200, remaining: 6800, usage: 62 },
  { name: "Packaging Budget", allocated: 12000, spent: 6800, remaining: 5200, usage: 57 },
];

// Marketing Rows
export const marketingRows = [
  {
    channel: "Meta Ads",
    spend: 13200,
    reach: 184000,
    clicks: 4620,
    conversions: 318,
    cpo: 41.5,
    roas: 3.8,
    roi: 280,
  },
  {
    channel: "TikTok Ads",
    spend: 9800,
    reach: 216000,
    clicks: 5210,
    conversions: 402,
    cpo: 24.4,
    roas: 4.6,
    roi: 360,
  },
  {
    channel: "Influencer",
    spend: 7400,
    reach: 128000,
    clicks: 2040,
    conversions: 176,
    cpo: 42.0,
    roas: 3.2,
    roi: 220,
  },
];

// Reports
export const reports = [
  { name: "Income Statement", status: "Ready", type: "PDF" },
  { name: "Cash Flow", status: "Updated", type: "Excel" },
  { name: "Inventory Cost Report", status: "Queued", type: "CSV" },
];

// User Roles
export const userRoles = [
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

export type Expense = {
  name: string;
  category: string;
  vendor: string;
  amount: number;
  date: string;
  method: string;
  status: string;
};
