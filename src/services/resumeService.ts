import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

interface ResumeSettings {
  themeColor: string;
  secondaryColor?: string;
  fontFamily: string;
  fontSize: number;
  documentSize: 'letter' | 'a4';
  isGradient: boolean;
}

export const generatePDF = (
  personalInfo: PersonalInfo,
  education: Education[],
  experience: Experience[],
  skills: Skill[],
  projects: Project[],
  selectedTemplate: string = 'modern-blue',
  resumeSettings?: ResumeSettings
) => {
  const doc = new jsPDF();
  
  // Get theme color based on custom settings or template
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
  const fontFamily = resumeSettings?.fontFamily || 'helvetica';
  const fontSize = resumeSettings?.fontSize || 11;
  
  // Set font based on custom settings or template
  const getTemplateFont = () => {
    // If custom settings are provided, use them
    if (resumeSettings && resumeSettings.fontFamily) {
      // Map common font names to jsPDF supported fonts
      const fontMap: { [key: string]: string } = {
        'Roboto': 'helvetica',
        'Lato': 'helvetica',
        'Montserrat': 'helvetica',
        'Open Sans': 'helvetica',
        'Raleway': 'helvetica',
        'Noto Serif': 'times',
        'Lora': 'times',
        'Roboto Slab': 'helvetica',
        'Playfair Display': 'times',
        'Merriweather': 'times',
        'Times New Roman': 'times',
        'Arial': 'helvetica'
      };
      return fontMap[resumeSettings.fontFamily] || 'helvetica';
    }
    
    // Fall back to template defaults
    switch (selectedTemplate) {
      case 'elegant-serif':
        return 'times';
      case 'minimal-gray':
        return 'helvetica';
      case 'professional-dark':
        return 'helvetica';
      default:
        return 'helvetica';
    }
  };

  const font = getTemplateFont();
  doc.setFont(font);
  doc.setFontSize(fontSize);
  
  // Top border
  doc.setFillColor(themeColor);
  doc.rect(0, 0, 210, 8, 'F');
  
  let yPos = 25;
  
  // Header with name
  doc.setFontSize(28);
  doc.setFont(font, 'bold');
  doc.setTextColor(themeColor);
  doc.text(`${personalInfo.firstName} ${personalInfo.lastName}`, 105, yPos, { align: 'center' });
  yPos += 15;
  
  // Job title
  if (personalInfo.jobTitle) {
    doc.setFontSize(16);
    doc.setFont(font, 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(personalInfo.jobTitle, 105, yPos, { align: 'center' });
    yPos += 10;
  }
  
  // Contact Information
  const contactInfo = [];
  if (personalInfo.email) contactInfo.push(personalInfo.email);
  if (personalInfo.phone) contactInfo.push(personalInfo.phone);
  if (personalInfo.address) contactInfo.push(personalInfo.address);
  
  if (contactInfo.length > 0) {
    doc.setFontSize(11);
    doc.setFont(font, 'normal');
    doc.setTextColor(100, 100, 100);
    
    contactInfo.forEach((info, index) => {
      doc.text(info, 105, yPos, { align: 'center' });
      yPos += 6;
    });
  }
  
  // Social Links
  const socialLinks = [];
  if (personalInfo.linkedin) socialLinks.push(`LinkedIn: ${personalInfo.linkedin}`);
  if (personalInfo.website) socialLinks.push(`Website: ${personalInfo.website}`);
  
  if (socialLinks.length > 0) {
    yPos += 5;
    doc.setFontSize(10);
    doc.setTextColor(59, 130, 246); // Blue color for links
    
    socialLinks.forEach((link, index) => {
      doc.text(link, 105, yPos, { align: 'center' });
      yPos += 5;
    });
  }
  
  yPos += 10;
  
  // Professional Summary
  if (personalInfo.summary) {
    // Section header
    doc.setFontSize(16);
    doc.setFont(font, 'bold');
    doc.setTextColor(themeColor);
    doc.text('Professional Summary', 105, yPos, { align: 'center' });
    yPos += 8;
    
    // Section line
    doc.setDrawColor(themeColor);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    // Summary text
    doc.setFontSize(11);
    doc.setFont(font, 'normal');
    doc.setTextColor(0, 0, 0);
    
    const summaryLines = doc.splitTextToSize(personalInfo.summary, 170);
    doc.text(summaryLines, 20, yPos);
    yPos += summaryLines.length * 5 + 15;
  }
  
  // Professional Experience
  if (experience.length > 0) {
    // Section header
    doc.setFontSize(16);
    doc.setFont(font, 'bold');
    doc.setTextColor(themeColor);
    doc.text('Professional Experience', 105, yPos, { align: 'center' });
    yPos += 8;
    
    // Section line
    doc.setDrawColor(themeColor);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    experience.forEach((exp, index) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // Left border for experience item
      doc.setFillColor(themeColor);
      doc.rect(20, yPos - 2, 3, 15, 'F');
      
      // Position title
      doc.setFontSize(14);
      doc.setFont(font, 'bold');
      doc.setTextColor(themeColor);
      doc.text(exp.position, 30, yPos);
      
      // Date range (right aligned)
      const startDate = exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }) : '';
      const endDate = exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }) : '');
      const dateRange = `${startDate} - ${endDate}`;
      doc.setFontSize(11);
      doc.setFont(font, 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(dateRange, 190, yPos, { align: 'right' });
      yPos += 6;
      
      // Company and location
      doc.setFontSize(12);
      doc.setFont(font, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${exp.company} - ${exp.location}`, 30, yPos);
      yPos += 6;
      
      // Description
      if (exp.description) {
        doc.setFontSize(11);
        doc.setFont(font, 'normal');
        doc.setTextColor(0, 0, 0);
        const descLines = doc.splitTextToSize(exp.description, 160);
        doc.text(descLines, 30, yPos);
        yPos += descLines.length * 5;
      }
      
      // Achievements
      if (exp.achievements && exp.achievements.length > 0) {
        exp.achievements.forEach((achievement) => {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
          doc.setFontSize(11);
          doc.setFont(font, 'normal');
          doc.setTextColor(0, 0, 0);
          const achievementLines = doc.splitTextToSize(`• ${achievement}`, 160);
          doc.text(achievementLines, 30, yPos);
          yPos += achievementLines.length * 5;
        });
      }
      yPos += 10;
    });
  }
  
  // Education
  if (education.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Section header
    doc.setFontSize(16);
    doc.setFont(font, 'bold');
    doc.setTextColor(themeColor);
    doc.text('Education', 105, yPos, { align: 'center' });
    yPos += 8;
    
    // Section line
    doc.setDrawColor(themeColor);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    education.forEach((edu) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // Left border for education item
      doc.setFillColor(themeColor);
      doc.rect(20, yPos - 2, 3, 15, 'F');
      
      // Institution name
      doc.setFontSize(14);
      doc.setFont(font, 'bold');
      doc.setTextColor(themeColor);
      doc.text(edu.institution, 30, yPos);
      
      // Date range (right aligned)
      const startDate = edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }) : '';
      const endDate = edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }) : '';
      const dateRange = `${startDate} - ${endDate}`;
      doc.setFontSize(11);
      doc.setFont(font, 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(dateRange, 190, yPos, { align: 'right' });
      yPos += 6;
      
      // Degree and field
      doc.setFontSize(12);
      doc.setFont(font, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${edu.degree} in ${edu.field}`, 30, yPos);
      yPos += 6;
      
      // GPA
      if (edu.gpa) {
        doc.setFontSize(11);
        doc.setFont(font, 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`GPA: ${edu.gpa}`, 30, yPos);
        yPos += 5;
      }
      
      // Description
      if (edu.description) {
        doc.setFontSize(11);
        doc.setFont(font, 'normal');
        doc.setTextColor(0, 0, 0);
        const descLines = doc.splitTextToSize(edu.description, 160);
        doc.text(descLines, 30, yPos);
        yPos += descLines.length * 5;
      }
      yPos += 10;
    });
  }
  
  // Skills
  if (skills.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Section header
    doc.setFontSize(16);
    doc.setFont(font, 'bold');
    doc.setTextColor(themeColor);
    doc.text('Skills', 105, yPos, { align: 'center' });
    yPos += 8;
    
    // Section line
    doc.setDrawColor(themeColor);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    // Skills grid (3 columns)
    const skillsPerRow = 3;
    for (let i = 0; i < skills.length; i += skillsPerRow) {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      for (let j = 0; j < skillsPerRow && i + j < skills.length; j++) {
        const skill = skills[i + j];
        const xPos = j === 0 ? 20 : j === 1 ? 85 : 150;
        
        // Skill name
        doc.setFontSize(11);
        doc.setFont(font, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(skill.name, xPos, yPos);
        
        // Skill level
        doc.setFontSize(9);
        doc.setFont(font, 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(skill.level, xPos, yPos + 4);
        
        // Skill level bar
        const barWidth = 50;
        const barHeight = 3;
        const barX = xPos;
        const barY = yPos + 8;
        
        // Background bar
        doc.setFillColor(200, 200, 200);
        doc.rect(barX, barY, barWidth, barHeight, 'F');
        
        // Progress bar
        const progressWidth = skill.level === 'beginner' ? barWidth * 0.25 :
                            skill.level === 'intermediate' ? barWidth * 0.5 :
                            skill.level === 'advanced' ? barWidth * 0.75 : barWidth;
        
        doc.setFillColor(themeColor);
        doc.rect(barX, barY, progressWidth, barHeight, 'F');
      }
      yPos += 20;
    }
  }
  
  // Projects
  if (projects.length > 0) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Section header
    doc.setFontSize(16);
    doc.setFont(font, 'bold');
    doc.setTextColor(themeColor);
    doc.text('Projects', 105, yPos, { align: 'center' });
    yPos += 8;
    
    // Section line
    doc.setDrawColor(themeColor);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    projects.forEach((project) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // Left border for project item
      doc.setFillColor(themeColor);
      doc.rect(20, yPos - 2, 3, 15, 'F');
      
      // Project name
      doc.setFontSize(14);
      doc.setFont(font, 'bold');
      doc.setTextColor(themeColor);
      doc.text(project.name, 30, yPos);
      yPos += 6;
      
      // Description
      if (project.description) {
        doc.setFontSize(11);
        doc.setFont(font, 'normal');
        doc.setTextColor(0, 0, 0);
        const descLines = doc.splitTextToSize(project.description, 160);
        doc.text(descLines, 30, yPos);
        yPos += descLines.length * 5;
      }
      
      // Technologies
      if (project.technologies.length > 0) {
        doc.setFontSize(11);
        doc.setFont(font, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Technologies: ', 30, yPos);
        doc.setFont(font, 'normal');
        const techText = project.technologies.join(', ');
        const techLines = doc.splitTextToSize(techText, 140);
        doc.text(techLines, 30 + doc.getTextWidth('Technologies: '), yPos);
        yPos += techLines.length * 5;
      }
      
      // Link
      if (project.link) {
        doc.setFontSize(11);
        doc.setFont(font, 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Link: ', 30, yPos);
        doc.setFont(font, 'normal');
        doc.setTextColor(59, 130, 246); // Blue color for links
        doc.text(project.link, 30 + doc.getTextWidth('Link: '), yPos);
        yPos += 5;
      }
      yPos += 10;
    });
  }
  
  // Save the PDF
  const fileName = `${personalInfo.firstName}_${personalInfo.lastName}_Resume.pdf`;
  doc.save(fileName);
};

export const saveResumeData = (data: any) => {
  try {
    localStorage.setItem('resumeData', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving resume data:', error);
    return false;
  }
};

export const loadResumeData = () => {
  try {
    const data = localStorage.getItem('resumeData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading resume data:', error);
    return null;
  }
}; 