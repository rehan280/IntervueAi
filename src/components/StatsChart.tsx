import React from 'react';
import { IndustryStats } from '../services/insightsService';
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

interface StatsChartProps {
  data: IndustryStats[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  return (
    <div className="p-6 bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-foreground mb-4">Industry Trends (Last 6 Months)</h3>
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
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card)', 
                borderRadius: '8px',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
                color: 'var(--foreground)'
              }} 
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="aiMl"
              name="AI/ML"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="webDev"
              name="Web Dev"
              stroke="#82ca9d"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="mobile"
              name="Mobile"
              stroke="#ffc658"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="cloud"
              name="Cloud"
              stroke="#0088fe"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="cybersecurity"
              name="Cybersecurity"
              stroke="#ff8042"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};