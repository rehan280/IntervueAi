import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export interface CityHiringData {
  city: string;
  jobs: number;
  remoteFriendly: boolean;
}

interface HiringCitiesChartProps {
  data: CityHiringData[];
  role: string;
}

export const HiringCitiesChart: React.FC<HiringCitiesChartProps> = ({ data, role }) => {
  return (
    <div className="p-6 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Top Hiring Cities for {role}</h3>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis 
              dataKey="city" 
              type="category" 
              scale="band" 
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`${value} jobs`, 'Available Positions']}
              labelFormatter={(value) => `${value}${data.find(item => item.city === value)?.remoteFriendly ? ' (Remote Friendly)' : ''}`}
            />
            <Legend />
            <Bar 
              dataKey="jobs" 
              name="Available Jobs" 
              fill="#6366f1"
              radius={[0, 4, 4, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500 italic text-center">
        Cities marked with (Remote Friendly) have a significant number of remote positions available
      </div>
    </div>
  );
};