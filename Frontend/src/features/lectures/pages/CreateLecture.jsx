import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { createLecture } from '../service/lecture.api.js';

const CreateLecture = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || (!video && !videoUrl)) {
            setError('Title and either Video File or Video URL are required');
            return;
        }

        const formData = new FormData();
        formData.append('lectureTitle', title);
        formData.append('description', description);
        formData.append('courseId', courseId);
        if (video) {
            formData.append('video', video);
        }
        if (videoUrl) {
            formData.append('videoUrl', videoUrl);
        }

        try {
            setLoading(true);
            await createLecture(formData);
            navigate(`/courses/${courseId}/lectures`);
        } catch (err) {
            setError(err.message || 'Error creating lecture');
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#131313] min-h-screen text-[#e5e2e1] p-8">
            <div className="max-w-2xl mx-auto">
                <Link to={`/courses/${courseId}/lectures`} className="text-[#a1a1aa] hover:text-white mb-6 inline-block">
                    &larr; Back to Lectures
                </Link>
                <h1 className="text-3xl font-bold mb-6">Create Lecture</h1>
                
                {error && <div className="text-[#ffb4ab] mb-4 p-3 bg-[#ffb4ab]/10 rounded">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        className="bg-[#1a1a1a] border border-[#333] p-3 rounded text-white" 
                        placeholder="Lecture Title *" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        disabled={loading}
                    />
                    <textarea 
                        className="bg-[#1a1a1a] border border-[#333] p-3 rounded text-white min-h-[100px]" 
                        placeholder="Lecture Description" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        disabled={loading}
                    />
                    <div className="bg-[#1a1a1a] border border-[#333] p-3 rounded text-white flex flex-col gap-3">
                        <label className="block text-sm text-[#a1a1aa]">Media Source * (Provide one)</label>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Option 1: Upload Video File</label>
                            <input 
                                type="file" 
                                accept="video/*" 
                                onChange={e => {
                                    setVideo(e.target.files[0]);
                                    if (e.target.files[0]) setVideoUrl('');
                                }} 
                                disabled={loading || videoUrl !== ''}
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
                                value={videoUrl}
                                onChange={e => {
                                    setVideoUrl(e.target.value);
                                    if (e.target.value) setVideo(null);
                                }}
                                disabled={loading || video !== null}
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-[#b2f700] text-black font-bold py-3 rounded mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Create Lecture'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateLecture;
