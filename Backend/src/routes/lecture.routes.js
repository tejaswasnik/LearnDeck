import express from "express";
import multer from "multer";
import {
  createLectureController,
  updateLectureController,
  deleteLectureController,
  getLecturesByCourseController,
  getLectureByIdController,
} from "../controllers/lecture.controller.js";
import { instructorAuth, authMiddleware } from "../middlewares/auth.middleware.js";

const lectureRouter = express.Router();
const uploadVideo = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500 * 1024 * 1024 },
});

lectureRouter.post(
  "/create",
  instructorAuth,
  uploadVideo.single("video"),
  createLectureController
);

lectureRouter.patch(
  "/update/:lectureId",
  instructorAuth,
  uploadVideo.single("video"),
  updateLectureController
);

lectureRouter.delete(
  "/:lectureId",
  instructorAuth,
  deleteLectureController
);

lectureRouter.get(
  "/course/:courseId",
  authMiddleware,
  getLecturesByCourseController
);

lectureRouter.get(
  "/:lectureId",
  authMiddleware,
  getLectureByIdController
);

export default lectureRouter;