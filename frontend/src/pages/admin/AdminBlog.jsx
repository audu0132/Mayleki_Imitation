import { Helmet } from "react-helmet-async";
import { FiFileText, FiPlus } from "react-icons/fi";

const MOCK_POSTS = [
  { id: 1, title: "How to Choose Perfect Kundan Jewellery for Your Bridal Outfit", date: "Aug 15, 2026", category: "Bridal Styling", readTime: "5 min" },
  { id: 2, title: "Traditional Maharashtrian Jewellery Names & Significance", date: "Jul 28, 2026", category: "Heritage", readTime: "8 min" },
  { id: 3, title: "Why Renting Bridal Jewellery is the Smart Choice in 2026", date: "Jul 10, 2026", category: "Rental Guide", readTime: "4 min" },
];

export default function AdminBlog() {
  return (
    <>
      <Helmet><title>Blog Articles | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Blog Posts</h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">Manage jewelry guides and articles</p>
          </div>
          <button className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2 rounded-xl">
            <FiPlus className="w-4 h-4" /> New Article
          </button>
        </div>

        <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden shadow-sm">
          <table className="w-full font-poppins text-sm">
            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gold/10 text-xs text-gray-400 uppercase">
              <tr>
                <th className="px-5 py-3.5 text-left">Title</th>
                <th className="px-5 py-3.5 text-left">Category</th>
                <th className="px-5 py-3.5 text-left">Date</th>
                <th className="px-5 py-3.5 text-left">Read Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {MOCK_POSTS.map((p) => (
                <tr key={p.id} className="hover:bg-gold/5 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-dark-brown dark:text-cream">{p.title}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-gold">{p.category}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{p.date}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">{p.readTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
