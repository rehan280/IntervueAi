// Voice service for text-to-speech functionality
// Note: This is a basic implementation. For production, integrate with ElevenLabs API

export class VoiceService {
  private synthesis: SpeechSynthesis;
  private isSupported: boolean;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.isSupported = 'speechSynthesis' in window;
  }

  async speak(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: string;
  } = {}): Promise<void> {
    if (!this.isSupported) {
      console.warn("Speech synthesis not supported");
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 0.8;

      // Try to use a more natural voice
      const voices = this.synthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Enhanced') ||
        voice.name.includes('Premium')
      ) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      this.synthesis.speak(utterance);
    });
  }

  stop(): void {
    if (this.isSupported) {
      this.synthesis.cancel();
    }
  }

  isVoiceSupported(): boolean {
    return this.isSupported;
  }

  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.isSupported ? this.synthesis.getVoices() : [];
  }
}

export const voiceService = new VoiceService();

// For ElevenLabs integration (requires API key to be set up properly)
export class ElevenLabsVoiceService {
  private apiKey: string | null = null;
  
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async speak(text: string, voiceId: string = "EXAVITQu4vr4xnSDxMaL"): Promise<void> {
    if (!this.apiKey) {
      console.warn("ElevenLabs API key not set, falling back to browser TTS");
      return voiceService.speak(text);
    }

    try {
      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": this.apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        return new Promise((resolve, reject) => {
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            resolve();
          };
          audio.onerror = reject;
          audio.play().catch(reject);
        });
      } else {
        throw new Error("ElevenLabs API error");
      }
    } catch (error) {
      console.error("ElevenLabs TTS error, falling back to browser TTS:", error);
      return voiceService.speak(text);
    }
  }
}

export const elevenLabsVoiceService = new ElevenLabsVoiceService();