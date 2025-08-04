import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Palette, Sparkles, Zap, Minus } from 'lucide-react';
import { ResumeTemplate } from '@/services/resumeTemplates';
import { ResumeSettings } from './ResumeCustomizer';

interface TemplateSelectorProps {
  selectedTemplate: string;
  resumeSettings?: ResumeSettings;
  onTemplateSelect: (templateId: string) => void;
  onClose: () => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  resumeSettings,
  onTemplateSelect,
  onClose
}) => {
  const templates = [
    {
      id: 'modern-blue',
      name: 'Modern Blue',
      description: 'Clean and professional with blue accents',
      style: 'modern',
      icon: <Palette className="w-5 h-5" />,
      colors: ['bg-blue-500', 'bg-blue-600', 'bg-blue-700']
    },
    {
      id: 'classic-black',
      name: 'Classic Black',
      description: 'Traditional black and white layout',
      style: 'classic',
      icon: <Minus className="w-5 h-5" />,
      colors: ['bg-gray-800', 'bg-gray-700', 'bg-gray-600']
    },
    {
      id: 'creative-gradient',
      name: 'Creative Gradient',
      description: 'Modern with gradient colors',
      style: 'creative',
      icon: <Sparkles className="w-5 h-5" />,
      colors: ['bg-gradient-to-r from-purple-500 to-pink-500', 'bg-gradient-to-r from-blue-500 to-purple-500', 'bg-gradient-to-r from-green-400 to-blue-500']
    },
    {
      id: 'minimal-gray',
      name: 'Minimal Gray',
      description: 'Simple and clean minimal design',
      style: 'minimal',
      icon: <Minus className="w-5 h-5" />,
      colors: ['bg-gray-200', 'bg-gray-300', 'bg-gray-400']
    },
    {
      id: 'professional-dark',
      name: 'Professional Dark',
      description: 'Dark theme for modern professionals',
      style: 'modern',
      icon: <Zap className="w-5 h-5" />,
      colors: ['bg-gray-900', 'bg-gray-800', 'bg-gray-700']
    },
    {
      id: 'elegant-serif',
      name: 'Elegant Serif',
      description: 'Elegant design with serif typography',
      style: 'classic',
      icon: <Palette className="w-5 h-5" />,
      colors: ['bg-gray-100', 'bg-gray-200', 'bg-gray-300']
    }
  ];

  const getStyleBadge = (style: string) => {
    const styleColors = {
      modern: 'bg-blue-100 text-blue-800',
      classic: 'bg-gray-100 text-gray-800',
      creative: 'bg-purple-100 text-purple-800',
      minimal: 'bg-green-100 text-green-800'
    };
    return styleColors[style as keyof typeof styleColors] || 'bg-gray-100 text-gray-800';
  };

  const isGradientTemplate = (templateId: string) => {
    return templateId === 'creative-gradient';
  };

  const handleTemplateSelect = (templateId: string) => {
    // If selecting a gradient template, suggest enabling gradient mode
    if (isGradientTemplate(templateId) && resumeSettings && !resumeSettings.isGradient) {
      if (window.confirm('This template works best with gradient colors. Would you like to enable gradient mode in the customizer?')) {
        // This will be handled by the parent component
      }
    }
    onTemplateSelect(templateId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Choose Template</h2>
            <p className="text-gray-300 text-sm mt-1">Select a template for your resume</p>
          </div>
          <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
            Close
          </Button>
        </div>

        {/* Template Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedTemplate === template.id 
                    ? 'ring-2 ring-blue-500 bg-gray-700' 
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {template.icon}
                      <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                    </div>
                    {selectedTemplate === template.id && (
                      <Check className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <Badge className={`text-xs ${getStyleBadge(template.style)}`}>
                    {template.style}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm mb-4">{template.description}</p>
                  
                  {/* Color Preview */}
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {template.colors.map((color, index) => (
                        <div 
                          key={index}
                          className={`w-8 h-3 rounded ${color}`}
                        />
                      ))}
                    </div>
                    
                    {/* Template Preview */}
                    <div className="bg-gray-600 rounded p-3 space-y-2">
                      <div className="h-2 bg-gray-500 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-500 rounded w-1/2"></div>
                      <div className="h-2 bg-gray-500 rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-gray-300 text-sm">
              <p>• Modern templates are perfect for tech and creative roles</p>
              <p>• Classic templates work well for traditional industries</p>
              <p>• Minimal templates are great for clean, focused resumes</p>
            </div>
            <Button 
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Apply Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector; 