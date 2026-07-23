import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiShoppingCart, FiPackage, FiUsers, FiCalendar,
  FiTrendingUp, FiDollarSign,
  FiClock, FiArrowUp, FiArrowDown,
} from "react-icons/fi";
import { ADMIN_STATS } from "../../data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const STAT_CARDS = [
  {
    label: "Total Revenue",
    value: `₹${(ADMIN_STATS.totalRevenue / 1000).toFixed(1)}K`,
    icon: FiDollarSign,
    color: "bg-gold/10 text-gold",
    change: "+18.5%",
    up: true,
  },
  {
    label: "Total Orders",
    value: ADMIN_STATS.totalOrders,
    icon: FiShoppingCart,
    color: "bg-blue-50 text-blue-500",
    change: "+12.3%",
    up: true,
  },
  {
    label: "Active Rentals",
    value: ADMIN_STATS.totalRentals,
    icon: FiCalendar,
    color: "bg-rose-50 text-rose-gold",
    change: "+24.1%",
    up: true,
  },
  {
    label: "Total Products",
    value: ADMIN_STATS.totalProducts,
    icon: FiPackage,
    color: "bg-purple-50 text-purple-500",
    change: "+8",
    up: true,
  },
  {
    label: "Total Customers",
    value: ADMIN_STATS.totalCustomers,
    icon: FiUsers,
    color: "bg-green-50 text-green-500",
    change: "+156",
    up: true,
  },
  {
    label: "Pending Orders",
    value: ADMIN_STATS.pendingOrders,
    icon: FiClock,
    color: "bg-amber-50 text-amber-500",
    change: "-3",
    up: false,
  },
];

const CHART_COLORS = ["#D4AF37", "#B76E79", "#3B2F2F", "#A8891A", "#8B4F58"];

export default function AdminDashboard() {
  return (
    <>
      <Helmet><title>Dashboard | Mayleki Admin</title></Helmet>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">
              Dashboard
            </h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">
              Welcome back! Here's what's happening with Mayleki.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-poppins text-gray-400 bg-white dark:bg-dark-brown-light border border-gold/10 rounded-xl px-4 py-2">
            <FiCalendar className="w-4 h-4 text-gold" />
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-dark-brown-light rounded-2xl p-5 border border-gold/10 hover:border-gold/30 hover:shadow-card transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">{card.value}</p>
              <p className="font-poppins text-xs text-gray-400 mt-0.5">{card.label}</p>
              <div className={`flex items-center gap-1 mt-2 font-poppins text-xs font-semibold ${card.up ? "text-green-500" : "text-red-400"}`}>
                {card.up ? <FiArrowUp className="w-3 h-3" /> : <FiArrowDown className="w-3 h-3" />}
                {card.change} this month
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-dark-brown-light rounded-2xl p-6 border border-gold/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-playfair text-xl font-bold text-dark-brown dark:text-cream">Revenue Overview</h3>
                <p className="font-poppins text-xs text-gray-400">Monthly revenue vs orders</p>
              </div>
              <span className="badge-gold">2025</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ADMIN_STATS.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,175,55,0.1)" />
                <XAxis dataKey="month" tick={{ fontFamily: "Poppins", fontSize: 11 }} />
                <YAxis tick={{ fontFamily: "Poppins", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: "#3B2F2F", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12, fontFamily: "Poppins", fontSize: 12 }}
                  labelStyle={{ color: "#D4AF37" }}
                />
                <Bar dataKey="revenue" fill="#D4AF37" radius={[6, 6, 0, 0]} name="Revenue (₹)" />
                <Bar dataKey="orders" fill="#B76E79" radius={[6, 6, 0, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Categories Pie */}
          <div className="bg-white dark:bg-dark-brown-light rounded-2xl p-6 border border-gold/10">
            <h3 className="font-playfair text-xl font-bold text-dark-brown dark:text-cream mb-1">Top Categories</h3>
            <p className="font-poppins text-xs text-gray-400 mb-4">Sales by category</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={ADMIN_STATS.topCategories}
                  dataKey="sales"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={false}
                >
                  {ADMIN_STATS.topCategories.map((_, index) => (
                    <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontFamily: "Poppins", fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {ADMIN_STATS.topCategories.map((cat, i) => (
                <div key={cat.name} className="flex items-center justify-between text-xs font-poppins">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: CHART_COLORS[i] }} />
                    <span className="text-gray-500">{cat.name}</span>
                  </div>
                  <span className="font-semibold text-dark-brown dark:text-cream">{cat.sales}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders + Rentals Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden">
            <div className="p-5 border-b border-gold/10 flex items-center justify-between">
              <h3 className="font-playfair text-lg font-bold text-dark-brown dark:text-cream">Recent Orders</h3>
              <a href="/admin/orders" className="font-poppins text-xs text-gold hover:underline">View all</a>
            </div>
            <div className="divide-y divide-gold/5">
              {[
                { id: "#ORD-1234", customer: "Priya Sharma", amount: "₹4,500", status: "Completed", date: "Today" },
                { id: "#ORD-1233", customer: "Sneha Patil", amount: "₹2,200", status: "Processing", date: "Yesterday" },
                { id: "#ORD-1232", customer: "Anita Kulkarni", amount: "₹1,800", status: "Pending", date: "2 days ago" },
                { id: "#ORD-1231", customer: "Kavita Deshmukh", amount: "₹3,400", status: "Completed", date: "3 days ago" },
              ].map((order) => (
                <div key={order.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <FiShoppingCart className="w-4 h-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream truncate">{order.customer}</p>
                    <p className="font-poppins text-xs text-gray-400">{order.id} · {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream">{order.amount}</p>
                    <span className={`text-[10px] font-poppins font-semibold px-2 py-0.5 rounded-full ${
                      order.status === "Completed" ? "bg-green-100 text-green-600" :
                      order.status === "Processing" ? "bg-blue-100 text-blue-600" :
                      "bg-amber-100 text-amber-600"
                    }`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Rentals */}
          <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden">
            <div className="p-5 border-b border-gold/10 flex items-center justify-between">
              <h3 className="font-playfair text-lg font-bold text-dark-brown dark:text-cream">Upcoming Rentals</h3>
              <a href="/admin/rentals" className="font-poppins text-xs text-gold hover:underline">View all</a>
            </div>
            <div className="divide-y divide-gold/5">
              {[
                { customer: "Rekha Jadhav", product: "Royal Kundan Bridal Set", date: "Jul 25-28", status: "Confirmed" },
                { customer: "Pooja Bhosale", product: "Kolhapuri Saaj", date: "Jul 26-29", status: "Pending" },
                { customer: "Sunita More", product: "Temple Gold Nath", date: "Jul 28-30", status: "Confirmed" },
                { customer: "Meena Pawar", product: "Haldi Bangles Set", date: "Aug 01-03", status: "Confirmed" },
              ].map((rental, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-gold/10 flex items-center justify-center flex-shrink-0">
                    <FiCalendar className="w-4 h-4 text-rose-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream truncate">{rental.customer}</p>
                    <p className="font-poppins text-xs text-gray-400 truncate">{rental.product} · {rental.date}</p>
                  </div>
                  <span className={`text-[10px] font-poppins font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    rental.status === "Confirmed" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  }`}>{rental.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-dark-brown-light rounded-2xl p-6 border border-gold/10">
          <h3 className="font-playfair text-lg font-bold text-dark-brown dark:text-cream mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Add Product", href: "/admin/products/new", icon: FiPackage, color: "bg-gold/10 text-gold hover:bg-gold/20" },
              { label: "New Order", href: "/admin/orders", icon: FiShoppingCart, color: "bg-blue-50 text-blue-500 hover:bg-blue-100" },
              { label: "New Rental", href: "/admin/rentals", icon: FiCalendar, color: "bg-rose-50 text-rose-gold hover:bg-rose-100" },
              { label: "View Reports", href: "/admin/reports", icon: FiTrendingUp, color: "bg-green-50 text-green-500 hover:bg-green-100" },
            ].map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${color} transition-all duration-200 hover:-translate-y-1 text-center`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-poppins text-sm font-semibold">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
