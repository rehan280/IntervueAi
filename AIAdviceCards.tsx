import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users, 
  MapPin,
  IndianRupee,
  RefreshCw,
  Lightbulb,
  Star
} from 'lucide-react';

interface AdviceCard {
  id: string;
  title: string;
  content: string;
  type: 'career' | 'skill' | 'salary' | 'location' | 'trending';
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  relatedRole?: string;
}

interface AIAdviceCardsProps {
  selectedRole: string;
}

export default function AIAdviceCards({ selectedRole }: AIAdviceCardsProps) {
  const [advice, setAdvice] = useState<AdviceCard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate AI advice based on selected role and current trends
  const generateAdvice = (role: string): AdviceCard[] => {
    const adviceDatabase = {
      'Full Stack Developer': [
        {
          id: '1',
          title: 'Master TypeScript for 2024',
          content: 'TypeScript adoption in Indian startups has increased by 67%. Companies like Razorpay and Freshworks are prioritizing TS skills. Consider getting certified through Microsoft Learn.',
          type: 'skill' as const,
          priority: 'high' as const,
          actionable: true,
          relatedRole: 'Full Stack Developer'
        },
        {
          id: '2',
          title: 'Bangalore vs Pune Salary Trends',
          content: 'Full stack developers in Pune now earn 85% of Bangalore salaries but with 40% lower living costs. Consider relocating for better work-life balance and savings.',
          type: 'location' as const,
          priority: 'medium' as const,
          actionable: true,
          relatedRole: 'Full Stack Developer'
        },
        {
          id: '3',
          title: 'Next.js 14 in High Demand',
          content: 'Indian companies using Next.js report 23% faster development cycles. Swiggy, Zomato hiring extensively for Next.js expertise. Server components knowledge crucial.',
          type: 'trending' as const,
          priority: 'high' as const,
          actionable: true,
          relatedRole: 'Full Stack Developer'
        },
        {
          id: '4',
          title: 'Negotiate Based on Stock Options',
          content: 'Indian startups offering 0.1-0.5% equity to senior full stack developers. Focus on companies with recent funding rounds. Understand vesting schedules.',
          type: 'salary' as const,
          priority: 'medium' as const,
          actionable: true,
          relatedRole: 'Full Stack Developer'
        }
      ],
      'Data Scientist': [
        {
          id: '1',
          title: 'MLOps Skills Pay 40% More',
          content: 'Data scientists with MLOps expertise earn ₹18-25L vs ₹12-18L without. Indian fintech companies like PhonePe, Paytm actively hiring MLOps specialists.',
          type: 'skill' as const,
          priority: 'high' as const,
          actionable: true,
          relatedRole: 'Data Scientist'
        },
        {
          id: '2',
          title: 'Banking Sector Boom',
          content: 'HDFC, ICICI, SBI digital initiatives creating 3000+ data science roles. Focus on regulatory compliance, risk modeling, and customer analytics.',
          type: 'career' as const,
          priority: 'high' as const,
          actionable: true,
          relatedRole: 'Data Scientist'
        },
        {
          id: '3',
          title: 'Hyderabad Emerging as DS Hub',
          content: 'Microsoft, Amazon, Google expanding data science teams in Hyderabad. 28% growth in DS jobs, competitive with Bangalore but better quality of life.',
          type: 'location' as const,
          priority: 'medium' as const,
          actionable: true,
          relatedRole: 'Data Scientist'
        },
        {
          id: '4',
          title: 'GenAI Integration Mandatory',
          content: 'Companies expect data scientists to integrate GPT APIs, LangChain in solutions. 89% of job postings mention LLM experience as preferred skill.',
          type: 'trending' as const,
          priority: 'high' as const,
          actionable: true,
          relatedRole: 'Data Scientist'
        }
      ]
    };

    return adviceDatabase[role as keyof typeof adviceDatabase] || adviceDatabase['Full Stack Developer'];
  };

  const refreshAdvice = async () => {
    setIsGenerating(true);
    // Simulate AI generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAdvice(generateAdvice(selectedRole));
    setIsGenerating(false);
  };

  useEffect(() => {
    refreshAdvice();
  }, [selectedRole]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'career':
        return <Target className="h-4 w-4 text-primary" />;
      case 'skill':
        return <BookOpen className="h-4 w-4 text-success" />;
      case 'salary':
        return <IndianRupee className="h-4 w-4 text-warning" />;
      case 'location':
        return <MapPin className="h-4 w-4 text-info" />;
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-destructive" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'career':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'skill':
        return 'bg-success/10 text-success border-success/20';
      case 'salary':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'location':
        return 'bg-info/10 text-info border-info/20';
      case 'trending':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const highPriorityAdvice = advice.filter(a => a.priority === 'high');
  const actionableAdvice = advice.filter(a => a.actionable);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            AI Career Insights
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {selectedRole}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshAdvice}
              disabled={isGenerating}
            >
              <RefreshCw className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Personalized career advice powered by AI analysis of Indian job market trends
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-destructive/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">High Priority</p>
              <p className="text-lg font-bold text-destructive">{highPriorityAdvice.length}</p>
            </div>
            <div className="text-center bg-success/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Actionable</p>
              <p className="text-lg font-bold text-success">{actionableAdvice.length}</p>
            </div>
            <div className="text-center bg-primary/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Total Insights</p>
              <p className="text-lg font-bold text-foreground">{advice.length}</p>
            </div>
          </div>

          {/* AI Advice Cards */}
          {isGenerating ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-accent/20 border-border animate-pulse">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {advice.map((item) => (
                <Card key={item.id} className="bg-accent/20 border-border hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(item.type)}>
                            {getTypeIcon(item.type)}
                            {item.type}
                          </Badge>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority}
                          </Badge>
                          {item.actionable && (
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              <Star className="h-3 w-3 mr-1" />
                              Actionable
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.content}
                        </p>
                      </div>

                      {/* Actions */}
                      {item.actionable && (
                        <div className="flex gap-2 pt-2 border-t border-border">
                          <Button variant="outline" size="sm">
                            <Users className="h-3 w-3 mr-1" />
                            Learn More
                          </Button>
                          <Button variant="outline" size="sm">
                            <BookOpen className="h-3 w-3 mr-1" />
                            Take Action
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-4 border-t border-border">
            <Button className="w-full" variant="default">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate More Insights
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}