import jwt from "jsonwebtoken";
import config from "../config/config.js";
import redis from "../config/cache.js";
export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const isBlacklisted = await redis.exists(token);

    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked.",
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
