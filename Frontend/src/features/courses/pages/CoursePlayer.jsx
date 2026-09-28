import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar.jsx";
import useCourse from "../hook/useCourse.js";

const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export default function CoursePlayer() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeLecture, setActiveLecture] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { handleGetCourseById } = useCourse();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await handleGetCourseById(courseId);
                const fetchedCourse = data.course;
                setCourse(fetchedCourse);
                
                // Set first lecture as active if none selected
                if (fetchedCourse?.lectures?.length > 0) {
                    const validLectures = fetchedCourse.lectures.filter(l => typeof l !== 'string');
                    if (validLectures.length > 0) {
                        setActiveLecture(validLectures[0]);
                    }
                }
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

    // Derived states
    const isEnrolled = Boolean(user && user.enrolledCourses?.some(c => c === courseId || c._id === courseId));

    // If not enrolled, redirect back to course details
    useEffect(() => {
        if (!isLoading && course && !isEnrolled) {
            navigate(`/courses/${courseId}`);
        }
    }, [isLoading, course, isEnrolled, navigate, courseId]);


    // If loading, show skeleton
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col">
                <Navbar />
                <div className="flex-1 mt-16 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7ED321]"></div>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-gray-100">
                <Navbar />
                <div className="text-center mt-16">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="text-gray-400 mb-6">We couldn't load this course player.</p>
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

    const rawLectures = Array.isArray(course.lectures) ? course.lectures : [];
    const lectures = rawLectures.map((l, index) => {
        if (typeof l === 'string') {
            return {
                _id: l,
                lectureTitle: `Lecture ${index + 1}`,
                videoUrl: null
            };
        }
        return l;
    });

    const dummyModule = {
        id: "module-1",
        title: "Course Curriculum",
        lectures: lectures
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-100 flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex-1 mt-16 flex h-[calc(100vh-64px)] overflow-hidden relative">
                {/* Main Video Area */}
                <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'mr-80' : ''} overflow-y-auto`}>
                    {/* Video Player */}
                    <div className="w-full bg-black aspect-video relative flex items-center justify-center">
                        {activeLecture?.videoUrl ? (
                            getYoutubeVideoId(activeLecture.videoUrl) ? (
                                <iframe
                                    className="w-full h-full object-contain"
                                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(activeLecture.videoUrl)}?autoplay=1&rel=0`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video 
                                    src={activeLecture.videoUrl} 
                                    controls 
                                    controlsList="nodownload"
                                    className="w-full h-full object-contain" 
                                    autoPlay
                                />
                            )
                        ) : (
                            <div className="text-gray-500">No video available for this lecture</div>
                        )}
                        
                        {!sidebarOpen && (
                             <button 
                                onClick={() => setSidebarOpen(true)}
                                className="absolute top-4 right-4 z-10 bg-black/60 p-2 rounded text-white hover:bg-[#7ED321] hover:text-black transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Lecture Info below video */}
                    <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-white">
                                {activeLecture?.lectureTitle || "Select a lecture"}
                            </h1>
                        </div>
                        
                        {/* Tabs */}
                        <div className="border-b border-gray-800">
                            <nav className="flex gap-6">
                                <button className="border-b-2 border-[#7ED321] text-[#7ED321] pb-3 px-1 font-medium">
                                    Overview
                                </button>
                                <button className="border-b-2 border-transparent text-gray-400 hover:text-white pb-3 px-1 font-medium transition-colors">
                                    Q&A
                                </button>
                            </nav>
                        </div>

                        <div className="prose prose-invert max-w-none text-gray-400">
                            <h3 className="text-xl text-white mb-2">About this course</h3>
                            <p>{course.description}</p>
                        </div>
                    </div>
                </main>

                {/* Sidebar */}
                <aside 
                    className={`fixed right-0 top-16 bottom-0 w-80 bg-[#141414] border-l border-gray-800 flex flex-col transition-transform duration-300 z-20 ${
                        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                        <h2 className="font-bold text-lg text-white">Course Content</h2>
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="bg-[#1A1A1A]">
                            <div className="px-4 py-3 bg-[#202020] border-b border-gray-800 font-semibold text-white sticky top-0 z-10">
                                {dummyModule.title}
                            </div>
                            <div className="divide-y divide-gray-800">
                                {dummyModule.lectures.map((lecture, index) => (
                                    <button
                                        key={lecture._id || index}
                                        onClick={() => setActiveLecture(lecture)}
                                        className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[#202020]/50 transition-colors ${
                                            activeLecture?._id === lecture._id ? 'bg-[#7ED321]/10 border-l-2 border-[#7ED321]' : 'border-l-2 border-transparent'
                                        }`}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <input type="checkbox" className="w-4 h-4 accent-[#7ED321] rounded bg-gray-800 border-gray-700 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                                        </div>
                                        <div>
                                            <p className={`text-sm ${activeLecture?._id === lecture._id ? 'text-[#7ED321] font-medium' : 'text-gray-300'}`}>
                                                {index + 1}. {lecture.lectureTitle}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
