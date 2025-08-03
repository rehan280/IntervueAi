import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/logo.png" alt="IntervueAi Logo" className="w-6 h-4 sm:w-7 sm:h-5 md:w-8 md:h-6 lg:w-10 lg:h-7 object-contain" />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              IntervueAi
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link to="/test" className="text-muted-foreground hover:text-foreground transition-colors">
              Test
            </Link>
            <Link to="/coding-practice" className="text-muted-foreground hover:text-foreground transition-colors">
              Code Practice
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden md:block">
                  Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            ) : (
              <SignInButton>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </SignInButton>
            )}
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;