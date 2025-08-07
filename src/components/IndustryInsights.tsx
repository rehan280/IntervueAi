import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

// Sub-components
const JobRoleCard = ({ role, onSelect, isSelected }: { 
  role: JobRole; 
  onSelect: (role: JobRole) => void; 
  isSelected: boolean 
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
      onClick={() => onSelect(role)}
    >
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{role.title}</h3>
        <div className="text-sm text-muted-foreground mb-3">
          <p className="font-medium text-foreground">₹{(role.salary.min/100000).toFixed(1)} - {(role.salary.max/100000).toFixed(1)} LPA</p>
          <p className="flex items-center gap-1 mt-1">
            <TrendingUp className={`h-3 w-3 ${role.growth > 20 ? 'text-success' : role.growth > 10 ? 'text-warning' : 'text-muted-foreground'}`} />
            <span className={role.growth > 20 ? 'text-success' : role.growth > 10 ? 'text-warning' : 'text-muted-foreground'}>
              {role.growth}% growth
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {role.skills.slice(0, 3).map((skill, i) => (
            <Badge key={i} variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {skill}
            </Badge>
          ))}
          {role.skills.length > 3 && (
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              +{role.skills.length - 3}
            </Badge>
          )}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {role.openings} jobs
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {role.companies} companies
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const SkillsTable = ({ skills }: { skills: Skill[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Star className="h-5 w-5 text-primary" />
          Top In-Demand Skills
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Skills with highest growth and demand in the market
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Skill</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Growth</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Level</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Demand</th>
                <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Avg. Salary</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-2 px-3 text-sm font-medium text-foreground">{skill.name}</td>
                  <td className="py-2 px-3 text-sm">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-success">+{skill.growth}%</span>
                    </span>
                  </td>
                  <td className="py-2 px-3 text-sm">
                    <Badge variant="outline" className={
                      skill.level === 'Beginner' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      skill.level === 'Intermediate' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      skill.level === 'Advanced' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }>
                      {skill.level}
                    </Badge>
                  </td>
                  <td className="py-2 px-3 text-sm">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${skill.demand}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{skill.demand}%</span>
                  </td>
                  <td className="py-2 px-3 text-sm">₹{(skill.avgSalary/100000).toFixed(1)} LPA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const SkillTrendChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-5 w-5 text-primary" />
          Skill Growth Trends
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Year-over-year growth of top skills
        </p>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <TrendingUp className="h-16 w-16 mx-auto mb-4 text-primary/30" />
          <p>Skill trend visualization will appear here</p>
          <p className="text-sm">Data is being processed</p>
        </div>
      </CardContent>
    </Card>
  );
};

const HiringCitiesChart = ({ selectedRole }: { selectedRole: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <MapPin className="h-5 w-5 text-primary" />
          Top Hiring Cities
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Cities with most opportunities for {selectedRole}
        </p>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-16 w-16 mx-auto mb-4 text-primary/30" />
          <p>City distribution visualization will appear here</p>
          <p className="text-sm">Data is being processed</p>
        </div>
      </CardContent>
    </Card>
  );
};

const CareerPreparation = ({ selectedRole }: { selectedRole: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-primary" />
          Career Preparation for {selectedRole}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Resources and preparation tips for this role
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-foreground">Learning Resources</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Udemy Complete Web Development</li>
                <li>• FreeCodeCamp JavaScript Course</li>
                <li>• React Documentation</li>
                <li>• System Design Primer (GitHub)</li>
                <li>• LeetCode for DSA practice</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-foreground">Interview Preparation</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Technical interview questions</li>
                <li>• System design concepts</li>
                <li>• Behavioral question practice</li>
                <li>• Mock interviews</li>
                <li>• Portfolio preparation</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-foreground">Career Path</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Junior Developer (1-2 years)</li>
                <li>• Mid-level Developer (2-5 years)</li>
                <li>• Senior Developer (5-8 years)</li>
                <li>• Tech Lead / Architect (8+ years)</li>
                <li>• Engineering Manager path</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

const NewsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Newspaper className="h-5 w-5 text-primary" />
          Industry News
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest updates from tech industry
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-b border-border pb-3">
          <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">Trending</Badge>
          <h4 className="font-medium text-foreground mb-1">Indian IT Sector Expected to Grow 9.2% in FY24</h4>
          <p className="text-sm text-muted-foreground">NASSCOM reports positive outlook despite global economic challenges</p>
          <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
        </div>
        
        <div className="border-b border-border pb-3">
          <h4 className="font-medium text-foreground mb-1">Startups in Tier 2 Cities See 34% Funding Increase</h4>
          <p className="text-sm text-muted-foreground">Investors looking beyond metro tech hubs</p>
          <p className="text-xs text-muted-foreground mt-1">5 days ago</p>
        </div>
        
        <div className="border-b border-border pb-3">
          <h4 className="font-medium text-foreground mb-1">Remote Work Policies Evolving in Tech Companies</h4>
          <p className="text-sm text-muted-foreground">Hybrid models becoming the new standard</p>
          <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
        </div>
        
        <div>
          <h4 className="font-medium text-foreground mb-1">AI Skills Gap Widens as Demand Surges</h4>
          <p className="text-sm text-muted-foreground">Companies struggling to find qualified AI engineers</p>
          <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
        </div>
      </CardContent>
    </Card>
  );
};

const AIAdviceCards = ({ selectedRole }: { selectedRole: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-primary" />
          AI Career Advice
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized guidance for {selectedRole}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                Growth Opportunities
              </h4>
              <p className="text-sm text-muted-foreground">
                Focus on cloud technologies and microservices architecture to maximize your career growth as a {selectedRole}. Companies are increasingly looking for these skills.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Interview Tips
              </h4>
              <p className="text-sm text-muted-foreground">
                Prepare for system design questions and be ready to discuss your experience with scalable applications. Most {selectedRole} interviews now include practical coding exercises.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 text-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-warning" />
                Salary Negotiation
              </h4>
              <p className="text-sm text-muted-foreground">
                The current market rate for {selectedRole}s with 3-5 years experience is ₹18-25 LPA in major tech hubs. Don't hesitate to negotiate based on your specific skill set.
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

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
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Flag className="h-8 w-8 text-indigo-500" />
            <h1 className="text-4xl font-bold text-white">Industry Insights</h1>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              India Edition
            </Badge>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive analysis of Indian tech job market with real-time insights, 
            skill demands, and career guidance powered by AI
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Briefcase className="h-6 w-6 text-indigo-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{totalJobs.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Open Positions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-500">+{avgGrowth.toFixed(1)}%</p>
                <p className="text-sm text-gray-400">Avg Growth</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{totalCompanies}+</p>
                <p className="text-sm text-gray-400">Hiring Companies</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{skills.length}</p>
                <p className="text-sm text-gray-400">Top Skills</p>
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5 text-indigo-500" />
                  Top In-Demand Tech Roles
                </CardTitle>
                <p className="text-sm text-gray-400">
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
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500/20">
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Ready to Level Up Your Career?</h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Get personalized career roadmaps, skill assessments, and job matching 
              based on Indian market trends and your profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Create Career Plan
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white/10">
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