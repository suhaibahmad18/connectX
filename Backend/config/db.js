import mongoose from "mongoose";
import { env } from "./env.js";

// Driver errors can echo parts of the connection string; never let credentials reach the logs.
export const redactMongoError = (error) =>
  String(error?.message ?? error).replace(
    /mongodb(\+srv)?:\/\/[^@\s]+@/gi,
    "mongodb$1://<redacted>@"
  );

export const connectDB = async () => {
  mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));
  mongoose.connection.on("reconnected", () => console.log("MongoDB reconnected"));
  mongoose.connection.on("error", (error) =>
    console.error("MongoDB error:", redactMongoError(error))
  );

  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 10000 });
  console.log("Connected to MongoDB");
};
