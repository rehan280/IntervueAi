import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Eye, EyeOff, Mail, Lock, User, Github, Chrome } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onClose();
    }, 1500);
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      // The response object contains a credential field with the JWT token
      const { credential } = response;
      
      if (!credential) {
        throw new Error('No credential received from Google');
      }

      const result = await fetch('/api/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential })
      });

      const data = await result.json();

      if (result.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLoginSuccess();
        onClose();
      } else {
        console.error('Google Sign-In failed:', data.message);
      }
    } catch (err) {
      console.error('Google callback error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'google') {
      // Use Google Identity Services API
      if (window.google && window.google.accounts && window.google.accounts.id) {
        // Make sure Google Identity Services is initialized with client ID before prompting
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '816016163258-kqdbmk05mo8t5nmdu8s3e18lirovd31l.apps.googleusercontent.com';
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.prompt();
      } else {
        // Fallback if Google API isn't loaded yet
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '816016163258-kqdbmk05mo8t5nmdu8s3e18lirovd31l.apps.googleusercontent.com';
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCallback,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          window.google.accounts.id.prompt();
        };
        document.head.appendChild(script);
      }
    } else {
      // Handle other providers or show not implemented message
      setIsLoading(true);
      // Simulate API call for other providers
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess();
        onClose();
      }, 1500);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    
    // Initialize Google Identity Services when modal opens
    const loadGoogleApi = async () => {
      try {
        // Get client ID from environment variable
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '816016163258-kqdbmk05mo8t5nmdu8s3e18lirovd31l.apps.googleusercontent.com';
        
        if (typeof window !== 'undefined' && !document.getElementById('google-api-modal')) {
          const script = document.createElement('script');
          script.id = 'google-api-modal';
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          
          script.onload = () => {
            if (window.google) {
              window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleCallback,
                auto_select: false,
                cancel_on_tap_outside: true,
              });
            }
          };
          
          document.head.appendChild(script);
        } else if (window.google) {
          // Google API already loaded, initialize
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCallback,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
        }
      } catch (err) {
        console.error('Google API failed to load:', err);
      }
    };
    
    loadGoogleApi();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900/95 border border-gray-700/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/logo.png" alt="IntervueAi Logo" className="w-8 h-6 object-contain" />
              <div>
                <CardTitle className="text-2xl text-white">Welcome to IntervueAi</CardTitle>
                <p className="text-sm text-gray-400">Train Smarter. Interview Better.</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-blue-600">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-blue-600">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                    className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('github')}
                    disabled={isLoading}
                    className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-gray-300">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="pl-10 pr-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className="text-gray-300">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginModal;