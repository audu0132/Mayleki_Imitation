export const filterJewellery = (items, filters = {}) => {
  const { category, minPrice, maxPrice, occasion, plating, inStock, search } = filters;

  return items.filter((item) => {
    if (category && item.category !== category) return false;
    if (minPrice && item.rentalPricePerDay < Number(minPrice)) return false;
    if (maxPrice && item.rentalPricePerDay > Number(maxPrice)) return false;
    if (occasion && item.occasion !== occasion) return false;
    if (plating && item.plating !== plating) return false;
    if (inStock !== undefined && item.inStock !== (inStock === 'true' || inStock === true)) return false;
    
    if (search) {
      const q = search.toLowerCase();
      const matches = 
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);
      if (!matches) return false;
    }

    return true;
  });
};
