"use client";
import React, { useState } from "react";

const industries = [
  { name: "Technology", subIndustries: ["Software", "Hardware", "AI/ML", "Cybersecurity"] },
  { name: "Healthcare", subIndustries: ["Pharmaceuticals", "Medical Devices", "Health IT", "Biotech"] },
  { name: "Finance", subIndustries: ["Banking", "Insurance", "Fintech", "Investment"] },
  { name: "Retail", subIndustries: ["E-commerce", "Brick-and-Mortar", "Supply Chain", "Fashion"] },
  { name: "Energy", subIndustries: ["Oil & Gas", "Renewables", "Utilities", "Nuclear"] },
];

export default function InsightsPage() {
  const [industry, setIndustry] = useState("");
  const [subIndustry, setSubIndustry] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedIndustry = industries.find((ind) => ind.name === industry);

  const handleFetchInsight = async () => {
    setLoading(true);
    setInsight('');
    setError('');
    try {
      // Use the GoogleGenerativeAI directly instead of the API route
      // This ensures consistent behavior with the dashboard
      const genAI = await import('@google/generative-ai');
      const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!API_KEY) {
        throw new Error('Gemini API key not found in environment variables');
      }
      
      try {
        const googleAI = new genAI.GoogleGenerativeAI(API_KEY);
        const model = googleAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        
        const prompt = `Give me a detailed, up-to-date, and actionable industry insight for the following industry: ${industry}${subIndustry ? `, specifically in the sub-industry: ${subIndustry}` : ''}. Include current trends, challenges, opportunities, and future outlook.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        setInsight(text);
      } catch (apiError: any) {
        console.error('Gemini API error:', apiError);
        
        // Provide a fallback response for demo purposes
        const fallbackInsight = `# ${industry} Industry Insights${subIndustry ? ` - ${subIndustry}` : ''}\n\n` +
          `## Current Trends\n\n` +
          `The ${industry} industry${subIndustry ? `, particularly in ${subIndustry},` : ''} is experiencing significant growth and transformation. ` +
          `Companies are investing heavily in digital technologies to improve efficiency and customer experience. ` +
          `There's a growing emphasis on sustainability and ethical practices.\n\n` +
          `## Challenges\n\n` +
          `Organizations face increasing regulatory scrutiny and compliance requirements. ` +
          `Talent acquisition and retention remain difficult in a competitive market. ` +
          `Cybersecurity threats continue to evolve and pose significant risks.\n\n` +
          `## Opportunities\n\n` +
          `AI and machine learning offer opportunities for automation and data-driven decision making. ` +
          `Remote work has expanded the available talent pool beyond geographical limitations. ` +
          `New markets are emerging as digital transformation accelerates globally.\n\n` +
          `## Future Outlook\n\n` +
          `The ${industry} sector is projected to grow at 15-20% annually over the next five years. ` +
          `Companies that embrace innovation and agility will likely outperform competitors. ` +
          `Strategic partnerships and ecosystem collaboration will become increasingly important for success.`;
        
        setInsight(fallbackInsight);
        setError('Note: Using offline mode due to API connectivity issues. This is simulated content for demonstration purposes.');
      }
    } catch (err: any) {
      console.error('Error in insight generation process:', err);
      setError(err.message || 'Failed to generate insight. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-indigo-900/30 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            AI-POWERED INDUSTRY INSIGHTS
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-4">Industry Trends & Insights</h1>
        <p className="text-gray-400 text-center mb-8">
          Stay ahead of the curve with AI-powered insights about the most in-demand technologies, frameworks, and skills in the tech industry.
        </p>
        
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Custom Industry Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Industry</label>
              <select
                value={industry}
                onChange={e => { setIndustry(e.target.value); setSubIndustry(""); setInsight(""); setError(""); }}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select an industry</option>
                {industries.map(ind => (
                  <option key={ind.name} value={ind.name}>{ind.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Sub-Industry</label>
              <select
                value={subIndustry}
                onChange={e => { setSubIndustry(e.target.value); setInsight(""); setError(""); }}
                disabled={!industry}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-800 disabled:text-gray-500"
              >
                <option value="">Select a sub-industry</option>
                {selectedIndustry?.subIndustries.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleFetchInsight}
              disabled={!industry || !subIndustry || loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center disabled:bg-indigo-800 disabled:text-indigo-300 transition-all duration-200 min-w-[150px]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Get Insight
                </>
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {insight && (
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl shadow-lg prose prose-invert max-w-none">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <svg className="h-5 w-5 mr-2 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Industry Analysis
            </h3>
            <div className="whitespace-pre-line">
              {insight}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

