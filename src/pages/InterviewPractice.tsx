import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Briefcase, Star } from "lucide-react";
import { directGeminiService } from "@/services/directGeminiService";

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
        
        <div className="relative py-8 sm:py-10 md:py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <div className="flex justify-center mb-4 sm:mb-6">
                <img src="/logo.png" alt="IntervueAi Logo" className="w-32 h-18 sm:w-36 sm:h-20 md:w-40 md:h-22 lg:w-48 lg:h-27 object-contain" />
              </div>
              <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20">
                <Briefcase className="w-4 h-4 mr-2" />
                Choose Your Path
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
                Hi! 👋 I'm your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  IntervueAi Coach
                </span>
              </h2>
              <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-400">
                Train Smarter. Interview Better.
              </p>
              <p className="text-xl text-white/80 mb-2">
                Let's get you prepared for your next big job interview.
              </p>
              <p className="text-lg text-white/70">
                Select your role for a comprehensive 10-question interview session:
              </p>
            </div>
            
            <Card className="max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-white">
                      Select Your Target Role
                    </label>
                    <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                      <SelectTrigger className="w-full h-12 text-base bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400">
                        <SelectValue placeholder="Choose a role to practice for..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 max-h-60">
                        {roles.map((role) => (
                          <SelectItem 
                            key={role.id} 
                            value={role.id}
                            className="hover:bg-gray-700/50 cursor-pointer text-white"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{role.icon}</span>
                              <span className="font-medium">{role.title}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedRoleData && (
                    <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{selectedRoleData.icon}</span>
                        <div>
                          <h3 className="font-semibold text-lg text-white">{selectedRoleData.title}</h3>
                          <p className="text-sm text-blue-200">
                            Prepare for {selectedRoleData.title.toLowerCase()} interviews
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
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
                    className="w-full group bg-blue-600 hover:bg-blue-700"
                  >
                    <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
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
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [allAnswers, setAllAnswers] = useState<string[]>([]);
    const [allFeedback, setAllFeedback] = useState<string[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState("");
    const [showTestMode, setShowTestMode] = useState(false);
    const [questions] = useState([
      "Tell me about yourself and your experience in this field.",
      "What are your greatest strengths and how do they apply to this position?",
      "Describe a challenging situation you faced and how you handled it.",
      "Why are you interested in this role and our company?",
      "Tell me about a time when you had to work under pressure.",
      "How do you handle feedback and criticism?",
      "Describe a time when you had to learn something new quickly.",
      "What motivates you in your work?",
      "How do you prioritize tasks when everything seems urgent?",
      "Where do you see yourself in 5 years and how does this role fit your goals?"
    ]);

    // Example answers for test mode
    const exampleAnswers = {
      "Tell me about yourself and your experience in this field.": {
        poor: "I'm a developer. I code stuff.",
        average: "I'm a software developer with 3 years of experience in web development. I've worked with React and Node.js on various projects.",
        excellent: "I'm a passionate software developer with 5 years of experience specializing in full-stack web development. I've led development teams on projects that served over 100,000 users, including a healthcare platform that improved patient outcomes by 40%. My expertise includes React, Node.js, and cloud technologies. I'm particularly proud of mentoring junior developers and implementing CI/CD pipelines that reduced deployment time by 60%."
      },
      "What are your greatest strengths and how do they apply to this position?": {
        poor: "I'm good at coding.",
        average: "My strengths include problem-solving and teamwork. I can work well with others and solve technical challenges.",
        excellent: "My greatest strengths are analytical problem-solving and collaborative leadership. I excel at breaking down complex technical challenges into manageable solutions, as demonstrated when I redesigned our database architecture, reducing query time by 70%. I also have strong communication skills, having successfully led cross-functional teams of 8 developers. These skills directly apply to this role as I can quickly understand technical requirements and effectively collaborate with stakeholders to deliver high-quality solutions."
      },
      "Describe a challenging situation you faced and how you handled it.": {
        poor: "I had a bug once. I fixed it.",
        average: "We had a major bug in production. I worked overtime to fix it and learned to test better.",
        excellent: "I faced a critical production issue where our payment system was failing for 20% of transactions. I immediately implemented a temporary fix to restore service, then led a root cause analysis that revealed a race condition in our database transactions. I designed and implemented a comprehensive solution using database locking mechanisms, reducing failures to 0.1%. I also established monitoring alerts and created a post-mortem process that prevented similar issues. This experience taught me the importance of proactive monitoring and systematic problem-solving."
      },
      "Why are you interested in this role and our company?": {
        poor: "I need a job.",
        average: "I'm interested in the technology you use and the company seems good.",
        excellent: "I'm excited about this role because it combines my passion for scalable architecture with the opportunity to work on products that impact millions of users. Your company's commitment to innovation and user-centric design aligns perfectly with my values. I'm particularly drawn to your recent work on AI-powered features and your culture of continuous learning. I believe my experience in building high-performance systems and mentoring teams would contribute significantly to your mission of making technology more accessible."
      },
      "Tell me about a time when you had to work under pressure.": {
        poor: "I had a deadline. I worked hard.",
        average: "We had a tight deadline for a client project. I worked extra hours and got it done on time.",
        excellent: "During a critical product launch, our main server crashed 2 hours before go-live. I immediately coordinated with the infrastructure team to implement our disaster recovery plan while simultaneously developing a hotfix for the underlying issue. I managed a team of 5 developers, prioritized critical features, and communicated updates to stakeholders every 30 minutes. We successfully launched on time with 99.9% uptime. This experience taught me the importance of preparation, clear communication, and staying calm under pressure."
      },
      "How do you handle feedback and criticism?": {
        poor: "I listen to feedback.",
        average: "I appreciate feedback and try to improve based on it.",
        excellent: "I actively seek feedback and view it as essential for growth. I maintain a feedback journal where I track patterns and create action plans for improvement. For example, when my manager suggested I improve my technical documentation, I enrolled in a technical writing course and implemented a new documentation template that became the company standard. I also give constructive feedback to others and create an environment where honest communication is valued. I believe feedback is a gift that helps us grow professionally and personally."
      },
      "Describe a time when you had to learn something new quickly.": {
        poor: "I learned React. It was hard.",
        average: "I had to learn a new framework for a project. I read documentation and practiced.",
        excellent: "When our team decided to migrate to a new cloud platform, I took the initiative to become the subject matter expert within 2 weeks. I immersed myself in the platform's documentation, completed certification courses, and built a proof-of-concept application. I then created comprehensive training materials and mentored 3 team members. This rapid learning enabled us to complete the migration 2 weeks ahead of schedule, saving $50,000 in infrastructure costs. I've since applied this systematic learning approach to master 4 new technologies."
      },
      "What motivates you in your work?": {
        poor: "I like coding.",
        average: "I enjoy solving problems and creating useful software.",
        excellent: "I'm motivated by creating meaningful impact through technology. I thrive on solving complex problems that improve people's lives, whether it's building systems that process millions of transactions securely or developing features that enhance user experience. I'm also driven by continuous learning and growth - I love exploring new technologies and sharing knowledge with my team. The combination of technical challenge, positive impact, and collaborative innovation keeps me engaged and excited about my work every day."
      },
      "How do you prioritize tasks when everything seems urgent?": {
        poor: "I do what's most important first.",
        average: "I use a priority matrix and focus on high-impact tasks.",
        excellent: "I use the Eisenhower Matrix combined with stakeholder communication to prioritize effectively. I categorize tasks by urgency and importance, then consult with stakeholders to understand business impact. For example, during a major system upgrade, I identified that a security patch was more critical than a UI enhancement, even though both were urgent. I communicated this reasoning clearly to all stakeholders and created a detailed timeline. This approach has helped me consistently deliver high-priority projects on time while maintaining team morale."
      },
      "Where do you see yourself in 5 years and how does this role fit your goals?": {
        poor: "I want to be a senior developer.",
        average: "I hope to be in a leadership position and this role will help me grow.",
        excellent: "In 5 years, I see myself as a technical leader who has successfully scaled engineering teams and delivered innovative products that solve real-world problems. I want to combine deep technical expertise with strategic thinking to drive organizational growth. This role is perfect because it offers the opportunity to work on cutting-edge technology while developing leadership skills. I'm particularly excited about the mentorship opportunities and the chance to contribute to architectural decisions that will shape the company's technical future."
      }
    };

    // Initialize arrays when component mounts
    useEffect(() => {
      setAllAnswers(new Array(questions.length).fill(""));
      setAllFeedback(new Array(questions.length).fill(""));
    }, [questions.length]);

    // Update answer when currentQuestion changes
    useEffect(() => {
      setAnswer(allAnswers[currentQuestion] || "");
      setShowFeedback(false);
      setShowTestMode(false);
    }, [currentQuestion, allAnswers]);

    const analyzeCurrentAnswer = async () => {
      if (!answer.trim()) {
        setCurrentFeedback("Please provide an answer before submitting.");
        setShowFeedback(true);
        return;
      }

      setIsAnalyzing(true);
      try {
        const feedback = await directGeminiService.analyzeAnswer(
          questions[currentQuestion], 
          answer, 
          selectedRole
        );
        setCurrentFeedback(feedback);
        
        // Save feedback to array
        const updatedFeedback = [...allFeedback];
        updatedFeedback[currentQuestion] = feedback;
        setAllFeedback(updatedFeedback);
        
        setShowFeedback(true);
      } catch (error) {
        console.error('Error analyzing answer:', error);
        setCurrentFeedback("Unable to analyze this answer. Please try again.");
        setShowFeedback(true);
      } finally {
        setIsAnalyzing(false);
      }
    };

    const handleSubmitAnswer = () => {
      // Save current answer to the answers array
      const updatedAnswers = [...allAnswers];
      updatedAnswers[currentQuestion] = answer;
      setAllAnswers(updatedAnswers);

      // Analyze the answer
      analyzeCurrentAnswer();
    };

    const handleNextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer(allAnswers[currentQuestion + 1] || "");
        setShowFeedback(false);
      } else {
        // Interview is complete
        const results: InterviewResult = {
          role: selectedRole,
          questions: questions,
          answers: allAnswers,
          feedback: allFeedback
        };
        handleInterviewComplete(results);
      }
    };

    const handleSkip = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer(allAnswers[currentQuestion + 1] || "");
        setShowFeedback(false);
      } else {
        // Complete interview with current answers
        const results: InterviewResult = {
          role: selectedRole,
          questions: questions,
          answers: allAnswers,
          feedback: allFeedback
        };
        handleInterviewComplete(results);
      }
    };

    const handlePrevious = () => {
      if (currentQuestion > 0) {
        // Save current answer before going back
        const updatedAnswers = [...allAnswers];
        updatedAnswers[currentQuestion] = answer;
        setAllAnswers(updatedAnswers);
        
        setCurrentQuestion(currentQuestion - 1);
        setAnswer(updatedAnswers[currentQuestion - 1] || "");
        setShowFeedback(false);
      }
    };

    const parseScore = (feedback: string) => {
      const scoreMatch = feedback.match(/Overall Score:\s*(\d+)/i);
      return scoreMatch ? parseInt(scoreMatch[1]) : 0;
    };

    const getScoreColor = (score: number) => {
      if (score >= 9) return "text-green-400";
      if (score >= 7) return "text-blue-400";
      if (score >= 5) return "text-yellow-400";
      return "text-red-400";
    };

    const renderFeedback = (feedback: string) => {
      const score = parseScore(feedback);
      const scoreColor = getScoreColor(score);

      // Parse the feedback sections
      const sections = feedback.split('---');
      const mainSection = sections[0] || feedback;

      return (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-semibold text-white mb-2">Overall Score</h3>
            <div className="flex items-center justify-center gap-3">
              <span className={`text-4xl font-bold ${scoreColor}`}>{score}/10</span>
              <div className="flex">
                {[...Array(10)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < score ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Scoring */}
          <Card className="bg-gray-800/50 border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Detailed Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mainSection.includes('Correctness:') && (
                <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-sm">✅</span>
                    </div>
                    <span className="text-white font-medium">Correctness</span>
                  </div>
                  <span className="text-green-400 font-bold">
                    {mainSection.match(/Correctness:\s*(\d+)/)?.[1] || '0'}/10
                  </span>
                </div>
              )}
              
              {mainSection.includes('Relevance:') && (
                <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 text-sm">🎯</span>
                    </div>
                    <span className="text-white font-medium">Relevance</span>
                  </div>
                  <span className="text-blue-400 font-bold">
                    {mainSection.match(/Relevance:\s*(\d+)/)?.[1] || '0'}/10
                  </span>
                </div>
              )}
              
              {mainSection.includes('Depth & Detail:') && (
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 text-sm">📚</span>
                    </div>
                    <span className="text-white font-medium">Depth & Detail</span>
                  </div>
                  <span className="text-purple-400 font-bold">
                    {mainSection.match(/Depth & Detail:\s*(\d+)/)?.[1] || '0'}/10
                  </span>
                </div>
              )}
              
              {mainSection.includes('Communication:') && (
                <div className="flex items-center justify-between p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400 text-sm">💬</span>
                    </div>
                    <span className="text-white font-medium">Communication</span>
                  </div>
                  <span className="text-orange-400 font-bold">
                    {mainSection.match(/Communication:\s*(\d+)/)?.[1] || '0'}/10
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Strengths */}
          {mainSection.includes('Strengths:') && (
            <Card className="bg-green-900/20 border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mainSection
                    .split('Strengths:')[1]
                    ?.split('Areas for Improvement:')[0]
                    ?.split('\n')
                    .filter(line => line.trim().startsWith('•'))
                    .map((strength, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span className="text-white">{strength.replace('•', '').trim()}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Areas for Improvement */}
          {mainSection.includes('Areas for Improvement:') && (
            <Card className="bg-red-900/20 border border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400">Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mainSection
                    .split('Areas for Improvement:')[1]
                    ?.split('Key Recommendation:')[0]
                    ?.split('\n')
                    .filter(line => line.trim().startsWith('•'))
                    .map((improvement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">⚠</span>
                        <span className="text-white">{improvement.replace('•', '').trim()}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Key Recommendation */}
          {mainSection.includes('Key Recommendation:') && (
            <Card className="bg-blue-900/20 border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">Key Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  {mainSection.split('Key Recommendation:')[1]?.split('\n')[0]?.trim()}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      );
    };

    const renderTestMode = () => {
      const currentQuestionText = questions[currentQuestion];
      const examples = exampleAnswers[currentQuestionText as keyof typeof exampleAnswers];

      if (!examples) return null;

      return (
        <Card className="mt-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Example Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Poor Answer */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-900/50 text-red-400 border-red-500/30">Poor (1-3/10)</Badge>
                <span className="text-red-400 text-sm">Too brief, lacks detail</span>
              </div>
              <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
                <p className="text-white text-sm italic">"{examples.poor}"</p>
              </div>
            </div>

            {/* Average Answer */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-500/30">Average (4-6/10)</Badge>
                <span className="text-yellow-400 text-sm">Basic structure, some detail</span>
              </div>
              <div className="p-4 bg-yellow-900/10 border border-yellow-500/20 rounded-lg">
                <p className="text-white text-sm italic">"{examples.average}"</p>
              </div>
            </div>

            {/* Excellent Answer */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-900/50 text-green-400 border-green-500/30">Excellent (7-10/10)</Badge>
                <span className="text-green-400 text-sm">Detailed, specific examples, well-structured</span>
              </div>
              <div className="p-4 bg-green-900/10 border border-green-500/20 rounded-lg">
                <p className="text-white text-sm italic">"{examples.excellent}"</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">💡 Tips for Better Answers:</h4>
              <ul className="text-white text-sm space-y-1">
                <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                <li>• Include specific examples and quantifiable results</li>
                <li>• Show enthusiasm and passion for the role</li>
                <li>• Connect your experience to the job requirements</li>
                <li>• Keep answers concise but comprehensive (2-3 minutes)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      );
    };

    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Interview Practice - {roles.find(r => r.id === selectedRole)?.title}
            </h1>
            <p className="text-white/80">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">
                Question {currentQuestion + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-white text-lg">{questions[currentQuestion]}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-white">
                    Your Answer
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTestMode(!showTestMode)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {showTestMode ? "Hide Examples" : "Show Examples"}
                  </Button>
                </div>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-32 p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none"
                  placeholder="Type your answer here..."
                />
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleBackToRoleSelection}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Back to Role Selection
                </Button>
                {currentQuestion > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Previous Question
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Skip Question
                </Button>
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? "Analyzing..." : "Submit Answer"}
                </Button>
              </div>

              {/* Progress indicator */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-white/60 mb-2">
                  <span>Progress</span>
                  <span>{currentQuestion + 1} / {questions.length}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Mode Examples */}
          {showTestMode && renderTestMode()}

          {/* Feedback Section */}
          {showFeedback && (
            <Card className="mt-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Feedback for Question {currentQuestion + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderFeedback(currentFeedback)}
                
                <div className="mt-6 flex gap-4">
                  <Button
                    onClick={() => setShowFeedback(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Edit Answer
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Interview"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
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