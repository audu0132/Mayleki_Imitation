import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiCalendar, FiSearch, FiPlus, FiCheckCircle, FiClock, FiXCircle,
  FiFilter, FiEye, FiEdit, FiTrash2, FiDollarSign, FiShield, FiX, FiCheck, FiPrinter
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { RENTAL_BOOKINGS } from "../../data/mockData";

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

      <div className="p-6 sm:p-8 space-y-6">
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedBooking(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-dark-brown-light border border-gold/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 space-y-6 font-poppins"
              >
                <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                  <div>
                    <span className="font-mono text-xs text-gold font-bold">
                      {selectedBooking.id}
                    </span>
                    <h2 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                      Rental Receipt Details
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 rounded-full hover:bg-gold/10 text-gray-400 hover:text-dark-brown dark:hover:text-cream transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-4 items-center bg-gold/5 p-3 rounded-2xl border border-gold/10">
                    <img
                      src={selectedBooking.image}
                      alt={selectedBooking.productTitle}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-dark-brown dark:text-cream">
                        {selectedBooking.productTitle}
                      </h3>
                      <p className="text-xs text-gold">Occasion: {selectedBooking.eventOccasion}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                    <div>
                      <p className="text-gray-400">Customer</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">
                        {selectedBooking.customerName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="font-semibold text-dark-brown dark:text-cream">
                        {selectedBooking.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Rental Dates</p>
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
                      <span className="font-semibold">₹{selectedBooking.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Refundable Security Deposit:</span>
                      <span className="font-semibold text-emerald-600">₹{selectedBooking.depositAmount}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-dark-brown dark:text-cream border-t border-gold/10 pt-2">
                      <span>Total Payable:</span>
                      <span className="text-gold">₹{selectedBooking.totalAmount + selectedBooking.depositAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gold/10">
                  <button
                    onClick={() => {
                      toast.success("Printing rental receipt...");
                      window.print();
                    }}
                    className="btn-gold-outline text-xs px-4 py-2 rounded-xl flex items-center gap-2 min-h-0"
                  >
                    <FiPrinter className="w-4 h-4" /> Print Receipt
                  </button>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="btn-gold text-xs px-5 py-2 rounded-xl min-h-0"
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
      </div>
    </>
  );
}
