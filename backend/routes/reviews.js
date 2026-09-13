import express from "express";

const router = express.Router();

const pendingReviews = [];

router.get("/pending", (req, res) => {
  res.json({ success: true, count: pendingReviews.length, reviews: pendingReviews });
});

router.post("/moderate/:id", (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'approve' or 'reject'
  res.json({ success: true, message: `Review ${id} ${action}d successfully.` });
});

export default router;
