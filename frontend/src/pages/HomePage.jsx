import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/home/HeroBanner";
import BrandMarquee from "../components/home/BrandMarquee";
import LoadingSpinner from "../components/common/LoadingSpinner";

// Lazy-loaded sections
const EditorialShowcase = lazy(() => import("../components/home/EditorialShowcase"));
const CategoryGrid = lazy(() => import("../components/home/CategoryGrid"));
const FeaturedProducts = lazy(() => import("../components/home/FeaturedProducts"));
const HeritageSection = lazy(() => import("../components/home/HeritageSection"));
const Testimonials = lazy(() => import("../components/home/Testimonials"));
const InstagramGallery = lazy(() => import("../components/home/InstagramGallery"));

function SectionLoader() {
  return <LoadingSpinner fullScreen={false} />;
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Mayleki — Premium Imitation Jewellery | Bridal & Traditional</title>
        <meta
          name="description"
          content="Mayleki — Premium Maharashtrian imitation jewellery. Bridal sets, Kolhapuri saaj, Kundan, Nath, and luxury rental jewellery. Crafted for your moments."
        />
      </Helmet>

      <main className="overflow-x-hidden bg-ivory">
        {/* 1. Cinematic Full-Viewport Hero */}
        <HeroBanner />

        {/* 2. Brand Marquee */}
        <BrandMarquee />

        <Suspense fallback={<SectionLoader />}>
          {/* 3. Editorial Collection Showcase */}
          <EditorialShowcase />

          {/* 4. Shop by Category */}
          <CategoryGrid />

          {/* 5. The Collection — Featured Products */}
          <FeaturedProducts />

          {/* 6. Heritage Brand Moment */}
          <HeritageSection />

          {/* 7. Pull-Quote Testimonials */}
          <Testimonials />

          {/* 8. Instagram Gallery */}
          <InstagramGallery />
        </Suspense>
      </main>
    </>
  );
}
