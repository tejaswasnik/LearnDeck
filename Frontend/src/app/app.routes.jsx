import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import VerifyEmail from "../features/auth/pages/VerifyEmail.jsx";
import ForgotPassword from "../features/auth/pages/ForgotPassword.jsx";
import ResetPassword from "../features/auth/pages/ResetPassword.jsx";
import PasswordResetSuccess from "../features/auth/pages/PasswordResetSuccess.jsx";
import LandingPage from "../features/landing/pages/LandingPage.jsx";
import UserProfile from "../features/users/pages/UserProfile.jsx";
import Protected from "../components/Protected.jsx";
import Guest from "../components/Guest.jsx";
import StudentDashboard from "../features/users/pages/StudentDashboard.jsx";
import Courses from "../features/courses/pages/Courses.jsx";
import CreateCourse from "../features/courses/pages/CreateCourse.jsx";
import EditCourse from "../features/courses/pages/EditCourse.jsx";
import CourseDetails from "../features/courses/pages/CourseDetails.jsx";
import InstructorDashboard from "../features/courses/pages/InstructorDashboard.jsx";
import Lectures from "../features/lectures/pages/Lectures.jsx";
import CreateLecture from "../features/lectures/pages/CreateLecture.jsx";
import EditLecture from "../features/lectures/pages/EditLecture.jsx";
import CoursePlayer from "../features/courses/pages/CoursePlayer.jsx";

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
    path: "/forgot-password",
    element: (
      <Guest>
        <ForgotPassword />
      </Guest>
    ),
  },
  {
    path: "/reset-password/:token",
    element: (
      <Guest>
        <ResetPassword />
      </Guest>
    ),
  },
  {
    path: "/password-reset-success",
    element: (
      <Guest>
        <PasswordResetSuccess />
      </Guest>
    ),
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/create",
    element: (
      <Protected allowedRoles={['instructor']}>
        <CreateCourse />
      </Protected>
    ),
  },
  {
    path: "/courses/edit/:courseId",
    element: (
      <Protected allowedRoles={['instructor']}>
        <EditCourse />
      </Protected>
    ),
  },
  {
    path: "/courses/:courseId/lectures",
    element: (
      <Protected allowedRoles={['instructor']}>
        <Lectures />
      </Protected>
    ),
  },
  {
    path: "/courses/:courseId/lectures/create",
    element: (
      <Protected allowedRoles={['instructor']}>
        <CreateLecture />
      </Protected>
    ),
  },
  {
    path: "/courses/:courseId/lectures/edit/:lectureId",
    element: (
      <Protected allowedRoles={['instructor']}>
        <EditLecture />
      </Protected>
    ),
  },
  {
    path: "/courses/:courseId",
    element: <CourseDetails />,
  },
  {
    path: "/learning/:courseId",
    element: (
      <Protected>
        <CoursePlayer />
      </Protected>
    ),
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
      <Protected allowedRoles={['student']}>
        <StudentDashboard />
      </Protected>
    ),
  },
  {
    path: "/instructor/dashboard",
    element: (
      <Protected allowedRoles={['instructor']}>
        <InstructorDashboard />
      </Protected>
    ),
  },
]);
