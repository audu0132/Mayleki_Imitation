export const getOpenGraphMeta = ({ title, description, imageUrl, url }) => {
  return {
    "og:title": title || "Mayleki — Luxury Imitation Jewellery",
    "og:description": description || "Handcrafted bridal jewellery rentals & 1GM gold masterpieces.",
    "og:image": imageUrl || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed",
    "og:url": url || "https://mayleki.com",
    "og:type": "website",
  };
};
