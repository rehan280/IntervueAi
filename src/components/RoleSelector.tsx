import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

const roles = [
  { id: "software-developer", title: "Software Developer", icon: "💻" },
  { id: "product-manager", title: "Product Manager", icon: "🎯" },
  { id: "ui-ux-designer", title: "UX Designer", icon: "🎨" },
  { id: "data-scientist", title: "Data Scientist", icon: "📊" },
  { id: "hr-executive", title: "HR Executive", icon: "👥" },
  { id: "sales-executive", title: "Sales Executive", icon: "💼" },
  { id: "marketing-manager", title: "Marketing Manager", icon: "📢" },
  { id: "devops-engineer", title: "DevOps Engineer", icon: "⚙️" },
  { id: "frontend-developer", title: "Frontend Developer", icon: "🌐" },
  { id: "backend-developer", title: "Backend Developer", icon: "🖥️" },
  { id: "ai-ml-engineer", title: "AI/ML Engineer", icon: "🤖" },
  { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", icon: "🔒" },
  { id: "business-analyst", title: "Business Analyst", icon: "📈" },
  { id: "finance-analyst", title: "Finance Analyst", icon: "💰" }
];

const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleStartInterview = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 sm:py-10 md:py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <img src="/logo.png" alt="IntervueAi Logo" className="w-32 h-18 sm:w-36 sm:h-20 md:w-40 md:h-22 lg:w-48 lg:h-27 object-contain" />
          </div>
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Briefcase className="w-4 h-4 mr-2" />
            Choose Your Path
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Hi! 👋 I'm your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              IntervueAi Coach
            </span>
          </h2>
          <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-primary">
            Train Smarter. Interview Better.
          </p>
          <p className="text-xl text-muted-foreground mb-2">
            Let's get you prepared for your next big job interview.
          </p>
          <p className="text-lg text-muted-foreground">
            Select your role for a comprehensive 10-question interview session:
          </p>
        </div>
        
        <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Select Your Target Role
                </label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full h-12 text-base bg-background/50 border-border/50">
                    <SelectValue placeholder="Choose a role to practice for..." />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    {roles.map((role) => (
                      <SelectItem 
                        key={role.id} 
                        value={role.id}
                        className="hover:bg-accent/50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{role.icon}</span>
                          <span className="font-medium">{role.title}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedRoleData && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{selectedRoleData.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedRoleData.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Prepare for {selectedRoleData.title.toLowerCase()} interviews
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">10 Questions</Badge>
                    <Badge variant="secondary" className="text-xs">AI Feedback</Badge>
                    <Badge variant="secondary" className="text-xs">Voice Support</Badge>
                    <Badge variant="secondary" className="text-xs">Performance Score</Badge>
                  </div>
                </div>
              )}
              
              <Button 
                variant="hero" 
                size="xl" 
                onClick={handleStartInterview}
                disabled={!selectedRole}
                className="w-full group"
              >
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Start Interview Session
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Each session includes 10 unique AI-generated questions ⚡
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;