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
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-hero backdrop-blur-sm border-b border-white/10 w-full">
        <div className="bg-black/20 w-full">
          <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 w-full">
              {/* Logo */}
              <Link to="/" className="flex items-center flex-shrink-0 px-3 py-2 sm:px-4">
                <img 
                  src="/logo.png" 
                  alt="IntervueAi Logo" 
                  className="h-7 w-auto sm:h-9 object-contain mx-1"
                />
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
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
                <Link to="/insights" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base">
                  Insights
                </Link>
                <Link to="/chat" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base">
                  Chat
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

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2 lg:space-x-4">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <User className="h-5 w-5" />
                      <span className="hidden lg:block text-sm">{userName}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {showMobileDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50">
                        <div className="py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors duration-200 flex items-center"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    onClick={() => navigate('/login')}
                    variant="default"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base"
                  >
                    Start
                  </Button>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-gray-700">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link
                to="/interview-practice"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                Interview Practice
              </Link>
              <Link
                to="/coding-practice"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                Coding Practice
              </Link>
              <Link
                to="/resume-builder"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                Resume Builder
              </Link>
              <Link
                to="/how-it-works"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                How It Works
              </Link>
              <Link
                to="/insights"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                Insights
              </Link>
              <Link
                to="/chat"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                onClick={() => setShowMobileMenu(false)}
              >
                Chat
              </Link>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <Link
                  to="/about"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                  onClick={() => setShowMobileMenu(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors duration-200"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;