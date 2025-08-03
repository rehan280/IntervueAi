# Piston API Code Execution

This document explains how to use the Piston API code execution functionality that has been added to the codebase.

## Overview

The Piston API (`https://emkc.org/api/v2/piston/execute`) allows you to execute code in multiple programming languages directly from your JavaScript/TypeScript application. The implementation includes:

- Support for 30+ programming languages
- Automatic language-version mapping
- Comprehensive error handling
- TypeScript interfaces for type safety

## Usage

### Basic Usage

```typescript
import codeExecutionService from './src/services/codeExecutionService';

// Execute Python code
const pythonCode = `
print("Hello, World!")
x = 10
y = 20
print(f"Sum: {x + y}")
`;

const result = await codeExecutionService.executeCodeWithPiston(pythonCode, 'python');
console.log('Output:', result.output);
if (result.error) {
    console.log('Error:', result.error);
}
```

### Supported Languages

The function supports the following languages with their default versions:

| Language | Version | Language | Version |
|----------|---------|----------|---------|
| Python | 3.10.0 | C++ | 11.2.0 |
| JavaScript | 18.15.0 | C | 11.2.0 |
| Java | 19.0.2 | C# | 6.12.0.182 |
| TypeScript | 5.0.3 | PHP | 8.2.3 |
| Ruby | 3.2.2 | Swift | 5.8.0 |
| Go | 1.20.3 | Rust | 1.68.2 |
| Kotlin | 1.8.20 | Scala | 3.2.2 |
| R | 4.3.0 | Bash | 5.2.15 |
| And many more... |

### Function Signature

```typescript
async executeCodeWithPiston(
  code: string, 
  language: string, 
  version?: string
): Promise<CodeExecutionResponse>
```

**Parameters:**
- `code` (string): The source code to execute
- `language` (string): The programming language (e.g., 'python', 'javascript', 'java', 'cpp', 'c')
- `version` (optional string): Override the default version for the language

**Returns:**
```typescript
interface CodeExecutionResponse {
  output: string;        // Program output (stdout)
  error?: string;        // Error message if execution failed
  executionTime?: number; // Execution time (not provided by Piston API)
  memoryUsed?: number;   // Memory usage (not provided by Piston API)
}
```

## Examples

### Python Example

```typescript
const pythonCode = `
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
`;

const result = await codeExecutionService.executeCodeWithPiston(pythonCode, 'python');
```

### JavaScript Example

```typescript
const jsCode = `
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log("Original:", numbers);
console.log("Doubled:", doubled);
`;

const result = await codeExecutionService.executeCodeWithPiston(jsCode, 'javascript');
```

### C++ Example

```typescript
const cppCode = `
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}
`;

const result = await codeExecutionService.executeCodeWithPiston(cppCode, 'cpp');
```

### Java Example

```typescript
const javaCode = `
public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
    }
}
`;

const result = await codeExecutionService.executeCodeWithPiston(javaCode, 'java');
```

### C Example

```typescript
const cCode = `
#include <stdio.h>

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    printf("Sum: %d\\n", sum);
    return 0;
}
`;

const result = await codeExecutionService.executeCodeWithPiston(cCode, 'c');
```

## Error Handling

The function handles various types of errors gracefully:

### Compilation Errors

```typescript
const invalidCode = `
print("This has a syntax error"
print("Missing closing parenthesis")
`;

const result = await codeExecutionService.executeCodeWithPiston(invalidCode, 'python');
// result.error will contain the compilation error message
```

### Runtime Errors

```typescript
const runtimeErrorCode = `
x = 10
y = 0
result = x / y  # Division by zero
print(result)
`;

const result = await codeExecutionService.executeCodeWithPiston(runtimeErrorCode, 'python');
// result.error will contain the runtime error message
```

### Network Errors

The function handles network errors and returns appropriate error messages:

```typescript
// If the API is unavailable
const result = await codeExecutionService.executeCodeWithPiston(code, 'python');
// result.error will contain "Failed to fetch from Piston API"
```

## Custom Versions

You can specify a custom version for any language:

```typescript
// Use Python 3.9.0 instead of the default 3.10.0
const result = await codeExecutionService.executeCodeWithPiston(code, 'python', '3.9.0');
```

## Testing

To test the functionality, you can use the provided test files:

```typescript
import testPistonAPI from './src/services/pistonTest';
import PistonExample from './src/services/pistonExample';

// Run basic tests
await testPistonAPI();

// Run comprehensive examples
await PistonExample.runAllExamples();
```

## Integration with Existing Code

The Piston API function is integrated into the existing `CodeExecutionService` class, so you can use it alongside the existing local server functionality:

```typescript
// Use Piston API
const pistonResult = await codeExecutionService.executeCodeWithPiston(code, 'python');

// Use local server (existing functionality)
const localResult = await codeExecutionService.executeCode({
  code: code,
  language: 'python',
  input: 'optional input'
});
```

## Security Considerations

- The Piston API runs code in a sandboxed environment
- No persistent storage between executions
- Network access is limited
- Execution time is limited
- Memory usage is limited

## Rate Limiting

The Piston API may have rate limits. Consider implementing appropriate delays between requests if making multiple calls.

## Troubleshooting

### Common Issues

1. **"Unsupported language" error**: Check that the language is in the `LANGUAGE_VERSIONS` mapping
2. **Network errors**: Ensure you have internet connectivity
3. **Compilation errors**: Check your code syntax for the specified language
4. **Timeout errors**: The API may timeout for long-running code

### Debugging

Enable console logging to see detailed error information:

```typescript
const result = await codeExecutionService.executeCodeWithPiston(code, 'python');
console.log('Full result:', result);
```

## API Reference

For more information about the Piston API, visit: https://emkc.org/api/v2/piston/execute 