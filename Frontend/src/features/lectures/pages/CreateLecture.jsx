import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { createLecture } from '../service/lecture.api.js';

const CreateLecture = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !video) {
            setError('Title and Video are required');
            return;
        }

        const formData = new FormData();
        formData.append('lectureTitle', title);
        formData.append('description', description);
        formData.append('courseId', courseId);
        formData.append('video', video);

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
                    <div className="bg-[#1a1a1a] border border-[#333] p-3 rounded text-white">
                        <label className="block text-sm text-[#a1a1aa] mb-2">Upload Video *</label>
                        <input 
                            type="file" 
                            accept="video/*" 
                            onChange={e => setVideo(e.target.files[0])} 
                            disabled={loading}
                        />
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
