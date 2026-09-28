import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { getLecturesByCourseId, deleteLecture } from '../service/lecture.api.js';
import { getCourseById } from '../../courses/service/course.api.js';

const Lectures = () => {
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [openMenuId, setOpenMenuId] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [courseData, lecturesData] = await Promise.all([
                getCourseById(courseId),
                getLecturesByCourseId(courseId)
            ]);
            setCourse(courseData.course);
            setLectures(lecturesData.lectures || []);
        } catch (err) {
            setError('Failed to load data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [courseId]);

    const handleDelete = async (lectureId) => {
        if (window.confirm('Are you sure you want to delete this lecture?')) {
            try {
                await deleteLecture(lectureId);
                setLectures(prev => prev.filter(l => l._id !== lectureId));
            } catch (err) {
                alert('Failed to delete lecture');
                console.error(err);
            }
        }
    };

    const toggleMenu = (id) => {
        setOpenMenuId(prev => (prev === id ? null : id));
    };

    const filteredLectures = lectures.filter(lecture => {
        const title = lecture.title || lecture.lectureTitle || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const freePreviewsCount = lectures.filter(l => l.isPreviewFree).length;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#131313] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-[#b2f700] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#a1a1aa] text-sm">Loading course and lectures...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-[#131313] flex items-center justify-center">
                <p className="text-[#ffb4ab]">{error || 'Course not found'}</p>
            </div>
        );
    }

    return (
        <div className="bg-[#131313] min-h-screen text-[#e5e2e1] font-sans antialiased pb-20 selection:bg-[#b2f700] selection:text-[#4e6e00]">
            {/* Top Header */}
            <header className="w-full px-8 py-8 flex flex-col gap-6 max-w-[1200px] mx-auto">
                <div>
                    <Link to="/instructor/dashboard" className="text-[#a1a1aa] hover:text-white transition-colors inline-flex items-center gap-2 mb-6 text-sm font-medium">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back to Courses
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h1 className="text-3xl font-bold tracking-tight text-white">{course.courseTitle}</h1>
                                <span className="text-[10px] font-bold tracking-wider uppercase text-[#a1a1aa] bg-[#2a2a2a] px-2 py-1 rounded">
                                    ID: {course._id.substring(0, 8).toUpperCase()}
                                </span>
                            </div>
                            <p className="text-sm text-[#a1a1aa] leading-relaxed mb-1">
                                {course.subTitle || course.description || "No subtitle provided."}
                            </p>
                            <p className="text-xs text-[#71717a] font-medium">{course.category}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Link
                                to={`/courses/edit/${courseId}`}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#201f1f] hover:bg-[#2a2a2a] text-[#e5e2e1] text-sm font-medium transition-colors border border-[#333333] cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit Course
                            </Link>
                            <Link
                                to={`/courses/${courseId}/lectures/create`}
                                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#b2f700] hover:bg-[#a6fa00] text-[#131313] text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(178,247,0,0.15)] cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add Lecture
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Search & Stats bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 border-b border-[#262626] pb-6">
                    <div className="relative w-full md:w-[320px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] text-[18px] pointer-events-none">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search lectures by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#b2f700] focus:ring-1 focus:ring-[#b2f700] transition-all placeholder:text-[#52525b]"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-[11px] font-bold tracking-wider uppercase text-[#71717a]">
                            {lectures.length} TOTAL LECTURES / {freePreviewsCount} FREE PREVIEWS
                        </span>
                        <button className="text-[#a1a1aa] hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#201f1f]">
                            <span className="material-symbols-outlined text-[20px]">swap_vert</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1200px] mx-auto px-8">
                <div className="bg-[#1a1a1a] rounded-xl border border-[#262626] shadow-2xl overflow-visible">
                    {filteredLectures.length === 0 ? (
                        <div className="p-12 text-center">
                            <span className="material-symbols-outlined text-[#333] text-6xl mb-4">video_file</span>
                            <p className="text-white font-medium mb-1">No lectures found</p>
                            <p className="text-[#71717a] text-sm">
                                {searchQuery ? "Try adjusting your search query." : "You haven't added any lectures yet."}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {filteredLectures.map((lecture, index) => {
                                const numStr = (index + 1).toString().padStart(2, '0');
                                const isMenuOpen = openMenuId === lecture._id;

                                return (
                                    <div key={lecture._id} className="group relative flex items-center gap-4 p-5 border-b border-[#262626] hover:bg-[#201f1f] transition-colors last:border-b-0">

                                        {/* Drag Handle */}
                                        <div className="cursor-grab active:cursor-grabbing text-[#333333] group-hover:text-[#71717a] transition-colors flex shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
                                        </div>

                                        {/* Number */}
                                        <div className="text-[#b2f700] font-mono text-sm font-bold shrink-0 w-6">
                                            {numStr}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-base font-semibold text-white truncate group-hover:text-[#b2f700] transition-colors">
                                                    {lecture.title || lecture.lectureTitle}
                                                </h3>
                                                {/* Status dot (example, optional) */}
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#b2f700]"></div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs font-medium text-[#71717a]">
                                                {lecture.videoUrl || lecture.publicId ? (
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="material-symbols-outlined text-[14px]">videocam</span>
                                                        Video
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-[#52525b]">
                                                        <span className="material-symbols-outlined text-[14px]">videocam_off</span>
                                                        No video uploaded
                                                    </span>
                                                )}
                                                {/* {lecture.duration && (
                           <span className="flex items-center gap-1.5">
                             <span className="material-symbols-outlined text-[14px]">schedule</span>
                             {lecture.duration} mins
                           </span>
                        )} */}
                                            </div>
                                        </div>

                                        {/* Right Area */}
                                        <div className="flex items-center gap-4 shrink-0">
                                            {lecture.isPreviewFree && (
                                                <span className="px-2 py-1 rounded border border-[#b2f700]/30 text-[#b2f700] text-[10px] font-bold uppercase tracking-wide bg-[#b2f700]/10">
                                                    Free Preview
                                                </span>
                                            )}

                                            {/* 3 Dots Menu */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleMenu(lecture._id)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717a] hover:text-white hover:bg-[#333333] transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>

                                                {/* Dropdown menu */}
                                                {isMenuOpen && (
                                                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#2a2a2a] border border-[#333333] rounded-xl shadow-2xl z-50 py-1 overflow-hidden">
                                                        <Link
                                                            to={`/courses/${courseId}/lectures/edit/${lecture._id}`}
                                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white hover:bg-[#333333] transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px] text-[#a1a1aa]">edit</span>
                                                            Edit Lecture
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                toggleMenu(lecture._id);
                                                                handleDelete(lecture._id);
                                                            }}
                                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#ffb4ab] hover:bg-[#ffb4ab]/10 transition-colors text-left"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                            Delete Lecture
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            {/* Overlay for closing menu */}
            {openMenuId && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenuId(null)}
                />
            )}
        </div>
    );
};

export default Lectures;
