import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { getLectureById, updateLecture } from '../service/lecture.api.js';

const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const EditLecture = () => {
    const { courseId, lectureId } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const [videoUrlInput, setVideoUrlInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const data = await getLectureById(lectureId);
                setTitle(data.lecture.title || data.lecture.lectureTitle || '');
                setDescription(data.lecture.description || '');
                const url = data.lecture.videoUrl || '';
                setCurrentVideoUrl(url);
                setVideoUrlInput(url);
            } catch (err) {
                setError('Failed to load lecture details');
            } finally {
                setLoading(false);
            }
        };
        fetchLecture();
    }, [lectureId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('lectureTitle', title);
        formData.append('description', description);
        if (video) {
            formData.append('video', video);
        } else if (videoUrlInput) {
            formData.append('videoUrl', videoUrlInput);
        }

        try {
            setSaving(true);
            await updateLecture(lectureId, formData);
            navigate(`/courses/${courseId}/lectures`);
        } catch (err) {
            setError(err.message || 'Error updating lecture');
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="bg-[#131313] min-h-screen text-[#e5e2e1] p-8">
            <div className="max-w-2xl mx-auto">
                <Link to={`/courses/${courseId}/lectures`} className="text-[#a1a1aa] hover:text-white mb-6 inline-block">
                    &larr; Back to Lectures
                </Link>
                <h1 className="text-3xl font-bold mb-6">Edit Lecture</h1>
                
                {error && <div className="text-[#ffb4ab] mb-4 p-3 bg-[#ffb4ab]/10 rounded">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        className="bg-[#1a1a1a] border border-[#333] p-3 rounded text-white" 
                        placeholder="Lecture Title *" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        disabled={saving}
                    />
                    <textarea 
                        className="bg-[#1a1a1a] border border-[#333] p-3 rounded text-white min-h-[100px]" 
                        placeholder="Lecture Description" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        disabled={saving}
                    />
                    <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded text-white flex flex-col gap-4">
                        {(video || videoUrlInput || currentVideoUrl) && (
                            <div>
                                <label className="block text-sm text-[#a1a1aa] mb-2">Video Preview</label>
                                {getYoutubeVideoId(video ? null : videoUrlInput || currentVideoUrl) ? (
                                    <iframe
                                        className="w-full h-64 bg-black rounded border border-[#333] object-contain"
                                        src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoUrlInput || currentVideoUrl)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video 
                                        src={video ? URL.createObjectURL(video) : (videoUrlInput || currentVideoUrl)} 
                                        controls 
                                        className="w-full max-h-[400px] bg-black rounded border border-[#333] object-contain"
                                    />
                                )}
                            </div>
                        )}
                        
                        <div className="flex flex-col gap-3">
                            <label className="block text-sm text-[#a1a1aa]">Change Media Source</label>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Option 1: Upload New Video File</label>
                                <input 
                                    type="file" 
                                    accept="video/*" 
                                    onChange={e => {
                                        setVideo(e.target.files[0]);
                                        if (e.target.files[0]) setVideoUrlInput('');
                                    }} 
                                    disabled={saving}
                                    className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#333] file:text-white hover:file:bg-[#444] transition-colors"
                                />
                            </div>
                            <div className="flex items-center">
                                <hr className="flex-1 border-[#333]" />
                                <span className="px-3 text-xs text-gray-500">OR</span>
                                <hr className="flex-1 border-[#333]" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Option 2: Video URL (e.g. YouTube Link)</label>
                                <input 
                                    type="url"
                                    className="w-full bg-[#131313] border border-[#333] p-2 rounded text-white text-sm"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={videoUrlInput}
                                    onChange={e => {
                                        setVideoUrlInput(e.target.value);
                                        if (e.target.value) setVideo(null);
                                    }}
                                    disabled={saving || video !== null}
                                />
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-[#b2f700] text-black font-bold py-3 rounded mt-4"
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditLecture;
