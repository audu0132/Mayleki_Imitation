/**
 * Basic assertion tests for rental mathematical calculations
 */

import { calculateRefundableDeposit } from "../services/depositService.js";
import { calculateBridalPackageDiscount } from "../services/bundleService.js";

console.log("Running rental calculations tests...");

const deposit = calculateRefundableDeposit(12000);
if (deposit !== 3000) throw new Error(`Expected deposit 3000, got ${deposit}`);

const bundle = calculateBridalPackageDiscount(3, 4000);
if (bundle.discountPercent !== 15) throw new Error(`Expected 15% discount, got ${bundle.discountPercent}`);

console.log("All rental calculations tests passed!");
