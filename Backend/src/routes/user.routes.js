import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  updateUserController,
  updatePasswordController,
  deleteUserController,
} from "../controllers/user.controller.js";
import multer from "multer";
const userRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});
userRouter.patch(
  "/me",
  authMiddleware,
  upload.single("avatar"),
  updateUserController,
);

userRouter.delete("/me", authMiddleware, deleteUserController);
userRouter.patch("/me/password", authMiddleware, updatePasswordController);
userRouter.patch("/me/forgot-password", authMiddleware, updatePasswordController);
export default userRouter;
