import express from "express";
import { startPrivateConversation } from "../controller/conversation.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import validate from "../middleware/validate.js";
import { startPrivateConversationSchema } from "../validation/schemas.js";

const router = express.Router();

router.post(
  "/private",
  secureRoute,
  validate({ body: startPrivateConversationSchema }),
  startPrivateConversation
);

export default router;
