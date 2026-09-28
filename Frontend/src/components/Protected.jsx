import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAuth from "../features/auth/hook/useAuth.js";

const Protected = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  const { handleGetMe } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        await handleGetMe();
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [user]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#333] border-t-[#b8ff00] rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'instructor') {
      return <Navigate to="/instructor/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default Protected;
