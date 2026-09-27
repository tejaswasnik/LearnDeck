import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-[#111111] border-b border-[#1a1a1a] shadow-sm z-50">
      <div className="h-[68px] max-w-[1920px] mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Left Section: Logo + Brand + Navigation */}
        <div className="flex items-center gap-8 flex-shrink-0">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo Container */}
            <div className="w-[30px] h-[30px] rounded-[6px] bg-[#1d1d1d] flex items-center justify-center group-hover:bg-[#232323] transition-colors overflow-hidden">
              <img 
                src="/favicon.png" 
                alt="LearnDeck Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Brand Name */}
            <span className="text-[20px] font-bold text-white tracking-tight">
              LearnDeck
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            <a
              href="#courses"
              className="text-[14px] font-medium text-[#c4c4c4] hover:text-white transition-colors"
            >
              Courses
            </a>
            <a
              href="#categories"
              className="text-[14px] font-medium text-[#c4c4c4] hover:text-white transition-colors"
            >
              Categories
            </a>
          </nav>
        </div>

        {/* Center Section: Search Bar */}
        <div className="hidden md:flex flex-1 justify-center max-w-[450px] mx-auto">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] text-[18px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search courses, tech skills, topics..."
              className="w-full h-[38px] pl-10 pr-4 bg-[#1d1d1d] border border-transparent rounded-[9px] text-white text-[13px] placeholder:text-[#6b6b6b] focus:outline-none focus:border-[#2a2a2a] focus:bg-[#222222] transition-colors"
            />
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center justify-center h-[38px] px-5 rounded-[9px] bg-[#1d1d1d] border border-[#2a2a2a] text-white text-[14px] font-medium hover:bg-[#232323] hover:border-[#333333] transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center h-[38px] px-5 rounded-[9px] bg-[#b8ff00] text-black text-[14px] font-bold hover:bg-[#a3e600] transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar (shown below main navbar on small screens) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] text-[18px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full h-[38px] pl-10 pr-4 bg-[#1d1d1d] border border-transparent rounded-[9px] text-white text-[13px] placeholder:text-[#6b6b6b] focus:outline-none focus:border-[#2a2a2a] focus:bg-[#222222] transition-colors"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
