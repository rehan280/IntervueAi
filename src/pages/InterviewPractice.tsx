import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Briefcase, Star, Loader2, Volume2, VolumeX, TestTube, Mic, Settings, Keyboard, MessageSquare } from "lucide-react";
import { directGeminiService } from "@/services/directGeminiService";
import InterviewSessionComponent from "@/components/InterviewSession";

type InterviewPhase = "role-selection" | "interview" | "results";

interface InterviewResult {
  role: string;
  questions: string[];
  answers: string[];
  feedback: string[];
  scores?: any[];
}

const InterviewPractice = () => {
  const [currentPhase, setCurrentPhase] = useState<InterviewPhase>("role-selection");
  const [selectedRole, setSelectedRole] = useState("");
  const [interviewResults, setInterviewResults] = useState<InterviewResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const roles = [
    { id: "software-developer", title: "Software Developer", icon: "💻" },
    { id: "product-manager", title: "Product Manager", icon: "🎯" },
    { id: "ui-ux-designer", title: "UX Designer", icon: "🎨" },
    { id: "data-scientist", title: "Data Scientist", icon: "📊" },
    { id: "hr-executive", title: "HR Executive", icon: "👥" },
    { id: "sales-executive", title: "Sales Executive", icon: "💼" },
    { id: "marketing-manager", title: "Marketing Manager", icon: "📢" },
    { id: "devops-engineer", title: "DevOps Engineer", icon: "⚙️" },
    { id: "frontend-developer", title: "Frontend Developer", icon: "🌐" },
    { id: "backend-developer", title: "Backend Developer", icon: "🖥️" },
    { id: "ai-ml-engineer", title: "AI/ML Engineer", icon: "🤖" },
    { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", icon: "🔒" },
    { id: "business-analyst", title: "Business Analyst", icon: "📈" },
    { id: "finance-analyst", title: "Finance Analyst", icon: "💰" }
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentPhase("interview");
  };

  const handleInterviewComplete = async (results: InterviewResult) => {
    setIsAnalyzing(true);
    try {
      // Analyze each answer with AI
      const analyzedFeedback = [];
      for (let i = 0; i < results.questions.length; i++) {
        const question = results.questions[i];
        const answer = results.answers[i] || "No answer provided";
        
        try {
          const feedback = await directGeminiService.analyzeAnswer(question, answer, results.role);
          analyzedFeedback.push(feedback);
        } catch (error) {
          console.error('Error analyzing answer:', error);
          analyzedFeedback.push("Unable to analyze this answer. Please try again.");
        }
      }
      
      const finalResults = {
        ...results,
        feedback: analyzedFeedback
      };
      
      setInterviewResults(finalResults);
      setCurrentPhase("results");
    } catch (error) {
      console.error('Error completing interview:', error);
      setInterviewResults(results);
      setCurrentPhase("results");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBackToRoleSelection = () => {
    setCurrentPhase("role-selection");
    setSelectedRole("");
    setInterviewResults(null);
  };

  const handleRestartInterview = () => {
    setCurrentPhase("interview");
    setInterviewResults(null);
  };

  // Role Selection Component
  const RoleSelector = () => {
    const [selectedRoleId, setSelectedRoleId] = useState<string>("");

    const handleStartInterview = () => {
      if (selectedRoleId) {
        handleRoleSelect(selectedRoleId);
      }
    };

    const selectedRoleData = roles.find(role => role.id === selectedRoleId);

    return (
      <div className="relative min-h-screen">
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
        
        <div className="relative py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                <img src="/logo.png" alt="IntervueAi Logo" className="w-24 h-14 sm:w-32 sm:h-18 md:w-36 md:h-20 lg:w-40 lg:h-22 xl:w-48 xl:h-27 object-contain" />
              </div>
              <Badge variant="secondary" className="mb-3 sm:mb-4 bg-white/10 text-white border-white/20 text-xs sm:text-sm">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                Choose Your Path
              </Badge>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-white px-2">
                Hi! 👋 I'm your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  IntervueAi Coach
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 md:mb-6 text-blue-400">
                Train Smarter. Interview Better.
              </p>
              <p className="text-lg sm:text-xl text-white/80 mb-2 px-2">
                Let's get you prepared for your next big job interview.
              </p>
              <p className="text-base sm:text-lg text-white/70 px-2">
                Select your role for a comprehensive 10-question interview session:
              </p>
            </div>
            
            <Card className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 sm:mb-3 text-white">
                      Select Your Target Role
                    </label>
                    <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                      <SelectTrigger className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400">
                        <SelectValue placeholder="Choose a role to practice for..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
                        {roles.map((role) => (
                          <SelectItem 
                            key={role.id} 
                            value={role.id}
                            className="hover:bg-gray-700/50 cursor-pointer text-white"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <span className="text-base sm:text-lg">{role.icon}</span>
                              <span className="font-medium text-sm sm:text-base">{role.title}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedRoleData && (
                    <div className="p-3 sm:p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="text-xl sm:text-2xl">{selectedRoleData.icon}</span>
                        <div>
                          <h3 className="font-semibold text-base sm:text-lg text-white">{selectedRoleData.title}</h3>
                          <p className="text-xs sm:text-sm text-blue-200">
                            Prepare for {selectedRoleData.title.toLowerCase()} interviews
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">10 Questions</Badge>
                        <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">AI Feedback</Badge>
                        <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">Detailed Scoring</Badge>
                        <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">Performance Analysis</Badge>
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    variant="default" 
                    size="lg" 
                    onClick={handleStartInterview}
                    disabled={!selectedRoleId}
                    className="w-full group bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 group-hover:translate-x-1 transition-transform" />
                    Start Interview Session
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center mt-8">
              <p className="text-white/60">
                Each session includes 10 unique AI-generated questions with detailed scoring ⚡
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Simple Interview Session Component
  const InterviewSession = () => {
    return (
      <InterviewSessionComponent 
        role={selectedRole}
        onComplete={handleInterviewComplete}
        onBack={handleBackToRoleSelection}
      />
    );
  };

  // Results Component with Detailed Feedback
  const InterviewResults = () => {
    if (!interviewResults) return null;

    const parseScore = (feedback: string) => {
      const scoreMatch = feedback.match(/Overall Score:\s*(\d+)/i);
      return scoreMatch ? parseInt(scoreMatch[1]) : 0;
    };

    const getAverageScore = () => {
      const scores = interviewResults.feedback.map(feedback => parseScore(feedback));
      const validScores = scores.filter(score => score > 0);
      return validScores.length > 0 ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
    };

    const averageScore = getAverageScore();

    const getPerformanceLevel = (score: number) => {
      if (score >= 9) return { level: "Excellent", color: "text-green-400" };
      if (score >= 7) return { level: "Good", color: "text-blue-400" };
      if (score >= 5) return { level: "Average", color: "text-yellow-400" };
      return { level: "Needs Improvement", color: "text-red-400" };
    };

    const performance = getPerformanceLevel(averageScore);

    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Interview Results
            </h1>
            <p className="text-white/80">
              You completed the interview for {roles.find(r => r.id === selectedRole)?.title}
            </p>
          </div>

          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900/20 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Questions Answered</h3>
                  <p className="text-2xl font-bold text-blue-400">{interviewResults.questions.length}</p>
                </div>
                <div className="p-4 bg-green-900/20 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Average Score</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-green-400">{averageScore}/10</p>
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < averageScore ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-900/20 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Performance</h3>
                  <p className={`text-2xl font-bold ${performance.color}`}>{performance.level}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Detailed Feedback</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {interviewResults.feedback.map((feedback, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="mb-3">
                        <h4 className="font-semibold text-white mb-2">
                          Question {index + 1}: {interviewResults.questions[index]}
                        </h4>
                        <p className="text-sm text-gray-300 mb-2">
                          <strong>Your Answer:</strong> {interviewResults.answers[index]}
                        </p>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <div 
                          className="text-sm text-white whitespace-pre-wrap"
                          dangerouslySetInnerHTML={{ 
                            __html: feedback.replace(/\n/g, '<br>') 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleBackToRoleSelection}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Choose Different Role
                </Button>
                <Button
                  onClick={handleRestartInterview}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Practice Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {currentPhase === "role-selection" && <RoleSelector />}
      {currentPhase === "interview" && <InterviewSession />}
      {currentPhase === "results" && <InterviewResults />}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <p className="text-white">Analyzing your answers...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPractice; 