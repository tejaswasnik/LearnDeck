import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { resetPassword } from '../service/auth.api.js';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <div className="bg-[#131313] font-sans text-[#e5e2e1] min-h-screen relative overflow-x-hidden selection:bg-[#b2f700] selection:text-[#4e6e00] flex flex-col items-center justify-between">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(178,247,0,0.04),transparent_65%)]"></div>

      <header className="relative z-10 w-full pt-10 pb-6 flex items-center justify-center">
        <Link to="/" className="inline-flex items-center gap-2 group focus:outline-none focus:ring-1 focus:ring-[#b2f700] rounded-lg p-1 transition-transform duration-200 hover:scale-[1.02]">
          <span className="text-xl font-semibold text-[#e5e2e1] tracking-tight">LearnDeck</span>
        </Link>
      </header>

      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-5 md:px-8 pb-10">
        <section className="relative w-full max-w-[428px] overflow-hidden rounded-xl bg-[#1c1b1b] p-6 md:p-10 shadow-2xl transition-all duration-300">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#b2f700] to-transparent opacity-85"></div>
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-[#b2f700]/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col transition-opacity duration-300">
            <div className="mb-6 flex items-center justify-between">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-[#201f1f] shadow-md">
                <span className="material-symbols-outlined text-[#b2f700] text-[24px]">lock_reset</span>
                <div className="absolute inset-0 rounded-lg bg-[#b2f700]/10 blur-[8px] -z-10"></div>
              </div>
            </div>

            <header className="mb-6 flex flex-col gap-1.5">
              <h1 className="text-2xl font-semibold tracking-tight text-[#e5e2e1]">Reset password</h1>
              <p className="text-sm text-[#c8c6c5] leading-relaxed">Please enter your new password below.</p>
            </header>

            {status === 'error' && errorMessage && (
              <div className="mb-4 flex flex-col items-start gap-2 rounded-lg bg-[#93000a]/20 p-3 md:p-4 text-[#ffb4ab] transition-all" role="alert">
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-[#ffb4ab] text-[18px] mt-0.5 shrink-0">error</span>
                  <span className="text-sm text-[#ffb4ab]">{errorMessage}</span>
                </div>
                {errorMessage.includes('invalid') && (
                  <Link to="/forgot-password" className="text-sm text-[#b2f700] underline ml-6 hover:text-[#a6fa00]">Request a new reset link</Link>
                )}
              </div>
            )}

            <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#c8c6c5]" htmlFor="password">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <span className={`material-symbols-outlined pointer-events-none absolute left-3.5 text-[20px] transition-colors ${status === 'error' && password !== confirmPassword ? 'text-[#ffb4ab]' : 'text-[#8c9479]'}`}>lock</span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (status === 'error') setStatus('initial');
                    }}
                    disabled={status === 'loading'}
                    placeholder="••••••••"
                    required
                    className={`w-full h-11 pl-11 pr-4 rounded-lg bg-[#201f1f] text-sm text-[#e5e2e1] placeholder:text-[#8c9479]/60 outline-none transition-all duration-200 focus:bg-[#2a2a2a] focus:shadow-[0_0_0_1px_#b8ff00,0_0_20px_-4px_rgba(184,255,0,0.25)]`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#c8c6c5]" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <span className={`material-symbols-outlined pointer-events-none absolute left-3.5 text-[20px] transition-colors ${status === 'error' && password !== confirmPassword ? 'text-[#ffb4ab]' : 'text-[#8c9479]'}`}>lock</span>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (status === 'error') setStatus('initial');
                    }}
                    disabled={status === 'loading'}
                    placeholder="••••••••"
                    required
                    className={`w-full h-11 pl-11 pr-4 rounded-lg bg-[#201f1f] text-sm text-[#e5e2e1] placeholder:text-[#8c9479]/60 outline-none transition-all duration-200 focus:bg-[#2a2a2a] focus:shadow-[0_0_0_1px_#b8ff00,0_0_20px_-4px_rgba(184,255,0,0.25)]`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="relative mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#b2f700] px-4 text-sm font-semibold text-[#4e6e00] transition-all duration-200 hover:brightness-105 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_16px_-4px_rgba(178,247,0,0.3)]"
              >
                {status === 'loading' ? (
                  <>
                    <span>Resetting password...</span>
                    <svg className="h-5 w-5 animate-spin text-[#4e6e00]" fill="none" viewBox="0 0 24 24">
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
            </form>
          </div>
        </section>
      </main>

      <div className="relative z-10 w-full py-6 text-center">
        <p className="text-[10px] text-[#c2caad] uppercase tracking-widest opacity-60">Precision Learning Environment</p>
      </div>
    </div>
  );
};

export default ResetPassword;
