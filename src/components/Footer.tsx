import { Github, Linkedin, Instagram, Mail, Phone, MapPin, Send, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-white w-full">
      {/* Main Footer Content */}
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {/* Company Information */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="IntervueAi Logo" 
                className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 xl:w-32 xl:h-18 object-contain" 
              />
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-2">
              Train Smarter. Interview Better.
            </p>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Revolutionizing interview preparation with AI-powered tools that help job seekers gain confidence and improve their skills through realistic practice.
            </p>
            <div className="flex space-x-2 sm:space-x-3 md:space-x-4">
              <a
                href="https://x.com/rehankadri09"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/rehan-kadri-27b5b8231/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://github.com/rehan280"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </a>
              <a
                href="https://www.instagram.com/isolatedrfk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Tools */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">Our Tools</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/interview-practice" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base">
                  Interview Practice
                </Link>
              </li>
              <li>
                <Link to="/coding-practice" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base">
                  Coding Practice
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm md:text-base">
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs sm:text-sm md:text-base break-all">youtech280@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs sm:text-sm md:text-base">+91-8668980389</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-xs sm:text-sm md:text-base">India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base">
              Subscribe to get updates and receive news about new features.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-2 sm:px-3 py-2 bg-gray-700 border border-gray-600 rounded-md sm:rounded-l-md sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 text-xs sm:text-sm"
              />
              <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-md sm:rounded-l-none sm:rounded-r-md hover:from-purple-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center">
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 w-full">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-center sm:text-left">
            <div className="text-gray-300 text-xs sm:text-sm">
              © {currentYear} IntervueAi. All Rights Reserved.
            </div>
            <div className="text-gray-300 text-xs sm:text-sm">
              Designed and Developed by Rehan Kadri
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      )}
    </footer>
  );
};

export default Footer; 