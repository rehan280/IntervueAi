import React from 'react';
import { Lightbulb, Star, TrendingUp } from 'lucide-react';

export interface AIAdvice {
  id: string;
  title: string;
  content: string;
  relatedRole: string;
  priority: 'high' | 'medium' | 'low';
}

interface AIAdviceCardProps {
  advice: AIAdvice;
}

export const AIAdviceCard: React.FC<AIAdviceCardProps> = ({ advice }) => {
  const getPriorityColor = () => {
    switch (advice.priority) {
      case 'high':
        return 'bg-red-950/20 border-red-800/30';
      case 'medium':
        return 'bg-amber-950/20 border-amber-800/30';
      case 'low':
        return 'bg-green-950/20 border-green-800/30';
      default:
        return 'bg-blue-950/20 border-blue-800/30';
    }
  };

  const getPriorityIcon = () => {
    switch (advice.priority) {
      case 'high':
        return <Star className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <Star className="h-5 w-5 text-amber-600" />;
      case 'low':
        return <Star className="h-5 w-5 text-green-600" />;
      default:
        return <Star className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-sm border ${getPriorityColor()} transition-all duration-300 hover:shadow-md bg-card/90 backdrop-blur-sm`}>
      <div className="flex items-start mb-4">
        <div className="mr-3">
          <Lightbulb className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{advice.title}</h3>
          <div className="flex items-center mt-1 text-sm">
            <TrendingUp className="h-4 w-4 text-indigo-500 mr-1" />
            <span className="text-indigo-600">Related to: {advice.relatedRole}</span>
          </div>
        </div>
        <div className="ml-auto">
          {getPriorityIcon()}
        </div>
      </div>
      
      <div className="pl-9">
        <p className="text-muted-foreground">{advice.content}</p>
      </div>
      
      <div className="mt-4 pl-9 flex justify-between items-center">
        <div className="flex items-center">
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${advice.priority === 'high' ? 'bg-red-950/30 text-red-600' : advice.priority === 'medium' ? 'bg-amber-950/30 text-amber-600' : 'bg-green-950/30 text-green-600'}`}>
            {advice.priority} priority
          </span>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
          Save for later
        </button>
      </div>
    </div>
  );
};