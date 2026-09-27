import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useAuth from "../hook/useAuth.js";
import Navbar from "../../../components/Navbar";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { handleRegister } = useAuth();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) return;
    await handleRegister({ name: fullName, email, password });
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface h-screen flex flex-col selection:bg-primary-container selection:text-surface-container-lowest antialiased overflow-hidden relative">
      {/* Atmospheric Glow & Background Grid Texture */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] sm:-top-[20%] left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] lg:w-[700px] h-[350px] sm:h-[450px] lg:h-[550px] bg-primary-container/5 blur-[90px] sm:blur-[140px] rounded-full" />
        <div className="absolute -bottom-24 -right-16 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] rounded-full bg-primary-container/5 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(14,14,14,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#201f1f18_1px,transparent_1px),linear-gradient(to_bottom,#201f1f18_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      </div>

      {/* Header */}
      <Navbar />

      {/* Main Content – Two-Column Layout */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 w-full min-h-0 pt-[68px]">
        {/* Left Column – Register Form */}
        <div className="flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 py-8 w-full h-full overflow-y-auto">
          <div className="w-full max-w-[440px]">
            {/* Title Block */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10 w-full">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-3">
                Create your account
              </h1>
              <p className="text-body-sm font-medium text-[#71717A]">
                Start mastering skills with smart courses &amp; interactive decks.
              </p>
            </div>

            {/* Form Area */}
            <div className="w-full space-y-6">
              <form className="space-y-6" onSubmit={onSubmit}>
                {/* Full Name Field */}
                <div className="space-y-1.5">
                  <label
                    className="block text-body-sm text-[#71717A]"
                    htmlFor="fullname"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] text-[22px] pointer-events-none">
                      badge
                    </span>
                    <input
                      autoComplete="name"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#1A1A1A] border border-[#333333] text-primary placeholder-[#52525B] text-body-lg transition-all duration-150 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:bg-[#1C1C1C]"
                      id="fullname"
                      placeholder="Jane Doe"
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    className="block text-body-sm text-[#71717A]"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A] text-[22px] pointer-events-none">
                      mail
                    </span>
                    <input
                      autoComplete="email"
                      className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#1A1A1A] border border-[#333333] text-primary placeholder-[#52525B] text-body-lg transition-all duration-150 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:bg-[#1C1C1C]"
                      id="email"
                      placeholder="jane@domain.com"
                      required
                      type="email"
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
                      autoComplete="new-password"
                      className="w-full h-12 pl-12 pr-12 rounded-xl bg-[#1A1A1A] border border-[#333333] text-primary placeholder-[#52525B] text-body-lg transition-all duration-150 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container focus:bg-[#1C1C1C]"
                      id="password"
                      minLength={8}
                      placeholder="At least 8 characters"
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

                {/* Terms & Privacy */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer select-none group">
                    <div className="relative flex items-center mt-0.5">
                      <input
                        className="peer sr-only"
                        id="terms"
                        required
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                      <div className="w-5 h-5 rounded border border-[#333333] bg-[#1A1A1A] peer-checked:bg-primary-container peer-checked:border-primary-container transition-colors flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[#1A1A1A] text-[16px] opacity-0 peer-checked:opacity-100 transition-opacity font-bold">
                          check
                        </span>
                      </div>
                    </div>
                    <span className="text-body-sm text-[#71717A] group-hover:text-[#A1A1AA] transition-colors leading-relaxed pt-0.5">
                      I agree to the{" "}
                      <Link to="#" className="text-[#A1A1AA] hover:text-white hover:underline transition-colors">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="#" className="text-[#A1A1AA] hover:text-white hover:underline transition-colors">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    className="w-full h-12 rounded-xl bg-primary-container text-surface-container-lowest text-label-lg font-bold shadow-[0_4px_14px_rgba(178,247,0,0.15)] hover:bg-tertiary-fixed active:scale-[0.99] transition-all flex items-center justify-center gap-2 tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading || !termsAccepted}
                  >
                    {loading ? (
                      <>
                        <span className="w-[18px] h-[18px] border-2 border-surface-container-lowest border-t-transparent rounded-full animate-spin" />
                        <span>Creating account…</span>
                      </>
                    ) : (
                      <>
                        <span>Create account</span>
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
                  onClick={() => {
                    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
                  }}
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

              {/* Login Prompt */}
              <div className="text-center lg:text-left pt-6">
                <p className="text-body-sm text-[#52525B]">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-[#71717A] hover:text-[#A1A1AA] hover:underline transition-colors ml-1.5 inline-flex items-center gap-0.5"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column – Hero Feature Panel (Desktop Only) */}
        <div className="hidden lg:block relative w-full h-full border-l border-surface-container overflow-hidden bg-surface-container-low group">
          {/* Decorative glow blobs */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/15 blur-3xl rounded-full pointer-events-none z-10" />

          {/* Hero image */}
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7iT4jq_FGu9f6zb3VRXFyXcxsoAwHNourKuGNhaZX3Bn3hNk3-BlXjTb2biE6smrt1YkicS57WKytUimBV8g4t4vPlObF-udgKDk3dQWqa9mTXDAor6BSSmgQaWDTzIu6wKEiqNUd7PHlnqUsuN5gY6iBWdj3xDzTPhLycK1EyhdF5S0ZtqZrbzpS8vqs9oquR2vnnDKNSNUfxj2BE4h525833dEtfpbVEdYryjSjBw8j8v2Zm4e")' }} />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-[#0e0e0e]/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-transparent to-transparent opacity-90 pointer-events-none" />

          {/* Info card overlay */}
          <div className="absolute bottom-0 inset-x-0 p-8 lg:p-12 z-20 flex flex-col gap-3 pointer-events-none">
            <div className="p-6 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-2xl border border-[#333333] shadow-2xl flex flex-col gap-3 max-w-lg">
              <div className="inline-flex items-center gap-2 text-primary-container text-label-sm font-semibold tracking-widest uppercase">
                <span className="material-symbols-outlined text-[16px]">
                  view_carousel
                </span>
                <span>Premier Tech &amp; Coding</span>
              </div>
              <h2 className="text-headline-md font-bold text-primary tracking-tight leading-snug">
                Accelerate your mastery with expert-guided learning.
              </h2>
              <p className="text-body-md text-secondary line-clamp-2">
                Dive into interactive courses, hands-on projects, and verified credentials crafted by top software engineers and creators.
              </p>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0e0e0e] bg-surface-variant flex items-center justify-center font-label-sm text-primary">AL</div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0e0e0e] bg-surface-container-high flex items-center justify-center font-label-sm text-primary-container">JD</div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0e0e0e] bg-surface-bright flex items-center justify-center font-label-sm text-primary">RK</div>
                </div>
                <span className="text-body-sm text-secondary">Active learners worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
