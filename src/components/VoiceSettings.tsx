import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Volume2, Settings } from "lucide-react";
import { elevenLabsVoiceService } from "@/services/voiceService";

interface VoiceSettingsProps {
  onClose: () => void;
}

const popularVoices = [
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", description: "Professional, clear" },
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria", description: "Warm, friendly" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", description: "Authoritative, confident" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", description: "Smooth, engaging" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", description: "Conversational, natural" }
];

const VoiceSettings = ({ onClose }: VoiceSettingsProps) => {
  const [apiKey, setApiKey] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(popularVoices[0]);
  const [testPlaying, setTestPlaying] = useState(false);

  const handleSaveSettings = () => {
    if (apiKey.trim()) {
      elevenLabsVoiceService.setApiKey(apiKey.trim());
      localStorage.setItem("elevenlabs_api_key", apiKey.trim());
      localStorage.setItem("selected_voice", JSON.stringify(selectedVoice));
    }
    onClose();
  };

  const testVoice = async () => {
    if (!apiKey.trim()) {
      alert("Please enter your ElevenLabs API key first");
      return;
    }

    setTestPlaying(true);
    try {
      elevenLabsVoiceService.setApiKey(apiKey.trim());
      await elevenLabsVoiceService.speak("Hello! This is a test of the ElevenLabs voice synthesis.", selectedVoice.id);
    } catch (error) {
      console.error("Voice test failed:", error);
      alert("Voice test failed. Please check your API key and try again.");
    } finally {
      setTestPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Voice Settings (ElevenLabs)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> ElevenLabs provides high-quality AI voices but requires an API key. 
              You can get one from <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="underline">elevenlabs.io</a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apikey">ElevenLabs API Key</Label>
            <Input
              id="apikey"
              type="password"
              placeholder="Enter your ElevenLabs API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>

          <div className="space-y-3">
            <Label>Choose Voice</Label>
            <div className="grid grid-cols-1 gap-3">
              {popularVoices.map((voice) => (
                <div
                  key={voice.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedVoice.id === voice.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedVoice(voice)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{voice.name}</h4>
                      <p className="text-sm text-muted-foreground">{voice.description}</p>
                    </div>
                    {selectedVoice.id === voice.id && (
                      <Badge variant="secondary">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={testVoice}
              disabled={!apiKey.trim() || testPlaying}
              className="flex-1"
            >
              <Volume2 className="h-4 w-4 mr-2" />
              {testPlaying ? "Playing..." : "Test Voice"}
            </Button>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} className="flex-1">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceSettings;