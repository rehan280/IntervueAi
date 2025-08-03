# Backend Proxy Setup for Piston API

This guide will help you set up the backend proxy server to handle CORS issues with the Piston API.

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start the Backend Server

```bash
npm start
```

Or for development with auto-restart:

```bash
npm run dev
```

### 3. Verify the Server is Running

Visit `http://localhost:5000/api/health` in your browser. You should see:

```json
{
  "status": "ok",
  "message": "Backend proxy server is running",
  "supportedLanguages": ["python", "javascript", "java", ...]
}
```

## 📁 Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
└── README.md         # This file

src/
├── services/
│   └── codeExecutionService.ts  # Updated to use backend proxy
└── components/
    └── CodeRunner.tsx           # React component for testing
```

## 🔧 Backend Features

### Supported Languages
The backend supports 30+ programming languages including:
- Python (3.10.0)
- JavaScript (18.15.0)
- Java (19.0.2)
- C++ (11.2.0)
- C (11.2.0)
- TypeScript, Ruby, Go, Rust, and many more

### API Endpoints

#### POST `/api/run`
Execute code via the Piston API proxy.

**Request Body:**
```json
{
  "code": "print('Hello, World!')",
  "language": "python",
  "version": "3.10.0"  // optional
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello, World!",
  "error": null,
  "type": "success"
}
```

#### GET `/api/health`
Health check endpoint.

#### GET `/api/languages`
Get list of supported languages and versions.

## 🎯 Usage Examples

### Using the React Component

```tsx
import CodeRunner from './components/CodeRunner';

function App() {
  return (
    <div>
      <h1>My Code Runner App</h1>
      <CodeRunner />
    </div>
  );
}
```

### Using the Service Directly

```typescript
import codeExecutionService from './services/codeExecutionService';

// Execute Python code
const result = await codeExecutionService.executeCodeWithBackend(
  'print("Hello, World!")',
  'python'
);

console.log('Output:', result.output);
if (result.error) {
  console.log('Error:', result.error);
}
```

## 🔍 Testing the Backend

### Test with curl

```bash
# Test Python
curl -X POST http://localhost:5000/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello from Python!\")",
    "language": "python"
  }'

# Test JavaScript
curl -X POST http://localhost:5000/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(\"Hello from JavaScript!\");",
    "language": "javascript"
  }'

# Test C++
curl -X POST http://localhost:5000/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "#include <iostream>\nint main() { std::cout << \"Hello from C++!\" << std::endl; return 0; }",
    "language": "cpp"
  }'
```

### Test with the React Component

1. Start your React app: `npm run dev`
2. Navigate to the page with the CodeRunner component
3. Select a language and click "Run Code"

## 🛠️ Troubleshooting

### Common Issues

1. **Port 5000 already in use**
   ```bash
   # Change the port in server.js
   const PORT = process.env.PORT || 5001;
   ```

2. **CORS errors**
   - Make sure the backend is running on the correct port
   - Check that the frontend is calling the correct backend URL

3. **Piston API errors**
   - Check your internet connection
   - Verify the code syntax for the selected language
   - Check the console for detailed error messages

### Debug Mode

Enable detailed logging by adding this to your server.js:

```javascript
// Add this after the imports
const DEBUG = process.env.DEBUG === 'true';

// Add this in the /api/run endpoint
if (DEBUG) {
  console.log('Request body:', requestBody);
  console.log('Piston response:', pistonData);
}
```

Then run with:
```bash
DEBUG=true npm start
```

## 🚀 Deployment

### Local Development
```bash
# Terminal 1: Start backend
cd backend && npm start

# Terminal 2: Start frontend
npm run dev
```

### Production Deployment

For production, you can deploy the backend to:
- **Vercel**: Use their serverless functions
- **Render**: Use their web service
- **Heroku**: Use their Node.js buildpack
- **Railway**: Simple deployment platform

Example for Vercel:
1. Create a `vercel.json` in the backend folder
2. Deploy with `vercel --prod`

## 📚 API Reference

### Error Responses

```json
{
  "error": "Compilation error: syntax error",
  "type": "compilation"
}
```

```json
{
  "error": "Runtime error: division by zero",
  "type": "runtime"
}
```

```json
{
  "error": "Request timeout - code execution took too long"
}
```

### Success Response

```json
{
  "success": true,
  "output": "Hello, World!",
  "error": null,
  "type": "success"
}
```

## 🔒 Security Considerations

- The backend acts as a proxy and doesn't store any code
- All code execution happens on Piston's servers
- The backend includes timeout protection (30 seconds)
- CORS is properly configured for local development

## 📞 Support

If you encounter issues:

1. Check the browser console for frontend errors
2. Check the terminal running the backend for server errors
3. Verify the backend is running on the correct port
4. Test the health endpoint: `http://localhost:5000/api/health`

## 🎉 Next Steps

Once the backend is running:

1. Test with the CodeRunner component
2. Integrate the `executeCodeWithBackend` method into your existing code
3. Customize the UI and add more features
4. Deploy to production when ready 