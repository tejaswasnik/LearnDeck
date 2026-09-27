import express from "express";
import {
  loginController,
  registerController,
  getMeController,
  logoutController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/getme", authMiddleware, getMeController);
authRouter.post("/logout", logoutController);
authRouter.post("/verify-email", verifyEmailController);
export default authRouter;