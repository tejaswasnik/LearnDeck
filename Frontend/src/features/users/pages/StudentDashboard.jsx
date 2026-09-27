import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Navbar from "../../../components/Navbar.jsx";

export default function StudentDashboard() {
    const user = useSelector((state) => state.auth.user);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [stats, setStats] = useState({
        totalEnrolled: 0,
        completed: 0,
        inProgress: 0,
    });

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    useEffect(() => {
        if (user?.enrolledCourses) {
            setEnrolledCourses(user.enrolledCourses);
            setStats({
                totalEnrolled: user.enrolledCourses.length,
                completed: 0,
                inProgress: user.enrolledCourses.length,
            });
        } else {
            setStats({
                totalEnrolled: 0,
                completed: 0,
                inProgress: 0,
            });
            setEnrolledCourses([]);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8 mt-16">
                {/* Session Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-[#7ED321] rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                        Active Session · Student Portal
                    </span>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Student Dashboard
                        </h1>
                        <p className="text-gray-400">
                            {getGreeting()}, {user?.name || "Tejas"} Keep making progress
                            toward your learning goals.
                        </p>
                    </div>
                    <Link
                        to="/courses"
                        className="px-5 py-2.5 bg-[#7ED321] hover:bg-[#6BC01F] text-black font-semibold rounded-lg flex items-center gap-2 transition-colors self-start md:self-auto"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                        Explore Catalog
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Total Enrolled Courses */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl p-6 border border-[#262626] hover:border-[#7ED321]/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-sm text-gray-400 font-medium">
                                Total Enrolled Courses
                            </h3>
                            <div className="p-2 bg-[#262626] rounded-lg">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-5xl font-bold text-white">
                                {stats.totalEnrolled}
                            </span>
                            <span className="px-3 py-1 bg-[#262626] text-gray-400 text-xs font-medium rounded-full">
                                Curated Tracks
                            </span>
                        </div>
                    </div>

                    {/* Completed Courses */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl p-6 border border-[#262626] hover:border-[#7ED321]/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-sm text-gray-400 font-medium">
                                Completed Courses
                            </h3>
                            <div className="p-2 bg-[#7ED321]/10 rounded-lg">
                                <svg
                                    className="w-5 h-5 text-[#7ED321]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-5xl font-bold text-white">
                                {stats.completed}
                            </span>
                            <span className="px-3 py-1 bg-[#7ED321]/20 text-[#7ED321] text-xs font-semibold rounded-full">
                                Verified Credential
                            </span>
                        </div>
                    </div>

                    {/* Courses In Progress */}
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl p-6 border border-[#262626] hover:border-[#7ED321]/50 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-sm text-gray-400 font-medium">
                                Courses In Progress
                            </h3>
                            <div className="p-2 bg-[#7ED321]/10 rounded-lg">
                                <svg
                                    className="w-5 h-5 text-[#7ED321]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-5xl font-bold text-white">
                                {stats.inProgress}
                            </span>
                            <span className="px-3 py-1 bg-[#7ED321]/20 text-[#7ED321] text-xs font-medium rounded-full flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-[#7ED321] rounded-full animate-pulse"></div>
                                Active Focus
                            </span>
                        </div>
                    </div>
                </div>

                {/* My Enrolled Courses Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-white">
                                My Enrolled Courses
                            </h2>
                            <span className="px-2.5 py-1 bg-[#262626] text-gray-400 text-sm font-medium rounded-full">
                                {enrolledCourses.length}
                            </span>
                        </div>
                        <Link
                            to="/courses"
                            className="text-[#7ED321] hover:text-[#6BC01F] text-sm font-medium flex items-center gap-1 transition-colors"
                        >
                            View All
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                            </svg>
                        </Link>
                    </div>

                    {/* Empty State */}
                    {enrolledCourses.length === 0 && (
                        <div className="bg-[#1A1A1A] rounded-xl p-16 border border-[#262626] border-dashed">
                            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
                                <div className="w-16 h-16 bg-[#262626] rounded-xl flex items-center justify-center mb-6">
                                    <svg
                                        className="w-8 h-8 text-gray-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    You haven't enrolled in any courses yet
                                </h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Explore our curriculum designed for high-velocity software
                                    engineers, machine learning specialists, and systems
                                    designers.
                                </p>
                                <Link
                                    to="/courses"
                                    className="px-6 py-3 bg-[#7ED321] hover:bg-[#6BC01F] text-black font-semibold rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                    </svg>
                                    Browse Courses
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Course Cards Grid (when courses exist) */}
                    {enrolledCourses.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrolledCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-[#1A1A1A] rounded-xl p-6 border border-[#262626] hover:border-[#7ED321]/50 transition-all"
                                >
                                    {/* Course card content */}
                                    <div className="mb-4">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                                            {course.category}
                                        </span>
                                        <h3 className="text-lg font-bold text-white mt-2 mb-1">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {course.instructor}
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                            <span>Progress</span>
                                            <span className="font-semibold">
                                                {course.progress}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-[#262626] h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-[#7ED321] h-full rounded-full transition-all"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                    <Link
                                        to={`/courses/${course.id}`}
                                        className="w-full px-4 py-2 bg-[#262626] hover:bg-[#333333] text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        Continue Learning
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Component Test Suite Banner */}
            <footer className="border-t border-[#262626] bg-[#0F0F0F]">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                            </svg>
                            <span className="uppercase tracking-wider">
                                Component Test Suite · Preview Production States:
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            <button className="px-3 py-1 bg-[#262626] hover:bg-[#333333] text-gray-300 rounded transition-colors">
                                Populated (3)
                            </button>
                            <button className="px-3 py-1 bg-[#262626] hover:bg-[#333333] text-gray-300 rounded transition-colors">
                                Empty (0)
                            </button>
                            <button className="px-3 py-1 bg-[#262626] hover:bg-[#333333] text-gray-300 rounded transition-colors">
                                Skeleton Loading
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
