import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
import validate from "../middleware/validate.js";
import { loginLimiter, signupLimiter } from "../middleware/rateLimiters.js";
import { loginSchema, signupSchema } from "../validation/schemas.js";

const router = express.Router();

router.post("/signup", signupLimiter, validate({ body: signupSchema }), signup);
router.post("/login", loginLimiter, validate({ body: loginSchema }), login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);

export default router;
