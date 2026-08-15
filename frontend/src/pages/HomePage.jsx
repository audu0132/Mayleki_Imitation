import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/home/HeroBanner";
import EditorialStatement from "../components/home/EditorialStatement";

// Lazy-loaded sections
const EditorialShowcase = lazy(() => import("../components/home/EditorialShowcase"));
const CategoryGrid = lazy(() => import("../components/home/CategoryGrid"));
const FeaturedProducts = lazy(() => import("../components/home/FeaturedProducts"));
const FeaturedMoment = lazy(() => import("../components/home/FeaturedMoment"));
const HeritageSection = lazy(() => import("../components/home/HeritageSection"));
const WhyChooseUs = lazy(() => import("../components/home/WhyChooseUs"));
const LuxuryBookingSection = lazy(() => import("../components/home/LuxuryBookingSection"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const InstagramGallery = lazy(() => import("../components/home/InstagramGallery"));
const FinalCTA = lazy(() => import("../components/home/FinalCTA"));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20 bg-[#FAF7F2] dark:bg-[#141110]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C5A059] border-t-transparent" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Mayleki Imitation Jewellery | High-Fashion Bridal & Traditional Jewellery Rahuri</title>
        <meta
          name="description"
          content="Experience Mayleki's high-fashion imitation jewellery. Royal Maharashtrian bridal sets, Kolhapuri saaj, Nath, Kundan, and luxury jewellery rentals in Rahuri."
        />
        <meta
          name="keywords"
          content="Mayleki Jewellery, imitation jewellery, bridal jewellery, jewellery rental, Maharashtrian jewellery, Kolhapuri Saaj, Nath, Kundan Jewellery, Rahuri Jewellery Boutique"
        />
      </Helmet>

      <main className="overflow-x-hidden bg-[#FAF7F2] dark:bg-[#141110]">
        {/* 1. Viewport Editorial Hero */}
        <HeroBanner />

        {/* 2. Editorial Statement */}
        <EditorialStatement />

        <Suspense fallback={<SectionLoader />}>
          {/* 3. Alternating Collection Showcase */}
          <EditorialShowcase />

          {/* 4. Interactive Category Bar */}
          <CategoryGrid />

          {/* 5. Asymmetric Collection Grid */}
          <FeaturedProducts />

          {/* 6. Cinematic Dark Featured Moment */}
          <FeaturedMoment />

          {/* 7. Maharashtrian Heritage Section */}
          <HeritageSection />

          {/* 8. Oversized Statistics */}
          <WhyChooseUs />

          {/* 9. Split-Screen Appointment Booking */}
          <LuxuryBookingSection />

          {/* 10. Pull-Quote Testimonials */}
          <Testimonials />

          {/* 11. Instagram Image Mosaic */}
          <InstagramGallery />

          {/* 12. Final Magazine Back Cover CTA */}
          <FinalCTA />
        </Suspense>
      </main>
    </>
  );
}
