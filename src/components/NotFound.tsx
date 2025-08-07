import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-hero px-4 py-12 text-center">
      <div className="max-w-lg w-full mx-auto">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-semibold">
            <Sparkles className="w-5 h-5 mr-2 text-blue-400 animate-pulse" />
            404 Error
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-white/80 mb-8">
          Sorry, the page you are looking for does not exist or has been moved.<br />
          Let’s get you back to safety!
        </p>
        <Link to="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg transition-all duration-200">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Home
        </Link>
      </div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse -z-10"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse -z-10"></div>
    </div>
  );
};

export default NotFound;
