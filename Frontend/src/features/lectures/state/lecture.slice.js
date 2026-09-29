import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
  name: "lectures",
  initialState: {
    lectures: null,
    loading: false,
    error: null,
    lectureDetails: null,
  },
  reducers: {
    setLectures: (state, action) => {
      state.lectures = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLectureDetails: (state, action) => {
      state.lectureDetails = action.payload;
    },
  },
});

export const { setLectures, setLoading, setError, setLectureDetails } =
  lectureSlice.actions;
export default lectureSlice.reducer;
