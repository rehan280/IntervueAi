import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

// Use environment variable for API key with fallback
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCUU5SkCDqqiSIQbPBHhhrQaoPTTHJyOEA';

// Initialize the Google Generative AI with the API key
const getGenAI = () => {
  if (!API_KEY) {
    throw new Error('Gemini API key not found in environment variables');
  }
  return new GoogleGenerativeAI(API_KEY);
};

export interface IndustryInsight {
  id: string;
  category: string;
  title: string;
  description: string;
  trend: 'rising' | 'stable' | 'declining';
  percentage?: number;
  rank?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  impact: 'high' | 'medium' | 'low';
  date: string;
  source: string;
}

export interface IndustryStats {
  month: string;
  aiMl: number;
  webDev: number;
  mobile: number;
  cloud: number;
  cybersecurity: number;
}

export const insightsService = {
  async getIndustryInsights(): Promise<IndustryInsight[]> {
    try {
      // Check if API key is available
      if (!API_KEY) {
        console.warn('Gemini API key not found, using mock data');
        throw new Error('API key not configured');
      }

      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `
        Generate current industry insights for tech professionals preparing for interviews.
        Provide insights about:
        1. Top programming languages in demand
        2. Most valuable frameworks/technologies
        3. Emerging tech trends
        4. High-demand job roles
        5. Essential skills for developers
        6. Cloud platforms market share
        7. Database technologies trending
        8. AI/ML tools in demand

        Format the response as a JSON array with exactly 8 objects, each with these properties:
        - id: a unique string identifier
        - category: the category of the insight (e.g., "Programming Languages", "Frameworks", etc.)
        - title: a concise title for the insight
        - description: a detailed explanation (2-3 sentences)
        - trend: must be one of these exact strings: "rising", "stable", or "declining"
        - percentage: (optional) a number representing growth or adoption percentage if applicable
        - rank: (optional) a number representing rank or position if applicable

        Ensure the response is valid JSON without any additional text.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON from Gemini response');
      }
      
      const insights = JSON.parse(jsonMatch[0]) as IndustryInsight[];
      return insights;
    } catch (error) {
      console.error('Error fetching industry insights:', error);
      // Return comprehensive mock data in case of error
      return [
        {
          id: '1',
          category: 'Programming Languages',
          title: 'JavaScript Continues to Dominate',
          description: 'JavaScript remains the most widely used programming language with TypeScript adoption growing rapidly. The language ecosystem continues to evolve with new features and frameworks.',
          trend: 'stable',
          percentage: 67.8
        },
        {
          id: '2',
          category: 'Frameworks',
          title: 'React Maintains Lead in Frontend',
          description: 'React continues to be the most popular frontend framework, with Next.js gaining significant traction. Server components and React Server Actions are changing how developers build web applications.',
          trend: 'rising',
          percentage: 42.5
        },
        {
          id: '3',
          category: 'Emerging Tech',
          title: 'AI Integration in Development Tools',
          description: 'AI-powered coding assistants like GitHub Copilot and Amazon CodeWhisperer are transforming developer workflows. These tools are increasing productivity and changing how code is written.',
          trend: 'rising',
          percentage: 85.3
        },
        {
          id: '4',
          category: 'Job Roles',
          title: 'DevOps Engineers in High Demand',
          description: 'DevOps engineers continue to be among the most sought-after tech professionals. Companies are increasingly valuing professionals who can bridge development and operations with automation expertise.',
          trend: 'rising',
          percentage: 58.2
        },
        {
          id: '5',
          category: 'Developer Skills',
          title: 'Cloud Proficiency Essential',
          description: 'Cloud computing skills are now considered fundamental for most developer roles. Expertise in at least one major cloud platform (AWS, Azure, GCP) is becoming a standard requirement.',
          trend: 'rising',
          percentage: 72.1
        },
        {
          id: '6',
          category: 'Cloud Platforms',
          title: 'AWS Leads but Azure Gaining',
          description: 'Amazon Web Services maintains market leadership, but Microsoft Azure continues to gain market share. Multi-cloud strategies are becoming more common among enterprises.',
          trend: 'stable',
          percentage: 33.4,
          rank: 1
        },
        {
          id: '7',
          category: 'Database Technologies',
          title: 'NoSQL Adoption Accelerating',
          description: 'NoSQL databases like MongoDB and Redis are seeing increased adoption for specific use cases. Traditional SQL databases remain essential, but developers are expected to be familiar with both paradigms.',
          trend: 'rising',
          percentage: 45.7
        },
        {
          id: '8',
          category: 'AI/ML Tools',
          title: 'TensorFlow and PyTorch Dominate',
          description: 'TensorFlow and PyTorch continue to be the leading frameworks for AI/ML development. Simplified ML tools and AutoML solutions are making AI more accessible to developers without specialized ML expertise.',
          trend: 'stable',
          percentage: 61.3,
          rank: 1
        }
      ];
    }
  },

  async getLatestNews(): Promise<NewsItem[]> {
    try {
      // Check if API key is available
      if (!API_KEY) {
        console.warn('Gemini API key not found, using mock data');
        throw new Error('API key not configured');
      }

      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
        Generate the latest tech industry news that would be relevant for developers preparing for interviews.
        Focus on recent developments in:
        - Programming languages and frameworks
        - Cloud services and infrastructure
        - AI and machine learning
        - Developer tools and platforms
        - Major tech company announcements
        - Industry regulations affecting tech

        Format the response as a JSON array with exactly 5 objects, each with these properties:
        - id: a unique string identifier
        - title: a concise news headline
        - summary: a brief summary of the news (2-3 sentences)
        - category: the category of the news (e.g., "AI", "Cloud", "Development")
        - impact: must be one of these exact strings: "high", "medium", or "low"
        - date: a recent date in the format "MMM DD, YYYY" (e.g., "Jun 15, 2023")
        - source: a plausible news source name

        Ensure the response is valid JSON without any additional text.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\[\s*\{.*\}\s*\]/s);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON from Gemini response');
      }
      
      const news = JSON.parse(jsonMatch[0]) as NewsItem[];
      return news;
    } catch (error) {
      console.error('Error fetching latest news:', error);
      // Return comprehensive mock data in case of error
      return [
        {
          id: '1',
          title: 'TypeScript 5.4 Released with Performance Improvements',
          summary: 'Microsoft has released TypeScript 5.4 with significant performance improvements and new type checking features. The update focuses on developer experience and build time optimization.',
          category: 'Development',
          impact: 'medium',
          date: 'Jun 10, 2023',
          source: 'TypeScript Blog'
        },
        {
          id: '2',
          title: 'AWS Launches New AI Service for Code Review',
          summary: 'Amazon Web Services has introduced a new AI-powered code review service that automatically detects bugs and suggests improvements. The service integrates with popular IDEs and CI/CD pipelines.',
          category: 'Cloud',
          impact: 'high',
          date: 'Jun 8, 2023',
          source: 'AWS News'
        },
        {
          id: '3',
          title: 'Google Announces New Framework for Building AI Applications',
          summary: 'Google has released a new open-source framework designed to simplify building AI-powered applications. The framework provides pre-built components and integration with Google\'s AI services.',
          category: 'AI',
          impact: 'high',
          date: 'Jun 5, 2023',
          source: 'Google AI Blog'
        },
        {
          id: '4',
          title: 'React 19 Beta Introduces New Rendering Engine',
          summary: 'The React team has announced React 19 beta with a completely rewritten rendering engine. The update promises significant performance improvements and better developer experience with simplified APIs.',
          category: 'Development',
          impact: 'high',
          date: 'Jun 3, 2023',
          source: 'React Blog'
        },
        {
          id: '5',
          title: 'EU Passes New AI Regulation Framework',
          summary: 'The European Union has approved a comprehensive AI regulation framework that will impact how AI systems are developed and deployed. Tech companies will need to ensure their AI systems comply with new transparency and safety requirements.',
          category: 'Regulation',
          impact: 'high',
          date: 'May 30, 2023',
          source: 'EU Commission'
        }
      ];
    }
  },

  async getIndustryStats(): Promise<IndustryStats[]> {
    // For stats, we'll use mock data as this would typically come from a database or analytics service
    return [
      {
        month: 'Jan',
        aiMl: 65,
        webDev: 78,
        mobile: 62,
        cloud: 80,
        cybersecurity: 72
      },
      {
        month: 'Feb',
        aiMl: 68,
        webDev: 75,
        mobile: 65,
        cloud: 82,
        cybersecurity: 74
      },
      {
        month: 'Mar',
        aiMl: 75,
        webDev: 77,
        mobile: 63,
        cloud: 85,
        cybersecurity: 76
      },
      {
        month: 'Apr',
        aiMl: 82,
        webDev: 78,
        mobile: 67,
        cloud: 87,
        cybersecurity: 78
      },
      {
        month: 'May',
        aiMl: 87,
        webDev: 80,
        mobile: 70,
        cloud: 88,
        cybersecurity: 80
      },
      {
        month: 'Jun',
        aiMl: 92,
        webDev: 82,
        mobile: 72,
        cloud: 90,
        cybersecurity: 83
      },
    ];
  }
};