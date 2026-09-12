import express from 'express';
const router = express.Router();

const subscribers = new Set();

router.post('/subscribe', async (req, res) => {
  const { email, preferences } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email address is required.' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const isExisting = subscribers.has(normalizedEmail);
  
  subscribers.add(normalizedEmail);

  res.json({
    success: true,
    message: isExisting
      ? 'You are already subscribed to the Mayleki VIP Bridal Club!'
      : 'Welcome to the Mayleki VIP Bridal Club! Enjoy 10% off your next reservation.',
    vipBenefits: ['Exclusive Bridal Previews', 'Free Jewellery Cleaning Care', 'Early Festival Access'],
  });
});

export default router;
