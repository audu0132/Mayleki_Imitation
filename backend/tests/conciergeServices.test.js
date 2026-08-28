import { generateVoucherCode } from "../services/voucherGenerator.js";
import { analyzeSentiment } from "../services/reviewSentimentService.js";

console.log("Testing concierge services...");
const voucher = generateVoucherCode();
if (!voucher.startsWith("BRIDE-")) throw new Error("Voucher prefix test failed");

const sentiment = analyzeSentiment("The choker was royal and stunning for my wedding");
if (!sentiment.autoApprove) throw new Error("Sentiment scoring test failed");
console.log("Concierge services passed verification!");
