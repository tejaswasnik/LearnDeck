import axios from "axios";
const courseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function createCourse(courseData) {
  try {
    const response = await courseApi.post("/courses/create", courseData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function updateCourse(courseId, courseData) {
  try {
    const response = await courseApi.patch(
      `/courses/update/${courseId}`,
      courseData,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getCourseById(courseId) {
  try {
    const response = await courseApi.get(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getAllCourses(params = {}) {
  try {
    const response = await courseApi.get("/courses", { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function deleteCourse(courseId) {
  try {
    const response = await courseApi.delete(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
