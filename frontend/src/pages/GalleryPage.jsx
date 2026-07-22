import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { INSTAGRAM_POSTS } from "../data/mockData";
import { FiZoomIn } from "react-icons/fi";

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const allImages = [
    ...INSTAGRAM_POSTS.map((p) => p.image),
    "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=600",
    "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=600",
    "https://images.unsplash.com/photo-1616096142563-caea62f45af0?w=600",
  ];

  return (
    <>
      <Helmet>
        <title>Gallery | Mayleki Jewellery</title>
        <meta name="description" content="View our jewellery gallery — bridal sets, traditional collections, festival jewellery and more." />
      </Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="relative">
            <p className="section-subtitle mb-3">Our Portfolio</p>
            <h1 className="font-playfair text-5xl font-bold text-cream">
              Photo <span className="text-gold-gradient">Gallery</span>
            </h1>
            <div className="gold-divider mt-4 mx-auto" />
          </div>
        </div>
        <div className="container-luxury py-12">
          <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
            {allImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
                onClick={() => setSelected(img)}
              >
                <img src={img} alt="" className="w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-dark-brown/0 group-hover:bg-dark-brown/50 transition-all duration-300 flex items-center justify-center">
                  <FiZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {selected && (
          <div className="fixed inset-0 z-50 bg-dark-brown/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <img src={selected} alt="" className="max-w-full max-h-full rounded-2xl" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </div>
    </>
  );
}
