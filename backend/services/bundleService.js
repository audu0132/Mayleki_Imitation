/**
 * Bridal bundle package discount helper
 */

export const calculateBridalPackageDiscount = (itemCount, totalRentalPrice) => {
  // 3+ items (e.g. choker + earrings + maang tikka) gets 15% off
  if (itemCount >= 4) {
    return { discountPercent: 20, discountAmount: Math.round(totalRentalPrice * 0.2) };
  }
  if (itemCount >= 3) {
    return { discountPercent: 15, discountAmount: Math.round(totalRentalPrice * 0.15) };
  }
  return { discountPercent: 0, discountAmount: 0 };
};
