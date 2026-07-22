import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiStar, FiAward, FiUsers } from "react-icons/fi";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Mayleki Imitation Jewellery</title>
        <meta name="description" content="Learn about Mayleki Imitation Jewellery — our story, mission, and commitment to beautiful, affordable bridal jewellery in Rahuri, Maharashtra." />
      </Helmet>
      <div className="page-wrapper">
        {/* Hero */}
        <div className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
          <img src="https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=1920" alt="About" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/95 via-dark-brown/70 to-dark-brown/30" />
          <div className="relative container-luxury flex items-center" style={{ minHeight: "60vh" }}>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
              <p className="section-subtitle mb-4">Our Story</p>
              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-cream leading-tight mb-6">
                Making Every Woman Feel Like <span className="text-gold-gradient">Royalty</span>
              </h1>
              <p className="font-poppins text-base text-cream/80 leading-relaxed mb-8 max-w-xl">
                Founded in Rahuri, Maharashtra, Mayleki was born from a simple belief — every bride deserves to feel exquisite
                on her special day, regardless of budget. We bring you the finest imitation jewellery that captures the essence
                of real gold craftsmanship.
              </p>
              <Link to="/products" className="btn-gold text-base px-8 py-4 inline-flex items-center gap-2">
                Explore Collection <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Values */}
        <section className="py-20 bg-cream dark:bg-dark-brown">
          <div className="container-luxury">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <p className="section-subtitle mb-3">What Drives Us</p>
              <h2 className="section-title mb-4">Our <span className="text-gold-gradient">Mission & Values</span></h2>
              <div className="gold-divider" />
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: "👑", title: "Premium Quality", desc: "Every piece is crafted with meticulous attention to detail, using the finest materials to ensure long-lasting beauty." },
                { icon: "💰", title: "Affordable Luxury", desc: "We believe luxury jewellery should be accessible to every bride. Our prices make premium jewellery available to all." },
                { icon: "🤝", title: "Customer First", desc: "Your satisfaction is our priority. From browsing to wearing your jewellery, we ensure a seamless, joyful experience." },
              ].map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="card-luxury p-8 text-center">
                  <span className="text-5xl mb-4 block">{v.icon}</span>
                  <h3 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream mb-3">{v.title}</h3>
                  <p className="font-poppins text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-dark-brown">
          <div className="container-luxury">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "2018", label: "Founded", icon: FiAward },
                { value: "5000+", label: "Happy Customers", icon: FiUsers },
                { value: "1000+", label: "Designs", icon: FiHeart },
                { value: "4.9★", label: "Avg Rating", icon: FiStar },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center p-6 rounded-2xl border border-gold/20 hover:border-gold/40 hover:bg-gold/5 transition-all">
                  <Icon className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="font-playfair text-3xl font-bold text-gold">{value}</p>
                  <p className="font-poppins text-sm text-gray-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-cream dark:bg-dark-brown text-center">
          <div className="container-luxury">
            <h2 className="font-playfair text-4xl font-bold text-dark-brown dark:text-cream mb-4">
              Visit Us in <span className="text-gold-gradient">Rahuri</span>
            </h2>
            <p className="font-poppins text-gray-500 mb-8 max-w-xl mx-auto">
              Come explore our full collection at our showroom in Rahuri, Maharashtra.
              Our team is always ready to help you find the perfect jewellery.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn-gold px-8 py-4 text-base">Get Directions</Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-gold-outline px-8 py-4 text-base">WhatsApp Us</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
