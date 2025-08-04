import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Volume2 } from "lucide-react";
import { geminiService } from "@/services/geminiService";


interface InterviewResultsProps {
  results: {
    role: string;
    answers: string[];
    questions: string[];
    feedback: string[];
    scores?: any[];
  };
  onRestart: () => void;
  onBackToRoleSelection: () => void;
}

const InterviewResults = ({ results, onRestart, onBackToRoleSelection }: InterviewResultsProps) => {
  const [aiAssessment, setAiAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const generateAssessment = async () => {
      setLoading(true);
      try {
        const assessment = await geminiService.generateFinalAssessment(
          results.role,
          results.questions,
          results.answers
        );
        setAiAssessment(assessment);
      } catch (error) {
        console.error("Error generating assessment:", error);
        setAiAssessment({
          overallScore: results.score,
          summary: "You demonstrated good communication skills and relevant knowledge throughout the interview.",
          recommendations: [
            "Practice providing more specific examples with quantifiable results",
            "Work on structuring answers using the STAR method",
            "Continue developing technical knowledge and industry awareness"
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    generateAssessment();
  }, [results]);

  const speakText = async (text: string) => {
    if (isSpeaking) return;
    
    setIsSpeaking(true);
    try {
      // Use browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Voice synthesis error:", error);
      setIsSpeaking(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-semibold mb-2">AI Analyzing Your Performance</h3>
          <p className="text-muted-foreground">
            Generating comprehensive feedback and recommendations...
          </p>
        </div>
      </div>
    );
  }

  const finalScore = aiAssessment?.overallScore || 7; // Default score
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    return "Needs Improvement";
  };

  const generateDetailedFeedback = (role: string, score: number) => {
    const feedbackMap: Record<string, string[]> = {
      "Software Developer": [
        "🔧 **Technical Skills**: Continue strengthening your knowledge of algorithms and system design",
        "💡 **Problem Solving**: Practice explaining your thought process when solving technical challenges",
        "🤝 **Communication**: Work on explaining complex technical concepts to non-technical stakeholders",
        "📚 **Learning**: Demonstrate curiosity about new technologies and continuous learning habits"
      ],
      "Data Analyst": [
        "📊 **Data Interpretation**: Focus on telling compelling stories with your data insights",
        "🔍 **Analytical Thinking**: Practice breaking down complex business problems systematically",
        "📈 **Visualization**: Improve your ability to choose the right charts for different data types",
        "🎯 **Business Impact**: Connect your analysis to concrete business outcomes and recommendations"
      ],
      "Product Manager": [
        "🎯 **Strategic Thinking**: Demonstrate ability to balance user needs with business objectives",
        "📋 **Prioritization**: Practice explaining framework for feature prioritization decisions",
        "🤝 **Stakeholder Management**: Show examples of managing competing priorities across teams",
        "📊 **Data-Driven**: Emphasize how you use metrics to validate product decisions"
      ],
      "UI/UX Designer": [
        "🎨 **Design Process**: Walk through your research and ideation methods more thoroughly",
        "👥 **User Empathy**: Share specific examples of how user research influenced your designs",
        "🔄 **Iteration**: Discuss how you incorporate feedback and iterate on designs",
        "♿ **Accessibility**: Demonstrate knowledge of inclusive design principles and practices"
      ]
    };

    return feedbackMap[role] || feedbackMap["Software Developer"];
  };

  const detailedFeedback = generateDetailedFeedback(results.role, results.score);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-primary text-white w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
          🎉
        </div>
        <h2 className="text-3xl font-bold mb-2">Interview Complete!</h2>
        <p className="text-xl text-muted-foreground mb-4">
          Here's your AI-powered performance analysis
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => speakText(`Interview complete! Your overall score is ${finalScore} out of 10. ${aiAssessment?.summary || ""}`)}
          disabled={isSpeaking}
          className="text-primary"
        >
          <Volume2 className="h-4 w-4 mr-2" />
          {isSpeaking ? "Speaking..." : "Listen to Summary"}
        </Button>
      </div>

      <div className="grid gap-6 mb-8">
        {/* Score Summary */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">AI Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(finalScore)}`}>
              {finalScore}/10
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {getScoreLabel(finalScore)}
            </Badge>
            <Progress value={finalScore * 10} className="mt-6 h-3" />
            <p className="text-muted-foreground mt-4">
              Role: <span className="font-semibold text-foreground">{results.role}</span>
            </p>
            {aiAssessment?.summary && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm italic">"{aiAssessment.summary}"</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              📋 AI-Powered Recommendations
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(aiAssessment?.recommendations?.join(". ") || "")}
                disabled={isSpeaking}
                className="p-2"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Evaluation Criteria Breakdown */}
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-3">📊 Evaluation Criteria Breakdown:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-1">✅ Correctness</h5>
                    <p className="text-xs text-muted-foreground">Factual and technical accuracy</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-1">🎯 Relevance</h5>
                    <p className="text-xs text-muted-foreground">Staying on topic and addressing the question</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-1">📚 Depth & Detail</h5>
                    <p className="text-xs text-muted-foreground">Well-explained with examples and reasoning</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <h5 className="font-medium text-sm mb-1">💬 Communication</h5>
                    <p className="text-xs text-muted-foreground">Clear, well-structured, and easy to follow</p>
                  </div>
                </div>
              </div>

              {aiAssessment?.recommendations && (
                <div>
                  <h4 className="font-semibold text-lg mb-3">🚀 Personalized Improvement Tips:</h4>
                  <div className="space-y-3">
                    {aiAssessment.recommendations.map((tip: string, index: number) => (
                      <div key={index} className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-3">💪 Key Strengths Observed:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Clear communication and structured responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Good understanding of role requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Professional tone and appropriate examples</span>
                  </li>
                </ul>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-3">🎯 Next Steps for Success:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>🔄</span>
                    <span>Practice more behavioral questions with the STAR method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📚</span>
                    <span>Research the company and role thoroughly before interviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>💼</span>
                    <span>Prepare specific examples that demonstrate your impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🗣️</span>
                    <span>Practice speaking confidently about your achievements</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card>
          <CardHeader>
            <CardTitle>🔍 Question Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="font-medium text-sm">{question}</p>
                  </div>
                  <div className="ml-9 bg-muted p-3 rounded text-sm">
                    <p className="text-muted-foreground italic">
                      "{results.answers[index]?.substring(0, 150)}..."
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={onRestart}
            variant="hero"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            🔄 Practice Same Role Again
          </Button>
          <Button 
            onClick={onBackToRoleSelection}
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            🎯 Choose Different Role
          </Button>
        </div>
        <p className="text-muted-foreground mt-4">
          Keep practicing to improve your interview skills!
        </p>
      </div>
    </div>
  );
};

export default InterviewResults;