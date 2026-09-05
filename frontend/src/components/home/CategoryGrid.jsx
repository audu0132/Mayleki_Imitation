import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import ScrollReveal from "../common/ScrollReveal";

const CATEGORIES = [
  {
    name: "Earrings",
    slug: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
  {
    name: "Necklaces",
    slug: "necklace-sets",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
  },
  {
    name: "Bangles",
    slug: "bangles",
    image: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&q=80",
  },
  {
    name: "Nath",
    slug: "nath",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80",
  },
  {
    name: "Bridal Sets",
    slug: "bridal-sets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
  },
  {
    name: "Jhumkas",
    slug: "jhumkas",
    image: "https://images.unsplash.com/photo-1561828995-aa79a2db86dd?w=600&q=80",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-section bg-ivory">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="section-eyebrow">Explore</span>
            <h2 className="section-heading section-heading-md">
              Shop by Category
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.slug} delay={i * 80}>
              <Link
                to={`/category/${cat.slug}`}
                className="block group relative aspect-category overflow-hidden bg-cream"
                data-cursor="view"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.06]"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/45 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-3">
                  <span className="font-body text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-ivory text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {cat.name}
                  </span>
                  <FiArrowUpRight className="w-4 h-4 text-ivory mt-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
