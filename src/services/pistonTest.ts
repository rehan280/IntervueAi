import codeExecutionService from './codeExecutionService';

/**
 * Simple test function to demonstrate Piston API usage
 */
export async function testPistonAPI() {
  console.log('Testing Piston API Code Execution...\n');

  // Test 1: Python
  console.log('=== Test 1: Python ===');
  const pythonCode = `
print("Hello from Python!")
print("Testing Piston API")
result = 2 + 3 * 4
print(f"2 + 3 * 4 = {result}")
`;

  try {
    const pythonResult = await codeExecutionService.executeCodeWithPiston(pythonCode, 'python');
    console.log('Python Output:', pythonResult.output);
    if (pythonResult.error) {
      console.log('Python Error:', pythonResult.error);
    }
  } catch (error) {
    console.error('Python test failed:', error);
  }

  console.log('\n' + '='.repeat(40) + '\n');

  // Test 2: JavaScript
  console.log('=== Test 2: JavaScript ===');
  const jsCode = `
console.log("Hello from JavaScript!");
console.log("Testing Piston API");

const arr = [1, 2, 3, 4, 5];
const doubled = arr.map(x => x * 2);
console.log("Original array:", arr);
console.log("Doubled array:", doubled);
`;

  try {
    const jsResult = await codeExecutionService.executeCodeWithPiston(jsCode, 'javascript');
    console.log('JavaScript Output:', jsResult.output);
    if (jsResult.error) {
      console.log('JavaScript Error:', jsResult.error);
    }
  } catch (error) {
    console.error('JavaScript test failed:', error);
  }

  console.log('\n' + '='.repeat(40) + '\n');

  // Test 3: C++
  console.log('=== Test 3: C++ ===');
  const cppCode = `
#include <iostream>
#include <vector>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    std::cout << "Testing Piston API" << std::endl;
    
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int num : numbers) {
        sum += num;
    }
    std::cout << "Sum of numbers: " << sum << std::endl;
    
    return 0;
}
`;

  try {
    const cppResult = await codeExecutionService.executeCodeWithPiston(cppCode, 'cpp');
    console.log('C++ Output:', cppResult.output);
    if (cppResult.error) {
      console.log('C++ Error:', cppResult.error);
    }
  } catch (error) {
    console.error('C++ test failed:', error);
  }

  console.log('\n' + '='.repeat(40) + '\n');

  // Test 4: Error handling
  console.log('=== Test 4: Error Handling ===');
  const invalidCode = `
print("This has a syntax error"
print("Missing closing parenthesis")
`;

  try {
    const errorResult = await codeExecutionService.executeCodeWithPiston(invalidCode, 'python');
    console.log('Error Test Output:', errorResult.output);
    if (errorResult.error) {
      console.log('Error Test Error:', errorResult.error);
    }
  } catch (error) {
    console.error('Error test failed:', error);
  }

  console.log('\n' + '='.repeat(40) + '\n');

  // Test 5: Unsupported language
  console.log('=== Test 5: Unsupported Language ===');
  try {
    const unsupportedResult = await codeExecutionService.executeCodeWithPiston('print("test")', 'unsupported_language');
    console.log('Unsupported Language Result:', unsupportedResult);
  } catch (error) {
    console.error('Unsupported language test failed:', error);
  }

  console.log('\nTesting completed!');
}

// Export for use in other files
export default testPistonAPI; 