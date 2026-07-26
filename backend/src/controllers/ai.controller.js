import aiService from "../services/ai.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

class AIController {
  submitChat = async (req, res, next) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        throw new ApiError(400, "Message body parameter is required and must be a string.");
      }

      // 1. Security: Limit maximum message length to prevent resource exhaustion
      if (message.length > 800) {
        throw new ApiError(400, "Message length exceeds maximum limit of 800 characters.");
      }

      // 2. Security: Basic prompt injection checker
      const lowerMessage = message.toLowerCase();
      const injectionPatterns = [
        "ignore previous",
        "system prompt",
        "you are now a",
        "forget your instructions"
      ];
      const detected = injectionPatterns.some((pattern) => lowerMessage.includes(pattern));

      if (detected) {
        throw new ApiError(400, "Security validation failed. Message matches banned injection phrases.");
      }

      // 3. Request reply from NVIDIA NIM Llama model
      const reply = await aiService.getChatReply(message);

      new ApiResponse(200, { reply }, "AI reply successfully compiled.").send(res);
    } catch (error) {
      next(new ApiError(error.statusCode || 500, error.message || "Failed to process chat completion."));
    }
  };
}

export default new AIController();
