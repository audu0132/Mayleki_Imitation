import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiGrid,
  FiCalendar,
  FiShield,
  FiRefreshCw,
  FiShoppingBag,
  FiTruck,
  FiPhone,
  FiHeadphones,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiHeart
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FAQS } from "../../data/mockData";

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

  const filtered = FAQS.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case "All":
        return <FiGrid className="w-4 h-4" />;
      case "Rental":
        return <FiCalendar className="w-4 h-4" />;
      case "Damage Policy":
        return <FiShield className="w-4 h-4" />;
      case "Returns":
        return <FiRefreshCw className="w-4 h-4" />;
      case "Buying":
        return <FiShoppingBag className="w-4 h-4" />;
      case "Shipping":
        return <FiTruck className="w-4 h-4" />;
      default:
        return <FiGrid className="w-4 h-4" />;
    }
  };

  const footerBenefits = [
    {
      icon: <FiAward className="w-5 h-5 text-gold" />,
      title: "Premium Quality",
      desc: "Finest imitation jewellery",
    },
    {
      icon: <FiCheckCircle className="w-5 h-5 text-gold" />,
      title: "Hygienic & Clean",
      desc: "Sanitized before & after use",
    },
    {
      icon: <FiTruck className="w-5 h-5 text-gold" />,
      title: "On-time Delivery",
      desc: "Safe & timely delivery",
    },
    {
      icon: <FiHeadphones className="w-5 h-5 text-gold" />,
      title: "Customer Support",
      desc: "We're here to help",
    },
  ];

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-24 bg-cream dark:bg-dark-brown overflow-hidden">
      {/* Decorative Top-Right Jewellery Background Image with Gradient Fade */}
      <div 
        className="absolute right-0 top-0 w-full sm:w-[50%] h-[350px] sm:h-[600px] bg-no-repeat bg-cover sm:bg-contain bg-right pointer-events-none opacity-20 sm:opacity-90 transition-opacity duration-500" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000')", 
          maskImage: "linear-gradient(to left, black 20%, transparent 85%), linear-gradient(to bottom, black 50%, transparent 100%)", 
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 85%), linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)" 
        }} 
      />

      {/* Geometric Mandala/Flower line drawing decor - Left */}
      <svg className="absolute -left-20 top-[15%] w-72 h-72 opacity-[0.08] text-gold dark:opacity-[0.15] pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        {[...Array(12)].map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx="38"
            ry="14"
            transform={`rotate(${i * 15} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="8" strokeDasharray="1 1" />
      </svg>

      {/* Geometric Mandala/Flower line drawing decor - Right Bottom */}
      <svg className="absolute -right-20 bottom-[10%] w-72 h-72 opacity-[0.08] text-gold dark:opacity-[0.15] pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        {[...Array(12)].map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx="38"
            ry="14"
            transform={`rotate(${i * 15 + 7.5} 50 50)`}
          />
        ))}
      </svg>

      <div className="container-luxury relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl md:text-6.5xl font-semibold text-dark-brown dark:text-cream leading-tight">
              Frequently Asked <br />
              <span className="text-[#C9A227] dark:text-gold-light mt-1 block">Questions</span>
            </h2>

            {/* Custom Luxury Divider with Diamond */}
            <div className="flex items-center justify-center gap-3 my-5">
              <div className="w-8 h-px bg-[#C9A227]/40" />
              <div className="w-2.5 h-2.5 rotate-45 border border-[#C9A227] bg-transparent flex items-center justify-center">
                <div className="w-1 h-1 bg-[#C9A227] rounded-full" />
              </div>
              <div className="w-8 h-px bg-[#C9A227]/40" />
            </div>

            <p className="font-poppins text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Everything you need to know about our jewellery, rental process, and services.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-poppins text-sm font-medium flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#C9A227] to-[#A8891A] text-white shadow-[0_4px_15px_rgba(201,162,39,0.3)] font-semibold"
                      : "bg-white dark:bg-white/10 text-gray-500 dark:text-gray-300 border border-[#C9A227]/20 dark:border-white/10 hover:border-[#C9A227]/60 hover:text-[#C9A227]"
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ Items Accordion */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.map((faq, i) => {
              const isOpen = activeId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`bg-white dark:bg-dark-brown-light/30 rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#C9A227]/50 shadow-[0_4px_20px_rgba(201,162,39,0.08)]"
                      : "border-[#C9A227]/10 hover:border-[#C9A227]/30"
                  }`}
                >
                  <button
                    onClick={() => setActiveId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold font-poppins transition-colors duration-300 border ${
                        isOpen 
                          ? "bg-[#C9A227] text-white border-[#C9A227]" 
                          : "bg-[#FFF8ED] dark:bg-gold/10 text-[#C9A227] border-[#C9A227]/20"
                      }`}>
                        {i + 1}
                      </span>
                      <span className="font-playfair font-medium text-dark-brown dark:text-cream text-base sm:text-lg pr-2 leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {isOpen ? (
                        <FiMinus className="w-5 h-5 text-[#C9A227]" />
                      ) : (
                        <FiPlus className="w-5 h-5 text-[#C9A227]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-0">
                          <div className="h-px bg-gradient-to-r from-[#C9A227]/20 via-[#C9A227]/5 to-transparent mb-4" />
                          <p className="font-poppins text-sm text-gray-500 dark:text-gray-400 leading-relaxed pl-12">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Still Have Questions CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-3xl bg-[#FFFBF5] dark:bg-dark-brown-light/20 border border-[#C9A227]/25 shadow-[0_4px_25px_rgba(0,0,0,0.02)] max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-[#FFF8ED] dark:bg-gold/10 flex items-center justify-center text-[#C9A227] border border-[#C9A227]/10 flex-shrink-0">
                <FiHeadphones className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-dark-brown dark:text-cream mb-1">
                  Still have questions?
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                  Our team is always ready to help you with any queries about jewellery, rental process, or services.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="https://wa.me/919139236500?text=Hi! I have a question about Mayleki jewellery."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#C9A227] hover:bg-[#A8891A] text-white rounded-xl px-6 py-3 flex items-center justify-center gap-2 font-poppins text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(201,162,39,0.25)] cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a 
                href="tel:+919139236500" 
                className="w-full sm:w-auto border border-[#C9A227]/30 hover:border-[#C9A227] bg-white dark:bg-dark-brown text-[#C9A227] rounded-xl px-6 py-3 flex items-center justify-center gap-2 font-poppins text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer"
              >
                <FiPhone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </motion.div>

          {/* Footer Features/Benefits row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16 pt-12 border-t border-[#C9A227]/10">
            {footerBenefits.map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-xl bg-[#FFF8ED] dark:bg-gold/5 flex items-center justify-center text-[#C9A227] border border-[#C9A227]/10 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-poppins text-xs font-semibold text-dark-brown dark:text-cream">
                    {item.title}
                  </h4>
                  <p className="font-poppins text-[10px] text-gray-400 dark:text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

