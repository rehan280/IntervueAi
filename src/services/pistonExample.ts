import codeExecutionService from './codeExecutionService';

/**
 * Example usage of the Piston API code execution function
 */
export class PistonExample {
  
  /**
   * Example: Execute Python code
   */
  static async runPythonExample() {
    const pythonCode = `
print("Hello, World!")
print("Python is running on Piston API!")
x = 10
y = 20
print(f"Sum: {x + y}")
`;

    console.log('Running Python example...');
    const result = await codeExecutionService.executeCodeWithPiston(pythonCode, 'python');
    console.log('Python Result:', result);
    return result;
  }

  /**
   * Example: Execute JavaScript code
   */
  static async runJavaScriptExample() {
    const jsCode = `
console.log("Hello from JavaScript!");
console.log("Running on Node.js via Piston API");

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of numbers:", sum);
`;

    console.log('Running JavaScript example...');
    const result = await codeExecutionService.executeCodeWithPiston(jsCode, 'javascript');
    console.log('JavaScript Result:', result);
    return result;
  }

  /**
   * Example: Execute C++ code
   */
  static async runCppExample() {
    const cppCode = `
#include <iostream>
#include <vector>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    std::cout << "Running on Piston API" << std::endl;
    
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    std::cout << "Sum of numbers: " << sum << std::endl;
    
    return 0;
}
`;

    console.log('Running C++ example...');
    const result = await codeExecutionService.executeCodeWithPiston(cppCode, 'cpp');
    console.log('C++ Result:', result);
    return result;
  }

  /**
   * Example: Execute Java code
   */
  static async runJavaExample() {
    const javaCode = `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        System.out.println("Running on Piston API");
        
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum of numbers: " + sum);
    }
}
`;

    console.log('Running Java example...');
    const result = await codeExecutionService.executeCodeWithPiston(javaCode, 'java');
    console.log('Java Result:', result);
    return result;
  }

  /**
   * Example: Execute C code
   */
  static async runCExample() {
    const cCode = `
#include <stdio.h>

int main() {
    printf("Hello from C!\\n");
    printf("Running on Piston API\\n");
    
    int numbers[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    printf("Sum of numbers: %d\\n", sum);
    
    return 0;
}
`;

    console.log('Running C example...');
    const result = await codeExecutionService.executeCodeWithPiston(cCode, 'c');
    console.log('C Result:', result);
    return result;
  }

  /**
   * Example: Handle compilation error
   */
  static async runErrorExample() {
    const invalidCode = `
print("This will cause a syntax error"
print("Missing closing parenthesis")
`;

    console.log('Running error example...');
    const result = await codeExecutionService.executeCodeWithPiston(invalidCode, 'python');
    console.log('Error Result:', result);
    return result;
  }

  /**
   * Example: Use custom version
   */
  static async runCustomVersionExample() {
    const pythonCode = `
import sys
print(f"Python version: {sys.version}")
print("Hello from custom version!")
`;

    console.log('Running custom version example...');
    const result = await codeExecutionService.executeCodeWithPiston(pythonCode, 'python', '3.9.0');
    console.log('Custom Version Result:', result);
    return result;
  }

  /**
   * Run all examples
   */
  static async runAllExamples() {
    console.log('=== Piston API Code Execution Examples ===\n');

    try {
      await this.runPythonExample();
      console.log('\n' + '='.repeat(50) + '\n');
      
      await this.runJavaScriptExample();
      console.log('\n' + '='.repeat(50) + '\n');
      
      await this.runCppExample();
      console.log('\n' + '='.repeat(50) + '\n');
      
      await this.runJavaExample();
      console.log('\n' + '='.repeat(50) + '\n');
      
      await this.runCExample();
      console.log('\n' + '='.repeat(50) + '\n');
      
      await this.runErrorExample();
      console.log('\n' + '='.repeat(50) + '\n');
      
      await this.runCustomVersionExample();
      
    } catch (error) {
      console.error('Error running examples:', error);
    }
  }
}

// Export for use in other files
export default PistonExample; 