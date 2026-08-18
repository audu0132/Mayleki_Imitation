import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import { PRODUCTS } from "../../data/mockData";

const RENTAL_ITEMS = PRODUCTS.filter((p) => p.isRentalAvailable).slice(0, 5);

export default function LuxuryBookingSection() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(RENTAL_ITEMS[0]?.id || "");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleBookingClick = (e) => {
    e.preventDefault();
    navigate("/rental-booking");
  };

  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: EDITORIAL JEWELLERY IMAGE (6 Cols) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] overflow-hidden border border-[#C5A059]/30 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85"
                alt="Luxury Jewellery Booking Appointment"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white border-t border-[#C5A059]/40 pt-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C5A059] block font-semibold mb-1">
                  BOUTIQUE APPOINTMENTS
                </span>
                <span className="font-cormorant text-2xl">Bridal Fitting & Rental Reservations</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: LUXURY FORM (6 Cols) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-[#1C1917] p-8 sm:p-12 border border-[#C5A059]/30"
            >
              <span className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A059] block mb-2">
                𑁍 PRIVATE RESERVATIONS
              </span>

              <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#1C1917] dark:text-[#FAF7F2] mb-3">
                Find Your Perfect Piece
              </h2>

              <p className="font-sans text-xs text-gray-500 font-light leading-relaxed mb-8">
                Select your preferred jewellery set and rental dates for private fitting and doorstep delivery in Rahuri.
              </p>

              <form onSubmit={handleBookingClick} className="space-y-6">
                <div>
                  <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">
                    Choose Jewellery Set
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="input-luxury"
                  >
                    {RENTAL_ITEMS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title} — ₹{item.rentalPrice}/day
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="input-luxury"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-xs font-sans font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 group mt-4 rounded-none bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#C5A059] text-stone-950 border border-[#F3E5AB]/60 hover:from-[#C5A059] hover:via-[#F3E5AB] hover:to-[#B8860B] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <FiCalendar className="w-4 h-4 text-stone-950" />
                  <span>CHECK RENTAL AVAILABILITY</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-stone-950" />
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
