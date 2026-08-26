import { BANGLE_SIZE_CHART } from "../data/specs/bangleSizes.js";
import { validateJewelleryDimensions } from "../utils/dimensionValidator.js";

console.log("Validating catalog specs...");
if (BANGLE_SIZE_CHART.length !== 4) throw new Error("Bangle chart size mismatch");

const testDim = validateJewelleryDimensions({ lengthCm: 25, weightGrams: 60 });
if (!testDim.valid) throw new Error("Dimension test failed");
console.log("Catalog specs passed verification!");
