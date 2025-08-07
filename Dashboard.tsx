import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Activity, 
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  RefreshCw
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, trend }) => (
  <Card className="bg-card border-border hover:shadow-card transition-all duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="text-primary">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <p className={`text-xs ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'} flex items-center gap-1`}>
        <TrendingUp className={`h-3 w-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
        {change}
      </p>
    </CardContent>
  </Card>
);

interface ActivityItemProps {
  type: 'query' | 'analysis' | 'insight';
  title: string;
  timestamp: string;
  status: 'completed' | 'processing' | 'error';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ type, title, timestamp, status }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-warning animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'query':
        return 'bg-primary/10 text-primary';
      case 'analysis':
        return 'bg-info/10 text-info';
      case 'insight':
        return 'bg-success/10 text-success';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div>
          <p className="text-sm font-medium text-foreground">{title}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={getTypeColor()}>
              {type}
            </Badge>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [metrics, setMetrics] = useState({
    totalQueries: '2,847',
    activeUsers: '142',
    avgResponseTime: '1.2s',
    successRate: '98.5%'
  });

  const [activities] = useState<ActivityItemProps[]>([
    {
      type: 'query',
      title: 'Natural language processing query',
      timestamp: '2 minutes ago',
      status: 'completed'
    },
    {
      type: 'analysis',
      title: 'Code generation analysis',
      timestamp: '5 minutes ago',
      status: 'processing'
    },
    {
      type: 'insight',
      title: 'Performance optimization insight',
      timestamp: '8 minutes ago',
      status: 'completed'
    },
    {
      type: 'query',
      title: 'Mathematical problem solving',
      timestamp: '12 minutes ago',
      status: 'error'
    }
  ]);

  const [modelStats] = useState([
    { name: 'DeepSeek-R1', usage: 85, status: 'active' },
    { name: 'GPT-4', usage: 72, status: 'active' },
    { name: 'Claude-3', usage: 45, status: 'active' },
    { name: 'Gemini', usage: 33, status: 'limited' }
  ]);

  useEffect(() => {
    // Simulate connection status
    const timer = setTimeout(() => setIsConnected(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              DeepSeek Insights
            </h1>
            <p className="text-muted-foreground">AI-powered analytics and monitoring dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-success" : ""}>
              {isConnected ? "Connected" : "Connecting..."}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="default" size="sm">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Queries"
            value={metrics.totalQueries}
            change="+12.5% from last week"
            icon={<MessageSquare className="h-4 w-4" />}
            trend="up"
          />
          <MetricCard
            title="Active Users"
            value={metrics.activeUsers}
            change="+8.2% from last week"
            icon={<Users className="h-4 w-4" />}
            trend="up"
          />
          <MetricCard
            title="Avg Response Time"
            value={metrics.avgResponseTime}
            change="-0.3s from last week"
            icon={<Zap className="h-4 w-4" />}
            trend="up"
          />
          <MetricCard
            title="Success Rate"
            value={metrics.successRate}
            change="+1.2% from last week"
            icon={<Activity className="h-4 w-4" />}
            trend="up"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Model Usage */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-primary" />
                Model Usage & Performance
              </CardTitle>
              <CardDescription>Real-time model utilization and performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {modelStats.map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{model.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={model.status === 'active' ? 'default' : 'secondary'}
                        className={model.status === 'active' ? 'bg-success' : ''}
                      >
                        {model.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{model.usage}%</span>
                    </div>
                  </div>
                  <Progress value={model.usage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest AI operations and insights</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {activities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Integration Status */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="h-5 w-5 text-primary" />
              G4F API Integration
            </CardTitle>
            <CardDescription>Connection status and available models through gpt4free</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">API Connected</h3>
                <p className="text-sm text-muted-foreground">G4F service is operational</p>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">12 Models</h3>
                <p className="text-sm text-muted-foreground">Available AI models</p>
              </div>
              <div className="text-center p-4 bg-info/10 rounded-lg border border-info/20">
                <TrendingUp className="h-8 w-8 text-info mx-auto mb-2" />
                <h3 className="font-semibold text-foreground">Low Latency</h3>
                <p className="text-sm text-muted-foreground">Optimized performance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}