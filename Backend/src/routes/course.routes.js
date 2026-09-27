import express from "express";
import {
  createCourseController,
  updateCourseController,
  getCourseByIdController,
  getAllCoursesController,
  deleteCourseController,
  getInstructorCoursesController,
} from "../controllers/course.controller.js";
import { instructorAuth } from "../middlewares/auth.middleware.js";
import multer from "multer";

const courseRouter = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

courseRouter.post(
  "/create",
  instructorAuth,
  upload.single("courseThumbnail"),
  createCourseController,
);
courseRouter.patch(
  "/update/:courseId",
  instructorAuth,
  upload.single("courseThumbnail"),
  updateCourseController,
);
courseRouter.get("/:courseId", getCourseByIdController);
courseRouter.get("/", getAllCoursesController);
courseRouter.get("/instructor/courses", instructorAuth, getInstructorCoursesController);
courseRouter.delete("/:courseId", instructorAuth, deleteCourseController);
export default courseRouter;
