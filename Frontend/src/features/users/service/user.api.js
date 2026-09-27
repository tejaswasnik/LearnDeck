import axios from "axios";
const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function updateUser(userData) {
  try {
    const response = await userApi.patch("/users/me", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function updatePassword(passwordData) {
  try {
    const response = await userApi.patch("/users/me/password", passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function deleteUser() {
  try {
    const response = await userApi.delete("/users/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function updateAvatar(avatarFile) {
  try {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    const response = await userApi.patch("/users/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
