export const buildBreadcrumbSchema = (breadcrumbs = []) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: b.label,
      item: `https://mayleki.com${b.link || ""}`,
    })),
  };
};
