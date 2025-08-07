import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, ThumbsDown, Bot, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // API key for Gemini
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCUU5SkCDqqiSIQbPBHhhrQaoPTTHJyOEA';
  const model = 'gemini-2.0-flash';

  // Add initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your AI assistant powered by Google Gemini. How can I help you today?',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll to bottom of messages only within the chat container
  useEffect(() => {
    if (messagesEndRef.current) {
      // Find the scrollable parent container by traversing up the DOM
      let chatContainer = messagesEndRef.current.parentElement;
      while (chatContainer && getComputedStyle(chatContainer).overflowY !== 'auto') {
        chatContainer = chatContainer.parentElement;
      }
      
      // If we found a scrollable container, scroll it to the bottom
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  // Function to copy message content to clipboard
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Message copied to clipboard');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Generate response using Gemini API
      const response = await generateGeminiContent(input);
      
      // Check if we're using fallback mode (simple heuristic based on response patterns)
      const isFallbackResponse = response.includes("I'm currently experiencing connection issues") || 
                               response.includes("Here are some general interview tips") ||
                               response.includes("No response from Gemini API");
      
      // Update fallback state if needed
      if (isFallbackResponse && !isUsingFallback) {
        setIsUsingFallback(true);
        
        // Add system message about fallback mode
        const systemMessage: Message = {
          id: Date.now().toString(),
          text: "⚠️ Notice: I'm currently operating in offline mode due to connection issues with our AI service. I'll provide helpful interview tips based on your questions, but with limited functionality. Our team is working to restore full service.",
          sender: 'system',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, systemMessage]);
      }

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Create a more informative error message
      let errorText = 'Sorry, I encountered an error. Please try again later.';
      
      // Check if it's an API error
      if (error instanceof Error && error.message.includes('HTTP error! status: 403')) {
        errorText = 'Sorry, I cannot connect to the AI service right now due to authentication issues. Our team has been notified and is working on a fix. Please try again later.';
      } else if (error instanceof Error) {
        errorText = `Sorry, I encountered an error: ${error.message}. Please try again later.`;
      }
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle like/dislike functionality
  const handleFeedback = (messageId: string, isLike: boolean) => {
    setMessages(prev => 
      prev.map(m => 
        m.id === messageId 
          ? { 
              ...m, 
              liked: isLike ? !m.liked : false, 
              disliked: !isLike ? !m.disliked : false 
            } 
          : m
      )
    );
  };

  // Function to generate content using Gemini API
  const generateGeminiContent = async (prompt: string): Promise<string> => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          }
        }
      );
      
      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini API';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-xl">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center">
        <div className="h-3 w-3 bg-indigo-500 rounded-full mr-2"></div>
        <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto max-h-[500px]">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender !== 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                  {message.sender === 'system' ? (
                    <span className="text-xs font-bold">SYS</span>
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
              )}
              
              <div className={`flex-1 max-w-[85%] sm:max-w-[75%] ${message.sender === 'user' ? 'text-right' : ''}`}>
                <div 
                  className={`inline-block p-3 rounded-lg ${message.sender === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : message.sender === 'system'
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                      : 'bg-gray-800 border border-gray-700 text-white'}`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                  
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                    <span>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>
                    
                    {message.sender === 'bot' && (
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-full bg-gray-700 hover:bg-gray-600"
                          onClick={() => copyMessage(message.text)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-6 w-6 rounded-full ${message.liked ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                          onClick={() => handleFeedback(message.id, true)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-6 w-6 rounded-full ${message.disliked ? 'bg-red-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                          onClick={() => handleFeedback(message.id, false)}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <span className="text-xs font-bold">YOU</span>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                  <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center disabled:bg-indigo-800 disabled:text-indigo-300 transition-all duration-200"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xs text-gray-500">Powered by AI Assistant</p>
          <Badge variant="outline" className="text-xs bg-gray-800 text-gray-400 border-gray-700">
            {isLoading ? "Processing..." : "Ready"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;