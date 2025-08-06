import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Square, 
  Loader2, 
  Check,
  AlertCircle,
  Play,
  Pause,
  Lightbulb
} from "lucide-react";

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  maxDuration?: number; // in milliseconds
  autoTranscribe?: boolean;
  placeholder?: string;
}

const VoiceRecorder = ({ 
  onTranscriptionComplete, 
  maxDuration = 30000, // 30 seconds default
  autoTranscribe = true,
  placeholder = "Click the microphone to start recording your answer..."
}: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      setTranscription("");
      
      // Check if microphone permissions are available
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          if (permission.state === 'denied') {
            setError('Microphone access is denied. Please enable microphone permissions in your browser settings and refresh the page.');
            return;
          }
        } catch (e) {
          console.log('Permission API not supported, continuing...');
        }
      }
      
      // Check if speech recognition is supported
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setError('Speech recognition is not supported in this browser. Please use the text input option instead.');
        return;
      }
      
      // Start speech recognition
      startSpeechRecognition();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration / 1000) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Failed to start recording:', error);
      setError('Failed to access microphone. Please check permissions and try again. You can also use the text input option instead.');
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      stopSpeechRecognition();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const startSpeechRecognition = () => {
    try {
      setIsTranscribing(true);
      setError(null);

      // Create speech recognition instance
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const isFinal = event.results[i].isFinal;

          if (isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const result = finalTranscript || interimTranscript;
        setTranscription(result);
        onTranscriptionComplete(result);
      };

      recognition.onerror = (event: any) => {
        let errorMessage = 'Speech recognition error';
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            break;
          case 'audio-capture':
            errorMessage = 'Audio capture error. Please check your microphone.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please enable microphone permissions.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        setError(errorMessage);
        setIsTranscribing(false);
      };

      recognition.onend = () => {
        setIsTranscribing(false);
      };

      recognition.start();
      
      // Store recognition instance for stopping
      (window as any).currentRecognition = recognition;
      
    } catch (error) {
      console.error('Speech recognition error:', error);
      setError('Speech recognition failed to start. Please use the text input option instead.');
      setIsTranscribing(false);
    }
  };

  const stopSpeechRecognition = () => {
    try {
      const recognition = (window as any).currentRecognition;
      if (recognition) {
        recognition.stop();
        (window as any).currentRecognition = null;
      }
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
    setIsTranscribing(false);
  };

  const clearRecording = () => {
    setTranscription("");
    setRecordingTime(0);
    setError(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (recordingTime / (maxDuration / 1000)) * 100;

  const exampleAnswers = [
    "In my previous role as a UX Designer, I worked on a project where we had to redesign an e-commerce platform. The challenge was balancing user needs for a streamlined checkout process with business requirements for upselling opportunities. I conducted user research through interviews and usability testing, which revealed that users were abandoning their carts due to too many upsell prompts. I proposed a solution that moved upsells to non-intrusive locations while maintaining the business goals. The result was a 25% increase in conversion rate and improved user satisfaction scores.",
    "As a Software Developer, I encountered a critical performance issue where our application was taking 30 seconds to load data. I analyzed the problem using profiling tools and discovered inefficient database queries. I optimized the queries by adding proper indexes and implementing caching strategies. This reduced the load time to under 3 seconds, significantly improving user experience and reducing server costs.",
    "In my role as a Product Manager, I led a cross-functional team to launch a new mobile app feature. We had limited resources and tight deadlines, so I prioritized features based on user impact and business value. I used data from user analytics and A/B testing to make decisions, and we successfully launched on time with positive user feedback and exceeded our KPIs by 15%."
  ];

  const getRandomExample = () => {
    return exampleAnswers[Math.floor(Math.random() * exampleAnswers.length)];
  };

  return (
    <Card className="w-full bg-gray-800/60 border border-gray-700/60 backdrop-blur-xl shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-white">
          <Mic className="h-5 w-5" />
          Voice Recorder
          {transcription && (
            <Badge variant="default" className="ml-auto bg-green-600 text-white px-3 py-1">
              <Check className="h-3 w-3 mr-1" />
              Transcribed
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Example Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => {
              const example = getRandomExample();
              setTranscription(example);
              onTranscriptionComplete(example);
              setShowExample(true);
            }}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 border-blue-500/50 hover:border-blue-400/50 bg-blue-900/20 hover:bg-blue-800/30 px-4 py-2 rounded-lg transition-all duration-200"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">Show Example Answer</span>
            <span className="sm:hidden">Example</span>
          </Button>
        </div>

        {/* Recording Status */}
        {isRecording && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-red-400 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Recording...
              </span>
              <span className="text-gray-400 font-medium">
                {formatTime(recordingTime)} / {formatTime(maxDuration / 1000)}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Recording in progress
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="space-y-4 p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-base font-medium text-red-300">Microphone Access Issue</span>
            </div>
            <p className="text-sm text-red-200 leading-relaxed">{error}</p>
            <div className="text-xs text-red-300 bg-red-900/20 p-3 rounded-md">
              <p>💡 Tip: You can still use the text input option to type your answers instead.</p>
            </div>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-6">
          {!isRecording && !transcription && !error && (
            <Button
              onClick={startRecording}
              size="lg"
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Mic className="h-8 w-8 sm:h-10 sm:w-10" />
            </Button>
          )}
          
          {error && (
            <div className="text-center space-y-4">
              <div className="text-sm sm:text-base text-gray-400">
                Voice recording is not available
              </div>
              <Button
                onClick={() => setError(null)}
                variant="outline"
                size="sm"
                className="text-blue-400 hover:text-blue-300 border-blue-500/50 hover:border-blue-400/50 bg-blue-900/20 hover:bg-blue-800/30 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Try Again
              </Button>
            </div>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              size="lg"
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Square className="h-8 w-8 sm:h-10 sm:w-10" />
            </Button>
          )}

          {transcription && !isRecording && (
            <div className="flex items-center gap-3">
              <Button
                onClick={clearRecording}
                variant="outline"
                size="sm"
                className="text-red-400 hover:text-red-300 border-red-500/50 hover:border-red-400/50 bg-red-900/20 hover:bg-red-800/30 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Clear
              </Button>
            </div>
          )}
        </div>

        {/* Placeholder Text */}
        {!transcription && !isRecording && !error && (
          <p className="text-center text-sm sm:text-base text-gray-400 py-6 leading-relaxed">
            {placeholder}
          </p>
        )}

        {/* Transcription Result */}
        {isTranscribing && (
          <div className="flex items-center justify-center gap-3 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
            <span className="text-sm sm:text-base text-blue-300 font-medium">Listening to your voice...</span>
          </div>
        )}

        {transcription && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h4 className="font-medium text-base sm:text-lg text-white">
                {showExample ? "Example Answer:" : "Your Answer:"}
              </h4>
              <Badge variant="secondary" className="bg-green-900/40 text-green-300 border-green-500/50 px-3 py-1 text-sm font-medium">
                {transcription.split(' ').length} words
              </Badge>
            </div>
            <div className="p-4 sm:p-6 bg-gray-700/50 border border-gray-600 rounded-lg">
              <p className="text-sm sm:text-base leading-relaxed text-gray-200">{transcription}</p>
            </div>
            {showExample && (
              <div className="text-center p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-xs sm:text-sm text-blue-400 leading-relaxed">
                  💡 This is an example of a comprehensive interview answer using the STAR method
                </p>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs sm:text-sm text-gray-400 space-y-2 bg-gray-900/30 p-4 rounded-lg border border-gray-700/50">
          <p className="font-medium">Instructions:</p>
          <div className="space-y-1">
            <p>• Speak clearly and at a normal pace</p>
            <p>• Maximum recording time: {formatTime(maxDuration / 1000)}</p>
            <p>• Use the STAR method: Situation, Task, Action, Result</p>
            <p>• Click "Show Example Answer" to see a good response format</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder; 