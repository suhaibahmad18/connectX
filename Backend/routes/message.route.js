import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import validate from "../middleware/validate.js";
import { messageLimiter } from "../middleware/rateLimiters.js";
import {
  conversationParamsSchema,
  messagePageQuerySchema,
  sendMessageSchema,
} from "../validation/schemas.js";

const router = express.Router();

router.get(
  "/:conversationId",
  secureRoute,
  validate({ params: conversationParamsSchema, query: messagePageQuerySchema }),
  getMessages
);
router.post(
  "/:conversationId",
  secureRoute,
  messageLimiter,
  validate({ params: conversationParamsSchema, body: sendMessageSchema }),
  sendMessage
);

export default router;
