import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../../../components/Navbar";

// ─── Reusable FAQ Item ───────────────────────────────────────────
function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden">
            <button
                className="w-full p-5 flex items-center justify-between text-left font-[500] text-[17px] text-on-surface"
                onClick={() => setOpen(!open)}
            >
                <span>{question}</span>
                <span
                    className={`material-symbols-outlined text-primary-container transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    expand_more
                </span>
            </button>
            <div
                className={`px-5 pb-5 pt-0 text-on-surface-variant text-[12px] leading-[18px] tracking-[0.01em] ${open ? "" : "hidden"}`}
            >
                {answer}
            </div>
        </div>
    );
}

// ─── Star Rating Component ───────────────────────────────────────
function FilledStar() {
    return (
        <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: '"FILL" 1' }}
        >
            star
        </span>
    );
}

const LandingPage = () => {
    return (
        <div className="bg-surface font-[Geist,sans-serif] text-[14px] leading-[20px] text-on-surface min-h-screen">
            {/* ═══════ HEADER / NAVBAR ═══════ */}
            <Navbar />

            {/* ═══════ MAIN CONTENT ═══════ */}
            <main className="w-full pt-[68px] bg-surface">
                <div className="flex flex-col w-full">
                    {/* ──── SECTION 1: HERO ──── */}
                    <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-20">
                        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-primary-container/10 blur-[120px] pointer-events-none" />
                        <div className="absolute top-1/2 right-[-5%] h-80 w-80 rounded-full bg-surface-tint/5 blur-[100px] pointer-events-none" />

                        <div className="max-w-full mx-auto px-6 lg:px-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                                {/* Hero Text */}
                                <div className="lg:col-span-6 flex flex-col gap-6 z-10">
                                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 w-fit">
                                        <span className="flex h-2 w-2 rounded-full bg-primary-container animate-pulse" />
                                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container uppercase">
                                            New Session Cohort Open
                                        </span>
                                    </div>
                                    <h1 className="text-[48px] font-[700] leading-[56px] tracking-[-0.03em] text-on-surface">
                                        Learn skills that move your career{" "}
                                        <span className="text-primary-container">forward.</span>
                                    </h1>
                                    <p className="text-[16px] leading-[24px] tracking-[-0.005em] text-on-surface-variant max-w-xl">
                                        Learn from industry-focused courses, build real projects,
                                        and develop skills that actually matter in high-velocity
                                        engineering environments.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                        <a
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-black text-[14px] font-[600] leading-[20px] tracking-[0.01em] font-semibold hover:bg-tertiary-fixed transition-all shadow-[0_0_24px_-4px_rgba(184,255,0,0.3)]"
                                            href="#courses"
                                        >
                                            <span>Explore Courses</span>
                                            <span className="material-symbols-outlined text-[18px]">
                                                arrow_forward
                                            </span>
                                        </a>
                                    </div>
                                    {/* Trust Sub-badge */}
                                    <div className="flex items-center gap-4 pt-4 text-on-surface-variant">
                                        <p className="text-[12px] leading-[18px] tracking-[0.01em] text-on-surface-variant">
                                            Joined by{" "}
                                            <span className="text-on-surface font-medium">
                                                10,000+ engineers
                                            </span>{" "}
                                            at top tier scale-ups
                                        </p>
                                    </div>
                                </div>

                                {/* Hero Graphic */}
                                <div className="lg:col-span-6 relative">
                                    <div className="relative mx-auto max-w-lg lg:max-w-none">
                                        {/* Floating Study Streak Badge */}
                                        <div
                                            className="absolute -top-4 -left-4 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-surface-container-high border border-outline-variant/40 shadow-xl backdrop-blur-md animate-bounce"
                                            style={{ animationDuration: "4s" }}
                                        >
                                            <span className="text-base">🔥</span>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                                    14-Day Study Streak
                                                </span>
                                                <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container">
                                                    Top 5% Learner Pace
                                                </span>
                                            </div>
                                        </div>

                                        {/* Floating Progress Mini-Card */}
                                        <div className="absolute -bottom-6 -right-4 z-20 flex items-center gap-3.5 px-4 py-3 rounded-lg bg-surface-container-high border border-outline-variant/40 shadow-xl">
                                            <div className="relative w-10 h-10 flex items-center justify-center">
                                                <svg
                                                    className="w-10 h-10 transform -rotate-90"
                                                    viewBox="0 0 36 36"
                                                >
                                                    <path
                                                        className="text-surface-container-highest stroke-current"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        strokeWidth="3.5"
                                                    />
                                                    <path
                                                        className="text-primary-container stroke-current"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        fill="none"
                                                        strokeDasharray="88, 100"
                                                        strokeLinecap="round"
                                                        strokeWidth="3.5"
                                                    />
                                                </svg>
                                                <span className="absolute text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-semibold text-on-surface">
                                                    88%
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                                    Course Completion
                                                </span>
                                                <span className="text-[12px] leading-[18px] tracking-[0.01em] text-on-surface-variant">
                                                    4 modules remaining
                                                </span>
                                            </div>
                                        </div>

                                        {/* Main Interactive Shell Mockup */}
                                        <div className="rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/40 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)]">
                                            {/* Window Chrome Header */}
                                            <div className="flex items-center justify-between px-4 py-3 bg-surface-container-lowest border-b border-outline-variant/30">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-error-container/60" />
                                                    <span className="w-3 h-3 rounded-full bg-surface-bright" />
                                                    <span className="w-3 h-3 rounded-full bg-outline" />
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-on-surface-variant text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-mono">
                                                    <span className="material-symbols-outlined text-[14px] text-primary-container">
                                                        lock
                                                    </span>
                                                    <span>learndeck.internal/player/rust-go-dist</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="px-2 py-0.5 rounded bg-primary-container/10 text-primary-container text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-semibold">
                                                        HD
                                                    </span>
                                                    <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-[600] leading-[14px] tracking-[0.05em]">
                                                        1.25x
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Video Content Showcase */}
                                            <div className="relative bg-surface-container-lowest">
                                                <div
                                                    className="h-64 sm:h-72 w-full bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkCo55Wt8QoK0TU3j-_qzykBa1rStRtcQWFJpSlmVnkpZt08iH_uwLUiXIKQc_06Yz0sZ5Ff506uAgIH-juHhUo59Os265atPY2hvYq1WKgVmQ3yDpXWnKzYhh2-mDmuC0oSxLUeXrr5PnqQqYxIxqNAnzedLuUXjlpCf0iShAkCX-3Aqf2MXmLDPy9oMau22zY7Y8S1-cbqr0TGYgKE85Wer7Uf7-mPX42vQSp4XgZ5a2A7r5UlIG")`,
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent" />
                                                </div>
                                                {/* Play Overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <button className="w-14 h-14 rounded-full bg-primary-container text-black flex items-center justify-center shadow-[0_0_30px_rgba(184,255,0,0.4)] hover:scale-105 transition-transform">
                                                        <span
                                                            className="material-symbols-outlined text-[32px]"
                                                            style={{
                                                                fontVariationSettings: '"FILL" 1',
                                                            }}
                                                        >
                                                            play_arrow
                                                        </span>
                                                    </button>
                                                </div>
                                                {/* Playback Timeline */}
                                                <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-2">
                                                    <div className="flex items-center justify-between text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-mono text-on-surface">
                                                        <span className="flex items-center gap-1.5">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                                                            18:42 / 24:10
                                                        </span>
                                                        <span className="text-on-surface-variant">
                                                            Lesson 14: Raft Consensus Engine
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-surface-bright/50 h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="bg-primary-container h-full rounded-full"
                                                            style={{ width: "68%" }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Lower Metadata Panel */}
                                            <div className="p-5 flex flex-col gap-3 bg-surface-container-low border-t border-outline-variant/30">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container uppercase font-semibold">
                                                            Live Sandbox Track
                                                        </span>
                                                        <h3 className="text-[20px] font-[500] leading-[28px] tracking-[-0.01em] text-on-surface">
                                                            Full-Stack Distributed Systems with Rust &amp; Go
                                                        </h3>
                                                    </div>
                                                    <span className="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-medium">
                                                        Cap 04
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                                                    Alex Rivera
                                                                </span>
                                                                <span
                                                                    className="material-symbols-outlined text-primary-container text-[14px]"
                                                                    style={{
                                                                        fontVariationSettings: '"FILL" 1',
                                                                    }}
                                                                >
                                                                    verified
                                                                </span>
                                                            </div>
                                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                                Ex-Staff Platform Eng
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-tertiary-fixed text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-medium">
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            terminal
                                                        </span>
                                                        <span>Interactive Workspace</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 2: TRUST / METRICS ──── */}
                    <section className="w-full border-y border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur-sm py-8">
                        <div className="max-w-full mx-auto px-6 lg:px-12">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
                                <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0">
                                    <span className="text-[48px] font-[700] leading-[56px] tracking-[-0.03em] text-on-surface leading-none">
                                        10K<span className="text-primary-container">+</span>
                                    </span>
                                    <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface-variant uppercase mt-2">
                                        Active Learners
                                    </span>
                                </div>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0 md:pl-8">
                                    <span className="text-[48px] font-[700] leading-[56px] tracking-[-0.03em] text-on-surface leading-none">
                                        500<span className="text-primary-container">+</span>
                                    </span>
                                    <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface-variant uppercase mt-2">
                                        Vetted Tech Courses
                                    </span>
                                </div>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0 md:pl-8">
                                    <span className="text-[48px] font-[700] leading-[56px] tracking-[-0.03em] text-on-surface leading-none">
                                        100<span className="text-primary-container">+</span>
                                    </span>
                                    <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface-variant uppercase mt-2">
                                        Industry Instructors
                                    </span>
                                </div>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0 md:pl-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[48px] font-[700] leading-[56px] tracking-[-0.03em] text-on-surface leading-none">
                                            4.8
                                        </span>
                                        <div className="flex text-primary-container">
                                            <span
                                                className="material-symbols-outlined text-[20px]"
                                                style={{ fontVariationSettings: '"FILL" 1' }}
                                            >
                                                star
                                            </span>
                                            <span
                                                className="material-symbols-outlined text-[20px]"
                                                style={{ fontVariationSettings: '"FILL" 1' }}
                                            >
                                                star
                                            </span>
                                            <span
                                                className="material-symbols-outlined text-[20px]"
                                                style={{ fontVariationSettings: '"FILL" 1' }}
                                            >
                                                star
                                            </span>
                                            <span
                                                className="material-symbols-outlined text-[20px]"
                                                style={{ fontVariationSettings: '"FILL" 1' }}
                                            >
                                                star
                                            </span>
                                            <span
                                                className="material-symbols-outlined text-[20px]"
                                                style={{ fontVariationSettings: '"FILL" 1' }}
                                            >
                                                star_half
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface-variant uppercase mt-2">
                                        28,000+ Verified Reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 3: EXPLORE CATEGORIES ──── */}
                    <section
                        className="w-full py-16 lg:py-24 bg-surface"
                        id="categories"
                    >
                        <div className="max-w-full mx-auto px-6 lg:px-12 flex flex-col gap-12">
                            <div className="flex flex-col gap-2">
                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container font-semibold uppercase">
                                    Skill Domains
                                </span>
                                <h2 className="text-[32px] font-[600] leading-[40px] tracking-[-0.02em] text-on-surface">
                                    Explore what you want to learn
                                </h2>
                                <p className="text-[14px] leading-[20px] text-on-surface-variant">
                                    Targeted skill paths structured for career advancement and
                                    engineering depth.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {[
                                    {
                                        icon: "code",
                                        title: "Web Development",
                                        count: "142 Courses",
                                    },
                                    {
                                        icon: "psychology",
                                        title: "AI & Machine Learning",
                                        count: "89 Courses",
                                    },
                                    {
                                        icon: "database",
                                        title: "Data Science",
                                        count: "64 Courses",
                                    },
                                    {
                                        icon: "draw",
                                        title: "UI/UX Design",
                                        count: "58 Courses",
                                    },
                                    {
                                        icon: "cloud_queue",
                                        title: "Business & Cloud",
                                        count: "45 Courses",
                                    },
                                    {
                                        icon: "shield",
                                        title: "Cybersecurity",
                                        count: "38 Courses",
                                    },
                                ].map((cat) => (
                                    <a
                                        key={cat.title}
                                        className="group flex flex-col p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 hover:border-primary-container/80 hover:-translate-y-1 transition-all duration-200"
                                        href="#courses"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-black transition-colors mb-4">
                                            <span className="material-symbols-outlined text-[24px]">
                                                {cat.icon}
                                            </span>
                                        </div>
                                        <h3 className="text-[16px] font-semibold text-on-surface group-hover:text-primary-container transition-colors">
                                            {cat.title}
                                        </h3>
                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant mt-1">
                                            {cat.count}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 4: FEATURED COURSES ──── */}
                    <section
                        className="w-full py-16 lg:py-24 bg-surface-container-lowest"
                        id="courses"
                    >
                        <div className="max-w-full mx-auto px-6 lg:px-12 flex flex-col gap-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container font-semibold uppercase">
                                        Curated Curriculum
                                    </span>
                                    <h2 className="text-[32px] font-[600] leading-[40px] tracking-[-0.02em] text-on-surface">
                                        Learn from the best
                                    </h2>
                                    <p className="text-[14px] leading-[20px] text-on-surface-variant">
                                        Explore courses designed to help you build practical,
                                        career-ready skills with live code reviews.
                                    </p>
                                </div>
                                <a
                                    className="inline-flex items-center gap-1.5 text-primary-container text-[14px] font-[600] leading-[20px] tracking-[0.01em] hover:underline font-semibold"
                                    href="#courses"
                                >
                                    <span>View All Courses</span>
                                    <span className="material-symbols-outlined text-[18px]">
                                        arrow_forward
                                    </span>
                                </a>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Course Cards */}
                                {[
                                    {
                                        image:
                                            "https://lh3.googleusercontent.com/aida-public/AB6AXuDGIf67hiZgFvSdaLLqU-RBTa5BU1rYfu-BQmFwxVWPI4BkzzC5yPVG5nZB5JczeONGoLQcRcPHI6JP_TofGM_14JJSvbWT4fH0kBZ6X4dsnCl6H36YYELFjJ0nNLvr1WBesM1_wDo9E3-q0agTuPivdaLIU3Th7QyFd1De1bV6ttThlDCIZn1V4d7YU03npddkMxK_aZbuBHRKHsA2ZpBKmwDS87K0Um4t6p0f_c8CC86Jcs_28o0P",
                                        badge: "73% OFF",
                                        badgeClass:
                                            "bg-primary-container text-black",
                                        duration: "44h total",
                                        level: "Beginner · 12 Projects",
                                        title: "Complete Full Stack Web Development",
                                        instructor: "Dr. Sarah Chen",
                                        role: "Web Lead",
                                        rating: "4.9",
                                        reviews: "(3,412)",
                                        price: "₹799",
                                        oldPrice: "₹2,999",
                                    },
                                    {
                                        image:
                                            "https://lh3.googleusercontent.com/aida-public/AB6AXuA80NucgyzPZzyd3CtYV6nZkpr2HMzjYctz0dMZNwu9BScy9s0Q8SURrpdxN2tfvAaZuOGZ9chJiLNYpGjEIiblYmMXw1DKxyFuL0B8gG-EmQycWuQ4sbPzkKUIRG8phC22upsykJdP9lJQR3083VCkLBqysVS4k4b2cqWmrbaPcvQR96G6L8maVcAUxJtsIYwv_8g6Q8LOBIjQcvglf7NRhq63WDO312x_-nQTErOX6myGkWaljlmR",
                                        badge: "BESTSELLER",
                                        badgeClass:
                                            "bg-tertiary-fixed text-on-tertiary-fixed",
                                        duration: "38h total",
                                        level: "Advanced · PyTorch & CUDA",
                                        title: "Deep Learning & LLM Systems Engineering",
                                        instructor: "Marcus Vance",
                                        role: "AI Architect",
                                        rating: "4.8",
                                        reviews: "(1,840)",
                                        price: "₹999",
                                        oldPrice: "₹3,499",
                                    },
                                    {
                                        image:
                                            "https://lh3.googleusercontent.com/aida-public/AB6AXuBInudFTkF-ab98NxABbhzkQkPh4gefPgxXs4iVnkimGDQveEgSU9nzASqmU1W7a8vduZsQhjsbR-GoeCb-swncuV_zcF_04HMJy4AAoDF9a5atZ4d_9U04cmCDMxf3HJPlvQCYWq62S9aAKkiWh7Lf-Bl3Ua-ONdQeMmAllWNv0TQ1uxF5kxKf5VKeaimq3T0eaBYwzLucYcYeuiVVydEjnj-kyaYFAgQr2thWCbUwF0S60_MOjHP1",
                                        badge: "POPULAR",
                                        badgeClass: "bg-surface-bright text-primary",
                                        duration: "32h total",
                                        level: "Intermediate · Real-World Systems",
                                        title: "High-Performance Rust Microservices",
                                        instructor: "Elena Rostova",
                                        role: "Core Contributor",
                                        rating: "4.9",
                                        reviews: "(2,150)",
                                        price: "₹849",
                                        oldPrice: "₹2,799",
                                    },
                                    {
                                        image:
                                            "https://lh3.googleusercontent.com/aida-public/AB6AXuDXBtFjTHXjcb2KKYOif_q9ZMN1j2RnOI7asOi60C8UCYTHwl8Qp0xhjDT9VVcp-xqgG5V6J2t_pOq5gFsJe29DC5SXq3oI3hrc1zAYCY1vK1TQ7f2oSfHiab5mU7DrXc2uZVj2YxaX-MZ5lG3Fhh4FMI_0jyEGjOOE-Km95ua4bJRUofO2n-3hMLLQOHQf6r-gea_E5K0qT32LnxG2IkTr9UcqmFm--NXiuCN--AklznJSSk1E74Eg",
                                        badge: "UPDATED",
                                        badgeClass:
                                            "bg-surface-container-high text-primary-container",
                                        duration: "26h total",
                                        level: "All Levels · Tailwind & Figma",
                                        title: "Design Systems & UI Engineering with React",
                                        instructor: "David Kalu",
                                        role: "Principal Designer",
                                        rating: "4.8",
                                        reviews: "(980)",
                                        price: "₹699",
                                        oldPrice: "₹2,499",
                                    },
                                ].map((course) => (
                                    <div
                                        key={course.title}
                                        className="flex flex-col rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden hover:border-outline transition-all duration-200"
                                    >
                                        <div
                                            className="relative h-44 w-full bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url("${course.image}")`,
                                            }}
                                        >
                                            <span
                                                className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-semibold ${course.badgeClass}`}
                                            >
                                                {course.badge}
                                            </span>
                                            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-mono">
                                                {course.duration}
                                            </span>
                                        </div>
                                        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                    {course.level}
                                                </span>
                                                <h3 className="text-[18px] font-semibold text-on-surface leading-snug">
                                                    {course.title}
                                                </h3>
                                                <div className="flex items-center gap-2 pt-1">
                                                    <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-medium">
                                                        {course.instructor}
                                                    </span>
                                                    <span className="text-on-surface-variant text-[10px] font-[600] leading-[14px] tracking-[0.05em]">
                                                        · {course.role}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/20">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-1 text-primary-container text-[12px] font-[500] leading-[16px] tracking-[0.02em]">
                                                        <span
                                                            className="material-symbols-outlined text-[16px]"
                                                            style={{
                                                                fontVariationSettings: '"FILL" 1',
                                                            }}
                                                        >
                                                            star
                                                        </span>
                                                        <span className="font-semibold text-on-surface">
                                                            {course.rating}
                                                        </span>
                                                        <span className="text-on-surface-variant font-normal">
                                                            {course.reviews}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-baseline gap-1.5">
                                                        <span className="text-[20px] font-[500] leading-[28px] tracking-[-0.01em] font-bold text-on-surface">
                                                            {course.price}
                                                        </span>
                                                        <span className="text-[12px] leading-[18px] tracking-[0.01em] line-through text-on-secondary-container">
                                                            {course.oldPrice}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="w-full py-2.5 rounded-lg bg-surface-container hover:bg-primary-container hover:text-black text-on-surface text-[14px] font-[600] leading-[20px] tracking-[0.01em] font-semibold transition-all">
                                                    Enroll Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 5: HOW IT WORKS ──── */}
                    <section className="w-full py-16 lg:py-24 bg-surface-container-lowest border-y border-outline-variant/30">
                        <div className="max-w-full mx-auto px-6 lg:px-12 flex flex-col gap-14">
                            <div className="flex flex-col gap-2 max-w-xl">
                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container font-semibold uppercase">
                                    Methodology
                                </span>
                                <h2 className="text-[32px] font-[600] leading-[40px] tracking-[-0.02em] text-on-surface">
                                    How It Works
                                </h2>
                                <p className="text-[14px] leading-[20px] text-on-surface-variant">
                                    A clear, guided roadmap from novice to mastery with zero
                                    guesswork.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                                {[
                                    {
                                        num: "01",
                                        icon: "search",
                                        title: "Find a course",
                                        desc: "Discover courses based on your career goals, active stack requirements, and depth level needed for immediate execution.",
                                        progress: "w-1/2",
                                    },
                                    {
                                        num: "02",
                                        icon: "bolt",
                                        title: "Enroll",
                                        desc: "Seamlessly purchase or enroll with one-click instant sandbox provisioning, lifetime video access, and zero hidden platform fees.",
                                        progress: "w-1/2",
                                    },
                                    {
                                        num: "03",
                                        icon: "code_blocks",
                                        title: "Learn",
                                        desc: "Watch bite-sized lessons, execute code in the browser terminal, and test your comprehension with interactive flashcards.",
                                        progress: "w-1/2",
                                    },
                                    {
                                        num: "04",
                                        icon: "verified",
                                        title: "Achieve",
                                        desc: "Deploy your capstone project, pass rigorous peer evaluations, and receive your digitally verifiable industry credential.",
                                        progress: "w-full",
                                    },
                                ].map((step) => (
                                    <div key={step.num} className="flex flex-col gap-4 relative">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[32px] font-mono font-bold text-primary-container">
                                                {step.num}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                                                <span className="material-symbols-outlined text-[18px]">
                                                    {step.icon}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="h-0.5 w-full bg-surface-container-high relative">
                                            <div
                                                className={`h-full bg-primary-container ${step.progress}`}
                                            />
                                        </div>
                                        <h3 className="text-[20px] font-[500] leading-[28px] tracking-[-0.01em] text-on-surface font-semibold">
                                            {step.title}
                                        </h3>
                                        <p className="text-[12px] leading-[18px] tracking-[0.01em] text-on-surface-variant leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 6: LEARNING EXPERIENCE SHOWCASE ──── */}
                    <section className="w-full py-16 lg:py-24 bg-surface">
                        <div className="max-w-full mx-auto px-6 lg:px-12 flex flex-col gap-12">
                            <div className="flex flex-col max-w-2xl gap-2">
                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container font-semibold uppercase">
                                    The LearnDeck Player
                                </span>
                                <h2 className="text-[32px] font-[600] leading-[40px] tracking-[-0.02em] text-on-surface">
                                    A learning experience built around you.
                                </h2>
                                <p className="text-[14px] leading-[20px] text-on-surface-variant">
                                    An immersive, distraction-free environment equipped with
                                    split-screen terminals, live code execution, interactive
                                    transcript, and synced chapter notes.
                                </p>
                            </div>

                            {/* Player Chrome Frame */}
                            <div className="w-full rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-2xl overflow-hidden flex flex-col">
                                {/* Player Top Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-surface-container-low border-b border-outline-variant/30">
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-mono">
                                            GO-302
                                        </span>
                                        <div className="flex flex-col">
                                            <h4 className="text-[16px] text-on-surface font-semibold">
                                                Distributed Microservices in Go
                                            </h4>
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container">
                                                Chapter 3: Concurrency Patterns &amp; Memory Models
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface text-[12px] font-[500] leading-[16px] tracking-[0.02em] hover:bg-surface-container-high transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">
                                                bookmark
                                            </span>
                                            <span>Notes</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-black text-[12px] font-[500] leading-[16px] tracking-[0.02em] font-semibold hover:bg-tertiary-fixed transition-colors">
                                            <span className="material-symbols-outlined text-[16px]">
                                                play_circle
                                            </span>
                                            <span>Next Lesson</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Video + Syllabus Split */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                                    {/* Left Video/Terminal stage */}
                                    <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest border-b lg:border-b-0 lg:border-r border-outline-variant/30">
                                        <div className="relative flex-1 bg-surface-container-low flex flex-col justify-between p-6">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center opacity-70"
                                                style={{
                                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDytUu5anZG6u3cr9WYShWjRWf8Bg3Ov4F5HJ5O3ZCyOwVKMYvLb0e4XWFRx-hIxVzLZZ67_cjnSaB8Z-ETat4oY-fYGEmA9HfGxwoWPxOkh3nkFGQxcHlCAQoEbGdkg84kZYe52Hjwegu_TlGgpf87QHOLAqg6UnP0_9SzDi2ySnzx7WUFrpaplP_5MQ3jKht8vnhjjPJC-cSjMKzPrCjDzgZoVid-ZZBu9WW_mwkobDrXrFuqxoWh")`,
                                                }}
                                            />
                                            <div className="relative z-10 flex items-center justify-between">
                                                <span className="px-2.5 py-1 rounded bg-surface-container-lowest/80 text-on-surface text-[10px] font-[600] leading-[14px] tracking-[0.05em] font-mono border border-outline-variant/20">
                                                    channel_multiplex.go
                                                </span>
                                                <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-error-container/20 text-error text-[10px] font-[600] leading-[14px] tracking-[0.05em]">
                                                    <span className="w-2 h-2 rounded-full bg-error animate-ping" />
                                                    LIVE SANDBOX
                                                </span>
                                            </div>

                                            {/* Code Preview */}
                                            <div className="relative z-10 my-auto p-4 rounded-lg bg-surface-container-lowest/90 border border-outline-variant/30 font-mono text-[12px] leading-[18px] tracking-[0.01em] text-on-surface max-w-xl mx-auto shadow-2xl backdrop-blur-md">
                                                <div className="text-on-surface-variant">
                                                    {"// Worker pool multiplexer routine"}
                                                </div>
                                                <div className="text-primary-container font-semibold">
                                                    func{" "}
                                                    <span className="text-on-surface">Dispatcher</span>
                                                    (jobs &lt;-chan Job, results chan&lt;- Result) {"{"}
                                                </div>
                                                <div className="pl-4 text-on-surface">
                                                    {"for j := range jobs {"}
                                                </div>
                                                <div className="pl-8 text-on-surface-variant">
                                                    go worker(j, results)
                                                </div>
                                                <div className="pl-4 text-on-surface">{"}"}</div>
                                                <div className="text-primary-container">{"}"}</div>
                                            </div>

                                            {/* Controls bar */}
                                            <div className="relative z-10 flex items-center justify-between pt-4 bg-surface-container-lowest/80 -mx-6 -mb-6 p-4 border-t border-outline-variant/30 backdrop-blur-sm">
                                                <div className="flex items-center gap-3">
                                                    <button className="text-primary-container">
                                                        <span className="material-symbols-outlined text-[28px]">
                                                            pause_circle
                                                        </span>
                                                    </button>
                                                    <button className="text-on-surface-variant hover:text-on-surface">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            replay_10
                                                        </span>
                                                    </button>
                                                    <button className="text-on-surface-variant hover:text-on-surface">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            forward_10
                                                        </span>
                                                    </button>
                                                    <span className="font-mono text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface ml-2">
                                                        14:02 / 18:30
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-on-surface-variant">
                                                    <button className="hover:text-on-surface">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            closed_caption
                                                        </span>
                                                    </button>
                                                    <button className="hover:text-on-surface">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            speed
                                                        </span>
                                                    </button>
                                                    <button className="hover:text-on-surface">
                                                        <span className="material-symbols-outlined text-[20px]">
                                                            fullscreen
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Syllabus */}
                                    <div className="lg:col-span-4 bg-surface-container-low flex flex-col justify-between">
                                        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between">
                                            <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] font-semibold text-on-surface">
                                                Course Syllabus
                                            </span>
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container">
                                                7 of 18 completed
                                            </span>
                                        </div>
                                        <div className="flex-1 divide-y divide-outline-variant/20 overflow-y-auto">
                                            {/* Completed lessons */}
                                            <div className="p-3.5 flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                                                        check_circle
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface">
                                                            05. Channels Deep Dive
                                                        </span>
                                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                            12 min · Completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3.5 flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                                                        check_circle
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface">
                                                            06. Select statement hazards
                                                        </span>
                                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                            09 min · Completed
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Active lesson */}
                                            <div className="p-3.5 flex items-center justify-between bg-primary-container/10 border-l-2 border-primary-container">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-primary-container text-[18px] animate-pulse">
                                                        play_circle
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                                            07. Goroutines &amp; Multiplexing
                                                        </span>
                                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container">
                                                            14 min · Playing now
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Upcoming lessons */}
                                            <div className="p-3.5 flex items-center justify-between opacity-60 hover:opacity-100 hover:bg-surface-container transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                                                        radio_button_unchecked
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface">
                                                            08. Race Detection &amp; Mutexes
                                                        </span>
                                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                            16 min · Up next
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3.5 flex items-center justify-between opacity-60 hover:opacity-100 hover:bg-surface-container transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                                                        lock
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface">
                                                            09. Context Deadline Propagation
                                                        </span>
                                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                            21 min · Locked
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Syllabus footer */}
                                        <div className="p-3.5 bg-surface-container border-t border-outline-variant/30 flex items-center justify-between">
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                Need help with code?
                                            </span>
                                            <a
                                                className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container font-semibold hover:underline"
                                                href="#"
                                            >
                                                Ask in Q&amp;A (42)
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Lower Dock Tabs */}
                                <div className="flex flex-wrap items-center gap-6 px-6 py-3 bg-surface-container-low border-t border-outline-variant/30 text-[12px] font-[500] leading-[16px] tracking-[0.02em]">
                                    <button className="text-primary-container font-semibold flex items-center gap-1.5 border-b-2 border-primary-container pb-1 -mb-1">
                                        <span className="material-symbols-outlined text-[18px]">
                                            subject
                                        </span>
                                        <span>Overview</span>
                                    </button>
                                    <button className="text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 pb-1">
                                        <span className="material-symbols-outlined text-[18px]">
                                            terminal
                                        </span>
                                        <span>Code Sandbox</span>
                                    </button>
                                    <button className="text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 pb-1">
                                        <span className="material-symbols-outlined text-[18px]">
                                            folder_open
                                        </span>
                                        <span>Resources (GitHub Repo)</span>
                                    </button>
                                    <button className="text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 pb-1">
                                        <span className="material-symbols-outlined text-[18px]">
                                            forum
                                        </span>
                                        <span>Q&amp;A Discussion</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 7: STUDENT DASHBOARD PREVIEW ──── */}
                    <section className="w-full py-16 lg:py-24 bg-surface-container-lowest border-y border-outline-variant/30">
                        <div className="max-w-full mx-auto px-6 lg:px-12 flex flex-col gap-12">
                            <div className="flex flex-col max-w-2xl gap-2">
                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container font-semibold uppercase">
                                    Progress Telemetry
                                </span>
                                <h2 className="text-[32px] font-[600] leading-[40px] tracking-[-0.02em] text-on-surface">
                                    Your entire learning journey in one place.
                                </h2>
                                <p className="text-[14px] leading-[20px] text-on-surface-variant">
                                    Track your habits, measure velocity, and resume your active
                                    courses right where you left off.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Continue Learning Card */}
                                <div className="lg:col-span-7 flex flex-col gap-6 p-6 rounded-xl bg-surface-container-low border border-outline-variant/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                            Continue Learning
                                        </span>
                                        <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container font-mono">
                                            Last active 2h ago
                                        </span>
                                    </div>
                                    {/* Active Card */}
                                    <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-lg bg-surface-container border border-outline-variant/30">
                                        <div
                                            className="w-full sm:w-36 h-28 rounded-md bg-cover bg-center shrink-0"
                                            style={{
                                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjMhKdfp2Iuem8FzEoScZzj4UifdrqRqSSFB-8tNZ7160lPDoJjye5Ip-Bf8wSUTggE8tTGZl-HUETqhJGNE2jbG6RgH5DQzjsdh8EbETBH4e4KQgL3opADlHqyGHYz-JCOdOWXuzTW_9xx5TCin9eciDfZ1gNijWWGsrGADk0EqmuRvdZcrGQmRopjcvtnx9mHJljPxt7eJ5sukvnuJ67jFSyv-jEOuhmizd-M1LHGgxy2f8-Nfnf")`,
                                            }}
                                        />
                                        <div className="flex flex-col justify-between flex-1 gap-3">
                                            <div>
                                                <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container font-semibold uppercase">
                                                    In Progress · 72%
                                                </span>
                                                <h3 className="text-[18px] text-on-surface font-semibold">
                                                    React &amp; Node.js Masterclass
                                                </h3>
                                                <p className="text-[12px] leading-[18px] tracking-[0.01em] text-on-surface-variant">
                                                    Next: Building REST APIs with Express &amp; Prisma
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="w-full bg-surface-bright h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-primary-container h-full rounded-full"
                                                        style={{ width: "72%" }}
                                                    />
                                                </div>
                                                <button className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary-container text-black text-[12px] font-[500] leading-[16px] tracking-[0.02em] font-semibold hover:bg-tertiary-fixed transition-colors">
                                                    <span>Resume</span>
                                                    <span className="material-symbols-outlined text-[16px]">
                                                        play_arrow
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Secondary Active Course */}
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container/60 border border-outline-variant/20">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-md bg-surface-container-high flex items-center justify-center text-primary-container">
                                                <span className="material-symbols-outlined text-[20px]">
                                                    architecture
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                                    Modern System Architecture
                                                </h4>
                                                <span className="text-[12px] leading-[18px] tracking-[0.01em] text-on-surface-variant">
                                                    45% Complete · Module 6
                                                </span>
                                            </div>
                                        </div>
                                        <a
                                            className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container hover:underline font-semibold"
                                            href="#"
                                        >
                                            Jump In →
                                        </a>
                                    </div>
                                </div>

                                {/* Telemetry Stats */}
                                <div className="lg:col-span-5 flex flex-col gap-6">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                                            <span className="text-[20px] font-[500] leading-[28px] tracking-[-0.01em] text-on-surface font-bold">
                                                42h
                                            </span>
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant mt-1">
                                                Learned this month
                                            </span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                                            <span className="text-[20px] font-[500] leading-[28px] tracking-[-0.01em] text-primary-container font-bold">
                                                14 🔥
                                            </span>
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant mt-1">
                                                Day streak
                                            </span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col">
                                            <span className="text-[20px] font-[500] leading-[28px] tracking-[-0.01em] text-on-surface font-bold">
                                                3
                                            </span>
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant mt-1">
                                                Verified certs
                                            </span>
                                        </div>
                                    </div>

                                    {/* Weekly Activity Chart */}
                                    <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                                Weekly Study Velocity
                                            </span>
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-primary-container font-mono">
                                                +18% vs last week
                                            </span>
                                        </div>
                                        <div className="flex items-end justify-between h-28 pt-4 px-2">
                                            {[
                                                { day: "Mon", h: "h-14", active: false },
                                                { day: "Tue", h: "h-16", active: false },
                                                { day: "Wed", h: "h-20", active: false },
                                                { day: "Thu", h: "h-24", active: true },
                                                { day: "Fri", h: "h-[4.5rem]", active: false },
                                                { day: "Sat", h: "h-10", active: false },
                                                { day: "Sun", h: "h-12", active: false },
                                            ].map((bar) => (
                                                <div
                                                    key={bar.day}
                                                    className="flex flex-col items-center gap-2 flex-1"
                                                >
                                                    <div
                                                        className={`w-6 rounded-t ${bar.active ? "bg-primary-container shadow-[0_0_12px_rgba(184,255,0,0.3)]" : "bg-surface-container-high"} ${bar.h}`}
                                                    />
                                                    <span
                                                        className={`text-[10px] font-[600] leading-[14px] tracking-[0.05em] ${bar.active ? "text-primary-container font-semibold" : "text-on-surface-variant"}`}
                                                    >
                                                        {bar.day}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 8: TESTIMONIALS ──── */}
                    <section className="w-full py-16 lg:py-24 bg-surface-container-lowest border-y border-outline-variant/30">
                        <div className="max-w-full mx-auto px-6 lg:px-12 flex flex-col gap-12">
                            <div className="flex flex-col gap-2 max-w-xl">
                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container font-semibold uppercase">
                                    Social Proof
                                </span>
                                <h2 className="text-[32px] font-[600] leading-[40px] tracking-[-0.02em] text-on-surface">
                                    Loved by learners
                                </h2>
                                <p className="text-[14px] leading-[20px] text-on-surface-variant">
                                    Real outcomes from developers and designers advancing their
                                    careers with LearnDeck.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    {
                                        text: `"LearnDeck's hands-on project approach gave me the exact architecture experience needed to pass my Senior Engineer interviews. Best tech LMS on the market."`,
                                        name: "Alex Miller",
                                        role: "Software Engineer at FinTech · Distributed Systems",
                                    },
                                    {
                                        text: `"The UI Engineering track was a game-changer. The interactive coding challenges and instructor feedback helped me transition from junior to mid-level in 4 months."`,
                                        name: "Priya Sharma",
                                        role: "Frontend Developer · Advanced React Track",
                                    },
                                    {
                                        text: `"Concise, zero fluff, and high-impact. I automated our data ingestion pipeline within two weeks of starting the Python & SQL path."`,
                                        name: "Daniel Evans",
                                        role: "Data Analyst · Practical Data Engineering",
                                    },
                                ].map((t) => (
                                    <div
                                        key={t.name}
                                        className="flex flex-col justify-between p-6 rounded-xl bg-surface-container-low border border-outline-variant/30"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex text-primary-container">
                                                <FilledStar />
                                                <FilledStar />
                                                <FilledStar />
                                                <FilledStar />
                                                <FilledStar />
                                            </div>
                                            <p className="text-[14px] leading-[20px] text-on-surface leading-relaxed">
                                                {t.text}
                                            </p>
                                        </div>
                                        <div className="pt-6 border-t border-outline-variant/20 flex flex-col gap-1">
                                            <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-on-surface font-semibold">
                                                {t.name}
                                            </span>
                                            <span className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-surface-variant">
                                                {t.role}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 9: FAQ ACCORDION ──── */}
                    <section className="w-full py-16 lg:py-24 bg-surface-container-lowest border-t border-outline-variant/30">
                        <div className="max-w-4xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
                            <div className="text-center flex flex-col gap-2">
                                <span className="text-[12px] font-[500] leading-[16px] tracking-[0.02em] text-primary-container uppercase font-semibold">
                                    Got Questions?
                                </span>
                                <h2 className="text-[32px] font-[600] leading-[40px] tracking-[-0.02em] text-on-surface">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-[14px] leading-[20px] text-on-surface-variant">
                                    Everything you need to know about the platform,
                                    certifications, and workflows.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <FaqItem
                                    question="Can I learn at my own pace?"
                                    answer="Yes, absolutely. All courses provide lifetime access once enrolled. You can start, pause, replay video lessons, and interact with sandbox coding terminals at whatever pace works with your schedule."
                                />
                                <FaqItem
                                    question="Do courses include verified certificates?"
                                    answer="Yes! Every completed course includes a cryptographically verifiable completion certificate complete with tamper-proof IDs that can be directly added to LinkedIn profiles and resumes."
                                />
                                <FaqItem
                                    question="Can I access courses on mobile and tablets?"
                                    answer="Yes, LearnDeck is fully responsive across desktop, tablet, and mobile devices with seamless background progress syncing so you can pick up exactly where you left off."
                                />
                                <FaqItem
                                    question="Are there free foundational courses?"
                                    answer="Yes, we provide 25+ completely free foundational courses in Web Development, Core Python, and Git version control with full community access."
                                />
                                <FaqItem
                                    question="What payment methods and currencies are supported?"
                                    answer="We support UPI, Net Banking, all major Credit/Debit Cards, PayPal, and Apple Pay with end-to-end encrypted PCI-DSS compliance."
                                />
                            </div>
                        </div>
                    </section>

                    {/* ──── SECTION 10: FINAL CLOSING CTA ──── */}
                    <section className="w-full py-16 lg:py-24 bg-surface relative overflow-hidden">
                        <div className="max-w-5xl mx-auto px-6 lg:px-12">
                            <div className="p-10 lg:p-16 rounded-3xl bg-surface-container border border-outline-variant/40 text-center flex flex-col items-center gap-6 relative shadow-2xl">
                                <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                                    <span className="material-symbols-outlined text-[28px]">
                                        rocket_launch
                                    </span>
                                </div>
                                <h2 className="text-[34px] sm:text-[32px] sm:font-[600] sm:leading-[40px] sm:tracking-[-0.02em] text-on-surface font-bold tracking-tight max-w-2xl">
                                    Your next skill starts here.
                                </h2>
                                <p className="text-[16px] leading-[24px] tracking-[-0.005em] text-on-surface-variant max-w-xl">
                                    Learn something new. Build something real. Join over 10,000+
                                    developers leveling up their careers today with LearnDeck.
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                                    <a
                                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary-container text-black text-[14px] font-[600] leading-[20px] tracking-[0.01em] font-semibold hover:bg-tertiary-fixed transition-all shadow-[0_0_30px_-5px_rgba(184,255,0,0.4)]"
                                        href="#courses"
                                    >
                                        <span>Explore Courses</span>
                                        <span className="material-symbols-outlined text-[18px]">
                                            arrow_forward
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* ═══════ FOOTER ═══════ */}
            <footer className="w-full bg-surface-container-lowest">
                <div className="max-w-full mx-auto px-6 lg:px-12 py-16">
                    <div className="grid grid-cols-2 gap-8 text-on-surface-variant md:grid-cols-4">
                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[20px] font-[500] leading-[28px] tracking-[-0.01em] text-primary font-semibold">
                                    LearnDeck
                                </span>
                            </div>
                            <p className="text-[12px] leading-[18px] tracking-[0.01em] text-on-surface-variant">
                                High-velocity cognition and practical career-ready skills.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <a
                                    className="p-2 rounded bg-surface-container text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        terminal
                                    </span>
                                </a>
                                <a
                                    className="p-2 rounded bg-surface-container text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        alternate_email
                                    </span>
                                </a>
                                <a
                                    className="p-2 rounded bg-surface-container text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        forum
                                    </span>
                                </a>
                                <a
                                    className="p-2 rounded bg-surface-container text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high transition-colors"
                                    href="#"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        share
                                    </span>
                                </a>
                            </div>
                            <p className="text-[10px] font-[600] leading-[14px] tracking-[0.05em] text-on-secondary-container pt-2">
                                © 2025 LearnDeck Systems Inc.
                            </p>
                        </div>

                        {/* Platform */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[14px] font-[600] leading-[20px] tracking-[0.01em] text-on-surface font-semibold uppercase">
                                Platform
                            </span>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#courses"
                            >
                                Browse Courses
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#categories"
                            >
                                Categories
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Certificates
                            </a>
                        </div>

                        {/* For Students */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[14px] font-[600] leading-[20px] tracking-[0.01em] text-on-surface font-semibold uppercase">
                                For Students
                            </span>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                My Learning
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Wishlist
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Progress
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Certificates
                            </a>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-3">
                            <span className="text-[14px] font-[600] leading-[20px] tracking-[0.01em] text-on-surface font-semibold uppercase">
                                Company
                            </span>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                About
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Contact
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Careers
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Privacy
                            </a>
                            <a
                                className="text-[12px] leading-[18px] tracking-[0.01em] hover:text-on-surface transition-colors"
                                href="#"
                            >
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
