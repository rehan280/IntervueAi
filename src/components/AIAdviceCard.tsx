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
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getPriorityIcon = () => {
    switch (advice.priority) {
      case 'high':
        return <Star className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Star className="h-5 w-5 text-green-500" />;
      default:
        return <Star className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-sm border ${getPriorityColor()} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start mb-4">
        <div className="mr-3">
          <Lightbulb className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{advice.title}</h3>
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
        <p className="text-gray-700">{advice.content}</p>
      </div>
      
      <div className="mt-4 pl-9 flex justify-between items-center">
        <div className="flex items-center">
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${advice.priority === 'high' ? 'bg-red-100 text-red-800' : advice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
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