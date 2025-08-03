# Interview AI Setup Guide

## 🚀 Quick Start

### 1. Install Backend Dependencies
```bash
# Install backend dependencies
npm install express cors axios nodemon
```

### 2. Start Backend Server
```bash
# Start the backend server (runs on port 5000)
node server.js
```

### 3. Start Frontend
```bash
# In a new terminal, start the React frontend
npm run dev
```

## 📁 Project Structure

```
elevate-interview-ai-main/
├── server.js                 # Backend API server
├── package-server.json       # Backend dependencies
├── src/
│   ├── services/
│   │   ├── analysisService.ts    # New API service
│   │   └── geminiService.ts      # Original service
│   └── components/
│       └── InterviewSession.tsx  # Updated component
└── SETUP.md                 # This file
```

## 🔧 Features

### Enhanced Analysis System
- **Real-time analysis** through backend API
- **Detailed scoring** for 4 criteria (Correctness, Relevance, Depth & Detail, Communication)
- **Star rating visualization** for each criterion
- **Unique feedback** based on actual answer content

### Test Cases
- **Sample 1**: Very Poor Answer ("React is good.") - Should get 1-2/10
- **Sample 2**: Excellent STAR Answer - Should get 8-10/10
- **Sample 3**: Average Answer - Should get 5-7/10
- **Sample 4**: Technical Answer - Should get 7-9/10
- **Sample 5**: Unprofessional Answer - Should get 2-4/10

## 🧪 Testing

1. **Start both servers** (backend on port 5000, frontend on port 8080)
2. **Click "Test Evaluation"** in the interview session
3. **Try the sample cases** to see different quality evaluations
4. **Enter custom answers** to test specific scenarios

## 🔐 Security Notes

- API key is stored in the backend (server.js)
- Frontend makes calls to backend API
- No API keys exposed in frontend code

## 🎯 Expected Results

The new system should provide:
- **Unique analysis** for each answer (no more generic feedback)
- **Detailed scoring** with specific examples
- **Visual star ratings** for each criterion
- **Real-time quality indicators** as you type

## 🐛 Troubleshooting

If you get errors:
1. Make sure backend is running on port 5000
2. Check that frontend is running on port 8080
3. Verify API key is valid in server.js
4. Check browser console for CORS errors 