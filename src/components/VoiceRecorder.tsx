import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Square, 
  Loader2, 
  Volume2, 
  Trash2, 
  Check,
  AlertCircle,
  Play,
  Pause
} from "lucide-react";
// Import Custom Speech-to-Text Service
import { speechToTextService, type SpeechToTextResult } from "@/services/speechToTextService";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<SpeechToTextResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError(null);
      
      // Start speech recognition directly
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
      setError('Failed to access microphone. Please check permissions and try again.');
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
    if (!speechToTextService.isSpeechRecognitionSupported()) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    setIsTranscribing(true);
    setError(null);

    speechToTextService.startListening(
      (result) => {
        setTranscription(result);
        onTranscriptionComplete(result.text);
        setIsTranscribing(false);
      },
      (error) => {
        setError(error);
        setIsTranscribing(false);
      },
      () => {
        setIsTranscribing(false);
      }
    );
  };

  const stopSpeechRecognition = () => {
    speechToTextService.stopListening();
    setIsTranscribing(false);
  };

  const playRecording = () => {
    // Not needed for speech recognition - just a placeholder
    console.log('Play recording not available with speech recognition');
  };

  const clearRecording = () => {
    setTranscription(null);
    setRecordingTime(0);
    setError(null);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (recordingTime / (maxDuration / 1000)) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice Recorder
          {transcription && (
            <Badge variant="default" className="ml-auto">
              <Check className="h-3 w-3 mr-1" />
              Transcribed
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recording Status */}
        {isRecording && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-600 font-medium">Recording...</span>
              <span className="text-muted-foreground">
                {formatTime(recordingTime)} / {formatTime(maxDuration / 1000)}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              Recording in progress
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4">
          {!isRecording && !audioBlob && (
            <Button
              onClick={startRecording}
              size="lg"
              className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600"
            >
              <Mic className="h-6 w-6" />
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              size="lg"
              className="h-16 w-16 rounded-full bg-gray-500 hover:bg-gray-600"
            >
              <Square className="h-6 w-6" />
            </Button>
          )}

          {audioBlob && !isRecording && (
            <div className="flex items-center gap-2">
              <Button
                onClick={playRecording}
                variant="outline"
                size="lg"
                className="h-12 w-12 rounded-full"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                onClick={clearRecording}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Placeholder Text */}
        {!audioBlob && !isRecording && (
          <p className="text-center text-sm text-muted-foreground py-4">
            {placeholder}
          </p>
        )}

        {/* Manual Transcribe Button */}
        {!transcription && !autoTranscribe && (
          <div className="text-center">
            <Button
              onClick={startSpeechRecognition}
              disabled={isTranscribing}
              className="flex items-center gap-2"
            >
              {isTranscribing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start Speech Recognition
                </>
              )}
            </Button>
          </div>
        )}

        {/* Transcription Result */}
        {isTranscribing && (
          <div className="flex items-center justify-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700">Transcribing your audio...</span>
          </div>
        )}

        {transcription && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Transcribed Text:</h4>
              <Badge variant="secondary">
                {Math.round(transcription.confidence * 100)}% confidence
              </Badge>
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-sm leading-relaxed">{transcription.text}</p>
            </div>
            {transcription.language && (
              <p className="text-xs text-muted-foreground">
                Detected language: {transcription.language}
              </p>
            )}
          </div>
        )}

                 {/* Instructions */}
         <div className="text-xs text-muted-foreground space-y-1">
           <p>• Speak clearly and at a normal pace</p>
           <p>• Maximum recording time: {formatTime(maxDuration / 1000)}</p>
           <p>• Uses browser's built-in speech recognition</p>
         </div>
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder; 