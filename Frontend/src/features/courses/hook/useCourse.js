import { useDispatch } from "react-redux";
import { setCourses, setLoading, setError } from "../state/course.slice.js";
import {
  createCourse,
  updateCourse,
  getCourseById,
  getAllCourses,
  deleteCourse,
} from "../service/course.api.js";

const useCourse = () => {
  const dispatch = useDispatch();
  const handleCreateCourse = async (courseData) => {
    try {
      dispatch(setLoading(true));
      const data = await createCourse(courseData);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleUpdateCourse = async (courseId, courseData) => {
    try {
      dispatch(setLoading(true));
      const data = await updateCourse(courseId, courseData);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleGetCourseById = async (courseId) => {
    try {
      dispatch(setLoading(true));
      const data = await getCourseById(courseId);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleGetAllCourses = async (params = {}) => {
    try {
      dispatch(setLoading(true));
      const data = await getAllCourses(params);
      dispatch(setCourses(data));
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleDeleteCourse = async (courseId) => {
    try {
      dispatch(setLoading(true));
      const data = await deleteCourse(courseId);
      return data;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    handleCreateCourse,
    handleUpdateCourse,
    handleGetCourseById,
    handleGetAllCourses,
    handleDeleteCourse,
  };
};

export default useCourse;