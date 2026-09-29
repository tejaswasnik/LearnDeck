import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice.js";
import courseReducer from "../features/courses/state/course.slice.js";
import lectureReducer from "../features/lectures/state/lecture.slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    lecture: lectureReducer,
  },
});
