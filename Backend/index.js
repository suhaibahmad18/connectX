import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./route/user.route.js";

const app = express();
dotenv.config();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Database connection
const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("MongoDB Connected");
} catch (error) {
  console.log(error);
}

// Routes
app.use("/api/user", userRoute);

// Server start
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
