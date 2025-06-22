import express from "express";
import { signup, login, logout, getUserProfile } from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected route
router.get("/getUserProfile", secureRoute, getUserProfile);

export default router;
