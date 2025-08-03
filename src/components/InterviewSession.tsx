import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, Volume2, VolumeX, TestTube, Star } from "lucide-react";
import { directGeminiService } from "@/services/directGeminiService";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatingFeedback, setGeneratingFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [parsedScores, setParsedScores] = useState<any>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testQuestion, setTestQuestion] = useState("");
  const [testAnswer, setTestAnswer] = useState("");
  const [testFeedback, setTestFeedback] = useState("");
  const [generatingTestFeedback, setGeneratingTestFeedback] = useState(false);

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
    const loadQuestions = async () => {
      try {
        // Generate questions based on role
        const roleQuestions = [
          `Tell me about your experience with ${role} technologies.`,
          `What challenges have you faced in your ${role} projects?`,
          `How do you stay updated with ${role} industry trends?`,
          `Describe a complex ${role} problem you solved.`,
          `What are your strengths as a ${role}?`
        ];
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
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis error:", error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
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
        
        <Progress value={progress} className="h-2" />
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
          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Question {currentQuestionIndex + 1}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(questions[currentQuestionIndex])}
                  disabled={isSpeaking}
                  className="p-2"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{questions[currentQuestionIndex]}</p>
            </CardContent>
          </Card>

          {/* Answer Input */}
          <Card>
            <CardHeader>
              <CardTitle>Your Answer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[200px]"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {currentAnswer.length} characters
                </span>
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
            </CardContent>
          </Card>

          {/* Feedback */}
          {feedback && (
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  🤖 AI Evaluation Result
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(feedback)}
                    disabled={isSpeaking}
                    className="p-2"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Star Ratings */}
                {parsedScores && (
                  <div className="mb-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">📊 Detailed Scoring:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Score:</span>
                        <StarRating score={parsedScores.overall || 0} />
                      </div>
                      {parsedScores.correctness && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">✅ Correctness:</span>
                          <StarRating score={parsedScores.correctness} />
                        </div>
                      )}
                      {parsedScores.relevance && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">🎯 Relevance:</span>
                          <StarRating score={parsedScores.relevance} />
                        </div>
                      )}
                      {parsedScores.depth && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">📚 Depth & Detail:</span>
                          <StarRating score={parsedScores.depth} />
                        </div>
                      )}
                      {parsedScores.communication && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">💬 Communication:</span>
                          <StarRating score={parsedScores.communication} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {feedback}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          {feedback && (
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
              >
                {currentQuestionIndex === questions.length - 1 ? "Complete Interview" : "Next Question"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewSession; 