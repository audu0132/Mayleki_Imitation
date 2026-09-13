/**
 * Memory-based sliding window rate limiter
 */

const hitCounts = new Map();

export const createRateLimiter = ({ windowMs = 60000, maxRequests = 100, message = "Too many requests" } = {}) => {
  return (req, res, next) => {
    const key = req.ip || "global";
    const now = Date.now();
    const windowStart = now - windowMs;

    const requestTimestamps = (hitCounts.get(key) || []).filter((t) => t > windowStart);

    if (requestTimestamps.length >= maxRequests) {
      return res.status(429).json({ success: false, message });
    }

    requestTimestamps.push(now);
    hitCounts.set(key, requestTimestamps);
    next();
  };
};

export const apiRateLimiter = createRateLimiter({ windowMs: 60000, maxRequests: 120 });
export const authRateLimiter = createRateLimiter({ windowMs: 60000 * 15, maxRequests: 20, message: "Too many login attempts. Please try again later." });
