import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { updateUserController } from "../controllers/user.controller.js";
import multer from "multer";
const userRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});
userRouter.patch("/me", authMiddleware, upload.single("avatar"), updateUserController);

export default userRouter;
