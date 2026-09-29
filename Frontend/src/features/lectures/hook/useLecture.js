import { useDispatch } from "react-redux";
import { setLectures, setLoading, setError } from "../state/lecture.slice.js";
import {
  getLecturesByCourseId,
  deleteLecture,
  createLecture,
  updateLecture,
  getLectureById,
} from "../service/lecture.api.js";

const useLecture = () => {
  const dispatch = useDispatch();

  const handleGetLecturesByCourseId = async (courseId) => {
    try {
      dispatch(setLoading(true));
      const data = await getLecturesByCourseId(courseId);
      dispatch(setLectures(data));
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCreateLecture = async (formData) => {
    try {
      dispatch(setLoading(true));
      const data = await createLecture(formData);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateLecture = async (lectureId, formData) => {
    try {
      dispatch(setLoading(true));
      const data = await updateLecture(lectureId, formData);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetLectureById = async (lectureId) => {
    try {
      dispatch(setLoading(true));
      const data = await getLectureById(lectureId);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    try {
      dispatch(setLoading(true));
      const data = await deleteLecture(lectureId);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleGetLecturesByCourseId,
    handleCreateLecture,
    handleUpdateLecture,
    handleGetLectureById,
    handleDeleteLecture,
  };
};

export default useLecture;
