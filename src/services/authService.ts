import { useEffect } from 'react';

export interface Session {
  _id: string;
  name: string;
  email: string;
  profile?: {
    avatar: string | null;
    bio: string;
    location: string;
    website: string;
    linkedin: string;
  };
  stats?: {
    interviewsCompleted: number;
    averageScore: number;
    totalPracticeTime: number;
  };
}

type AuthChangeListener = (session: Session | null) => void;

class AuthService {
  private listeners: AuthChangeListener[] = [];
  private googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '816016163258-kqdbmk05mo8t5nmdu8s3e18lirovd31l.apps.googleusercontent.com';
  
  constructor() {
    // Initialize Google API script
    this.loadGoogleApi();
  }

  private loadGoogleApi() {
    if (typeof window !== 'undefined' && !document.getElementById('google-api')) {
      const script = document.createElement('script');
      script.id = 'google-api';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  private initializeGoogleAuth() {
    return new Promise<void>((resolve, reject) => {
      if (typeof window !== 'undefined' && window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: this.handleGoogleCallback.bind(this),
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          resolve();
        } catch (error) {
          console.error('Failed to initialize Google Auth:', error);
          reject(error);
        }
      } else {
        const checkGoogleInterval = setInterval(() => {
          if (typeof window !== 'undefined' && window.google) {
            clearInterval(checkGoogleInterval);
            try {
              window.google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: this.handleGoogleCallback.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true,
              });
              resolve();
            } catch (error) {
              console.error('Failed to initialize Google Auth:', error);
              reject(error);
            }
          }
        }, 100);

        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkGoogleInterval);
          reject(new Error('Google API failed to load after timeout'));
        }, 5000);
      }
    });
  }

  private async handleGoogleCallback(response: any) {
    try {
      const result = await fetch('/api/auth/google/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential
        })
      });

      const data = await result.json();

      if (result.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        this.notifyListeners(data.user);
      } else {
        console.error('Google Sign-In failed:', data.message);
        this.notifyListeners(null);
      }
    } catch (err) {
      console.error('Google Sign-In error:', err);
      this.notifyListeners(null);
    }
  }

  async getSession(): Promise<Session | null> {
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userJson || !token) {
      return null;
    }

    try {
      // Verify token with backend
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return JSON.parse(userJson);
      } else {
        // Token is invalid, clear session
        this.signOut();
        return null;
      }
    } catch (error) {
      console.error('Error verifying session:', error);
      return JSON.parse(userJson); // Return user from localStorage if backend is unavailable
    }
  }

  async signIn(provider: string = 'google'): Promise<boolean> {
    if (provider === 'google') {
      try {
        await this.initializeGoogleAuth();
        window.google.accounts.id.prompt();
        return true;
      } catch (error) {
        console.error('Google Sign-In error:', error);
        return false;
      }
    }
    return false;
  }

  async signOut(): Promise<boolean> {
    try {
      // Call backend logout endpoint (optional)
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Notify listeners
      this.notifyListeners(null);
      
      return true;
    } catch (error) {
      console.error('Error during sign out:', error);
      return false;
    }
  }

  onAuthStateChange(callback: AuthChangeListener): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(session: Session | null) {
    this.listeners.forEach(listener => listener(session));
  }
}

// Add type definition for window object
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (notification?: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
        };
      };
    };
  }
}

const authService = new AuthService();
export default authService;