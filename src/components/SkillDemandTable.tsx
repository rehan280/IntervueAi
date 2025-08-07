import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface SkillDemand {
  id: string;
  name: string;
  growthPercentage: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  trend: 'rising' | 'stable' | 'declining';
}

interface SkillDemandTableProps {
  skills: SkillDemand[];
}

export const SkillDemandTable: React.FC<SkillDemandTableProps> = ({ skills }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100/20 text-blue-500';
      case 'Intermediate':
        return 'bg-green-100/20 text-green-500';
      case 'Advanced':
        return 'bg-purple-100/20 text-purple-500';
      case 'Expert':
        return 'bg-red-100/20 text-red-500';
      default:
        return 'bg-gray-100/20 text-gray-500';
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card/90 backdrop-blur-sm shadow-sm p-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Skill Demand</h3>
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Skill
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Growth %
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Level
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Trend
            </th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {skills.map((skill) => (
            <tr key={skill.id} className="hover:bg-muted/20 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                {skill.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                {skill.growthPercentage}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground flex items-center">
                {getTrendIcon(skill.trend)}
                <span className="ml-1 capitalize">{skill.trend}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};