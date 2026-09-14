import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-400 py-3">
      <Link to="/" className="hover:text-gold flex items-center gap-1 transition-colors">
        <FiHome className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <FiChevronRight className="w-3 h-3 text-stone-600" />
          {item.link ? (
            <Link to={item.link} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gold font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
