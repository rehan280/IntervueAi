import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Activity, 
  Clock, 
  Zap, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Brain,
  Server,
  Globe
} from 'lucide-react';

interface ModelMetrics {
  name: string;
  provider: string;
  status: 'active' | 'limited' | 'offline';
  responseTime: number;
  successRate: number;
  tokensGenerated: number;
  usage: number;
  cost: string;
}

export default function ModelAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  
  const modelMetrics: ModelMetrics[] = [
    {
      name: 'DeepSeek-R1',
      provider: 'DeepSeek',
      status: 'active',
      responseTime: 1.2,
      successRate: 98.5,
      tokensGenerated: 45720,
      usage: 85,
      cost: 'Free'
    },
    {
      name: 'GPT-4o Mini',
      provider: 'OpenAI',
      status: 'active',
      responseTime: 0.8,
      successRate: 99.2,
      tokensGenerated: 32140,
      usage: 72,
      cost: 'Free'
    },
    {
      name: 'Claude-3 Haiku',
      provider: 'Anthropic',
      status: 'active',
      responseTime: 1.5,
      successRate: 97.8,
      tokensGenerated: 28630,
      usage: 45,
      cost: 'Free'
    },
    {
      name: 'Gemini Pro',
      provider: 'Google',
      status: 'limited',
      responseTime: 2.1,
      successRate: 95.6,
      tokensGenerated: 18920,
      usage: 33,
      cost: 'Free'
    },
    {
      name: 'Llama-3.1',
      provider: 'Meta',
      status: 'active',
      responseTime: 1.7,
      successRate: 96.4,
      tokensGenerated: 21450,
      usage: 55,
      cost: 'Free'
    },
    {
      name: 'Mixtral-8x7B',
      provider: 'Mistral',
      status: 'offline',
      responseTime: 0,
      successRate: 0,
      tokensGenerated: 0,
      usage: 0,
      cost: 'Free'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'limited':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'offline':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'limited':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'offline':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const ModelCard = ({ model }: { model: ModelMetrics }) => (
    <Card className="bg-card border-border hover:shadow-card transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">{model.name}</CardTitle>
          <div className="flex items-center gap-2">
            {getStatusIcon(model.status)}
            <Badge className={getStatusColor(model.status)}>
              {model.status}
            </Badge>
          </div>
        </div>
        <CardDescription className="flex items-center gap-1">
          <Server className="h-3 w-3" />
          {model.provider}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Response Time</p>
            <p className="font-semibold text-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {model.responseTime > 0 ? `${model.responseTime}s` : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Success Rate</p>
            <p className="font-semibold text-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {model.successRate > 0 ? `${model.successRate}%` : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Tokens Generated</p>
            <p className="font-semibold text-foreground flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {model.tokensGenerated > 0 ? model.tokensGenerated.toLocaleString() : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Cost</p>
            <p className="font-semibold text-success">{model.cost}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Usage</span>
            <span className="text-foreground">{model.usage}%</span>
          </div>
          <Progress value={model.usage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );

  const totalActiveModels = modelMetrics.filter(m => m.status === 'active').length;
  const avgResponseTime = modelMetrics
    .filter(m => m.responseTime > 0)
    .reduce((acc, m) => acc + m.responseTime, 0) / modelMetrics.filter(m => m.responseTime > 0).length;
  const totalTokens = modelMetrics.reduce((acc, m) => acc + m.tokensGenerated, 0);
  const avgSuccessRate = modelMetrics
    .filter(m => m.successRate > 0)
    .reduce((acc, m) => acc + m.successRate, 0) / modelMetrics.filter(m => m.successRate > 0).length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold text-foreground">{totalActiveModels}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl font-bold text-foreground">{avgResponseTime.toFixed(1)}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Tokens</p>
                <p className="text-2xl font-bold text-foreground">{(totalTokens / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">{avgSuccessRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-primary" />
                Model Analytics
              </CardTitle>
              <CardDescription>Detailed performance metrics for all available AI models</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-background border border-border rounded-md px-3 py-1 text-sm text-foreground"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4" />
                G4F Status
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modelMetrics.map((model, index) => (
                  <ModelCard key={index} model={model} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Response Time Analysis</h3>
                {modelMetrics
                  .filter(m => m.status === 'active')
                  .sort((a, b) => a.responseTime - b.responseTime)
                  .map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-card/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Brain className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{model.name}</p>
                          <p className="text-sm text-muted-foreground">{model.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{model.responseTime}s</p>
                        <p className="text-sm text-success">✓ {model.successRate}%</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="usage" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Token Usage Statistics</h3>
                {modelMetrics
                  .sort((a, b) => b.tokensGenerated - a.tokensGenerated)
                  .map((model, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{model.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {model.tokensGenerated.toLocaleString()} tokens
                        </span>
                      </div>
                      <Progress 
                        value={(model.tokensGenerated / Math.max(...modelMetrics.map(m => m.tokensGenerated))) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}