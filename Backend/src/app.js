import express from "express";
import authRouter from "../src/routes/auth.routes.js";
import userRouter from "../src/routes/user.routes.js";
import courseRouter from "../src/routes/course.routes.js";
import lectureRouter from "../src/routes/lecture.routes.js";
import paymentRouter from "../src/routes/order.routes.js";
import adminRouter from "../src/routes/admin.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";
import config from "./config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleStrategyCallback } from "./controllers/auth.controller.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: config.purefrontendURL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId,
      clientSecret: config.googleClientSecret,
      callbackURL: "/api/auth/google/callback",
    },
    googleStrategyCallback,
  ),
);
app.use(cookieParser());

app.get(["/health", "/api/health"], (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/lectures", lectureRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message,
  });
});

export default app;
