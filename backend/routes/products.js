import express from "express";
import Product from "../models/Product.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// @GET /api/products — List with filters, search, sort, pagination
router.get("/", async (req, res, next) => {
  try {
    const {
      q, category, minPrice, maxPrice, occasion, color,
      sort = "-createdAt", page = 1, limit = 20,
      featured, trending, rental, instock,
    } = req.query;

    const filter = { isActive: true };

    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.sellingPrice = { ...(minPrice && { $gte: +minPrice }), ...(maxPrice && { $lte: +maxPrice }) };
    if (occasion) filter.occasion = occasion;
    if (color) filter.color = color;
    if (featured === "true") filter.isFeatured = true;
    if (trending === "true") filter.isTrending = true;
    if (rental === "true") filter.isRentalAvailable = true;
    if (instock === "true") filter.availableQty = { $gt: 0 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(parseInt(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    next(err);
  }
});

// @GET /api/products/:slug — Single product
router.get("/:slug", async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

// @POST /api/products — Admin create
router.post("/", protect, authorize("admin", "staff"), async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

// @PUT /api/products/:id — Admin update
router.put("/:id", protect, authorize("admin", "staff"), async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

// @DELETE /api/products/:id — Admin soft delete
router.delete("/:id", protect, authorize("admin"), async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: "Product deactivated" });
  } catch (err) {
    next(err);
  }
});

export default router;
