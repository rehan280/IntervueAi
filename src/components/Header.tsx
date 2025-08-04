import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 200ms delay
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-hero backdrop-blur-sm border-b border-white/10">
        <div className="bg-black/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="IntervueAi Logo" 
                  className="h-6 w-auto sm:h-8 object-contain"
                />
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base">
                  Home
                </Link>
                <Link to="/interview-practice" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base">
                  Interview Practice
                </Link>
                <Link to="/coding-practice" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base">
                  Coding Practice
                </Link>
                <Link to="/resume-builder" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base">
                  Resume Builder
                </Link>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base">
                  How It Works
                </Link>
                <div className="relative" onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleDropdownMouseLeave}>
                  <button
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base"
                  >
                    Our Pages
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showDropdown && (
                    <div
                      className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50"
                    >
                      <div className="py-2">
                        <Link
                          to="/about"
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          About Us
                        </Link>
                        <Link
                          to="/contact"
                          className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          Contact Us
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* CTA Button / User Menu */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="hidden sm:flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                      <User className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-white">{userName}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 text-xs sm:text-sm"
                    >
                      <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">Logout</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate('/interview-practice')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
                  >
                    <span className="hidden sm:inline">Get Started</span>
                    <span className="sm:hidden">Start</span>
                  </Button>
                )}
                
                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  {showMobileMenu ? (
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3 sm:space-y-4">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white transition-colors duration-200 py-2 text-base sm:text-lg"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link 
                to="/interview-practice" 
                className="text-gray-300 hover:text-white transition-colors duration-200 py-2 text-base sm:text-lg"
                onClick={() => setShowMobileMenu(false)}
              >
                Interview Practice
              </Link>
              <Link 
                to="/coding-practice" 
                className="text-gray-300 hover:text-white transition-colors duration-200 py-2 text-base sm:text-lg"
                onClick={() => setShowMobileMenu(false)}
              >
                Coding Practice
              </Link>
              <Link 
                to="/resume-builder" 
                className="text-gray-300 hover:text-white transition-colors duration-200 py-2 text-base sm:text-lg"
                onClick={() => setShowMobileMenu(false)}
              >
                Resume Builder
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-gray-300 hover:text-white transition-colors duration-200 py-2 text-base sm:text-lg"
                onClick={() => setShowMobileMenu(false)}
              >
                How It Works
              </Link>
              <div className="space-y-2">
                <button
                  className="flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors duration-200 py-2 text-base sm:text-lg"
                  onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                >
                  <span>Our Pages</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showMobileDropdown && (
                  <div className="pl-4 space-y-2 border-l border-gray-700">
                    <Link 
                      to="/about" 
                      className="block text-gray-300 hover:text-white transition-colors duration-200 py-2 text-sm sm:text-base"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/contact" 
                      className="block text-gray-300 hover:text-white transition-colors duration-200 py-2 text-sm sm:text-base"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

    </>
  );
};

export default Header;