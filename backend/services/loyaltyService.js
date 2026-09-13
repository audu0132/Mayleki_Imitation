/**
 * Mayleki Royale VIP loyalty points calculation
 */

export const calculateEarnedPoints = (orderTotal) => {
  // 1 loyalty point for every 100 INR spent
  return Math.floor(orderTotal / 100);
};

export const getCustomerTier = (totalSpend) => {
  if (totalSpend >= 25000) return { tier: "Diamond Regal", perkDiscount: 0.15 };
  if (totalSpend >= 10000) return { tier: "Gold Heritage", perkDiscount: 0.1 };
  if (totalSpend >= 3000) return { tier: "Silver Patron", perkDiscount: 0.05 };
  return { tier: "Classic Member", perkDiscount: 0 };
};
