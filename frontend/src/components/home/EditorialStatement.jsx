import { motion } from "framer-motion";

export default function EditorialStatement() {
  return (
    <section id="statement" className="py-24 lg:py-36 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C5A059] block mb-6">
            𑁍 THE MAYLEKI PHILOSOPHY
          </span>

          <h2 className="font-cormorant text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1C1917] dark:text-[#FAF7F2] leading-[1.08] tracking-tight mb-8">
            Jewellery isn't only worn.<br />
            <span className="italic font-serif text-[#4A0E17] dark:text-[#E88090]">It becomes part of your story.</span>
          </h2>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-8" />

          <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-2xl mx-auto tracking-wide">
            Each Mayleki creation celebrates the rich heritage of Maharashtrian artistry — from the regal Kolhapuri saaj to intricate Kundan bridal sets. Designed to evoke timeless elegance, available for both permanent purchase and temporary rental appointments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
