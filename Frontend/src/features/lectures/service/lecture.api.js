import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const lectureApi = axios.create({
  baseURL: `${API_URL}/lectures`,
  withCredentials: true,
});

export const getLecturesByCourseId = async (courseId) => {
  try {
    const response = await lectureApi.get(`/course/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteLecture = async (lectureId) => {
  try {
    const response = await lectureApi.delete(`/${lectureId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createLecture = async (formData) => {
  try {
    const response = await lectureApi.post('/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateLecture = async (lectureId, formData) => {
  try {
    const response = await lectureApi.patch(`/update/${lectureId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getLectureById = async (lectureId) => {
  try {
    const response = await lectureApi.get(`/${lectureId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
