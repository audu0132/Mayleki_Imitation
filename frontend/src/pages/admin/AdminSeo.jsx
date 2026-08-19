import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FiSettings, FiCheck } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function AdminSeo() {
  const [seo, setSeo] = useState({
    title: "Mayleki Imitation Jewellery — Premium Bridal & Traditional Jewellery Rahuri",
    description: "Discover handcrafted bridal sets, Kundan jewellery, and rental sets at Mayleki Boutique, Rahuri.",
    keywords: "Imitation jewellery Rahuri, Bridal jewellery rental, Kundan sets, Kolhapuri Saaj, Mayleki Boutique",
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("SEO Settings updated successfully!");
  };

  return (
    <>
      <Helmet><title>SEO Settings | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6 max-w-3xl">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">SEO & Meta Settings</h1>
          <p className="font-poppins text-sm text-gray-400 mt-1">Manage global website search engine optimization</p>
        </div>

        <form onSubmit={handleSave} className="bg-white dark:bg-dark-brown-light p-6 rounded-2xl border border-gold/10 space-y-4 font-poppins">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Global Meta Title</label>
            <input
              type="text"
              value={seo.title}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
              className="input-luxury text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Global Meta Description</label>
            <textarea
              rows={3}
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
              className="w-full p-3 rounded-xl border border-gold/20 bg-transparent text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Focus Keywords</label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="input-luxury text-sm"
            />
          </div>
          <button type="submit" className="btn-gold text-sm px-6 py-2.5 rounded-xl flex items-center gap-2">
            <FiCheck className="w-4 h-4" /> Save SEO Settings
          </button>
        </form>
      </div>
    </>
  );
}
