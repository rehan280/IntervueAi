import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Target, Star, Zap, Users, Shield, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HowItWorks = () => {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How IntervueAi Works
            </h1>
            <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-blue-400">
              Train Smarter. Interview Better.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Our advanced AI-powered system provides real-time interview evaluation and personalized feedback to help you excel in your job interviews.
            </p>
          </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">1. Select Your Role</h3>
            <p className="text-gray-300 mb-4">
              Choose from various job roles including Software Engineer, Data Scientist, Product Manager, and more.
            </p>
            <p className="text-sm text-gray-400">
              Our system adapts questions and evaluation criteria based on your selected role to provide relevant feedback.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-700/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">2. Answer Questions</h3>
            <p className="text-gray-300 mb-4">
              Respond to AI-generated interview questions tailored to your role and experience level.
            </p>
            <p className="text-sm text-gray-400">
              Each question is designed to assess your technical knowledge, problem-solving skills, and communication abilities.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg group">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">3. Get Instant Feedback</h3>
            <p className="text-gray-300 mb-4">
              Receive comprehensive evaluation with detailed scoring and actionable improvement suggestions.
            </p>
            <p className="text-sm text-gray-400">
              Our AI analyzes your answers across multiple criteria and provides personalized recommendations.
            </p>
          </div>
        </div>

        {/* Evaluation Criteria */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Evaluation Criteria</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Correctness</h3>
              <p className="text-sm text-gray-400">
                Evaluates factual accuracy, technical knowledge, and logical understanding of concepts.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-700/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Relevance</h3>
              <p className="text-sm text-gray-400">
                Assesses how well your answer directly addresses the question and stays on topic.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Depth & Detail</h3>
              <p className="text-sm text-gray-400">
                Measures the level of detail, examples provided, and thoroughness of your response.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-700/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Communication</h3>
              <p className="text-sm text-gray-400">
                Evaluates clarity, structure, and professional presentation of your ideas.
              </p>
            </div>
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
                  <Button size="lg" className="w-full sm:w-auto whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="truncate">Start Interview</span>
                    <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                  </Button>
                </Link>
                <Link to="/test">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="truncate">Test System</span>
                    <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks; 