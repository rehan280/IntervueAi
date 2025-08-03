import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Target, Star, Zap, Users, Shield, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const HowItWorks = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <img src="/logo.png" alt="IntervueAi Logo" className="w-6 h-4 sm:w-7 sm:h-5 md:w-8 md:h-6 lg:w-10 lg:h-7 object-contain" />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                IntervueAi
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/test" className="text-muted-foreground hover:text-foreground transition-colors">
                Test
              </Link>
            </nav>
            
            <div className="flex items-center gap-3">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground hidden md:block">
                    Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </div>
              ) : (
                <SignInButton>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Sign In
                  </Button>
                </SignInButton>
              )}
              <Link to="/">
                <Button variant="hero" size="sm">
                  Start Interview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How IntervueAi Works
          </h1>
          <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-primary">
            Train Smarter. Interview Better.
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI-powered system provides real-time interview evaluation and personalized feedback to help you excel in your job interviews.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-xl">1. Select Your Role</CardTitle>
              <CardDescription>
                Choose from various job roles including Software Engineer, Data Scientist, Product Manager, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our system adapts questions and evaluation criteria based on your selected role to provide relevant feedback.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-xl">2. Answer Questions</CardTitle>
              <CardDescription>
                Respond to AI-generated interview questions tailored to your role and experience level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each question is designed to assess your technical knowledge, problem-solving skills, and communication abilities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-xl">3. Get Instant Feedback</CardTitle>
              <CardDescription>
                Receive comprehensive evaluation with detailed scoring and actionable improvement suggestions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your answers across multiple criteria and provides personalized recommendations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Evaluation Criteria */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Evaluation Criteria</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
                <CardTitle className="text-lg">Correctness</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Evaluates factual accuracy, technical knowledge, and logical understanding of concepts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
                <CardTitle className="text-lg">Relevance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Assesses how well your answer directly addresses the question and stays on topic.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
                <CardTitle className="text-lg">Depth & Detail</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Measures the level of detail, examples provided, and thoroughness of your response.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <CardTitle className="text-lg">Communication</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Evaluates clarity, structure, and professional presentation of your ideas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced machine learning algorithms provide detailed, contextual feedback based on your specific answers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Role-Specific Questions</h3>
                  <p className="text-sm text-muted-foreground">
                    Questions tailored to your industry and position for relevant practice and evaluation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dynamic Scoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time scoring based on answer length, quality, and content with personalized feedback.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Privacy & Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Your interview responses are processed securely with enterprise-grade data protection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Detailed Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive performance metrics and improvement tracking across multiple interview sessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Instant Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Get immediate evaluation and actionable recommendations to improve your interview skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Technology</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">React 18</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Shadcn UI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">AI & APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">Google Gemini AI</Badge>
                  <Badge variant="secondary">REST APIs</Badge>
                  <Badge variant="secondary">Real-time Analysis</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="secondary">Vite</Badge>
                  <Badge variant="secondary">ESLint</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Git</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-border/50 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Ace Your Interview?</CardTitle>
              <CardDescription>
                Start practicing with our AI-powered interview coach and get personalized feedback to improve your skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Interview
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/test">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Test System
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks; 