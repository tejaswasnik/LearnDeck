import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
    },
    isPreviewFree: {
      type: Boolean,
      default: false,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
  },
  { timestamps: true },
);

const lectureModel = mongoose.model("lectures", lectureSchema);

export default lectureModel;
