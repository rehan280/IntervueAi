import { useState } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoleSelector from "@/components/RoleSelector";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";
import Footer from "@/components/Footer";

type AppState = "landing" | "role-selection" | "interview" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [interviewResults, setInterviewResults] = useState<any>(null);

  const handleStartInterview = () => {
    setCurrentState("role-selection");
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentState("interview");
  };

  const handleInterviewComplete = (results: any) => {
    setInterviewResults(results);
    setCurrentState("results");
  };

  const handleStartNew = () => {
    setSelectedRole("");
    setInterviewResults(null);
    setCurrentState("role-selection");
  };

  const handleBackToRoleSelection = () => {
    setCurrentState("role-selection");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {currentState === "landing" && (
          <Hero onStartInterview={handleStartInterview} />
        )}
        
        <SignedIn>
          {currentState === "role-selection" && (
            <RoleSelector onRoleSelect={handleRoleSelect} />
          )}
          
          {currentState === "interview" && (
            <InterviewSession 
              role={selectedRole}
              onComplete={handleInterviewComplete}
              onBack={handleBackToRoleSelection}
            />
          )}
          
          {currentState === "results" && interviewResults && (
            <InterviewResults 
              results={interviewResults}
              onStartNew={handleStartNew}
            />
          )}
        </SignedIn>
        
        <SignedOut>
          {currentState !== "landing" && <RedirectToSignIn />}
        </SignedOut>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
