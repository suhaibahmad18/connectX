import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AUTH_COOKIE_NAME } from "../middleware/secureRoute.js";

const TOKEN_TTL_SECONDS = 10 * 24 * 60 * 60;

export const authCookieOptions = {
  httpOnly: true, // xss
  secure: true,
  sameSite: "strict", // csrf
  path: "/",
};

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId: String(userId) }, env.jwtSecret, {
    algorithm: "HS256",
    expiresIn: TOKEN_TTL_SECONDS,
  });
  res.cookie(AUTH_COOKIE_NAME, token, {
    ...authCookieOptions,
    maxAge: TOKEN_TTL_SECONDS * 1000,
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie(AUTH_COOKIE_NAME, authCookieOptions);
};

export default createTokenAndSaveCookie;
