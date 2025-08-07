import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from '@/components/Dashboard';
import ChatInterface from '@/components/ChatInterface';
import ModelAnalytics from '@/components/ModelAnalytics';
import { 
  BarChart3, 
  MessageSquare, 
  Settings, 
  Brain,
  Github,
  ExternalLink,
  BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bg.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-12 w-12 text-primary animate-pulse-glow" />
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                DeepSeek Insights
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced AI analytics dashboard powered by gpt4free. Monitor, analyze, and interact with multiple AI models in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="default" 
                size="lg"
                onClick={() => setActiveTab('chat')}
                className="animate-slide-up"
              >
                <MessageSquare className="h-5 w-5" />
                Start Chatting
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setActiveTab('analytics')}
                className="animate-slide-up"
                style={{ animationDelay: '0.1s' }}
              >
                <BarChart3 className="h-5 w-5" />
                View Analytics
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>12+ AI Models Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>Real-time Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-info rounded-full animate-pulse"></div>
                <span>100% Free Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span>Industry Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <TabsList className="grid w-full sm:w-auto grid-cols-4 bg-card border border-border">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Industry
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/industry-insights" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Industry Insights
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://github.com/xtekky/gpt4free" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GPT4Free
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>

          <TabsContent value="dashboard" className="space-y-6 animate-slide-up">
            <Dashboard />
          </TabsContent>

          <TabsContent value="chat" className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChatInterface />
              </div>
              <div className="space-y-4">
                <Card className="p-4 bg-card border-border">
                  <h3 className="font-semibold text-foreground mb-2">Available Models</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">DeepSeek-R1</span>
                      <span className="text-success">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">GPT-4o Mini</span>
                      <span className="text-success">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Claude-3</span>
                      <span className="text-success">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Gemini Pro</span>
                      <span className="text-warning">Limited</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-card border-border">
                  <h3 className="font-semibold text-foreground mb-2">Quick Tips</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Try different models for varied responses</p>
                    <p>• Use specific prompts for better results</p>
                    <p>• All models are free through gpt4free</p>
                    <p>• Copy responses using the copy button</p>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6 animate-slide-up">
            <div className="text-center p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Industry Insights</h3>
              <p className="text-muted-foreground mb-6">
                Discover comprehensive job market analytics and career insights for the Indian tech industry.
              </p>
              <Button asChild size="lg">
                <Link to="/industry-insights" className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Explore Industry Insights
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Brain className="h-4 w-4 text-primary" />
              <span>DeepSeek Insights - Powered by gpt4free</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a 
                href="https://github.com/xtekky/gpt4free" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <Github className="h-3 w-3" />
                GitHub
              </a>
              <span>•</span>
              <span>Free AI Access</span>
              <span>•</span>
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;