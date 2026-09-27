import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import VerifyEmail from "../features/auth/pages/VerifyEmail.jsx";
import LandingPage from "../features/landing/pages/LandingPage.jsx";
import UserProfile from "../features/users/pages/UserProfile.jsx";
import Protected from "../components/Protected.jsx";
import Guest from "../components/Guest.jsx";
import StudentDashboard from "../features/users/pages/StudentDashboard.jsx";
import Courses from "../features/courses/pages/Courses.jsx";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: "/register",
    element: (
      <Guest>
        <Register />
      </Guest>
    ),
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/me",
    element: (
      <Protected>
        <UserProfile />
      </Protected>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <StudentDashboard />
      </Protected>
    ),
  },
]);
