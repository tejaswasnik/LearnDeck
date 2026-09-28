import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { getCourseById, updateCourse } from '../service/course.api.js';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    category: 'Web Development',
    currency: 'INR (₹)',
    amount: '0'
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState(null);

  const [status, setStatus] = useState('loading'); // 'initial', 'loading', 'saving', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseById(courseId);
        const course = response.course;

        setFormData({
          title: course.courseTitle || '',
          subTitle: course.subTitle || '',
          description: course.description || '',
          category: course.category || 'Web Development',
          currency: course.price?.currency || 'INR (₹)',
          amount: course.price?.amount !== undefined ? String(course.price.amount) : '0'
        });

        if (course.courseThumbnail) {
          setExistingThumbnailUrl(course.courseThumbnail);
          setThumbnailPreview(course.courseThumbnail);
        }

        setStatus('initial');
      } catch (err) {
        setStatus('error');
        setErrorMessage(err.message || 'Course not found or you are not authorized to edit this course.');
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (status === 'error') {
      setStatus('initial');
      setErrorMessage('');
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
      if (status === 'error') {
        setStatus('initial');
        setErrorMessage('');
      }
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setStatus('error');
      setErrorMessage('Course title is required.');
      return;
    }
    if (!formData.category) {
      setStatus('error');
      setErrorMessage('Category is required.');
      return;
    }
    const amount = Number(formData.amount);
    if (isNaN(amount) || amount < 0) {
      setStatus('error');
      setErrorMessage('Please enter a valid non-negative price.');
      return;
    }

    setStatus('saving');

    const submitData = new FormData();
    submitData.append('courseTitle', formData.title.trim());
    submitData.append('subTitle', formData.subTitle.trim());
    submitData.append('description', formData.description);
    submitData.append('category', formData.category);
    // Express req.body.price parsing compatibility for nested objects in multipart
    submitData.append('price[amount]', formData.amount);
    submitData.append('price[currency]', formData.currency);

    if (thumbnailFile) {
      submitData.append('courseThumbnail', thumbnailFile);
    }

    try {
      await updateCourse(courseId, submitData);
      setStatus('success');
      alert('Course updated successfully.');
      navigate('/instructor/dashboard');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong while updating the course.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#b2f700] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#a1a1aa] text-sm">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] font-sans antialiased pb-20 selection:bg-[#b2f700] selection:text-[#4e6e00]">
      {/* Top Header */}
      <header className="w-full px-8 py-8 flex flex-col md:flex-row md:items-start justify-between gap-6 max-w-[1200px] mx-auto">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Link to="/instructor/dashboard" className="text-[#a1a1aa] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-white">Edit Course</h1>
          </div>
          <p className="text-sm text-[#a1a1aa] leading-relaxed">
            Update the catalog metadata for your course.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/instructor/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#201f1f] hover:bg-[#2a2a2a] text-[#e5e2e1] text-sm font-medium transition-colors border border-[#333333] cursor-pointer"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={status === 'saving'}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#b2f700] hover:bg-[#a6fa00] text-[#4e6e00] text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(178,247,0,0.15)] cursor-pointer disabled:opacity-50"
          >
            {status === 'saving' ? 'Saving Changes...' : 'Save Changes'}
            {status !== 'saving' && <span className="material-symbols-outlined text-[18px]">save</span>}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row gap-8">
        {/* Left Form Area */}
        <div className="flex-1 lg:max-w-[760px]">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#262626] p-8 shadow-2xl">
            {/* Form Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">General Information</h2>
                <p className="text-xs text-[#a1a1aa]">Core details visible across LearnDeck directory search.</p>
              </div>
            </div>

            {status === 'error' && errorMessage && (
              <div className="mb-6 flex flex-col items-start gap-2 rounded-lg bg-[#93000a]/20 p-3 md:p-4 text-[#ffb4ab] transition-all" role="alert">
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-[#ffb4ab] text-[18px] mt-0.5 shrink-0">error</span>
                  <span className="text-sm text-[#ffb4ab]">{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">

              {/* Course Title */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-semibold text-white">Course Title <span className="text-[#b2f700]">*</span></label>
                  <span className="text-xs text-[#71717a] font-medium">{formData.title.length} / 100</span>
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                  disabled={status === 'saving'}
                  className="w-full bg-[#131313] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b2f700] focus:ring-1 focus:ring-[#b2f700] transition-all"
                />
                <p className="text-xs text-[#71717a] flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Give your course a clear, concise, and descriptive name that highlights the tech stack.
                </p>
              </div>

              {/* Course Subtitle */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Course Subtitle</label>
                <input
                  type="text"
                  name="subTitle"
                  value={formData.subTitle}
                  onChange={handleChange}
                  disabled={status === 'saving'}
                  className="w-full bg-[#131313] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b2f700] focus:ring-1 focus:ring-[#b2f700] transition-all"
                />
                <p className="text-xs text-[#71717a] flex items-center gap-1.5 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  A punchy one-sentence summary highlighting the primary student takeaway.
                </p>
              </div>

              {/* Course Description */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-semibold text-white">Course Description</label>
                  <span className="text-xs text-[#71717a] font-medium">{formData.description.length} / 2,000 characters</span>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={2000}
                  rows={5}
                  disabled={status === 'saving'}
                  className="w-full bg-[#131313] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b2f700] focus:ring-1 focus:ring-[#b2f700] transition-all resize-y min-h-[120px]"
                />
                <p className="text-xs text-[#71717a] mt-0.5">
                  Include learning objectives, prerequisites, and the expected technical outcome upon completion.
                </p>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-white">Category <span className="text-[#b2f700]">*</span></label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={status === 'saving'}
                    className="w-full bg-[#131313] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#b2f700] focus:ring-1 focus:ring-[#b2f700] transition-all cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none text-[20px]">
                    keyboard_arrow_down
                  </span>
                </div>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Select the primary curriculum taxonomy to route this course to relevant learner feeds.
                </p>
              </div>

              {/* Price Section */}
              <div className="mt-4 p-5 rounded-xl bg-[#201f1f] border border-[#2a2a2a]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b2f700] text-[20px]">payments</span>
                    <label className="text-sm font-semibold text-white">Course Enrollment Price <span className="text-[#b2f700]">*</span></label>
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#c2caad] bg-[#2a2a2a] px-2 py-1 rounded">Fixed One-Time</span>
                </div>

                <div className="flex gap-4">
                  <div className="relative w-1/3">
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      disabled={status === 'saving'}
                      className="w-full bg-[#131313] border border-[#262626] rounded-lg px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-[#b2f700] focus:ring-1 focus:ring-[#b2f700] transition-all cursor-pointer"
                    >
                      <option value="INR (₹)">INR (₹)</option>
                      <option value="USD ($)">USD ($)</option>
                      <option value="EUR (€)">EUR (€)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none text-[20px]">
                      keyboard_arrow_down
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717a] font-medium text-sm">₹</span>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      disabled={status === 'saving'}
                      min="0"
                      step="any"
                      className="w-full bg-[#131313] border border-[#262626] rounded-lg pl-8 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#b2f700] focus:ring-1 focus:ring-[#b2f700] transition-all"
                    />
                  </div>
                </div>
                <p className="text-xs text-[#71717a] mt-3">
                  Set the baseline price students will pay to unlock this course and all attached practice decks.
                </p>
              </div>

            </form>
          </div>
        </div>

        {/* Right Area (Thumbnail Upload) */}
        <div className="flex-1 lg:max-w-[400px]">
          <div className="bg-[#1a1a1a] rounded-xl border border-[#262626] p-8 shadow-2xl sticky top-8">
            <h2 className="text-xl font-semibold text-white mb-1">Course Thumbnail</h2>
            <p className="text-xs text-[#a1a1aa] mb-6">Upload a new image to replace the existing one.</p>

            <div className="relative border-2 border-dashed border-[#333333] rounded-xl overflow-hidden bg-[#131313] transition-colors hover:border-[#b2f700]/50 aspect-video flex flex-col items-center justify-center">
              {thumbnailPreview ? (
                <>
                  <img src={thumbnailPreview} alt="Course Preview" className="w-full h-full object-cover" />
                  {/* Show close button only if it's a new file, or if we support removing entirely */}
                  {thumbnailFile && (
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      disabled={status === 'saving'}
                      className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-lg hover:bg-black transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                  {/* Edit overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <span className="material-symbols-outlined text-white text-3xl mb-1">edit</span>
                      <span className="text-white text-xs font-semibold">Change Image</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#71717a] text-4xl mb-2">image</span>
                  <p className="text-sm font-medium text-white mb-1">Click to upload image</p>
                  <p className="text-xs text-[#71717a]">JPEG, PNG, or WEBP (Max 5MB)</p>
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleThumbnailChange}
                disabled={status === 'saving'}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title=""
              />
            </div>

            {/* Context hint */}
            {!thumbnailFile && existingThumbnailUrl && (
              <p className="text-xs text-[#71717a] mt-3">Current thumbnail is displayed. Selecting a new image will replace it upon save.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditCourse;
