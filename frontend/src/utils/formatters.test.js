import { formatCurrency, truncateText } from "./formatters.js";

console.log("Testing frontend formatters...");

const formatted = formatCurrency(2500);
if (!formatted.includes("2,500")) throw new Error(`Unexpected format: ${formatted}`);

const truncated = truncateText("Royal Kundan Bridal Necklace with Pearls", 15);
if (!truncated.endsWith("...")) throw new Error("Truncate test failed");

console.log("Frontend formatters test passed successfully!");
