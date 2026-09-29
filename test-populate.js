import mongoose from "mongoose";
import courseModel from "./Backend/src/models/course.model.js";
import lectureModel from "./Backend/src/models/lecture.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./Backend/.env" });

async function test() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
  
  // Register models
  lectureModel; 

  const course = await courseModel.findById("6abbbf6de517fbc62d4bf00a").populate("lectures");
  console.log("Course lectures populated:");
  console.log(JSON.stringify(course.lectures, null, 2));

  process.exit(0);
}

test();
