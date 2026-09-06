import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { OFFERS } from "../data/mockData";
import { FiTag, FiClock, FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

export default function OffersPage() {
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Code "${code}" copied!`, { icon: "📋" });
  };

  return (
    <>
      <Helmet><title>Offers & Deals | Mayleki Jewellery</title></Helmet>
      <div className="page-wrapper">
        <div className="page-header text-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#B8975F] mb-2">Save More</p>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              Exclusive <span className="italic text-[#E5C88A]">Offers</span>
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3" />
          </div>
        </div>
        <div className="container-luxury py-8 sm:py-10 lg:py-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERS.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl overflow-hidden shadow-luxury border ${
                  offer.color === "gold" ? "border-gold/30" :
                  offer.color === "rose" ? "border-rose-gold/30" : "border-dark-brown/30"
                }`}
              >
                <div className={`p-8 ${
                  offer.color === "gold" ? "bg-gradient-to-br from-gold to-gold-dark" :
                  offer.color === "rose" ? "bg-gradient-to-br from-rose-gold to-rose-gold-dark" :
                  "bg-gradient-to-br from-dark-brown to-dark-brown-dark"
                }`}>
                  <span className="badge-gold mb-3 inline-flex">{offer.badge}</span>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-1">{offer.title}</h3>
                  <p className="font-playfair text-4xl font-bold text-white mb-2">{offer.subtitle}</p>
                  <p className="font-poppins text-sm text-white/80 mb-4">{offer.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <FiClock className="w-4 h-4 text-white/70" />
                    <span className="font-poppins text-xs text-white/70">Valid till: {offer.expiry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/20 border border-dashed border-white/40 rounded-xl px-4 py-2.5 flex items-center justify-between">
                      <span className="font-poppins font-bold text-white tracking-widest text-sm">{offer.code}</span>
                      <button onClick={() => copyCode(offer.code)} className="text-white/80 hover:text-white transition-colors">
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
