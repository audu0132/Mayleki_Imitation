import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiShare2, FiCheck, FiCalendar } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import toast from "react-hot-toast";

const PHILOSOPHIES = [
  {
    day: "Sunday",
    pillar: "Royal Heritage",
    quote: "Jewellery isn't only worn.",
    highlight: "It becomes part of your story & legacy.",
    desc: "Each Mayleki creation celebrates the timeless artistry of Maharashtrian royalty — from the regal Kolhapuri saaj to handcrafted Kundan sets. Designed to capture memories that endure across generations.",
    icon: "👑",
  },
  {
    day: "Monday",
    pillar: "Everyday Splendor",
    quote: "Every new day brings a fresh canvas",
    highlight: "To adorn your inner grace.",
    desc: "Beauty is not reserved only for grand celebrations. True luxury is choosing to shine with quiet poise, confidence, and regal elegance every single morning.",
    icon: "✨",
  },
  {
    day: "Tuesday",
    pillar: "Artisanal Precision",
    quote: "True luxury lies in the hands",
    highlight: "Of the master artisan.",
    desc: "Behind every intricate motif, curve, and gemstone is hours of dedicated craftsmanship. We honor centuries-old Maharashtrian techniques passed down through generations.",
    icon: "💎",
  },
  {
    day: "Wednesday",
    pillar: "Sustainable Luxury",
    quote: "Elegance shouldn't stay in a vault;",
    highlight: "It belongs to the moment.",
    desc: "Through our luxury rental appointments in Rahuri, every woman can experience heirloom bridal glory for her special days — bringing sustainable luxury to modern queens.",
    icon: "🌿",
  },
  {
    day: "Thursday",
    pillar: "Regal Poise",
    quote: "Adornment is the armor",
    highlight: "Of sovereign confidence.",
    desc: "When a woman wears Mayleki, she carries herself with royal dignity. Royalty is not merely a crown upon your head — it is the poise and grace in your heart.",
    icon: "⚜️",
  },
  {
    day: "Friday",
    pillar: "Bridal Devotion",
    quote: "A bride's adornments carry",
    highlight: "The heartbeat of new beginnings.",
    desc: "From the sacred Maharashtrian Nath to statement bridal chokers, our bridal collections weave timeless romance and family blessings into every shimmering layer.",
    icon: "💍",
  },
  {
    day: "Saturday",
    pillar: "Modern Royalty",
    quote: "Classics never age;",
    highlight: "They evolve with timeless grace.",
    desc: "By blending centuries-old Maharashtrian heritage motifs with contemporary high-fashion silhouettes, Mayleki bridges our glorious past with your modern future.",
    icon: "𑁍",
  },
];

export default function EditorialStatement() {
  const todayIndex = new Date().getDay();
  const [currentIndex, setCurrentIndex] = useState(todayIndex);
  const [copied, setCopied] = useState(false);

  const active = PHILOSOPHIES[currentIndex];
  const isToday = currentIndex === todayIndex;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PHILOSOPHIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PHILOSOPHIES.length) % PHILOSOPHIES.length);
  };

  const handleShare = () => {
    const textToCopy = `"${active.quote} ${active.highlight}" — The Mayleki Philosophy (${active.pillar})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Philosophy copied to clipboard!", {
      icon: "✨",
      style: { background: "#1C1917", color: "#FAF7F2", border: "1px solid #C5A059" },
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="statement" className="py-20 lg:py-32 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15 relative overflow-hidden select-none">
      {/* Decorative Subtle Background Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#D4AF37]/10 via-[#C5A059]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917]/5 dark:bg-[#FAF7F2]/5 border border-[#C5A059]/30 mb-8 backdrop-blur-sm">
          <HiSparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A059]">
            THE MAYLEKI PHILOSOPHY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          <span className="font-sans text-[10px] tracking-wider uppercase text-stone-500 dark:text-stone-400 font-medium">
            New Day, New Philosophy
          </span>
        </div>

        {/* Day Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PHILOSOPHIES.map((item, idx) => {
            const isSelected = idx === currentIndex;
            const isTodayItem = idx === todayIndex;
            return (
              <button
                key={item.day}
                onClick={() => setCurrentIndex(idx)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-sans transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? "bg-[#1C1917] text-[#FAF7F2] dark:bg-[#C5A059] dark:text-[#141110] font-semibold shadow-md border border-[#C5A059]"
                    : "bg-[#F7F4EE]/90 dark:bg-[#1C1917]/60 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#C5A059]/50"
                }`}
              >
                <span>{item.day.slice(0, 3)}</span>
                {isTodayItem && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" title="Today's Active Philosophy" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Philosophy Card */}
        <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-3xl bg-[#FDFBF7]/95 dark:bg-[#1C1917]/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#C5A059]/25 shadow-xl relative"
            >
              {/* Corner Floral Motifs */}
              <div className="absolute top-4 left-4 text-[#C5A059]/40 text-sm font-serif">𑁍</div>
              <div className="absolute top-4 right-4 text-[#C5A059]/40 text-sm font-serif">𑁍</div>
              <div className="absolute bottom-4 left-4 text-[#C5A059]/40 text-sm font-serif">𑁍</div>
              <div className="absolute bottom-4 right-4 text-[#C5A059]/40 text-sm font-serif">𑁍</div>

              {/* Today Badge & Pillar Indicator */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-xl">{active.icon}</span>
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                  {active.pillar}
                </span>
                {isToday && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                    <FiCalendar className="w-3 h-3" /> Today's Reflection
                  </span>
                )}
              </div>

              {/* Main Quote Title */}
              <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1C1917] dark:text-[#FAF7F2] leading-[1.12] tracking-tight mb-6">
                {active.quote}<br />
                <span className="italic font-serif text-[#4A0E17] dark:text-[#E5C88A] font-medium">
                  {active.highlight}
                </span>
              </h2>

              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-6" />

              {/* Description Paragraph */}
              <p className="font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-light max-w-xl mx-auto tracking-wide mb-8">
                {active.desc}
              </p>

              {/* Card Bottom Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#C5A059]/15">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-[#F5F2EC] dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#C5A059] hover:text-white transition-colors duration-200 cursor-pointer"
                  title="Previous Philosophy"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium bg-[#1C1917] text-[#FAF7F2] dark:bg-[#C5A059] dark:text-[#141110] hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-400" /> : <FiShare2 className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Share Reflection"}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-[#F5F2EC] dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#C5A059] hover:text-white transition-colors duration-200 cursor-pointer"
                  title="Next Philosophy"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
