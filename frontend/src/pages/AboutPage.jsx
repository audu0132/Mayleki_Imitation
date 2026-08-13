import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiStar, FiAward, FiUsers } from "react-icons/fi";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Our Heritage | Mayleki Imitation Jewellery Rahuri</title>
        <meta name="description" content="Learn about Mayleki Imitation Jewellery — our story, Maharashtrian heritage, craftsmanship, and affordable bridal jewellery rental in Rahuri." />
      </Helmet>

      <div className="bg-[#FAF7F2] dark:bg-[#141110] min-h-screen">
        {/* Hero */}
        <div className="relative overflow-hidden min-h-[55vh] flex items-center bg-[#1C1917] border-b border-[#C5A059]/30">
          <img src="https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=1920" alt="About Mayleki Jewellery" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1917] via-[#4A0E17]/60 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-3">
                𑁍 The Mayleki Story
              </p>
              <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F2] leading-tight mb-5">
                Crafting Royal Maharashtrian <span className="italic text-[#E5C88A]">Elegance</span>
              </h1>
              <p className="font-sans text-sm text-[#FAF7F2]/80 leading-relaxed mb-8 max-w-xl font-light">
                Established in Rahuri, Maharashtra, Mayleki Jewellery was founded on a commitment to deliver royal bridal aesthetics, authentic Kolhapuri saaj polish, and budget-friendly rental options without compromising on luxury.
              </p>
              <Link to="/products" className="btn-gold text-xs px-8 py-4 inline-flex items-center gap-2">
                Explore Our Catalogue <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Values */}
        <section className="py-20 lg:py-28 border-b border-[#C5A059]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-2">Pillars of Excellence</p>
              <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] dark:text-[#FAF7F2]">Our Mission & Craftsmanship</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "👑", title: "Royal Polish & Finish", desc: "Every set features authentic 1GM gold polish and detailed Meenakari/Kundan handwork that mirrors genuine heirloom jewellery." },
                { icon: "💎", title: "Affordable Luxury", desc: "We believe every bride deserves to shine like royalty. Our purchase and rental prices offer luxury accessible to all." },
                { icon: "🤝", title: "Boutique Experience", desc: "From personalized styling consultations in Rahuri to door-step delivery across Maharashtra, customer joy is our priority." },
              ].map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-[#1C1917] p-8 border border-[#C5A059]/20 hover:border-[#C5A059] transition-all duration-300 text-center">
                  <span className="text-4xl mb-4 block">{v.icon}</span>
                  <h3 className="font-cormorant text-2xl font-semibold text-[#1C1917] dark:text-[#FAF7F2] mb-3">{v.title}</h3>
                  <p className="font-sans text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-20 bg-[#4A0E17] text-[#FAF7F2] border-y border-[#C5A059]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "2018", label: "Year Established", icon: FiAward },
                { value: "5,000+", label: "Happy Brides", icon: FiUsers },
                { value: "1,000+", label: "Curated Designs", icon: FiHeart },
                { value: "4.9 ★", label: "Average Rating", icon: FiStar },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center p-6 bg-white/5 border border-[#C5A059]/30">
                  <Icon className="w-6 h-6 text-[#C5A059] mx-auto mb-3" />
                  <p className="font-cormorant text-3xl sm:text-4xl font-bold text-[#E5C88A]">{value}</p>
                  <p className="font-sans text-xs text-gray-300 uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showroom CTA */}
        <section className="py-20 lg:py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-[#1C1917] dark:text-[#FAF7F2] mb-4">
              Visit Our Boutique Showroom in <span className="text-[#C5A059]">Rahuri</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Experience the craftsmanship in person at our Rahuri boutique. Try on bridal sets, match your saree colors, and select rental jewellery with expert assistance.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn-gold text-xs px-8 py-4">Get Directions to Store</Link>
              <a href="https://wa.me/919139236500" target="_blank" rel="noopener noreferrer" className="btn-wine text-xs px-8 py-4 border border-[#C5A059]">WhatsApp Consultation</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
