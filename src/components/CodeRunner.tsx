import React, { useState } from 'react';
import codeExecutionService from '../services/codeExecutionService';

interface CodeRunnerProps {
  className?: string;
}

const CodeRunner: React.FC<CodeRunnerProps> = ({ className }) => {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int x = 10;
        int y = 20;
        System.out.println("Sum: " + (x + y));
    }
}`);
  const [language, setLanguage] = useState('java');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const supportedLanguages = [
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' }
  ];

  const runCode = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');

    try {
      const result = await codeExecutionService.executeCode(language, code);
      
      if (result.error) {
        setError(result.error);
      } else {
        setOutput(result.output);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to execute code';
      setError(`Execution failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = (lang: string) => {
    setLanguage(lang);
    
    const examples: { [key: string]: string } = {
      python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
      
      javascript: `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

for (let i = 0; i < 10; i++) {
    console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
      
      java: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
        
        // Fibonacci example
        for (int i = 0; i < 10; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    std::cout << "Sum: " << sum << std::endl;
    
    for (int i = 0; i < 10; i++) {
        std::cout << "F(" << i << ") = " << fibonacci(i) << std::endl;
    }
    
    return 0;
}`,
      
      c: `#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    printf("Sum: %d\\n", sum);
    
    for (int i = 0; i < 10; i++) {
        printf("F(%d) = %d\\n", i, fibonacci(i));
    }
    
    return 0;
}`
    };

    setCode(examples[lang] || examples.python);
  };

  const clearOutput = () => {
    setOutput('');
    setError('');
  };

  return (
    <div className={`code-runner ${className || ''}`}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Code Runner</h2>
        
        <div className="flex gap-4 mb-4">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 border border-border bg-card text-foreground rounded-md"
          >
            {supportedLanguages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={runCode}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Running...
              </span>
            ) : (
              'Run Code'
            )}
          </button>

          <button
            onClick={clearOutput}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80"
          >
            Clear Output
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Quick Examples:</h3>
          <div className="flex gap-2 flex-wrap">
            {supportedLanguages.slice(0, 5).map(lang => (
              <button
                key={lang.value}
                onClick={() => loadExample(lang.value)}
                className="px-3 py-1 text-sm bg-muted/50 text-foreground rounded hover:bg-muted/80"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Code Editor</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={15}
            className="w-full p-3 border border-border bg-card text-foreground rounded-md font-mono text-sm"
            placeholder="Enter your code here..."
            disabled={isLoading}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">Output</h3>
          <div className="p-3 border border-border bg-muted/20 rounded-md min-h-[300px]">
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Running code...
              </div>
            )}
            
            {!isLoading && output && (
              <div className="mb-4">
                <h4 className="font-semibold text-green-500 mb-1">Output:</h4>
                <pre className="whitespace-pre-wrap text-sm bg-card/50 p-2 rounded border border-border overflow-auto max-h-48 text-foreground">
                  {output}
                </pre>
              </div>
            )}
            
            {!isLoading && error && (
              <div>
                <h4 className="font-semibold text-red-500 mb-1">Error:</h4>
                <pre className="whitespace-pre-wrap text-sm bg-red-950/20 p-2 rounded border border-red-800/30 text-red-400 overflow-auto max-h-48">
                  {error}
                </pre>
              </div>
            )}
            
            {!isLoading && !output && !error && (
              <div className="text-muted-foreground">
                Run your code to see the output here.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="text-sm space-y-1">
          <li>• Select a programming language from the dropdown</li>
          <li>• Write your code in the editor</li>
          <li>• Click "Run Code" to execute it via the backend proxy</li>
          <li>• View the output or any errors in the results panel</li>
          <li>• Try the quick examples to see different languages in action</li>
          <li>• Use "Clear Output" to reset the results panel</li>
        </ul>
      </div>

      {/* Environment Info */}
      {import.meta.env.DEV && (
        <div className="mt-4 p-2 bg-yellow-50 rounded text-xs text-gray-600">
          <strong>Development Mode:</strong> API Base URL: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}
        </div>
      )}
    </div>
  );
};

export default CodeRunner;