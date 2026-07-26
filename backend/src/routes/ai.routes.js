import { Router } from "express";
import aiController from "../controllers/ai.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Route: POST /api/v1/ai/chat
// Protected by JWT Auth and limited by AI rate limiter
router.post("/chat", protect, aiRateLimiter, aiController.submitChat);

export default router;
