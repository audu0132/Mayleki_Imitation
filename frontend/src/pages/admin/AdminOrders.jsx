import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FiPackage, FiClock, FiCheck, FiX } from "react-icons/fi";

const SAMPLE_ORDERS = [
  { id: "#ORD-1234", customer: "Priya Sharma", phone: "9876543210", product: "Royal Kundan Bridal Set", amount: 4500, status: "Completed", date: "Jul 22, 2025", type: "Purchase" },
  { id: "#ORD-1233", customer: "Sneha Patil", phone: "9765432109", product: "Kolhapuri Saaj", amount: 2200, status: "Processing", date: "Jul 21, 2025", type: "Purchase" },
  { id: "#ORD-1232", customer: "Anita Kulkarni", phone: "9654321098", product: "American Diamond Choker", amount: 1800, status: "Pending", date: "Jul 20, 2025", type: "Purchase" },
  { id: "#ORD-1231", customer: "Kavita Deshmukh", phone: "9543210987", product: "Temple Gold Nath (Rental)", amount: 450, status: "Completed", date: "Jul 19, 2025", type: "Rental" },
];

const STATUS_TABS = [
  { label: "All Orders", count: 342, value: "all" },
  { label: "Pending", count: 23, value: "Pending" },
  { label: "Processing", count: 18, value: "Processing" },
  { label: "Completed", count: 298, value: "Completed" },
  { label: "Cancelled", count: 21, value: "Cancelled" },
];

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("all");
  const filteredOrders = activeTab === "all"
    ? SAMPLE_ORDERS
    : SAMPLE_ORDERS.filter((o) => o.status === activeTab);

  return (
    <>
      <Helmet><title>Orders | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Orders</h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">Manage purchase and rental orders</p>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex gap-3 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-poppins text-sm transition-all ${
                activeTab === tab.value
                  ? "border-gold bg-gold/10 text-gold font-semibold shadow-sm"
                  : "border-gold/20 hover:border-gold hover:bg-gold/5 text-dark-brown dark:text-cream"
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.value ? "bg-gold text-dark-brown" : "bg-gold/10 text-gold"
              }`}>{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5 border-b border-gold/10">
                <tr>
                  {["Order ID", "Customer", "Product", "Amount", "Type", "Date", "Status", "Action"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gold/5 transition-colors">
                    <td className="px-6 py-4 font-poppins font-semibold text-sm text-gold">{order.id}</td>

                    <td className="px-4 py-3">
                      <p className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream">{order.customer}</p>
                      <p className="font-poppins text-xs text-gray-400">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3 font-poppins text-sm text-dark-brown dark:text-cream max-w-[180px] truncate">{order.product}</td>
                    <td className="px-4 py-3 font-poppins font-semibold text-sm text-dark-brown dark:text-cream">₹{order.amount.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-poppins font-semibold px-2.5 py-1 rounded-full ${
                        order.type === "Rental" ? "bg-rose-gold/10 text-rose-gold" : "bg-gold/10 text-gold"
                      }`}>{order.type}</span>
                    </td>
                    <td className="px-4 py-3 font-poppins text-xs text-gray-400 whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 text-[10px] font-poppins font-semibold px-2.5 py-1 rounded-full w-fit ${
                        order.status === "Completed" ? "bg-green-100 text-green-600" :
                        order.status === "Processing" ? "bg-blue-100 text-blue-600" :
                        order.status === "Pending" ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-500"
                      }`}>
                        {order.status === "Completed" ? <FiCheck className="w-3 h-3" /> :
                         order.status === "Cancelled" ? <FiX className="w-3 h-3" /> :
                         <FiClock className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs font-poppins text-gold hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
