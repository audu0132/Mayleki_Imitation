import { COLOR_PALETTE } from "./colors.js";
import { Z_INDEX } from "./zIndex.js";

console.log("Validating design system tokens...");
if (!COLOR_PALETTE.gold500.startsWith("#")) throw new Error("Invalid gold color code");
if (Z_INDEX.modal <= Z_INDEX.dropdown) throw new Error("Z-index hierarchy fault");
console.log("Design tokens validated successfully!");
