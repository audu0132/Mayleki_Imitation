import express from 'express';
const router = express.Router();

const ACTIVE_COUPONS = [
  { code: 'ROYAL10', discountType: 'PERCENTAGE', discountValue: 10, minOrderValue: 2000, maxDiscount: 1000 },
  { code: 'BRIDAL500', discountType: 'FLAT', discountValue: 500, minOrderValue: 5000, maxDiscount: 500 },
  { code: 'FIRSTFESTIVE', discountType: 'PERCENTAGE', discountValue: 15, minOrderValue: 1500, maxDiscount: 750 },
];

router.post('/validate', async (req, res) => {
  const { code, cartTotal } = req.body;
  
  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code is required.' });
  }

  const coupon = ACTIVE_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid or expired promo code.' });
  }

  if (cartTotal < coupon.minOrderValue) {
    return res.status(400).json({
      success: false,
      message: `Minimum cart value of ₹${coupon.minOrderValue} required for this code.`,
    });
  }

  let discountAmount = 0;
  if (coupon.discountType === 'PERCENTAGE') {
    discountAmount = Math.min((cartTotal * coupon.discountValue) / 100, coupon.maxDiscount);
  } else {
    discountAmount = Math.min(coupon.discountValue, coupon.maxDiscount);
  }

  res.json({
    success: true,
    code: coupon.code,
    discountAmount,
    finalTotal: Math.max(0, cartTotal - discountAmount),
    message: `Coupon ${coupon.code} applied successfully!`,
  });
});

export default router;
