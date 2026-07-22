import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    sku: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    category: { type: String, required: true },
    subcategory: { type: String },
    images: [{ type: String }],
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    // Rental
    isRentalAvailable: { type: Boolean, default: false },
    rentalPrice: { type: Number },
    rentalDeposit: { type: Number },
    rentalDays: { type: Number, default: 2 },
    // Stock
    stock: { type: Number, default: 0 },
    availableQty: { type: Number, default: 0 },
    // Attributes
    material: { type: String },
    weight: { type: String },
    color: { type: String },
    finish: { type: String },
    occasion: { type: String },
    // Flags
    isFeatured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    // Meta
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
  },
  { timestamps: true }
);

// Index for text search
productSchema.index({ title: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ slug: 1 });

export default mongoose.model("Product", productSchema);
