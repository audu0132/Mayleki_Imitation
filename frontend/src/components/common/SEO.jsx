import { useEffect } from "react";

export default function SEO({ title, description }) {
  useEffect(() => {
    const prevTitle = document.title;
    const fullTitle = title 
      ? `${title} | Mayleki Luxury Jewellery` 
      : "Mayleki | Luxury Imitation Jewellery & Bridal Rental Boutique";
    
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      }
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);

  return null;
}
