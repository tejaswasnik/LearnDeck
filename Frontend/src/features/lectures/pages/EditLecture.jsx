import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { getLectureById, updateLecture } from '../service/lecture.api.js';

const EditLecture = () => {
    const { courseId, lectureId } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLecture = async () => {
            try {
                const data = await getLectureById(lectureId);
                setTitle(data.lecture.title || data.lecture.lectureTitle || '');
                setDescription(data.lecture.description || '');
                setCurrentVideoUrl(data.lecture.videoUrl || '');
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
                        {(video || currentVideoUrl) && (
                            <div>
                                <label className="block text-sm text-[#a1a1aa] mb-2">Video Preview</label>
                                <video 
                                    src={video ? URL.createObjectURL(video) : currentVideoUrl} 
                                    controls 
                                    className="w-full max-h-[400px] bg-black rounded border border-[#333] object-contain"
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm text-[#a1a1aa] mb-2">Upload New Video (Optional)</label>
                            <input 
                                type="file" 
                                accept="video/*" 
                                onChange={e => setVideo(e.target.files[0])} 
                                disabled={saving}
                                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#333] file:text-white hover:file:bg-[#444] transition-colors"
                            />
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
