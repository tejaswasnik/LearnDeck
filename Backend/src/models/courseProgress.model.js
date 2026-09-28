import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lectures",
      },
    ],
    lastWatchedLecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lectures",
    },
    progressPercentage: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

courseProgressSchema.index({ student: 1, course: 1 }, { unique: true });

const CourseProgressModel = mongoose.model("courseProgress", courseProgressSchema);

export default CourseProgressModel;
