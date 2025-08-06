import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export interface SkillTrendData {
  day: string;
  react: number;
  python: number;
  aws: number;
  typescript: number;
  kubernetes: number;
}

interface SkillTrendChartProps {
  data: SkillTrendData[];
}

export const SkillTrendChart: React.FC<SkillTrendChartProps> = ({ data }) => {
  return (
    <div className="p-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Skill Trends (Last 30 Days)</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="react"
              name="React"
              stroke="#61dafb"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="python"
              name="Python"
              stroke="#3776ab"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="aws"
              name="AWS"
              stroke="#ff9900"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="typescript"
              name="TypeScript"
              stroke="#007acc"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="kubernetes"
              name="Kubernetes"
              stroke="#326ce5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};