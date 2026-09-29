import { z } from "zod";
import { MESSAGE_MAX_LENGTH } from "../models/message.model.js";

const OBJECT_ID = /^[a-f\d]{24}$/i;

const objectId = (label) =>
  z.string({ error: `${label} is required` }).regex(OBJECT_ID, `Invalid ${label}`);

const email = z
  .string({ error: "Email is required" })
  .trim()
  .toLowerCase()
  .max(254, "Email is too long")
  .email("Invalid email address");

export const signupSchema = z
  .object({
    fullname: z
      .string({ error: "Full name is required" })
      .trim()
      .min(1, "Full name is required")
      .max(50, "Full name must be at most 50 characters"),
    email,
    // bcrypt only uses the first 72 bytes of a password.
    password: z
      .string({ error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters"),
    confirmPassword: z.string({ error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email,
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required")
    .max(128, "Invalid user credential"),
});

export const startPrivateConversationSchema = z.object({
  userId: objectId("user id"),
});

export const conversationParamsSchema = z.object({
  conversationId: objectId("conversation id"),
});

export const sendMessageSchema = z.object({
  message: z
    .string({ error: "Message is required" })
    .trim()
    .min(1, "Message cannot be empty")
    .max(MESSAGE_MAX_LENGTH, `Message must be at most ${MESSAGE_MAX_LENGTH} characters`),
});

// Cursor = base64url("<createdAt ISO>_<messageId>") of the oldest message already delivered.
export const encodeCursor = (message) =>
  Buffer.from(`${new Date(message.createdAt).toISOString()}_${message._id}`).toString(
    "base64url"
  );

const cursor = z
  .string()
  .max(200, "Invalid cursor")
  .transform((value, ctx) => {
    const [iso, id] = Buffer.from(value, "base64url").toString("utf8").split("_");
    const createdAt = new Date(iso);
    if (!id || !OBJECT_ID.test(id) || Number.isNaN(createdAt.getTime())) {
      ctx.addIssue({ code: "custom", message: "Invalid cursor" });
      return z.NEVER;
    }
    return { createdAt, id };
  });

export const messagePageQuerySchema = z.object({
  limit: z.coerce
    .number({ error: "limit must be a number" })
    .int("limit must be an integer")
    .min(1, "limit must be between 1 and 100")
    .max(100, "limit must be between 1 and 100")
    .default(30),
  cursor: cursor.optional(),
});
