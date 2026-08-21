import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiCalendar, FiSearch, FiPlus, FiCheckCircle, FiClock, FiXCircle,
  FiFilter, FiEye, FiEdit, FiTrash2, FiDollarSign, FiShield, FiX, FiCheck, FiPrinter
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RENTAL_BOOKINGS } from "../../data/mockData";
import Logo from "../../assets/logo.jpeg";

export default function AdminRentals() {
  const [rentals, setRentals] = useState(RENTAL_BOOKINGS || []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Rental Form State
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    productTitle: "Royal Kundan Bridal Set",
    startDate: "",
    endDate: "",
    dailyRate: 800,
    depositAmount: 5000,
    eventOccasion: "Wedding Ceremony",
    city: "Rahuri"
  });

  // Filtering
  const filtered = rentals.filter((b) => {
    const matchesSearch =
      b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      b.productTitle?.toLowerCase().includes(search.toLowerCase()) ||
      b.id?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search);

    const matchesStatus = statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalRevenue = rentals.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const activeBookings = rentals.filter((b) => b.status === "Out for Event" || b.status === "Confirmed").length;
  const pendingDepositSum = rentals
    .filter((b) => b.status !== "Returned")
    .reduce((sum, b) => sum + (b.depositAmount || 0), 0);

  const handleStatusChange = (id, newStatus) => {
    setRentals((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast.success(`Booking ${id} status updated to ${newStatus}`);
  };

  const handleCreateRental = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in required fields");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const totalAmount = days * Number(formData.dailyRate);

    const newBooking = {
      id: `RNT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      totalDays: days,
      totalAmount,
      status: "Confirmed",
      paymentStatus: "Paid",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400"
    };

    setRentals((prev) => [newBooking, ...prev]);
    toast.success(`Rental reservation ${newBooking.id} created successfully!`);
    setIsNewModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Rental Bookings | Mayleki Admin</title>
      </Helmet>

      <div className="p-6 sm:p-8 space-y-6 no-print">
        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">
              Rental Bookings & Reservations
            </h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">
              Track bridal & event jewellery rentals, security deposits, and return schedules
            </p>
          </div>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2 rounded-xl shadow-gold hover:shadow-gold-sm transition-all"
          >
            <FiPlus className="w-4 h-4" /> New Reservation
          </button>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-poppins">
          <div className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Reservations</p>
              <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                {rentals.length}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Active Rentals</p>
              <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                {activeBookings}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <FiShield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Security Deposit Held</p>
              <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                ₹{pendingDepositSum.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Rental Revenue</p>
              <p className="font-playfair text-2xl font-bold text-gold">
                ₹{totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white dark:bg-dark-brown-light p-4 rounded-2xl border border-gold/10 shadow-sm font-poppins">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, phone, or item..."
              className="input-luxury pl-10 py-2.5 text-sm w-full rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {["All", "Confirmed", "Out for Event", "Returned", "Pending Deposit"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === status
                    ? "bg-gold text-dark-brown shadow-gold-sm"
                    : "border border-gold/20 text-gray-400 hover:text-dark-brown dark:hover:text-cream"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Rentals Table */}
        <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5 border-b border-gold/10">
                <tr>
                  {[
                    "Booking ID",
                    "Customer Details",
                    "Jewellery Item",
                    "Event & Dates",
                    "Rental Fee",
                    "Security Deposit",
                    "Status",
                    "Actions"
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5 font-poppins text-sm">
                {filtered.map((b) => (
                  <motion.tr
                    key={b.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gold/5 transition-colors"
                  >
                    {/* Booking ID */}
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-lg">
                        {b.id}
                      </span>
                    </td>

                    {/* Customer Details */}
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-semibold text-dark-brown dark:text-cream">{b.customerName}</p>
                        <p className="text-xs text-gray-400">{b.phone}</p>
                        <p className="text-[10px] text-gold">{b.city}</p>
                      </div>
                    </td>

                    {/* Jewellery Item */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3 max-w-xs">
                        <img
                          src={b.image}
                          alt={b.productTitle}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-sm text-dark-brown dark:text-cream line-clamp-1">
                            {b.productTitle}
                          </p>
                          <p className="text-xs text-rose-gold">₹{b.dailyRate}/day</p>
                        </div>
                      </div>
                    </td>

                    {/* Event & Dates */}
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                          {b.eventOccasion}
                        </p>
                        <p className="text-xs text-gray-400">
                          {b.startDate} → {b.endDate}
                        </p>
                        <span className="text-[10px] text-gold font-medium">({b.totalDays} Days)</span>
                      </div>
                    </td>

                    {/* Rental Fee */}
                    <td className="px-5 py-3.5 font-semibold text-dark-brown dark:text-cream">
                      ₹{b.totalAmount?.toLocaleString("en-IN")}
                    </td>

                    {/* Deposit */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{b.depositAmount?.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border-none focus:ring-1 focus:ring-gold cursor-pointer ${
                          b.status === "Confirmed"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : b.status === "Out for Event"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            : b.status === "Returned"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Out for Event">Out for Event</option>
                        <option value="Returned">Returned</option>
                        <option value="Pending Deposit">Pending Deposit</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedBooking(b)}
                          className="p-2 rounded-lg hover:bg-gold/10 text-gold transition-colors"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: View Details */}
        <AnimatePresence>
          {selectedBooking && (
            <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-start sm:items-center justify-center min-h-screen">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm no-print"
                onClick={() => setSelectedBooking(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="printable-document relative bg-white dark:bg-dark-brown-light border border-gold/20 rounded-3xl p-5 sm:p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto my-auto shadow-2xl z-10 space-y-4 font-poppins no-scrollbar"
              >
                {/* Brand Header with Logo for Print & View */}
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
                        Premium Imitation & Rental Jewellery
                      </p>
                      <p className="text-[10px] text-gray-400">Main Road, Rahuri • +91 98220 12345</p>
                    </div>
                  </div>

                  <div className="text-right no-print">
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="p-2 rounded-full hover:bg-gold/10 text-gray-400 hover:text-dark-brown dark:hover:text-cream transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Receipt Ref Badge */}
                <div className="flex items-center justify-between bg-gold/10 p-3 rounded-xl border border-gold/20">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Official Rental Receipt</p>
                    <p className="font-mono text-xs font-bold text-dark-brown dark:text-cream">Ref: {selectedBooking.id}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {selectedBooking.status}
                  </span>
                </div>

                {/* Booking & Item Details */}
                <div className="space-y-4 text-sm">
                  {/* Rental Product Items Table */}
                  <div className="border border-gold/20 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-white/5">
                    <table className="w-full text-xs">
                      <thead className="bg-gold/10 text-dark-brown dark:text-cream border-b border-gold/20 font-semibold uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3 text-left">Rented Item</th>
                          <th className="py-2.5 px-3 text-center">Daily Rate</th>
                          <th className="py-2.5 px-3 text-center">Days</th>
                          <th className="py-2.5 px-3 text-right">Fee</th>
                          <th className="py-2.5 px-3 text-right">Deposit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/10 text-dark-brown dark:text-cream">
                        <tr>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <img src={selectedBooking.image} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                              <div>
                                <p className="font-semibold line-clamp-1">{selectedBooking.productTitle}</p>
                                <p className="text-[10px] text-gold">{selectedBooking.eventOccasion}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center font-medium">₹{selectedBooking.dailyRate}</td>
                          <td className="py-3 px-3 text-center font-medium">{selectedBooking.totalDays}</td>
                          <td className="py-3 px-3 text-right font-medium">₹{selectedBooking.totalAmount?.toLocaleString("en-IN")}</td>
                          <td className="py-3 px-3 text-right font-bold text-emerald-600">₹{selectedBooking.depositAmount?.toLocaleString("en-IN")}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                    <div>
                      <p className="text-gray-400">Customer Name</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">
                        {selectedBooking.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone Number</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">
                        {selectedBooking.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Rental Period</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">
                        {selectedBooking.startDate} to {selectedBooking.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Duration</p>
                      <p className="font-semibold text-gold">{selectedBooking.totalDays} Days</p>
                    </div>
                  </div>

                  <div className="border-t border-gold/10 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rental Fee ({selectedBooking.totalDays} days @ ₹{selectedBooking.dailyRate}/day):</span>
                      <span className="font-semibold">₹{selectedBooking.totalAmount?.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Refundable Security Deposit:</span>
                      <span className="font-semibold text-emerald-600">₹{selectedBooking.depositAmount?.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-dark-brown dark:text-cream border-t border-gold/10 pt-2">
                      <span>Total Paid / Payable:</span>
                      <span className="text-gold">₹{(selectedBooking.totalAmount + selectedBooking.depositAmount)?.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Signature & Disclaimer Block */}
                  <div className="pt-4 border-t border-dashed border-gray-300 space-y-4">
                    <p className="text-[10px] text-gray-400 italic text-center">
                      * Security deposit will be fully refunded upon return of jewellery item in original condition.
                    </p>
                    <div className="flex justify-between items-end pt-3">
                      <div className="text-left text-[10px] text-gray-400">
                        <p>Thank you for choosing Mayleki Boutique!</p>
                        <p>Visit us again at Rahuri.</p>
                      </div>
                      <div className="text-right">
                        <div className="w-32 border-b border-gray-400 mb-1"></div>
                        <p className="text-[10px] font-bold text-dark-brown uppercase">Authorized Signatory</p>
                        <p className="text-[9px] text-gold">Mayleki Jewellery Boutique</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Print & Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gold/10 no-print">
                  <button
                    onClick={() => {
                      toast.success("Printing official receipt with Mayleki Logo...");
                      window.print();
                    }}
                    className="btn-gold-outline text-xs px-4 py-2 rounded-xl flex items-center gap-2 min-h-0 cursor-pointer"
                  >
                    <FiPrinter className="w-4 h-4" /> Print Receipt
                  </button>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="btn-gold text-xs px-5 py-2 rounded-xl min-h-0 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Create New Reservation */}
        <AnimatePresence>
          {isNewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsNewModalOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-dark-brown-light border border-gold/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 space-y-6 font-poppins"
              >
                <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                    New Rental Reservation
                  </h2>
                  <button
                    onClick={() => setIsNewModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gold/10 text-gray-400 hover:text-dark-brown dark:hover:text-cream transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateRental} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Radhika Deshmukh"
                      className="input-luxury text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98220..."
                        className="input-luxury text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                        City / Town
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Rahuri"
                        className="input-luxury text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                      Jewellery Set / Product *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.productTitle}
                      onChange={(e) => setFormData({ ...formData, productTitle: e.target.value })}
                      placeholder="Royal Kundan Bridal Set"
                      className="input-luxury text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="input-luxury text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                        End Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="input-luxury text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                        Daily Rental Rate (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.dailyRate}
                        onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                        className="input-luxury text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                        Security Deposit (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.depositAmount}
                        onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                        className="input-luxury text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gold/10">
                    <button
                      type="button"
                      onClick={() => setIsNewModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gold/20 text-xs font-semibold hover:border-gold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold text-xs px-5 py-2 rounded-xl font-semibold flex items-center gap-2 min-h-0"
                    >
                      <FiCheck className="w-4 h-4" /> Create Reservation
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* DEDICATED PRINTABLE RENTAL RECEIPT TEMPLATE (HIDDEN ON SCREEN, VISIBLE ON PRINT) */}
        {selectedBooking && (
          <div className="printable-only-area font-poppins">
            <div className="flex items-center justify-between border-b-2 border-amber-600 pb-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-600 p-0.5">
                  <img src={Logo} alt="Mayleki Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-2xl text-amber-900 tracking-wide uppercase">
                    MAYLEKI BOUTIQUE
                  </h1>
                  <p className="text-xs text-amber-700 font-semibold tracking-widest uppercase">
                    Official Rental Receipt & Reservation
                  </p>
                  <p className="text-xs text-gray-500">Main Road, Opp. Market, Rahuri, Maharashtra - 413705 • Tel: +91 98220 12345</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-1">
                  Rental Voucher
                </span>
                <p className="font-mono text-sm font-bold text-gray-800">Booking Ref: {selectedBooking.id}</p>
                <p className="text-xs font-semibold text-emerald-700">Status: {selectedBooking.status}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 bg-amber-50/50 p-4 rounded-xl border border-amber-200 mb-6 text-sm">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Customer Details:</p>
                <p className="font-bold text-gray-900 text-base mt-1">{selectedBooking.customerName}</p>
                <p className="text-xs text-gray-600 mt-0.5">Phone: {selectedBooking.phone}</p>
                <p className="text-xs text-gray-600">City / Location: {selectedBooking.city}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Event & Rental Dates:</p>
                <p className="font-bold text-amber-900 text-sm mt-1">Occasion: {selectedBooking.eventOccasion}</p>
                <p className="text-xs text-gray-700 mt-0.5">Period: {selectedBooking.startDate} to {selectedBooking.endDate}</p>
                <p className="text-xs font-bold text-amber-800">Total Duration: {selectedBooking.totalDays} Days</p>
              </div>
            </div>

            <table className="w-full border-collapse mb-6 text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300 text-left font-bold text-xs uppercase text-gray-600 bg-gray-100">
                  <th className="py-3 px-4">Reserved Jewellery Item</th>
                  <th className="py-3 px-4 text-center">Daily Rate (₹)</th>
                  <th className="py-3 px-4 text-center">Days</th>
                  <th className="py-3 px-4 text-right">Subtotal Fee (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold text-gray-900">{selectedBooking.productTitle}</td>
                  <td className="py-4 px-4 text-center text-gray-600">₹{selectedBooking.dailyRate}/day</td>
                  <td className="py-4 px-4 text-center text-gray-600">{selectedBooking.totalDays}</td>
                  <td className="py-4 px-4 text-right font-bold text-gray-900">₹{selectedBooking.totalAmount?.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mb-8">
              <div className="w-72 space-y-2 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex justify-between text-gray-600 text-xs">
                  <span>Rental Fee ({selectedBooking.totalDays} days):</span>
                  <span>₹{selectedBooking.totalAmount?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-emerald-700 text-xs font-semibold">
                  <span>Refundable Deposit:</span>
                  <span>₹{selectedBooking.depositAmount?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-gray-300 pt-2 text-gray-900">
                  <span>Grand Total Paid:</span>
                  <span className="text-amber-800">₹{(selectedBooking.totalAmount + selectedBooking.depositAmount)?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed border-gray-300 flex justify-between items-end text-xs">
              <div className="space-y-1 text-gray-500">
                <p className="italic text-[10px] text-gray-500">
                  * Security deposit will be fully refunded upon return of jewellery item in original undamaged condition.
                </p>
                <p className="font-semibold text-gray-800 text-xs">Mayleki Jewellery Boutique • Rahuri</p>
              </div>
              <div className="text-right">
                <div className="w-36 border-b border-gray-400 mb-1"></div>
                <p className="font-bold text-gray-800 uppercase">Authorized Signatory</p>
                <p className="text-amber-800 font-semibold">Mayleki Boutique, Rahuri</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
