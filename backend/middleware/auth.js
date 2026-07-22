import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header or cookie
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated. Please login." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mayleki_secret_2025");
    const user = await User.findById(decoded.id).select("-password -refreshToken");

    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: "User not found or deactivated." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

// Restrict to roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires one of: ${roles.join(", ")}`,
      });
    }
    next();
  };
};

// Optional auth (attach user if token present, but don't require it)
export const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "mayleki_secret_2025");
      req.user = await User.findById(decoded.id).select("-password");
    }
    next();
  } catch {
    next();
  }
};
