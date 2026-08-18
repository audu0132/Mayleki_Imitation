import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const SHOWCASE_COLLECTIONS = [
  {
    number: "COLLECTION 01",
    subtitle: "Maharashtrian Bridal",
    title: "The Royal Saaj & Heritage Sets",
    description: "Hand-crafted Kolhapuri saaj, Thushi, and pearl nath sets designed to give every bride an unforgettable royal Maharashtrian presence.",
    link: "/category/maharashtrian",
    image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=900&q=85",
    alignLeft: true,
  },
  {
    number: "COLLECTION 02",
    subtitle: "Traditional Elegance",
    title: "Kundan & Meenakari Masterpieces",
    description: "Intricate Kundan work embedded with pearls and vibrant meenakari detailing, ideal for weddings, sangeet, and grand receptions.",
    link: "/category/kundan",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85",
    alignLeft: false,
  },
  {
    number: "COLLECTION 03",
    subtitle: "Modern Festive",
    title: "American Diamond & Temple Jewellery",
    description: "Versatile statement neckpieces and chokers blending traditional motifs with contemporary brilliance.",
    link: "/category/american-diamond",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&q=85",
    alignLeft: true,
  },
];

export default function EditorialShowcase() {
  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-28 lg:space-y-40">
        
        {SHOWCASE_COLLECTIONS.map((item, idx) => (
          <div
            key={item.number}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
              item.alignLeft ? "" : "lg:flex-row-reverse"
            }`}
          >
            {/* IMAGE COLUMN */}
            <div className={`lg:col-span-7 ${item.alignLeft ? "order-1" : "order-1 lg:order-2"}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden border border-[#C5A059]/30 shadow-xl group aspect-[4/5] max-w-xl mx-auto lg:max-w-none"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent" />
                <span className="absolute top-6 left-6 font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-white bg-[#1C1917]/80 backdrop-blur-sm border border-[#C5A059]/40 px-3.5 py-1.5">
                  {item.subtitle}
                </span>
              </motion.div>
            </div>

            {/* CONTENT COLUMN */}
            <div className={`lg:col-span-5 ${item.alignLeft ? "order-2" : "order-2 lg:order-1"}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C5A059] block mb-3">
                  {item.number}
                </span>

                <h3 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#1C1917] dark:text-[#FAF7F2] leading-tight mb-5">
                  {item.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8 max-w-md">
                  {item.description}
                </p>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-3 font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#C5A059] hover:text-[#E6C76A] transition-colors border-b border-[#C5A059] pb-1.5 group/btn"
                >
                  <span className="text-[#C5A059] group-hover/btn:text-[#E6C76A] transition-colors">VIEW COLLECTION</span>
                  <FiArrowRight className="w-4 h-4 text-[#C5A059] group-hover/btn:translate-x-1.5 group-hover/btn:text-[#E6C76A] transition-all duration-200" />
                </Link>
              </motion.div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}
