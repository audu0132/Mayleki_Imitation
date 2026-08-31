import { validateIndianMobile } from "../utils/phoneValidator.js";
import { validatePasswordStrength } from "../utils/passwordPolicy.js";
import { validateGstin } from "../utils/gstinValidator.js";

console.log("Running security validation tests...");
if (!validateIndianMobile("9876543210")) throw new Error("Mobile test failed");
if (!validatePasswordStrength("Mayleki@2026").valid) throw new Error("Password test failed");
if (!validateGstin("27AAECM9821L1ZM")) throw new Error("GSTIN test failed");
console.log("All security validation tests passed!");
