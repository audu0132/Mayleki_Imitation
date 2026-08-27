import { calculateWeekendSurge } from "../services/weekendSurgeService.js";
import { calculateLatePenalty } from "../services/lateReturnService.js";

console.log("Testing rental rate calculators...");
const surge = calculateWeekendSurge("2026-08-29"); // Saturday
if (!surge.isWeekend) throw new Error("Weekend detection failed");

const penalty = calculateLatePenalty(2, 500);
if (penalty !== 1500) throw new Error(`Expected penalty 1500, got ${penalty}`);
console.log("Rental rate tests passed successfully!");
