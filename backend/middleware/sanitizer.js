/**
 * Input sanitization helper to strip leading dollar operators ($)
 */

export const sanitizeInputs = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key of Object.keys(req.body)) {
      if (key.startsWith("$")) {
        delete req.body[key];
      }
    }
  }
  next();
};
