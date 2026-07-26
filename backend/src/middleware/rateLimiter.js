import rateLimit from "express-rate-limit";

// Rate limit helper: 15 requests per 15 minutes per IP address for AI queries
export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: {
    success: false,
    message: "Too many requests to the AI Coach engine. Please retry after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false
});
