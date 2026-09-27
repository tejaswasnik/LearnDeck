import { createBrowserRouter } from "react-router";
import Login from "../features/pages/Login.jsx";
import Register from "../features/pages/Register.jsx";
import VerifyEmail from "../features/pages/VerifyEmail.jsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Landing Page</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);
