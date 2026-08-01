import { motion } from "framer-motion";
import { FiInstagram, FiHeart, FiExternalLink } from "react-icons/fi";
import { INSTAGRAM_POSTS } from "../../data/mockData";

export default function InstagramGallery()  {
  return (
    <section className="py-24 bg-white">
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 gap-4">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-playfair text-3xl md:text-5xl font-medium text-[#111111] leading-tight mb-4 text-center">
              #Mayleki
            </h2>
            <a
              href="https://www.instagram.com/mayleki.jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="font-poppins text-xs font-medium uppercase tracking-widest text-gray-500 hover:text-[#111111] transition-colors"
            >
              @mayleki.jewellery
            </a>
          </div>
          <a
            href="https://www.instagram.com/mayleki.jewellery"
            target="_blank"
            rel="noopener noreferrer"
            className="font-poppins text-xs font-medium uppercase tracking-widest text-[#111111] hover:text-[#D4AF37] transition-colors border-b border-[#111111] hover:border-[#D4AF37] pb-1 flex items-center justify-center gap-2 mt-2"
          >
            <FiInstagram strokeWidth={1} className="w-4 h-4" />
            Follow Us
          </a>
        </div>

        {/* Grid - No gaps for editorial feel */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border border-gray-100 justify-center w-full">
          {INSTAGRAM_POSTS.map((post, i) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-gray-50 block border-[0.5px] border-gray-100"
            >
              <img
                src={post.image}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <FiInstagram strokeWidth={1} className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}