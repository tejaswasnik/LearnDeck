import React from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../state/auth.slice.js";
import { loginUser, registerUser, getMe } from "../service/auth.api.js";
const useAuth = () => {
  const dispatch = useDispatch();
  async function handleRegister(userData) {
    try {
      dispatch(setLoading(true));
      const data = await registerUser(userData);
      dispatch(setUser(data));
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
  const handleLogin = async (credentials) => {
    try {
      dispatch(setLoading(true));
      const data = await loginUser(credentials);
      dispatch(setUser(data));
    } catch (error) {
      console.error("Error logging in user:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return { handleRegister, handleLogin, handleGetMe };
};

export default useAuth;
