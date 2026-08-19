import { Helmet } from "react-helmet-async";
import { FAQS } from "../../data/mockData";

export default function AdminFaqs() {
  const faqs = FAQS || [];
  return (
    <>
      <Helmet><title>FAQs | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Frequently Asked Questions</h1>
          <p className="font-poppins text-sm text-gray-400 mt-1">Manage customer help questions and answers</p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 space-y-2">
              <h3 className="font-playfair font-bold text-lg text-dark-brown dark:text-cream">{f.q}</h3>
              <p className="font-poppins text-sm text-gray-600 dark:text-gray-300">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
