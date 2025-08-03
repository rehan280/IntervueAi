const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Language version mapping
const LANGUAGE_VERSIONS = {
  'python': '3.10.0',
  'javascript': '18.15.0',
  'java': '19.0.2',
  'cpp': '11.2.0',
  'c': '11.2.0',
  'csharp': '6.12.0.182',
  'php': '8.2.3',
  'ruby': '3.2.2',
  'swift': '5.8.0',
  'go': '1.20.3',
  'rust': '1.68.2',
  'kotlin': '1.8.20',
  'typescript': '5.0.3',
  'scala': '3.2.2',
  'r': '4.3.0',
  'bash': '5.2.15',
  'cobol': '3.1.2',
  'crystal': '1.8.2',
  'elixir': '1.14.4',
  'erlang': '25.3',
  'fsharp': '7.0.0',
  'fortran': '12.2.0',
  'haskell': '9.4.5',
  'julia': '1.8.5',
  'lua': '5.4.6',
  'nim': '1.6.10',
  'nasm': '2.16.01',
  'ocaml': '5.0.0',
  'pascal': '3.2.2',
  'perl': '5.36.1',
  'prolog': '9.2.3',
  'sqlite': '3.42.0'
};

// Improved file extension mapping
const FILE_EXTENSIONS = {
  'python': 'py',
  'javascript': 'js',
  'java': 'java',
  'cpp': 'cpp',
  'c': 'c',
  'csharp': 'cs',
  'php': 'php',
  'ruby': 'rb',
  'swift': 'swift',
  'go': 'go',
  'rust': 'rs',
  'kotlin': 'kt',
  'typescript': 'ts',
  'scala': 'scala',
  'r': 'r',
  'bash': 'sh',
  'cobol': 'cob',
  'crystal': 'cr',
  'elixir': 'exs',
  'erlang': 'erl',
  'fsharp': 'fs',
  'fortran': 'f90',
  'haskell': 'hs',
  'julia': 'jl',
  'lua': 'lua',
  'nim': 'nim',
  'nasm': 'asm',
  'ocaml': 'ml',
  'pascal': 'pas',
  'perl': 'pl',
  'prolog': 'pl',
  'sqlite': 'sql'
};

// Get appropriate filename for the given language
function getFileName(language) {
  const extension = FILE_EXTENSIONS[language] || 'txt';
  return `main.${extension}`;
}

// Input validation middleware
function validateCodeExecution(req, res, next) {
  const { code, language } = req.body;
  
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ 
      error: "Missing or invalid 'code' parameter" 
    });
  }
  
  if (!language || typeof language !== 'string') {
    return res.status(400).json({ 
      error: "Missing or invalid 'language' parameter" 
    });
  }
  
  // Check code length (limit to 50KB)
  if (code.length > 50000) {
    return res.status(400).json({ 
      error: "Code too large. Maximum size is 50KB" 
    });
  }
  
  next();
}

app.post("/api/run", validateCodeExecution, async (req, res) => {
  try {
    const { code, language, version } = req.body;
    
    // Get the appropriate version for the language
    const languageKey = language.toLowerCase();
    const targetVersion = version || LANGUAGE_VERSIONS[languageKey];
    
    if (!targetVersion) {
      return res.status(400).json({ 
        error: `Unsupported language: ${language}. Supported languages: ${Object.keys(LANGUAGE_VERSIONS).join(', ')}` 
      });
    }

    const requestBody = {
      language: languageKey,
      version: targetVersion,
      files: [
        {
          name: getFileName(languageKey),
          content: code
        }
      ]
    };

    console.log(`Executing ${languageKey} code with version ${targetVersion}`);
    
    const pistonRes = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000 // 30 second timeout
      }
    );

    const pistonData = pistonRes.data;
    
    // Handle compilation errors
    if (pistonData.compile && pistonData.compile.code !== 0) {
      return res.json({
        success: false,
        output: '',
        error: `Compilation error: ${pistonData.compile.stderr || pistonData.compile.output}`,
        type: 'compilation'
      });
    }

    // Handle runtime errors
    if (pistonData.run.code !== 0) {
      return res.json({
        success: false,
        output: pistonData.run.stdout || '',
        error: pistonData.run.stderr || pistonData.run.output || 'Runtime error occurred',
        type: 'runtime'
      });
    }

    // Success case
    res.json({
      success: true,
      output: pistonData.run.stdout || '',
      error: null,
      type: 'success'
    });

  } catch (err) {
    console.error("Piston API Error:", err.message);
    
    if (err.code === 'ECONNABORTED') {
      return res.status(408).json({ 
        error: "Request timeout - code execution took too long" 
      });
    }
    
    if (err.response) {
      return res.status(err.response.status).json({ 
        error: `Piston API error: ${err.response.data?.message || err.message}` 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to execute code", 
      detail: err.message 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Backend proxy server is running",
    supportedLanguages: Object.keys(LANGUAGE_VERSIONS),
    timestamp: new Date().toISOString()
  });
});

// Get supported languages
app.get("/api/languages", (req, res) => {
  res.json({
    languages: LANGUAGE_VERSIONS,
    extensions: FILE_EXTENSIONS,
    count: Object.keys(LANGUAGE_VERSIONS).length
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend proxy server running on http://localhost:${PORT}`);
  console.log(`📝 Supported languages: ${Object.keys(LANGUAGE_VERSIONS).length}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 