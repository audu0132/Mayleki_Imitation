export const getSanitizationFee = (itemCategory) => {
  const fees = {
    "bridal-sets": 250,
    "necklaces": 150,
    "earrings": 100,
    "bangles-kadas": 120,
  };
  return fees[itemCategory] || 150;
};
