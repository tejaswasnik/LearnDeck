import React from 'react';
import { Link } from 'react-router';

const PasswordResetSuccess = () => {
  return (
    <div className="bg-[#131313] font-sans text-[#e5e2e1] min-h-screen relative overflow-x-hidden selection:bg-[#b2f700] selection:text-[#4e6e00] flex flex-col items-center justify-between">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(178,247,0,0.04),transparent_65%)]"></div>

      <header className="relative z-10 w-full pt-10 pb-6 flex items-center justify-center">
        <Link to="/" className="inline-flex items-center gap-2 group focus:outline-none focus:ring-1 focus:ring-[#b2f700] rounded-lg p-1 transition-transform duration-200 hover:scale-[1.02]">
          <span className="text-xl font-semibold text-[#e5e2e1] tracking-tight">LearnDeck</span>
        </Link>
      </header>

      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-5 md:px-8 pb-10">
        <div className="flex flex-col w-full items-center justify-center relative">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-44 bg-[#b2f700]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="relative w-full bg-[#1c1b1b] rounded-xl p-6 sm:p-10 shadow-2xl flex flex-col items-center text-center overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#b2f700] to-transparent opacity-80"></div>

              <div className="w-16 h-16 rounded-full bg-[#b2f700]/10 flex items-center justify-center mb-6 text-[#b2f700] shadow-[0_0_30px_rgba(178,247,0,0.18)] relative group">
                <div className="absolute inset-0 rounded-full bg-[#b2f700]/5 animate-ping opacity-25"></div>
                <svg aria-hidden="true" className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>

              <div className="flex items-center justify-center gap-2 mb-4 bg-[#201f1f] px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b2f700]"></div>
                <span className="text-[10px] font-bold text-[#c2caad] uppercase tracking-wider">Security Status Updated</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-[#e5e2e1] tracking-tight mb-2">
                Password reset successful
              </h1>
              <p className="text-sm text-[#c2caad] leading-relaxed max-w-xs mb-6">
                Your password has been successfully updated. You can now log in with your new credentials.
              </p>

              <Link to="/login" className="w-full bg-[#b2f700] hover:bg-[#a6fa00] text-[#4e6e00] font-semibold text-sm py-3.5 px-6 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group focus:outline-none">
                <span>Continue to Login</span>
                <span aria-hidden="true" className="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
              </Link>

              <div className="mt-6 pt-4 flex items-center justify-center gap-1.5 text-sm text-[#c2caad] opacity-75">
                <span aria-hidden="true" className="material-symbols-outlined text-sm text-[#b2f700]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <span>For your security, you'll need to sign in again.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="relative z-10 w-full max-w-lg mx-auto py-2 flex justify-between px-8 text-center text-[#c2caad] opacity-60">
        <p className="text-[10px] uppercase tracking-widest">Session ID: #49F-262X</p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#b2f700]"></div>
          <p className="text-[10px] uppercase tracking-widest">End-to-End Encrypted</p>
        </div>
      </div>

      <div className="relative z-10 w-full pb-10 text-center flex items-center justify-center">
        <p className="text-[10px] text-[#c2caad] uppercase tracking-widest opacity-60">Precision Learning Environment</p>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
