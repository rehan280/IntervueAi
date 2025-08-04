import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language: string, sourceCode: string) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

// For backward compatibility with existing interface
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

class CodeExecutionService {
  async executeCode(language: string, sourceCode: string): Promise<CodeExecutionResponse> {
    try {
      const result = await executeCode(language, sourceCode);
      
      if (result.run) {
        const run = result.run;
        
        if (run.stderr) {
          return {
            output: run.stdout || '',
            error: run.stderr,
            executionTime: run.time || 0
          };
        } else {
          return {
            output: run.stdout || '',
            error: undefined,
            executionTime: run.time || 0
          };
        }
      } else if (result.compile && result.compile.stderr) {
        return {
          output: '',
          error: result.compile.stderr,
          executionTime: 0
        };
      } else {
        return {
          output: '',
          error: 'Unknown execution error',
          executionTime: 0
        };
      }
    } catch (error) {
      console.error('Code execution error:', error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        return {
          output: '',
          error: `HTTP error! status: ${error.response?.status}, message: ${errorMessage}`
        };
      }
      
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Failed to execute code'
      };
    }
  }

  async executeCodeWithRequest(request: CodeExecutionRequest): Promise<CodeExecutionResponse> {
    return this.executeCode(request.language, request.code);
  }

  getSupportedLanguages(): string[] {
    return Object.keys(LANGUAGE_VERSIONS);
  }

  getLanguageDisplayName(language: string): string {
    const displayNames: { [key: string]: string } = {
      'python': 'Python 3',
      'javascript': 'JavaScript (Node.js)',
      'typescript': 'TypeScript',
      'java': 'Java',
      'csharp': 'C#',
      'php': 'PHP'
    };
    return displayNames[language] || language;
  }
}

const codeExecutionService = new CodeExecutionService();

export default codeExecutionService; 