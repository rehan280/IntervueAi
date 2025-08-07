import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-400">Error</h1>
            <p className="text-xl">Something went wrong</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy load components to identify which one causes issues
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));
const Hero = React.lazy(() => import('./components/Hero'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const CodingPractice = React.lazy(() => import('./components/CodingPractice'));
const InterviewPractice = React.lazy(() => import('./pages/InterviewPractice'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const ResumeBuilder = React.lazy(() => import('./pages/ResumeBuilder'));
const Login = React.lazy(() => import('./pages/Login'));
const Insights = React.lazy(() => import('./pages/Insights'));
const Chat = React.lazy(() => import('./pages/Chat'));

// Loading component
const Loading = () => (
  <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
      <p>Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App w-full min-h-screen bg-gray-900 overflow-x-hidden">
          <React.Suspense fallback={<Loading />}>
            <Header />
          </React.Suspense>
          <main className="w-full overflow-x-hidden">
            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/coding-practice" element={<CodingPractice />} />
                <Route path="/interview-practice" element={<InterviewPractice />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </React.Suspense>
          </main>
          <React.Suspense fallback={<Loading />}>
            <Footer />
          </React.Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
