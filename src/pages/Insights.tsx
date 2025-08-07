import React, { useState, useEffect } from 'react';
import axios from 'axios';
import industriesData from '../data/industries';
import { InsightCard } from '../components/InsightCard';
import { NewsCard } from '../components/NewsCard';
import { StatsChart } from '../components/StatsChart';
import { insightsService, IndustryInsight, NewsItem, IndustryStats } from '../services/insightsService';
import { Loader2, TrendingUp, Sparkles, RefreshCw, Newspaper, BarChart3, Target, Briefcase, LineChart, MapPin, BookOpen, Lightbulb, Globe } from 'lucide-react';

// Import new components
import { JobRolesCard, JobRole } from '../components/JobRolesCard';
import { SkillDemandTable, SkillDemand } from '../components/SkillDemandTable';
import { SkillTrendChart, SkillTrendData } from '../components/SkillTrendChart';
import { HiringCitiesChart, CityHiringData } from '../components/HiringCitiesChart';
import { RolePreparationCard, PrepResource } from '../components/RolePreparationCard';
import { AIAdviceCard, AIAdvice } from '../components/AIAdviceCard';
import { techInsightsService } from '../services/techInsightsService';
import { indiaInsightsService } from '../services/indiaInsightsService';

const Insights: React.FC = () => {
  // Original state for the simple insights form
  const [industry, setIndustry] = useState('');
  const [subIndustry, setSubIndustry] = useState('');
  const [insight, setInsight] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  
  // New state for the advanced insights dashboard
  const [insights, setInsights] = useState<IndustryInsight[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [stats, setStats] = useState<IndustryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'custom'
  
  // State for new industry insights sections
  const [jobRoles, setJobRoles] = useState<JobRole[]>([]);
  const [skillDemand, setSkillDemand] = useState<SkillDemand[]>([]);
  const [skillTrends, setSkillTrends] = useState<SkillTrendData[]>([]);
  const [selectedRole, setSelectedRole] = useState('AI/ML Engineer');
  const [hiringCities, setHiringCities] = useState<CityHiringData[]>([]);
  const [prepResources, setPrepResources] = useState<PrepResource[]>([]);
  const [aiAdvice, setAiAdvice] = useState<AIAdvice[]>([]);
  
  // Country selection state
  const [selectedCountry, setSelectedCountry] = useState('global'); // 'global' or 'india'

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndustry(e.target.value);
    setSubIndustry('');
    setInsight('');
    setError('');
  };

  const handleSubIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubIndustry(e.target.value);
    setInsight('');
    setError('');
  };

  const handleFetchInsight = async () => {
    setFormLoading(true);
    setInsight('');
    setError('');
    try {
      // Use axios to call the Gemini API
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!API_KEY) {
        throw new Error('Gemini API key not found in environment variables');
      }
      
      try {
        const prompt = `Give me a detailed, up-to-date, and actionable industry insight for the following industry: ${industry}${subIndustry ? `, specifically in the sub-industry: ${subIndustry}` : ''}. Include current trends, challenges, opportunities, and future outlook.`;
        
        // Using axios to call the Gemini API directly
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            contents: [
              {
                parts: [
                  { text: prompt }
                ]
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) {
          throw new Error('No valid response received from AI');
        }
        
        setInsight(text);
      } catch (apiError: any) {
        console.error('Gemini API error:', apiError);
        
        // Provide a fallback response for demo purposes
        const fallbackInsight = `# ${industry} Industry Insights${subIndustry ? ` - ${subIndustry}` : ''}\n\n` +
          `## Current Trends\n\n` +
          `The ${industry} industry${subIndustry ? `, particularly in ${subIndustry},` : ''} is experiencing significant growth and transformation. ` +
          `Companies are investing heavily in digital technologies to improve efficiency and customer experience. ` +
          `There's a growing emphasis on sustainability and ethical practices.\n\n` +
          `## Challenges\n\n` +
          `Organizations face increasing regulatory scrutiny and compliance requirements. ` +
          `Talent acquisition and retention remain difficult in a competitive market. ` +
          `Cybersecurity threats continue to evolve and pose significant risks.\n\n` +
          `## Opportunities\n\n` +
          `AI and machine learning offer opportunities for automation and data-driven decision making. ` +
          `Remote work has expanded the available talent pool beyond geographical limitations. ` +
          `New markets are emerging as digital transformation accelerates globally.\n\n` +
          `## Future Outlook\n\n` +
          `The ${industry} sector is projected to grow at 15-20% annually over the next five years. ` +
          `Companies that embrace innovation and agility will likely outperform competitors. ` +
          `Strategic partnerships and ecosystem collaboration will become increasingly important for success.`;
        
        setInsight(fallbackInsight);
        setError('Note: Using offline mode due to API connectivity issues. This is simulated content for demonstration purposes.');
      }
    } catch (err: any) {
      console.error('Error in insight generation process:', err);
      setError(err.message || 'Failed to generate insight. Please try again later.');
    } finally {
      setFormLoading(false);
    }
  };

  const fetchAllData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Determine which service to use based on selected country
      const service = selectedCountry === 'india' ? indiaInsightsService : insightsService;
      const techService = selectedCountry === 'india' ? indiaInsightsService : techInsightsService;

      // Fetch all data in parallel
      const [insightsData, newsData, statsData] = await Promise.all([
        selectedCountry === 'india' 
          ? indiaInsightsService.getIndiaIndustryInsights() 
          : insightsService.getIndustryInsights(),
        selectedCountry === 'india' 
          ? indiaInsightsService.getIndiaLatestNews() 
          : insightsService.getLatestNews(),
        selectedCountry === 'india' 
          ? indiaInsightsService.getIndiaIndustryStats() 
          : insightsService.getIndustryStats()
      ]);

      setInsights(insightsData);
      setNews(newsData);
      setStats(statsData);
      
      // Fetch data for new sections based on selected country
      const jobRolesData = selectedCountry === 'india' 
        ? indiaInsightsService.getIndiaTopJobRoles() 
        : techInsightsService.getTopJobRoles();
        
      const skillDemandData = selectedCountry === 'india' 
        ? indiaInsightsService.getIndiaSkillDemand() 
        : techInsightsService.getSkillDemand();
        
      const skillTrendsData = selectedCountry === 'india' 
        ? indiaInsightsService.getIndiaSkillTrends() 
        : techInsightsService.getSkillTrends();
        
      const hiringCitiesData = selectedCountry === 'india' 
        ? indiaInsightsService.getIndiaHiringCitiesByRole(selectedRole) 
        : techInsightsService.getHiringCitiesByRole(selectedRole);
        
      const prepResourcesData = selectedCountry === 'india' 
        ? indiaInsightsService.getIndiaRolePreparationResources(selectedRole) 
        : techInsightsService.getRolePreparationResources(selectedRole);
        
      const aiAdviceData = selectedCountry === 'india' 
        ? indiaInsightsService.getIndiaAICareerAdvice() 
        : techInsightsService.getAICareerAdvice();
      
      setJobRoles(jobRolesData);
      setSkillDemand(skillDemandData);
      setSkillTrends(skillTrendsData);
      setHiringCities(hiringCitiesData);
      setPrepResources(prepResourcesData);
      setAiAdvice(aiAdviceData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  
  // Refetch data when country selection changes
  useEffect(() => {
    fetchAllData(true);
  }, [selectedCountry]);
  
  useEffect(() => {
    // Update hiring cities and prep resources when selected role changes
    const hiringCitiesData = selectedCountry === 'india'
      ? indiaInsightsService.getIndiaHiringCitiesByRole(selectedRole)
      : techInsightsService.getHiringCitiesByRole(selectedRole);
      
    const prepResourcesData = selectedCountry === 'india'
      ? indiaInsightsService.getIndiaRolePreparationResources(selectedRole)
      : techInsightsService.getRolePreparationResources(selectedRole);
    
    setHiringCities(hiringCitiesData);
    setPrepResources(prepResourcesData);
  }, [selectedRole, selectedCountry]);

  const selectedIndustry = industriesData.find((ind: any) => ind.name === industry);

  const renderDashboard = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2 text-lg">Loading insights...</span>
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-primary" />
            {selectedCountry === 'india' ? 'India Tech Industry Dashboard' : 'Industry Insights Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-card border border-border rounded-md overflow-hidden">
              <button
                onClick={() => {
                  if (selectedCountry !== 'global') {
                    setSelectedCountry('global');
                  }
                }}
                className={`flex items-center px-3 py-1.5 ${selectedCountry === 'global' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              >
                <Globe className="h-4 w-4 mr-1.5" />
                Global
              </button>
              <button
                onClick={() => {
                  if (selectedCountry !== 'india') {
                    setSelectedCountry('india');
                  }
                }}
                className={`flex items-center px-3 py-1.5 ${selectedCountry === 'india' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              >
                <Globe className="h-4 w-4 mr-1.5" />
                India
              </button>
            </div>
            <button
              onClick={() => fetchAllData(true)}
              disabled={refreshing}
              className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {refreshing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </>
              )}
            </button>
          </div>
        </div>

        {/* Top In-Demand Tech Job Roles Section */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary" />
            Top In-Demand Tech Job Roles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobRoles.map((role) => (
              <JobRolesCard 
                key={role.id} 
                role={role} 
              />
            ))}
          </div>
        </div>
        
        {/* Skill Demand and Trends Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Skill Demand Table
            </h3>
            <SkillDemandTable skills={skillDemand} />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-primary" />
              Skill Trends (Last 30 Days)
            </h3>
            <SkillTrendChart data={skillTrends} />
          </div>
        </div>
        
        {/* Top Hiring Cities Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-foreground flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              Top Hiring Cities
            </h3>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-muted-foreground">Select Role:</span>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="p-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary text-sm text-foreground"
              >
                {jobRoles.map(role => (
                  <option key={role.id} value={role.title}>{role.title}</option>
                ))}
              </select>
            </div>
          </div>
          <HiringCitiesChart data={hiringCities} role={selectedRole} />
        </div>
        
        {/* Role Preparation Section */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Interview Preparation Resources
          </h3>
          <RolePreparationCard role={selectedRole} resources={prepResources} />
        </div>
        
        {/* AI Career Advice Section */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            AI Career Advice
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiAdvice.map((advice) => (
              <AIAdviceCard key={advice.id} advice={advice} />
            ))}
          </div>
        </div>
        
        {/* Original Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Top Industry Trends
            </h3>
            <div className="space-y-4">
              {insights.slice(0, 3).map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <Newspaper className="h-5 w-5 mr-2 text-primary" />
              Latest Industry News
            </h3>
            <div className="space-y-4">
              {news.slice(0, 3).map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Industry Growth Metrics
          </h3>
          <StatsChart data={stats} />
        </div>
      </div>
    );
  };

  const renderCustomInsights = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <Target className="h-6 w-6 mr-2 text-primary" />
            Custom Industry Insights
          </h2>
        </div>
        
        <div className="bg-accent p-6 rounded-lg border border-border mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Generate Targeted Industry Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium text-foreground mb-1">Industry:</label>
              <select 
                value={industry} 
                onChange={handleIndustryChange} 
                className="w-full p-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-foreground"
              >
                <option value="">Select Industry</option>
                {industriesData.map((ind: any) => (
                  <option key={ind.id} value={ind.name}>{ind.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block font-medium text-foreground mb-1">Sub-Industry:</label>
              <select 
                value={subIndustry} 
                onChange={handleSubIndustryChange} 
                disabled={!industry}
                className="w-full p-2 bg-card border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors disabled:bg-muted disabled:text-muted-foreground text-foreground"
              >
                <option value="">Select Sub-Industry</option>
                {selectedIndustry?.subIndustries.map((sub: string) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleFetchInsight}
            disabled={!industry || !subIndustry || formLoading}
            className="w-full md:w-auto px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center"
          >
            {formLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Insight...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get Insight
              </>
            )}
          </button>
        </div>
        
        {error && (
          <div className="bg-destructive/20 text-destructive-foreground p-4 rounded-md border border-destructive/30 mb-6 flex items-start">
            <div className="mr-2 mt-0.5">⚠️</div>
            <div>{error}</div>
          </div>
        )}
        
        {insight && (
          <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Industry Analysis
            </h3>
            <div className="prose prose-invert max-w-none whitespace-pre-line">
              {insight}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-center bg-card text-card-foreground py-4 px-6 rounded-lg mb-6 border border-border">
        <Sparkles className="h-6 w-6 mr-3 text-primary" />
        <h1 className="text-3xl font-bold">
          {selectedCountry === 'india' ? 'India Industry Insights' : 'Industry Insights'} 
          <span className="text-lg text-muted-foreground">(Powered by Gemini)</span>
          {selectedCountry === 'india' && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
              <Globe className="h-3 w-3 mr-1" />
              Real-time India Data
            </span>
          )}
        </h1>
      </div>
      
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'dashboard' ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground hover:bg-accent'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'custom' ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground hover:bg-accent'}`}
            onClick={() => setActiveTab('custom')}
          >
            Custom Insights
          </button>
        </div>
      </div>
      
      <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border border-border">
        {activeTab === 'dashboard' ? renderDashboard() : renderCustomInsights()}
      </div>
    </div>
  );
};


export default Insights;
