import React from 'react';
import { BookOpen, Video, FileText, CheckCircle, ExternalLink } from 'lucide-react';

export interface PrepResource {
  id: string;
  title: string;
  type: 'course' | 'video' | 'article' | 'practice';
  link: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface RolePreparationCardProps {
  role: string;
  resources: PrepResource[];
}

export const RolePreparationCard: React.FC<RolePreparationCardProps> = ({ role, resources }) => {
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'course':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-600" />;
      case 'article':
        return <FileText className="h-4 w-4 text-purple-600" />;
      case 'practice':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-800/20 text-green-600';
      case 'intermediate':
        return 'bg-amber-800/20 text-amber-600';
      case 'advanced':
        return 'bg-red-800/20 text-red-600';
      default:
        return 'bg-gray-800/20 text-muted-foreground';
    }
  };

  return (
    <div className="p-6 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-foreground mb-4">Prepare for {role} Interviews</h3>
      
      <div className="space-y-4">
        {resources.map((resource) => (
          <div 
            key={resource.id} 
            className="p-4 border border-border rounded-lg hover:border-primary/20 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                {getResourceIcon(resource.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-semibold text-foreground">{resource.title}</h4>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground capitalize">{resource.type}</span>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 flex items-center"
                  >
                    View Resource <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};