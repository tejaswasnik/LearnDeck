import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useAuth from "../hook/useAuth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useAuth();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface h-screen flex flex-col justify-between selection:bg-primary-container selection:text-surface-container-lowest antialiased overflow-hidden relative">
      {/* Atmospheric Glow & Background Grid Texture */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] sm:-top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] lg:w-[700px] h-[350px] sm:h-[450px] lg:h-[550px] bg-primary-container/5 blur-[90px] sm:blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(14,14,14,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#201f1f18_1px,transparent_1px),linear-gradient(to_bottom,#201f1f18_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-surface-container">
        <Link
          to="/"
          className="flex items-center gap-2 group transition-all duration-150 active:scale-[0.98]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-7 h-7"
            fill="none"
          >
            <rect
              width="48"
              height="48"
              rx="12"
              fill="#1A1A1A"
              stroke="#333333"
              strokeWidth="1.5"
            />
            <path
              d="M24 10L27.5 20.5L38 24L27.5 27.5L24 38L20.5 27.5L10 24L20.5 20.5L24 10Z"
              fill="#AAFF00"
            />
            <circle cx="24" cy="24" r="3" fill="#0D0D0D" />
          </svg>
          <span className="text-headline-sm font-bold text-primary tracking-tight">
            LearnDeck
          </span>
        </Link>
        <Link
          to="/"
          className="text-label-md text-secondary hover:text-primary transition-colors flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-surface-container/50"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          <span className="hidden sm:inline">Back to homepage</span>
        </Link>
      </header>

      {/* Main Content – Two-Column Layout */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 w-full min-h-0">
        {/* Left Column – Login Form */}
        <div className="flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 py-12 w-full">
          <div className="w-full max-w-[440px]">
            {/* Title Block */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10 w-full">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-3">
                Login to LearnDeck
              </h1>
              <p className="text-body-sm font-medium text-[#71717A]">
                Master your knowledge with smart flashcards
              </p>
            </div>

            {/* Form Area */}
            <div className="w-full space-y-6">
              <form className="space-y-6" onSubmit={onSubmit}>
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    className="block text-body-sm text-[#71717A]"
                    htmlFor="identifier"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] text-[22px] pointer-events-none">
                      mail
                    </span>
                    <input
                      autoComplete="username"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#1A1A1A] border border-[#333333] text-primary placeholder-[#52525B] text-body-lg transition-all duration-150 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:bg-[#1C1C1C]"
                      id="identifier"
                      placeholder="name@domain.com"
                      required
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label
                    className="block text-body-sm text-[#71717A]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] text-[22px] pointer-events-none">
                      lock
                    </span>
                    <input
                      autoComplete="current-password"
                      className="w-full h-12 pl-12 pr-12 rounded-xl bg-[#1A1A1A] border border-[#333333] text-primary placeholder-[#52525B] text-body-lg transition-all duration-150 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:bg-[#1C1C1C]"
                      id="password"
                      placeholder="••••••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors flex items-center justify-center p-1 focus:outline-none cursor-pointer"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Helpers – Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none group">
                    <input
                      className="w-4 h-4 rounded bg-[#181818] border-[#3E3E3E] text-primary-container focus:ring-primary-container focus:ring-offset-0 focus:ring-1 transition cursor-pointer"
                      type="checkbox"
                    />
                    <span className="text-body-sm text-[#71717A] group-hover:text-[#A1A1AA] transition-colors">
                      Keep me signed in
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-body-sm text-[#71717A] hover:text-[#A1A1AA] hover:underline transition-all cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    className="w-full h-12 rounded-xl bg-primary-container text-surface-container-lowest text-label-lg font-bold shadow-[0_4px_14px_rgba(178,247,0,0.15)] hover:bg-tertiary-fixed active:scale-[0.99] transition-all flex items-center justify-center gap-2 tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="w-[18px] h-[18px] border-2 border-surface-container-lowest border-t-transparent rounded-full animate-spin" />
                        <span>Logging in…</span>
                      </>
                    ) : (
                      <>
                        <span>Log in</span>
                        <span className="material-symbols-outlined text-[18px] font-bold">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-4">
                <div className="w-full border-t border-[#262626]" />
                <span className="absolute bg-surface-container-lowest px-4 text-body-sm text-[#52525B]">
                  Or continue with
                </span>
              </div>

              {/* Google Sign-In */}
              <div className="grid gap-3 grid-cols-1">
                <button
                  className="h-12 px-4 rounded-xl bg-transparent border border-[#262626] hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2.5 text-body-md text-[#71717A] hover:text-[#A1A1AA] font-medium active:scale-[0.98] cursor-pointer"
                  type="button"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                      fill="#34A853"
                    />
                  </svg>
                  <span>Google</span>
                </button>
              </div>

              {/* Sign Up Prompt */}
              <div className="text-center lg:text-left pt-6">
                <p className="text-body-sm text-[#52525B]">
                  Don&apos;t have an account?
                  <Link
                    to="/register"
                    className="text-[#71717A] hover:text-[#A1A1AA] hover:underline transition-colors ml-1.5 inline-flex items-center gap-0.5"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column – Hero Image Panel (Desktop Only) */}
        <div className="hidden lg:block relative w-full h-full border-l border-surface-container overflow-hidden bg-surface-container-low group">
          {/* Decorative glow blobs */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/15 blur-3xl rounded-full pointer-events-none z-10" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-container/10 blur-3xl rounded-full pointer-events-none z-10" />

          {/* Hero image */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT0T_3yQljm-qFN7vI9Nwb79W0d_RpwKKfVqmPir6Eq9sm0CVN5MWnvIl5OY6R7Ir77opBrHJT1ZymoD6CcuELARDh_mg-sSVW8vk0ijlyqLPy8uhEsIkemv5LcEWCifykx8NtHSVc06TWKOkcSq7IIaTNyDkfbaXVdNAfOqWTgSdZr-wahqcr8lGAvAnOH4cMfLG7efeurJE4Z3hoBG-14bZVzhFdZvnCoyXVXTmPFNlcUiElT8NR"
            alt="Modern workspace with coding tutorials on screens"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(14,14,14,0.6)_100%)] pointer-events-none" />

          {/* Info card overlay */}
          <div className="absolute bottom-0 inset-x-0 p-8 lg:p-12 z-20 flex flex-col gap-3 pointer-events-none">
            <div className="p-6 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-md border border-[#333333] shadow-2xl flex flex-col gap-3 max-w-lg">
              <div className="inline-flex items-center gap-2 text-primary-container text-label-sm font-semibold tracking-wider uppercase">
                <span className="material-symbols-outlined text-[16px]">
                  school
                </span>
                <span>PREMIER VIDEO LEARNING</span>
              </div>
              <h2 className="text-headline-md font-bold text-primary tracking-tight leading-snug">
                Master any skill with expert-led courses.
              </h2>
              <p className="text-body-md text-secondary line-clamp-2">
                Explore interactive courses, real-world projects, and recognized
                certificates taught by industry leaders.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
