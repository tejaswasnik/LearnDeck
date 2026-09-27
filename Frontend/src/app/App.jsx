import { routes } from "./app.routes.jsx";
import { RouterProvider } from "react-router";
import useAuth from "../features/auth/hook/useAuth.js";
import { useEffect } from "react";
const App = () => {
  const { handleGetMe } = useAuth();
  useEffect(() => {
    handleGetMe();
  }, []);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
