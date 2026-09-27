import { createBrowserRouter } from "react-router";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>Landing Page</h1>,
  },
  {
    path: "/login",
    element: <h1>Login Page</h1>,
  },
  {
    path: "/register",
    element: <h1>Register Page</h1>,
  },
]);
