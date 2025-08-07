import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Bot, Copy, Send, ThumbsDown, ThumbsUp, Loader2, Sparkles, MessageCircle, Zap, Shield, Brain } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  model: string;
  liked?: boolean;
  disliked?: boolean;
}

interface Model {
  id: string;
  name: string;
  status: 'available' | 'limited';
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

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
    model: 'intervue-ai'
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('intervue-ai');
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCUU5SkCDqqiSIQbPBHhhrQaoPTTHJyOEA';

  // Available models
  const availableModels: Model[] = [
    { id: 'intervue-ai', name: 'IntervueAI', status: 'available' },
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      let scrollArea = messagesEndRef.current.parentElement;
      while (scrollArea && getComputedStyle(scrollArea).overflowY !== 'auto') {
        scrollArea = scrollArea.parentElement;
      }
      
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  };

  // Function to call Gemini API
  const sendMessageToGemini = async (prompt: string, model: string): Promise<string> => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      model: selectedModel,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(inputValue, selectedModel);
      
      const isFallbackResponse = [
        "I'm currently experiencing connection issues",
        "connection issues with my knowledge base",
        "our systems are fully operational",
        "try again later when our systems"
      ].some(phrase => response.includes(phrase));
      
      if (isFallbackResponse && !isUsingFallback) {
        setIsUsingFallback(true);
        
        const systemMessage: Message = {
          id: `system-${Date.now().toString()}`,
          content: "⚠️ We're currently experiencing connection issues with our AI service. Switching to offline mode with limited capabilities. Some responses may be generic.",
          sender: 'system',
          timestamp: new Date(),
          model: 'system',
        };
        
        setMessages(prev => [...prev, systemMessage]);
      }
      
      const botMessage: Message = {
        id: `bot-${Date.now().toString()}`,
        content: response,
        sender: 'bot',
        timestamp: new Date(),
        model: selectedModel,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error in chat:', error);
      
      if (error.message && error.message.includes('403')) {
        toast({
          title: 'Authentication Error',
          description: 'There was an issue authenticating with the AI service. Please try again later.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: `Failed to get response: ${error.message}`,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: 'Copied!',
      description: 'Message copied to clipboard',
    });
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
            {!isUser && !isSystem && (
              <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600 text-xs">
                  {message.model}
                </Badge>
                <span className="text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
            )}
            
            <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
            
            {!isUser && !isSystem && (
              <div className="flex items-center gap-1 mt-3 justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-200"
                  onClick={() => copyMessage(message.content)}
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
                  onClick={() => {
                    setMessages(prev => 
                      prev.map(m => 
                        m.id === message.id 
                          ? { ...m, liked: !m.liked, disliked: false } 
                          : m
                      )
                    );
                  }}
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
                  onClick={() => {
                    setMessages(prev => 
                      prev.map(m => 
                        m.id === message.id 
                          ? { ...m, disliked: !m.disliked, liked: false } 
                          : m
                      )
                    );
                  }}
                >
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            )}
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
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2 text-sm text-white flex-1 lg:flex-none backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                {availableModels.map((model) => (
                  <option key={model.id} value={model.id} disabled={model.status === 'limited'}>
                    {model.name} {model.status === 'limited' ? '(Limited)' : ''}
                  </option>
                ))}
              </select>
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
            <div className="flex gap-3 items-end">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything... (Press Enter to send)"
                className="flex-1 bg-gray-800/50 border-gray-600/50 text-white h-12 lg:h-14 rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
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
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
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
}