import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Download, Eye, Edit3, Save, Palette, Settings } from 'lucide-react';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import ResumeCustomizer, { ResumeSettings } from '@/components/ResumeCustomizer';
import { generatePDF, saveResumeData, loadResumeData } from '@/services/resumeService';

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

const ResumeBuilder: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
    summary: ''
  });

  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('classic-black');
  const [isSaving, setIsSaving] = useState(false);
  const [resumeSettings, setResumeSettings] = useState<ResumeSettings>({
    themeColor: '#FF4800',
    secondaryColor: '#8B5CF6',
    fontFamily: 'Roboto',
    fontSize: 11,
    documentSize: 'letter',
    isGradient: false
  });

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    setEducation([...education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    setExperience([...experience, newExperience]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate'
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const generateResume = () => {
    generatePDF(personalInfo, education, experience, skills, projects, selectedTemplate, resumeSettings);
  };

  const previewResume = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // Auto-enable gradient mode for gradient templates
    if (templateId === 'creative-gradient' && !resumeSettings.isGradient) {
      setResumeSettings(prev => ({
        ...prev,
        isGradient: true,
        secondaryColor: prev.secondaryColor || '#8B5CF6'
      }));
    }
    
    setShowTemplateSelector(false);
  };

  const handleCustomize = (settings: ResumeSettings) => {
    setResumeSettings(settings);
  };

  // Auto-save functionality
  const saveResume = () => {
    setIsSaving(true);
    const resumeData = {
      personalInfo,
      education,
      experience,
      skills,
      projects
    };
    
    if (saveResumeData(resumeData)) {
      // Show success message
      setTimeout(() => setIsSaving(false), 1000);
    } else {
      setIsSaving(false);
    }
  };

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = loadResumeData();
    if (savedData) {
      setPersonalInfo(savedData.personalInfo || personalInfo);
      setEducation(savedData.education || []);
      setExperience(savedData.experience || []);
      setSkills(savedData.skills || []);
      setProjects(savedData.projects || []);
    }
  }, []);

  // Auto-save when data changes
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveResume();
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [personalInfo, education, experience, skills, projects]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background gradient with logo blend */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/logo.png')`,
          backgroundSize: '50%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      
      <div className="relative w-full max-w-full px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
              <img src="/logo.png" alt="IntervueAi Logo" className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 object-contain" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              Resume Builder
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Create a professional resume that stands out to employers with our AI-powered builder
            </p>
            {isSaving && (
              <div className="mt-2 sm:mt-3 md:mt-4 flex items-center justify-center space-x-2 text-green-400">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-green-400"></div>
                <span className="text-xs sm:text-sm">Auto-saving...</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl w-full">
                <CardHeader className="border-b border-white/10 p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-white text-base sm:text-lg md:text-xl font-semibold">Resume Information</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-white/10 border border-white/20 text-xs sm:text-sm">
                      <TabsTrigger value="personal" className="text-white data-[state=active]:bg-white/20 truncate">Personal</TabsTrigger>
                      <TabsTrigger value="education" className="text-white data-[state=active]:bg-white/20 truncate">Education</TabsTrigger>
                      <TabsTrigger value="experience" className="text-white data-[state=active]:bg-white/20 truncate">Experience</TabsTrigger>
                      <TabsTrigger value="skills" className="text-white data-[state=active]:bg-white/20 truncate">Skills</TabsTrigger>
                      <TabsTrigger value="projects" className="text-white data-[state=active]:bg-white/20 truncate">Projects</TabsTrigger>
                    </TabsList>

                    {/* Personal Information */}
                    <TabsContent value="personal" className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">First Name</label>
                          <Input
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">Last Name</label>
                          <Input
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="Doe"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">Job Title</label>
                          <Input
                            value={personalInfo.jobTitle}
                            onChange={(e) => setPersonalInfo({...personalInfo, jobTitle: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="Software Engineer, Data Scientist, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">Email</label>
                          <Input
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="john.doe@email.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">Phone</label>
                          <Input
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">Address</label>
                          <Input
                            value={personalInfo.address}
                            onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="City, State, Country"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">LinkedIn</label>
                          <Input
                            value={personalInfo.linkedin}
                            onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="linkedin.com/in/johndoe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">Website</label>
                          <Input
                            value={personalInfo.website}
                            onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="johndoe.com"
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-white text-xs sm:text-sm font-medium">Professional Summary</label>
                          <Textarea
                            value={personalInfo.summary}
                            onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                            placeholder="Brief professional summary..."
                            rows={4}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Education */}
                    <TabsContent value="education" className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-white text-base sm:text-lg font-semibold">Education</h3>
                        <Button onClick={addEducation} variant="outline-hero" size="sm" className="text-xs sm:text-sm">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Add Education</span>
                          <span className="sm:hidden">Add</span>
                        </Button>
                      </div>
                      {education.map((edu, index) => (
                        <Card key={edu.id} className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg w-full">
                          <CardContent className="p-3 sm:p-4 md:p-6">
                            <div className="flex justify-between items-start mb-4 sm:mb-6">
                              <h4 className="text-white font-medium text-sm sm:text-base md:text-lg">Education #{index + 1}</h4>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                                className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-xs sm:text-sm"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">Institution</label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                  placeholder="University Name"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">Degree</label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                  placeholder="Bachelor's"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">Field of Study</label>
                                <Input
                                  value={edu.field}
                                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                  placeholder="Computer Science"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">GPA</label>
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                  placeholder="3.8"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">Start Date</label>
                                <Input
                                  type="date"
                                  value={edu.startDate}
                                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">End Date</label>
                                <Input
                                  type="date"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">Description</label>
                                <Textarea
                                  value={edu.description}
                                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                  placeholder="Relevant coursework, achievements..."
                                  rows={3}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    {/* Experience */}
                    <TabsContent value="experience" className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-white text-base sm:text-lg font-semibold">Work Experience</h3>
                        <Button onClick={addExperience} variant="outline-hero" size="sm" className="text-xs sm:text-sm">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Add Experience</span>
                          <span className="sm:hidden">Add</span>
                        </Button>
                      </div>
                       {experience.map((exp, index) => (
                         <Card key={exp.id} className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg w-full">
                           <CardContent className="p-3 sm:p-4 md:p-6">
                             <div className="flex justify-between items-start mb-4 sm:mb-6">
                               <h4 className="text-white font-medium text-sm sm:text-base md:text-lg">Experience #{index + 1}</h4>
                               <Button
                                 variant="destructive"
                                 size="sm"
                                 onClick={() => removeExperience(exp.id)}
                                 className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-xs sm:text-sm"
                               >
                                 <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                               </Button>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Company</label>
                                 <Input
                                   value={exp.company}
                                   onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="Company Name"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Position</label>
                                 <Input
                                   value={exp.position}
                                   onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="Software Engineer"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Location</label>
                                 <Input
                                   value={exp.location}
                                   onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="San Francisco, CA"
                                 />
                               </div>
                               <div className="flex items-center space-x-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Current Position</label>
                                 <input
                                   type="checkbox"
                                   checked={exp.current}
                                   onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                   className="rounded bg-white/10 border-white/20"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Start Date</label>
                                 <Input
                                   type="date"
                                   value={exp.startDate}
                                   onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">End Date</label>
                                 <Input
                                   type="date"
                                   value={exp.endDate}
                                   onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   disabled={exp.current}
                                 />
                               </div>
                               <div className="md:col-span-2 space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Description</label>
                                 <Textarea
                                   value={exp.description}
                                   onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="Describe your responsibilities and achievements..."
                                   rows={4}
                                 />
                               </div>
                             </div>
                           </CardContent>
                         </Card>
                       ))}
                     </TabsContent>

                    {/* Skills */}
                    <TabsContent value="skills" className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-white text-base sm:text-lg font-semibold">Skills</h3>
                        <Button onClick={addSkill} variant="outline-hero" size="sm" className="text-xs sm:text-sm">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Add Skill</span>
                          <span className="sm:hidden">Add</span>
                        </Button>
                      </div>
                      {skills.map((skill, index) => (
                        <Card key={skill.id} className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg w-full">
                          <CardContent className="p-3 sm:p-4 md:p-6">
                            <div className="flex justify-between items-start mb-4 sm:mb-6">
                              <h4 className="text-white font-medium text-sm sm:text-base md:text-lg">Skill #{index + 1}</h4>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeSkill(skill.id)}
                                className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-xs sm:text-sm"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">Skill Name</label>
                                <Input
                                  value={skill.name}
                                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                  placeholder="JavaScript"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-white text-xs sm:text-sm font-medium">Level</label>
                                <select
                                  value={skill.level}
                                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value as any)}
                                  className="w-full bg-white/10 border-white/20 text-white rounded-md px-2 sm:px-3 py-2 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                >
                                  <option value="beginner">Beginner</option>
                                  <option value="intermediate">Intermediate</option>
                                  <option value="advanced">Advanced</option>
                                  <option value="expert">Expert</option>
                                </select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    {/* Projects */}
                    <TabsContent value="projects" className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                        <h3 className="text-white text-base sm:text-lg font-semibold">Projects</h3>
                        <Button onClick={addProject} variant="outline-hero" size="sm" className="text-xs sm:text-sm">
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Add Project</span>
                          <span className="sm:hidden">Add</span>
                        </Button>
                      </div>
                       {projects.map((project, index) => (
                         <Card key={project.id} className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg w-full">
                           <CardContent className="p-3 sm:p-4 md:p-6">
                             <div className="flex justify-between items-start mb-4 sm:mb-6">
                               <h4 className="text-white font-medium text-sm sm:text-base md:text-lg">Project #{index + 1}</h4>
                               <Button
                                 variant="destructive"
                                 size="sm"
                                 onClick={() => removeProject(project.id)}
                                 className="bg-red-500/20 hover:bg-red-500/30 border-red-500/30 text-xs sm:text-sm"
                               >
                                 <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                               </Button>
                             </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Project Name</label>
                                 <Input
                                   value={project.name}
                                   onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="E-commerce Website"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Description</label>
                                 <Textarea
                                   value={project.description}
                                   onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="Describe your project..."
                                   rows={3}
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Technologies (comma-separated)</label>
                                 <Input
                                   value={project.technologies.join(', ')}
                                   onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="React, Node.js, MongoDB"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="text-white text-xs sm:text-sm font-medium">Project Link</label>
                                 <Input
                                   value={project.link}
                                   onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                   className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 text-xs sm:text-sm"
                                   placeholder="https://github.com/username/project"
                                   type="url"
                                 />
                               </div>
                             </div>
                           </CardContent>
                         </Card>
                       ))}
                     </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl sticky top-8 w-full">
                <CardHeader className="border-b border-white/10 p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-white text-base sm:text-lg md:text-xl font-semibold">Resume Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    <Button 
                      onClick={() => setShowTemplateSelector(true)}
                      variant="premium"
                      size="sm"
                      className="w-full text-xs sm:text-sm"
                    >
                      <Palette className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Choose Template</span>
                      <span className="sm:hidden">Template</span>
                    </Button>
                    <Button 
                      onClick={() => setShowCustomizer(true)}
                      variant="hero"
                      size="sm"
                      className="w-full text-xs sm:text-sm"
                    >
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Customize Resume</span>
                      <span className="sm:hidden">Customize</span>
                    </Button>
                    <Button 
                      onClick={previewResume} 
                      variant="outline-hero"
                      size="sm"
                      className="w-full text-xs sm:text-sm"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Preview Resume</span>
                      <span className="sm:hidden">Preview</span>
                    </Button>
                    <Button 
                      onClick={generateResume} 
                      variant="hero"
                      size="sm"
                      className="w-full text-xs sm:text-sm"
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Generate PDF</span>
                      <span className="sm:hidden">PDF</span>
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to clear all data?')) {
                          setPersonalInfo({
                            firstName: '',
                            lastName: '',
                            jobTitle: '',
                            email: '',
                            phone: '',
                            address: '',
                            linkedin: '',
                            website: '',
                            summary: ''
                          });
                          setEducation([]);
                          setExperience([]);
                          setSkills([]);
                          setProjects([]);
                        }
                      }}
                      className="w-full border-white/20 text-white hover:text-white hover:border-white/40 bg-white/5 text-xs sm:text-sm"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Clear Form</span>
                      <span className="sm:hidden">Clear</span>
                    </Button>
                  </div>
                  
                  <Separator className="bg-white/20" />
                  
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-white font-semibold text-sm sm:text-base">Current Template</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-xs sm:text-sm">Template</span>
                      <Badge variant="default" className="capitalize bg-blue-600/20 text-blue-300 border-blue-500/30 text-xs">
                        {selectedTemplate.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Theme Color</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border border-gray-400"
                          style={{ backgroundColor: resumeSettings.themeColor }}
                        ></div>
                        <span className="text-gray-300 text-xs">{resumeSettings.themeColor}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Font</span>
                      <Badge variant="default" className="capitalize bg-purple-600/20 text-purple-300 border-purple-500/30">
                        {resumeSettings.fontFamily}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Font Size</span>
                      <Badge variant="default" className="capitalize bg-green-600/20 text-green-300 border-green-500/30">
                        {resumeSettings.fontSize}pt
                      </Badge>
                    </div>
                    
                    <Separator className="bg-white/20" />
                    
                    <h4 className="text-white font-semibold">Resume Sections</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Personal Info</span>
                        <Badge variant={personalInfo.firstName ? "default" : "secondary"} 
                               className={personalInfo.firstName ? "bg-green-600/20 text-green-300 border-green-500/30" : "bg-gray-600/20 text-gray-300 border-gray-500/30"}>
                          {personalInfo.firstName ? "Complete" : "Incomplete"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Education</span>
                        <Badge variant={education.length > 0 ? "default" : "secondary"}
                               className={education.length > 0 ? "bg-blue-600/20 text-blue-300 border-blue-500/30" : "bg-gray-600/20 text-gray-300 border-gray-500/30"}>
                          {education.length} entries
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Experience</span>
                        <Badge variant={experience.length > 0 ? "default" : "secondary"}
                               className={experience.length > 0 ? "bg-purple-600/20 text-purple-300 border-purple-500/30" : "bg-gray-600/20 text-gray-300 border-gray-500/30"}>
                          {experience.length} entries
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Skills</span>
                        <Badge variant={skills.length > 0 ? "default" : "secondary"}
                               className={skills.length > 0 ? "bg-orange-600/20 text-orange-300 border-orange-500/30" : "bg-gray-600/20 text-gray-300 border-gray-500/30"}>
                          {skills.length} skills
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Projects</span>
                        <Badge variant={projects.length > 0 ? "default" : "secondary"}
                               className={projects.length > 0 ? "bg-green-600/20 text-green-300 border-green-500/30" : "bg-gray-600/20 text-gray-300 border-gray-500/30"}>
                          {projects.length} projects
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Tips</h4>
                    <div className="space-y-2 text-xs text-gray-300">
                      <p>• Keep your summary concise and impactful</p>
                      <p>• Use action verbs in experience descriptions</p>
                      <p>• Quantify achievements when possible</p>
                      <p>• Include relevant keywords for ATS</p>
                      <p>• Keep it to 1-2 pages maximum</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
                     {/* Resume Preview Modal */}
        {showPreview && (
          <ResumePreview
            personalInfo={personalInfo}
            education={education}
            experience={experience}
            skills={skills}
            projects={projects}
            selectedTemplate={selectedTemplate}
            resumeSettings={resumeSettings}
            onClose={closePreview}
            onDownload={generateResume}
          />
        )}

                        {/* Template Selector Modal */}
         {showTemplateSelector && (
           <TemplateSelector
             selectedTemplate={selectedTemplate}
             resumeSettings={resumeSettings}
             onTemplateSelect={handleTemplateSelect}
             onClose={() => setShowTemplateSelector(false)}
           />
         )}

        {/* Resume Customizer Modal */}
        <ResumeCustomizer
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          onCustomize={handleCustomize}
          currentSettings={resumeSettings}
        />
     </div>
   );
 };

export default ResumeBuilder; 