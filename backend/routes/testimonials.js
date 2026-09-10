import express from "express";
const router = express.Router();

const CURATED_TESTIMONIALS = [
  {
    id: "rev_1",
    author: "Ananya Deshmukh",
    city: "Mumbai",
    occasion: "Wedding Reception",
    rating: 5,
    verified: true,
    comment: "Rented the royal Kundan choker set for my reception. The craftsmanship was indistinguishable from real gold. Truly made me feel like royalty!",
    date: "2026-08-15",
  },
  {
    id: "rev_2",
    author: "Pooja Mehta",
    city: "Pune",
    occasion: "Sangeet Night",
    rating: 5,
    verified: true,
    comment: "The AI Stylist matched my lehenga color with the emerald necklace set perfectly. Seamless booking and pristine packaging.",
    date: "2026-08-22",
  },
  {
    id: "rev_3",
    author: "Rituja Kulkarni",
    city: "Nashik",
    occasion: "Engagement Ceremony",
    rating: 5,
    verified: true,
    comment: "Exceptional service and timely delivery. The security deposit was refunded within 24 hours of returning the jewellery.",
    date: "2026-09-02",
  },
];

router.get("/", async (req, res) => {
  res.json({
    success: true,
    count: CURATED_TESTIMONIALS.length,
    data: CURATED_TESTIMONIALS,
  });
});

router.post("/", async (req, res) => {
  const { author, rating, comment, occasion, city } = req.body;
  if (!author || !rating || !comment) {
    return res.status(400).json({ success: false, message: "Author, rating, and comment are required." });
  }
  const newReview = {
    id: `rev_${Date.now()}`,
    author,
    rating: Number(rating),
    comment,
    occasion: occasion || "Celebration",
    city: city || "India",
    verified: false,
    date: new Date().toISOString().split("T")[0],
  };
  res.status(201).json({ success: true, data: newReview });
});

export default router;
