export const getCanonicalUrl = (pathname) => {
  const base = "https://mayleki.com";
  const cleanPath = pathname.split("?")[0].replace(/\/+$/, "");
  return `${base}${cleanPath || "/"}`;
};
