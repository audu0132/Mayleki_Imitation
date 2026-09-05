import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ScrollReveal from "../common/ScrollReveal";

export default function HeritageSection() {
  return (
    <section className="py-section bg-charcoal text-ivory overflow-hidden">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal variant="scale">
            <div className="aspect-[4/5] overflow-hidden" data-cursor="view">
              <img
                src="https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b52?w=800&q=85"
                alt="Maharashtrian Heritage"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={200}>
            <span className="section-eyebrow">Our Heritage</span>

            <h2 className="font-display text-display-md text-ivory mb-6">
              Rooted in{" "}
              <em className="italic">Maharashtrian Tradition</em>
            </h2>

            <p className="font-body text-body-sm text-ivory/60 font-light leading-relaxed mb-5 max-w-lg">
              Every Mayleki creation celebrates centuries-old artistry — from
              regal Kolhapuri saaj to handcrafted Kundan sets. We honor
              traditions passed down through generations of master artisans.
            </p>

            <p className="font-body text-body-sm text-ivory/60 font-light leading-relaxed mb-10 max-w-lg">
              Based in Rahuri, Maharashtra, our boutique brings premium
              imitation jewellery within reach — whether you choose to buy or
              rent for your most unforgettable moments.
            </p>

            <Link
              to="/about"
              className="btn-outline-luxury border-ivory/30 !text-ivory hover:bg-ivory hover:!text-charcoal"
            >
              Discover Our Story
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
