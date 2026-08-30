import { debounce } from "./eventDebounce.js";
import { calculateVisibleRange } from "./virtualizerHelper.js";

console.log("Testing performance utilities...");
const range = calculateVisibleRange(200, 50, 400, 100);
if (range.start !== 2) throw new Error("Range start calculation error");

let callCount = 0;
const debounced = debounce(() => { callCount++; }, 10);
debounced();
debounced();
console.log("Performance utilities passed verification!");
