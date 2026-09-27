import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { verifyEmail } from "../service/auth.api.js";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("Verification token is missing.");
        return;
      }

      try {
        await verifyEmail(token);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          err?.message || "This verification link has expired or is invalid."
        );
      }
    };

    // Small delay for animation effect
    const timeoutId = setTimeout(() => {
      confirmEmail();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [token]);

  return (
    <div className="bg-[#131313] font-body-md text-body-md text-on-surface min-h-screen selection:bg-primary-container selection:text-surface-container-lowest">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-8 h-8"
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
            <span className="font-headline-sm text-[20px] text-primary tracking-tight font-semibold">
              LearnDeck
            </span>
          </Link>
        </div>
      </header>

      <main className="w-full pt-16 min-h-screen">
        <div className="flex flex-col w-full min-h-[calc(100vh-4rem)]">
          {/* Stage Area with Subtle Glow */}
          <div className="relative w-full flex items-center justify-center px-4 md:px-8 py-10 flex-1 overflow-hidden">
            {/* Atmospheric Ambient Glow Backdrops */}
            <div
              className={`absolute w-[440px] h-[440px] bg-primary-container/10 rounded-full blur-[110px] pointer-events-none -z-10 transition-opacity duration-700 ${
                status !== "error" ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute w-[440px] h-[440px] bg-error/10 rounded-full blur-[110px] pointer-events-none -z-10 transition-opacity duration-700 ${
                status === "error" ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            {/* MAIN WRAPPER CARD */}
            <div className="w-full max-w-[440px] relative z-10">
              {/* STATE: LOADING */}
              {status === "loading" && (
                <section className="flex flex-col items-center text-center p-10 rounded-xl bg-surface-container-low border border-[#333333] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in duration-300">
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-primary-container/10 animate-ping opacity-60"></div>
                    <div className="absolute inset-2 rounded-full bg-primary-container/15 animate-pulse"></div>
                    <div className="relative w-14 h-14 rounded-full bg-[#201f1f] flex items-center justify-center shadow-[0_0_20px_rgba(178,247,0,0.25)]">
                      <span className="material-symbols-outlined text-primary-container text-[28px] animate-spin">
                        sync
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-[#353534] text-primary-container text-[10px] font-semibold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                    ENCRYPTED HANDSHAKE
                  </div>
                  <h2 className="text-[24px] font-semibold text-primary mb-2 tracking-tight">
                    Verifying your email...
                  </h2>
                  <p className="text-[14px] text-on-surface-variant max-w-[360px] mb-8">
                    Please wait a moment while we confirm your cryptographic
                    token and activate your LearnDeck environment.
                  </p>
                  <div className="w-full bg-[#201f1f] rounded-full h-1.5 mb-6 overflow-hidden relative">
                    <div className="absolute top-0 bottom-0 left-0 bg-primary-container w-1/3 rounded-full animate-[progress_1.6s_ease-in-out_infinite]"></div>
                  </div>
                  <style>{`
                    @keyframes progress {
                      0% { left: -30%; width: 25%; }
                      50% { left: 40%; width: 50%; }
                      100% { left: 105%; width: 25%; }
                    }
                  `}</style>
                </section>
              )}

              {/* STATE: SUCCESS */}
              {status === "success" && (
                <section className="flex flex-col items-center text-center p-10 rounded-xl bg-surface-container-low border border-[#333333] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in duration-300">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-md scale-125"></div>
                    <div className="relative w-16 h-16 rounded-full bg-[#201f1f] flex items-center justify-center shadow-[0_0_24px_rgba(178,247,0,0.3)]">
                      <span
                        className="material-symbols-outlined text-primary-container text-[36px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-[#353534] text-primary-container text-[10px] font-semibold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    ACCESS AUTHORIZED
                  </div>
                  <h1 className="text-[32px] font-semibold text-primary mb-2 tracking-tight">
                    Verification Successful
                  </h1>
                  <p className="text-[14px] text-on-surface-variant max-w-[360px] mb-8">
                    Your email address has been verified. You now have full
                    access to LearnDeck courses, interactive code environments,
                    and project workspaces.
                  </p>
                  <Link
                    to="/login"
                    className="w-full py-3 px-6 rounded-md bg-primary-container hover:brightness-110 text-[#131f00] text-[14px] font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_4px_16px_rgba(178,247,0,0.25)] active:scale-[0.98]"
                  >
                    Log in to your account
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </Link>
                </section>
              )}

              {/* STATE: ERROR */}
              {status === "error" && (
                <section className="flex flex-col items-center text-center p-10 rounded-xl bg-surface-container-low border border-[#333333] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in duration-300">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-error/20 blur-md scale-125"></div>
                    <div className="relative w-16 h-16 rounded-full bg-[#201f1f] flex items-center justify-center shadow-[0_0_24px_rgba(255,180,171,0.2)]">
                      <span className="material-symbols-outlined text-error text-[36px]">
                        schedule
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 rounded-full bg-error-container/30 text-error text-[10px] font-semibold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                    TOKEN INVALID
                  </div>
                  <h2 className="text-[32px] font-semibold text-primary mb-2 tracking-tight">
                    Link Expired
                  </h2>
                  <p className="text-[14px] text-on-surface-variant max-w-[360px] mb-6">
                    {errorMessage}
                  </p>

                  <Link
                    to="/register"
                    className="w-full py-3 px-6 rounded-md bg-[#353534] hover:bg-[#4a4a4a] text-on-surface text-[14px] font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      person_add
                    </span>
                    Return to Sign up
                  </Link>

                  <div className="mt-6 flex items-center justify-center gap-4 text-[12px]">
                    <Link
                      to="/login"
                      className="text-on-surface-variant hover:text-primary transition-colors"
                    >
                      Back to Login
                    </Link>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;
