import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to if you wanted to improve this later.
    return <Navigate to="/login" replace />;
  }

  // If children are passed (e.g., wrapping a single component), render them,
  // Otherwise render an <Outlet /> to support nested route definitions.
  return children ? children : <Outlet />;
};

export default Protected;
