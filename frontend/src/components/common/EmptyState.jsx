import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

export default function EmptyState({ title = "Your Bag is Empty", description = "Explore our bridal collections to find matching jewellery.", actionLink = "/products", actionText = "Explore Catalogue" }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
        <FiShoppingBag className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-xl text-stone-200 mb-2">{title}</h3>
      <p className="text-xs text-stone-400 max-w-sm mx-auto mb-6">{description}</p>
      <Link to={actionLink} className="inline-block px-6 py-2.5 rounded-full bg-gold text-stone-950 font-medium text-xs uppercase tracking-wider hover:bg-gold/90 transition-colors">
        {actionText}
      </Link>
    </div>
  );
}
