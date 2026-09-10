import express from "express";
const router = express.Router();

const JEWELLERY_CATEGORIES = [
  {
    id: "cat_bridal",
    name: "Bridal Sets",
    slug: "bridal-sets",
    description: "Opulent wedding and heritage bridal collections handcrafted for auspicious celebrations.",
    itemCount: 48,
    featured: true,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat_necklaces",
    name: "Necklaces & Chokers",
    slug: "necklaces",
    description: "Statement kundan, polki, temple, and choker neckpieces with artisan detailing.",
    itemCount: 65,
    featured: true,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat_earrings",
    name: "Earrings & Jhumkas",
    slug: "earrings",
    description: "Exquisite chandbalis, drop earrings, and jhumkas embellished with pearls and zirconias.",
    itemCount: 82,
    featured: true,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat_bangles",
    name: "Bangles & Kadas",
    slug: "bangles-kadas",
    description: "Traditional gold-plated kadas, antique bangles, and bridal hathphool sets.",
    itemCount: 54,
    featured: false,
    image: "https://images.unsplash.com/photo-1611591477287-21a4f0b2f15e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "cat_rings",
    name: "Rings & Solitaires",
    slug: "rings",
    description: "Regal cocktail rings, statement floral designs, and adjustable polki rings.",
    itemCount: 39,
    featured: false,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
  },
];

router.get("/", async (req, res) => {
  res.json({
    success: true,
    count: JEWELLERY_CATEGORIES.length,
    data: JEWELLERY_CATEGORIES,
  });
});

router.get("/:slug", async (req, res) => {
  const category = JEWELLERY_CATEGORIES.find((c) => c.slug === req.params.slug);
  if (!category) {
    return res.status(404).json({ success: false, message: "Category not found." });
  }
  res.json({ success: true, data: category });
});

export default router;
