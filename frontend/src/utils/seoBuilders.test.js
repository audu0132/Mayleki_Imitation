import { getCanonicalUrl } from "./canonicalTag.js";
import { getOpenGraphMeta } from "./openGraphBuilder.js";

console.log("Testing SEO metadata generators...");
const canonical = getCanonicalUrl("/products?page=2");
if (canonical !== "https://mayleki.com/products") throw new Error("Canonical stripping error");

const og = getOpenGraphMeta({ title: "Bridal Sets" });
if (og["og:title"] !== "Bridal Sets") throw new Error("OG title mismatch");
console.log("SEO builders passed verification!");
