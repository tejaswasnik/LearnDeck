import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
    courseThumbnail: {
      type: String,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lectures",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    moderationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const courseModel = mongoose.model("courses", courseSchema);

export default courseModel;
