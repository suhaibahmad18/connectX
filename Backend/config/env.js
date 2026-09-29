import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const required = ["MONGODB_URI", "JWT_TOKEN"];
if (isProduction) required.push("CLIENT_ORIGIN");

const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:4001";
const trustProxy = Number(process.env.TRUST_PROXY);

export const env = {
  isProduction,
  port: Number(process.env.PORT) || 5002,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_TOKEN,
  clientOrigins: clientOrigin
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  trustProxy: Number.isInteger(trustProxy) && trustProxy > 0 ? trustProxy : 0,
};
