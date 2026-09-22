// ─────────────────────────────────────────────────────────────
//  Mayleki — Open Graph / Twitter Card / JSON-LD Meta Builder
//  Covers: Home, Product, Category, AI Stylist pages
// ─────────────────────────────────────────────────────────────

const SITE_DEFAULTS = {
  siteName: "Mayleki",
  title: "Mayleki — Luxury Imitation Jewellery",
  description:
    "Handcrafted bridal jewellery rentals & 1GM gold masterpieces. Shop Kundan, Temple, Polki & American Diamond sets.",
  image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200&q=80",
  url: "https://mayleki.com",
  locale: "en_IN",
  twitterHandle: "@mayleki",
};

// ─── 1. Open Graph Tags ─────────────────────────────────────

/**
 * Returns a flat object of all Open Graph + Twitter Card meta properties.
 *
 * @param {object} options
 * @param {string} [options.title]
 * @param {string} [options.description]
 * @param {string} [options.imageUrl]
 * @param {string} [options.url]
 * @param {'website'|'product'|'article'} [options.type]
 * @param {string} [options.siteName]
 * @param {string} [options.locale]
 * @param {number|string} [options.price]       — for product pages
 * @param {string} [options.currency]           — for product pages (default INR)
 * @param {string} [options.availability]       — 'instock' | 'oos'
 * @returns {Record<string, string>}
 */
export const getOpenGraphMeta = ({
  title,
  description,
  imageUrl,
  url,
  type = "website",
  siteName,
  locale,
  price,
  currency = "INR",
  availability,
} = {}) => {
  const resolvedTitle = title || SITE_DEFAULTS.title;
  const resolvedDesc = description || SITE_DEFAULTS.description;
  const resolvedImage = imageUrl || SITE_DEFAULTS.image;
  const resolvedUrl = url || SITE_DEFAULTS.url;
  const resolvedSiteName = siteName || SITE_DEFAULTS.siteName;
  const resolvedLocale = locale || SITE_DEFAULTS.locale;

  const meta = {
    // ── Open Graph ────────────────────────────────────────────
    "og:type": type,
    "og:site_name": resolvedSiteName,
    "og:locale": resolvedLocale,
    "og:title": resolvedTitle,
    "og:description": resolvedDesc,
    "og:image": resolvedImage,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": resolvedTitle,
    "og:url": resolvedUrl,

    // ── Twitter Card ──────────────────────────────────────────
    "twitter:card": "summary_large_image",
    "twitter:site": SITE_DEFAULTS.twitterHandle,
    "twitter:title": resolvedTitle,
    "twitter:description": resolvedDesc,
    "twitter:image": resolvedImage,
    "twitter:image:alt": resolvedTitle,
  };

  // ── Product-specific OG tags ────────────────────────────────
  if (type === "product") {
    if (price !== undefined) {
      meta["product:price:amount"] = String(price);
      meta["product:price:currency"] = currency;
    }
    if (availability) {
      meta["product:availability"] = availability;
    }
  }

  return meta;
};

// ─── 2. JSON-LD Structured Data ─────────────────────────────

/**
 * Returns a JSON-LD <script> string for WebSite (home) or Product pages.
 *
 * @param {'website'|'product'|'organization'} schemaType
 * @param {object} data  – page-specific fields
 * @returns {string}     – stringified JSON-LD object
 */
export const getJsonLd = (schemaType = "website", data = {}) => {
  const base = { "@context": "https://schema.org" };

  if (schemaType === "website") {
    return JSON.stringify({
      ...base,
      "@type": "WebSite",
      name: SITE_DEFAULTS.siteName,
      url: SITE_DEFAULTS.url,
      description: SITE_DEFAULTS.description,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_DEFAULTS.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });
  }

  if (schemaType === "organization") {
    return JSON.stringify({
      ...base,
      "@type": "Organization",
      name: "Mayleki Imitation Jewellery",
      url: SITE_DEFAULTS.url,
      logo: `${SITE_DEFAULTS.url}/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-91392-36500",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      sameAs: [
        "https://www.instagram.com/mayleki",
        "https://www.facebook.com/mayleki",
      ],
    });
  }

  if (schemaType === "product") {
    const {
      name,
      description,
      image,
      sku,
      price,
      currency = "INR",
      availability = "https://schema.org/InStock",
      url,
      brand = "Mayleki",
      rating,
      reviewCount,
    } = data;

    const schema = {
      ...base,
      "@type": "Product",
      name,
      description,
      image: Array.isArray(image) ? image : [image],
      sku,
      brand: { "@type": "Brand", name: brand },
      offers: {
        "@type": "Offer",
        url: url || SITE_DEFAULTS.url,
        priceCurrency: currency,
        price: String(price),
        availability,
        seller: { "@type": "Organization", name: "Mayleki" },
      },
    };

    if (rating) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: String(rating),
        bestRating: "5",
        reviewCount: String(reviewCount || 1),
      };
    }

    return JSON.stringify(schema);
  }

  return JSON.stringify({ ...base, "@type": "WebPage", url: SITE_DEFAULTS.url });
};

// ─── 3. DOM Injector (for React apps without SSR) ────────────

/**
 * Injects Open Graph + Twitter Card <meta> tags into document.head.
 * Call this inside a useEffect on page mount.
 *
 * @param {ReturnType<typeof getOpenGraphMeta>} metaObj
 */
export const injectMetaTags = (metaObj) => {
  if (typeof document === "undefined") return;

  Object.entries(metaObj).forEach(([property, content]) => {
    // Remove existing tag with same property to avoid duplicates
    const existing = document.querySelector(
      `meta[property="${property}"], meta[name="${property}"]`
    );
    if (existing) existing.remove();

    const tag = document.createElement("meta");
    // Twitter uses name=, OG uses property=
    if (property.startsWith("twitter:")) {
      tag.setAttribute("name", property);
    } else {
      tag.setAttribute("property", property);
    }
    tag.setAttribute("content", content);
    document.head.appendChild(tag);
  });
};

/**
 * Injects a JSON-LD <script> into document.head.
 * @param {string} jsonLdString – output of getJsonLd()
 * @param {string} [id]         – optional element id to prevent duplicates
 */
export const injectJsonLd = (jsonLdString, id = "mayleki-jsonld") => {
  if (typeof document === "undefined") return;

  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = jsonLdString;
  document.head.appendChild(script);
};

// ─── 4. Convenience per-page builders ───────────────────────

/** Home page meta */
export const getHomeMeta = () =>
  getOpenGraphMeta({ type: "website" });

/** Product detail page meta */
export const getProductMeta = ({ title, description, imageUrl, url, price, slug }) =>
  getOpenGraphMeta({
    title: `${title} — Mayleki`,
    description,
    imageUrl,
    url: url || `${SITE_DEFAULTS.url}/products/${slug}`,
    type: "product",
    price,
  });

/** Category page meta */
export const getCategoryMeta = ({ categoryName, description, imageUrl, slug }) =>
  getOpenGraphMeta({
    title: `${categoryName} Collection — Mayleki`,
    description: description || `Shop our ${categoryName} collection. Handcrafted bridal jewellery rentals & purchases.`,
    imageUrl,
    url: `${SITE_DEFAULTS.url}/collections/${slug}`,
    type: "website",
  });
