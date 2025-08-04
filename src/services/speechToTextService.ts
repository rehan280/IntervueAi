export interface SpeechToTextResult {
  text: string;
  confidence: number;
  isFinal: boolean;
}

class SpeechToTextService {
  private recognition: any = null;
  private isSupported: boolean = false;

  constructor() {
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    // Check if speech recognition is supported
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.isSupported = true;
      // @ts-ignore
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    } else if (typeof window !== 'undefined' && 'SpeechRecognition' in window) {
      this.isSupported = true;
      // @ts-ignore
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    } else {
      this.isSupported = false;
    }
  }

  isSpeechRecognitionSupported(): boolean {
    return this.isSupported;
  }

  startRecognition(
    onResult: (result: SpeechToTextResult) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): void {
    if (!this.isSupported || !this.recognition) {
      onError('Speech recognition is not supported in this browser');
      return;
    }

    try {
      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = event.results[i][0].confidence;
          const isFinal = event.results[i].isFinal;

          if (isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const result: SpeechToTextResult = {
          text: finalTranscript || interimTranscript,
          confidence: confidence || 0,
          isFinal: finalTranscript.length > 0
        };

        onResult(result);
      };

      this.recognition.onerror = (event: any) => {
        let errorMessage = 'Speech recognition error';
        
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected';
            break;
          case 'audio-capture':
            errorMessage = 'Audio capture error';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied';
            break;
          case 'network':
            errorMessage = 'Network error';
            break;
          case 'service-not-allowed':
            errorMessage = 'Speech recognition service not allowed';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        onError(errorMessage);
      };

      this.recognition.onend = () => {
        onEnd();
      };

      this.recognition.start();
    } catch (error) {
      onError(`Failed to start speech recognition: ${error}`);
    }
  }

  stopRecognition(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }

  // Fallback method for browsers without speech recognition
  async transcribeAudio(audioBlob: Blob): Promise<SpeechToTextResult> {
    // This is a placeholder for actual audio transcription
    // In a real implementation, you would send the audio to a transcription service
    return {
      text: "Audio transcription not available in this browser",
      confidence: 0,
      isFinal: true
    };
  }
}

export const speechToTextService = new SpeechToTextService(); 