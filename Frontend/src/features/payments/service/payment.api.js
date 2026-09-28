import axios from "axios";

const paymentApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function createOrder(courseId) {
  try {
    const response = await paymentApi.post("/payments/create-order", {
      courseId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}

export async function verifyPayment(paymentData) {
  try {
    const response = await paymentApi.post("/payments/verify", paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
