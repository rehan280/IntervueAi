import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Bot, Copy, Send, ThumbsDown, ThumbsUp, Loader2, Sparkles } from 'lucide-react';
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

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
    model: 'gemini-2.0-flash'
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash');
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCUU5SkCDqqiSIQbPBHhhrQaoPTTHJyOEA';

  // Available models
  const availableModels: Model[] = [
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', status: 'available' },
  ];

  // Scroll to bottom when messages change, but only within the chat container
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    // Find the scrollable parent container by traversing up the DOM
    if (messagesEndRef.current) {
      let scrollArea = messagesEndRef.current.parentElement;
      while (scrollArea && getComputedStyle(scrollArea).overflowY !== 'auto') {
        scrollArea = scrollArea.parentElement;
      }
      
      // If we found a scrollable container, scroll it to the bottom
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  };

  // Function to call Gemini API
  const sendMessageToGemini = async (prompt: string, model: string): Promise<string> => {
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
      
      // Check if response contains fallback indicators
      const isFallbackResponse = [
        "I'm currently experiencing connection issues",
        "connection issues with my knowledge base",
        "our systems are fully operational",
        "try again later when our systems"
      ].some(phrase => response.includes(phrase));
      
      // If this is a fallback response and we haven't shown the fallback message yet
      if (isFallbackResponse && !isUsingFallback) {
        setIsUsingFallback(true);
        
        // Add system message about fallback mode
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
      
      // Handle specific HTTP errors
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
    return (
      <div className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
        {message.sender !== 'user' && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center">
            {message.sender === 'system' ? (
              <span className="text-xs font-bold">SYS</span>
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </div>
        )}
        
        <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
          <div 
            className={`inline-block p-3 rounded-lg ${message.sender === 'user' 
              ? 'bg-indigo-600 text-white' 
              : message.sender === 'system'
                ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200'
                : 'bg-gray-800 border border-gray-700 text-white'}`}
          >
            {message.sender !== 'user' && message.sender !== 'system' && (
              <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                  {message.model}
                </Badge>
                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
            )}
            
            <div className="whitespace-pre-wrap">{message.content}</div>
            
            {message.sender === 'bot' && (
              <div className="flex items-center gap-2 mt-2 justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 rounded-full bg-gray-700 hover:bg-gray-600"
                  onClick={() => copyMessage(message.content)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-6 w-6 rounded-full ${message.liked ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
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
                  className={`h-6 w-6 rounded-full ${message.disliked ? 'bg-red-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
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
        
        {message.sender === 'user' && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center">
            <span className="text-xs font-bold">YOU</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full flex flex-col bg-gray-900 border-gray-800 shadow-xl">
      <CardHeader className="border-b border-gray-800 pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span>AI Chat Assistant</span>
              <span className="text-xs text-gray-400 font-normal">Powered by Google Gemini AI</span>
            </div>
          </CardTitle>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-sm text-white flex-1 sm:flex-none"
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id} disabled={model.status === 'limited'}>
                  {model.name} {model.status === 'limited' ? '(Limited)' : ''}
                </option>
              ))}
            </select>
            <Badge variant={isLoading ? "secondary" : "default"} className={isLoading ? "bg-gray-700" : "bg-green-600"}>
              {isLoading ? "Processing..." : "Ready"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-32">
                <div className="text-center text-gray-500">
                  <p className="mb-2">No messages yet</p>
                  <p className="text-sm">Start a conversation by typing a message below</p>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-lg bg-gray-800 border border-gray-700">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                      <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-gray-800 p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything... (Press Enter to send)"
              className="flex-1 bg-gray-800 border-gray-700 text-white h-12"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              variant="default"
              size="icon"
              className="bg-indigo-600 hover:bg-indigo-700 h-12 w-12 rounded-lg"
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
              Powered by Google Gemini AI
            </p>
            <p className="text-xs text-gray-500">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}