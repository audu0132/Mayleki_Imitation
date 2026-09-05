import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../../data/mockData";
import ScrollReveal from "../common/ScrollReveal";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-section bg-cream">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <span className="section-eyebrow mb-8 block">What They Say</span>

            {/* Large Pull Quote */}
            <blockquote
              key={current}
              className="font-display text-display-sm italic text-charcoal leading-snug mb-8 transition-opacity duration-500"
            >
              "{t.review}"
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-body text-xs font-semibold text-charcoal tracking-wider uppercase">
                {t.name}
              </span>
              <span className="font-body text-[11px] text-text-secondary">
                {t.location} — {t.occasion}
              </span>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-champagne w-6"
                      : "bg-charcoal/20 hover:bg-charcoal/40"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
