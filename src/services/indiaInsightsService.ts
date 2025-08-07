import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { IndustryInsight, NewsItem, IndustryStats } from './insightsService';
import { JobRole } from '../components/JobRolesCard';
import { SkillDemand } from '../components/SkillDemandTable';
import { SkillTrendData } from '../components/SkillTrendChart';
import { CityHiringData } from '../components/HiringCitiesChart';
import { PrepResource } from '../components/RolePreparationCard';
import { AIAdvice } from '../components/AIAdviceCard';

// Use environment variable for API key with fallback
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCUU5SkCDqqiSIQbPBHhhrQaoPTTHJyOEA';

// Initialize the Google Generative AI with the API key
const getGenAI = () => {
  if (!API_KEY) {
    throw new Error('Gemini API key not found in environment variables');
  }
  return new GoogleGenerativeAI(API_KEY);
};

// Define the Gemini model to use - using gemini-2.0-flash to avoid quota issues with gemini-1.5-flash
const GEMINI_MODEL = 'gemini-2.0-flash';

export const indiaInsightsService = {
  async getIndiaIndustryInsights(): Promise<IndustryInsight[]> {
    try {
      // Check if API key is available
      if (!API_KEY) {
        console.warn('Gemini API key not found, using mock data');
        throw new Error('API key not configured');
      }

      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

      const prompt = `
        Generate current industry insights for tech professionals in India preparing for interviews.
        Provide insights about:
        1. Top programming languages in demand in India
        2. Most valuable frameworks/technologies in the Indian job market
        3. Emerging tech trends in India
        4. High-demand job roles in Indian tech companies
        5. Essential skills for developers in India
        6. Cloud platforms market share in India
        7. Database technologies trending in India
        8. AI/ML tools in demand in Indian tech industry

        Format the response as a JSON array with exactly 8 objects, each with these properties:
        - id: a unique string identifier
        - category: the category of the insight (e.g., "Programming Languages", "Frameworks", etc.)
        - title: a concise title for the insight specific to India
        - description: a detailed explanation (2-3 sentences) with India-specific information
        - trend: must be one of these exact strings: "rising", "stable", or "declining"
        - percentage: (optional) a number representing growth or adoption percentage if applicable
        - rank: (optional) a number representing rank or position if applicable

        Ensure the response is valid JSON without any additional text.
        Make sure all insights are specific to the Indian tech industry and job market.
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
      console.error('Error fetching India industry insights:', error);
      // Return India-specific mock data in case of error
      return [
        {
          id: '1',
          category: 'Programming Languages',
          title: 'JavaScript and Python Lead in India',
          description: 'JavaScript and Python continue to dominate the Indian tech landscape with TypeScript adoption growing rapidly. Indian startups and established firms are increasingly seeking developers with strong JavaScript skills.',
          trend: 'rising',
          percentage: 72.5
        },
        {
          id: '2',
          category: 'Frameworks',
          title: 'React Dominates Indian Frontend Market',
          description: 'React remains the most in-demand frontend framework in India, with Next.js gaining significant traction. Indian companies are increasingly adopting React for both web and mobile development using React Native.',
          trend: 'rising',
          percentage: 68.3
        },
        {
          id: '3',
          category: 'Emerging Tech',
          title: 'GenAI Adoption Surges in Indian Tech',
          description: 'Generative AI tools are seeing rapid adoption across Indian tech companies and startups. Indian firms are increasingly integrating AI assistants into their development workflows and customer-facing applications.',
          trend: 'rising',
          percentage: 92.7
        },
        {
          id: '4',
          category: 'Job Roles',
          title: 'Full Stack Developers Most Sought in India',
          description: 'Full stack developers with React and Node.js expertise are the most in-demand tech professionals in India. Indian companies are prioritizing versatile developers who can work across the entire technology stack.',
          trend: 'rising',
          percentage: 63.8
        },
        {
          id: '5',
          category: 'Developer Skills',
          title: 'Cloud Expertise Essential in Indian Market',
          description: 'Cloud computing skills are now fundamental for most developer roles in India. Indian tech companies are increasingly moving to cloud-native architectures, making AWS, Azure, and GCP expertise highly valuable.',
          trend: 'rising',
          percentage: 78.4
        },
        {
          id: '6',
          category: 'Cloud Platforms',
          title: 'AWS Leads Indian Cloud Market',
          description: 'Amazon Web Services maintains market leadership in India, with Azure gaining ground. Indian enterprises are increasingly adopting multi-cloud strategies for flexibility and cost optimization.',
          trend: 'stable',
          percentage: 42.6,
          rank: 1
        },
        {
          id: '7',
          category: 'Database Technologies',
          title: 'MongoDB Popular Among Indian Startups',
          description: 'MongoDB has become the preferred NoSQL database for Indian startups and tech companies. Traditional SQL databases remain essential in enterprise settings, with PostgreSQL gaining popularity over MySQL.',
          trend: 'rising',
          percentage: 53.2
        },
        {
          id: '8',
          category: 'AI/ML Tools',
          title: 'PyTorch Growing Rapidly in Indian AI Scene',
          description: 'PyTorch is gaining significant adoption in the Indian AI research and development community. TensorFlow remains widely used, but PyTorch is becoming the preferred framework for new AI projects in India.',
          trend: 'rising',
          percentage: 58.9,
          rank: 2
        }
      ];
    }
  },

  async getIndiaLatestNews(): Promise<NewsItem[]> {
    try {
      // Check if API key is available
      if (!API_KEY) {
        console.warn('Gemini API key not found, using mock data');
        throw new Error('API key not configured');
      }

      const genAI = getGenAI();
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

      const prompt = `
        Generate the latest tech industry news from India that would be relevant for developers preparing for interviews.
        Focus on recent developments in:
        - Indian tech companies and startups
        - Programming languages and frameworks popular in India
        - Cloud services and infrastructure in the Indian market
        - AI and machine learning developments in India
        - Developer tools and platforms used in India
        - Major Indian tech company announcements
        - Industry regulations affecting tech in India

        Format the response as a JSON array with exactly 5 objects, each with these properties:
        - id: a unique string identifier
        - title: a concise news headline about Indian tech industry
        - summary: a brief summary of the news (2-3 sentences) specific to India
        - category: the category of the news (e.g., "AI", "Cloud", "Development")
        - impact: must be one of these exact strings: "high", "medium", or "low"
        - date: a recent date in the format "MMM DD, YYYY" (e.g., "Jun 15, 2023")
        - source: a plausible Indian news source name

        Ensure the response is valid JSON without any additional text.
        Make sure all news items are specific to the Indian tech industry.
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
      console.error('Error fetching India latest news:', error);
      // Return India-specific mock data in case of error
      return [
        {
          id: '1',
          title: 'Indian Government Launches National AI Strategy',
          summary: 'The Indian government has unveiled a comprehensive national AI strategy to boost AI adoption across sectors. The initiative includes funding for AI startups, research grants, and educational programs to develop AI talent in India.',
          category: 'AI',
          impact: 'high',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          source: 'The Economic Times'
        },
        {
          id: '2',
          title: 'Infosys Partners with Microsoft for Cloud Solutions in India',
          summary: 'Infosys has announced a strategic partnership with Microsoft to accelerate cloud adoption among Indian enterprises. The collaboration will focus on developing industry-specific cloud solutions tailored for the Indian market.',
          category: 'Cloud',
          impact: 'high',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          source: 'Business Standard'
        },
        {
          id: '3',
          title: 'Indian Startups Embrace React Native for Cross-Platform Development',
          summary: 'A growing number of Indian startups are adopting React Native for cross-platform mobile development. The framework is gaining popularity for its ability to reduce development time and costs while maintaining native-like performance.',
          category: 'Development',
          impact: 'medium',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          source: 'YourStory'
        },
        {
          id: '4',
          title: 'TCS Launches AI-Powered Coding Assistant for Developers',
          summary: 'Tata Consultancy Services has introduced an AI-powered coding assistant to enhance developer productivity. The tool, developed specifically for the Indian market, supports multiple Indian languages and frameworks popular in the region.',
          category: 'AI',
          impact: 'medium',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          source: 'Mint'
        },
        {
          id: '5',
          title: 'India\'s Data Protection Bill to Impact Tech Companies',
          summary: 'The Indian Parliament has passed the Data Protection Bill, introducing strict regulations for handling user data. Tech companies operating in India will need to implement significant changes to their data storage and processing practices.',
          category: 'Regulation',
          impact: 'high',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          source: 'The Hindu'
        }
      ];
    }
  },

  async getIndiaIndustryStats(): Promise<IndustryStats[]> {
    // For stats, we'll use India-specific mock data as this would typically come from a database or analytics service
    return [
      {
        month: 'Jan',
        aiMl: 72,
        webDev: 85,
        mobile: 68,
        cloud: 76,
        cybersecurity: 65
      },
      {
        month: 'Feb',
        aiMl: 75,
        webDev: 83,
        mobile: 70,
        cloud: 78,
        cybersecurity: 67
      },
      {
        month: 'Mar',
        aiMl: 80,
        webDev: 82,
        mobile: 72,
        cloud: 80,
        cybersecurity: 70
      },
      {
        month: 'Apr',
        aiMl: 85,
        webDev: 84,
        mobile: 75,
        cloud: 83,
        cybersecurity: 73
      },
      {
        month: 'May',
        aiMl: 90,
        webDev: 86,
        mobile: 78,
        cloud: 85,
        cybersecurity: 76
      },
      {
        month: 'Jun',
        aiMl: 95,
        webDev: 88,
        mobile: 80,
        cloud: 87,
        cybersecurity: 80
      },
    ];
  },

  getIndiaTopJobRoles(): JobRole[] {
    return [
      {
        id: '1',
        title: 'Full Stack Developer',
        salary: '₹12L - ₹25L',
        growthPercentage: 38,
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']
      },
      {
        id: '2',
        title: 'AI/ML Engineer',
        salary: '₹15L - ₹35L',
        growthPercentage: 42,
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP']
      },
      {
        id: '3',
        title: 'DevOps Engineer',
        salary: '₹14L - ₹28L',
        growthPercentage: 35,
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform']
      },
      {
        id: '4',
        title: 'Cloud Solutions Architect',
        salary: '₹18L - ₹40L',
        growthPercentage: 32,
        skills: ['AWS', 'Azure', 'Kubernetes', 'Microservices', 'Serverless']
      },
      {
        id: '5',
        title: 'Data Engineer',
        salary: '₹12L - ₹26L',
        growthPercentage: 30,
        skills: ['Python', 'Spark', 'Hadoop', 'SQL', 'ETL']
      },
      {
        id: '6',
        title: 'Mobile App Developer',
        salary: '₹10L - ₹22L',
        growthPercentage: 28,
        skills: ['React Native', 'Flutter', 'Kotlin', 'Swift', 'Firebase']
      }
    ];
  },

  getIndiaSkillDemand(): SkillDemand[] {
    return [
      {
        id: '1',
        name: 'React',
        growthPercentage: 35,
        level: 'Advanced',
        trend: 'rising'
      },
      {
        id: '2',
        name: 'Python',
        growthPercentage: 40,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '3',
        name: 'AWS',
        growthPercentage: 38,
        level: 'Advanced',
        trend: 'rising'
      },
      {
        id: '4',
        name: 'Node.js',
        growthPercentage: 32,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '5',
        name: 'React Native',
        growthPercentage: 30,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '6',
        name: 'TypeScript',
        growthPercentage: 28,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '7',
        name: 'MongoDB',
        growthPercentage: 25,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '8',
        name: 'Docker',
        growthPercentage: 22,
        level: 'Intermediate',
        trend: 'stable'
      },
      {
        id: '9',
        name: 'Kubernetes',
        growthPercentage: 20,
        level: 'Expert',
        trend: 'rising'
      },
      {
        id: '10',
        name: 'TensorFlow',
        growthPercentage: 45,
        level: 'Expert',
        trend: 'rising'
      }
    ];
  },

  getIndiaSkillTrends(): SkillTrendData[] {
    // Generate 30 days of data for India
    const data: SkillTrendData[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const day = `${date.getMonth() + 1}/${date.getDate()}`;
      
      // Base values with India-specific trends
      let react = 70 + Math.floor(Math.random() * 10);
      let python = 75 + Math.floor(Math.random() * 10);
      let aws = 65 + Math.floor(Math.random() * 15);
      let typescript = 60 + Math.floor(Math.random() * 12);
      let kubernetes = 50 + Math.floor(Math.random() * 20);
      
      // Add trends
      react += i * 0.6;
      python += i * 0.8;
      aws += i * 0.5;
      typescript += i * 0.7;
      kubernetes += i * 0.9;
      
      data.push({
        day,
        react,
        python,
        aws,
        typescript,
        kubernetes
      });
    }
    
    return data;
  },

  getIndiaHiringCitiesByRole(role: string): CityHiringData[] {
    // Different data based on role for Indian cities
    const roleMap: Record<string, CityHiringData[]> = {
      'AI/ML Engineer': [
        { city: 'Bangalore', jobs: 1450, remoteFriendly: true },
        { city: 'Hyderabad', jobs: 980, remoteFriendly: true },
        { city: 'Pune', jobs: 750, remoteFriendly: true },
        { city: 'Mumbai', jobs: 680, remoteFriendly: false },
        { city: 'Delhi NCR', jobs: 620, remoteFriendly: true },
        { city: 'Chennai', jobs: 480, remoteFriendly: false },
        { city: 'Kolkata', jobs: 320, remoteFriendly: false }
      ],
      'Full Stack Developer': [
        { city: 'Bangalore', jobs: 1800, remoteFriendly: true },
        { city: 'Hyderabad', jobs: 1200, remoteFriendly: true },
        { city: 'Pune', jobs: 950, remoteFriendly: true },
        { city: 'Delhi NCR', jobs: 850, remoteFriendly: true },
        { city: 'Mumbai', jobs: 780, remoteFriendly: false },
        { city: 'Chennai', jobs: 650, remoteFriendly: false },
        { city: 'Kolkata', jobs: 450, remoteFriendly: false }
      ],
      'DevOps Engineer': [
        { city: 'Bangalore', jobs: 1250, remoteFriendly: true },
        { city: 'Hyderabad', jobs: 950, remoteFriendly: true },
        { city: 'Pune', jobs: 780, remoteFriendly: true },
        { city: 'Mumbai', jobs: 680, remoteFriendly: false },
        { city: 'Delhi NCR', jobs: 620, remoteFriendly: true },
        { city: 'Chennai', jobs: 480, remoteFriendly: false },
        { city: 'Ahmedabad', jobs: 320, remoteFriendly: false }
      ],
      'Cloud Solutions Architect': [
        { city: 'Bangalore', jobs: 1050, remoteFriendly: true },
        { city: 'Hyderabad', jobs: 850, remoteFriendly: true },
        { city: 'Pune', jobs: 680, remoteFriendly: true },
        { city: 'Mumbai', jobs: 580, remoteFriendly: false },
        { city: 'Delhi NCR', jobs: 520, remoteFriendly: true },
        { city: 'Chennai', jobs: 420, remoteFriendly: false },
        { city: 'Kolkata', jobs: 280, remoteFriendly: false }
      ],
      'Data Engineer': [
        { city: 'Bangalore', jobs: 1150, remoteFriendly: true },
        { city: 'Hyderabad', jobs: 880, remoteFriendly: true },
        { city: 'Pune', jobs: 720, remoteFriendly: true },
        { city: 'Mumbai', jobs: 650, remoteFriendly: false },
        { city: 'Delhi NCR', jobs: 580, remoteFriendly: true },
        { city: 'Chennai', jobs: 450, remoteFriendly: false },
        { city: 'Kolkata', jobs: 320, remoteFriendly: false }
      ],
      'Mobile App Developer': [
        { city: 'Bangalore', jobs: 1350, remoteFriendly: true },
        { city: 'Hyderabad', jobs: 950, remoteFriendly: true },
        { city: 'Pune', jobs: 780, remoteFriendly: true },
        { city: 'Mumbai', jobs: 680, remoteFriendly: false },
        { city: 'Delhi NCR', jobs: 620, remoteFriendly: true },
        { city: 'Chennai', jobs: 480, remoteFriendly: false },
        { city: 'Ahmedabad', jobs: 350, remoteFriendly: false }
      ]
    };
    
    // Default data if role not found
    const defaultData: CityHiringData[] = [
      { city: 'Bangalore', jobs: 1500, remoteFriendly: true },
      { city: 'Hyderabad', jobs: 1100, remoteFriendly: true },
      { city: 'Pune', jobs: 850, remoteFriendly: true },
      { city: 'Mumbai', jobs: 750, remoteFriendly: false },
      { city: 'Delhi NCR', jobs: 650, remoteFriendly: true },
      { city: 'Chennai', jobs: 550, remoteFriendly: false },
      { city: 'Kolkata', jobs: 350, remoteFriendly: false }
    ];
    
    return roleMap[role] || defaultData;
  },

  getIndiaRolePreparationResources(role: string): PrepResource[] {
    // Common resources for all roles in India
    const commonResources: PrepResource[] = [
      {
        id: '1',
        title: 'System Design for Indian Tech Companies',
        type: 'course',
        link: 'https://example.com/system-design-india',
        difficulty: 'advanced'
      },
      {
        id: '2',
        title: 'Data Structures & Algorithms for Indian Tech Interviews',
        type: 'course',
        link: 'https://example.com/dsa-india',
        difficulty: 'intermediate'
      },
      {
        id: '3',
        title: 'Behavioral Interview Questions in Indian Tech Companies',
        type: 'article',
        link: 'https://example.com/behavioral-india',
        difficulty: 'beginner'
      }
    ];
    
    // Role-specific resources for India
    const roleSpecificResources: Record<string, PrepResource[]> = {
      'AI/ML Engineer': [
        {
          id: '4',
          title: 'Machine Learning Interview Questions in Indian Tech Giants',
          type: 'practice',
          link: 'https://example.com/ml-questions-india',
          difficulty: 'advanced'
        },
        {
          id: '5',
          title: 'Deep Learning for Indian AI Startups',
          type: 'video',
          link: 'https://example.com/deep-learning-india',
          difficulty: 'intermediate'
        }
      ],
      'Full Stack Developer': [
        {
          id: '4',
          title: 'MERN Stack Interview Questions in Indian Companies',
          type: 'practice',
          link: 'https://example.com/mern-india',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          title: 'System Design for Indian Startups',
          type: 'video',
          link: 'https://example.com/system-design-startups-india',
          difficulty: 'advanced'
        }
      ],
      'DevOps Engineer': [
        {
          id: '4',
          title: 'Kubernetes in Indian Enterprise',
          type: 'practice',
          link: 'https://example.com/k8s-india',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          title: 'CI/CD Pipeline Implementation for Indian Tech Companies',
          type: 'course',
          link: 'https://example.com/cicd-india',
          difficulty: 'advanced'
        }
      ],
      'Cloud Solutions Architect': [
        {
          id: '4',
          title: 'AWS Solutions Architect Practice for Indian Market',
          type: 'practice',
          link: 'https://example.com/aws-india',
          difficulty: 'advanced'
        },
        {
          id: '5',
          title: 'Multi-Cloud Architecture for Indian Enterprises',
          type: 'video',
          link: 'https://example.com/multi-cloud-india',
          difficulty: 'advanced'
        }
      ],
      'Data Engineer': [
        {
          id: '4',
          title: 'Big Data Solutions for Indian Companies',
          type: 'video',
          link: 'https://example.com/big-data-india',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          title: 'SQL Performance Tuning for Indian Enterprise',
          type: 'practice',
          link: 'https://example.com/sql-tuning-india',
          difficulty: 'advanced'
        }
      ],
      'Mobile App Developer': [
        {
          id: '4',
          title: 'React Native for Indian App Market',
          type: 'course',
          link: 'https://example.com/react-native-india',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          title: 'Mobile App Performance Optimization for Indian Users',
          type: 'video',
          link: 'https://example.com/mobile-perf-india',
          difficulty: 'advanced'
        }
      ]
    };
    
    // Combine common resources with role-specific ones
    return [...commonResources, ...(roleSpecificResources[role] || [])];
  },

  getIndiaAICareerAdvice(): AIAdvice[] {
    return [
      {
        id: '1',
        title: 'Focus on AI Ethics for Indian Market',
        content: 'As AI adoption increases in India, companies are prioritizing ethical AI development. Professionals with expertise in AI ethics, bias mitigation, and responsible AI are seeing 45% higher demand in Indian tech hubs like Bangalore and Hyderabad. Consider adding ethics certifications to your portfolio.',
        relatedRole: 'AI/ML Engineer',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Multi-Cloud Expertise Valued in Indian Enterprise',
        content: 'Indian organizations are increasingly adopting multi-cloud strategies to avoid vendor lock-in. Architects who can design solutions across AWS, Azure, and GCP are commanding 30-35% higher salaries in the Indian market. Focus on understanding the strengths and integration points between major cloud providers.',
        relatedRole: 'Cloud Solutions Architect',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'React Native Skills in High Demand for Indian Apps',
        content: 'React Native has become the preferred framework for mobile app development in Indian startups and enterprises. Developers with React Native skills are seeing increased demand across all major Indian tech hubs. Consider building India-specific apps that address local market needs to showcase your expertise.',
        relatedRole: 'Mobile App Developer',
        priority: 'high'
      },
      {
        id: '4',
        title: 'DevSecOps Growing Rapidly in Indian Tech',
        content: 'DevSecOps practices are becoming essential in Indian tech companies, especially in fintech and healthcare sectors. DevOps engineers familiar with security automation and compliance are in high demand. Invest time in learning security-focused CI/CD practices to stay competitive in the Indian job market.',
        relatedRole: 'DevOps Engineer',
        priority: 'high'
      },
      {
        id: '5',
        title: 'MERN Stack Dominates Indian Web Development',
        content: 'The MERN stack (MongoDB, Express, React, Node.js) has become the standard for web development in Indian startups and tech companies. Full stack developers proficient in the entire MERN stack are commanding premium salaries in cities like Bangalore, Hyderabad, and Pune. Focus on building end-to-end applications with this stack.',
        relatedRole: 'Full Stack Developer',
        priority: 'high'
      },
      {
        id: '6',
        title: 'Data Engineering for Indian E-commerce',
        content: 'With the explosive growth of e-commerce in India, data engineers with experience in real-time analytics and recommendation systems are highly sought after. Indian e-commerce giants and startups are investing heavily in data infrastructure. Consider building projects that demonstrate your ability to design and implement scalable data pipelines for high-volume transaction systems.',
        relatedRole: 'Data Engineer',
        priority: 'medium'
      }
    ];
  }
};