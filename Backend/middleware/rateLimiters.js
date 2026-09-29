import { rateLimit } from "express-rate-limit";

const limiter = (options, error) =>
  rateLimit({
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error },
    ...options,
  });

// Only failed attempts count, so normal logins are never throttled.
export const loginLimiter = limiter(
  { windowMs: 15 * 60 * 1000, limit: 10, skipSuccessfulRequests: true },
  "Too many failed login attempts. Please try again in 15 minutes."
);

export const signupLimiter = limiter(
  { windowMs: 60 * 60 * 1000, limit: 20 },
  "Too many signup attempts. Please try again later."
);

// Keyed per authenticated user (must run after secureRoute) so users behind one NAT don't share a quota.
export const messageLimiter = limiter(
  { windowMs: 60 * 1000, limit: 60, keyGenerator: (req) => String(req.user._id) },
  "You are sending messages too quickly. Please slow down."
);
