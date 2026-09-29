import axios from "axios";
const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function registerUser(userData) {
  try {
    const response = await authApi.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function loginUser(credentials) {
  try {
    const response = await authApi.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function getMe() {
  try {
    const response = await authApi.get("/auth/getme");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function verifyEmail(token) {
  try {
    const response = await authApi.post("/auth/verify-email", { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function logoutUser() {
  try {
    const response = await authApi.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function googleAuth() {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
}

export async function forgotPassword(email) {
  try {
    const response = await authApi.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function resetPassword(token, password) {
  try {
    const response = await authApi.post(`/auth/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
