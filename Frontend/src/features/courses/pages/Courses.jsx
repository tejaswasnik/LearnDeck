import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router"; 
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
            "★ Enrolled": "bg-primary-container text-on-primary-container",
            "HOT": "bg-error text-on-error",
            "BESTSELLER": "bg-tertiary-container text-on-tertiary-container",
        };
        if (badge && badge.includes("OFF")) return "bg-primary-container text-on-primary-container";
        return styles[badge] || "bg-surface-container-highest text-on-surface";
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
        <div className="min-h-screen bg-surface font-[Geist,sans-serif] text-[14px] leading-[20px] text-on-surface">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8 mt-16 bg-surface">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-[48px] font-[700] leading-[56px] tracking-[-0.03em] text-on-surface">Explore Courses</h1>
                        <span className="px-3 py-1 bg-primary-container text-black text-[12px] font-[600] rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                            {pagination.totalCourses} Published Courses
                        </span>
                    </div>
                    <p className="text-[16px] leading-[24px] tracking-[-0.005em] text-on-surface-variant max-w-3xl">
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
                        className="w-full bg-surface-container text-on-surface px-4 py-3 pl-10 rounded-lg border border-outline-variant/30 focus:outline-none focus:border-primary-container transition-colors placeholder:text-on-surface-variant/50"
                    />
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant absolute left-3 top-3.5">
                        search
                    </span>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border border-outline-variant/30 ${
                                selectedCategory === category.id
                                    ? "bg-primary-container text-black border-primary-container"
                                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Results Bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-4 border-b border-outline-variant/30 gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-on-surface font-medium">
                            Showing <span className="text-primary-container">{courseList.length}</span> courses
                        </span>
                        <span className="text-on-surface-variant">·</span>
                        <span className="text-[12px] font-[600] leading-[16px] tracking-[0.05em] text-on-surface-variant uppercase">
                            PAGE {pagination.currentPage} OF {pagination.totalPages || 1}
                        </span>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface-variant">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="bg-surface-container text-on-surface px-4 py-2 rounded-lg text-sm border border-outline-variant/30 focus:outline-none focus:border-primary-container cursor-pointer appearance-none pr-8 relative"
                            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22242%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23a1a1aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em' }}
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
                    <div className="bg-error-container/20 border border-error/50 rounded-xl p-8 text-center my-12">
                        <h3 className="text-[22px] font-[600] leading-[28px] tracking-[-0.01em] text-on-surface mb-2">Something went wrong</h3>
                        <p className="text-[14px] leading-[20px] text-error mb-6">We couldn't load the courses. Please try again.</p>
                        <button onClick={fetchCourses} className="px-6 py-2.5 bg-error text-on-error font-[600] rounded-lg transition-colors hover:opacity-90">
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && courseList.length === 0 && (
                    <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-12 text-center my-12">
                        <h3 className="text-[22px] font-[600] leading-[28px] tracking-[-0.01em] text-on-surface mb-2">No courses found</h3>
                        <p className="text-[14px] leading-[20px] text-on-surface-variant mb-6">Try adjusting your search or selecting a different category.</p>
                        <button onClick={handleClearFilters} className="px-6 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-[600] rounded-lg transition-colors border border-outline-variant/30">
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {loading ? (
                        // Skeleton Loaders
                        Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 animate-pulse">
                                <div className="w-full aspect-video bg-surface-container-high"></div>
                                <div className="p-5 space-y-4">
                                    <div className="h-6 bg-surface-container-high rounded w-3/4"></div>
                                    <div className="h-4 bg-surface-container-high rounded w-full"></div>
                                    <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                                        <div className="w-8 h-8 bg-surface-container-high rounded-full"></div>
                                        <div className="space-y-2 flex-1">
                                            <div className="h-3 bg-surface-container-high rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="h-10 bg-surface-container-high rounded w-full mt-4"></div>
                                </div>
                            </div>
                        ))
                    ) : courseList.map((course) => {
                        const enrolled = isUserEnrolled(course._id);
                        return (
                        <div
                            key={course._id}
                            onClick={() => navigate(`/courses/${course._id}`)}
                            className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/30 hover:border-outline-variant/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all group cursor-pointer flex flex-col h-full"
                        >
                            {/* Course Image */}
                            <div className="relative aspect-video bg-surface-container-lowest overflow-hidden shrink-0">
                                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                                    <span className="px-2 py-0.5 bg-surface-container-highest/80 backdrop-blur-sm text-on-surface text-[10px] font-[600] leading-[14px] tracking-[0.05em] uppercase rounded">
                                        {course.category}
                                    </span>
                                </div>

                                {enrolled && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className={`px-2.5 py-1 ${getBadgeStyles('★ Enrolled')} text-[10px] font-[600] leading-[14px] tracking-[0.05em] uppercase rounded shadow-md`}>
                                            ★ Enrolled
                                        </span>
                                    </div>
                                )}

                                {course.courseThumbnail ? (
                                    <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[48px] text-surface-container-highest">
                                            video_library
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Course Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-[18px] font-[600] leading-[24px] tracking-[-0.01em] text-on-surface mb-2 group-hover:text-primary-container transition-colors line-clamp-2">
                                    {course.courseTitle}
                                </h3>
                                <p className="text-[14px] leading-[20px] text-on-surface-variant mb-4 line-clamp-2 flex-1">
                                    {course.subTitle || course.description}
                                </p>

                                {/* Instructor */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-outline-variant/30">
                                    <div className="w-8 h-8 bg-surface-container-high rounded-full flex items-center justify-center overflow-hidden shrink-0">
                                        {course.creator?.photourl ? (
                                            <img src={course.creator.photourl} alt={course.creator.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                                                person
                                            </span>
                                        )}
                                    </div>
                                    <div className="truncate">
                                        <div className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface truncate">
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
                                            className="w-full px-5 py-2.5 bg-primary-container hover:bg-tertiary-fixed text-black text-[14px] font-[600] leading-[20px] tracking-[0.01em] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_24px_-4px_rgba(184,255,0,0.3)]"
                                        >
                                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                                                play_arrow
                                            </span>
                                            Start Course
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[22px] font-[600] leading-[28px] tracking-[-0.01em] text-on-surface">
                                                    {getCurrencySymbol(course.price?.currency)}
                                                    {course.price?.amount?.toLocaleString() || "0"}
                                                </span>
                                            </div>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/courses/${course._id}`);
                                                }}
                                                className="px-4 py-2 bg-on-surface hover:bg-surface-bright text-surface font-[600] text-[14px] leading-[20px] rounded-lg transition-colors"
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
                            className="px-4 py-2 bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-high transition-colors text-[14px] font-[500]"
                        >
                            Previous
                        </button>
                        
                        {Array.from({ length: pagination.totalPages }).map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                className={`w-10 h-10 rounded-lg text-[14px] font-[600] transition-colors border ${
                                    page === i + 1 
                                        ? "bg-primary-container text-black border-primary-container" 
                                        : "bg-surface-container text-on-surface hover:bg-surface-container-high border-outline-variant/30"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button 
                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                            disabled={page === pagination.totalPages}
                            className="px-4 py-2 bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-container-high transition-colors text-[14px] font-[500]"
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

