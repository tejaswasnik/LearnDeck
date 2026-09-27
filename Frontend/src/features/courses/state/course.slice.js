import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: null,
    loading: false,
    error: null,
    courseDetails: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCourseDetails: (state, action) => {
      state.courseDetails = action.payload;
    },
  },
});

export const { setCourses, setLoading, setError, setCourseDetails } =
  courseSlice.actions;
export default courseSlice.reducer;
