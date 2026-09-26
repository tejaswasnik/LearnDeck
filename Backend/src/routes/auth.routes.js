import express from "express";
import {
  loginController,
  registerController,
  getMeController,
  logoutController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("getme", getMeController);
authRouter.post("/logout", logoutController);
authRouter.post("/verify-email", verifyEmailController);
export default authRouter;
