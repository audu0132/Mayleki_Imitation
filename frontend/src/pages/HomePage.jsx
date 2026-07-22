import { Helmet } from "react-helmet-async";
import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import InstagramGallery from "../components/home/InstagramGallery";
import FAQ from "../components/home/FAQ";
import CTABanner from "../components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Mayleki Imitation Jewellery — Premium Bridal & Traditional Jewellery | Rahuri, Maharashtra</title>
        <meta
          name="description"
          content="Mayleki Imitation Jewellery offers premium bridal sets, Maharashtrian traditional jewellery, Kolhapuri Saaj, Nath, rental jewellery and more. Located in Rahuri, Maharashtra."
        />
        <meta name="keywords" content="imitation jewellery, bridal jewellery, Maharashtrian jewellery, Kolhapuri Saaj, rental jewellery, Rahuri, Maharashtra" />
        <meta property="og:title" content="Mayleki Imitation Jewellery — Premium Bridal & Traditional Jewellery" />
        <meta property="og:description" content="Premium imitation & bridal jewellery in Rahuri, Maharashtra. Rent or buy from 1000+ designs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mayleki.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            "name": "Mayleki Imitation Jewellery",
            "description": "Premium imitation and bridal jewellery store in Rahuri, Maharashtra",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rahuri",
              "addressLocality": "Ahmednagar",
              "addressRegion": "Maharashtra",
              "postalCode": "413706",
              "addressCountry": "IN"
            },
            "telephone": "+919876543210",
            "openingHours": "Mo-Sa 10:00-20:00",
            "priceRange": "₹₹",
          })}
        </script>
      </Helmet>

      <main>
        <HeroBanner />
        <CategoryGrid />
        <FeaturedProducts />
        <WhyChooseUs />
        <CTABanner />
        <Testimonials />
        <InstagramGallery />
        <FAQ />
      </main>
    </>
  );
}
