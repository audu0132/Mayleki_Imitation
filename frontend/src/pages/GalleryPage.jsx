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
        <div className="page-header text-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#B8975F] mb-2">Our Portfolio</p>
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-2">
              Photo <span className="italic text-[#E5C88A]">Gallery</span>
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3" />
          </div>
        </div>
        <div className="container-luxury py-10 sm:py-12 lg:py-16">
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
