export const recommendJewelleryByOccasion = (occasion) => {
  const recommendations = {
    sangeet: ["Statement Chandbalis", "Multi-layered Polki Choker", "Passa / Side Maang Tikka"],
    mehendi: ["Floral Kundan Hathphool", "Lightweight Guttapusalu", "Cocktail Rings"],
    reception: ["Diamond-finish Solitaire Choker", "Cascade Drop Earrings", "Tennis Bracelet"],
  };
  return recommendations[occasion] || recommendations.reception;
};
