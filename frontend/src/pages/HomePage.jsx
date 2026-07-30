import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/home/HeroBanner";

// Lazy-loaded sections
const CategoryGrid = lazy(() => import("../components/home/CategoryGrid"));
const FeaturedProducts = lazy(() => import("../components/home/FeaturedProducts"));
const WhyChooseUs = lazy(() => import("../components/home/WhyChooseUs"));
const CTABanner = lazy(() => import("../components/home/CTABanner"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const InstagramGallery = lazy(() => import("../components/home/InstagramGallery"));
const FAQ = lazy(() => import("../components/home/FAQ"));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>
          Mayleki Imitation Jewellery | Premium Bridal Jewellery in Rahuri,
          Maharashtra
        </title>

        <meta
          name="description"
          content="Shop premium imitation jewellery, bridal jewellery, Maharashtrian jewellery, Kolhapuri Saaj, Nath, American Diamond sets, and jewellery rentals at Mayleki Jewellery, Rahuri."
        />

        <meta
          name="keywords"
          content="Mayleki Jewellery, imitation jewellery, bridal jewellery, jewellery rental, Maharashtrian jewellery, Kolhapuri Saaj, Nath, American Diamond Jewellery, Rahuri Jewellery"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <meta
          name="author"
          content="Mayleki Jewellery"
        />

        <meta
          name="theme-color"
          content="#D4AF37"
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://mayleki-studio.vercel.app/"
        />

        {/* Open Graph */}

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:title"
          content="Mayleki Imitation Jewellery"
        />

        <meta
          property="og:description"
          content="Premium Bridal & Traditional Jewellery in Rahuri. Rent or Buy from hundreds of beautiful collections."
        />

        <meta
          property="og:url"
          content="https://mayleki-studio.vercel.app/"
        />

        <meta
          property="og:site_name"
          content="Mayleki Jewellery"
        />

        {/* Replace with your banner image */}
        <meta
          property="og:image"
          content="https://mayleki-studio.vercel.app/og-image.jpg"
        />

        {/* Twitter */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Mayleki Jewellery"
        />

        <meta
          name="twitter:description"
          content="Premium Bridal Jewellery & Jewellery Rentals"
        />

        <meta
          name="twitter:image"
          content="https://mayleki-studio.vercel.app/og-image.jpg"
        />

        {/* Structured Data */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",

            name: "Mayleki Imitation Jewellery",

            image:
              "https://mayleki-studio.vercel.app/og-image.jpg",

            logo:
              "https://mayleki-studio.vercel.app/logo.png",

            url: "https://mayleki-studio.vercel.app/",

            telephone: "+919876543210", // Replace

            priceRange: "₹₹",

            description:
              "Premium imitation jewellery store offering bridal jewellery, jewellery rental and traditional Maharashtrian collections.",

            address: {
              "@type": "PostalAddress",
              streetAddress: "Rahuri",
              addressLocality: "Ahmednagar",
              addressRegion: "Maharashtra",
              postalCode: "413706",
              addressCountry: "IN",
            },

            openingHours: "Mo-Sa 10:00-20:00",

            sameAs: [
              "https://instagram.com/yourpage",
              "https://facebook.com/yourpage",
            ],
          })}
        </script>
      </Helmet>

      <main className="overflow-hidden">

        {/* Hero */}

        <HeroBanner />

        {/* Remaining Sections */}

        <Suspense fallback={<SectionLoader />}>

          <CategoryGrid />

          <FeaturedProducts />

          <WhyChooseUs />

          <CTABanner />

          <Testimonials />

          <InstagramGallery />

          <FAQ />

        </Suspense>

      </main>
    </>
  );
}