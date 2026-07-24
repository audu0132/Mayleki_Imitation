import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FAQS } from "../data/mockData";
import FAQ from "../components/home/FAQ";

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>FAQ | Mayleki Jewellery</title>
        <meta name="description" content="Frequently asked questions about Mayleki Jewellery — rental process, returns, shipping and more." />
      </Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative text-center">
            <p className="section-subtitle mb-3">Help Center</p>
            <h1 className="font-playfair text-5xl font-bold text-cream">
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h1>
          </div>
        </div>
        <FAQ />
      </div>
    </>
  );
}
