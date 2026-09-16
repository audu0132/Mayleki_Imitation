/**
 * JSON-LD schema builder for Google rich snippets
 */

export const getProductSchema = (product) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images || [product.image],
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Mayleki Imitation Jewellery",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: product.price || 499,
      highPrice: (product.price || 499) * 3,
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
    },
  };
};
