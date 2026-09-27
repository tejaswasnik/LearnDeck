import { createBrowserRouter } from "react-router";
import Login from "../features/pages/Login.jsx";
import Register from "../features/pages/Register.jsx";
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
]);
