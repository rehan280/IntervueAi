"use client";
import React from "react";
import dynamic from "next/dynamic";

// Use dynamic import to avoid SSR issues with the ChatInterface component
const ChatInterface = dynamic(() => import("../../src/components/ChatInterface"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-800/50 rounded-xl border border-gray-700">
      <div className="flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          <div className="h-3 w-3 bg-indigo-400 rounded-full animate-pulse"></div>
          <div className="h-3 w-3 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
          <div className="h-3 w-3 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
        </div>
        <p className="text-gray-400">Loading AI Assistant...</p>
      </div>
    </div>
  ),
});

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-indigo-900/30 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.02A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            AI ASSISTANT
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-4">Chat with AI Assistant</h1>
        <p className="text-gray-400 text-center mb-8">
          Get help with interview preparation, technical questions, and career advice from our AI assistant.
        </p>
        
        <div className="h-[600px] mb-8">
          <ChatInterface />
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            How to Use the AI Assistant
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-indigo-300 mb-2">Interview Preparation</h3>
              <p className="text-gray-300 text-sm">Ask for interview questions, tips for specific roles, or feedback on your answers.</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-indigo-300 mb-2">Technical Help</h3>
              <p className="text-gray-300 text-sm">Get explanations for technical concepts, coding problems, or system design questions.</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-indigo-300 mb-2">Career Advice</h3>
              <p className="text-gray-300 text-sm">Ask about career paths, skill development, or industry trends in your field.</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-medium text-indigo-300 mb-2">Resume Tips</h3>
              <p className="text-gray-300 text-sm">Get advice on improving your resume, highlighting skills, or tailoring it for specific roles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}