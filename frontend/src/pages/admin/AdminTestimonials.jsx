import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FiStar, FiPlus, FiTrash2, FiCheck } from "react-icons/fi";
import { TESTIMONIALS } from "../../data/mockData";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState(TESTIMONIALS || []);

  return (
    <>
      <Helmet><title>Testimonials | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Testimonials & Reviews</h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">Manage customer reviews and store feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white dark:bg-dark-brown-light p-6 rounded-2xl border border-gold/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-dark-brown">
                    {t.name[0]}
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-dark-brown dark:text-cream">{t.name}</h3>
                    <p className="text-xs text-gold">{t.location || "Rahuri"}</p>
                  </div>
                </div>
                <div className="flex items-center text-amber-400 gap-1 text-sm">
                  <FiStar className="fill-current" /> {t.rating || 5}
                </div>
              </div>
              <p className="font-poppins text-sm text-gray-600 dark:text-gray-300 italic">"{t.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
