export default function BrandMarquee() {
  const items = [
    "Crafted for Your Moments",
    "Timeless Beauty",
    "Everyday Luxury",
    "Maharashtrian Heritage",
    "Since 2020",
  ];

  const separator = (
    <span className="mx-6 sm:mx-8 text-champagne opacity-40">•</span>
  );

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center whitespace-nowrap">
      <span>{item}</span>
      {separator}
    </span>
  ));

  return (
    <section className="py-5 sm:py-6 border-y border-champagne/10 bg-ivory overflow-hidden">
      <div className="marquee-track font-body text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-charcoal/40">
        {content}
        {content}
        {content}
      </div>
    </section>
  );
}
