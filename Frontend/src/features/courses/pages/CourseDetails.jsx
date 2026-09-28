import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar.jsx";
import useCourse from "../hook/useCourse.js";

export default function CourseDetails() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedModules, setExpandedModules] = useState(["module-1"]);
    const [allCollapsed, setAllCollapsed] = useState(false);
    const [previewVideoUrl, setPreviewVideoUrl] = useState(null);

    const { handleGetCourseById } = useCourse();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await handleGetCourseById(courseId);
                // Assuming data returns the course object with populated lectures/creator
                setCourse(data.course);
            } catch (err) {
                setError(err?.message || "Failed to load course details");
            } finally {
                setIsLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);
    console.log(course)
    // Derived states
    const isEnrolled = Boolean(user && course?.enrolledStudents?.some(s => s === user._id || s?._id === user._id));
    const isFree = course?.price?.amount === 0;

    const handleCTA = () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (isEnrolled) {
            navigate(`/learning/${courseId}`);
        } else if (isFree) {
            // Trigger existing free enrollment flow
            console.log("Triggering free enrollment flow for course:", courseId);
            // placeholder for existing enrollment mechanism
        } else {
            // Trigger existing payment flow
            console.log("Triggering payment flow for course:", courseId);
            // placeholder for existing purchase mechanism
        }
    };

    const toggleModule = (moduleId) => {
        if (expandedModules.includes(moduleId)) {
            setExpandedModules(expandedModules.filter((id) => id !== moduleId));
        } else {
            setExpandedModules([...expandedModules, moduleId]);
        }
    };

    const toggleAllModules = () => {
        if (allCollapsed) {
            setExpandedModules(["module-1"]);
            setAllCollapsed(false);
        } else {
            setExpandedModules([]);
            setAllCollapsed(true);
        }
    };

    const handleLectureClick = (lecture) => {
        if (isEnrolled) {
            navigate(`/learning/${courseId}`);
            return;
        }

        if (lecture.isPreviewFree) {
            setPreviewVideoUrl(lecture.videoUrl);
        } else {
            alert("Enroll to access this lecture");
        }
    };

    // If loading, show skeleton
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
                <Navbar />
                <main className="max-w-7xl mx-auto px-6 py-8 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8 animate-pulse">
                            <div className="h-64 bg-gray-800 rounded-xl"></div>
                            <div className="h-32 bg-gray-800 rounded-xl"></div>
                            <div className="h-64 bg-gray-800 rounded-xl"></div>
                        </div>
                        <div className="lg:col-span-1 animate-pulse">
                            <div className="h-96 bg-gray-800 rounded-xl"></div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // If error, show error state
    if (error || (!isLoading && (!course || !course.isPublished))) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-gray-100">
                <Navbar />
                <div className="text-center mt-16">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="text-gray-400 mb-6">We couldn't load this course.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-[#7ED321] hover:bg-[#6BC01F] text-black font-semibold rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Process lectures to handle unpopulated (string IDs) or populated objects
    const rawLectures = Array.isArray(course.lectures) ? course.lectures : [];
    const lectures = rawLectures.map((l, index) => {
        if (typeof l === 'string') {
            return {
                _id: l,
                lectureTitle: `Lecture ${index + 1}`,
                isPreviewFree: false,
                videoUrl: null
            };
        }
        return l;
    });

    const dummyModule = {
        id: "module-1",
        title: "Course Curriculum",
        lectureCount: lectures.length,
        lectures: lectures
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-8 mt-16">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link to="/courses" className="hover:text-white transition-colors">
                        Explore Courses
                    </Link>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                    <span className="text-white">{course.courseTitle}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Course Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <section className="bg-gradient-to-br from-[#2A2A1A] via-[#1A1A1A] to-[#1A1A1A] rounded-xl p-8 border border-gray-800">
                            <h1 className="text-4xl font-bold text-white mb-4">
                                {course.courseTitle}
                            </h1>
                            {course.subTitle && (
                                <h2 className="text-xl text-gray-300 mb-2">
                                    {course.subTitle}
                                </h2>
                            )}
                            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                                {course.description}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-6">
                                {/* Enrolled Count */}
                                <div className="flex items-center gap-2 text-gray-300">
                                    <svg className="w-5 h-5 text-[#7ED321]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                    </svg>
                                    <span className="font-medium">
                                        {(course.enrolledStudents?.length || 0).toLocaleString()} enrolled
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Course Curriculum */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        Course Curriculum
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        {lectures.length} total lectures
                                    </p>
                                </div>
                                <button
                                    onClick={toggleAllModules}
                                    className="text-[#7ED321] hover:text-[#6BC01F] text-sm font-medium flex items-center gap-1 transition-colors"
                                >
                                    {allCollapsed ? "Expand" : "Collapse"} All
                                    <svg
                                        className={`w-4 h-4 transition-transform ${allCollapsed ? "" : "rotate-180"}`}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 overflow-hidden">
                                    <button
                                        onClick={() => toggleModule(dummyModule.id)}
                                        className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#202020] transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <svg
                                                className={`w-5 h-5 text-[#7ED321] transition-transform ${expandedModules.includes(dummyModule.id) ? "rotate-90" : ""
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                                            </svg>
                                            <h3 className="text-lg font-bold text-white text-left">
                                                {dummyModule.title}
                                            </h3>
                                        </div>
                                        <span className="text-sm text-gray-400">
                                            {dummyModule.lectureCount} {dummyModule.lectureCount === 1 ? "Lecture" : "Lectures"}
                                        </span>
                                    </button>

                                    {expandedModules.includes(dummyModule.id) && dummyModule.lectures.length > 0 && (
                                        <div className="border-t border-gray-800">
                                            {dummyModule.lectures.map((lecture, index) => (
                                                <div
                                                    key={lecture._id || index}
                                                    onClick={() => handleLectureClick(lecture)}
                                                    className="px-6 py-4 flex items-center justify-between hover:bg-[#202020] transition-colors border-b border-gray-800 last:border-b-0 cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className="flex-shrink-0">
                                                            {!isEnrolled && !lecture.isPreviewFree ? (
                                                                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                                                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                                                    </svg>
                                                                </div>
                                                            ) : (
                                                                <div className="w-10 h-10 bg-[#7ED321]/10 rounded-lg flex items-center justify-center">
                                                                    <svg className="w-5 h-5 text-[#7ED321]" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex-1">
                                                            <h4 className="text-white font-medium mb-1">
                                                                {index + 1}. {lecture.lectureTitle}
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4 ml-4">
                                                        {!isEnrolled && lecture.isPreviewFree && (
                                                            <span className="px-3 py-1 bg-[#7ED321]/20 text-[#7ED321] text-xs font-semibold rounded-full uppercase">
                                                                Free Preview
                                                            </span>
                                                        )}
                                                        {!isEnrolled && !lecture.isPreviewFree && (
                                                            <span className="px-3 py-1 bg-gray-800 text-gray-500 text-xs font-medium rounded-full">
                                                                Locked
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Purchase Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 overflow-hidden sticky top-24">
                            {/* Video Preview or Thumbnail */}
                            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                                {previewVideoUrl ? (
                                    <video src={previewVideoUrl} controls autoPlay className="w-full h-full object-cover" />
                                ) : course.courseThumbnail ? (
                                    <img src={course.courseThumbnail} alt={course.courseTitle} className="w-full h-full object-cover opacity-80" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm pointer-events-none">
                                        <div className="text-center opacity-30">
                                            <div className="text-2xl font-bold uppercase">{course.category}</div>
                                        </div>
                                    </div>
                                )}

                                {!previewVideoUrl && lectures.some(l => l.isPreviewFree) && !isEnrolled && (
                                    <button onClick={() => setPreviewVideoUrl(lectures.find(l => l.isPreviewFree)?.videoUrl)} className="absolute w-20 h-20 bg-[#7ED321] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                        <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Price and CTA */}
                            <div className="p-6">
                                <div className="flex items-baseline justify-between mb-4">
                                    <div>
                                        <span className="text-4xl font-bold text-white">
                                            {course.price?.amount === 0 ? "Free" : `${course.price?.currency?.includes('USD') ? '$' : course.price?.currency?.includes('EUR') ? '€' : '₹'}${course.price?.amount}`}
                                        </span>
                                        {course.price?.amount > 0 && (
                                            <span className="text-gray-400 ml-2 text-lg">
                                                {course.price?.currency?.includes('USD') ? 'USD' : course.price?.currency?.includes('EUR') ? 'EUR' : 'INR'}
                                            </span>
                                        )}
                                    </div>
                                    <span className="px-3 py-1 bg-[#7ED321]/20 text-[#7ED321] text-xs font-bold rounded uppercase">
                                        {course.category}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCTA}
                                    className="w-full py-4 bg-[#7ED321] hover:bg-[#6BC01F] text-black font-bold text-lg rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
                                >
                                    {isEnrolled ? "Start Course" : isFree ? "Enroll Now" : "Buy Now"}
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        {isEnrolled ? (
                                            <path d="M8 5v14l11-7z" />
                                        ) : (
                                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

