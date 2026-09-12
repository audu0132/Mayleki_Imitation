export const JEWELLERY_FALLBACK_IMAGE = 
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80';

export function getOptimizedImageUrl(url, width = 600) {
  if (!url) return JEWELLERY_FALLBACK_IMAGE;
  if (url.includes('images.unsplash.com')) {
    return `${url.split('?')[0]}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return url;
}

export function handleImageError(e) {
  e.target.onerror = null;
  e.target.src = JEWELLERY_FALLBACK_IMAGE;
}
