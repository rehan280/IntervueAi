import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Volume2, VolumeX, TestTube, Star, Mic, Settings, Keyboard, MessageSquare } from "lucide-react";
import { directGeminiService } from "@/services/directGeminiService";
import VoiceRecorder from "./VoiceRecorder";

interface InterviewSessionProps {
  role: string;
  onComplete: (results: any) => void;
  onBack: () => void;
}

const StarRating = ({ score, maxScore = 10 }: { score: number; maxScore?: number }) => {
  const stars = [];
  for (let i = 1; i <= maxScore; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= score ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return <div className="flex gap-1">{stars}</div>;
};

const InterviewSession = ({ role, onComplete, onBack }: InterviewSessionProps) => {
  console.log("InterviewSession component rendered with role:", role);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatingFeedback, setGeneratingFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [parsedScores, setParsedScores] = useState<any>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testQuestion, setTestQuestion] = useState("");
  const [testAnswer, setTestAnswer] = useState("");
  const [testFeedback, setTestFeedback] = useState("");
  const [generatingTestFeedback, setGeneratingTestFeedback] = useState(false);

  const [inputMethod, setInputMethod] = useState<'text' | 'voice'>('text');

  const parseScores = (feedback: string) => {
    const scores: any = {};
    
    // Extract overall score
    const overallMatch = feedback.match(/Overall Score:\s*(\d+)/i);
    if (overallMatch) scores.overall = parseInt(overallMatch[1]);
    
    // Extract individual scores
    const correctnessMatch = feedback.match(/Correctness:\s*(\d+)/i);
    if (correctnessMatch) scores.correctness = parseInt(correctnessMatch[1]);
    
    const relevanceMatch = feedback.match(/Relevance:\s*(\d+)/i);
    if (relevanceMatch) scores.relevance = parseInt(relevanceMatch[1]);
    
    const depthMatch = feedback.match(/Depth & Detail:\s*(\d+)/i);
    if (depthMatch) scores.depth = parseInt(depthMatch[1]);
    
    const communicationMatch = feedback.match(/Communication:\s*(\d+)/i);
    if (communicationMatch) scores.communication = parseInt(communicationMatch[1]);
    
    return scores;
  };

  useEffect(() => {
    console.log("InterviewSession useEffect triggered for role:", role);
    const loadQuestions = async () => {
      try {
        // Role-specific questions database
        const roleQuestionsMap: Record<string, string[]> = {
          "software-developer": [
            "Tell me about a challenging technical problem you solved and the approach you took.",
            "How do you stay updated with the latest programming languages and frameworks?",
            "Describe a time when you had to work with a difficult team member or stakeholder.",
            "What's your experience with code review processes and best practices?",
            "How do you handle debugging complex issues in production environments?",
            "Tell me about a project where you had to learn a new technology quickly.",
            "What's your approach to writing clean, maintainable code?",
            "How do you prioritize tasks when working on multiple projects?",
            "Describe a situation where you had to make a technical decision that others disagreed with.",
            "What's your experience with agile development methodologies?"
          ],
          "frontend-developer": [
            "How do you ensure your web applications are responsive and accessible?",
            "Tell me about your experience with modern JavaScript frameworks like React, Vue, or Angular.",
            "How do you optimize frontend performance and loading times?",
            "Describe a challenging UI/UX problem you solved.",
            "What's your approach to state management in large applications?",
            "How do you handle cross-browser compatibility issues?",
            "Tell me about your experience with CSS preprocessors and modern CSS features.",
            "How do you test your frontend code and ensure quality?",
            "What's your experience with build tools and deployment processes?",
            "How do you stay updated with frontend development trends?"
          ],
          "backend-developer": [
            "Tell me about your experience with database design and optimization.",
            "How do you handle security concerns in your backend applications?",
            "Describe a time when you had to scale an application to handle increased load.",
            "What's your experience with API design and documentation?",
            "How do you handle error handling and logging in production systems?",
            "Tell me about your experience with microservices architecture.",
            "How do you ensure data consistency in distributed systems?",
            "What's your approach to testing backend services?",
            "How do you handle database migrations and version control?",
            "Tell me about your experience with cloud platforms and deployment."
          ],
          "data-scientist": [
            "Tell me about a data analysis project where you discovered unexpected insights.",
            "How do you handle missing or inconsistent data in your analysis?",
            "Describe your experience with machine learning model development and deployment.",
            "How do you communicate complex statistical findings to non-technical stakeholders?",
            "What's your approach to feature engineering and selection?",
            "Tell me about your experience with big data technologies and tools.",
            "How do you validate and test your machine learning models?",
            "What's your experience with data visualization and storytelling?",
            "How do you stay updated with the latest developments in AI and ML?",
            "Describe a time when you had to explain a complex algorithm to a business team."
          ],
          "product-manager": [
            "Tell me about a product you managed from conception to launch.",
            "How do you prioritize features when you have limited resources?",
            "Describe a time when you had to make a difficult product decision with incomplete data.",
            "How do you gather and analyze user feedback to inform product decisions?",
            "Tell me about your experience working with cross-functional teams.",
            "How do you handle competing priorities from different stakeholders?",
            "What's your approach to defining and measuring product success metrics?",
            "Tell me about a time when a product launch didn't go as planned.",
            "How do you stay updated with market trends and competitor analysis?",
            "Describe your experience with agile product development methodologies."
          ],
          "ui-ux-designer": [
            "Tell me about a design project where you had to balance user needs with business constraints.",
            "How do you conduct user research and incorporate findings into your designs?",
            "Describe your design process from initial concept to final deliverable.",
            "How do you handle feedback and criticism on your designs?",
            "Tell me about your experience with design systems and component libraries.",
            "How do you ensure your designs are accessible to users with disabilities?",
            "What's your approach to prototyping and user testing?",
            "Tell me about a time when you had to design for a complex user workflow.",
            "How do you stay updated with design trends and best practices?",
            "Describe your experience working with developers to implement your designs."
          ],
          "devops-engineer": [
            "Tell me about your experience with CI/CD pipeline implementation and optimization.",
            "How do you handle infrastructure scaling and performance monitoring?",
            "Describe a time when you had to troubleshoot a critical production issue.",
            "What's your experience with containerization and orchestration tools?",
            "How do you ensure security in your infrastructure and deployment processes?",
            "Tell me about your experience with cloud platforms and services.",
            "How do you handle configuration management and infrastructure as code?",
            "What's your approach to monitoring and alerting in production environments?",
            "Tell me about your experience with disaster recovery and backup strategies.",
            "How do you stay updated with DevOps tools and best practices?"
          ],
          "ai-ml-engineer": [
            "Tell me about a machine learning model you developed and deployed to production.",
            "How do you handle model drift and retraining in production systems?",
            "Describe your experience with deep learning frameworks and architectures.",
            "How do you ensure your ML models are fair and unbiased?",
            "What's your approach to feature engineering and data preprocessing?",
            "Tell me about your experience with MLOps and model lifecycle management.",
            "How do you handle the trade-off between model accuracy and interpretability?",
            "What's your experience with real-time inference and model serving?",
            "How do you validate and test your machine learning models?",
            "Tell me about your experience with big data technologies for ML applications."
          ],
          "hr-executive": [
            "Tell me about your experience with recruitment and talent acquisition processes.",
            "How do you handle difficult employee relations situations?",
            "Describe your approach to performance management and employee development.",
            "What's your experience with HR policies and compliance requirements?",
            "How do you stay updated with employment laws and regulations?",
            "Tell me about a time when you had to mediate a conflict between employees.",
            "What's your approach to building a positive company culture?",
            "How do you handle sensitive employee information and maintain confidentiality?",
            "Tell me about your experience with HR technology and systems.",
            "How do you measure the effectiveness of HR programs and initiatives?"
          ],
          "sales-executive": [
            "Tell me about your most successful sales achievement and how you accomplished it.",
            "How do you handle rejection and maintain motivation in sales?",
            "Describe your sales process and how you qualify leads.",
            "What's your experience with CRM systems and sales tools?",
            "How do you build and maintain relationships with clients?",
            "Tell me about a time when you had to overcome a major sales objection.",
            "What's your approach to understanding customer needs and pain points?",
            "How do you handle competitive situations and differentiate your product?",
            "Tell me about your experience with sales forecasting and pipeline management.",
            "How do you stay motivated and achieve your sales targets?"
          ],
          "marketing-manager": [
            "Tell me about a successful marketing campaign you managed from concept to execution.",
            "How do you measure the ROI of marketing campaigns and initiatives?",
            "Describe your experience with digital marketing channels and strategies.",
            "What's your approach to understanding target audiences and market research?",
            "How do you stay updated with marketing trends and best practices?",
            "Tell me about a time when you had to pivot a marketing strategy due to market changes.",
            "What's your experience with marketing automation and analytics tools?",
            "How do you collaborate with other departments to align marketing efforts?",
            "Tell me about your experience with brand management and positioning.",
            "How do you handle budget constraints while maximizing marketing impact?"
          ],
          "cybersecurity-analyst": [
            "Tell me about a security incident you investigated and how you resolved it.",
            "How do you stay updated with the latest cybersecurity threats and trends?",
            "Describe your experience with security tools and technologies.",
            "What's your approach to vulnerability assessment and penetration testing?",
            "How do you handle security breaches and incident response?",
            "Tell me about your experience with compliance frameworks like SOC 2 or ISO 27001.",
            "What's your approach to security awareness training and education?",
            "How do you balance security requirements with business needs?",
            "Tell me about your experience with threat intelligence and monitoring.",
            "How do you communicate security risks to non-technical stakeholders?"
          ],
          "business-analyst": [
            "Tell me about a complex business problem you analyzed and the solution you proposed.",
            "How do you gather and document business requirements from stakeholders?",
            "Describe your experience with data analysis and business intelligence tools.",
            "What's your approach to process improvement and optimization?",
            "How do you handle conflicting requirements from different stakeholders?",
            "Tell me about a time when you had to present complex data to senior management.",
            "What's your experience with project management and agile methodologies?",
            "How do you ensure the solutions you propose align with business objectives?",
            "Tell me about your experience with user acceptance testing and validation.",
            "How do you stay updated with industry trends and best practices?"
          ],
          "finance-analyst": [
            "Tell me about a financial analysis project that had significant business impact.",
            "How do you ensure accuracy and attention to detail in financial reporting?",
            "Describe your experience with financial modeling and forecasting.",
            "What's your approach to variance analysis and identifying trends?",
            "How do you handle tight deadlines and multiple reporting requirements?",
            "Tell me about a time when you identified a financial risk or opportunity.",
            "What's your experience with financial systems and ERP software?",
            "How do you communicate complex financial information to non-financial stakeholders?",
            "Tell me about your experience with budgeting and cost analysis.",
            "How do you stay updated with accounting standards and regulations?"
          ]
        };

        // Get questions for the selected role, or use default questions
        const roleQuestions = roleQuestionsMap[role] || [
          `Tell me about your experience with ${role} technologies.`,
          `What challenges have you faced in your ${role} projects?`,
          `How do you stay updated with ${role} industry trends?`,
          `Describe a complex ${role} problem you solved.`,
          `What are your strengths as a ${role}?`,
          `How do you handle difficult situations in your ${role} work?`,
          `Tell me about a time when you had to learn something new quickly.`,
          `What's your approach to problem-solving in ${role} contexts?`,
          `How do you collaborate with team members in ${role} projects?`,
          `What are your career goals in the ${role} field?`
        ];
        
        console.log("Questions loaded:", roleQuestions);
        if (!roleQuestions || roleQuestions.length === 0) {
          console.error("No questions loaded for role:", role);
          setLoading(false);
          return;
        }
        setQuestions(roleQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, [role]);

  const speakText = async (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    try {
      // Use browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis failed:", error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleVoiceTranscription = (transcribedText: string) => {
    setCurrentAnswer(transcribedText);
  };

  const handleAnswerSubmit = async () => {
    if (!currentAnswer.trim()) return;
    
    setGeneratingFeedback(true);
    try {
      console.log("Calling Gemini API for analysis...");
      const result = await directGeminiService.analyzeAnswer(
        questions[currentQuestionIndex],
        currentAnswer,
        role
      );
      console.log("Gemini API response:", result);
      
      const scores = parseScores(result);
      setParsedScores(scores);
      setFeedback(result);
      
      // Add answer to answers array
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = currentAnswer;
      setAnswers(newAnswers);
      
    } catch (error) {
      console.error("Analysis failed:", error);
      setFeedback("Analysis failed. Please try again.");
    } finally {
      setGeneratingFeedback(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
      setFeedback("");
      setParsedScores(null);
    } else {
      // Interview complete
      const results = {
        role,
        questions,
        answers: [...answers, currentAnswer],
        feedback: [feedback]
      };
      onComplete(results);
    }
  };

  const handleTestEvaluation = async () => {
    if (!testQuestion.trim() || !testAnswer.trim()) return;
    
    setGeneratingTestFeedback(true);
    try {
      console.log("Calling Gemini API for test analysis...");
      const result = await directGeminiService.analyzeAnswer(
        testQuestion,
        testAnswer,
        role
      );
      console.log("Test analysis result:", result);
      setTestFeedback(result);
    } catch (error) {
      console.error("Test analysis failed:", error);
      setTestFeedback("Analysis failed. Please try again.");
    } finally {
      setGeneratingTestFeedback(false);
    }
  };

  const resetTestMode = () => {
    setTestQuestion("");
    setTestAnswer("");
    setTestFeedback("");
    setGeneratingTestFeedback(false);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;



  if (!role) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">No Role Selected</h2>
            <p className="text-gray-400">Please go back and select a role.</p>
            <Button onClick={onBack} className="mt-4">
              Back to Role Selection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <span className="ml-2 text-white">Loading questions...</span>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">No Questions Available</h2>
            <p className="text-gray-400">Unable to load questions for this role.</p>
            <Button onClick={onBack} className="mt-4">
              Back to Role Selection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
                 <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center gap-2 sm:gap-4">
              <img src="/logo.png" alt="IntervueAi Logo" className="w-8 h-5 sm:w-10 sm:h-6 md:w-12 md:h-7 object-contain" />
                            <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">IntervueAi Interview Session</h1>
                <p className="text-sm sm:text-base text-muted-foreground mb-1">
                  Train Smarter. Interview Better.
                </p>
                <p className="text-muted-foreground">
                  Role: <Badge variant="secondary">{role}</Badge>
                </p>
              </div>
           </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              Back to Role Selection
            </Button>
            <Button
              variant="outline"
              onClick={() => setTestMode(!testMode)}
              className="flex items-center gap-2"
            >
              <TestTube className="h-4 w-4" />
              {testMode ? "Hide Test Mode" : "Show Test Mode"}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => voiceEnabled ? stopSpeaking() : setVoiceEnabled(true)}
                className="p-2"
                title={voiceEnabled ? "Stop speaking" : "Enable voice"}
              >
                {isSpeaking ? (
                  <VolumeX className="h-4 w-4 text-red-500" />
                ) : voiceEnabled ? (
                  <Volume2 className="h-4 w-4 text-primary" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {voiceEnabled ? "Voice On" : "Voice Off"}
              </button>
              

            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Estimated time remaining: ~{Math.max(0, Math.round((questions.length - currentQuestionIndex - 1) * 3))} minutes</span>
          </div>
        </div>
      </div>

      {testMode ? (
        <div className="space-y-6">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-blue-600" />
                Test AI Evaluation System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Question:</label>
                <Textarea
                  value={testQuestion}
                  onChange={(e) => setTestQuestion(e.target.value)}
                  placeholder="Enter any interview question to test..."
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Your Answer:</label>
                <Textarea
                  value={testAnswer}
                  onChange={(e) => setTestAnswer(e.target.value)}
                  placeholder="Enter your answer here..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleTestEvaluation}
                  disabled={!testQuestion.trim() || !testAnswer.trim() || generatingTestFeedback}
                  variant="default"
                >
                  {generatingTestFeedback ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Evaluate Answer"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setTestQuestion("Tell me about a challenging project you worked on and how you handled it.");
                    setTestAnswer("I worked on a project where we had to migrate a legacy system. It was challenging because the old system was poorly documented. I organized the team, created a detailed migration plan, and we completed it on time.");
                  }}
                  variant="outline"
                  size="sm"
                >
                  Load Sample
                </Button>
                <Button
                  onClick={resetTestMode}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Test Questions */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-sm">Quick Test Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTestQuestion("What are your greatest strengths and how do they apply to this position?");
                    setTestAnswer("React is good.");
                  }}
                  className="text-left justify-start h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Sample 1: Very Poor Answer</div>
                    <div className="text-xs text-muted-foreground mt-1">Should get 1-2/10 score</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTestQuestion("Describe a time when you had to work under pressure and how you handled it.");
                    setTestAnswer("In my previous role, we had a critical deadline for a client project. The team was struggling with a complex integration issue. I took the initiative to break down the problem into smaller tasks, assigned them to team members based on their strengths, and we worked overtime to meet the deadline. The project was delivered on time and the client was very satisfied with the results.");
                  }}
                  className="text-left justify-start h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Sample 2: Excellent STAR Answer</div>
                    <div className="text-xs text-muted-foreground mt-1">Should get 8-10/10 score</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTestQuestion("How do you handle feedback and criticism?");
                    setTestAnswer("I welcome feedback as it helps me grow. I listen carefully, ask clarifying questions, and implement the suggestions. I don't take it personally.");
                  }}
                  className="text-left justify-start h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Sample 3: Average Answer</div>
                    <div className="text-xs text-muted-foreground mt-1">Should get 5-7/10 score</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTestQuestion("Tell me about a challenging technical problem you solved.");
                    setTestAnswer("I had to optimize a database query that was taking 30 seconds to run. I analyzed the execution plan, added proper indexes, and restructured the query. This reduced the execution time to under 2 seconds, improving the user experience significantly.");
                  }}
                  className="text-left justify-start h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Sample 4: Technical Answer</div>
                    <div className="text-xs text-muted-foreground mt-1">Should get 7-9/10 score</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTestQuestion("Why do you want to work for our company?");
                    setTestAnswer("I like coding and your company seems cool. I want to make money and learn new things.");
                  }}
                  className="text-left justify-start h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Sample 5: Unprofessional Answer</div>
                    <div className="text-xs text-muted-foreground mt-1">Should get 2-4/10 score</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {testFeedback && (
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  🤖 AI Evaluation Result
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(testFeedback)}
                    disabled={isSpeaking}
                    className="p-2"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {testFeedback}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Welcome Message for First Question */}
          {currentQuestionIndex === 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <MessageSquare className="h-5 w-5" />
                  Welcome to Your Interview Practice Session! 🎯
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-blue-700">
                  <p className="text-sm">
                    <strong>Tips for success:</strong>
                  </p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Use the voice recorder for natural speech-to-text answers</li>
                    <li>• Click the speaker icon to hear questions read aloud</li>
                    <li>• Take your time to think before answering</li>
                    <li>• Use the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
                    <li>• Customize voice settings for your preferred interviewer voice</li>
                  </ul>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">
                      <Mic className="h-3 w-3 mr-1" />
                      Voice Input Available
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Text-to-Speech Enabled
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Question {currentQuestionIndex + 1}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(questions[currentQuestionIndex])}
                    disabled={isSpeaking}
                    className="p-2"
                    title="Listen to question"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Badge variant="outline" className="text-xs">
                    {currentQuestionIndex + 1} of {questions.length}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{questions[currentQuestionIndex]}</p>
            </CardContent>
          </Card>

          {/* Answer Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your Answer
                <div className="flex items-center gap-2">
                  <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as 'text' | 'voice')} className="w-auto">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text" className="flex items-center gap-2">
                        <Keyboard className="h-4 w-4" />
                        Text
                      </TabsTrigger>
                      <TabsTrigger value="voice" className="flex items-center gap-2">
                        <Mic className="h-4 w-4" />
                        Voice
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TabsContent value="text" className="space-y-4">
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[200px]"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {currentAnswer.length} characters • {currentAnswer.split(' ').length} words
                    </span>
                    {currentAnswer.length > 0 && currentAnswer.length < 100 && (
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        💡 Tip: Consider adding more detail to your answer
                      </span>
                    )}
                    {currentAnswer.length > 500 && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        ✅ Good length for a comprehensive answer
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={!currentAnswer.trim() || generatingFeedback}
                  >
                    {generatingFeedback ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Submit Answer"
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="voice" className="space-y-4">
                <VoiceRecorder
                  onTranscriptionComplete={handleVoiceTranscription}
                  maxDuration={60000} // 60 seconds for interview answers
                  autoTranscribe={true}
                  placeholder="Click the microphone to start recording your interview answer..."
                />
                {currentAnswer && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">Your Answer:</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {currentAnswer.length} characters • {currentAnswer.split(' ').length} words
                        </span>
                        {currentAnswer.length > 0 && currentAnswer.length < 100 && (
                          <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            💡 Consider adding more detail
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
                      <p className="text-sm leading-relaxed">{currentAnswer}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handleAnswerSubmit}
                        disabled={!currentAnswer.trim() || generatingFeedback}
                      >
                        {generatingFeedback ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Submit Answer"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Card>

          {/* Feedback */}
          {feedback && (
            <div className="space-y-6">
              {/* Overall Score Card */}
              {parsedScores && (
                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">AI Evaluation Result</CardTitle>
                        <p className="text-sm text-blue-300">Powered by Gemini AI</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {parsedScores.overall || 0}/10
                      </div>
                      <div className="text-sm text-gray-300">
                        {parsedScores.overall >= 8 ? "Excellent" : 
                         parsedScores.overall >= 6 ? "Good" : 
                         parsedScores.overall >= 4 ? "Fair" : "Needs Improvement"}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(parsedScores.overall || 0) * 10}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Detailed Scoring */}
              {parsedScores && (
                <Card className="bg-gray-800/50 border border-gray-600/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <span className="text-xl">📊</span>
                      Detailed Scoring Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            Correctness
                          </span>
                          <StarRating score={parsedScores.correctness || 0} />
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(parsedScores.correctness || 0) * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-pink-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                            Relevance
                          </span>
                          <StarRating score={parsedScores.relevance || 0} />
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(parsedScores.relevance || 0) * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-purple-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                            Depth & Detail
                          </span>
                          <StarRating score={parsedScores.depth || 0} />
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(parsedScores.depth || 0) * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-300 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            Communication
                          </span>
                          <StarRating score={parsedScores.communication || 0} />
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(parsedScores.communication || 0) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Detailed Analysis */}
              <Card className="bg-gray-800/50 border border-gray-600/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">🔍</span>
                      Detailed Analysis
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(feedback)}
                      disabled={isSpeaking}
                      className="p-2 text-blue-400 hover:text-blue-300"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Strengths Section */}
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-green-400 text-lg">✅</span>
                      <h4 className="font-semibold text-green-300">Strengths</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-green-200 text-sm">Minimal response</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-green-200 text-sm">Basic attempt</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-green-200 text-sm">Shows effort</span>
                      </div>
                    </div>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-orange-400 text-lg">⚠️</span>
                      <h4 className="font-semibold text-orange-300">Areas for Improvement</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span className="text-orange-200 text-sm">Provide comprehensive detail and explanation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span className="text-orange-200 text-sm">Include specific examples and experiences</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                        <span className="text-orange-200 text-sm">Use the STAR method for comprehensive responses</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Recommendation */}
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-blue-400 text-lg">💡</span>
                      <h4 className="font-semibold text-blue-300">Key Recommendation</h4>
                    </div>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      This answer needs major improvement. Provide detailed responses with specific examples and experiences.
                    </p>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-purple-400 text-lg">📝</span>
                      <h4 className="font-semibold text-purple-300">Detailed Analysis</h4>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      This answer is extremely brief and lacks the detail needed for an effective interview response. Consider expanding significantly. Your answer has {currentAnswer.length} characters and {currentAnswer.split(' ').length} words. This is too brief for an effective interview response. Consider adding more concrete examples from your experience.
                    </p>
                  </div>

                  {/* Word Count Stats */}
                  <div className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{currentAnswer.split(' ').length}</div>
                          <div className="text-xs text-gray-400">Words</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{currentAnswer.length}</div>
                          <div className="text-xs text-gray-400">Characters</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">AI Analysis Complete</div>
                        <div className="text-xs text-green-400">✓ Processed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          {feedback && (
            <div className="space-y-4">
              {/* Progress Encouragement */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🎉</span>
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Great job on question {currentQuestionIndex + 1}!
                        </p>
                        <p className="text-xs text-green-600">
                          {currentQuestionIndex === questions.length - 1 
                            ? "This was your final question!" 
                            : `${questions.length - currentQuestionIndex - 1} more questions to go!`}
                        </p>
                      </div>
                    </div>
                    {parsedScores?.overall && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {parsedScores.overall}/10
                        </div>
                        <div className="text-xs text-green-600">Score</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                    setCurrentAnswer(answers[currentQuestionIndex - 1] || "");
                    setFeedback("");
                    setParsedScores(null);
                  }}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous Question
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={!feedback}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {currentQuestionIndex === questions.length - 1 ? "Complete Interview" : "Next Question"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewSession; 