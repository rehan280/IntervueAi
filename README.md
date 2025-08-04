# IntervueAi - AI-Powered Interview Practice Platform

A comprehensive interview practice platform that uses AI to provide realistic interview experiences with voice interaction capabilities.

## 🚀 Features

### Core Features
- **AI-Powered Interview Questions**: Role-specific questions for various tech positions
- **Real-time AI Analysis**: Instant feedback on your answers using Gemini AI
- **Comprehensive Scoring**: Detailed breakdown of correctness, relevance, depth, and communication
- **Multiple Roles**: Support for software developer, frontend, backend, data scientist, product manager, UI/UX designer, DevOps, and AI/ML engineer

### 🎤 Voice Integration (NEW!)
- **Browser Text-to-Speech**: Built-in speech synthesis for reading interview questions
- **Speech-to-Text**: Record your answers naturally using browser's speech recognition
- **Real-time Transcription**: Automatic conversion of speech to text
- **No External APIs**: Uses browser's built-in capabilities - no API keys needed

### User Experience
- **Dual Input Methods**: Type or speak your answers
- **Progress Tracking**: Visual progress indicators and time estimates
- **Friendly Interface**: Encouraging feedback and helpful tips
- **Test Mode**: Try the AI evaluation system with sample questions
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn/ui, Tailwind CSS
- **AI Services**: Google Gemini AI
- **Voice Processing**: Web Speech API (Speech Recognition & Synthesis)
- **Routing**: React Router DOM

## 🎯 Voice Integration

This platform features simple and effective voice integration using browser capabilities:

### Text-to-Speech Features
- **Browser Speech Synthesis**: Built-in text-to-speech for reading questions
- **Automatic Playback**: Questions are read aloud automatically when voice is enabled
- **No External Dependencies**: Uses your browser's native capabilities

### Speech-to-Text Features
- **Real-time Speech Recognition**: Record your answers using your microphone
- **Automatic Transcription**: Convert speech to text using browser's speech recognition
- **Instant Results**: See your speech converted to text in real-time
- **No API Keys Required**: Works entirely in your browser

### Benefits
- **Privacy**: All processing happens locally in your browser
- **Cost**: No external API costs or usage limits
- **Simplicity**: No complex setup or configuration needed
- **Reliability**: Works offline and doesn't depend on external services

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with speech recognition support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd elevate-interview-ai-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   No API keys needed! The application uses browser's built-in speech recognition.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎤 Using Voice Features

### Enabling Voice Input
1. Start an interview session
2. Click the "Voice" tab in the answer input section
3. Click the microphone button to start recording
4. Speak your answer clearly
5. The AI will automatically transcribe your speech

### Customizing Voice Settings
1. Click the settings icon (⚙️) next to the voice controls
2. Choose your preferred AI voice
3. Adjust stability, similarity boost, and style settings
4. Test the voice with the test button
5. Save your preferences

### Tips for Best Results
- **Clear Speech**: Speak clearly and at a normal pace
- **Good Microphone**: Use a quality microphone for better transcription
- **Quiet Environment**: Minimize background noise
- **Natural Flow**: Speak naturally as you would in a real interview

## 🔧 Configuration

### ElevenLabs API Setup
1. Sign up at [ElevenLabs](https://elevenlabs.io)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file
4. The platform will automatically validate your API key

### Voice Features
- **Text-to-Speech**: Browser reads interview questions aloud
- **Speech-to-Text**: Speak your answers and see them transcribed instantly
- **Real-time Processing**: No delays or external API calls
- **Privacy-First**: All processing happens in your browser

## 📱 Browser Compatibility

### Voice Features
- **Chrome/Edge**: Full support for all voice features
- **Firefox**: Full support for all voice features
- **Safari**: Limited support (may require HTTPS)
- **Mobile**: Works on modern mobile browsers

### Requirements
- **Microphone Access**: Required for speech-to-text
- **Audio Output**: Required for text-to-speech
- **HTTPS**: Recommended for production (required for some browsers)

## 🎯 Interview Roles Supported

- **Software Developer**: General programming and development questions
- **Frontend Developer**: React, Vue, Angular, CSS, accessibility
- **Backend Developer**: Database design, API development, security
- **Data Scientist**: Machine learning, statistics, data analysis
- **Product Manager**: Product strategy, user research, agile methodologies
- **UI/UX Designer**: Design process, user research, prototyping
- **DevOps Engineer**: CI/CD, cloud platforms, infrastructure
- **AI/ML Engineer**: Deep learning, model deployment, MLOps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **ElevenLabs**: For providing high-quality AI voice synthesis and transcription
- **Google Gemini**: For AI-powered interview analysis
- **Shadcn/ui**: For beautiful UI components
- **Vite**: For fast development and building

## 🆘 Support

If you encounter any issues with the voice features:

1. **Check API Key**: Ensure your ElevenLabs API key is valid
2. **Browser Permissions**: Allow microphone access when prompted
3. **Network Connection**: Ensure stable internet connection
4. **Browser Compatibility**: Try using Chrome or Edge for best results

For additional support, please open an issue on GitHub.
