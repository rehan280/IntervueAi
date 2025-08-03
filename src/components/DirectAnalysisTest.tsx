import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { directGeminiService } from "@/services/directGeminiService";
import { Loader2 } from "lucide-react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

const DirectAnalysisTest = () => {
  const [question, setQuestion] = useState("What are your greatest strengths?");
  const [answer, setAnswer] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!answer.trim()) return;
    
    setLoading(true);
    try {
      console.log("Calling Gemini API for analysis...");
      const result = await directGeminiService.analyzeAnswer(question, answer, "Software Engineer");
      console.log("Gemini API response:", result);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const testCases = [
    { 
      name: "Very Weak (1-3/10)", 
      question: "What are your greatest strengths?", 
      answer: "React is good." 
    },
    { 
      name: "Needs Improvement (4-6/10)", 
      question: "How do you handle feedback?", 
      answer: "I welcome feedback and try to improve. I listen to what people say and make changes based on their suggestions." 
    },
    { 
      name: "Good but can improve (7-8/10)", 
      question: "Describe a challenging project.", 
      answer: "I worked on a project where we had to migrate a legacy system. It was challenging because the old system was poorly documented. I organized the team and we completed it on time. The project improved efficiency by 30%." 
    },
    { 
      name: "Excellent, near interview-ready (9-10/10)", 
      question: "Tell me about a time you solved a problem.", 
      answer: "In my previous role, I led a team of 5 developers to build a real-time dashboard that processed 10,000+ data points per second. We used React, Node.js, and Redis. The project was delivered 2 weeks early and improved user engagement by 40%. I handled the architecture, team coordination, and critical bug fixes during the final deployment phase. The solution reduced system downtime by 95% and increased customer satisfaction scores by 25%." 
    }
  ];

  return (
    <SignedIn>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Direct Gemini Analysis Test</h1>
          <p className="text-muted-foreground">
            Test the AI analysis system with different answer qualities and see the dynamic scoring in action.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Question:</label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter a question..."
                    className="min-h-[80px]"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Answer:</label>
                  <Textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button 
                  onClick={handleAnalyze} 
                  disabled={loading || !answer.trim()}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Answer"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Test Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testCases.map((testCase, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuestion(testCase.question);
                        setAnswer(testCase.answer);
                      }}
                      className="text-left justify-start h-auto p-3"
                    >
                      <div>
                        <div className="font-medium">{testCase.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {testCase.answer.length} characters
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                {analysis ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[600px]">
                      {analysis}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Enter an answer and click "Analyze Answer" to see the results.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </SignedIn>
  );
};

export default DirectAnalysisTest; 