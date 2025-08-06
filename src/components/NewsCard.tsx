import React from 'react';
import { NewsItem } from '../services/insightsService';
import { Calendar, ExternalLink } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const getImpactColor = () => {
    switch (news.impact) {
      case 'high':
        return 'bg-red-500/20 text-red-600 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-600 border-green-500/30';
      default:
        return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
    }
  };

  return (
    <div className="p-6 bg-card/90 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-1 text-xs font-medium bg-muted/50 rounded-full text-foreground">
          {news.category}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getImpactColor()}`}>
          {news.impact} impact
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition-colors">
        {news.title}
      </h3>
      
      <p className="text-muted-foreground mb-4">
        {news.summary}
      </p>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{news.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Source: {news.source}</span>
          <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};