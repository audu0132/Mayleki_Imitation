import express from "express";
const router = express.Router();
const COUPONS = { WEDDING25: 25, FESTIVAL3: 10, FIRSTRENT: 15 };
router.post("/validate", async (req, res) => {
  const { code, amount } = req.body;
  const discount = COUPONS[code?.toUpperCase()];
  if (discount === undefined) return res.status(400).json({ success: false, message: "Invalid coupon code" });
  const savings = (amount * discount) / 100;
  res.json({ success: true, discount, savings, message: `${discount}% discount applied!` });
});
router.get("/", async (req, res) => { res.json({ success: true, data: Object.keys(COUPONS).map(code => ({ code, discount: COUPONS[code] })) }); });
export default router;
