export const calculatePartyDiscount = (bridesmaidSetsCount, totalAmount) => {
  if (bridesmaidSetsCount >= 5) return Math.round(totalAmount * 0.25);
  if (bridesmaidSetsCount >= 3) return Math.round(totalAmount * 0.15);
  return 0;
};
