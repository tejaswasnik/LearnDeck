import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { resetPassword } from '../service/auth.api.js';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [status, setStatus] = useState('initial'); // 'initial', 'loading', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 8) {
      setStatus('error');
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match.');
      return;
    }

    setStatus('loading');

    try {
      await resetPassword(token, password);
      navigate('/password-reset-success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'This password reset link is invalid or has expired.');
    }
  };

  return (
    <div className="bg-[#131313] font-sans text-[#e5e2e1] min-h-screen relative overflow-x-hidden selection:bg-[#b2f700] selection:text-[#4e6e00] flex flex-col items-center justify-center p-4">
      {/* Background radial gradient */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(178,247,0,0.03),transparent_70%)]"></div>

      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pb-10">
        
        {/* Main Card */}
        <section className="relative w-full max-w-[440px] overflow-hidden rounded-2xl bg-[#1c1b1b] p-8 md:p-10 shadow-2xl transition-all duration-300 border border-[#262626]">
          {/* Subtle top glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-[#b2f700]/5 blur-3xl"></div>

          <div className="relative z-10 flex flex-col">
            
            {/* Header / Logo */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-[#2a2a2a] p-1.5 rounded text-[#b2f700] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">temp_preferences_custom</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">LearnDeck</span>
              </div>
              <p className="text-[10px] font-bold text-[#71717a] tracking-widest uppercase mt-0.5">Cognitive Recall Suite</p>
            </div>

            {/* Title Area */}
            <header className="mb-8 flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">Create a new password</h1>
              <p className="text-sm text-[#a1a1aa] leading-relaxed px-4">
                Enter a secure new password for your LearnDeck account to regain full access.
              </p>
            </header>

            {status === 'error' && errorMessage && (
              <div className="mb-6 flex flex-col items-start gap-2 rounded-lg bg-[#93000a]/20 p-3 md:p-4 text-[#ffb4ab] transition-all" role="alert">
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-[#ffb4ab] text-[18px] mt-0.5 shrink-0">error</span>
                  <span className="text-sm text-[#ffb4ab]">{errorMessage}</span>
                </div>
                {errorMessage.includes('invalid') && (
                  <Link to="/forgot-password" className="text-sm text-[#b2f700] underline ml-6 hover:text-[#a6fa00]">Request a new reset link</Link>
                )}
              </div>
            )}

            <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
              
              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-semibold text-white">
                    New password <span className="text-[#b2f700]">*</span>
                  </label>
                  <span className="text-[10px] text-[#71717a] font-mono">{password.length} chars</span>
                </div>
                <div className="relative flex items-center">
                  <span className={`material-symbols-outlined pointer-events-none absolute left-3.5 text-[20px] transition-colors ${status === 'error' && password !== confirmPassword ? 'text-[#ffb4ab]' : 'text-[#71717a]'}`}>
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (status === 'error') setStatus('initial');
                    }}
                    disabled={status === 'loading'}
                    placeholder="Enter your new password"
                    required
                    className={`w-full h-11 pl-11 pr-11 rounded-lg bg-[#262626] border border-[#333333] text-sm text-[#e5e2e1] placeholder:text-[#71717a] outline-none transition-all duration-200 focus:bg-[#2a2a2a] focus:border-[#b2f700] focus:shadow-[0_0_0_1px_rgba(178,247,0,0.5)]`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-[#71717a] hover:text-[#e5e2e1] transition-colors flex items-center focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white">
                  Confirm password <span className="text-[#b2f700]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className={`material-symbols-outlined pointer-events-none absolute left-3.5 text-[20px] transition-colors ${status === 'error' && password !== confirmPassword ? 'text-[#ffb4ab]' : 'text-[#71717a]'}`}>
                    verified_user
                  </span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (status === 'error') setStatus('initial');
                    }}
                    disabled={status === 'loading'}
                    placeholder="Re-enter your new password"
                    required
                    className={`w-full h-11 pl-11 pr-11 rounded-lg bg-[#262626] border border-[#333333] text-sm text-[#e5e2e1] placeholder:text-[#71717a] outline-none transition-all duration-200 focus:bg-[#2a2a2a] focus:border-[#b2f700] focus:shadow-[0_0_0_1px_rgba(178,247,0,0.5)]`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 text-[#71717a] hover:text-[#e5e2e1] transition-colors flex items-center focus:outline-none"
                    aria-label="Toggle confirm password visibility"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="relative mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#b2f700] px-4 text-sm font-semibold text-[#111f00] transition-all duration-200 hover:brightness-105 hover:bg-[#a6fa00] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_16px_-4px_rgba(178,247,0,0.2)]"
              >
                {status === 'loading' ? (
                  <>
                    <span>Resetting...</span>
                    <svg className="h-4 w-4 animate-spin text-[#111f00]" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center">
                <Link to="/login" className="flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-[#e5e2e1] transition-colors">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Back to login
                </Link>
              </div>

            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResetPassword;
