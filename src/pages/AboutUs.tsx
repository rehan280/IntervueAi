import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Intervue</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your AI-Powered Interview Companion
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Intervue</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Intervue, we're building the future of interview preparation by combining the power of artificial intelligence with industry-level mock interview simulations. Whether you're a student preparing for placements or a professional aiming to sharpen your skills, Intervue provides a smart, personalized, and accessible platform to help you stand out.
            </p>
          </div>

          {/* What We Offer Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎙️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Interview Practice</h3>
                  <p className="text-gray-600">Get personalized mock interviews that feel real — from HR rounds to technical deep dives.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Analytics</h3>
                  <p className="text-gray-600">Instant insights and actionable feedback to improve your answers, clarity, and confidence.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Role-Specific Scenarios</h3>
                  <p className="text-gray-600">Practice for roles in tech, marketing, design, and more — with dynamic questions that evolve.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Anywhere, Anytime</h3>
                  <p className="text-gray-600">Prepare at your own pace, on your own time — no scheduling needed.</p>
                </div>
              </div>
            </div>
          </div>

          {/* About the Creator Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">About the Creator</h2>
            
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Image Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">R</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Rehan Firoz Kadri</h3>
                <p className="text-lg text-blue-600 mb-4">Founder | YouTuber | Blogger | SEO Expert | Full-Stack Developer</p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Hey, I'm Rehan — a 3rd-year Computer Science Engineering student at Sandip University, and the mind behind Intervue.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  I've always believed that technology should empower preparation — not make it harder. As a passionate YouTuber, I create documentary-style content on tech, society, and entrepreneurship. I also write insightful blogs to help people navigate personal growth, digital strategy, and online branding.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  As an SEO expert, I've helped brands grow their online visibility through content optimization, keyword research, and data-driven campaigns — skills that I've directly used while building Intervue to reach the right audience.
                </p>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">My mission?</h4>
                  <p className="text-gray-700">To help you prepare smarter, perform better, and present your best self in every interview.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Connect with Me</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <a 
                href="https://instagram.com/your_handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl text-white hover:scale-105 transition-transform duration-300"
              >
                <FaInstagram className="text-2xl mb-2" />
                <span className="text-sm font-medium">Instagram</span>
              </a>

              <a 
                href="https://youtube.com/@your_channel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-xl text-white hover:scale-105 transition-transform duration-300"
              >
                <FaYoutube className="text-2xl mb-2" />
                <span className="text-sm font-medium">YouTube</span>
              </a>

              <a 
                href="https://github.com/your_username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl text-white hover:scale-105 transition-transform duration-300"
              >
                <FaGithub className="text-2xl mb-2" />
                <span className="text-sm font-medium">GitHub</span>
              </a>

              <a 
                href="https://linkedin.com/in/your_profile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl text-white hover:scale-105 transition-transform duration-300"
              >
                <FaLinkedin className="text-2xl mb-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>

              <a 
                href="https://twitter.com/your_handle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl text-white hover:scale-105 transition-transform duration-300"
              >
                <FaTwitter className="text-2xl mb-2" />
                <span className="text-sm font-medium">Twitter</span>
              </a>

              <a 
                href="https://your-blog.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-4 bg-gradient-to-br from-green-500 to-green-700 rounded-xl text-white hover:scale-105 transition-transform duration-300"
              >
                <FaGlobe className="text-2xl mb-2" />
                <span className="text-sm font-medium">Blog</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 