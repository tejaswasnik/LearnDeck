import express from "express";
import passport from "passport";
import {
  loginController,
  registerController,
  getMeController,
  logoutController,
  verifyEmailController,
  googleAuthCallbackController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/getme", authMiddleware, getMeController);
authRouter.post("/logout", logoutController);
authRouter.post("/verify-email", verifyEmailController);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuthCallbackController,
);
export default authRouter;
