import { Github, Linkedin, Instagram, Mail, Phone, MapPin, Send, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

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
    <footer className="bg-[#0F172A] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="IntervueAi Logo" className="w-24 h-14 sm:w-28 sm:h-16 md:w-32 md:h-18 lg:w-36 lg:h-20 object-contain" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              Train Smarter. Interview Better.
            </p>
            <p className="text-gray-300 text-xs leading-relaxed">
              Revolutionizing interview preparation with AI-powered tools that help job seekers gain confidence and improve their skills through realistic practice.
            </p>
                         <div className="flex space-x-4">
               <a
                 href="https://x.com/rehankadri09"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                 aria-label="X (Twitter)"
               >
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                 </svg>
               </a>
              <a
                href="https://www.linkedin.com/in/rehan-kadri-27b5b8231/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/rehan280"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/isolatedrfk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/preparation" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Preparation
                </a>
              </li>
              <li>
                <a href="/coding-practice" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Coding Practice
                </a>
              </li>
              <li>
                <a href="/interview-practice" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Interview Practice
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
                             <div className="flex items-center space-x-3">
                 <Mail className="w-4 h-4 text-gray-400" />
                 <span className="text-gray-300 text-sm">youtech280@gmail.com</span>
               </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+91-8668980389</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to get updates and receive news about new features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 text-sm"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-r-md hover:from-purple-600 hover:to-orange-600 transition-all duration-200">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} IntervueAi. All Rights Reserved.
            </div>
            <div className="text-gray-300 text-sm">
              Designed and Developed by Rehan Kadri
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      )}
    </footer>
  );
};

export default Footer; 