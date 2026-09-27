import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in the environment variables.");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}
if (!process.env.GMAIL_CLIENT_ID) {
  throw new Error(
    "GMAIL_CLIENT_ID is not defined in the environment variables.",
  );
}
if (!process.env.GMAIL_CLIENT_SECRET) {
  throw new Error(
    "GMAIL_CLIENT_SECRET is not defined in the environment variables.",
  );
}

if (!process.env.GMAIL_REFRESH_TOKEN) {
  throw new Error(
    "GMAIL_REFRESH_TOKEN is not defined in the environment variables.",
  );
}
if (!process.env.GMAIL_USER) {
  throw new Error("GMAIL_USER is not defined in the environment variables.");
}
if (!process.env.REDIS_HOST) {
  throw new Error("REDIS_HOST is not defined in the environment variables.");
}
if (!process.env.REDIS_PORT) {
  throw new Error("REDIS_PORT is not defined in the environment variables.");
}
if (!process.env.REDIS_USERNAME) {
  throw new Error(
    "REDIS_USERNAME is not defined in the environment variables.",
  );
}
if (!process.env.REDIS_PASSWORD) {
  throw new Error(
    "REDIS_PASSWORD is not defined in the environment variables.",
  );
}
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error(
    "GOOGLE_CLIENT_ID is not defined in the environment variables.",
  );
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "GOOGLE_CLIENT_SECRET is not defined in the environment variables.",
  );
}

const config = {
  PORT: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  gmailClientId: process.env.GMAIL_CLIENT_ID,
  gmailClientSecret: process.env.GMAIL_CLIENT_SECRET,
  gmailRefreshToken: process.env.GMAIL_REFRESH_TOKEN,
  gmailUser: process.env.GMAIL_USER,
  frontendURL: process.env.FRONTEND_URL || "http://localhost:5173",
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisUsername: process.env.REDIS_USERNAME,
  redisPassword: process.env.REDIS_PASSWORD,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

export default config;
