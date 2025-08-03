const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000';

async function testBackend() {
  console.log('🧪 Testing Backend Proxy Server...\n');

  // Test 1: Health Check
  console.log('1. Testing Health Check...');
  try {
    const healthResponse = await axios.get(`${BACKEND_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data.status);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return;
  }

  // Test 2: Get Languages
  console.log('\n2. Testing Languages Endpoint...');
  try {
    const languagesResponse = await axios.get(`${BACKEND_URL}/api/languages`);
    console.log(`✅ Languages endpoint passed. Found ${languagesResponse.data.count} languages`);
  } catch (error) {
    console.log('❌ Languages endpoint failed:', error.message);
  }

  // Test 3: Python Code Execution
  console.log('\n3. Testing Python Code Execution...');
  try {
    const pythonCode = `
print("Hello from Python!")
x = 10
y = 20
print(f"Sum: {x + y}")
`;
    
    const pythonResponse = await axios.post(`${BACKEND_URL}/api/run`, {
      code: pythonCode,
      language: 'python'
    });
    
    if (pythonResponse.data.success) {
      console.log('✅ Python execution successful');
      console.log('Output:', pythonResponse.data.output);
    } else {
      console.log('❌ Python execution failed:', pythonResponse.data.error);
    }
  } catch (error) {
    console.log('❌ Python test failed:', error.message);
  }

  // Test 4: JavaScript Code Execution
  console.log('\n4. Testing JavaScript Code Execution...');
  try {
    const jsCode = `
console.log("Hello from JavaScript!");
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log("Sum:", sum);
`;
    
    const jsResponse = await axios.post(`${BACKEND_URL}/api/run`, {
      code: jsCode,
      language: 'javascript'
    });
    
    if (jsResponse.data.success) {
      console.log('✅ JavaScript execution successful');
      console.log('Output:', jsResponse.data.output);
    } else {
      console.log('❌ JavaScript execution failed:', jsResponse.data.error);
    }
  } catch (error) {
    console.log('❌ JavaScript test failed:', error.message);
  }

  // Test 5: C++ Code Execution
  console.log('\n5. Testing C++ Code Execution...');
  try {
    const cppCode = `
#include <iostream>
int main() {
    std::cout << "Hello from C++!" << std::endl;
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}
`;
    
    const cppResponse = await axios.post(`${BACKEND_URL}/api/run`, {
      code: cppCode,
      language: 'cpp'
    });
    
    if (cppResponse.data.success) {
      console.log('✅ C++ execution successful');
      console.log('Output:', cppResponse.data.output);
    } else {
      console.log('❌ C++ execution failed:', cppResponse.data.error);
    }
  } catch (error) {
    console.log('❌ C++ test failed:', error.message);
  }

  // Test 6: Error Handling (Invalid Code)
  console.log('\n6. Testing Error Handling...');
  try {
    const invalidCode = `
print("This has a syntax error"
print("Missing closing parenthesis")
`;
    
    const errorResponse = await axios.post(`${BACKEND_URL}/api/run`, {
      code: invalidCode,
      language: 'python'
    });
    
    if (!errorResponse.data.success) {
      console.log('✅ Error handling working correctly');
      console.log('Error:', errorResponse.data.error);
    } else {
      console.log('❌ Error handling failed - should have caught syntax error');
    }
  } catch (error) {
    console.log('❌ Error handling test failed:', error.message);
  }

  // Test 7: Unsupported Language
  console.log('\n7. Testing Unsupported Language...');
  try {
    const unsupportedResponse = await axios.post(`${BACKEND_URL}/api/run`, {
      code: 'print("test")',
      language: 'unsupported_language'
    });
    
    if (!unsupportedResponse.data.success) {
      console.log('✅ Unsupported language handling working correctly');
      console.log('Error:', unsupportedResponse.data.error);
    } else {
      console.log('❌ Unsupported language handling failed');
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log('✅ Unsupported language properly rejected');
    } else {
      console.log('❌ Unsupported language test failed:', error.message);
    }
  }

  console.log('\n🎉 Backend testing completed!');
}

// Run the tests
testBackend().catch(console.error); 