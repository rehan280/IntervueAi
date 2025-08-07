import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Newspaper, 
  Clock, 
  ExternalLink, 
  TrendingUp, 
  RefreshCw,
  Zap,
  Building2,
  Users
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  category: 'hiring' | 'startup' | 'funding' | 'layoffs' | 'skills' | 'policy';
  url: string;
  impact: 'high' | 'medium' | 'low';
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock news data for Indian tech job market
  const generateMockNews = (): NewsItem[] => {
    return [
      {
        id: '1',
        title: 'Tata Consultancy Services to Hire 40,000 Freshers in FY24',
        summary: 'TCS announces massive hiring drive focusing on AI, cloud computing, and digital transformation roles across India.',
        source: 'Economic Times',
        publishedAt: '2 hours ago',
        category: 'hiring',
        url: '#',
        impact: 'high'
      },
      {
        id: '2',
        title: 'Flipkart Announces New AI Center in Bengaluru',
        summary: 'E-commerce giant to invest ₹500 crores in AI research, creating 2,000 new tech jobs in machine learning and data science.',
        source: 'The Hindu BusinessLine',
        publishedAt: '4 hours ago',
        category: 'startup',
        url: '#',
        impact: 'high'
      },
      {
        id: '3',
        title: 'Government Launches Skill India Digital Platform',
        summary: 'New initiative aims to upskill 10 million Indians in emerging technologies like AI, blockchain, and cloud computing.',
        source: 'PIB India',
        publishedAt: '6 hours ago',
        category: 'policy',
        url: '#',
        impact: 'medium'
      },
      {
        id: '4',
        title: 'Paytm Cuts 1,000 Jobs in Cost Optimization Drive',
        summary: 'Fintech company restructures teams amid regulatory challenges, affecting primarily junior and mid-level positions.',
        source: 'Moneycontrol',
        publishedAt: '8 hours ago',
        category: 'layoffs',
        url: '#',
        impact: 'medium'
      },
      {
        id: '5',
        title: 'Zerodha Founder Calls for Better Coding Education',
        summary: 'Nithin Kamath emphasizes need for practical programming skills over theoretical computer science in Indian engineering.',
        source: 'Inc42',
        publishedAt: '12 hours ago',
        category: 'skills',
        url: '#',
        impact: 'low'
      },
      {
        id: '6',
        title: 'Byju\'s Raises $250M, Plans to Hire 5,000 Engineers',
        summary: 'Edtech unicorn secures funding to expand its engineering teams across product development and AI initiatives.',
        source: 'YourStory',
        publishedAt: '1 day ago',
        category: 'funding',
        url: '#',
        impact: 'high'
      },
      {
        id: '7',
        title: 'Infosys Introduces New AI Training Program',
        summary: 'IT giant launches comprehensive AI and machine learning certification program for its 300,000+ employees.',
        source: 'BusinessToday',
        publishedAt: '1 day ago',
        category: 'skills',
        url: '#',
        impact: 'medium'
      },
      {
        id: '8',
        title: 'Nykaa Tech Team Expands to Tier-2 Cities',
        summary: 'Beauty e-commerce platform opens engineering centers in Pune and Hyderabad, creating 1,500 new opportunities.',
        source: 'VCCircle',
        publishedAt: '2 days ago',
        category: 'hiring',
        url: '#',
        impact: 'medium'
      }
    ];
  };

  const refreshNews = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setNews(generateMockNews());
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    refreshNews();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hiring':
        return <Users className="h-3 w-3" />;
      case 'startup':
        return <Building2 className="h-3 w-3" />;
      case 'funding':
        return <TrendingUp className="h-3 w-3" />;
      case 'layoffs':
        return <Users className="h-3 w-3" />;
      case 'skills':
        return <Zap className="h-3 w-3" />;
      case 'policy':
        return <Newspaper className="h-3 w-3" />;
      default:
        return <Newspaper className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hiring':
        return 'bg-success/10 text-success border-success/20';
      case 'startup':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'funding':
        return 'bg-info/10 text-info border-info/20';
      case 'layoffs':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'skills':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'policy':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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

  const filteredNews = {
    hiring: news.filter(item => item.category === 'hiring'),
    trending: news.filter(item => item.impact === 'high'),
    recent: news.slice(0, 5)
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Newspaper className="h-5 w-5 text-primary" />
            Live Industry News
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" />
              Updated {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshNews}
              disabled={isLoading}
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Real-time updates on Indian tech job market, hiring trends, and industry developments
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-success/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Hiring News</p>
              <p className="text-lg font-bold text-success">{filteredNews.hiring.length}</p>
            </div>
            <div className="text-center bg-destructive/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">High Impact</p>
              <p className="text-lg font-bold text-destructive">{filteredNews.trending.length}</p>
            </div>
            <div className="text-center bg-primary/5 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Total Updates</p>
              <p className="text-lg font-bold text-foreground">{news.length}</p>
            </div>
          </div>

          {/* News Feed */}
          <ScrollArea className="h-96">
            <div className="space-y-4 pr-4">
              {news.map((item) => (
                <Card key={item.id} className="bg-accent/20 border-border hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(item.category)}>
                            {getCategoryIcon(item.category)}
                            {item.category}
                          </Badge>
                          <Badge className={getImpactColor(item.impact)}>
                            {item.impact} impact
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.publishedAt}</span>
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.summary}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs text-muted-foreground font-medium">
                          {item.source}
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Trending
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Hiring Alerts
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              <Newspaper className="h-4 w-4 mr-2" />
              All News
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}