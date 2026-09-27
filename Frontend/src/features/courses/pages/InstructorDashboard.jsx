import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../../components/Navbar.jsx";
import useCourse from "../hook/useCourse.js";
import { updateCourse, deleteCourse as deleteCourseApi } from "../service/course.api.js";

export default function InstructorDashboard() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const { handleGetInstructorCourses } = useCourse();

    const [courses, setCourses] = useState([]);
    const [filterTab, setFilterTab] = useState("all"); // 'all', 'published', 'draft'
    const [searchQuery, setSearchQuery] = useState("");

    // Pagination & Loading States
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const observer = useRef();
    const lastCourseElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const fetchCourses = async (pageNum, reset = false) => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                page: pageNum,
                limit: 12,
                search: searchQuery,
            };

            if (filterTab === "published") {
                params.isPublished = 'true';
            } else if (filterTab === "draft") {
                params.isPublished = 'false';
            }

            const data = await handleGetInstructorCourses(params);

            if (reset) {
                setCourses(data.courses);
            } else {
                setCourses((prev) => [...prev, ...data.courses]);
            }

            setHasMore(data.pagination.currentPage < data.pagination.totalPages);
        } catch (err) {
            setError(err.message || "Failed to fetch courses");
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return; // Wait for auth
        setPage(1);
        fetchCourses(1, true);
    }, [filterTab, searchQuery, user]);

    useEffect(() => {
        if (page > 1) {
            fetchCourses(page, false);
        }
    }, [page]);

    // Handle Publish/Unpublish
    const handleTogglePublish = async (courseId, currentStatus) => {
        try {
            // Optimistic update
            setCourses(prev => prev.map(c =>
                c._id === courseId ? { ...c, isPublished: !currentStatus } : c
            ));

            await updateCourse(courseId, { isPublished: !currentStatus });
        } catch (err) {
            // Revert on failure
            setCourses(prev => prev.map(c =>
                c._id === courseId ? { ...c, isPublished: currentStatus } : c
            ));
            alert("Failed to update publish status");
        }
    };

    // Handle Delete
    const confirmDelete = async () => {
        if (!courseToDelete) return;
        try {
            setIsDeleting(true);
            await deleteCourseApi(courseToDelete._id);
            setCourses(prev => prev.filter(c => c._id !== courseToDelete._id));
            setShowDeleteModal(false);
            setCourseToDelete(null);
        } catch (err) {
            alert("Failed to delete course");
        } finally {
            setIsDeleting(false);
        }
    };

    const getFilterTabClass = (tab) => {
        if (filterTab === tab) {
            return "px-4 py-2 bg-[#7ED321] text-black font-semibold rounded-lg text-sm";
        }
        return "px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg text-sm transition-colors";
    };

    const stats = {
        totalCourses: courses.length,
        publishedCourses: courses.filter((c) => c.isPublished).length,
        totalStudents: courses.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0),
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#7ED321] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-100 relative">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8 mt-16">
                {/* Session Badge */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-[#7ED321] rounded-full"></div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                        Instructor Portal
                    </span>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Welcome back, {user?.name || "Instructor"}
                        </h1>
                        <p className="text-gray-400">
                            Manage your courses and track your students.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl p-6 border border-gray-800">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-sm text-gray-400 font-medium">Total Courses</h3>
                            <div className="p-2 bg-gray-800 rounded-lg">
                                <svg className="w-5 h-5 text-[#7ED321]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-5xl font-bold text-white">{stats.totalCourses}</span>
                            <span className="text-sm text-gray-500">Created by you</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl p-6 border border-gray-800">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-sm text-gray-400 font-medium">Published Courses</h3>
                            <div className="p-2 bg-[#7ED321]/10 rounded-lg">
                                <svg className="w-5 h-5 text-[#7ED321]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-5xl font-bold text-white">{stats.publishedCourses}</span>
                            <span className="text-sm text-gray-500">Live in marketplace</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] rounded-xl p-6 border border-gray-800">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-sm text-gray-400 font-medium">Total Students</h3>
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <span className="text-5xl font-bold text-white">{stats.totalStudents.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">Active enrollments across all courses</span>
                        </div>
                    </div>
                </div>

                {/* My Courses Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-white">My Courses</h2>
                        </div>
                        <Link
                            to="/courses/create"
                            className="px-5 py-2.5 bg-[#7ED321] hover:bg-[#6BC01F] text-black font-semibold rounded-lg flex items-center gap-2 transition-colors self-start md:self-auto"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                            Create Course
                        </Link>
                    </div>

                    {/* Filter Tabs and Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setFilterTab("all")} className={getFilterTabClass("all")}>All</button>
                            <button onClick={() => setFilterTab("published")} className={getFilterTabClass("published")}>Published</button>
                            <button onClick={() => setFilterTab("draft")} className={getFilterTabClass("draft")}>Draft</button>
                        </div>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search your courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-[#7ED321] focus:outline-none w-full md:w-64"
                            />
                        </div>
                    </div>

                    {initialLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
                            ))}
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400">No courses found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course, index) => {
                                const isLast = courses.length === index + 1;
                                return (
                                    <div
                                        ref={isLast ? lastCourseElementRef : null}
                                        key={course._id}
                                        className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all group flex flex-col"
                                    >
                                        {/* Course Image */}
                                        <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                                            {/* Status Badge */}
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 ${course.isPublished ? "bg-[#7ED321]/20 text-[#7ED321]" : "bg-gray-700 text-gray-300"}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${course.isPublished ? "bg-[#7ED321]" : "bg-gray-400"}`} />
                                                    {course.isPublished ? "Published" : "Draft"}
                                                </span>
                                            </div>

                                            {/* Category Tag */}
                                            <div className="absolute top-3 right-3 z-10">
                                                <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded">
                                                    {course.category}
                                                </span>
                                            </div>

                                            {course.courseThumbnail ? (
                                                <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg className="w-16 h-16 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Course Content */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#7ED321] transition-colors line-clamp-1">
                                                {course.courseTitle}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                                                {course.subTitle || "No subtitle"}
                                            </p>

                                            {/* Stats */}
                                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800 mt-auto">
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                                    </svg>
                                                    <span className="font-semibold text-white">
                                                        {course.enrolledStudents?.length || 0}
                                                    </span>
                                                    <span>students</span>
                                                </div>
                                                {course.price && (
                                                    <span className="text-lg font-bold text-white">
                                                        {course.price.amount === 0 ? "Free" : `${course.price.currency === 'INR' ? '₹' : '$'}${course.price.amount}`}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between">
                                                <Link to={`/courses/edit/${course._id}`} className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                                <Link to={`/courses/${course._id}/lectures`} className="text-sm text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
                                                    </svg>
                                                    Lectures
                                                </Link>

                                                {/* Publish/Unpublish */}
                                                <button
                                                    onClick={() => handleTogglePublish(course._id, course.isPublished)}
                                                    className={`text-sm ${course.isPublished ? 'text-gray-500 hover:text-gray-300' : 'text-[#7ED321] hover:text-[#6BC01F] font-semibold'}`}
                                                >
                                                    {course.isPublished ? "Unpublish" : "Publish"}
                                                </button>

                                                {/* Delete Button */}
                                                <button onClick={() => { setCourseToDelete(course); setShowDeleteModal(true); }} className="p-1 text-red-500 hover:text-red-400 transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Loading More Indicator */}
                    {loading && page > 1 && (
                        <div className="flex items-center justify-center py-8">
                            <div className="flex items-center gap-3 text-[#7ED321]">
                                <div className="w-6 h-6 border-2 border-[#7ED321] border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm font-medium">Loading more courses...</span>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && courseToDelete && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 p-6 max-w-sm w-full">
                        <h3 className="text-xl font-bold text-white mb-2">Delete Course?</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Are you sure you want to delete <span className="text-white font-medium">{courseToDelete.courseTitle}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => { setShowDeleteModal(false); setCourseToDelete(null); }}
                                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Delete Course"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
