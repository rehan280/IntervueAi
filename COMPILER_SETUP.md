# 🚀 Code Compiler Setup Guide

This guide will help you set up the working code compiler for your IntervueAi platform using **Piston API** - a powerful, free code execution service.

## ✅ What's Been Implemented

I've implemented a complete code execution system using Piston API:

- **Real Code Execution**: Using Piston API (free, no API key required)
- **Multi-Language Support**: 30+ programming languages
- **Server-Side Processing**: Secure sandboxed execution
- **Error Handling**: Compilation, runtime, and timeout errors
- **Performance Metrics**: Execution time and memory usage

## 🔧 Setup Steps

### 1. No API Key Required! 🎉

Piston API is completely free and doesn't require any API key or registration. This makes it much easier to set up than other services.

### 2. Set Environment Variables

Create a `.env` file in your project root (optional, for Gemini API only):

```env
# Gemini API Key (already configured)
GEMINI_API_KEY=AIzaSyDFM8qiKycEK_x0nbMNGgTaKK8wCwI-gKE
```

### 3. Install Dependencies

```bash
npm install axios
```

### 4. Start the Server

```bash
node server.js
```

The server will start on `http://localhost:5000` with these endpoints:
- `POST /api/analyze` - Interview analysis (existing)
- `POST /api/execute-code` - Code execution (new)
- `GET /api/languages` - Supported languages (new)

## 🎯 Supported Languages

The compiler supports **30+ programming languages**:

| Language | Version | Language | Version |
|----------|---------|----------|---------|
| Python | 3.10.0 | Bash | 5.2.15 |
| JavaScript | 18.15.0 | COBOL | 3.1.2 |
| Java | 19.0.2 | Crystal | 1.8.2 |
| C++ | 11.2.0 | Elixir | 1.14.4 |
| C | 11.2.0 | Erlang | 25.3 |
| C# | 6.12.0.182 | F# | 7.0.0 |
| PHP | 8.2.3 | Fortran | 12.2.0 |
| Ruby | 3.2.2 | Haskell | 9.4.5 |
| Swift | 5.8.0 | Julia | 1.8.5 |
| Go | 1.20.3 | Lua | 5.4.6 |
| Rust | 1.68.2 | Nim | 1.6.10 |
| Kotlin | 1.8.20 | NASM | 2.16.01 |
| TypeScript | 5.0.3 | OCaml | 5.0.0 |
| Scala | 3.2.2 | Pascal | 3.2.2 |
| R | 4.3.0 | Perl | 5.36.1 |
| | | Prolog | 9.2.3 |
| | | SQLite | 3.42.0 |

## 🔄 How It Works

### Frontend (React)
- `src/services/codeExecutionService.ts` - Handles API calls
- Sends code to server endpoint
- Displays results and errors

### Backend (Express)
- `server.js` - Processes code execution requests
- Uses Piston API for secure sandboxed execution
- Handles multiple languages and error types

### Code Execution Flow
1. User writes code in the editor
2. Frontend sends code to `/api/execute-code`
3. Server sends code to Piston API
4. Piston executes code in secure sandbox
5. Results returned to frontend
6. Output displayed to user

## 🛡️ Security Features

- **Sandboxed Execution**: Code runs in isolated environment
- **Timeout Protection**: 30-second execution limit
- **Memory Limits**: Prevents resource abuse
- **Input Validation**: Sanitizes user input
- **Error Handling**: Graceful error management

## 🧪 Testing the Compiler

### Test with Python
```python
print("Hello, IntervueAi!")
```

### Test with JavaScript
```javascript
console.log("Code execution working!");
```

### Test with Java
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Java execution successful!");
    }
}
```

### Test with Rust
```rust
fn main() {
    println!("Rust execution working!");
}
```

### Test with Go
```go
package main

import "fmt"

func main() {
    fmt.Println("Go execution successful!")
}
```

## 🚨 Troubleshooting

### Common Issues

1. **"Language not supported"**
   - Check the language mapping in `server.js`
   - Ensure language name matches exactly

2. **"Code execution timed out"**
   - Code took too long to execute
   - Simplify the code or check for infinite loops

3. **"Compilation Error"**
   - Check syntax for the selected language
   - Ensure proper imports and structure

4. **"Runtime Error"**
   - Check for logical errors in code
   - Verify input/output handling

### API Issues

1. **"Connection timeout"**
   - Check your internet connection
   - Piston API might be temporarily unavailable

2. **"Rate limit exceeded"**
   - Piston has generous limits but may throttle excessive requests
   - Wait a moment and try again

## 📈 Performance

- **Execution Time**: Typically 1-3 seconds
- **Memory Usage**: Limited per execution
- **Concurrent Requests**: Handled by Piston API
- **Reliability**: High uptime via Piston's infrastructure

## 🔗 Resources

- [Piston API Documentation](https://github.com/engineer-man/piston)
- [Piston API Endpoint](https://emkc.org/api/v2/piston/execute)
- [Code-Craft Repository](https://github.com/burakorkmez/code-craft)

## 🎉 Success!

Once set up, your IntervueAi platform will have a fully functional code compiler that:

- ✅ Executes real code in 30+ languages
- ✅ Provides detailed error messages
- ✅ Shows execution metrics
- ✅ Handles test cases
- ✅ Works seamlessly with your interview system
- ✅ **Completely free** - no API keys or costs

The compiler is now ready to enhance your interview practice platform with real coding challenges! 