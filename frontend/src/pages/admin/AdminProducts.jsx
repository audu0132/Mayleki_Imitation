import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import { PRODUCTS } from "../../data/mockData";

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const filtered = PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search)
  );

  return (
    <>
      <Helmet><title>Products | Mayleki Admin</title></Helmet>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">Products</h1>
            <p className="font-poppins text-sm text-gray-400">Manage your jewellery inventory</p>
          </div>
          <button className="btn-gold px-5 py-2.5 text-sm">
            <FiPlus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or SKU..."
              className="input-luxury pl-10 py-2.5 text-sm w-full"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gold/20 rounded-xl text-sm font-poppins text-dark-brown dark:text-cream hover:border-gold transition-colors">
            <FiFilter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5 border-b border-gold/10">
                <tr>
                  {["Product", "SKU", "Category", "Price", "Rental", "Stock", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/5">
                {filtered.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gold/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream line-clamp-1">{product.title}</p>
                          <p className="font-poppins text-xs text-gray-400">{product.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-poppins text-xs text-gray-500">{product.sku}</td>
                    <td className="px-4 py-3 font-poppins text-xs text-gray-500 capitalize">{product.category.replace(/-/g, " ")}</td>
                    <td className="px-4 py-3 font-poppins text-sm font-semibold text-dark-brown dark:text-cream">₹{product.sellingPrice.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 font-poppins text-xs text-rose-gold">{product.isRentalAvailable ? `₹${product.rentalPrice}/day` : "—"}</td>
                    <td className="px-4 py-3 font-poppins text-sm text-dark-brown dark:text-cream">{product.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-poppins font-semibold px-2.5 py-1 rounded-full ${
                        product.availableQty > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                      }`}>
                        {product.availableQty > 0 ? "Active" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-gold/10 text-gold transition-colors">
                          <FiEdit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gold/10 flex items-center justify-between">
            <p className="font-poppins text-xs text-gray-400">{filtered.length} products</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gold/20 text-xs font-poppins hover:border-gold transition-colors">Previous</button>
              <button className="px-3 py-1.5 rounded-lg border border-gold/20 text-xs font-poppins hover:border-gold transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
