import express from "express";
import authRouter from "../src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import passport from "passport";
import config from "./config/config.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { googleStrategyCallback } from "./controllers/auth.controller.js";
const app = express();
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
    googleStrategyCallback
  ),
);
app.use(cookieParser());
app.use("/api/auth", authRouter);
export default app;
