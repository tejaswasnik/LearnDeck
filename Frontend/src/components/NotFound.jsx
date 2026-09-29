import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111111] text-white p-6">
      <h1 className="text-6xl font-bold text-[#b8ff00] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-[#a0a0a0] mb-8 text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-[#1d1d1d] border border-[#2a2a2a] hover:bg-[#232323] hover:border-[#333333] transition-colors rounded-[9px] font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
