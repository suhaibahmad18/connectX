import http from "http";
import mongoose from "mongoose";

import { env } from "./config/env.js";
import { connectDB, redactMongoError } from "./config/db.js";
import app from "./app.js";
import { initSocket } from "./SocketIO/server.js";

const server = http.createServer(app);
const io = initSocket(server);

try {
  await connectDB();
} catch (error) {
  console.error("Failed to connect to MongoDB:", redactMongoError(error));
  process.exit(1);
}

server.listen(env.port, () => {
  console.log(`Server is Running on port ${env.port}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down`);
  setTimeout(() => process.exit(1), 10000).unref();
  io.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
