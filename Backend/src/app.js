import express from "express";
import authRouter from "../src/routes/auth.routes.js";
import userRouter from "../src/routes/user.routes.js";
import courseRouter from "../src/routes/course.routes.js";
import lectureRouter from "../src/routes/lecture.routes.js";
import paymentRouter from "../src/routes/order.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";
import config from "./config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleStrategyCallback } from "./controllers/auth.controller.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: config.frontendURL,
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
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/lectures", lectureRouter);
app.use("/api/payments", paymentRouter);
export default app;
