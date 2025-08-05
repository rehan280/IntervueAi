import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Play, CheckCircle, Users, Brain, Target, Github, Linkedin, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden max-w-full">
      {/* Background gradient with logo blend */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/logo.png')`,
          backgroundSize: '50%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Hero section */}
      <section className="relative pt-2 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center w-full">
        <div className="w-full max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-xs sm:text-sm md:text-base lg:text-lg font-medium px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 bg-white/10 text-white border-white/20">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-1.5 sm:mr-2 md:mr-2.5 lg:mr-3" />
            <span className="hidden sm:inline">NEXT-GEN AI INTERVIEW PREP</span>
            <span className="sm:hidden">AI INTERVIEW PREP</span>
          </Badge>
          
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <img src="/logo.png" alt="IntervueAi Logo" className="w-20 h-12 sm:w-24 sm:h-14 md:w-32 md:h-18 lg:w-40 lg:h-22 xl:w-48 xl:h-27 object-contain" />
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-white/90 leading-tight px-2 sm:px-4">
            Train Smarter. Interview Better.
          </p>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/80 mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Crack your next interview with AI-powered mock tests, coding challenges, and real-time feedback.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-full">
            <Button 
              variant="hero" 
              size="xl" 
              className="group text-sm sm:text-base md:text-lg w-full sm:w-auto"
              onClick={() => navigate('/interview-practice')}
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
              Try IntervueAi
              <span className="ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            <Link to="/about" className="w-full sm:w-auto">
              <Button 
                variant="outline-hero" 
                size="xl"
                className="text-sm sm:text-base md:text-lg w-full"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                <span className="hidden sm:inline">See How it Works</span>
                <span className="sm:hidden">How it Works</span>
              </Button>
            </Link>
          </div>
          
          {/* Enhanced features showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 w-full max-w-4xl mx-auto overflow-hidden">
            <div className="text-center p-2 sm:p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">14</div>
              <div className="text-white/80 font-medium text-xs sm:text-sm">Job Roles</div>
              <div className="text-xs text-white/60 mt-1">10 Questions Each</div>
            </div>
            <div className="text-center p-2 sm:p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">AI</div>
              <div className="text-white/80 font-medium text-xs sm:text-sm">Powered</div>
              <div className="text-xs text-white/60 mt-1">Gemini AI Feedback</div>
            </div>
            <div className="text-center p-2 sm:p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">∞</div>
              <div className="text-white/80 font-medium text-xs sm:text-sm">Unlimited</div>
              <div className="text-xs text-white/60 mt-1">Practice Sessions</div>
            </div>
            <div className="text-center p-2 sm:p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">🎤</div>
              <div className="text-white/80 font-medium text-xs sm:text-sm">Voice Support</div>
              <div className="text-xs text-white/60 mt-1">Audio Feedback</div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      </section>

      {/* Why use our AI interviewer section */}
      <section className="relative bg-background py-16 md:py-20 px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why use{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                IntervueAi?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your interview preparation with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 overflow-hidden">
            <div className="text-center p-4 md:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                No need to schedule with humans. Practice interviews 24/7 at your own pace.
              </p>
            </div>
            
            <div className="text-center p-4 md:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">Personalized Questions</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                AI generates unique questions based on your specific role and experience level.
              </p>
            </div>
            
            <div className="text-center p-4 md:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Get detailed feedback on your answers with actionable improvement suggestions.
              </p>
            </div>
            
            <div className="text-center p-4 md:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">Improve Confidence</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Practice in a judgment-free environment and build confidence for real interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coding Practice Showcase Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Master Coding Interviews
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300">Practice with 40+ curated problems across multiple languages</p>
            <div className="w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 xl:p-12 w-full border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start overflow-hidden">
              {/* Coding Problems Preview */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Featured Problems</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base md:text-lg font-semibold text-white">Two Sum</h4>
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">Easy</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">Find two numbers that add up to a target value</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">Core</span>
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">Arrays</span>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/50 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base md:text-lg font-semibold text-white">Python Lambda Functions</h4>
                      <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full border border-green-500/30">Easy</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">Master Python's functional programming features</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30">Python</span>
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-full border border-orange-500/30">Lambda</span>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-700/50 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base md:text-lg font-semibold text-white">Java HashMap Operations</h4>
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">Medium</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">Learn Java Collections Framework</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-red-600/20 text-red-300 text-xs rounded-full border border-red-500/30">Java</span>
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">HashMap</span>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-700/50 hover:border-orange-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base md:text-lg font-semibold text-white">C++ STL Algorithms</h4>
                      <span className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded-full border border-yellow-500/30">Medium</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">Master C++ Standard Template Library</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30">C++</span>
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30">STL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features and Stats */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Practice Features</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 overflow-hidden">
                  <div className="text-center p-3 md:p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">4</div>
                    <div className="text-white font-medium text-sm md:text-base">Languages</div>
                    <div className="text-gray-400 text-xs md:text-sm">Python, Java, C++, C</div>
                  </div>
                  <div className="text-center p-3 md:p-4 rounded-xl bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700/30">
                    <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">40+</div>
                    <div className="text-white font-medium text-sm md:text-base">Problems</div>
                    <div className="text-gray-400 text-xs md:text-sm">Curated for interviews</div>
                  </div>
                  <div className="text-center p-3 md:p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/30">
                    <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">3</div>
                    <div className="text-white font-medium text-sm md:text-base">Difficulty Levels</div>
                    <div className="text-gray-400 text-xs md:text-sm">Easy, Medium, Hard</div>
                  </div>
                  <div className="text-center p-3 md:p-4 rounded-xl bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/30">
                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">∞</div>
                    <div className="text-white font-medium text-sm md:text-base">Practice Sessions</div>
                    <div className="text-gray-400 text-xs md:text-sm">Unlimited attempts</div>
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Real-time Code Execution</h4>
                      <p className="text-gray-400 text-xs md:text-sm">Run your code instantly and see results</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">AI-Powered Feedback</h4>
                      <p className="text-gray-400 text-xs md:text-sm">Get detailed analysis and improvement tips</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Target className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-sm md:text-base">Interview-Focused</h4>
                      <p className="text-gray-400 text-xs md:text-sm">Problems commonly asked in coding interviews</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/coding-practice">
                    <Button 
                      variant="hero" 
                      size="xl"
                      className="w-full group text-lg md:text-xl lg:text-2xl py-4 md:py-6 lg:py-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      <Play className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-2 md:mr-3 flex-shrink-0" />
                      <span className="truncate">Start Coding Practice</span>
                      <span className="ml-2 md:ml-3 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Developer Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Meet the Developer
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300">The mind behind Intervue</p>
            <div className="w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 xl:p-12 w-full border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start overflow-hidden">
              {/* Developer Image */}
              <div className="lg:col-span-1 order-1">
                <div className="relative bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-2 md:p-3 lg:p-4 shadow-lg border border-gray-600">
                  {!imageError ? (
                    <img
                      src={imageSources[currentImageIndex]}
                      alt="Rehan Firoz Kadri"
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover rounded-xl md:rounded-2xl shadow-lg"
                      style={{ objectPosition: 'center 15%' }}
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-gradient-to-br from-purple-800/50 to-blue-800/50 rounded-xl md:rounded-2xl shadow-lg flex items-center justify-center border border-gray-600">
                      <div className="text-center">
                        <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-purple-400 mx-auto mb-2 md:mb-3 lg:mb-4" />
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-200">Rehan Firoz Kadri</p>
                        <p className="text-xs sm:text-sm text-gray-400">Developer Image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl md:rounded-2xl"></div>
                </div>
              </div>

              {/* Developer Information */}
              <div className="lg:col-span-2 order-2 space-y-3 md:space-y-4 lg:space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Rehan Firoz Kadri</h3>
                  <div className="w-20 sm:w-24 md:w-32 lg:w-40 h-1 md:h-2 bg-gradient-to-r from-blue-500 to-purple-500 mb-2 md:mb-3 lg:mb-4 rounded-full"></div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold mb-2 md:mb-3 lg:mb-4">
                    Full Stack Developer • YouTuber • Blogger • SEO Expert
                  </p>
                </div>

                <div className="text-gray-300 leading-relaxed space-y-2 md:space-y-3 lg:space-y-4 text-xs sm:text-sm md:text-base">
                  <p>
                    I'm Rehan, a Computer Science Engineering student and the creator of Intervue. I'm passionate about using technology to solve real-world problems and help students and professionals unlock their potential. My work spans across full-stack development, AI-powered tools, and impactful content creation.
                  </p>
                  <p>
                    As a YouTuber, I create documentaries that explore the intersection of society, business, and tech. Through my blogs and SEO work, I help brands and creators grow their online presence strategically. Intervue is my step toward creating a smarter, more accessible way to prepare for interviews using AI.
                  </p>
                  <p>
                    My vision is to make interview preparation less stressful and more effective, empowering users with intelligent simulations, detailed feedback, and performance analytics.
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4 lg:mb-6">
                  <span className="px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 rounded-full text-xs md:text-sm font-medium border border-blue-700/50 hover:border-blue-500/50 transition-colors duration-200">
                    💡 AI Integration
                  </span>
                  <span className="px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 text-purple-300 rounded-full text-xs md:text-sm font-medium border border-purple-700/50 hover:border-purple-500/50 transition-colors duration-200">
                    🌐 Web Development
                  </span>
                  <span className="px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 bg-gradient-to-r from-green-900/50 to-blue-900/50 text-green-300 rounded-full text-xs md:text-sm font-medium border border-green-700/50 hover:border-green-500/50 transition-colors duration-200">
                    🧠 SEO & Content Strategy
                  </span>
                  <span className="px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 bg-gradient-to-r from-orange-900/50 to-red-900/50 text-orange-300 rounded-full text-xs md:text-sm font-medium border border-orange-700/50 hover:border-orange-500/50 transition-colors duration-200">
                    🎥 Video Creation & Storytelling
                  </span>
                </div>

                {/* Social Media Buttons */}
                <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4">
                  <a
                    href="https://github.com/rehan280"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white rounded-lg transition-all duration-300 text-xs md:text-sm lg:text-base border border-gray-600 hover:border-gray-500 shadow-lg hover:shadow-xl transform hover:scale-105 hover:shadow-gray-500/20"
                  >
                    <Github className="w-3 h-3 md:w-4 md:h-5 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rehan-kadri-27b5b8231/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 text-xs md:text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-105 hover:shadow-blue-500/30"
                  >
                    <Linkedin className="w-3 h-3 md:w-4 md:h-5 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300" />
                    LinkedIn
                  </a>
                  <a
                    href="mailto:youtech280@gmail.com"
                    className="group flex items-center gap-2 px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-xs md:text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-105 hover:shadow-purple-500/30"
                  >
                    <Mail className="w-3 h-3 md:w-4 md:h-5 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform duration-300" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Hero;