import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";

const MOSAIC_IMAGES = [
  { url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80", colSpan: "md:col-span-6 md:row-span-2", height: "h-[360px] md:h-[480px]" },
  { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80", colSpan: "md:col-span-3 md:row-span-1", height: "h-[225px]" },
  { url: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=600&q=80", colSpan: "md:col-span-3 md:row-span-1", height: "h-[225px]" },
  { url: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80", colSpan: "md:col-span-3 md:row-span-1", height: "h-[225px]" },
  { url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80", colSpan: "md:col-span-3 md:row-span-1", height: "h-[225px]" },
];

export default function InstagramGallery() {
  return (
    <section className="py-24 lg:py-36 bg-[#FAF7F2] dark:bg-[#141110] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-[#C5A059] block mb-2">
            𑁍 SOCIAL LOOKBOOK
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#1C1917] dark:text-[#FAF7F2] tracking-tight">
            @mayleki_imitation
          </h2>
        </div>

        {/* Asymmetric Image Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {MOSAIC_IMAGES.map((img, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/mayleki_imitation/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative overflow-hidden group border border-[#C5A059]/20 block ${img.colSpan}`}
            >
              <div className={`w-full ${img.height}`}>
                <img
                  src={img.url}
                  alt="Mayleki Jewellery Instagram"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#1C1917]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-[#C5A059] bg-[#1C1917]/80 text-[#C5A059] flex items-center justify-center">
                    <FiInstagram className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
