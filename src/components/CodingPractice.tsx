import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Settings, 
  RotateCcw, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock,
  Code,
  FileText,
  Zap
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import codeExecutionService from "@/services/codeExecutionService";

interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: Example[];
  constraints: string[];
  starterCode: { [key: string]: string };
  testCases: TestCase[];
}

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  status: 'not-run' | 'passed' | 'failed';
}

const CodingPractice = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  // Sample problem database
  const problems: Problem[] = [
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        {
          input: 'nums = [3,2,4], target = 6',
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9',
        'Only one valid answer exists.'
      ],
      starterCode: {
        python: `def two_sum(nums, target):
    # Write your code here
    return []

nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))`,
        javascript: `function twoSum(nums, target) {
    // Write your code here
    return [];
}

const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));`,
        java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        Solution solution = new Solution();
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,
        cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    for(int i = 0; i < result.size(); i++) {
        cout << result[i] << " ";
    }
    return 0;
}`
      },
      testCases: [
        {
          id: '1',
          input: '[2,7,11,15]\n9',
          expectedOutput: '[0,1]',
          status: 'not-run'
        },
        {
          id: '2',
          input: '[3,2,4]\n6',
          expectedOutput: '[1,2]',
          status: 'not-run'
        }
      ]
    },
    {
      id: '2',
      title: 'Reverse String',
      difficulty: 'easy',
      description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: 'The string is reversed in place.'
        }
      ],
      constraints: [
        '1 <= s.length <= 10^5',
        's[i] is a printable ascii character.'
      ],
      starterCode: {
        python: `def reverse_string(s):
    # Write your code here
    pass

s = ["h","e","l","l","o"]
reverse_string(s)
print(s)`,
        javascript: `function reverseString(s) {
    // Write your code here
}

const s = ["h","e","l","l","o"];
reverseString(s);
console.log(s);`
      },
      testCases: [
        {
          id: '1',
          input: '["h","e","l","l","o"]',
          expectedOutput: '["o","l","l","e","h"]',
          status: 'not-run'
        }
      ]
    },
    {
      id: '3',
      title: 'Palindrome Number',
      difficulty: 'easy',
      description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
      examples: [
        {
          input: 'x = 121',
          output: 'true',
          explanation: '121 reads as 121 from left to right and from right to left.'
        }
      ],
      constraints: [
        '-2^31 <= x <= 2^31 - 1'
      ],
      starterCode: {
        python: `def is_palindrome(x):
    # Write your code here
    return False

x = 121
print(is_palindrome(x))`,
        javascript: `function isPalindrome(x) {
    // Write your code here
    return false;
}

console.log(isPalindrome(121));`
      },
      testCases: [
        {
          id: '1',
          input: '121',
          expectedOutput: 'true',
          status: 'not-run'
        }
      ]
    },
    {
      id: '4',
      title: 'Valid Parentheses',
      difficulty: 'easy',
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
      examples: [
        {
          input: 's = "()"',
          output: 'true',
          explanation: 'Valid parentheses.'
        },
        {
          input: 's = "([)]"',
          output: 'false',
          explanation: 'Invalid parentheses.'
        }
      ],
      constraints: [
        '1 <= s.length <= 10^4',
        's consists of parentheses only "()[]{}"'
      ],
      starterCode: {
        python: `def is_valid(s):
    # Write your code here
    return False

s = "()"
print(is_valid(s))`,
        javascript: `function isValid(s) {
    // Write your code here
    return false;
}

console.log(isValid("()"));`
      },
      testCases: [
        {
          id: '1',
          input: '"()"',
          expectedOutput: 'true',
          status: 'not-run'
        },
        {
          id: '2',
          input: '"([)]"',
          expectedOutput: 'false',
          status: 'not-run'
        }
      ]
    },
    {
      id: '5',
      title: 'Maximum Subarray',
      difficulty: 'medium',
      description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
        }
      ],
      constraints: [
        '1 <= nums.length <= 10^5',
        '-10^4 <= nums[i] <= 10^4'
      ],
      starterCode: {
        python: `def max_sub_array(nums):
    # Write your code here
    return 0

nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_sub_array(nums))`,
        javascript: `function maxSubArray(nums) {
    // Write your code here
    return 0;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));`
      },
      testCases: [
        {
          id: '1',
          input: '[-2,1,-3,4,-1,2,1,-5,4]',
          expectedOutput: '6',
          status: 'not-run'
        }
      ]
    },
    {
      id: '6',
      title: 'Climbing Stairs',
      difficulty: 'easy',
      description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
      examples: [
        {
          input: 'n = 3',
          output: '3',
          explanation: 'There are three ways: (1,1,1), (1,2), (2,1)'
        }
      ],
      constraints: [
        '1 <= n <= 45'
      ],
      starterCode: {
        python: `def climb_stairs(n):
    # Write your code here
    return 0

n = 3
print(climb_stairs(n))`,
        javascript: `function climbStairs(n) {
    // Write your code here
    return 0;
}

console.log(climbStairs(3));`
      },
      testCases: [
        {
          id: '1',
          input: '3',
          expectedOutput: '3',
          status: 'not-run'
        }
      ]
    },
    {
      id: '7',
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'easy',
      description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
      examples: [
        {
          input: 'prices = [7,1,5,3,6,4]',
          output: '5',
          explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
        }
      ],
      constraints: [
        '1 <= prices.length <= 10^5',
        '0 <= prices[i] <= 10^4'
      ],
      starterCode: {
        python: `def max_profit(prices):
    # Write your code here
    return 0

prices = [7, 1, 5, 3, 6, 4]
print(max_profit(prices))`,
        javascript: `function maxProfit(prices) {
    // Write your code here
    return 0;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));`
      },
      testCases: [
        {
          id: '1',
          input: '[7,1,5,3,6,4]',
          expectedOutput: '5',
          status: 'not-run'
        }
      ]
    },
    {
      id: '8',
      title: 'Single Number',
      difficulty: 'easy',
      description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
      examples: [
        {
          input: 'nums = [2,2,1]',
          output: '1',
          explanation: '1 appears only once.'
        }
      ],
      constraints: [
        '1 <= nums.length <= 3 * 10^4',
        '-3 * 10^4 <= nums[i] <= 3 * 10^4'
      ],
      starterCode: {
        python: `def single_number(nums):
    # Write your code here
    return 0

nums = [2, 2, 1]
print(single_number(nums))`,
        javascript: `function singleNumber(nums) {
    // Write your code here
    return 0;
}

console.log(singleNumber([2, 2, 1]));`
      },
      testCases: [
        {
          id: '1',
          input: '[2,2,1]',
          expectedOutput: '1',
          status: 'not-run'
        }
      ]
    }
  ];

  useEffect(() => {
    if (problems.length > 0) {
      setSelectedProblem(problems[0]);
      setTestCases(problems[0].testCases);
    }
  }, []);

  useEffect(() => {
    if (selectedProblem) {
      setCode(selectedProblem.starterCode[selectedLanguage] || selectedProblem.starterCode.python);
    }
  }, [selectedProblem, selectedLanguage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = async () => {
    if (!code.trim()) return;
    
    setIsRunning(true);
    setOutput('// Executing code...');
    
    try {
      const result = await codeExecutionService.executeCode({
        code,
        language: selectedLanguage
      });
      
      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else {
        setOutput(result.output);
      }
    } catch (error) {
      setOutput(`Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTests = async () => {
    if (!code.trim() || !selectedProblem) return;
    
    setIsRunning(true);
    
    try {
      const results = await codeExecutionService.runTestCases(
        code,
        selectedLanguage,
        selectedProblem.testCases
      );
      
      const updatedTestCases = testCases.map(testCase => {
        const result = results.find(r => r.testCaseId === testCase.id);
        return {
          ...testCase,
          status: result?.passed ? 'passed' : 'failed'
        };
      });
      
      setTestCases(updatedTestCases);
    } catch (error) {
      console.error('Test execution error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    if (selectedProblem) {
      setCode(selectedProblem.starterCode[selectedLanguage] || selectedProblem.starterCode.python);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

    return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">interVee</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="/preparation" className="text-gray-300 hover:text-white transition-colors">Preparation</a>
              <a href="/coding-practice" className="text-blue-400 font-medium">Coding Practice</a>
              <a href="/interview-practice" className="text-gray-300 hover:text-white transition-colors">Interview Practice</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Problems */}
          <div className="lg:col-span-1 space-y-6">
            {/* Problems List */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Problems</CardTitle>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">All Difficulties</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {problems.map((problem) => (
                    <div
                      key={problem.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedProblem?.id === problem.id
                          ? 'bg-purple-600 border border-purple-500'
                          : 'hover:bg-gray-700 text-gray-300'
                      }`}
                      onClick={() => setSelectedProblem(problem)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${selectedProblem?.id === problem.id ? 'text-white' : 'text-gray-300'}`}>{problem.title}</span>
                        <Badge className={getDifficultyColor(problem.difficulty)}>
                          {problem.difficulty}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Problem Description */}
            {selectedProblem && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(selectedProblem.difficulty)}>
                        {selectedProblem.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-400">Easy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Download className="w-4 h-4 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{selectedProblem.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Examples:</h4>
                    {selectedProblem.examples.map((example, index) => (
                      <div key={index} className="mb-3 p-3 bg-gray-700 rounded">
                        <div className="text-sm text-gray-300">
                          <strong>Example {index + 1}:</strong>
                        </div>
                        <div className="text-sm mt-1 text-gray-300">
                          <div><strong>Input:</strong> {example.input}</div>
                          <div><strong>Output:</strong> {example.output}</div>
                          <div><strong>Explanation:</strong> {example.explanation}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-white">Constraints:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {selectedProblem.constraints.map((constraint, index) => (
                        <li key={index}>• {constraint}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Code Editor */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-lg text-white">Code Editor</CardTitle>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                                             <SelectContent className="bg-gray-700 border-gray-600">
                         <SelectItem value="python" className="text-white hover:bg-gray-600">Python</SelectItem>
                         <SelectItem value="javascript" className="text-white hover:bg-gray-600">JavaScript</SelectItem>
                         <SelectItem value="java" className="text-white hover:bg-gray-600">Java</SelectItem>
                         <SelectItem value="cpp" className="text-white hover:bg-gray-600">C++</SelectItem>
                         <SelectItem value="c" className="text-white hover:bg-gray-600">C</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleResetCode} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset Code
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm border-none outline-none resize-none"
                    placeholder="Write your code here..."
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Time: {formatTime(timer)}</span>
                  </div>
                  <Button 
                    onClick={handleRunCode} 
                    disabled={isRunning}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Run Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Output</CardTitle>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">Clear</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 min-h-32">
                  <pre className="text-green-400 font-mono text-sm">
                    {output || '// Output will appear here after running your code'}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Test Cases</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Eye className="w-4 h-4 mr-1" />
                      View Solution
                    </Button>
                    <Button 
                      onClick={handleRunTests}
                      disabled={isRunning}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      Run Tests
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {testCases.map((testCase) => (
                    <div key={testCase.id} className="p-3 border border-gray-600 rounded-lg bg-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">Test Case {testCase.id}</span>
                        <div className="flex items-center gap-2">
                          {testCase.status === 'passed' && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          {testCase.status === 'failed' && (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-xs px-2 py-1 rounded ${
                            testCase.status === 'passed' ? 'bg-green-900 text-green-300' :
                            testCase.status === 'failed' ? 'bg-red-900 text-red-300' :
                            'bg-gray-600 text-gray-300'
                          }`}>
                            {testCase.status === 'not-run' ? 'Not Run' :
                             testCase.status === 'passed' ? 'Passed' : 'Failed'}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">
                        <div><strong>Input:</strong></div>
                        <pre className="bg-gray-800 p-2 rounded mt-1 text-gray-300">{testCase.input}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingPractice; 