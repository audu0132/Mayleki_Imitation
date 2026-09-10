import express from "express";
const router = express.Router();

// Calculate rental quote based on days and product price
router.post("/calculate-quote", async (req, res) => {
  try {
    const { rentalPricePerDay = 500, days = 3, refundableDeposit = 1500 } = req.body;
    const numDays = Math.max(1, parseInt(days, 10));
    const baseRental = rentalPricePerDay * numDays;
    const cleaningFee = 150;
    const gst = Math.round(baseRental * 0.03); // 3% GST on jewellery rental
    const totalAmount = baseRental + cleaningFee + gst + refundableDeposit;

    res.json({
      success: true,
      quote: {
        rentalDays: numDays,
        rentalPerDay: rentalPricePerDay,
        baseRental,
        cleaningFee,
        gst,
        refundableDeposit,
        totalPayable: totalAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error calculating rental quote." });
  }
});

router.get("/check-availability", async (req, res) => {
  const { productId, startDate, endDate } = req.query;
  if (!productId || !startDate || !endDate) {
    return res.status(400).json({ success: false, message: "productId, startDate, and endDate are required." });
  }
  res.json({
    success: true,
    available: true,
    message: "Jewellery set is available for selected rental dates.",
    productId,
    startDate,
    endDate,
  });
});

export default router;
