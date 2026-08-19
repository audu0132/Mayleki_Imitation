import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiPlus, FiEdit, FiTrash2, FiSearch, FiGrid, FiList,
  FiX, FiCheck, FiFolder, FiTag, FiBox
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { CATEGORIES } from "../../data/mockData";

export default function AdminCategories() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "✨",
    image: "",
    count: 0,
    active: true
  });

  // Filter Categories
  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      icon: "✨",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
      count: 0,
      active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon || "✨",
      image: cat.image || "",
      count: cat.count || 0,
      active: cat.active !== false
    });
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingCategory) {
      // Update existing
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...c, ...formData, slug } : c))
      );
      toast.success(`Category "${formData.name}" updated successfully!`);
    } else {
      // Add new
      const newCat = {
        id: Date.now(),
        ...formData,
        slug
      };
      setCategories((prev) => [newCat, ...prev]);
      toast.success(`Category "${formData.name}" created successfully!`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success(`Category "${name}" deleted.`);
    }
  };

  const totalProducts = categories.reduce((acc, curr) => acc + (curr.count || 0), 0);

  return (
    <>
      <Helmet>
        <title>Categories | Mayleki Admin</title>
      </Helmet>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">
              Categories Management
            </h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">
              Manage product collections, categories, and inventory groupings
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2 rounded-xl shadow-gold hover:shadow-gold-sm transition-all"
          >
            <FiPlus className="w-4 h-4" /> Add Category
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
              <FiFolder className="w-6 h-6" />
            </div>
            <div>
              <p className="font-poppins text-xs text-gray-400">Total Categories</p>
              <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                {categories.length}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <FiBox className="w-6 h-6" />
            </div>
            <div>
              <p className="font-poppins text-xs text-gray-400">Total Catalog Items</p>
              <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                {totalProducts}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <FiTag className="w-6 h-6" />
            </div>
            <div>
              <p className="font-poppins text-xs text-gray-400">Active Collections</p>
              <p className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                {categories.filter((c) => c.active !== false).length}
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white dark:bg-dark-brown-light p-4 rounded-2xl border border-gold/10 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category name or slug..."
              className="input-luxury pl-10 py-2.5 text-sm w-full rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-xl border transition-all ${
                viewMode === "grid"
                  ? "bg-gold text-dark-brown border-gold"
                  : "border-gold/20 text-gray-400 hover:text-dark-brown dark:hover:text-cream"
              }`}
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2.5 rounded-xl border transition-all ${
                viewMode === "table"
                  ? "bg-gold text-dark-brown border-gold"
                  : "border-gold/20 text-gray-400 hover:text-dark-brown dark:hover:text-cream"
              }`}
              title="Table View"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {filtered.map((cat) => (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white dark:bg-dark-brown-light border border-gold/10 rounded-2xl overflow-hidden group hover:border-gold/40 hover:shadow-lg transition-all flex flex-col"
                >
                  <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-white/5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-2xl p-1.5 bg-black/40 backdrop-blur-md rounded-xl">
                      {cat.icon}
                    </span>
                    <span className="absolute bottom-3 right-3 text-xs font-poppins font-semibold px-2.5 py-1 rounded-full bg-gold/90 text-dark-brown">
                      {cat.count || 0} items
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-playfair font-bold text-lg text-dark-brown dark:text-cream line-clamp-1">
                        {cat.name}
                      </h3>
                      <p className="font-poppins text-xs text-gold/80 mt-0.5">/{cat.slug}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gold/10">
                      <span
                        className={`text-[10px] font-poppins font-semibold px-2.5 py-0.5 rounded-full ${
                          cat.active !== false
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {cat.active !== false ? "Active" : "Hidden"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(cat)}
                          className="p-2 rounded-lg hover:bg-gold/10 text-gold transition-colors"
                          title="Edit Category"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Delete Category"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Table View */
          <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-white/5 border-b border-gold/10">
                  <tr>
                    {["Category", "Slug", "Icon", "Items Count", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/5">
                  {filtered.map((cat) => (
                    <motion.tr
                      key={cat.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gold/5 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <p className="font-poppins font-semibold text-sm text-dark-brown dark:text-cream">
                            {cat.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-poppins text-xs text-gold">/{cat.slug}</td>
                      <td className="px-5 py-3.5 text-lg">{cat.icon}</td>
                      <td className="px-5 py-3.5 font-poppins text-sm font-semibold text-dark-brown dark:text-cream">
                        {cat.count || 0}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[10px] font-poppins font-semibold px-2.5 py-1 rounded-full ${
                            cat.active !== false
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {cat.active !== false ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditModal(cat)}
                            className="p-1.5 rounded-lg hover:bg-gold/10 text-gold transition-colors"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal for Add / Edit Category */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsModalOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-dark-brown-light border border-gold/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-gold/10 pb-4">
                  <h2 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream">
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gold/10 text-gray-400 hover:text-dark-brown dark:hover:text-cream transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCategory} className="space-y-4 font-poppins">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kundan Sets"
                      className="input-luxury text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        Slug (URL)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="kundan-sets"
                        className="input-luxury text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        Icon Emoji
                      </label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        placeholder="👑"
                        className="input-luxury text-sm text-center"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      className="input-luxury text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      Product Count
                    </label>
                    <input
                      type="number"
                      value={formData.count}
                      onChange={(e) =>
                        setFormData({ ...formData, count: parseInt(e.target.value) || 0 })
                      }
                      className="input-luxury text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gold/10">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-gold/20 text-sm font-semibold hover:border-gold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" /> Save Category
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
