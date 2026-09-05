import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  variant = "fade-up", // "fade-up" | "fade-in" | "scale" | "mask"
  delay = 0,
  threshold = 0.15,
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  const variantClass = {
    "fade-up": "reveal",
    "fade-in": "reveal",
    scale: "reveal-scale",
    mask: "reveal-mask",
    stagger: "reveal-stagger",
  }[variant] || "reveal";

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {children}
    </div>
  );
}
