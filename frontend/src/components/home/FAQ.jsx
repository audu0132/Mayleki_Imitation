import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FAQS } from "../../data/mockData";

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(FAQS.map((f) => f.category))];

  const filtered = FAQS.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  return (
    <section className="py-20 bg-cream dark:bg-dark-brown">
      <div className="container-luxury max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-subtitle mb-3">Got Questions?</p>
          <h2 className="section-title mb-4">
            Frequently Asked <span className="text-gold-gradient">Questions</span>
          </h2>
          <div className="gold-divider mb-4" />
          <p className="section-description mx-auto">
            Everything you need to know about our jewellery, rental process, and services.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-poppins text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gold text-dark-brown shadow-gold"
                  : "bg-white dark:bg-white/10 text-gray-500 border border-gray-200 dark:border-white/10 hover:border-gold/40 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filtered.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`bg-white dark:bg-dark-brown-light rounded-2xl border transition-all duration-300 overflow-hidden ${
                activeId === faq.id
                  ? "border-gold/50 shadow-gold"
                  : "border-gray-100 dark:border-white/10 hover:border-gold/30"
              }`}
            >
              <button
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold font-poppins transition-colors duration-300 ${
                    activeId === faq.id ? "bg-gold text-dark-brown" : "bg-gold/10 text-gold"
                  }`}>
                    {i + 1}
                  </span>
                  <span className="font-poppins font-semibold text-dark-brown dark:text-cream text-base pr-4">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    activeId === faq.id ? "bg-gold text-dark-brown" : "bg-gray-100 dark:bg-white/10 text-gray-500"
                  }`}
                >
                  {activeId === faq.id ? (
                    <FiMinus className="w-4 h-4" />
                  ) : (
                    <FiPlus className="w-4 h-4" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0 pl-18 ml-12">
                      <div className="h-px bg-gold/20 mb-4" />
                      <p className="font-poppins text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 rounded-3xl bg-gold/5 border border-gold/20"
        >
          <p className="font-playfair text-xl font-bold text-dark-brown dark:text-cream mb-2">
            Still have questions?
          </p>
          <p className="font-poppins text-sm text-gray-500 mb-6">
            Our team is always ready to help you with any queries.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/919876543210?text=Hi! I have a question about Mayleki jewellery."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-6 py-3"
            >
              WhatsApp Us
            </a>
            <a href="/contact" className="btn-gold-outline px-6 py-3">
              Contact Page
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
