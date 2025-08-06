// Mock data service for tech industry insights

import { JobRole } from '../components/JobRolesCard';
import { SkillDemand } from '../components/SkillDemandTable';
import { SkillTrendData } from '../components/SkillTrendChart';
import { CityHiringData } from '../components/HiringCitiesChart';
import { PrepResource } from '../components/RolePreparationCard';
import { AIAdvice } from '../components/AIAdviceCard';

export const techInsightsService = {
  getTopJobRoles(): JobRole[] {
    return [
      {
        id: '1',
        title: 'AI/ML Engineer',
        salary: '$140,000 - $180,000',
        growthPercentage: 35,
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP']
      },
      {
        id: '2',
        title: 'Cloud Solutions Architect',
        salary: '$130,000 - $170,000',
        growthPercentage: 28,
        skills: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Microservices']
      },
      {
        id: '3',
        title: 'Full Stack Developer',
        salary: '$110,000 - $150,000',
        growthPercentage: 24,
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL']
      },
      {
        id: '4',
        title: 'DevOps Engineer',
        salary: '$120,000 - $160,000',
        growthPercentage: 30,
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Monitoring']
      },
      {
        id: '5',
        title: 'Cybersecurity Specialist',
        salary: '$125,000 - $165,000',
        growthPercentage: 32,
        skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Cloud Security', 'Risk Assessment']
      },
      {
        id: '6',
        title: 'Data Engineer',
        salary: '$115,000 - $155,000',
        growthPercentage: 26,
        skills: ['SQL', 'Python', 'Spark', 'Hadoop', 'ETL']
      }
    ];
  },

  getSkillDemand(): SkillDemand[] {
    return [
      {
        id: '1',
        name: 'React',
        growthPercentage: 28,
        level: 'Advanced',
        trend: 'rising'
      },
      {
        id: '2',
        name: 'Python',
        growthPercentage: 32,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '3',
        name: 'AWS',
        growthPercentage: 30,
        level: 'Advanced',
        trend: 'rising'
      },
      {
        id: '4',
        name: 'TypeScript',
        growthPercentage: 25,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '5',
        name: 'Kubernetes',
        growthPercentage: 35,
        level: 'Expert',
        trend: 'rising'
      },
      {
        id: '6',
        name: 'GraphQL',
        growthPercentage: 22,
        level: 'Intermediate',
        trend: 'rising'
      },
      {
        id: '7',
        name: 'Angular',
        growthPercentage: -5,
        level: 'Advanced',
        trend: 'declining'
      },
      {
        id: '8',
        name: 'Docker',
        growthPercentage: 18,
        level: 'Intermediate',
        trend: 'stable'
      },
      {
        id: '9',
        name: 'Node.js',
        growthPercentage: 15,
        level: 'Intermediate',
        trend: 'stable'
      },
      {
        id: '10',
        name: 'TensorFlow',
        growthPercentage: 40,
        level: 'Expert',
        trend: 'rising'
      }
    ];
  },

  getSkillTrends(): SkillTrendData[] {
    // Generate 30 days of data
    const data: SkillTrendData[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const day = `${date.getMonth() + 1}/${date.getDate()}`;
      
      // Base values
      let react = 65 + Math.floor(Math.random() * 10);
      let python = 70 + Math.floor(Math.random() * 10);
      let aws = 60 + Math.floor(Math.random() * 15);
      let typescript = 55 + Math.floor(Math.random() * 12);
      let kubernetes = 45 + Math.floor(Math.random() * 20);
      
      // Add trends
      react += i * 0.5;
      python += i * 0.7;
      aws += i * 0.4;
      typescript += i * 0.6;
      kubernetes += i * 0.8;
      
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

  getHiringCitiesByRole(role: string): CityHiringData[] {
    // Different data based on role
    const roleMap: Record<string, CityHiringData[]> = {
      'AI/ML Engineer': [
        { city: 'San Francisco', jobs: 1250, remoteFriendly: true },
        { city: 'Seattle', jobs: 980, remoteFriendly: true },
        { city: 'New York', jobs: 850, remoteFriendly: false },
        { city: 'Boston', jobs: 720, remoteFriendly: true },
        { city: 'Austin', jobs: 680, remoteFriendly: true },
        { city: 'Toronto', jobs: 520, remoteFriendly: false },
        { city: 'Chicago', jobs: 480, remoteFriendly: false }
      ],
      'Cloud Solutions Architect': [
        { city: 'Seattle', jobs: 1100, remoteFriendly: true },
        { city: 'San Francisco', jobs: 950, remoteFriendly: true },
        { city: 'New York', jobs: 780, remoteFriendly: false },
        { city: 'Austin', jobs: 720, remoteFriendly: true },
        { city: 'Chicago', jobs: 650, remoteFriendly: false },
        { city: 'Atlanta', jobs: 580, remoteFriendly: true },
        { city: 'Denver', jobs: 520, remoteFriendly: true }
      ],
      'Full Stack Developer': [
        { city: 'San Francisco', jobs: 1500, remoteFriendly: true },
        { city: 'New York', jobs: 1350, remoteFriendly: true },
        { city: 'Seattle', jobs: 1100, remoteFriendly: true },
        { city: 'Austin', jobs: 950, remoteFriendly: true },
        { city: 'Los Angeles', jobs: 850, remoteFriendly: false },
        { city: 'Chicago', jobs: 750, remoteFriendly: false },
        { city: 'Boston', jobs: 700, remoteFriendly: true }
      ],
      'DevOps Engineer': [
        { city: 'San Francisco', jobs: 1050, remoteFriendly: true },
        { city: 'Seattle', jobs: 980, remoteFriendly: true },
        { city: 'New York', jobs: 820, remoteFriendly: false },
        { city: 'Austin', jobs: 780, remoteFriendly: true },
        { city: 'Chicago', jobs: 650, remoteFriendly: false },
        { city: 'Boston', jobs: 580, remoteFriendly: true },
        { city: 'Denver', jobs: 520, remoteFriendly: true }
      ],
      'Cybersecurity Specialist': [
        { city: 'Washington DC', jobs: 1200, remoteFriendly: false },
        { city: 'New York', jobs: 950, remoteFriendly: false },
        { city: 'San Francisco', jobs: 850, remoteFriendly: true },
        { city: 'Chicago', jobs: 720, remoteFriendly: false },
        { city: 'Boston', jobs: 650, remoteFriendly: true },
        { city: 'Seattle', jobs: 580, remoteFriendly: true },
        { city: 'Atlanta', jobs: 520, remoteFriendly: false }
      ],
      'Data Engineer': [
        { city: 'San Francisco', jobs: 1150, remoteFriendly: true },
        { city: 'New York', jobs: 980, remoteFriendly: false },
        { city: 'Seattle', jobs: 850, remoteFriendly: true },
        { city: 'Boston', jobs: 720, remoteFriendly: true },
        { city: 'Chicago', jobs: 650, remoteFriendly: false },
        { city: 'Austin', jobs: 580, remoteFriendly: true },
        { city: 'Atlanta', jobs: 520, remoteFriendly: false }
      ]
    };
    
    // Default data if role not found
    const defaultData: CityHiringData[] = [
      { city: 'San Francisco', jobs: 1200, remoteFriendly: true },
      { city: 'New York', jobs: 1050, remoteFriendly: true },
      { city: 'Seattle', jobs: 950, remoteFriendly: true },
      { city: 'Austin', jobs: 850, remoteFriendly: true },
      { city: 'Boston', jobs: 750, remoteFriendly: false },
      { city: 'Chicago', jobs: 650, remoteFriendly: false },
      { city: 'Denver', jobs: 550, remoteFriendly: true }
    ];
    
    return roleMap[role] || defaultData;
  },

  getRolePreparationResources(role: string): PrepResource[] {
    // Common resources for all roles
    const commonResources: PrepResource[] = [
      {
        id: '1',
        title: 'System Design Interview Preparation',
        type: 'course',
        link: 'https://example.com/system-design',
        difficulty: 'advanced'
      },
      {
        id: '2',
        title: 'Data Structures & Algorithms Refresher',
        type: 'course',
        link: 'https://example.com/dsa',
        difficulty: 'intermediate'
      },
      {
        id: '3',
        title: 'Behavioral Interview Questions',
        type: 'article',
        link: 'https://example.com/behavioral',
        difficulty: 'beginner'
      }
    ];
    
    // Role-specific resources
    const roleSpecificResources: Record<string, PrepResource[]> = {
      'AI/ML Engineer': [
        {
          id: '4',
          title: 'Machine Learning Interview Questions',
          type: 'practice',
          link: 'https://example.com/ml-questions',
          difficulty: 'advanced'
        },
        {
          id: '5',
          title: 'Deep Learning Fundamentals',
          type: 'video',
          link: 'https://example.com/deep-learning',
          difficulty: 'intermediate'
        }
      ],
      'Cloud Solutions Architect': [
        {
          id: '4',
          title: 'AWS Solutions Architect Practice Exam',
          type: 'practice',
          link: 'https://example.com/aws-practice',
          difficulty: 'advanced'
        },
        {
          id: '5',
          title: 'Multi-Cloud Architecture Patterns',
          type: 'video',
          link: 'https://example.com/multi-cloud',
          difficulty: 'advanced'
        }
      ],
      'Full Stack Developer': [
        {
          id: '4',
          title: 'Frontend Interview Questions',
          type: 'practice',
          link: 'https://example.com/frontend-questions',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          title: 'Backend Architecture Deep Dive',
          type: 'video',
          link: 'https://example.com/backend-arch',
          difficulty: 'advanced'
        }
      ],
      'DevOps Engineer': [
        {
          id: '4',
          title: 'CI/CD Pipeline Implementation',
          type: 'practice',
          link: 'https://example.com/cicd',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          title: 'Kubernetes for DevOps Engineers',
          type: 'course',
          link: 'https://example.com/k8s-devops',
          difficulty: 'advanced'
        }
      ],
      'Cybersecurity Specialist': [
        {
          id: '4',
          title: 'Penetration Testing Methodology',
          type: 'practice',
          link: 'https://example.com/pentest',
          difficulty: 'advanced'
        },
        {
          id: '5',
          title: 'Cloud Security Best Practices',
          type: 'article',
          link: 'https://example.com/cloud-security',
          difficulty: 'intermediate'
        }
      ],
      'Data Engineer': [
        {
          id: '4',
          title: 'Data Pipeline Design Patterns',
          type: 'video',
          link: 'https://example.com/data-pipelines',
          difficulty: 'intermediate'
        },
        {
          id: '5',
          title: 'SQL Performance Tuning',
          type: 'practice',
          link: 'https://example.com/sql-tuning',
          difficulty: 'advanced'
        }
      ]
    };
    
    // Combine common resources with role-specific ones
    return [...commonResources, ...(roleSpecificResources[role] || [])];
  },

  getAICareerAdvice(): AIAdvice[] {
    return [
      {
        id: '1',
        title: 'Specialize in AI Ethics for Career Growth',
        content: 'As AI adoption increases, companies are prioritizing ethical AI development. Professionals with expertise in AI ethics, bias mitigation, and responsible AI are seeing 40% higher demand. Consider adding ethics certifications to your portfolio.',
        relatedRole: 'AI/ML Engineer',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Multi-Cloud Expertise is Becoming Essential',
        content: 'Organizations are increasingly adopting multi-cloud strategies to avoid vendor lock-in. Architects who can design solutions across AWS, Azure, and GCP are commanding 25-30% higher salaries. Focus on understanding the strengths and integration points between major cloud providers.',
        relatedRole: 'Cloud Solutions Architect',
        priority: 'medium'
      },
      {
        id: '3',
        title: 'Full Stack Developers Should Embrace WebAssembly',
        content: 'WebAssembly is transforming web development by enabling high-performance applications in the browser. Developers with WASM skills are seeing increased demand. Consider learning Rust or C++ to leverage this technology effectively.',
        relatedRole: 'Full Stack Developer',
        priority: 'medium'
      },
      {
        id: '4',
        title: 'GitOps is Redefining DevOps Practices',
        content: 'GitOps is becoming the standard for Kubernetes deployment and management. DevOps engineers familiar with tools like Flux and Argo CD are in high demand. Invest time in learning declarative infrastructure and GitOps workflows to stay competitive.',
        relatedRole: 'DevOps Engineer',
        priority: 'high'
      },
      {
        id: '5',
        title: 'Zero Trust Security Models are the Future',
        content: 'With remote work becoming permanent, zero trust security models are essential. Cybersecurity specialists who can implement zero trust architectures are seeing significant career opportunities. Focus on identity management, microsegmentation, and continuous verification.',
        relatedRole: 'Cybersecurity Specialist',
        priority: 'high'
      },
      {
        id: '6',
        title: 'Real-time Data Processing Skills are in Demand',
        content: 'Businesses increasingly need real-time insights from their data. Data engineers with experience in stream processing technologies like Kafka, Flink, and Spark Streaming are highly sought after. Consider building projects that demonstrate your ability to design and implement real-time data pipelines.',
        relatedRole: 'Data Engineer',
        priority: 'medium'
      }
    ];
  }
};