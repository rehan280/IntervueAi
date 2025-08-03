import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Play, CheckCircle, Users, Brain, Target } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  onStartInterview: () => void;
}

const Hero = ({ onStartInterview }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
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
      <section className="relative pt-2 pb-6 sm:pt-4 sm:pb-8 md:pt-6 md:pb-10 px-4 overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto text-center max-w-7xl">
          <Badge variant="secondary" className="mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg font-medium px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white/10 text-white border-white/20">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-2.5 md:mr-3" />
            AI-POWERED INTERVIEW PRACTICE
          </Badge>
          
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
            <img src="/logo.png" alt="IntervueAi Logo" className="w-32 h-18 sm:w-40 sm:h-22 md:w-48 md:h-27 lg:w-56 lg:h-31 object-contain" />
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-4 sm:mb-5 md:mb-6 text-white/90 leading-tight">
            Train Smarter. Interview Better.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Crack your next interview with AI-powered mock tests, coding challenges, and real-time feedback.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mb-8 sm:mb-10 md:mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onStartInterview}
              className="group text-lg"
            >
              <Target className="w-5 h-5 mr-2" />
              Try IntervueAi
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
            <Link to="/how-it-works">
              <Button 
                variant="outline-hero" 
                size="xl"
                className="text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                See How it Works
              </Button>
            </Link>
          </div>
          
          {/* Enhanced features showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">14</div>
              <div className="text-white/80 font-medium text-sm">Job Roles</div>
              <div className="text-xs text-white/60 mt-1">10 Questions Each</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">AI</div>
              <div className="text-white/80 font-medium text-sm">Powered</div>
              <div className="text-xs text-white/60 mt-1">Gemini AI Feedback</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">∞</div>
              <div className="text-white/80 font-medium text-sm">Unlimited</div>
              <div className="text-xs text-white/60 mt-1">Practice Sessions</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">🎤</div>
              <div className="text-white/80 font-medium text-sm">Voice Support</div>
              <div className="text-xs text-white/60 mt-1">Audio Feedback</div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      </section>

      {/* Why use our AI interviewer section */}
      <section className="relative bg-background py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why use{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                IntervueAi?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your interview preparation with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-muted-foreground">
                No need to schedule with humans. Practice interviews 24/7 at your own pace.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Questions</h3>
              <p className="text-muted-foreground">
                AI generates unique questions based on your specific role and experience level.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                Get detailed feedback on your answers with actionable improvement suggestions.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Improve Confidence</h3>
              <p className="text-muted-foreground">
                Practice in a judgment-free environment and build confidence for real interviews.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;