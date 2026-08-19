import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FiPackage, FiClock, FiCheck, FiX, FiPrinter, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import Logo from "../../assets/logo.jpeg";

const SAMPLE_ORDERS = [
  { id: "#ORD-1234", customer: "Priya Sharma", phone: "9876543210", product: "Royal Kundan Bridal Set", amount: 4500, status: "Completed", date: "Jul 22, 2026", type: "Purchase" },
  { id: "#ORD-1233", customer: "Sneha Patil", phone: "9765432109", product: "Kolhapuri Saaj", amount: 2200, status: "Processing", date: "Jul 21, 2026", type: "Purchase" },
  { id: "#ORD-1232", customer: "Anita Kulkarni", phone: "9654321098", product: "American Diamond Choker", amount: 1800, status: "Pending", date: "Jul 20, 2026", type: "Purchase" },
  { id: "#ORD-1231", customer: "Kavita Deshmukh", phone: "9543210987", product: "Temple Gold Nath (Rental)", amount: 450, status: "Completed", date: "Jul 19, 2026", type: "Rental" },
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
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = activeTab === "all"
    ? SAMPLE_ORDERS
    : SAMPLE_ORDERS.filter((o) => o.status === activeTab);

  return (
    <>
      <Helmet><title>Orders | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6 no-print">
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-poppins text-sm transition-all cursor-pointer ${
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
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 rounded-lg text-gold hover:bg-gold/10 transition-colors flex items-center gap-1 font-poppins text-xs font-semibold"
                      >
                        <FiEye className="w-4 h-4" /> View Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Printable Order Invoice Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-start sm:items-center justify-center min-h-screen">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm no-print"
                onClick={() => setSelectedOrder(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="printable-document relative bg-white dark:bg-dark-brown-light border border-gold/20 rounded-3xl p-5 sm:p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto my-auto shadow-2xl z-10 space-y-4 font-poppins no-scrollbar"
              >
                {/* Printable Brand Header with Logo */}
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/60 bg-dark-brown p-0.5 shadow-sm flex-shrink-0 flex items-center justify-center">
                      <img
                        src={Logo}
                        alt="Mayleki Logo"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full rounded-full bg-gold-gradient hidden items-center justify-center text-dark-brown font-playfair font-bold text-base">
                        M
                      </div>
                    </div>
                    <div>
                      <h2 className="font-playfair font-bold text-xl text-dark-brown dark:text-cream leading-tight">
                        MAYLEKI BOUTIQUE
                      </h2>
                      <p className="font-poppins text-[10px] text-gold tracking-widest uppercase font-semibold">
                        Official Tax Invoice
                      </p>
                      <p className="text-[10px] text-gray-400">Main Road, Rahuri • +91 98220 12345</p>
                    </div>
                  </div>

                  <div className="text-right no-print">
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-2 rounded-full hover:bg-gold/10 text-gray-400 hover:text-dark-brown dark:hover:text-cream transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Order Invoice Reference */}
                <div className="flex items-center justify-between bg-gold/10 p-3 rounded-xl border border-gold/20">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Tax Invoice</p>
                    <p className="font-mono text-xs font-bold text-dark-brown dark:text-cream">Invoice #: {selectedOrder.id}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                    {selectedOrder.status}
                  </span>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                    <div>
                      <p className="text-gray-400">Customer Name</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">{selectedOrder.customer}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Date</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">{selectedOrder.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Order Type</p>
                      <p className="font-semibold text-gold">{selectedOrder.type}</p>
                    </div>
                  </div>

                  <div className="border border-gold/10 rounded-xl p-3 text-xs space-y-2">
                    <div className="flex justify-between font-bold border-b border-gold/10 pb-2">
                      <span>Item Purchased / Rented</span>
                      <span>Amount</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{selectedOrder.product}</span>
                      <span className="font-semibold">₹{selectedOrder.amount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="border-t border-gold/10 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-sm text-dark-brown dark:text-cream">
                      <span>Grand Total:</span>
                      <span className="text-gold">₹{selectedOrder.amount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Print Signature Footer */}
                  <div className="pt-6 border-t border-dashed border-gray-300 flex justify-between items-end">
                    <div className="text-left text-[10px] text-gray-400">
                      <p>Thank you for shopping with Mayleki Boutique!</p>
                    </div>
                    <div className="text-right">
                      <div className="w-32 border-b border-gray-400 mb-1"></div>
                      <p className="text-[10px] font-bold text-dark-brown uppercase">Authorized Signatory</p>
                      <p className="text-[9px] text-gold">Mayleki Jewellery Boutique</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gold/10 no-print">
                  <button
                    onClick={() => {
                      toast.success("Printing order invoice with Mayleki Logo...");
                      window.print();
                    }}
                    className="btn-gold-outline text-xs px-4 py-2 rounded-xl flex items-center gap-2 min-h-0 cursor-pointer"
                  >
                    <FiPrinter className="w-4 h-4" /> Print Invoice
                  </button>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="btn-gold text-xs px-5 py-2 rounded-xl min-h-0 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
