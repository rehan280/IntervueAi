import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ResumeSettings } from './ResumeCustomizer';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

interface ResumePreviewProps {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  selectedTemplate: string;
  resumeSettings: ResumeSettings;
  onClose: () => void;
  onDownload: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  personalInfo,
  education,
  experience,
  skills,
  projects,
  selectedTemplate,
  resumeSettings,
  onClose,
  onDownload
}) => {
  // Use custom settings if available, otherwise fall back to template defaults
  const getThemeColor = () => {
    // If custom settings are provided, use them
    if (resumeSettings && resumeSettings.themeColor) {
      return resumeSettings.themeColor;
    }
    
    // Fall back to template defaults
    switch (selectedTemplate) {
      case 'modern-blue':
        return '#3B82F6';
      case 'elegant-purple':
        return '#8B5CF6';
      case 'professional-green':
        return '#10B981';
      case 'classic-red':
        return '#EF4444';
      case 'classic-black':
        return '#000000';
      case 'minimal-gray':
        return '#6B7280';
      case 'elegant-serif':
        return '#374151';
      case 'professional-dark':
        return '#1F2937';
      case 'creative-gradient':
        return '#8B5CF6';
      default:
        return '#000000';
    }
  };

  const themeColor = getThemeColor();
  const fontFamily = resumeSettings?.fontFamily || 'Arial, sans-serif';
  const fontSize = resumeSettings?.fontSize || 11;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 resume-preview-modal">
      <style>
        {`
          .gradient-text {
            background: linear-gradient(135deg, ${resumeSettings?.themeColor || themeColor}, ${resumeSettings?.secondaryColor || resumeSettings?.themeColor || themeColor});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div id="no-print" className="flex justify-between items-center p-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold">Resume Preview</h2>
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
              Print
            </Button>
            <Button onClick={onDownload} className="bg-green-600 hover:bg-green-700">
              Download PDF
            </Button>
            <Button onClick={onClose} variant="outline" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div 
            id="print-area"
            className="p-8 shadow-lg resume-content bg-white"
            style={{ 
              borderTop: `4px solid ${themeColor}`,
              fontFamily: fontFamily,
              fontSize: `${fontSize}pt`
            }}
          >
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 
                className={`font-bold text-3xl md:text-4xl lg:text-5xl mb-3 tracking-wide ${
                  resumeSettings?.isGradient ? 'gradient-text' : ''
                }`}
                style={{ 
                  color: resumeSettings?.isGradient ? 'unset' : themeColor
                }}
              >
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              
              {personalInfo.jobTitle && (
                <h2 
                  className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 mb-4"
                >
                  {personalInfo.jobTitle}
                </h2>
              )}
              
              {/* Contact Information */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm md:text-base text-gray-700 mb-4">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phone:</span>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
              </div>
              
              {personalInfo.address && (
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {personalInfo.address}
                </p>
              )}
              
              {/* Social Links */}
              {(personalInfo.linkedin || personalInfo.website) && (
                <div className="flex justify-center gap-4 text-sm md:text-base">
                  {personalInfo.linkedin && (
                    <span className="text-blue-600 hover:underline">LinkedIn: {personalInfo.linkedin}</span>
                  )}
                  {personalInfo.website && (
                    <span className="text-blue-600 hover:underline">Website: {personalInfo.website}</span>
                  )}
                </div>
              )}
            </div>

            {/* Professional Summary */}
            {personalInfo.summary && (
              <div className="mb-8">
                <h2 
                  className={`text-xl md:text-2xl font-bold mb-4 text-center border-b-2 pb-2 ${
                    resumeSettings?.isGradient ? 'gradient-text' : ''
                  }`}
                  style={{ 
                    color: resumeSettings?.isGradient ? 'unset' : themeColor, 
                    borderColor: themeColor 
                  }}
                >
                  Professional Summary
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 text-justify">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Professional Experience */}
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 
                  className={`text-xl md:text-2xl font-bold mb-4 text-center border-b-2 pb-2 ${
                    resumeSettings?.isGradient ? 'gradient-text' : ''
                  }`}
                  style={{ 
                    color: resumeSettings?.isGradient ? 'unset' : themeColor, 
                    borderColor: themeColor 
                  }}
                >
                  Professional Experience
                </h2>
                
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: themeColor }}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 
                          className="text-lg md:text-xl font-bold mb-1"
                          style={{ color: themeColor }}
                        >
                          {exp.position}
                        </h3>
                        <div className="text-sm md:text-base text-gray-600 font-medium">
                          {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          }) : ''} - {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          }) : '')}
                        </div>
                      </div>
                      
                      <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                        {exp.company} - {exp.location}
                      </h4>
                      
                      <div className="text-sm md:text-base leading-relaxed text-gray-700">
                        {exp.description}
                      </div>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm md:text-base text-gray-700 flex items-start">
                              <span className="mr-2" style={{ color: themeColor }}>•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="mb-8">
                <h2 
                  className={`text-xl md:text-2xl font-bold mb-4 text-center border-b-2 pb-2 ${
                    resumeSettings?.isGradient ? 'gradient-text' : ''
                  }`}
                  style={{ 
                    color: resumeSettings?.isGradient ? 'unset' : themeColor, 
                    borderColor: themeColor 
                  }}
                >
                  Education
                </h2>
                
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={edu.id} className="border-l-4 pl-4" style={{ borderColor: themeColor }}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 
                          className="text-lg md:text-xl font-bold mb-1"
                          style={{ color: themeColor }}
                        >
                          {edu.institution}
                        </h3>
                        <div className="text-sm md:text-base text-gray-600 font-medium">
                          {edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          }) : ''} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          }) : ''}
                        </div>
                      </div>
                      
                      <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                        {edu.degree} in {edu.field}
                      </h4>
                      
                      {edu.gpa && (
                        <p className="text-sm md:text-base text-gray-700 mb-2">
                          <span className="font-medium">GPA:</span> {edu.gpa}
                        </p>
                      )}
                      
                      {edu.description && (
                        <p className="text-sm md:text-base leading-relaxed text-gray-700">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 
                  className={`text-xl md:text-2xl font-bold mb-4 text-center border-b-2 pb-2 ${
                    resumeSettings?.isGradient ? 'gradient-text' : ''
                  }`}
                  style={{ 
                    color: resumeSettings?.isGradient ? 'unset' : themeColor, 
                    borderColor: themeColor 
                  }}
                >
                  Skills
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm md:text-base font-medium text-gray-800">{skill.name}</span>
                        <span className="text-xs md:text-sm text-gray-600 capitalize">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: themeColor,
                            width: skill.level === 'beginner' ? '25%' : 
                                   skill.level === 'intermediate' ? '50%' : 
                                   skill.level === 'advanced' ? '75%' : '100%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="mb-8">
                <h2 
                  className={`text-xl md:text-2xl font-bold mb-4 text-center border-b-2 pb-2 ${
                    resumeSettings?.isGradient ? 'gradient-text' : ''
                  }`}
                  style={{ 
                    color: resumeSettings?.isGradient ? 'unset' : themeColor, 
                    borderColor: themeColor 
                  }}
                >
                  Projects
                </h2>
                
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border-l-4 pl-4" style={{ borderColor: themeColor }}>
                      <h3 
                        className="text-lg md:text-xl font-bold mb-2"
                        style={{ color: themeColor }}
                      >
                        {project.name}
                      </h3>
                      
                      {project.description && (
                        <p className="text-sm md:text-base leading-relaxed text-gray-700 mb-3">
                          {project.description}
                        </p>
                      )}
                      
                      {project.technologies.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm md:text-base font-medium text-gray-800">Technologies: </span>
                          <span className="text-sm md:text-base text-gray-700">
                            {project.technologies.join(', ')}
                          </span>
                        </div>
                      )}
                      
                      {project.link && (
                        <div>
                          <span className="text-sm md:text-base font-medium text-gray-800">Link: </span>
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm md:text-base text-blue-600 hover:underline"
                          >
                            {project.link}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview; 