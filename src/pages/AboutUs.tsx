import React, { useState } from 'react';
import { Github, Linkedin, Instagram, Mail, User } from 'lucide-react';

const AboutUs: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const imageSources = [
    '/rehan-kadri.png',
    '/rehan-kadri.webp',
    '/logo.png' // fallback to logo if needed
  ];

  const handleImageError = () => {
    console.log(`Image ${imageSources[currentImageIndex]} failed to load`);
    if (currentImageIndex < imageSources.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-16">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Intervue</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Your AI-Powered Interview Companion - Building the future of interview preparation by combining artificial intelligence with industry-level mock interview simulations.
          </p>
        </div>

        {/* What We Offer Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 mb-16 border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">What We Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-2xl md:text-3xl mb-4">🎙️</div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">Next-Gen AI Interview Prep</h3>
              <p className="text-gray-300 text-xs md:text-sm">Get personalized mock interviews that feel real — from HR rounds to technical deep dives.</p>
            </div>

            <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 hover:border-green-500/50 transition-all duration-300">
              <div className="text-2xl md:text-3xl mb-4">📊</div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">Performance Analytics</h3>
              <p className="text-gray-300 text-xs md:text-sm">Instant insights and actionable feedback to improve your answers, clarity, and confidence.</p>
            </div>

            <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-violet-900/30 border border-purple-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-2xl md:text-3xl mb-4">💬</div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">Role-Specific Scenarios</h3>
              <p className="text-gray-300 text-xs md:text-sm">Practice for roles in tech, marketing, design, and more — with dynamic questions that evolve.</p>
            </div>

            <div className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-br from-orange-900/30 to-amber-900/30 border border-orange-700/50 hover:border-orange-500/50 transition-all duration-300">
              <div className="text-2xl md:text-3xl mb-4">🚀</div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">Anywhere, Anytime</h3>
              <p className="text-gray-300 text-xs md:text-sm">Prepare at your own pace, on your own time — no scheduling needed.</p>
            </div>
          </div>
        </div>

        {/* Meet the Developer Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 mb-16 border border-gray-700">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Meet the Developer</h2>
            <p className="text-lg md:text-xl text-gray-300">The mind behind Intervue</p>
            <div className="w-24 md:w-32 h-1 md:h-2 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Developer Image */}
            <div className="lg:col-span-1 order-1">
              <div className="relative bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-3 md:p-4 shadow-lg border border-gray-600">
                {!imageError ? (
                  <img
                    src={imageSources[currentImageIndex]}
                    alt="Rehan Firoz Kadri"
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
                    style={{ objectPosition: 'center 15%' }}
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gradient-to-br from-purple-800/50 to-blue-800/50 rounded-2xl shadow-lg flex items-center justify-center border border-gray-600">
                    <div className="text-center">
                      <User className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-purple-400 mx-auto mb-4" />
                      <p className="text-base md:text-lg font-semibold text-gray-200">Rehan Firoz Kadri</p>
                      <p className="text-xs md:text-sm text-gray-400">Developer Image</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
              </div>
            </div>

            {/* Developer Info */}
            <div className="lg:col-span-2 order-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Rehan Firoz Kadri</h3>
                  <p className="text-lg md:text-xl text-blue-400 font-semibold mb-4">Full Stack Developer & AI Enthusiast</p>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                    Passionate about creating innovative solutions that bridge the gap between technology and human experience. 
                    With expertise in modern web technologies and AI integration, I'm dedicated to building tools that make 
                    complex processes accessible and effective.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                    <h4 className="text-lg font-semibold text-white mb-2">Skills & Expertise</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• React, TypeScript, Node.js</li>
                      <li>• Python, Machine Learning</li>
                      <li>• AI/ML Integration</li>
                      <li>• Full Stack Development</li>
                      <li>• UI/UX Design</li>
                    </ul>
                  </div>

                  <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                    <h4 className="text-lg font-semibold text-white mb-2">Current Focus</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• AI-Powered Applications</li>
                      <li>• Interview Preparation Tools</li>
                      <li>• Educational Technology</li>
                      <li>• User Experience Design</li>
                      <li>• Performance Optimization</li>
                    </ul>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="https://github.com/rehankadri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600"
                  >
                    <Github className="w-5 h-5 text-white" />
                    <span className="text-white">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/rehankadri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                    <span className="text-white">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:rehan@intervue.ai"
                    className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600"
                  >
                    <Mail className="w-5 h-5 text-white" />
                    <span className="text-white">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Our Mission</h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              To democratize interview preparation by making professional-level practice accessible to everyone. 
              We believe that with the right tools and guidance, anyone can excel in their interviews and advance their careers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 




