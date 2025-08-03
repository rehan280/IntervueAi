interface CodeExecutionRequest {
  code: string;
  language: string;
  input?: string;
}

interface CodeExecutionResponse {
  output: string;
  error?: string;
  executionTime?: number;
  memoryUsed?: number;
}

interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  output: string;
  expectedOutput: string;
  executionTime: number;
}

// Backend API response interface
interface BackendApiResponse {
  success: boolean;
  output: string;
  error: string | null;
  type: 'success' | 'compilation' | 'runtime';
}

// Piston API response interface
interface PistonApiResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
}

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

// File extension mapping for better file naming
const FILE_EXTENSIONS: { [key: string]: string } = {
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

class CodeExecutionService {
  // Use environment variable for API base URL with fallback to localhost
  private apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  private serverUrl = `${this.apiBaseUrl}/api`;
  private pistonApiUrl = 'https://emkc.org/api/v2/piston/execute';

  // Get the correct API URL for production
  private getApiUrl(): string {
    if (import.meta.env.PROD) {
      // In production, use relative URL since frontend and backend are on same domain
      return '/api';
    }
    return this.serverUrl;
  }

  /**
   * Execute code using the backend proxy (recommended)
   * @param code - The source code to execute
   * @param language - The programming language (e.g., 'python', 'javascript', 'java', 'cpp', 'c')
   * @param version - Optional version override, defaults to the mapped version
   * @returns Promise<CodeExecutionResponse> - The execution result
   */
  async executeCodeWithBackend(
    code: string, 
    language: string, 
    version?: string
  ): Promise<CodeExecutionResponse> {
    try {
      // Validate input
      if (!code || !language) {
        return {
          output: '',
          error: 'Missing required parameters: code and language',
          executionTime: 0
        };
      }

      const response = await fetch(`${this.getApiUrl()}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          version
        })
      });

      // Handle HTTP errors
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If we can't parse the error response, use the status text
          errorMessage = `${errorMessage} - ${response.statusText}`;
        }
        
        return {
          output: '',
          error: errorMessage,
          executionTime: 0
        };
      }

      const result: BackendApiResponse = await response.json();
      
      if (result.success) {
        return {
          output: result.output,
          error: undefined,
          executionTime: 0
        };
      } else {
        return {
          output: result.output,
          error: result.error || 'Execution failed',
          executionTime: 0
        };
      }

    } catch (error) {
      console.error('Backend execution error:', error);
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          output: '',
          error: 'Network error: Unable to connect to the backend server. Please check if the server is running.',
          executionTime: 0
        };
      }
      
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Failed to execute code via backend',
        executionTime: 0
      };
    }
  }

  /**
   * Execute code using the Piston API directly (for reference)
   * @param code - The source code to execute
   * @param language - The programming language (e.g., 'python', 'javascript', 'java', 'cpp', 'c')
   * @param version - Optional version override, defaults to the mapped version
   * @returns Promise<CodeExecutionResponse> - The execution result
   */
  async executeCodeWithPiston(
    code: string, 
    language: string, 
    version?: string
  ): Promise<CodeExecutionResponse> {
    try {
      // Get the appropriate version for the language
      const languageKey = language.toLowerCase();
      const targetVersion = version || LANGUAGE_VERSIONS[languageKey];
      
      if (!targetVersion) {
        throw new Error(`Unsupported language: ${language}. Supported languages: ${Object.keys(LANGUAGE_VERSIONS).join(', ')}`);
      }

      const requestBody = {
        language: languageKey,
        version: targetVersion,
        files: [
          {
            name: this.getFileName(languageKey),
            content: code
          }
        ]
      };

      const response = await fetch(this.pistonApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const pistonResponse: PistonApiResponse = await response.json();
      
      // Handle compilation errors
      if (pistonResponse.compile && pistonResponse.compile.code !== 0) {
        return {
          output: '',
          error: `Compilation error: ${pistonResponse.compile.stderr || pistonResponse.compile.output}`,
          executionTime: 0
        };
      }

      // Handle runtime errors
      if (pistonResponse.run.code !== 0) {
        const errorMessage = pistonResponse.run.stderr || pistonResponse.run.output || 'Runtime error occurred';
        return {
          output: pistonResponse.run.stdout || '',
          error: errorMessage,
          executionTime: 0
        };
      }

      return {
        output: pistonResponse.run.stdout || '',
        error: undefined,
        executionTime: 0 // Piston API doesn't provide execution time
      };

    } catch (error) {
      console.error('Piston API execution error:', error);
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Failed to fetch from Piston API'
      };
    }
  }

  /**
   * Get appropriate filename for the given language
   */
  private getFileName(language: string): string {
    const extension = FILE_EXTENSIONS[language] || 'txt';
    return `main.${extension}`;
  }

  async executeCode(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    try {
      const response = await fetch(`${this.getApiUrl()}/execute-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: request.code,
          language: request.language,
          input: request.input || ''
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Code execution error:', error);
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred during code execution'
      };
    }
  }

  async runTestCases(
    code: string, 
    language: string, 
    testCases: Array<{ id: string; input: string; expectedOutput: string }>
  ): Promise<TestCaseResult[]> {
    const results: TestCaseResult[] = [];

    for (const testCase of testCases) {
      try {
        const startTime = Date.now();
        
        const executionResult = await this.executeCode({
          code,
          language,
          input: testCase.input
        });

        const executionTime = Date.now() - startTime;
        const output = executionResult.output?.trim() || '';
        const expectedOutput = testCase.expectedOutput.trim();
        const passed = !executionResult.error && output === expectedOutput;

        results.push({
          testCaseId: testCase.id,
          passed,
          output: executionResult.error ? `Error: ${executionResult.error}` : output,
          expectedOutput,
          executionTime
        });
      } catch (error) {
        results.push({
          testCaseId: testCase.id,
          passed: false,
          output: `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          expectedOutput: testCase.expectedOutput,
          executionTime: 0
        });
      }
    }

    return results;
  }

  // Get supported languages
  getSupportedLanguages(): string[] {
    return Object.keys(LANGUAGE_VERSIONS);
  }

  // Get language display names
  getLanguageDisplayName(language: string): string {
    const displayNames: { [key: string]: string } = {
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
}

// Create singleton instance
const codeExecutionService = new CodeExecutionService();

export default codeExecutionService; 