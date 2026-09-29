import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { env } from "../config/env.js";

export const AUTH_COOKIE_NAME = "jwt";

// Shared by HTTP routes and the Socket.IO handshake. Returns null for any invalid/expired token.
export const getUserFromToken = async (token) => {
  if (!token || typeof token !== "string") return null;

  let decoded;
  try {
    decoded = jwt.verify(token, env.jwtSecret, { algorithms: ["HS256"] });
  } catch {
    return null;
  }

  if (!decoded?.userId || !/^[a-f\d]{24}$/i.test(decoded.userId)) return null;
  return User.findById(decoded.userId).lean();
};

const secureRoute = async (req, res, next) => {
  try {
    const user = await getUserFromToken(req.cookies?.[AUTH_COOKIE_NAME]);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default secureRoute;
