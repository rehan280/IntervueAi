import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DirectAnalysisTest from "./components/DirectAnalysisTest";
import HowItWorks from "./pages/HowItWorks";
import CodingPractice from "./components/CodingPractice";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<DirectAnalysisTest />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/coding-practice" element={<CodingPractice />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
