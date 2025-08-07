import React from 'react';
import { Award } from 'lucide-react';

export interface JobRole {
  id: string;
  title: string;
  salary: string;
  growthPercentage: number;
  skills: string[];
}

interface JobRolesCardProps {
  role: JobRole;
}

export const JobRolesCard: React.FC<JobRolesCardProps> = ({ role, onClick }) => {
  return (
    <div 
      className="p-6 bg-card/90 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg rounded-lg cursor-pointer"
      onClick={() => onClick && onClick(role.title)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {role.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-sm font-medium bg-green-950 text-green-300 rounded-full flex items-center">
              <Award className="h-4 w-4 mr-1" />
              {role.growthPercentage}% Growth
            </span>
            <span className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary-foreground rounded-full">
              {role.salary}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {role.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-primary/20 hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};