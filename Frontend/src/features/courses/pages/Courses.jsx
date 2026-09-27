import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router"; // or "react-router-dom"
import { useSelector } from "react-redux";
import useCourse from "../hook/useCourse.js";
import Navbar from "../../../components/Navbar.jsx";

const CATEGORIES = [
    { id: "all", name: "All" },
    { id: "Web Development", name: "Web Development" },
    { id: "AI & Machine Learning", name: "AI & Machine Learning" },
    { id: "Programming & Systems", name: "Programming & Systems" },
    { id: "Data Science", name: "Data Science" },
    { id: "UI/UX & Design Systems", name: "UI/UX & Design Systems" },
    { id: "Cloud & DevOps", name: "Cloud & DevOps" },
];

const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
];

export default function Courses() {
    const navigate = useNavigate();
    const { courses, loading, error } = useSelector((state) => state.course);
    const { user } = useSelector((state) => state.auth);
    const { handleGetAllCourses } = useCourse();

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1); // Reset page on new search
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const fetchCourses = () => {
        const params = {
            page,
            limit: 12,
            isPublished: 'true'
        };
        if (selectedCategory !== 'all') params.category = selectedCategory;
        if (debouncedSearch) params.search = debouncedSearch;
        if (sortBy) params.sort = sortBy;

        handleGetAllCourses(params).catch(console.error);
    };

    // Fetch courses when dependencies change
    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, selectedCategory, debouncedSearch, sortBy]);

    const handleCategoryChange = (catId) => {
        setSelectedCategory(catId);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setPage(1);
    };

    const handleClearFilters = () => {
        setSearchQuery("");
        setDebouncedSearch("");
        setSelectedCategory("all");
        setSortBy("newest");
        setPage(1);
    };

    const courseList = courses?.courses || [];
    const pagination = courses?.pagination || { totalCourses: 0, totalPages: 1, currentPage: 1 };

    const getBadgeStyles = (badge) => {
        const styles = {
            "★ Enrolled": "bg-[#7ED321] text-black",
            "HOT": "bg-red-500 text-white",
            "BESTSELLER": "bg-yellow-500 text-black",
        };
        if (badge && badge.includes("OFF")) return "bg-[#7ED321] text-black";
        return styles[badge] || "bg-gray-700 text-white";
    };

    const isUserEnrolled = (courseId) => {
        if (!user || !user.enrolledCourses) return false;
        return user.enrolledCourses.includes(courseId);
    };

    const getCurrencySymbol = (currencyStr) => {
        if (!currencyStr) return "₹";
        const upper = currencyStr.toUpperCase();
        if (upper === "USD") return "$";
        if (upper === "EUR") return "€";
        if (upper === "GBP") return "£";
        return "₹";
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8 mt-16">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-4xl font-bold text-white">Explore Courses</h1>
                        <span className="px-3 py-1 bg-[#7ED321] text-black text-xs font-bold rounded-full flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                            {pagination.totalCourses} Published Courses
                        </span>
                    </div>
                    <p className="text-gray-400 max-w-3xl">
                        Discover industry-focused engineering courses, build production systems, and
                        master technical skills that dominate high-velocity developer workflows.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-6 relative max-w-md w-full">
                    <input 
                        type="text" 
                        placeholder="Search courses..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-800 text-white px-4 py-3 pl-10 rounded-lg border border-gray-700 focus:outline-none focus:border-[#7ED321]"
                    />
                    <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedCategory === category.id
                                    ? "bg-[#7ED321] text-black"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Results Bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-gray-800 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-white font-medium">
                            Showing <span className="text-[#7ED321]">{courseList.length}</span> courses
                        </span>
                        <span className="text-gray-600">·</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                            PAGE {pagination.currentPage} OF {pagination.totalPages || 1}
                        </span>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm border border-gray-700 focus:outline-none focus:border-[#7ED321] cursor-pointer"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-8 text-center my-12">
                        <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
                        <p className="text-red-400 mb-6">We couldn't load the courses. Please try again.</p>
                        <button onClick={fetchCourses} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && courseList.length === 0 && (
                    <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-12 text-center my-12">
                        <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search or selecting a different category.</p>
                        <button onClick={handleClearFilters} className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {loading ? (
                        // Skeleton Loaders
                        Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 animate-pulse">
                                <div className="w-full aspect-video bg-gray-800"></div>
                                <div className="p-5 space-y-4">
                                    <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                        <div className="space-y-2 flex-1">
                                            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="h-10 bg-gray-800 rounded w-full mt-4"></div>
                                </div>
                            </div>
                        ))
                    ) : courseList.map((course) => {
                        const enrolled = isUserEnrolled(course._id);
                        return (
                        <div
                            key={course._id}
                            onClick={() => navigate(`/courses/${course._id}`)}
                            className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all group cursor-pointer flex flex-col h-full"
                        >
                            {/* Course Image */}
                            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden shrink-0">
                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                                    <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded">
                                        {course.category}
                                    </span>
                                </div>

                                {enrolled && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className={`px-2.5 py-1 ${getBadgeStyles('★ Enrolled')} text-xs font-bold rounded`}>
                                            ★ Enrolled
                                        </span>
                                    </div>
                                )}

                                {course.courseThumbnail ? (
                                    <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Course Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#7ED321] transition-colors line-clamp-2">
                                    {course.courseTitle}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                                    {course.subTitle || course.description}
                                </p>

                                {/* Instructor */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-800">
                                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                                        {course.creator?.photourl ? (
                                            <img src={course.creator.photourl} alt={course.creator.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="truncate">
                                        <div className="text-sm font-medium text-white truncate">
                                            {course.creator?.name || "Instructor"}
                                        </div>
                                    </div>
                                </div>

                                {/* Status or Price */}
                                <div className="mt-auto">
                                    {enrolled ? (
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/learn/${course._id}`);
                                            }} 
                                            className="w-full px-5 py-2.5 bg-[#7ED321] hover:bg-[#6BC01F] text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                            Start Course
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-white">
                                                    {getCurrencySymbol(course.price?.currency)}
                                                    {course.price?.amount?.toLocaleString() || "0"}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/courses/${course._id}`);
                                                }}
                                                className="px-5 py-2 bg-white hover:bg-gray-200 text-black font-semibold rounded-lg transition-colors"
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )})}
                </div>

                {/* Pagination */}
                {!loading && !error && pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                        >
                            Previous
                        </button>
                        
                        {Array.from({ length: pagination.totalPages }).map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                    page === i + 1 ? "bg-[#7ED321] text-black" : "bg-gray-800 text-white hover:bg-gray-700"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={page === pagination.totalPages}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

