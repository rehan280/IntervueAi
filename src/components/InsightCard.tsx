import React from 'react';
import { IndustryInsight } from '../services/insightsService';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface InsightCardProps {
  insight: IndustryInsight;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getTrendIcon = () => {
    switch (insight.trend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getTrendColor = () => {
    switch (insight.trend) {
      case 'rising':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'declining':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <div className="group p-6 bg-card/90 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg rounded-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 text-xs font-medium bg-muted/50 rounded-full text-foreground">
              {insight.category}
            </span>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getTrendColor()}`}>
                {insight.trend}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {insight.title}
          </h3>
        </div>
        {insight.percentage && (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-sm">
            {insight.percentage}%
          </div>
        )}
        {insight.rank && (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-sm">
            #{insight.rank}
          </div>
        )}
      </div>
      <p className="text-muted-foreground">
        {insight.description}
      </p>
    </div>
  );
};