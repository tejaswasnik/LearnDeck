import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../state/auth.slice.js";
import { loginUser, registerUser, getMe, logoutUser, googleAuth } from "../service/auth.api.js";
const useAuth = () => {
  const dispatch = useDispatch();
  async function handleRegister(userData) {
    try {
      dispatch(setLoading(true));
      const data = await registerUser(userData);
      dispatch(setUser(data.user)); // Extracted just the user object from the response
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
      dispatch(setUser(data.user)); // Extracted just the user object from the response
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
      dispatch(setUser(data.user)); // Extracted just the user object from the response
    } catch (error) {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      await logoutUser();
      dispatch(setUser(null));
    } catch (error) {
      console.error("Error logging out user:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleAuth = async () => {
    try {
      dispatch(setLoading(true));
      const data = await googleAuth();
      dispatch(setUser(data.user)); // Extracted just the user object from the response
    } catch (error) {
      console.error("Error with Google authentication:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
    handleGoogleAuth,
  };
};

export default useAuth;
