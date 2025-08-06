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

export const JobRolesCard: React.FC<JobRolesCardProps> = ({ role }) => {
  return (
    <div className="p-6 bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg rounded-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors mb-2">
            {role.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full flex items-center">
              <Award className="h-4 w-4 mr-1" />
              {role.growthPercentage}% Growth
            </span>
            <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {role.salary}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
        <div className="flex flex-wrap gap-2">
          {role.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-indigo-100 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};