import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { forgotPassword } from '../service/auth.api.js';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('initial'); // 'initial', 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        let timer;
        if (resendCooldown > 0) {
            timer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const isValidEmail = (val) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (status === 'error') {
            setStatus('initial');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !isValidEmail(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        setStatus('loading');

        try {
            await forgotPassword(email);
            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please check your network and try again.');
        }
    };

    const handleResend = () => {
        if (resendCooldown > 0) return;
        setResendCooldown(45);
        // Trigger actual resend logic here
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
                    {/* Top Active Edge Halo Accent */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#b2f700] to-transparent opacity-85"></div>

                    {/* Background Subtle Atmospheric Glow */}
                    <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-[#b2f700]/10 blur-3xl"></div>

                    {status !== 'success' ? (
                        <div className="relative z-10 flex flex-col transition-opacity duration-300">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-[#201f1f] shadow-md">
                                    <span className="material-symbols-outlined text-[#b2f700] text-[24px]">key_vertical</span>
                                    <div className="absolute inset-0 rounded-lg bg-[#b2f700]/10 blur-[8px] -z-10"></div>
                                </div>
                            </div>

                            <header className="mb-6 flex flex-col gap-1.5">
                                <h1 className="text-2xl font-semibold tracking-tight text-[#e5e2e1]">Forgot your password?</h1>
                                <p className="text-sm text-[#c8c6c5] leading-relaxed">Enter the email associated with your account and we'll dispatch a secure recovery link.</p>
                            </header>

                            {status === 'error' && errorMessage && (
                                <div className="mb-4 flex items-start gap-2 rounded-lg bg-[#93000a]/20 p-3 md:p-4 text-[#ffb4ab] transition-all" role="alert">
                                    <span className="material-symbols-outlined text-[#ffb4ab] text-[18px] mt-0.5 shrink-0">error</span>
                                    <span className="text-sm text-[#ffb4ab]">{errorMessage}</span>
                                </div>
                            )}

                            <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-[#c8c6c5]" htmlFor="recovery-email">
                                        Email address
                                    </label>
                                    <div className="relative flex items-center">
                                        <span className={`material-symbols-outlined pointer-events-none absolute left-3.5 text-[20px] transition-colors ${status === 'error' ? 'text-[#ffb4ab]' : 'text-[#8c9479]'}`}>mail</span>
                                        <input
                                            id="recovery-email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            disabled={status === 'loading'}
                                            placeholder="name@example.com"
                                            autoComplete="email"
                                            required
                                            className={`w-full h-11 pl-11 pr-4 rounded-lg bg-[#201f1f] text-sm text-[#e5e2e1] placeholder:text-[#8c9479]/60 outline-none transition-all duration-200 focus:bg-[#2a2a2a] focus:shadow-[0_0_0_1px_#b8ff00,0_0_20px_-4px_rgba(184,255,0,0.25)] ${status === 'error' ? 'shadow-[0_0_0_1px_#ffb4ab]' : ''}`}
                                        />
                                    </div>
                                    {status === 'error' && email && !isValidEmail(email) && (
                                        <span className="text-xs text-[#ffb4ab] mt-0.5">Please check this email address syntax.</span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="relative mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#b2f700] px-4 text-sm font-semibold text-[#4e6e00] transition-all duration-200 hover:brightness-105 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_16px_-4px_rgba(178,247,0,0.3)]"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span>Sending...</span>
                                            <svg className="h-5 w-5 animate-spin text-[#4e6e00]" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Reset Link</span>
                                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            <footer className="mt-6 pt-4 flex items-center justify-center">
                                <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-[#c8c6c5] transition-colors hover:text-[#e5e2e1] group">
                                    <span className="material-symbols-outlined text-[16px] text-[#8c9479] transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:text-[#b2f700]">arrow_back</span>
                                    <span>Remember your password?</span>
                                    <span className="font-semibold text-[#b2f700] underline decoration-[#b2f700]/40 underline-offset-4 transition-colors group-hover:decoration-[#b2f700]">Back to login</span>
                                </Link>
                            </footer>
                        </div>
                    ) : (
                        <div className="relative z-10 flex flex-col items-center text-center transition-opacity duration-300">
                            {/* Glow Radar Envelope Avatar */}
                            <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#201f1f] shadow-2xl">
                                <span className="material-symbols-outlined text-[#b2f700] text-[32px]">mark_email_read</span>
                                <div className="absolute inset-0 rounded-full bg-[#b2f700]/20 blur-xl animate-pulse"></div>
                                <div className="absolute -inset-1 rounded-full bg-[#b2f700]/10 -z-10"></div>
                            </div>

                            {/* Success Typography */}
                            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-[#e5e2e1]">Check your email</h2>
                            <p className="text-sm text-[#c8c6c5] leading-relaxed max-w-[340px]">
                                If an account exists for <span className="font-semibold text-[#e5e2e1]">{email}</span>, we've sent a password reset token with follow-up instructions.
                            </p>

                            {/* Operational Guidance Banner */}
                            <div className="my-6 w-full rounded-lg bg-[#201f1f] p-4 text-left">
                                <div className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[#b2f700] text-[18px] shrink-0 mt-0.5">verified_user</span>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-semibold text-[#e5e2e1]">Didn't receive the email?</span>
                                        <span className="text-xs text-[#c8c6c5]">Check your spam folder or verify with your organization domain administrator.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Resend & Countdown Controls */}
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#201f1f] text-sm font-semibold text-[#e5e2e1] transition-all duration-200 hover:bg-[#2a2a2a] hover:text-[#b2f700] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendCooldown > 0}
                                >
                                    <span className="material-symbols-outlined text-[18px]">cached</span>
                                    <span>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend email'}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setStatus('initial');
                                        setEmail('');
                                    }}
                                    className="flex h-10 w-full items-center justify-center text-sm text-[#c8c6c5] transition-colors hover:text-[#e5e2e1] gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                    Try a different email
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            <div className="relative z-10 w-full py-6 text-center">
                <p className="text-[10px] text-[#c2caad] uppercase tracking-widest opacity-60">Precision Learning Environment</p>
            </div>
        </div>
    );
};

export default ForgotPassword;
