import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import VerifyEmail from "../features/auth/pages/VerifyEmail.jsx";
import LandingPage from "../features/landing/pages/LandingPage.jsx";
import UserProfile from "../features/users/pages/UserProfile.jsx";
import Protected from "../components/Protected.jsx";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
  {
    path: "/me",
    element: <Protected>
      <UserProfile />
    </Protected>,
  }
]);
