import express from 'express';
const router = express.Router();

const ORDER_STATUS_FLOW = [
  { status: 'PLACED', title: 'Order Confirmed', description: 'Your order has been received and verified.' },
  { status: 'QUALITY_CHECK', title: 'Artisan Quality Check', description: 'Jewellery inspected for finish and gemstone setting.' },
  { status: 'PACKED', title: 'Luxury Packaging', description: 'Safely packed in velvet jewellery box and tamper-proof seal.' },
  { status: 'SHIPPED', title: 'Dispatched via Premium Courier', description: 'Handed over to insured express logistics partner.' },
  { status: 'DELIVERED', title: 'Delivered', description: 'Package safely delivered with OTP verification.' },
];

router.get('/:trackingNumber', async (req, res) => {
  const { trackingNumber } = req.params;
  
  if (!trackingNumber) {
    return res.status(400).json({ success: false, message: 'Tracking number is required.' });
  }

  res.json({
    success: true,
    trackingNumber,
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currentStatus: 'SHIPPED',
    carrier: 'BlueDart Luxury Express',
    trackingTimeline: ORDER_STATUS_FLOW.map((step, idx) => ({
      ...step,
      completed: idx <= 3,
      timestamp: new Date(Date.now() - (3 - idx) * 12 * 60 * 60 * 1000).toISOString(),
    })),
  });
});

export default router;
