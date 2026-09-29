import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import userRoute from "./routes/user.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.disable("x-powered-by");
if (env.trustProxy) app.set("trust proxy", env.trustProxy);

app.use(cors({ origin: env.clientOrigins, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

app.use(notFound);
app.use(errorHandler);

export default app;
