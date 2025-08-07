import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, ThumbsDown, Bot, Send, MessageCircle, Zap, Shield, Brain, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
}

// Vector Logo Component
const ChatLogo = () => (
  <div className="relative">
    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
      <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
        <MessageCircle className="w-4 h-4 text-indigo-600" />
      </div>
    </div>
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
      <div className="w-2 h-2 bg-white rounded-full"></div>
    </div>
  </div>
);

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
        text: 'Hello! I\'m your AI assistant powered by IntervueAI. How can I help you today?',
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
    // You can replace this with a toast notification if available
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
        id: Date.now().toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again in a moment.",
        sender: 'system',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId: string, isLike: boolean) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { 
              ...message, 
              liked: isLike ? !message.liked : false, 
              disliked: !isLike ? !message.disliked : false 
            } 
          : message
      )
    );
  };

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
      
      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from IntervueAI';
    } catch (error) {
      console.error('Error calling IntervueAI:', error);
      throw error;
    }
  };

  const formatTimestamp = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const MessageComponent = ({ message }: { message: Message }) => {
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';
    
    return (
      <div className={`flex gap-3 ${isUser ? 'justify-end' : ''} animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}>
        {!isUser && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
            {isSystem ? (
              <Shield className="w-5 h-5" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
          </div>
        )}
        
        <div className={`flex-1 max-w-[85%] sm:max-w-[75%] ${isUser ? 'text-right' : ''}`}>
          <div 
            className={`inline-block p-4 rounded-2xl shadow-lg ${
              isUser 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25' 
                : isSystem
                  ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-200 shadow-amber-500/10'
                  : 'bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 text-white shadow-gray-900/50'
            }`}
          >
            <div className="whitespace-pre-wrap leading-relaxed">{message.text}</div>
            
            {!isUser && !isSystem && (
              <div className="flex items-center gap-1 mt-3 justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200"
                  onClick={() => copyMessage(message.text)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-full transition-all duration-200 ${
                    message.liked 
                      ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                  onClick={() => handleFeedback(message.id, true)}
                >
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-full transition-all duration-200 ${
                    message.disliked 
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                  onClick={() => handleFeedback(message.id, false)}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2">
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-800 flex items-center justify-center shadow-lg">
            <span className="text-sm font-semibold">YOU</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Full width chat interface */}
      <div className="w-full h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="text-xl lg:text-2xl text-white flex items-center gap-3">
              <ChatLogo />
              <div className="flex flex-col">
                <span className="font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI Chat Assistant
                </span>
                <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                  <Zap className="w-3 h-3 text-indigo-400" />
                  Powered by IntervueAI
                </span>
              </div>
            </div>
            
            <Badge 
              variant={isLoading ? "secondary" : "default"} 
              className={`${
                isLoading 
                  ? "bg-gray-700/80 text-gray-300" 
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              } backdrop-blur-sm transition-all duration-200`}
            >
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Ready
                </div>
              )}
            </Badge>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-32">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                  <p className="mb-2 font-medium">No messages yet</p>
                  <p className="text-sm">Start a conversation by typing a message below</p>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex-1 max-w-[75%]">
                  <div className="inline-block p-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-300 font-medium">Thinking...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything... (Press Enter to send)"
                className="flex-1 bg-gray-800/50 border border-gray-600/50 text-white h-12 lg:h-14 rounded-xl px-4 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                variant="default"
                size="icon"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 lg:h-14 w-12 lg:w-14 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Zap className="w-3 h-3 text-indigo-400" />
                Powered by IntervueAI
              </p>
              <p className="text-xs text-gray-500">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;