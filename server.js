const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Your Gemini API key (store this in environment variables in production)
const GEMINI_API_KEY = "AIzaSyDFM8qiKycEK_x0nbMNGgTaKK8wCwI-gKE";

// Piston API configuration for code execution
const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

// Language mapping for Piston API
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

app.post("/api/analyze", async (req, res) => {
  const { question, answer, role } = req.body;
  
  try {
    const prompt = `You are an expert interview evaluator. Analyze this specific answer in detail and provide a comprehensive evaluation.

CONTEXT:
Role: ${role}
Question: "${question}"
Answer: "${answer}"

ANALYSIS REQUIREMENTS:
1. **Correctness (1-10)**: Evaluate factual accuracy, technical knowledge, and truthfulness
2. **Relevance (1-10)**: Assess if the answer directly addresses the question and stays on topic
3. **Depth & Detail (1-10)**: Rate the level of detail, examples provided, and thoroughness
4. **Communication (1-10)**: Evaluate clarity, structure, and professional presentation

SCORING GUIDELINES:
- 9-10: Exceptional quality, demonstrates expertise
- 7-8: Good quality with minor areas for improvement
- 5-6: Adequate but needs significant improvement
- 3-4: Poor quality with major issues
- 1-2: Very poor quality, largely irrelevant or incorrect

PROVIDE DETAILED ANALYSIS IN THIS EXACT FORMAT:

---
**Overall Score: [X]/10**

**Detailed Scoring:**
✅ Correctness: [X]/10 - [Specific analysis of factual accuracy]
🎯 Relevance: [X]/10 - [Specific analysis of how well it addresses the question]
📚 Depth & Detail: [X]/10 - [Specific analysis of examples and thoroughness]
💬 Communication: [X]/10 - [Specific analysis of clarity and structure]

**Strengths:**
• [Specific strength 1 based on the actual answer]
• [Specific strength 2 based on the actual answer]
• [Specific strength 3 based on the actual answer]

**Areas for Improvement:**
• [Specific improvement 1 based on actual gaps in the answer]
• [Specific improvement 2 based on actual gaps in the answer]
• [Specific improvement 3 based on actual gaps in the answer]

**Key Recommendation:**
[One specific, actionable tip based on the biggest gap identified in this particular answer]

**Detailed Analysis:**
[2-3 sentences providing deeper insight into the answer quality, specific examples of what was good/bad, and how it could be improved]

---

IMPORTANT: 
- Base your analysis on the ACTUAL content of the answer provided
- Be specific about what was said and what was missing
- Provide unique feedback that reflects the particular answer given
- Don't give generic feedback - analyze the specific response
- Consider the role requirements when evaluating technical depth
- Be honest and accurate in your assessment`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      },
      { 
        headers: { 
          "Content-Type": "application/json" 
        } 
      }
    );

    const analysis = response.data.candidates[0].content.parts[0].text;
    res.json({ analysis });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: "Analysis failed", details: error.message });
  }
});

// Code execution endpoint using Piston API
app.post("/api/execute-code", async (req, res) => {
  const { code, language, input } = req.body;
  
  try {
    const languageVersion = LANGUAGE_VERSIONS[language];
    
    if (!languageVersion) {
      return res.status(400).json({
        error: `Language '${language}' is not supported. Supported languages: ${Object.keys(LANGUAGE_VERSIONS).join(', ')}`
      });
    }

    // Execute code using Piston API
    const response = await axios.post(PISTON_API_URL, {
      language: language,
      version: languageVersion,
      files: [
        {
          name: getFileName(language),
          content: code
        }
      ],
      stdin: input || '',
      args: []
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 seconds timeout
    });

    const result = response.data;

    // Handle Piston API response
    if (result.run) {
      const run = result.run;
      
      if (run.signal) {
        // Code was killed (timeout, memory limit, etc.)
        res.json({
          output: run.stdout || '',
          error: `Execution killed: ${run.signal}`,
          executionTime: run.time || 0,
          memoryUsed: run.memory || 0
        });
      } else if (run.stderr) {
        // Runtime error
        res.json({
          output: run.stdout || '',
          error: `Runtime Error:\n${run.stderr}`,
          executionTime: run.time || 0,
          memoryUsed: run.memory || 0
        });
      } else {
        // Successful execution
        res.json({
          output: run.stdout || '',
          executionTime: run.time || 0,
          memoryUsed: run.memory || 0
        });
      }
    } else if (result.compile && result.compile.stderr) {
      // Compilation error
      res.json({
        output: '',
        error: `Compilation Error:\n${result.compile.stderr}`,
        executionTime: 0,
        memoryUsed: 0
      });
    } else {
      // Unknown error
      res.json({
        output: '',
        error: 'Unknown execution error',
        executionTime: 0,
        memoryUsed: 0
      });
    }
  } catch (error) {
    console.error("Code execution error:", error);
    
    if (error.code === 'ECONNABORTED') {
      res.status(408).json({
        error: 'Code execution timed out. Please try again.'
      });
    } else {
      res.status(500).json({
        error: error.message || 'Unknown error occurred during code execution'
      });
    }
  }
});

// Helper function to get appropriate filename for each language
function getFileName(language) {
  const fileExtensions = {
    'python': 'main.py',
    'javascript': 'main.js',
    'java': 'Main.java',
    'cpp': 'main.cpp',
    'c': 'main.c',
    'csharp': 'main.cs',
    'php': 'main.php',
    'ruby': 'main.rb',
    'swift': 'main.swift',
    'go': 'main.go',
    'rust': 'main.rs',
    'kotlin': 'Main.kt',
    'typescript': 'main.ts',
    'scala': 'main.scala',
    'r': 'main.R',
    'bash': 'main.sh',
    'cobol': 'main.cob',
    'crystal': 'main.cr',
    'elixir': 'main.exs',
    'erlang': 'main.erl',
    'fsharp': 'main.fs',
    'fortran': 'main.f90',
    'haskell': 'main.hs',
    'julia': 'main.jl',
    'lua': 'main.lua',
    'nim': 'main.nim',
    'nasm': 'main.asm',
    'ocaml': 'main.ml',
    'pascal': 'main.pas',
    'perl': 'main.pl',
    'prolog': 'main.pl',
    'sqlite': 'main.sql'
  };
  
  return fileExtensions[language] || 'main.txt';
}

// Get supported languages endpoint
app.get("/api/languages", (req, res) => {
  const languages = Object.keys(LANGUAGE_VERSIONS).map(lang => ({
    value: lang,
    label: getLanguageDisplayName(lang),
    version: LANGUAGE_VERSIONS[lang]
  }));
  res.json(languages);
});

function getLanguageDisplayName(language) {
  const displayNames = {
    'python': 'Python 3',
    'javascript': 'JavaScript (Node.js)',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'csharp': 'C#',
    'php': 'PHP',
    'ruby': 'Ruby',
    'swift': 'Swift',
    'go': 'Go',
    'rust': 'Rust',
    'kotlin': 'Kotlin',
    'typescript': 'TypeScript',
    'scala': 'Scala',
    'r': 'R',
    'bash': 'Bash',
    'cobol': 'COBOL',
    'crystal': 'Crystal',
    'elixir': 'Elixir',
    'erlang': 'Erlang',
    'fsharp': 'F#',
    'fortran': 'Fortran',
    'haskell': 'Haskell',
    'julia': 'Julia',
    'lua': 'Lua',
    'nim': 'Nim',
    'nasm': 'NASM',
    'ocaml': 'OCaml',
    'pascal': 'Pascal',
    'perl': 'Perl',
    'prolog': 'Prolog',
    'sqlite': 'SQLite'
  };
  return displayNames[language] || language;
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`💻 Code execution service available at http://localhost:${PORT}/api/execute-code`);
  console.log(`🌐 Using Piston API for secure code execution`);
  console.log(`📚 Supporting ${Object.keys(LANGUAGE_VERSIONS).length} programming languages`);
}); 