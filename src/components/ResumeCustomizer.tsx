import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Check, Palette, Type, FileText, Settings, Sparkles } from 'lucide-react';

interface ResumeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomize: (settings: ResumeSettings) => void;
  currentSettings: ResumeSettings;
}

export interface ResumeSettings {
  themeColor: string;
  secondaryColor?: string; // For gradient templates
  fontFamily: string;
  fontSize: number;
  documentSize: 'letter' | 'a4';
  isGradient: boolean;
}

const ResumeCustomizer: React.FC<ResumeCustomizerProps> = ({
  isOpen,
  onClose,
  onCustomize,
  currentSettings
}) => {
  const [settings, setSettings] = useState<ResumeSettings>(currentSettings);

  // Enhanced color palette with better organization
  const colorPalette = [
    // Primary colors
    { color: '#3B82F6', name: 'Blue' },
    { color: '#8B5CF6', name: 'Purple' },
    { color: '#10B981', name: 'Green' },
    { color: '#EF4444', name: 'Red' },
    { color: '#F59E0B', name: 'Amber' },
    { color: '#EC4899', name: 'Pink' },
    // Professional colors
    { color: '#1F2937', name: 'Dark Gray' },
    { color: '#6B7280', name: 'Gray' },
    { color: '#000000', name: 'Black' },
    { color: '#374151', name: 'Slate' },
    // Accent colors
    { color: '#06B6D4', name: 'Cyan' },
    { color: '#8B5CF6', name: 'Violet' },
    { color: '#F97316', name: 'Orange' },
    { color: '#84CC16', name: 'Lime' },
    { color: '#14B8A6', name: 'Teal' },
    { color: '#F43F5E', name: 'Rose' },
  ];

  // Google Fonts options with better categorization
  const googleFonts = [
    { name: 'Inter', value: 'Inter', category: 'Modern' },
    { name: 'Roboto', value: 'Roboto', category: 'Modern' },
    { name: 'Lato', value: 'Lato', category: 'Modern' },
    { name: 'Montserrat', value: 'Montserrat', category: 'Modern' },
    { name: 'Open Sans', value: 'Open Sans', category: 'Modern' },
    { name: 'Raleway', value: 'Raleway', category: 'Modern' },
    { name: 'Poppins', value: 'Poppins', category: 'Modern' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro', category: 'Modern' },
    { name: 'Ubuntu', value: 'Ubuntu', category: 'Modern' },
    { name: 'Nunito', value: 'Nunito', category: 'Modern' },
    { name: 'Work Sans', value: 'Work Sans', category: 'Modern' },
    { name: 'Quicksand', value: 'Quicksand', category: 'Modern' },
    { name: 'Noto Serif', value: 'Noto Serif', category: 'Serif' },
    { name: 'Lora', value: 'Lora', category: 'Serif' },
    { name: 'Roboto Slab', value: 'Roboto Slab', category: 'Serif' },
    { name: 'Playfair Display', value: 'Playfair Display', category: 'Serif' },
    { name: 'Merriweather', value: 'Merriweather', category: 'Serif' },
    { name: 'Libre Baskerville', value: 'Libre Baskerville', category: 'Serif' },
    { name: 'Crimson Text', value: 'Crimson Text', category: 'Serif' },
    { name: 'Georgia', value: 'Georgia', category: 'Serif' },
    { name: 'Times New Roman', value: 'Times New Roman', category: 'Serif' },
    { name: 'Arial', value: 'Arial', category: 'System' },
    { name: 'Helvetica', value: 'Helvetica', category: 'System' },
    { name: 'Verdana', value: 'Verdana', category: 'System' },
    { name: 'Tahoma', value: 'Tahoma', category: 'System' },
    { name: 'Trebuchet MS', value: 'Trebuchet MS', category: 'System' },
    { name: 'Courier New', value: 'Courier New', category: 'Monospace' },
    { name: 'Consolas', value: 'Consolas', category: 'Monospace' },
    { name: 'Monaco', value: 'Monaco', category: 'Monospace' },
    { name: 'Menlo', value: 'Menlo', category: 'Monospace' },
  ];

  // Font size presets
  const fontSizePresets = [
    { name: 'Compact', value: 10 },
    { name: 'Standard', value: 11 },
    { name: 'Large', value: 12 },
  ];

  // Document size options
  const documentSizes = [
    { name: 'Letter (US, Canada)', value: 'letter' },
    { name: 'A4 (International)', value: 'a4' },
  ];

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${googleFonts.map(font => font.value.replace(' ', '+')).join('&family=')}:wght@300;400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleColorSelect = (color: string) => {
    setSettings(prev => ({ ...prev, themeColor: color }));
  };

  const handleSecondaryColorSelect = (color: string) => {
    setSettings(prev => ({ ...prev, secondaryColor: color }));
  };

  const handleGradientToggle = () => {
    setSettings(prev => ({ 
      ...prev, 
      isGradient: !prev.isGradient,
      secondaryColor: !prev.isGradient ? prev.themeColor : prev.secondaryColor
    }));
  };

  const handleFontSelect = (font: string) => {
    setSettings(prev => ({ ...prev, fontFamily: font }));
  };

  const handleFontSizeChange = (size: number) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };

  const handleDocumentSizeChange = (size: 'letter' | 'a4') => {
    setSettings(prev => ({ ...prev, documentSize: size }));
  };

  const handleApply = () => {
    onCustomize(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings(currentSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-4xl max-h-[95vh] overflow-hidden bg-gradient-secondary border border-white/10 shadow-elegant">
        <CardHeader className="border-b border-white/10 bg-gradient-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-white">Resume Settings</CardTitle>
                <p className="text-sm text-muted-foreground">Customize your resume appearance</p>
              </div>
            </div>
                         <div className="flex items-center gap-2">
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={onClose}
                 className="h-8 w-8 p-0 hover:bg-white/10 text-white hover:text-white"
               >
                 <X className="w-4 h-4" />
               </Button>
             </div>
          </div>
        </CardHeader>

        <div className="flex flex-col lg:flex-row h-full">
                     {/* Main Content */}
           <div className="flex-1 overflow-y-auto relative customizer-scrollbar">
             <CardContent className="p-6 space-y-6">
               {/* Scroll Indicator */}
               <div className="sticky top-0 z-10 bg-gradient-subtle border-b border-white/10 p-2 mb-4 rounded-lg">
                 <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                   <span>Scroll down to see font options</span>
                   <div className="animate-bounce">↓</div>
                 </div>
               </div>
                             {/* Theme Color Section */}
               <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Palette className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Theme Color</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      value={settings.themeColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                      className="w-32 font-mono text-sm bg-white/5 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                      placeholder="#3B82F6"
                    />
                    <div className="flex-1 flex flex-wrap gap-2">
                      {colorPalette.map((colorOption) => (
                        <button
                          key={colorOption.color}
                          onClick={() => handleColorSelect(colorOption.color)}
                          className={`group relative w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-glow ${
                            settings.themeColor === colorOption.color 
                              ? 'border-primary shadow-glow' 
                              : 'border-white/20 hover:border-white/40'
                          }`}
                          style={{ backgroundColor: colorOption.color }}
                          title={colorOption.name}
                        >
                          {settings.themeColor === colorOption.color && (
                            <Check className="w-4 h-4 text-white mx-auto drop-shadow-lg" />
                          )}
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {colorOption.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Toggle */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                  <input
                    type="checkbox"
                    id="gradient-toggle"
                    checked={settings.isGradient}
                    onChange={handleGradientToggle}
                    className="w-4 h-4 text-primary rounded focus:ring-primary bg-white/5 border-white/20"
                  />
                  <label htmlFor="gradient-toggle" className="text-sm font-medium text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Enable Gradient Effects
                  </label>
                </div>
              </div>

                             {/* Secondary Color Section (for gradients) */}
               {settings.isGradient && (
                 <div className="space-y-3 animate-fade-in">
                   <div className="flex items-center gap-2">
                     <div className="p-1.5 rounded-md bg-primary/10">
                       <Palette className="w-4 h-4 text-primary" />
                     </div>
                     <h3 className="text-lg font-semibold text-white">Secondary Color</h3>
                   </div>
                   
                   <div className="space-y-3">
                     <div className="flex items-center gap-4">
                       <Input
                         value={settings.secondaryColor || settings.themeColor}
                         onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                         className="w-32 font-mono text-sm bg-white/5 border-white/20 text-white placeholder:text-muted-foreground focus:border-primary"
                         placeholder="#8B5CF6"
                       />
                       <div className="flex-1 flex flex-wrap gap-2">
                         {colorPalette.map((colorOption) => (
                           <button
                             key={colorOption.color}
                             onClick={() => handleSecondaryColorSelect(colorOption.color)}
                             className={`group relative w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 hover:shadow-glow ${
                               (settings.secondaryColor || settings.themeColor) === colorOption.color 
                                 ? 'border-primary shadow-glow' 
                                 : 'border-white/20 hover:border-white/40'
                             }`}
                             style={{ backgroundColor: colorOption.color }}
                             title={colorOption.name}
                           >
                             {(settings.secondaryColor || settings.themeColor) === colorOption.color && (
                               <Check className="w-3 h-3 text-white mx-auto drop-shadow-lg" />
                             )}
                             <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                               {colorOption.name}
                             </div>
                           </button>
                         ))}
                       </div>
                     </div>
                     
                     {/* Gradient Preview */}
                     <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                       <h4 className="text-sm font-medium mb-2 text-white">Gradient Preview</h4>
                       <div 
                         className="h-12 rounded-lg shadow-inner w-full"
                         style={{
                           background: `linear-gradient(135deg, ${settings.themeColor}, ${settings.secondaryColor || settings.themeColor})`
                         }}
                       ></div>
                       <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                         <span>{settings.themeColor}</span>
                         <span>{settings.secondaryColor || settings.themeColor}</span>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

              <Separator className="bg-white/10" />

                             {/* Font Family Section */}
               <div className="space-y-4" id="font-section">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="p-1.5 rounded-md bg-primary/10">
                       <Type className="w-4 h-4 text-primary" />
                     </div>
                     <h3 className="text-lg font-semibold text-white">Font Family</h3>
                   </div>
                   <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                     Scroll to here
                   </Badge>
                 </div>
                 
                 <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
                     {googleFonts.map((font) => (
                       <button
                         key={font.value}
                         onClick={() => handleFontSelect(font.value)}
                         className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-medium group ${
                           settings.fontFamily === font.value
                             ? 'border-primary bg-primary/10 text-primary shadow-glow'
                             : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
                         }`}
                         style={{ fontFamily: font.value }}
                       >
                         <div className="flex items-center justify-between">
                           <span className="font-medium text-sm">{font.name}</span>
                           <Badge variant="secondary" className="text-xs bg-white/10 text-muted-foreground">
                             {font.category}
                           </Badge>
                         </div>
                       </button>
                     ))}
                   </div>
                 </div>
               </div>

              <Separator className="bg-white/10" />

                             {/* Font Size Section */}
               <div className="space-y-4">
                 <div className="flex items-center gap-2">
                   <div className="p-1.5 rounded-md bg-primary/10">
                     <Type className="w-4 h-4 text-primary" />
                   </div>
                   <h3 className="text-lg font-semibold text-white">Font Size</h3>
                 </div>
                 
                 <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                   <div className="space-y-4">
                     <div className="flex items-center gap-4">
                       <label className="text-sm text-muted-foreground">Custom Size:</label>
                       <Input
                         type="number"
                         value={settings.fontSize}
                         onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                         className="w-24 bg-white/5 border-white/20 text-white focus:border-primary"
                         min="8"
                         max="16"
                         step="0.5"
                       />
                       <span className="text-sm text-muted-foreground">pt</span>
                     </div>
                     
                     <div>
                       <label className="text-sm text-muted-foreground mb-2 block">Quick Presets:</label>
                       <div className="flex flex-wrap gap-2">
                         {fontSizePresets.map((preset) => (
                           <button
                             key={preset.value}
                             onClick={() => handleFontSizeChange(preset.value)}
                             className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                               settings.fontSize === preset.value
                                 ? 'border-primary bg-primary text-white shadow-glow'
                                 : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
                             }`}
                           >
                             {preset.name} ({preset.value}pt)
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

              <Separator className="bg-white/10" />

                             {/* Document Size Section */}
               <div className="space-y-4">
                 <div className="flex items-center gap-2">
                   <div className="p-1.5 rounded-md bg-primary/10">
                     <FileText className="w-4 h-4 text-primary" />
                   </div>
                   <h3 className="text-lg font-semibold text-white">Document Size</h3>
                 </div>
                 
                 <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                   <div className="flex flex-wrap gap-3">
                     {documentSizes.map((size) => (
                       <button
                         key={size.value}
                         onClick={() => handleDocumentSizeChange(size.value)}
                         className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                           settings.documentSize === size.value
                             ? 'border-primary bg-primary text-white shadow-glow'
                             : 'border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10'
                         }`}
                       >
                         {size.name}
                       </button>
                     ))}
                   </div>
                 </div>
               </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                >
                  Reset to Default
                </Button>
                <Button
                  onClick={handleApply}
                  className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-glow"
                >
                  Apply Settings
                </Button>
              </div>
            </CardContent>
          </div>

          {/* Preview Panel */}
          <div className="lg:w-80 border-l border-white/10 bg-gradient-subtle flex flex-col">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Live Preview</h3>
              <p className="text-sm text-muted-foreground mt-1">See how your resume will look</p>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
                             <div 
                 className="h-full p-6 rounded-lg bg-white/5 border border-white/10 shadow-medium flex flex-col"
                 style={{
                   fontFamily: settings.fontFamily,
                   fontSize: `${settings.fontSize}pt`,
                 }}
               >
                 {/* Gradient Header Bar */}
                 {settings.isGradient && (
                   <div 
                     className="h-2 rounded-t-lg mb-4 w-full"
                     style={{
                       background: `linear-gradient(135deg, ${settings.themeColor}, ${settings.secondaryColor || settings.themeColor})`
                     }}
                   ></div>
                 )}
                 
                                   <h4 
                    className="font-semibold mb-4 text-xl gradient-text"
                    style={{
                      color: settings.isGradient ? undefined : settings.themeColor,
                      background: settings.isGradient 
                        ? `linear-gradient(135deg, ${settings.themeColor}, ${settings.secondaryColor || settings.themeColor})`
                        : 'none',
                      WebkitBackgroundClip: settings.isGradient ? 'text' : undefined,
                      WebkitTextFillColor: settings.isGradient ? 'transparent' : undefined,
                      backgroundClip: settings.isGradient ? 'text' : undefined,
                      textShadow: settings.isGradient ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                      display: 'inline-block'
                    }}
                  >
                    John Doe
                  </h4>
                <p className="text-muted-foreground mb-3 font-medium">Software Engineer</p>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2 text-white" style={{ color: settings.themeColor }}>
                      Experience
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Senior Software Engineer at Tech Corp • 2020-Present
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2 text-white" style={{ color: settings.themeColor }}>
                      Skills
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      JavaScript, React, Node.js, Python, AWS
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold mb-2 text-white" style={{ color: settings.themeColor }}>
                      Education
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Bachelor's in Computer Science • University of Technology
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground">
                    This preview shows your selected settings. 
                    {settings.isGradient && ' Gradient effects are enabled.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumeCustomizer; 