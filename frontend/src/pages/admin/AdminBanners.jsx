import { Helmet } from "react-helmet-async";
import { FiImage, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const MOCK_BANNERS = [
  { id: 1, title: "Royal Bridal Collection 2026", subtitle: "Rent or Buy Premium Kundan Sets", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800", active: true },
  { id: 2, title: "Maharashtrian Traditional Saaj", subtitle: "Handcrafted Kolhapuri Saaj & Thushi", image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?w=800", active: true },
  { id: 3, title: "Haldi & Mehendi Special Sets", subtitle: "Vibrant Floral & Pearl Jewellery", image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800", active: false }
];

export default function AdminBanners() {
  return (
    <>
      <Helmet><title>Banners | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Homepage Banners</h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">Manage hero sliders and promo banners</p>
          </div>
          <button className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2 rounded-xl">
            <FiPlus className="w-4 h-4" /> Add Banner
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_BANNERS.map((b) => (
            <div key={b.id} className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden shadow-sm flex flex-col">
              <div className="h-44 relative bg-gray-100">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                  b.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"
                }`}>
                  {b.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-playfair font-bold text-lg text-dark-brown dark:text-cream">{b.title}</h3>
                  <p className="font-poppins text-xs text-gray-400 mt-1">{b.subtitle}</p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-gold/10">
                  <button className="p-2 text-gold hover:bg-gold/10 rounded-lg"><FiEdit className="w-4 h-4" /></button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
