import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../auth/state/auth.slice.js";
import {
  updateUser,
  updatePassword,
  deleteUser,
  updateAvatar,
} from "../service/user.api.js";

const useUser = () => {
  const dispatch = useDispatch();

  const handleUpdateUser = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await updateUser(userData);
      dispatch(setUser(data.user)); // Extracted just the user object from the response
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleUpdatePassword = async (passwordData) => {
    try {
      dispatch(setLoading(true));
      const data = await updatePassword(passwordData);
      dispatch(setUser(data.user)); // Extracted just the user object from the response
    } catch (error) {
      console.error("Error updating password:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(setLoading(true));
      await deleteUser();
      dispatch(setUser(null)); // Clear user data on deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleUpdateAvatar = async (avatarFile) => {
    try {
      dispatch(setLoading(true));
      const data = await updateAvatar(avatarFile);
      dispatch(setUser(data.user)); // Extracted just the user object from the response
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    handleUpdateUser,
    handleUpdatePassword,
    handleDeleteUser,
    handleUpdateAvatar,
  };
};

export default useUser;