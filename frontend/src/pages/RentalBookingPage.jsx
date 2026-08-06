import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FiCalendar, FiChevronRight, FiClock, FiShield,
  FiCheckCircle, FiPhone, FiMail, FiMapPin,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { PRODUCTS } from "../data/mockData";

const STEPS = ["Choose Jewellery", "Select Dates", "Your Details", "Confirm"];

const RENTAL_PRODUCTS = PRODUCTS.filter((p) => p.isRentalAvailable).slice(0, 6);

const POLICIES = [
  { icon: "🛡️", title: "Security Deposit", desc: "50% of product value, fully refundable on return." },
  { icon: "📅", title: "Minimum Rental", desc: "2 days minimum. Additional days charged pro-rata." },
  { icon: "🚚", title: "Free Pickup", desc: "Free pickup available in Rahuri & nearby areas." },
  { icon: "✨", title: "Cleaned & Sanitised", desc: "Every item is professionally cleaned before delivery." },
  { icon: "📦", title: "Damage Policy", desc: "Minor damage waived. Major damage charged at cost." },
  { icon: "🔁", title: "Easy Returns", desc: "Drop off at store or schedule free pickup on return date." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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
    const msg = `Hi! I want to book rental jewellery.
Product: ${product?.title}
Dates: ${form.from} to ${form.to} (${days} days)
Name: ${form.name} | Phone: ${form.phone}
Note: ${form.note || "None"}
Rental Total: ₹${rentalTotal} + Deposit ₹${deposit}`;
    window.open(`https://wa.me/919139236500?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Book Rental Jewellery | Mayleki</title>
        <meta name="description" content="Rent premium bridal and traditional jewellery from Mayleki for your special occasion. Easy booking, free pickup, fully refundable deposit." />
      </Helmet>

      <div className="page-wrapper">
        {/* ─── Hero ──────────────────────────────────── */}
        <div className="relative min-h-[50vh] flex items-center overflow-hidden bg-dark-brown">
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80"
            alt="Rental Jewellery"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-brown/60 to-dark-brown/90" />
          <div className="relative container-luxury py-20 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="section-subtitle">Premium Jewellery Rental</p>
              <h1 className="font-playfair text-5xl md:text-6xl font-normal text-cream leading-tight mb-6 text-shadow-luxury">
                Wear Luxury,<br />
                <span className="italic text-gold">Without the Price Tag</span>
              </h1>
              <p className="font-poppins text-sm text-cream/70 max-w-xl mx-auto mb-8 leading-relaxed">
                Rent our exclusive bridal and traditional jewellery sets for your wedding, reception, engagement or any special occasion. Starting at just ₹299/day.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => setStep(0)}
                  className="btn-gold text-base px-10"
                >
                  Book Now
                </button>
                <a
                  href="https://wa.me/919139236500?text=Hi! I want to know about jewellery rental at Mayleki."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-outline !text-cream !border-cream hover:!bg-cream hover:!text-dark-brown px-10"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Ask on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Breadcrumb ─────────────────────────────── */}
        <div className="bg-white border-b border-gold/10">
          <div className="container-luxury py-3">
            <nav className="flex items-center gap-1 font-poppins text-sm text-gray-400">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <FiChevronRight className="w-3.5 h-3.5" />
              <span className="text-dark-brown font-medium">Rental Booking</span>
            </nav>
          </div>
        </div>

        {/* ─── Booking Form ────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container-luxury">
            <div className="max-w-4xl mx-auto">

              {!submitted ? (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center justify-center gap-0 mb-16">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex items-center">
                        <button
                          onClick={() => i < step && setStep(i)}
                          className={`flex flex-col items-center gap-1 px-3 ${i < step ? "cursor-pointer" : "cursor-default"}`}
                        >
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-poppins font-bold text-sm transition-all duration-300 ${
                            i === step
                              ? "bg-gold text-dark-brown shadow-gold scale-110"
                              : i < step
                              ? "bg-dark-brown text-gold"
                              : "bg-gray-100 text-gray-400"
                          }`}>
                            {i < step ? <FiCheckCircle className="w-5 h-5" /> : i + 1}
                          </div>
                          <span className={`font-poppins text-[10px] uppercase tracking-wider whitespace-nowrap ${i === step ? "text-dark-brown font-semibold" : "text-gray-400"}`}>
                            {s}
                          </span>
                        </button>
                        {i < STEPS.length - 1 && (
                          <div className={`w-12 sm:w-20 h-px mx-1 transition-colors duration-300 ${i < step ? "bg-gold" : "bg-gray-200"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {/* ── STEP 0: Choose Jewellery ── */}
                    {step === 0 && (
                      <motion.div key="step0" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        <h2 className="font-playfair text-3xl text-dark-brown mb-2 text-center">Choose Your Jewellery</h2>
                        <p className="font-poppins text-sm text-gray-500 text-center mb-10">
                          Select the piece you'd like to rent. All items include free cleaning.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {RENTAL_PRODUCTS.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setSelected(p.id)}
                              className={`group text-left border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                                selected === p.id ? "border-gold shadow-gold scale-[1.02]" : "border-transparent hover:border-gold/40"
                              } bg-white`}
                            >
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={p.images[0]}
                                  alt={p.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                              </div>
                              <div className="p-4">
                                <p className="font-poppins text-[10px] uppercase tracking-widest text-gold mb-1">
                                  {p.category.replace(/-/g, " ")}
                                </p>
                                <h3 className="font-playfair text-base text-dark-brown line-clamp-1 mb-2">{p.title}</h3>
                                <div className="flex items-center justify-between">
                                  <p className="font-poppins text-sm font-semibold text-gold">
                                    ₹{p.rentalPrice}/day
                                  </p>
                                  {selected === p.id && (
                                    <FiCheckCircle className="w-5 h-5 text-gold fill-gold" />
                                  )}
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
                            Continue →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 1: Select Dates ── */}
                    {step === 1 && (
                      <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        <h2 className="font-playfair text-3xl text-dark-brown mb-2 text-center">Select Your Dates</h2>
                        <p className="font-poppins text-sm text-gray-500 text-center mb-10">Minimum 2 days rental required.</p>

                        {/* Selected product summary */}
                        {product && (
                          <div className="flex items-center gap-4 bg-white border border-gold/20 rounded-2xl p-4 mb-8">
                            <img src={product.images[0]} className="w-16 h-16 rounded-xl object-cover" alt={product.title} />
                            <div className="flex-1">
                              <p className="font-playfair text-lg text-dark-brown">{product.title}</p>
                              <p className="font-poppins text-sm text-gold">₹{product.rentalPrice}/day</p>
                            </div>
                            <button onClick={() => setStep(0)} className="font-poppins text-xs text-gray-400 hover:text-gold transition-colors underline">
                              Change
                            </button>
                          </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="font-poppins text-xs font-semibold uppercase tracking-widest text-dark-brown mb-2 block">
                              <FiCalendar className="w-3.5 h-3.5 inline mr-1" /> From Date
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
                            <label className="font-poppins text-xs font-semibold uppercase tracking-widest text-dark-brown mb-2 block">
                              <FiCalendar className="w-3.5 h-3.5 inline mr-1" /> To Date
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

                        {/* Cost summary */}
                        {days > 0 && product && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gold/20 rounded-2xl p-6 mb-8"
                          >
                            <h3 className="font-playfair text-xl text-dark-brown mb-4">Cost Summary</h3>
                            <div className="space-y-2 font-poppins text-sm">
                              <div className="flex justify-between text-gray-600">
                                <span>₹{product.rentalPrice} × {days} days</span>
                                <span>₹{rentalTotal.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex justify-between text-gray-600">
                                <span>Security Deposit (refundable)</span>
                                <span>₹{deposit.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="h-px bg-gold/20 my-2" />
                              <div className="flex justify-between font-bold text-dark-brown text-base">
                                <span>Total Payable Now</span>
                                <span className="text-gold">₹{(rentalTotal + deposit).toLocaleString("en-IN")}</span>
                              </div>
                              <p className="text-[11px] text-gray-400 mt-1">*Deposit refunded within 24hrs of return</p>
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
                            Continue →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 2: Your Details ── */}
                    {step === 2 && (
                      <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit={{ opacity: 0 }}>
                        <h2 className="font-playfair text-3xl text-dark-brown mb-2 text-center">Your Details</h2>
                        <p className="font-poppins text-sm text-gray-500 text-center mb-10">We'll contact you to confirm your booking.</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="font-poppins text-xs font-semibold uppercase tracking-widest text-dark-brown mb-2 block">Full Name *</label>
                            <input
                              type="text"
                              placeholder="Your full name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="input-luxury"
                              required
                            />
                          </div>
                          <div>
                            <label className="font-poppins text-xs font-semibold uppercase tracking-widest text-dark-brown mb-2 block">Phone *</label>
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
                            <label className="font-poppins text-xs font-semibold uppercase tracking-widest text-dark-brown mb-2 block">Email (optional)</label>
                            <input
                              type="email"
                              placeholder="your@email.com"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="input-luxury"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="font-poppins text-xs font-semibold uppercase tracking-widest text-dark-brown mb-2 block">Special Requests</label>
                            <textarea
                              rows={3}
                              placeholder="Occasion, delivery address, special requirements..."
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
                        <h2 className="font-playfair text-3xl text-dark-brown mb-2 text-center">Review & Confirm</h2>
                        <p className="font-poppins text-sm text-gray-500 text-center mb-10">Check your booking details before sending.</p>

                        <div className="bg-white border border-gold/20 rounded-2xl overflow-hidden mb-8">
                          {product && (
                            <div className="flex items-center gap-4 p-6 border-b border-gold/10">
                              <img src={product.images[0]} className="w-20 h-20 rounded-xl object-cover" alt={product.title} />
                              <div>
                                <p className="font-poppins text-[10px] uppercase tracking-widest text-gold">{product.category.replace(/-/g, " ")}</p>
                                <p className="font-playfair text-xl text-dark-brown">{product.title}</p>
                                <p className="font-poppins text-sm text-gray-500">₹{product.rentalPrice}/day</p>
                              </div>
                            </div>
                          )}
                          <div className="p-6 space-y-3 font-poppins text-sm">
                            {[
                              { label: "Dates", value: `${form.from} → ${form.to} (${days} days)` },
                              { label: "Name", value: form.name },
                              { label: "Phone", value: form.phone },
                              { label: "Email", value: form.email || "—" },
                              { label: "Note", value: form.note || "—" },
                              { label: "Rental Cost", value: `₹${rentalTotal.toLocaleString("en-IN")}` },
                              { label: "Deposit", value: `₹${deposit.toLocaleString("en-IN")} (refundable)` },
                            ].map(({ label, value }) => (
                              <div key={label} className="flex gap-4">
                                <span className="w-28 flex-shrink-0 text-gray-400 uppercase tracking-wide text-[11px] pt-0.5">{label}</span>
                                <span className="text-dark-brown font-medium">{value}</span>
                              </div>
                            ))}
                            <div className="border-t border-gold/10 pt-3 flex gap-4">
                              <span className="w-28 flex-shrink-0 text-gray-400 uppercase tracking-wide text-[11px] pt-0.5">Total</span>
                              <span className="text-gold font-bold text-base">₹{(rentalTotal + deposit).toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <button onClick={() => setStep(2)} className="btn-gold-outline px-8">← Edit</button>
                          <form onSubmit={handleSubmit} className="flex-1 sm:flex-none">
                            <button type="submit" className="btn-gold w-full sm:w-auto px-10 gap-2">
                              <FaWhatsapp className="w-5 h-5" />
                              Confirm via WhatsApp
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
                  className="text-center py-20 flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mb-6">
                    <FiCheckCircle className="w-10 h-10 text-gold" />
                  </div>
                  <h2 className="font-playfair text-4xl text-dark-brown mb-4">Booking Sent!</h2>
                  <p className="font-poppins text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
                    Your rental inquiry has been sent via WhatsApp. Our team will confirm availability within 2 hours.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Link to="/" className="btn-gold px-10">Back to Home</Link>
                    <Link to="/products" className="btn-gold-outline px-10">Browse More</Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ─── Rental Policies ────────────────────────── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <p className="section-subtitle">Transparent Policies</p>
              <h2 className="font-playfair text-4xl text-dark-brown mb-4">How Our Rental Works</h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {POLICIES.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-cream rounded-2xl p-6 border border-gold/10 hover:border-gold/30 transition-colors"
                >
                  <span className="text-3xl mb-3 block">{p.icon}</span>
                  <h3 className="font-playfair text-lg text-dark-brown mb-2">{p.title}</h3>
                  <p className="font-poppins text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact strip ─────────────────────────── */}
        <section className="py-12 bg-dark-brown">
          <div className="container-luxury flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-playfair text-2xl text-cream mb-1">Need Help?</h3>
              <p className="font-poppins text-sm text-gray-400">Our rental team is available Mon–Sat, 10AM–8PM</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+919139236500" className="flex items-center gap-2 font-poppins text-sm text-gold hover:text-gold-light transition-colors">
                <FiPhone className="w-4 h-4" /> +91 91392 36500
              </a>
              <a href="mailto:hello@mayleki.com" className="flex items-center gap-2 font-poppins text-sm text-gold hover:text-gold-light transition-colors">
                <FiMail className="w-4 h-4" /> hello@mayleki.com
              </a>
              <a
                href="https://wa.me/919139236500"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
