import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useUser from "../hook/useUser.js";
import useAuth from "../../auth/hook/useAuth.js";
import Navbar from "../../../components/Navbar.jsx";

export default function UserProfile() {
    const user = useSelector((state) => state.auth.user);
    const {
        handleUpdateUser,
        handleUpdatePassword,
        handleDeleteUser,
        handleUpdateAvatar,
    } = useUser();

    const { handleGetMe } = useAuth();

    useEffect(() => {
        handleGetMe();
    }, []);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [notifyEnabled, setNotifyEnabled] = useState(true);
    const [toast, setToast] = useState({ visible: false, text: "" });

    const [nameDraft, setNameDraft] = useState(user?.name || "");
    const [passwordDraft, setPasswordDraft] = useState({
        currentPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        if (user?.name) {
            setNameDraft(user.name);
        }
    }, [user?.name]);

    const showToast = (text) => {
        setToast({ visible: true, text });
        setTimeout(() => {
            setToast({ visible: false, text: "" });
        }, 3000);
    };

    const onAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            await handleUpdateAvatar(file);
            showToast("Avatar updated successfully!");
        }
    };

    const saveProfileChanges = async (e) => {
        e.preventDefault();
        await handleUpdateUser({ name: nameDraft });
        setShowEditModal(false);
        showToast("Profile changes saved successfully!");
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        await handleUpdatePassword(passwordDraft);
        setShowPasswordModal(false);
        setPasswordDraft({ currentPassword: "", newPassword: "" });
        showToast("Password updated successfully!");
    };

    const confirmDeleteAccount = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            )
        ) {
            await handleDeleteUser();
            showToast("Account deleted securely.");
        }
    };

    const shareProfile = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
        }
        showToast("Public profile link copied to clipboard");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12 mt-16">
                {/* Profile Header */}
                <section className="bg-[#1d1d1d] rounded-[9px] p-8 mb-8 border border-[#2a2a2a]">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        {/* Profile Info */}
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className="relative group cursor-pointer">
                                <label className="cursor-pointer block">
                                    <input type="file" className="hidden" accept="image/*" onChange={onAvatarChange} />
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#b8ff00] to-[#8ebf00] p-1">
                                        <div className="w-full h-full rounded-full bg-[#1d1d1d] flex items-center justify-center overflow-hidden relative">
                                            {user?.photourl ? (
                                                <img
                                                    src={user.photourl}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <svg
                                                    className="w-16 h-16 text-[#6b6b6b]"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                                                <span className="text-white text-xs font-semibold">Upload</span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                {/* Online Status */}
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#b8ff00] rounded-full border-4 border-[#1d1d1d]"></div>
                            </div>

                            {/* Name and Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-white">
                                        {user.name}
                                    </h1>
                                    {user.verified && (
                                        <span className="px-3 py-1 bg-[#b8ff00]/20 text-[#b8ff00] text-xs font-semibold rounded-full flex items-center gap-1">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                            Verified Learner
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-400 flex items-center gap-2 mb-2">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                    {user.email}
                                    <svg
                                        className="w-3 h-3 text-gray-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                    </svg>
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <span className="px-3 py-1 bg-[#232323] text-[#c4c4c4] capitalize rounded-md font-medium">
                                        {user.role || 'student'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="px-5 py-2.5 bg-[#333333] hover:bg-[#444444] text-white rounded-[9px] flex items-center gap-2 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </section>

                {/* Account Details and Security Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Account Details */}
                    <section className="bg-[#1d1d1d] rounded-[9px] p-6 border border-[#2a2a2a]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 text-[#b8ff00]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                Account Details
                            </h2>
                            <span className="px-2.5 py-1 bg-[#232323] text-[#c4c4c4] text-xs font-mono rounded-[6px]">
                                INTERNAL-SSO
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                                    Full Name
                                </label>
                                <div className="flex items-center justify-between px-4 py-3 bg-[#222222] rounded-[9px]">
                                    <span className="text-white">{user.name}</span>
                                    <svg
                                        className="w-4 h-4 text-gray-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="flex items-center justify-between px-4 py-3 bg-[#222222] rounded-[9px]">
                                    <span className="text-white">{user.email}</span>
                                    <span className="px-2 py-1 bg-[#b8ff00]/20 text-[#b8ff00] text-xs font-semibold rounded flex items-center gap-1">
                                        <svg
                                            className="w-3 h-3"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                        Verified
                                    </span>
                                </div>
                            </div>

                            {/* Assigned Track / Role */}
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                                    Assigned Track / Role
                                </label>
                                <div className="flex items-center justify-between px-4 py-3 bg-[#222222] rounded-[9px]">
                                    <span className="text-white capitalize">{user.role || 'student'}</span>
                                    <svg
                                        className="w-4 h-4 text-gray-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security & Preferences */}
                    <section className="bg-[#1d1d1d] rounded-[9px] p-6 border border-[#2a2a2a]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 text-[#b8ff00]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                                </svg>
                                Security & Preferences
                            </h2>
                            <span className="px-2.5 py-1 bg-[#b8ff00]/20 text-[#b8ff00] text-xs font-semibold rounded-[6px]">
                                Active
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Change Password */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#222222] rounded-[9px]">
                                <div>
                                    <h3 className="text-white font-semibold text-sm">
                                        Change Password
                                    </h3>
                                    <p className="text-[#a1a1aa] text-xs mt-0.5">
                                        Last updated 45 days ago • Masked
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="px-4 py-2 bg-[#333333] hover:bg-[#444444] text-white text-sm rounded-[6px] transition-colors"
                                >
                                    Update
                                </button>
                            </div>

                            {/* Email Notifications */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#222222] rounded-[9px]">
                                <div>
                                    <h3 className="text-white font-semibold text-sm">
                                        Email Course Digests & Reminders
                                    </h3>
                                    <p className="text-[#a1a1aa] text-xs mt-0.5">
                                        Daily flashcard schedule alerts
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={notifyEnabled}
                                        onChange={(e) => {
                                            setNotifyEnabled(e.target.checked);
                                            showToast(
                                                e.target.checked
                                                    ? "Notifications enabled"
                                                    : "Notifications muted"
                                            );
                                        }}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-[#333333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b8ff00]"></div>
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#2a2a2a] flex items-center justify-end">
                            <button
                                onClick={confirmDeleteAccount}
                                className="px-4 py-2 bg-[#222222] hover:bg-[#3a1c1c] text-red-500 hover:text-red-400 text-sm font-semibold rounded-[9px] transition-colors flex items-center gap-2"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                                Delete Account
                            </button>
                        </div>
                    </section>
                </div>
            </main>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg bg-[#1d1d1d] rounded-[9px] p-8 border border-[#2a2a2a] shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white">
                                    Edit Profile
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Customize your public presence
                                </p>
                            </div>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={saveProfileChanges} className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={nameDraft}
                                    onChange={(e) => setNameDraft(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#111111] text-white rounded-[9px] border border-[#2a2a2a] focus:border-[#b8ff00] focus:outline-none focus:ring-1 focus:ring-[#b8ff00]"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-5 py-2.5 bg-[#333333] hover:bg-[#444444] text-white rounded-[9px] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#b8ff00] hover:bg-[#a3e600] text-black font-semibold rounded-lg transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg bg-[#1d1d1d] rounded-[9px] p-8 border border-[#2a2a2a] shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white">
                                Change Password
                            </h3>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="p-1 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordDraft.currentPassword}
                                    onChange={(e) =>
                                        setPasswordDraft({
                                            ...passwordDraft,
                                            currentPassword: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-[#111111] text-white rounded-[9px] border border-[#2a2a2a] focus:border-[#b8ff00] focus:outline-none focus:ring-1 focus:ring-[#b8ff00]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordDraft.newPassword}
                                    onChange={(e) =>
                                        setPasswordDraft({
                                            ...passwordDraft,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-[#111111] text-white rounded-[9px] border border-[#2a2a2a] focus:border-[#b8ff00] focus:outline-none focus:ring-1 focus:ring-[#b8ff00]"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="px-5 py-2.5 bg-[#333333] hover:bg-[#444444] text-white rounded-[9px] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-[#b8ff00] hover:bg-[#a3e600] text-black font-semibold rounded-lg transition-colors"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.visible && (
                <div className="fixed bottom-6 right-6 z-50 bg-[#1d1d1d] text-white px-6 py-4 rounded-[9px] shadow-2xl flex items-center gap-3 border border-[#2a2a2a] animate-fade-in">
                    <svg
                        className="w-5 h-5 text-[#b8ff00]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>{toast.text}</span>
                </div>
            )}
        </div>
    );
}
