import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JobRoleCard from '@/components/IndustryInsights/JobRoleCard';
import SkillsTable from '@/components/IndustryInsights/SkillsTable';
import SkillTrendChart from '@/components/IndustryInsights/SkillTrendChart';
import HiringCitiesChart from '@/components/IndustryInsights/HiringCitiesChart';
import CareerPreparation from '@/components/IndustryInsights/CareerPreparation';
import NewsSection from '@/components/IndustryInsights/NewsSection';
import AIAdviceCards from '@/components/IndustryInsights/AIAdviceCards';
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  BookOpen, 
  Newspaper,
  Brain,
  Flag,
  Briefcase,
  Star
} from 'lucide-react';

interface JobRole {
  id: string;
  title: string;
  salary: {
    min: number;
    max: number;
  };
  growth: number;
  skills: string[];
  companies: number;
  openings: number;
  location: string[];
  experience: string;
}

interface Skill {
  name: string;
  growth: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  demand: number;
  avgSalary: number;
  trend: 'up' | 'down' | 'stable';
}

export default function IndustryInsights() {
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);

  // Mock data for Indian tech job market
  const jobRoles: JobRole[] = [
    {
      id: '1',
      title: 'Full Stack Developer',
      salary: { min: 800000, max: 2500000 },
      growth: 18.5,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      companies: 245,
      openings: 3420,
      location: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai'],
      experience: '2-5 years'
    },
    {
      id: '2',
      title: 'Data Scientist',
      salary: { min: 1200000, max: 3500000 },
      growth: 24.3,
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'AWS'],
      companies: 167,
      openings: 1820,
      location: ['Bangalore', 'Mumbai', 'Hyderabad', 'Pune'],
      experience: '3-6 years'
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      salary: { min: 1000000, max: 2800000 },
      growth: 22.7,
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform'],
      companies: 198,
      openings: 2150,
      location: ['Bangalore', 'Mumbai', 'Chennai', 'Delhi NCR'],
      experience: '2-5 years'
    },
    {
      id: '4',
      title: 'Frontend Developer',
      salary: { min: 600000, max: 2000000 },
      growth: 16.2,
      skills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind'],
      companies: 289,
      openings: 4230,
      location: ['Bangalore', 'Pune', 'Hyderabad', 'Mumbai'],
      experience: '1-4 years'
    },
    {
      id: '5',
      title: 'Backend Developer',
      salary: { min: 700000, max: 2300000 },
      growth: 19.1,
      skills: ['Java', 'Spring Boot', 'Python', 'PostgreSQL', 'Redis'],
      companies: 267,
      openings: 3890,
      location: ['Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
      experience: '2-5 years'
    },
    {
      id: '6',
      title: 'Mobile Developer',
      salary: { min: 800000, max: 2600000 },
      growth: 15.8,
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      companies: 156,
      openings: 1650,
      location: ['Bangalore', 'Mumbai', 'Pune', 'Delhi NCR'],
      experience: '2-5 years'
    }
  ];

  const skills: Skill[] = [
    { name: 'React.js', growth: 12.5, level: 'Intermediate', demand: 92, avgSalary: 1400000, trend: 'up' },
    { name: 'Python', growth: 15.2, level: 'Beginner', demand: 89, avgSalary: 1600000, trend: 'up' },
    { name: 'AWS', growth: 18.9, level: 'Advanced', demand: 85, avgSalary: 1800000, trend: 'up' },
    { name: 'Docker', growth: 22.3, level: 'Intermediate', demand: 78, avgSalary: 1550000, trend: 'up' },
    { name: 'Node.js', growth: 8.7, level: 'Intermediate', demand: 82, avgSalary: 1350000, trend: 'up' },
    { name: 'TypeScript', growth: 25.1, level: 'Advanced', demand: 75, avgSalary: 1650000, trend: 'up' },
    { name: 'Kubernetes', growth: 28.4, level: 'Expert', demand: 68, avgSalary: 2100000, trend: 'up' },
    { name: 'TensorFlow', growth: 19.6, level: 'Advanced', demand: 71, avgSalary: 1950000, trend: 'up' },
    { name: 'Flutter', growth: 31.2, level: 'Intermediate', demand: 65, avgSalary: 1450000, trend: 'up' },
    { name: 'GraphQL', growth: 16.8, level: 'Advanced', demand: 58, avgSalary: 1720000, trend: 'up' }
  ];

  const handleRoleSelect = (role: JobRole) => {
    setSelectedRole(role);
  };

  // Calculate summary stats
  const totalJobs = jobRoles.reduce((acc, role) => acc + role.openings, 0);
  const avgGrowth = jobRoles.reduce((acc, role) => acc + role.growth, 0) / jobRoles.length;
  const totalCompanies = jobRoles.reduce((acc, role) => acc + role.companies, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Flag className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Industry Insights</h1>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              India Edition
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis of Indian tech job market with real-time insights, 
            skill demands, and career guidance powered by AI
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Briefcase className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{totalJobs.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Open Positions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-success">+{avgGrowth.toFixed(1)}%</p>
                <p className="text-sm text-muted-foreground">Avg Growth</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-info mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{totalCompanies}+</p>
                <p className="text-sm text-muted-foreground">Hiring Companies</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{skills.length}</p>
                <p className="text-sm text-muted-foreground">Top Skills</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - News */}
          <div className="lg:col-span-1">
            <NewsSection />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top In-Demand Roles */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Top In-Demand Tech Roles
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  High-growth opportunities in Indian tech ecosystem
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobRoles.map((role) => (
                    <JobRoleCard
                      key={role.id}
                      role={role}
                      onSelect={handleRoleSelect}
                      isSelected={selectedRole?.id === role.id}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills and Trends Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SkillsTable skills={skills} />
              <SkillTrendChart />
            </div>

            {/* Cities and AI Advice Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <HiringCitiesChart selectedRole={selectedRole?.title || 'Full Stack Developer'} />
              <AIAdviceCards selectedRole={selectedRole?.title || 'Full Stack Developer'} />
            </div>

            {/* Career Preparation */}
            <CareerPreparation selectedRole={selectedRole?.title || 'Full Stack Developer'} />
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="bg-gradient-primary text-primary-foreground border-primary/20">
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Ready to Level Up Your Career?</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Get personalized career roadmaps, skill assessments, and job matching 
              based on Indian market trends and your profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Create Career Plan
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}