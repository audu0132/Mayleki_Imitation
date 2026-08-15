import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiCalendar, FiChevronRight, FiClock, FiShield,
  FiCheckCircle, FiPhone, FiMail, FiMapPin, FiStar,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { PRODUCTS } from "../data/mockData";

const STEPS = ["Choose Jewellery", "Select Dates", "Your Details", "Confirm"];

const RENTAL_PRODUCTS = PRODUCTS.filter((p) => p.isRentalAvailable).slice(0, 6);

const POLICIES = [
  { icon: "🛡️", title: "Refundable Deposit", desc: "50% of product value, fully refunded within 24hrs of return." },
  { icon: "📅", title: "Minimum Rental", desc: "2 days minimum rental. Additional days charged pro-rata." },
  { icon: "🚚", title: "Free Local Pickup", desc: "Free pickup available in Rahuri & nearby areas." },
  { icon: "✨", title: "Cleaned & Sanitised", desc: "Every set is professionally cleaned & sanitised before delivery." },
  { icon: "📦", title: "Damage Policy", desc: "Minor wear & tear waived. Major damage charged at repair cost." },
  { icon: "🔁", title: "Hassle-Free Return", desc: "Drop off at store or schedule free pickup on return date." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function RentalBookingPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", from: "", to: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  const product = RENTAL_PRODUCTS.find((p) => p.id === selected);
  const days =
    form.from && form.to
      ? Math.max(2, Math.ceil((new Date(form.to) - new Date(form.from)) / (1000 * 60 * 60 * 24)))
      : 0;
  const rentalTotal = product ? days * product.rentalPrice : 0;
  const deposit = product ? Math.round(product.sellingPrice * 0.5) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi Mayleki! I want to book rental jewellery.
Product: ${product?.title}
Dates: ${form.from} to ${form.to} (${days} days)
Name: ${form.name} | Phone: ${form.phone}
Note: ${form.note || "None"}
Rental Total: ₹${rentalTotal} + Refundable Deposit ₹${deposit}`;
    window.open(`https://wa.me/919139236500?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Book Rental Jewellery | Mayleki Imitation Jewellery Rahuri</title>
        <meta name="description" content="Rent premium bridal and traditional Maharashtrian jewellery from Mayleki for your special occasion. Easy booking, free pickup, fully refundable deposit." />
      </Helmet>

      <div className="bg-[#FAF7F2] dark:bg-[#141110] min-h-screen">
        {/* ─── Hero ──────────────────────────────────── */}
        <div className="relative min-h-[48vh] flex items-center overflow-hidden bg-[#1C1917] border-b border-[#C5A059]/30">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80"
            alt="Rental Jewellery"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1917]/70 via-[#4A0E17]/60 to-[#1C1917]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-3">
                𑁍 Luxury Bridal Jewellery Rental
              </p>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F2] leading-tight mb-5">
                Wear Royal Maharashtrian Craftsmanship,<br />
                <span className="italic text-[#E5C88A]">Without Heavy Purchase Costs</span>
              </h1>
              <p className="font-sans text-sm text-[#FAF7F2]/80 max-w-xl mx-auto mb-8 leading-relaxed font-light">
                Rent authentic Kundan sets, Kolhapuri saaj, Nath, and complete bridal jewellery in Rahuri from just ₹150/day.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setStep(0)}
                  className="btn-gold text-xs px-10 py-4"
                >
                  Start Booking Flow
                </button>
                <a
                  href="https://wa.me/919139236500?text=Hi Mayleki! I want to inquire about jewellery rental options."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wine text-xs px-10 py-4 border border-[#C5A059]/40 flex items-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#C5A059]" />
                  WhatsApp Consultation
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Breadcrumb ─────────────────────────────── */}
        <div className="bg-white dark:bg-[#1C1917] border-b border-[#C5A059]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 font-sans text-xs text-gray-500">
              <Link to="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
              <FiChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[#1C1917] dark:text-[#FAF7F2] font-semibold uppercase tracking-wider">Rental Booking</span>
            </nav>
          </div>
        </div>

        {/* ─── Booking Form Section ────────────────────────────── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

              {!submitted ? (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center justify-center gap-0 mb-14 overflow-x-auto pb-4 no-scrollbar">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex items-center">
                        <button
                          onClick={() => i < step && setStep(i)}
                          className={`flex flex-col items-center gap-1.5 px-3 ${i < step ? "cursor-pointer" : "cursor-default"}`}
                        >
                          <div className={`w-10 h-10 rounded-none border flex items-center justify-center font-sans font-bold text-xs transition-all duration-300 ${
                            i === step
                              ? "bg-[#4A0E17] text-white border-[#C5A059] scale-105"
                              : i < step
                              ? "bg-[#C5A059] text-white border-[#C5A059]"
                              : "bg-white dark:bg-[#1C1917] text-gray-400 border-gray-200 dark:border-gray-800"
                          }`}>
                            {i < step ? <FiCheckCircle className="w-5 h-5" /> : i + 1}
                          </div>
                          <span className={`font-sans text-[10px] uppercase tracking-[0.15em] whitespace-nowrap ${i === step ? "text-[#C5A059] font-bold" : "text-gray-400"}`}>
                            {s}
                          </span>
                        </button>
                        {i < STEPS.length - 1 && (
                          <div className={`w-10 sm:w-16 h-px mx-1 transition-colors duration-300 ${i < step ? "bg-[#C5A059]" : "bg-gray-200 dark:bg-gray-800"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {/* ── STEP 0: Choose Jewellery ── */}
                    {step === 0 && (
                      <motion.div key="step0" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        <div className="text-center mb-10">
                          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-1">Step 1 of 4</p>
                          <h2 className="font-cormorant text-3xl sm:text-4xl text-[#1C1917] dark:text-[#FAF7F2]">Select Jewellery for Rental</h2>
                          <p className="font-sans text-xs text-gray-500 mt-1">Choose your preferred set. All jewellery is professionally cleaned & sanitized.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {RENTAL_PRODUCTS.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setSelected(p.id)}
                              className={`group text-left border-2 transition-all duration-300 bg-white dark:bg-[#1C1917] overflow-hidden ${
                                selected === p.id ? "border-[#C5A059] shadow-md scale-[1.02]" : "border-transparent hover:border-[#C5A059]/40"
                              }`}
                            >
                              <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                  src={p.images[0]}
                                  alt={p.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {selected === p.id && (
                                  <div className="absolute top-3 right-3 bg-[#4A0E17] text-[#C5A059] p-1.5 border border-[#C5A059]">
                                    <FiCheckCircle className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-1">
                                  {p.category.replace(/-/g, " ")}
                                </p>
                                <h3 className="font-cormorant text-lg text-[#1C1917] dark:text-[#FAF7F2] line-clamp-1 mb-2 font-medium">{p.title}</h3>
                                <div className="flex items-center justify-between pt-2 border-t border-[#C5A059]/15">
                                  <span className="font-sans text-xs font-bold text-[#4A0E17] dark:text-[#E88090]">
                                    ₹{p.rentalPrice}/day
                                  </span>
                                  <span className="font-sans text-[10px] text-gray-400">
                                    Deposit: ₹{Math.round(p.sellingPrice * 0.5)}
                                  </span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="mt-10 flex justify-end">
                          <button
                            onClick={() => selected && setStep(1)}
                            disabled={!selected}
                            className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed px-12"
                          >
                            Continue to Dates →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 1: Select Dates ── */}
                    {step === 1 && (
                      <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        <div className="text-center mb-10">
                          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-1">Step 2 of 4</p>
                          <h2 className="font-cormorant text-3xl sm:text-4xl text-[#1C1917] dark:text-[#FAF7F2]">Select Rental Duration</h2>
                          <p className="font-sans text-xs text-gray-500 mt-1">Minimum 2 days rental required.</p>
                        </div>

                        {/* Selected product summary */}
                        {product && (
                          <div className="flex items-center gap-4 bg-white dark:bg-[#1C1917] border border-[#C5A059]/30 p-4 mb-8">
                            <img src={product.images[0]} className="w-16 h-16 object-cover border border-[#C5A059]/20" alt={product.title} />
                            <div className="flex-1">
                              <p className="font-cormorant text-lg text-[#1C1917] dark:text-[#FAF7F2] font-semibold">{product.title}</p>
                              <p className="font-sans text-xs text-[#4A0E17] dark:text-[#E88090] font-bold">₹{product.rentalPrice}/day</p>
                            </div>
                            <button onClick={() => setStep(0)} className="font-sans text-xs text-[#C5A059] hover:underline uppercase tracking-wider">
                              Change Set
                            </button>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">
                              <FiCalendar className="w-3.5 h-3.5 inline mr-1 text-[#C5A059]" /> Start Date *
                            </label>
                            <input
                              type="date"
                              min={new Date().toISOString().split("T")[0]}
                              value={form.from}
                              onChange={(e) => setForm({ ...form, from: e.target.value })}
                              className="input-luxury"
                            />
                          </div>
                          <div>
                            <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">
                              <FiCalendar className="w-3.5 h-3.5 inline mr-1 text-[#C5A059]" /> Return Date *
                            </label>
                            <input
                              type="date"
                              min={form.from || new Date().toISOString().split("T")[0]}
                              value={form.to}
                              onChange={(e) => setForm({ ...form, to: e.target.value })}
                              className="input-luxury"
                            />
                          </div>
                        </div>

                        {/* Cost summary preview */}
                        {days > 0 && product && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-[#1C1917] border border-[#C5A059]/30 p-6 mb-8"
                          >
                            <h3 className="font-cormorant text-2xl text-[#1C1917] dark:text-[#FAF7F2] mb-4 font-semibold">Cost Breakdown</h3>
                            <div className="space-y-2 font-sans text-xs">
                              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>₹{product.rentalPrice} × {days} days rental</span>
                                <span className="font-semibold text-[#1C1917] dark:text-[#FAF7F2]">₹{rentalTotal.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Refundable Security Deposit</span>
                                <span className="font-semibold text-[#1C1917] dark:text-[#FAF7F2]">₹{deposit.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="h-px bg-[#C5A059]/20 my-3" />
                              <div className="flex justify-between text-sm font-bold text-[#1C1917] dark:text-[#FAF7F2]">
                                <span>Total Amount Payable</span>
                                <span className="text-[#4A0E17] dark:text-[#E88090]">₹{(rentalTotal + deposit).toLocaleString("en-IN")}</span>
                              </div>
                              <p className="text-[10px] text-gray-400 mt-2">
                                * The deposit is 100% refunded to your account within 24 hours of returning the jewellery set in original condition.
                              </p>
                            </div>
                          </motion.div>
                        )}

                        <div className="flex justify-between">
                          <button onClick={() => setStep(0)} className="btn-gold-outline px-8">← Back</button>
                          <button
                            onClick={() => form.from && form.to && setStep(2)}
                            disabled={!form.from || !form.to}
                            className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed px-12"
                          >
                            Continue to Details →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 2: Your Details ── */}
                    {step === 2 && (
                      <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        <div className="text-center mb-10">
                          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-1">Step 3 of 4</p>
                          <h2 className="font-cormorant text-3xl sm:text-4xl text-[#1C1917] dark:text-[#FAF7F2]">Customer Details</h2>
                          <p className="font-sans text-xs text-gray-500 mt-1">Provide your contact info to confirm availability.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">Full Name *</label>
                            <input
                              type="text"
                              placeholder="Your name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="input-luxury"
                              required
                            />
                          </div>
                          <div>
                            <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">Phone Number *</label>
                            <input
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className="input-luxury"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">Email Address (Optional)</label>
                            <input
                              type="email"
                              placeholder="your@email.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="input-luxury"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-2 block">Event Notes / Requests</label>
                            <textarea
                              rows={3}
                              placeholder="Wedding date, pickup area in Rahuri, special styling requests..."
                              value={form.note}
                              onChange={(e) => setForm({ ...form, note: e.target.value })}
                              className="input-luxury h-auto py-3 resize-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <button onClick={() => setStep(1)} className="btn-gold-outline px-8">← Back</button>
                          <button
                            onClick={() => form.name && form.phone && setStep(3)}
                            disabled={!form.name || !form.phone}
                            className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed px-12"
                          >
                            Review Booking →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 3: Confirm ── */}
                    {step === 3 && (
                      <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        <div className="text-center mb-10">
                          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-1">Step 4 of 4</p>
                          <h2 className="font-cormorant text-3xl sm:text-4xl text-[#1C1917] dark:text-[#FAF7F2]">Review & Confirm Booking</h2>
                          <p className="font-sans text-xs text-gray-500 mt-1">Please verify your booking details.</p>
                        </div>

                        <div className="bg-white dark:bg-[#1C1917] border border-[#C5A059]/30 overflow-hidden mb-8">
                          {product && (
                            <div className="flex items-center gap-4 p-6 border-b border-[#C5A059]/20 bg-[#FAF7F2]/50 dark:bg-black/20">
                              <img src={product.images[0]} className="w-20 h-20 object-cover border border-[#C5A059]/30" alt={product.title} />
                              <div>
                                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">{product.category.replace(/-/g, " ")}</p>
                                <p className="font-cormorant text-xl text-[#1C1917] dark:text-[#FAF7F2] font-semibold">{product.title}</p>
                                <p className="font-sans text-xs text-[#4A0E17] dark:text-[#E88090] font-bold">₹{product.rentalPrice}/day</p>
                              </div>
                            </div>
                          )}
                          <div className="p-6 space-y-3 font-sans text-xs">
                            {[
                              { label: "Dates", value: `${form.from} → ${form.to} (${days} days)` },
                              { label: "Customer Name", value: form.name },
                              { label: "Phone", value: form.phone },
                              { label: "Email", value: form.email || "Not provided" },
                              { label: "Notes", value: form.note || "None" },
                              { label: "Rental Charges", value: `₹${rentalTotal.toLocaleString("en-IN")}` },
                              { label: "Refundable Deposit", value: `₹${deposit.toLocaleString("en-IN")}` },
                            ].map(({ label, value }) => (
                              <div key={label} className="flex gap-4">
                                <span className="w-32 flex-shrink-0 text-gray-400 uppercase tracking-wider text-[10px] font-semibold">{label}</span>
                                <span className="text-[#1C1917] dark:text-[#FAF7F2] font-medium">{value}</span>
                              </div>
                            ))}
                            <div className="border-t border-[#C5A059]/20 pt-3 flex gap-4 text-sm font-bold">
                              <span className="w-32 flex-shrink-0 text-[#C5A059] uppercase tracking-wider text-[11px]">Total Amount</span>
                              <span className="text-[#4A0E17] dark:text-[#E88090]">₹{(rentalTotal + deposit).toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <button onClick={() => setStep(2)} className="btn-gold-outline px-8">← Edit Details</button>
                          <form onSubmit={handleSubmit} className="flex-1 sm:flex-none">
                            <button type="submit" className="btn-wine w-full sm:w-auto px-10 gap-2.5">
                              <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
                              Confirm Booking via WhatsApp
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                /* ── Success state ── */
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-16 flex flex-col items-center bg-white dark:bg-[#1C1917] border border-[#C5A059]/30 p-8"
                >
                  <div className="w-20 h-20 bg-[#4A0E17] border-2 border-[#C5A059] flex items-center justify-center mb-6 text-white">
                    <FiCheckCircle className="w-10 h-10 text-[#C5A059]" />
                  </div>
                  <h2 className="font-cormorant text-4xl text-[#1C1917] dark:text-[#FAF7F2] mb-3 font-semibold">Booking Inquiry Sent!</h2>
                  <p className="font-sans text-xs text-gray-600 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
                    Your rental request has been forwarded directly to Mayleki Boutique Rahuri via WhatsApp. Our team will verify dates and contact you shortly.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/" className="btn-gold px-10">Back to Home</Link>
                    <Link to="/products" className="btn-wine px-10 border border-[#C5A059]">Browse Catalogue</Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ─── Rental Policies ────────────────────────── */}
        <section className="py-16 lg:py-24 bg-white dark:bg-[#1C1917] border-t border-[#C5A059]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A059] mb-2">Transparent Guidelines</p>
              <h2 className="font-cormorant text-3xl sm:text-4xl text-[#1C1917] dark:text-[#FAF7F2]">How Jewellery Rental Works</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {POLICIES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-[#FAF7F2] dark:bg-[#141110] p-6 border border-[#C5A059]/20 hover:border-[#C5A059] transition-colors"
                >
                  <span className="text-3xl mb-3 block">{p.icon}</span>
                  <h3 className="font-cormorant text-xl text-[#1C1917] dark:text-[#FAF7F2] mb-1 font-semibold">{p.title}</h3>
                  <p className="font-sans text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact Banner ─────────────────────────── */}
        <section className="py-12 bg-[#4A0E17] text-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-cormorant text-3xl font-semibold mb-1 text-[#FAF7F2]">Need Rental Assistance?</h3>
              <p className="font-sans text-xs text-[#E5C88A]">Our Rahuri boutique team is ready to assist you Mon–Sat, 10 AM–8 PM</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+919139236500" className="flex items-center gap-2 font-sans text-xs text-[#E5C88A] hover:underline">
                <FiPhone className="w-4 h-4 text-[#C5A059]" /> +91 91392 36500
              </a>
              <a
                href="https://wa.me/919139236500"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs px-6 py-3"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
