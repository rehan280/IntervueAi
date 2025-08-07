import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ChatInterfaceProps {
  onNewMessage?: (message: Message) => void;
}

export default function ChatInterface({ onNewMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your DeepSeek AI assistant powered by gpt4free. I can help you with code generation, analysis, problem-solving, and more. What would you like to work on today?',
      timestamp: new Date(),
      model: 'DeepSeek-R1'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek-r1');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const availableModels = [
    { id: 'deepseek-r1', name: 'DeepSeek-R1', status: 'active' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', status: 'active' },
    { id: 'claude-3-haiku', name: 'Claude-3 Haiku', status: 'active' },
    { id: 'gemini-pro', name: 'Gemini Pro', status: 'limited' }
  ];

  const scrollToBottom = () => {
    // Find the ScrollArea container instead of scrolling the entire page
    if (messagesEndRef.current) {
      const scrollArea = messagesEndRef.current.closest('.flex-1.p-4');
      if (scrollArea) {
        // Use the ScrollArea's scrollTop property to scroll within the container only
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock API call to G4F
  const sendMessageToG4F = async (message: string, model: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on model
    const mockResponses = {
      'deepseek-r1': `I understand you want to know about "${message}". As DeepSeek-R1, I can provide detailed analysis and reasoning. This is a comprehensive response that demonstrates the thinking process behind the answer. Let me break this down step by step...`,
      'gpt-4o-mini': `Here's a concise response to your query about "${message}". This is optimized for efficiency while maintaining quality.`,
      'claude-3-haiku': `Thanks for your question about "${message}". I'll provide a helpful and harmless response with careful consideration.`,
      'gemini-pro': `Analyzing your request about "${message}". Here's a balanced perspective with multiple viewpoints to consider.`
    };

    return mockResponses[model as keyof typeof mockResponses] || 
           `Thank you for your message: "${message}". This is a response from the ${model} model via gpt4free API.`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessageToG4F(inputValue, selectedModel);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        model: availableModels.find(m => m.id === selectedModel)?.name
      };

      setMessages(prev => [...prev, assistantMessage]);
      onNewMessage?.(assistantMessage);
      
      toast({
        title: "Response Generated",
        description: `Successfully received response from ${assistantMessage.model}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI model",
        variant: "destructive",
      });
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
      title: "Copied",
      description: "Message copied to clipboard",
    });
  };

  const MessageComponent = ({ message }: { message: Message }) => (
    <div className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.role === 'user' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-gradient-primary text-primary-foreground'
      }`}>
        {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 rounded-lg ${
          message.role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card border border-border'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          {message.model && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {message.model}
              </Badge>
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
          message.role === 'user' ? 'justify-end' : 'justify-start'
        }`}>
          <span>{message.timestamp.toLocaleTimeString()}</span>
          {message.role === 'assistant' && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => copyMessage(message.content)}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ThumbsDown className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="h-[600px] flex flex-col bg-card border-border">
      <CardHeader className="flex-shrink-0 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <MessageSquare className="h-5 w-5 text-primary" />
            AI Chat Interface
          </CardTitle>
          <div className="flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-background border border-border rounded-md px-2 py-1 text-sm text-foreground"
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id} disabled={model.status === 'limited'}>
                  {model.name} {model.status === 'limited' ? '(Limited)' : ''}
                </option>
              ))}
            </select>
            <Badge variant={isLoading ? "secondary" : "default"} className={isLoading ? "" : "bg-success"}>
              {isLoading ? "Processing..." : "Ready"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything... (Press Enter to send)"
              className="flex-1 bg-background border-border"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              variant="default"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Powered by gpt4free - Free access to multiple AI models
          </p>
        </div>
      </CardContent>
    </Card>
  );
}