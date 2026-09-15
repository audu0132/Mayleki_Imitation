import { useState, useEffect } from "react";

export function useWishlistSync() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mayleki_wishlist") || "[]");
    } catch {
      return [];
    }
  });

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const next = prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId];
      localStorage.setItem("mayleki_wishlist", JSON.stringify(next));
      return next;
    });
  };

  return { favorites, toggleFavorite, isFavorite: (id) => favorites.includes(id) };
}
