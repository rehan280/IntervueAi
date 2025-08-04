export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  style: 'modern' | 'classic' | 'creative' | 'minimal';
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and professional with blue accents',
    preview: 'Modern design with blue color scheme',
    style: 'modern'
  },
  {
    id: 'classic-black',
    name: 'Classic Black',
    description: 'Traditional black and white layout',
    preview: 'Traditional black and white design',
    style: 'classic'
  },
  {
    id: 'creative-gradient',
    name: 'Creative Gradient',
    description: 'Modern with gradient colors',
    preview: 'Creative design with gradients',
    style: 'creative'
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    description: 'Simple and clean minimal design',
    preview: 'Minimal and clean layout',
    style: 'minimal'
  },
  {
    id: 'professional-dark',
    name: 'Professional Dark',
    description: 'Dark theme for modern professionals',
    preview: 'Dark professional theme',
    style: 'modern'
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    description: 'Elegant design with serif typography',
    preview: 'Elegant serif typography',
    style: 'classic'
  }
];

export const getTemplateById = (id: string) => {
  return resumeTemplates.find(template => template.id === id);
};

export const getTemplatesByStyle = (style: string) => {
  return resumeTemplates.filter(template => template.style === style);
}; 