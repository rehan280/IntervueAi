import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Settings, 
  RotateCcw, 
  Download, 
  Clock,
  Code,
  Eye,
  X,
  FileText,
  CheckCircle,
  Copy,
  Check
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import codeExecutionService from "@/services/codeExecutionService";
import { additionalProblems } from "./additional_problems";
import { javaProblems } from "./java_problems";
import { cppProblems } from "./cpp_problems";
import { cProblems } from "./c_problems";
import "./CodingPractice.css";

interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  examples: Example[];
  constraints: string[];
  starterCode: { [key: string]: string };
  solutions?: { [key: string]: string };
  category: string;
}

interface Example {
  input: string;
  output: string;
  explanation: string;
}

const CodingPractice = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [selectedCategory, setSelectedCategory] = useState('core');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState('');
  const [showBoilerplate, setShowBoilerplate] = useState(true);
  const [showSolutionDialog, setShowSolutionDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate boilerplate code for each language
  const generateBoilerplateCode = (language: string, problemTitle: string) => {
    const boilerplates = {
      python: `def solution():
    # Write your code here
    # Problem: ${problemTitle}
    pass

# Test your solution
if __name__ == "__main__":
    # Add your test cases here
    result = solution()
    print("Result:", result)`,
      
      javascript: `function solution() {
    // Write your code here
    // Problem: ${problemTitle}
}

// Test your solution
console.log("Result:", solution());`,
      
      java: `public class Solution {
    public static void main(String[] args) {
        // Write your code here
        // Problem: ${problemTitle}
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    // Write your code here
    // Problem: ${problemTitle}
};

int main() {
    Solution solution;
    // Add your test cases here
    return 0;
}`,
      
      c: `#include <stdio.h>
#include <stdlib.h>

// Write your code here
// Problem: ${problemTitle}

int main() {
    // Add your test cases here
    return 0;
}`,
      
      typescript: `function solution(): any {
    // Write your code here
    // Problem: ${problemTitle}
}

// Test your solution
console.log("Result:", solution());`,
      
      csharp: `using System;

public class Solution {
    public static void Main(string[] args) {
        // Write your code here
        // Problem: ${problemTitle}
    }
}`,
      
      php: `<?php

function solution() {
    // Write your code here
    // Problem: ${problemTitle}
}

// Test your solution
echo "Result: " . solution() . "\\n";
?>`
    };
    
    return boilerplates[language as keyof typeof boilerplates] || boilerplates.python;
  };

  // Sample problem database
  const problems: Problem[] = [
    // Original problems
    // ... existing problems ...
    
    // Additional problems from all categories
    ...additionalProblems,
    ...javaProblems,
    ...cppProblems,
    ...cProblems,
    // Core Coding Questions (Language Agnostic)
    {
      id: '1',
      title: 'Two Sum',
      difficulty: 'easy',
      category: 'core',
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
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Test the function
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Input: nums = {nums}, target = {target}")
print(f"Output: {result}")`,
        javascript: `function twoSum(nums, target) {
    // Write your code here
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Test the function
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(\`Input: nums = [\${nums}], target = \${target}\`);
console.log(\`Output: [\${result}]\`);`,
        java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        Solution solution = new Solution();
        int[] result = solution.twoSum(nums, target);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "], target = " + target);
        System.out.println("Output: [" + java.util.Arrays.toString(result) + "]");
    }
}`,
        csharp: `using System;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Write your code here
        for (int i = 0; i < nums.Length; i++) {
            for (int j = i + 1; j < nums.Length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
    
    public static void Main(string[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        Solution solution = new Solution();
        int[] result = solution.TwoSum(nums, target);
        Console.WriteLine($"Input: nums = [{string.Join(", ", nums)}], target = {target}");
        Console.WriteLine($"Output: [{string.Join(", ", result)}]");
    }
}`,
        php: `<?php

function twoSum($nums, $target) {
    // Write your code here
    for ($i = 0; $i < count($nums); $i++) {
        for ($j = $i + 1; $j < count($nums); $j++) {
            if ($nums[$i] + $nums[$j] == $target) {
                return [$i, $j];
            }
        }
    }
    return [];
}

// Test the function
$nums = [2, 7, 11, 15];
$target = 9;
$result = twoSum($nums, $target);
echo "Input: nums = [" . implode(", ", $nums) . "], target = $target\\n";
echo "Output: [" . implode(", ", $result) . "]\\n";
?>`,
        cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
};

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    Solution solution;
    vector<int> result = solution.twoSum(nums, target);
    
    cout << "Input: nums = [";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i < nums.size() - 1) cout << ", ";
    }
    cout << "], target = " << target << endl;
    
    cout << "Output: [";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    return 0;
}`,
        c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your code here
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    
    return result;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int numsSize = 4;
    int target = 9;
    int returnSize;
    
    int* result = twoSum(nums, numsSize, target, &returnSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("], target = %d\\n", target);
    
    printf("Output: [%d, %d]\\n", result[0], result[1]);
    
    free(result);
    return 0;
}`
      },
      solutions: {
        python: `def two_sum(nums, target):
    """
    Solution: Brute Force Approach
    Time Complexity: O(n²)
    Space Complexity: O(1)
    """
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Optimized Solution using HashMap
def two_sum_optimized(nums, target):
    """
    Solution: HashMap Approach
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []

# Explanation:
# 1. Brute Force: Check all pairs of numbers
# 2. HashMap: Store each number and its index
# 3. For each number, check if (target - num) exists in map
# 4. If found, return the indices`,
        javascript: `function twoSum(nums, target) {
    /*
    Solution: Brute Force Approach
    Time Complexity: O(n²)
    Space Complexity: O(1)
    */
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

// Optimized Solution using HashMap
function twoSumOptimized(nums, target) {
    /*
    Solution: HashMap Approach
    Time Complexity: O(n)
    Space Complexity: O(n)
    */
    const numMap = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    return [];
}

// Explanation:
// 1. Brute Force: Check all pairs of numbers
// 2. HashMap: Store each number and its index
// 3. For each number, check if (target - num) exists in map
// 4. If found, return the indices`,
        java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        /*
        Solution: Brute Force Approach
        Time Complexity: O(n²)
        Space Complexity: O(1)
        */
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
    
    // Optimized Solution using HashMap
    public int[] twoSumOptimized(int[] nums, int target) {
        /*
        Solution: HashMap Approach
        Time Complexity: O(n)
        Space Complexity: O(n)
        */
        Map<Integer, Integer> numMap = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (numMap.containsKey(complement)) {
                return new int[]{numMap.get(complement), i};
            }
            numMap.put(nums[i], i);
        }
        return new int[]{};
    }
}

// Explanation:
// 1. Brute Force: Check all pairs of numbers
// 2. HashMap: Store each number and its index
// 3. For each number, check if (target - num) exists in map
// 4. If found, return the indices`,
        csharp: `using System;
using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        /*
        Solution: Brute Force Approach
        Time Complexity: O(n²)
        Space Complexity: O(1)
        */
        for (int i = 0; i < nums.Length; i++) {
            for (int j = i + 1; j < nums.Length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{};
    }
    
    // Optimized Solution using Dictionary
    public int[] TwoSumOptimized(int[] nums, int target) {
        /*
        Solution: Dictionary Approach
        Time Complexity: O(n)
        Space Complexity: O(n)
        */
        Dictionary<int, int> numDict = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int complement = target - nums[i];
            if (numDict.ContainsKey(complement)) {
                return new int[]{numDict[complement], i};
            }
            numDict[nums[i]] = i;
        }
        return new int[]{};
    }
}

// Explanation:
// 1. Brute Force: Check all pairs of numbers
// 2. Dictionary: Store each number and its index
// 3. For each number, check if (target - num) exists in dict
// 4. If found, return the indices`,
        php: `<?php

function twoSum($nums, $target) {
    /*
    Solution: Brute Force Approach
    Time Complexity: O(n²)
    Space Complexity: O(1)
    */
    for ($i = 0; $i < count($nums); $i++) {
        for ($j = $i + 1; $j < count($nums); $j++) {
            if ($nums[$i] + $nums[$j] == $target) {
                return [$i, $j];
            }
        }
    }
    return [];
}

// Optimized Solution using Array as HashMap
function twoSumOptimized($nums, $target) {
    /*
    Solution: Array HashMap Approach
    Time Complexity: O(n)
    Space Complexity: O(n)
    */
    $numMap = [];
    for ($i = 0; $i < count($nums); $i++) {
        $complement = $target - $nums[$i];
        if (isset($numMap[$complement])) {
            return [$numMap[$complement], $i];
        }
        $numMap[$nums[$i]] = $i;
    }
    return [];
}

// Explanation:
// 1. Brute Force: Check all pairs of numbers
// 2. Array HashMap: Store each number and its index
// 3. For each number, check if (target - num) exists in map
// 4. If found, return the indices`,
        cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        /*
        Solution: Brute Force Approach
        Time Complexity: O(n²)
        Space Complexity: O(1)
        */
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }
        return {};
    }
    
    // Optimized Solution using HashMap
    vector<int> twoSumOptimized(vector<int>& nums, int target) {
        /*
        Solution: HashMap Approach
        Time Complexity: O(n)
        Space Complexity: O(n)
        */
        unordered_map<int, int> numMap;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (numMap.find(complement) != numMap.end()) {
                return {numMap[complement], i};
            }
            numMap[nums[i]] = i;
        }
        return {};
    }
};

// Explanation:
// 1. Brute Force: Check all pairs of numbers
// 2. HashMap: Store each number and its index
// 3. For each number, check if (target - num) exists in map
// 4. If found, return the indices`,
        c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    /*
    Solution: Brute Force Approach
    Time Complexity: O(n²)
    Space Complexity: O(1)
    */
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    
    return result;
}

// Note: C doesn't have built-in HashMap, so we use brute force
// For optimized solution, you would need to implement a simple hash table

// Explanation:
// 1. Brute Force: Check all pairs of numbers
// 2. For each pair, check if sum equals target
// 3. Return indices when found
// 4. Time complexity is O(n²) due to nested loops`
      }
    },
    {
      id: '2',
      title: 'Palindrome String',
      difficulty: 'easy',
      category: 'core',
      description: 'Given a string s, return true if it is a palindrome, or false otherwise. A string is a palindrome if it reads the same backward as forward.',
      examples: [
        {
          input: 's = "racecar"',
          output: 'true',
          explanation: 'The string reads the same backward as forward.'
        },
        {
          input: 's = "hello"',
          output: 'false',
          explanation: 'The string does not read the same backward as forward.'
        }
      ],
      constraints: [
        '1 <= s.length <= 2 * 10^5',
        's consists only of lowercase English letters.'
      ],
      starterCode: {
        python: `def is_palindrome(s):
    # Write your code here
    # Remove non-alphanumeric characters and convert to lowercase
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    return cleaned == cleaned[::-1]

# Test the function
test_cases = ["racecar", "hello", "A man, a plan, a canal: Panama"]
for s in test_cases:
    result = is_palindrome(s)
    print(f'Input: "{s}"')
    print(f'Output: {result}')`,
        javascript: `function isPalindrome(s) {
    // Write your code here
    // Remove non-alphanumeric characters and convert to lowercase
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// Test the function
const testCases = ["racecar", "hello", "A man, a plan, a canal: Panama"];
testCases.forEach(s => {
    const result = isPalindrome(s);
    console.log(\`Input: "\${s}"\`);
    console.log(\`Output: \${result}\`);
});`,
        java: `public class Solution {
    public boolean isPalindrome(String s) {
        // Write your code here
        // Remove non-alphanumeric characters and convert to lowercase
        String cleaned = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
    }
    
    public static void main(String[] args) {
        String[] testCases = {"racecar", "hello", "A man, a plan, a canal: Panama"};
        Solution solution = new Solution();
        for (String testCase : testCases) {
            boolean result = solution.isPalindrome(testCase);
            System.out.println("Input: \\"" + testCase + "\\"");
            System.out.println("Output: " + result);
        }
    }
}`,
        csharp: `using System;
using System.Linq;

public class Solution {
    public bool IsPalindrome(string s) {
        // Write your code here
        // Remove non-alphanumeric characters and convert to lowercase
        string cleaned = new string(s.Where(char.IsLetterOrDigit).ToArray()).ToLower();
        return cleaned == new string(cleaned.Reverse().ToArray());
    }
    
    public static void Main(string[] args) {
        string s = "hello";
        Solution solution = new Solution();
        var result = solution.CharFrequency(s);
        Console.WriteLine($"Input: s = \\"{s}\\"");
        Console.WriteLine($"Output: {{{string.Join(", ", result.Select(kv => $"{kv.Key}={kv.Value}"))}}}");
    }
}`,
        php: `<?php

function isPalindrome($s) {
    // Write your code here
    // Remove non-alphanumeric characters and convert to lowercase
    $cleaned = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($s));
    return $cleaned === strrev($cleaned);
}

// Test the function
$testCases = ["racecar", "hello", "A man, a plan, a canal: Panama"];
foreach ($testCases as $s) {
    $result = isPalindrome($s);
    echo "Input: \\"$s\\"\\n";
    echo "Output: " . ($result ? "true" : "false") . "\\n";
}
?>`
      },
      solutions: {
        python: `def is_palindrome(s):
    """
    Solution: Character filtering approach
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # Remove non-alphanumeric characters and convert to lowercase
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    return cleaned == cleaned[::-1]

# Alternative Solution: Two-pointer approach
def is_palindrome_two_pointer(s):
    """
    Solution: Two-pointer approach
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    left, right = 0, len(s) - 1
    while left < right:
        # Skip non-alphanumeric characters from left
        while left < right and not s[left].isalnum():
            left += 1
        # Skip non-alphanumeric characters from right
        while left < right and not s[right].isalnum():
            right -= 1
        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

# Explanation:
# 1. Clean the string by removing non-alphanumeric characters
# 2. Convert to lowercase for case-insensitive comparison
# 3. Check if the cleaned string equals its reverse
# 4. Alternative: Use two pointers to compare from both ends`,
        javascript: `function isPalindrome(s) {
    /*
    Solution: Character filtering approach
    Time Complexity: O(n)
    Space Complexity: O(n)
    */
    // Remove non-alphanumeric characters and convert to lowercase
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// Alternative Solution: Two-pointer approach
function isPalindromeTwoPointer(s) {
    /*
    Solution: Two-pointer approach
    Time Complexity: O(n)
    Space Complexity: O(1)
    */
    let left = 0, right = s.length - 1;
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) {
            left++;
        }
        // Skip non-alphanumeric characters from right
        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) {
            right--;
        }
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

// Explanation:
// 1. Clean the string by removing non-alphanumeric characters
// 2. Convert to lowercase for case-insensitive comparison
// 3. Check if the cleaned string equals its reverse
// 4. Alternative: Use two pointers to compare from both ends`,
        java: `public class Solution {
    public boolean isPalindrome(String s) {
        /*
        Solution: Character filtering approach
        Time Complexity: O(n)
        Space Complexity: O(n)
        */
        // Remove non-alphanumeric characters and convert to lowercase
        String cleaned = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
    }
    
    // Alternative Solution: Two-pointer approach
    public boolean isPalindromeTwoPointer(String s) {
        /*
        Solution: Two-pointer approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        */
        int left = 0, right = s.length() - 1;
        while (left < right) {
            // Skip non-alphanumeric characters from left
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            // Skip non-alphanumeric characters from right
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            // Compare characters (case-insensitive)
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}

// Explanation:
// 1. Clean the string by removing non-alphanumeric characters
// 2. Convert to lowercase for case-insensitive comparison
// 3. Check if the cleaned string equals its reverse
// 4. Alternative: Use two pointers to compare from both ends`,
        csharp: `using System;
using System.Linq;

public class Solution {
    public bool IsPalindrome(string s) {
        /*
        Solution: Character filtering approach
        Time Complexity: O(n)
        Space Complexity: O(n)
        */
        // Remove non-alphanumeric characters and convert to lowercase
        string cleaned = new string(s.Where(char.IsLetterOrDigit).ToArray()).ToLower();
        return cleaned == new string(cleaned.Reverse().ToArray());
    }
    
    // Alternative Solution: Two-pointer approach
    public bool IsPalindromeTwoPointer(string s) {
        /*
        Solution: Two-pointer approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        */
        int left = 0, right = s.Length - 1;
        while (left < right) {
            // Skip non-alphanumeric characters from left
            while (left < right && !char.IsLetterOrDigit(s[left])) {
                left++;
            }
            // Skip non-alphanumeric characters from right
            while (left < right && !char.IsLetterOrDigit(s[right])) {
                right--;
            }
            // Compare characters (case-insensitive)
            if (char.ToLower(s[left]) != char.ToLower(s[right])) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}

// Explanation:
// 1. Clean the string by removing non-alphanumeric characters
// 2. Convert to lowercase for case-insensitive comparison
// 3. Check if the cleaned string equals its reverse
// 4. Alternative: Use two pointers to compare from both ends`,
        php: `<?php

function isPalindrome($s) {
    /*
    Solution: Character filtering approach
    Time Complexity: O(n)
    Space Complexity: O(n)
    */
    // Remove non-alphanumeric characters and convert to lowercase
    $cleaned = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($s));
    return $cleaned === strrev($cleaned);
}

// Alternative Solution: Two-pointer approach
function isPalindromeTwoPointer($s) {
    /*
    Solution: Two-pointer approach
    Time Complexity: O(n)
    Space Complexity: O(1)
    */
    $left = 0;
    $right = strlen($s) - 1;
    while ($left < $right) {
        // Skip non-alphanumeric characters from left
        while ($left < $right && !ctype_alnum($s[$left])) {
            $left++;
        }
        // Skip non-alphanumeric characters from right
        while ($left < $right && !ctype_alnum($s[$right])) {
            $right--;
        }
        // Compare characters (case-insensitive)
        if (strtolower($s[$left]) !== strtolower($s[$right])) {
            return false;
        }
        $left++;
        $right--;
    }
    return true;
}

// Explanation:
// 1. Clean the string by removing non-alphanumeric characters
// 2. Convert to lowercase for case-insensitive comparison
// 3. Check if the cleaned string equals its reverse
// 4. Alternative: Use two pointers to compare from both ends`,
        cpp: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        /*
        Solution: Character filtering approach
        Time Complexity: O(n)
        Space Complexity: O(n)
        */
        string cleaned;
        for (char c : s) {
            if (isalnum(c)) {
                cleaned += tolower(c);
            }
        }
        string reversed = cleaned;
        reverse(reversed.begin(), reversed.end());
        return cleaned == reversed;
    }
    
    // Alternative Solution: Two-pointer approach
    bool isPalindromeTwoPointer(string s) {
        /*
        Solution: Two-pointer approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        */
        int left = 0, right = s.length() - 1;
        while (left < right) {
            // Skip non-alphanumeric characters from left
            while (left < right && !isalnum(s[left])) {
                left++;
            }
            // Skip non-alphanumeric characters from right
            while (left < right && !isalnum(s[right])) {
                right--;
            }
            // Compare characters (case-insensitive)
            if (tolower(s[left]) != tolower(s[right])) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};

// Explanation:
// 1. Clean the string by removing non-alphanumeric characters
// 2. Convert to lowercase for case-insensitive comparison
// 3. Check if the cleaned string equals its reverse
// 4. Alternative: Use two pointers to compare from both ends`,
        c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

int isPalindrome(char* s) {
    /*
    Solution: Character filtering approach
    Time Complexity: O(n)
    Space Complexity: O(n)
    */
    int len = strlen(s);
    char* cleaned = (char*)malloc((len + 1) * sizeof(char));
    int j = 0;
    
    for (int i = 0; i < len; i++) {
        if (isalnum(s[i])) {
            cleaned[j++] = tolower(s[i]);
        }
    }
    cleaned[j] = '\\0';
    
    // Check if palindrome
    int cleaned_len = strlen(cleaned);
    for (int i = 0; i < cleaned_len / 2; i++) {
        if (cleaned[i] != cleaned[cleaned_len - 1 - i]) {
            free(cleaned);
            return 0;
        }
    }
    
    free(cleaned);
    return 1;
}

// Alternative Solution: Two-pointer approach
int isPalindromeTwoPointer(char* s) {
    /*
    Solution: Two-pointer approach
    Time Complexity: O(n)
    Space Complexity: O(1)
    */
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isalnum(s[left])) {
            left++;
        }
        // Skip non-alphanumeric characters from right
        while (left < right && !isalnum(s[right])) {
            right--;
        }
        // Compare characters (case-insensitive)
        if (tolower(s[left]) != tolower(s[right])) {
            return 0;
        }
        left++;
        right--;
    }
    return 1;
}

// Explanation:
// 1. Clean the string by removing non-alphanumeric characters
// 2. Convert to lowercase for case-insensitive comparison
// 3. Check if the cleaned string equals its reverse
// 4. Alternative: Use two pointers to compare from both ends`
      }
    },
    {
      id: '3',
      title: 'Maximum Subarray (Kadane\'s Algorithm)',
      difficulty: 'medium',
      category: 'core',
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
    # Write your code here (Kadane's Algorithm)
    if not nums:
        return 0
    
    max_current = max_global = nums[0]
    for num in nums[1:]:
        max_current = max(num, max_current + num)
        max_global = max(max_global, max_current)
    
    return max_global

# Test the function
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = max_sub_array(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
        javascript: `function maxSubArray(nums) {
    // Write your code here (Kadane's Algorithm)
    if (nums.length === 0) return 0;
    
    let maxCurrent = maxGlobal = nums[0];
    for (let i = 1; i < nums.length; i++) {
        maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
        maxGlobal = Math.max(maxGlobal, maxCurrent);
    }
    
    return maxGlobal;
}

// Test the function
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArray(nums);
console.log(\`Input: nums = [\${nums}]\`);
console.log(\`Output: \${result}\`);`,
        java: `public class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here (Kadane's Algorithm)
        if (nums.length == 0) return 0;
        
        int maxCurrent = nums[0];
        int maxGlobal = nums[0];
        
        for (int i = 1; i < nums.length; i++) {
            maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
            maxGlobal = Math.max(maxGlobal, maxCurrent);
        }
        
        return maxGlobal;
    }
    
    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        Solution solution = new Solution();
        int result = solution.maxSubArray(nums);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "]");
        System.out.println("Output: " + result);
    }
}`,
        csharp: `using System;

public class Solution {
    public int MaxSubArray(int[] nums) {
        // Write your code here (Kadane's Algorithm)
        if (nums.Length == 0) return 0;
        
        int maxCurrent = nums[0];
        int maxGlobal = nums[0];
        
        for (int i = 1; i < nums.Length; i++) {
            maxCurrent = Math.Max(nums[i], maxCurrent + nums[i]);
            maxGlobal = Math.Max(maxGlobal, maxCurrent);
        }
        
        return maxGlobal;
    }
    
    public static void Main(string[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        Solution solution = new Solution();
        int result = solution.MaxSubArray(nums);
        Console.WriteLine($"Input: nums = [{string.Join(", ", nums)}]");
        Console.WriteLine($"Output: {result}");
    }
}`,
        php: `<?php

function maxSubArray($nums) {
    // Write your code here (Kadane's Algorithm)
    if (empty($nums)) return 0;
    
    $maxCurrent = $maxGlobal = $nums[0];
    for ($i = 1; $i < count($nums); $i++) {
        $maxCurrent = max($nums[$i], $maxCurrent + $nums[$i]);
        $maxGlobal = max($maxGlobal, $maxCurrent);
    }
    
    return $maxGlobal;
}

// Test the function
$nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
$result = maxSubArray($nums);
echo "Input: nums = [" . implode(", ", $nums) . "]\\n";
echo "Output: $result\\n";
?>`
      }
    },
    // Python-Specific Questions
    {
      id: '4',
      title: 'Python List Comprehension',
      difficulty: 'easy',
      category: 'python',
      description: 'Create a function that uses list comprehension to find all even numbers from 1 to n and square them.',
      examples: [
        {
          input: 'n = 10',
          output: '[4, 16, 36, 64, 100]',
          explanation: 'Even numbers from 1 to 10 are [2,4,6,8,10], squared gives [4,16,36,64,100]'
        }
      ],
      constraints: [
        '1 <= n <= 100',
        'Use list comprehension'
      ],
      starterCode: {
        python: `def even_squares(n):
    # Write your code here using list comprehension
    return [x**2 for x in range(2, n+1, 2)]

# Test the function
n = 10
result = even_squares(n)
print(f"Input: n = {n}")
print(f"Output: {result}")`,
        javascript: `function evenSquares(n) {
    // Write your code here
    return Array.from({length: Math.floor(n/2)}, (_, i) => Math.pow((i + 1) * 2, 2));
}

// Test the function
const n = 10;
const result = evenSquares(n);
console.log(\`Input: n = \${n}\`);
console.log(\`Output: [\${result}]\`);`,
        java: `public class Solution {
    public int[] evenSquares(int n) {
        // Write your code here
        int count = n / 2;
        int[] result = new int[count];
        for (int i = 0; i < count; i++) {
            result[i] = (int) Math.pow((i + 1) * 2, 2);
        }
        return result;
    }
    
    public static void main(String[] args) {
        int n = 10;
        Solution solution = new Solution();
        int[] result = solution.evenSquares(n);
        System.out.println("Input: n = " + n);
        System.out.println("Output: [" + java.util.Arrays.toString(result) + "]");
    }
}`,
        csharp: `using System;
using System.Linq;

public class Solution {
    public int[] EvenSquares(int n) {
        // Write your code here
        return Enumerable.Range(1, n/2).Select(i => (int)Math.Pow(i * 2, 2)).ToArray();
    }
    
    public static void Main(string[] args) {
        int n = 10;
        Solution solution = new Solution();
        int[] result = solution.EvenSquares(n);
        Console.WriteLine($"Input: n = {n}");
        Console.WriteLine($"Output: [{string.Join(", ", result)}]");
    }
}`,
        php: `<?php

function evenSquares($n) {
    // Write your code here
    $result = [];
    for ($i = 2; $i <= $n; $i += 2) {
        $result[] = $i * $i;
    }
    return $result;
}

// Test the function
$n = 10;
$result = evenSquares($n);
echo "Input: n = $n\\n";
echo "Output: [" . implode(", ", $result) . "]\\n";
?>`,
        cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> evenSquares(int n) {
        // Write your code here
        vector<int> result;
        for (int i = 2; i <= n; i += 2) {
            result.push_back(i * i);
        }
        return result;
    }
};

int main() {
    int n = 10;
    Solution solution;
    vector<int> result = solution.evenSquares(n);
    
    cout << "Input: n = " << n << endl;
    cout << "Output: [";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    return 0;
}`,
        c: `#include <stdio.h>
#include <stdlib.h>

int* evenSquares(int n, int* returnSize) {
    // Write your code here
    int count = n / 2;
    int* result = (int*)malloc(count * sizeof(int));
    *returnSize = count;
    
    for (int i = 0; i < count; i++) {
        result[i] = (i + 1) * 2 * (i + 1) * 2;
    }
    
    return result;
}

int main() {
    int n = 10;
    int returnSize;
    int* result = evenSquares(n, &returnSize);
    
    printf("Input: n = %d\\n", n);
    printf("Output: [");
    for (int i = 0; i < returnSize; i++) {
        printf("%d", result[i]);
        if (i < returnSize - 1) printf(", ");
    }
    printf("]\\n");
    
    free(result);
    return 0;
}`
      }
    },
    {
      id: '5',
      title: 'Python Dictionary Operations',
      difficulty: 'easy',
      category: 'python',
      description: 'Create a function that counts the frequency of each character in a string using a dictionary.',
      examples: [
        {
          input: 's = "hello"',
          output: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}",
          explanation: 'Count of each character in "hello"'
        }
      ],
      constraints: [
        '1 <= s.length <= 1000',
        'Use dictionary'
      ],
      starterCode: {
        python: `def char_frequency(s):
    # Write your code here using dictionary
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq

# Test the function
s = "hello"
result = char_frequency(s)
print(f"Input: s = \\"{s}\\"")
print(f"Output: {result}")`,
        javascript: `function charFrequency(s) {
    // Write your code here
    const freq = {};
    for (const char of s) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
}

// Test the function
const s = "hello";
const result = charFrequency(s);
console.log(\`Input: s = "\${s}"\`);
console.log(\`Output: \${JSON.stringify(result)}\`);`,
        java: `import java.util.*;

public class Solution {
    public Map<Character, Integer> charFrequency(String s) {
        // Write your code here using HashMap
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        return freq;
    }
    
    public static void main(String[] args) {
        String s = "hello";
        Solution solution = new Solution();
        Map<Character, Integer> result = solution.charFrequency(s);
        System.out.println("Input: s = \\"" + s + "\\"");
        System.out.println("Output: " + result);
    }
}`,
        csharp: `using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public Dictionary<char, int> CharFrequency(string s) {
        // Write your code here
        return s.GroupBy(c => c).ToDictionary(g => g.Key, g => g.Count());
    }
    
    public static void Main(string[] args) {
        string s = "hello";
        Solution solution = new Solution();
        var result = solution.CharFrequency(s);
        Console.WriteLine($"Input: s = \\"{s}\\""");
        Console.WriteLine($"Output: {{{string.Join(", ", result.Select(kv => $"{kv.Key}={kv.Value}"))}}}");
    }
}`,
        php: `<?php

function charFrequency($s) {
    // Write your code here
    $freq = [];
    for ($i = 0; $i < strlen($s); $i++) {
        $char = $s[$i];
        $freq[$char] = isset($freq[$char]) ? $freq[$char] + 1 : 1;
    }
    return $freq;
}

// Test the function
$s = "hello";
$result = charFrequency($s);
echo "Input: s = \\"$s\\"\\n";
echo "Output: " . json_encode($result) . "\\n";
?>`,
        cpp: `#include <iostream>
#include <map>
#include <string>
using namespace std;

class Solution {
public:
    map<char, int> charFrequency(string s) {
        // Write your code here
        map<char, int> freq;
        for (char c : s) {
            freq[c]++;
        }
        return freq;
    }
};

int main() {
    string s = "hello";
    Solution solution;
    map<char, int> result = solution.charFrequency(s);
    
    cout << "Input: s = \\"" << s << "\\"" << endl;
    cout << "Output: {";
    bool first = true;
    for (const auto& pair : result) {
        if (!first) cout << ", ";
        cout << "'" << pair.first << "': " << pair.second;
        first = false;
    }
    cout << "}" << endl;
    
    return 0;
}`,
        c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char key;
    int value;
} CharFreq;

CharFreq* charFrequency(char* s, int* size) {
    // Write your code here
    CharFreq* freq = (CharFreq*)malloc(256 * sizeof(CharFreq));
    int count = 0;
    int len = strlen(s);
    
    for (int i = 0; i < len; i++) {
        char c = s[i];
        int found = 0;
        for (int j = 0; j < count; j++) {
            if (freq[j].key == c) {
                freq[j].value++;
                found = 1;
                break;
            }
        }
        if (!found) {
            freq[count].key = c;
            freq[count].value = 1;
            count++;
        }
    }
    
    *size = count;
    return freq;
}

int main() {
    char s[] = "hello";
    int size;
    CharFreq* result = charFrequency(s, &size);
    
    printf("Input: s = \\"%s\\"\\n", s);
    printf("Output: {");
    for (int i = 0; i < size; i++) {
        printf("'%c': %d", result[i].key, result[i].value);
        if (i < size - 1) printf(", ");
    }
    printf("}\\n");
    
    free(result);
    return 0;
}`
      }
    },
    // Java-Specific Questions
    {
      id: '5',
      title: 'Java HashMap Operations',
      difficulty: 'medium',
      category: 'java',
      description: 'Create a function that uses HashMap to count the frequency of each character in a string.',
      examples: [
        {
          input: 's = "hello"',
          output: '{h=1, e=1, l=2, o=1}',
          explanation: 'Count of each character in "hello"'
        }
      ],
      constraints: [
        '1 <= s.length <= 1000',
        'Use HashMap'
      ],
      starterCode: {
        python: `def char_frequency(s):
    # Write your code here
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq

# Test the function
s = "hello"
result = char_frequency(s)
print(f"Input: s = \\"{s}\\"")
print(f"Output: {result}")`,
        javascript: `function charFrequency(s) {
    // Write your code here
    const freq = {};
    for (const char of s) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
}

// Test the function
const s = "hello";
const result = charFrequency(s);
console.log(\`Input: s = "\${s}"\`);
console.log(\`Output: \${JSON.stringify(result)}\`);`,
        java: `import java.util.*;

public class Solution {
    public Map<Character, Integer> charFrequency(String s) {
        // Write your code here using HashMap
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        return freq;
    }
    
    public static void main(String[] args) {
        String s = "hello";
        Solution solution = new Solution();
        Map<Character, Integer> result = solution.charFrequency(s);
        System.out.println("Input: s = \\"" + s + "\\"");
        System.out.println("Output: " + result);
    }
}`,
        csharp: `using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    public Dictionary<char, int> CharFrequency(string s) {
        // Write your code here
        return s.GroupBy(c => c).ToDictionary(g => g.Key, g => g.Count());
    }
    
    public static void Main(string[] args) {
        string s = "hello";
        Solution solution = new Solution();
        var result = solution.CharFrequency(s);
        Console.WriteLine($"Input: s = \\"{s}\\"");
        Console.WriteLine($"Output: {{{string.Join(", ", result.Select(kv => $"{kv.Key}={kv.Value}"))}}}");
    }
}`,
        php: `<?php

function charFrequency($s) {
    // Write your code here
    $freq = [];
    for ($i = 0; $i < strlen($s); $i++) {
        $char = $s[$i];
        $freq[$char] = isset($freq[$char]) ? $freq[$char] + 1 : 1;
    }
    return $freq;
}

// Test the function
$s = "hello";
$result = charFrequency($s);
echo "Input: s = \\"$s\\"\\n";
echo "Output: " . json_encode($result) . "\\n";
?>`
             }
     },
     {
       id: '6',
       title: 'Reverse String',
       difficulty: 'easy',
       category: 'core',
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
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

# Test the function
s = ["h", "e", "l", "l", "o"]
print(f"Input: {s}")
reverse_string(s)
print(f"Output: {s}")`,
         javascript: `function reverseString(s) {
    // Write your code here
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// Test the function
const s = ["h", "e", "l", "l", "o"];
console.log(\`Input: [\${s}]\`);
reverseString(s);
console.log(\`Output: [\${s}]\`);`,
         java: `public class Solution {
    public void reverseString(char[] s) {
        // Write your code here
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
    
    public static void main(String[] args) {
        char[] s = {'h', 'e', 'l', 'l', 'o'};
        System.out.println("Input: " + java.util.Arrays.toString(s));
        Solution solution = new Solution();
        solution.reverseString(s);
        System.out.println("Output: " + java.util.Arrays.toString(s));
    }
}`,
         csharp: `using System;

public class Solution {
    public void ReverseString(char[] s) {
        // Write your code here
        int left = 0, right = s.Length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
    
    public static void Main(string[] args) {
        char[] s = {'h', 'e', 'l', 'l', 'o'};
        Console.WriteLine($"Input: [{string.Join(", ", s)}]");
        Solution solution = new Solution();
        solution.ReverseString(s);
        Console.WriteLine($"Output: [{string.Join(", ", s)}]");
    }
}`,
         php: `<?php

function reverseString(&$s) {
    // Write your code here
    $left = 0;
    $right = count($s) - 1;
    while ($left < $right) {
        $temp = $s[$left];
        $s[$left] = $s[$right];
        $s[$right] = $temp;
        $left++;
        $right--;
    }
}

// Test the function
$s = ["h", "e", "l", "l", "o"];
echo "Input: [" . implode(", ", $s) . "]\\n";
reverseString($s);
echo "Output: [" . implode(", ", $s) . "]\\n";
?>`
       },
       solutions: {
         python: `def reverse_string(s):
    """
    Solution: Two-pointer approach
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

# Explanation:
# 1. Use two pointers: left (start) and right (end)
# 2. Swap characters at left and right positions
# 3. Move left pointer forward, right pointer backward
# 4. Continue until left >= right
# 5. This reverses the string in-place without extra space`,
         javascript: `function reverseString(s) {
    /*
    Solution: Two-pointer approach
    Time Complexity: O(n)
    Space Complexity: O(1)
    */
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}

// Explanation:
// 1. Use two pointers: left (start) and right (end)
// 2. Swap characters at left and right positions using destructuring
// 3. Move left pointer forward, right pointer backward
// 4. Continue until left >= right
// 5. This reverses the string in-place without extra space`,
         java: `public class Solution {
    public void reverseString(char[] s) {
        /*
        Solution: Two-pointer approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        */
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}

// Explanation:
// 1. Use two pointers: left (start) and right (end)
// 2. Swap characters at left and right positions using temp variable
// 3. Move left pointer forward, right pointer backward
// 4. Continue until left >= right
// 5. This reverses the string in-place without extra space`,
         csharp: `public class Solution {
    public void ReverseString(char[] s) {
        /*
        Solution: Two-pointer approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        */
        int left = 0, right = s.Length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}

// Explanation:
// 1. Use two pointers: left (start) and right (end)
// 2. Swap characters at left and right positions using temp variable
// 3. Move left pointer forward, right pointer backward
// 4. Continue until left >= right
// 5. This reverses the string in-place without extra space`,
         php: `function reverseString(&$s) {
    /*
    Solution: Two-pointer approach
    Time Complexity: O(n)
    Space Complexity: O(1)
    */
    $left = 0;
    $right = count($s) - 1;
    while ($left < $right) {
        $temp = $s[$left];
        $s[$left] = $s[$right];
        $s[$right] = $temp;
        $left++;
        $right--;
    }
}

// Explanation:
// 1. Use two pointers: left (start) and right (end)
// 2. Swap characters at left and right positions using temp variable
// 3. Move left pointer forward, right pointer backward
// 4. Continue until left >= right
// 5. This reverses the string in-place without extra space`
       }
     }
   ];

  useEffect(() => {
    if (problems.length > 0) {
      setSelectedProblem(problems[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedProblem) {
      if (showBoilerplate) {
        setCode(generateBoilerplateCode(selectedLanguage, selectedProblem.title));
      } else {
        setCode(selectedProblem.starterCode[selectedLanguage] || selectedProblem.starterCode.java);
      }
    }
  }, [selectedProblem, selectedLanguage, showBoilerplate]);

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
      const result = await codeExecutionService.executeCode(selectedLanguage, code);
      
      if (result.error) {
        setOutput(`Error: ${result.error}`);
      } else {
        setOutput(result.output || '// Code executed successfully but no output was produced');
      }
    } catch (error) {
      console.error('Code execution error:', error);
      setOutput(`Execution error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    if (selectedProblem) {
      if (showBoilerplate) {
              setCode(generateBoilerplateCode(selectedLanguage, selectedProblem.title));
    } else {
      setCode(selectedProblem.starterCode[selectedLanguage] || selectedProblem.starterCode.java);
    }
    }
  };

  const handleShowSolution = () => {
    console.log('handleShowSolution called');
    console.log('selectedProblem:', selectedProblem);
    console.log('selectedProblem?.solutions:', selectedProblem?.solutions);
    console.log('selectedLanguage:', selectedLanguage);
    
    if (selectedProblem && selectedProblem.solutions) {
      const solution = selectedProblem.solutions[selectedLanguage] || selectedProblem.solutions.java;
      console.log('solution found:', solution);
      setSelectedSolution(solution);
      setShowSolutionDialog(true);
      console.log('Dialog should now be open');
    } else {
      console.log('No solution available for this problem');
    }
  };

  const handleCopySolution = async () => {
    try {
      await navigator.clipboard.writeText(selectedSolution);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleToggleCodeView = () => {
    setShowBoilerplate(!showBoilerplate);
    if (selectedProblem) {
      if (!showBoilerplate) {
        // Switching to boilerplate
        setCode(generateBoilerplateCode(selectedLanguage, selectedProblem.title));
      } else {
        // Switching to solution
        setCode(selectedProblem.starterCode[selectedLanguage] || selectedProblem.starterCode.java);
      }
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

  const filteredProblems = problems
    .filter(problem => selectedCategory === 'all' || problem.category === selectedCategory)
    .sort((a, b) => {
      // Sort by difficulty: easy -> medium -> hard
      const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
      const difficultyDiff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      
      // If same difficulty, sort by title
      if (difficultyDiff === 0) {
        return a.title.localeCompare(b.title);
      }
      
      return difficultyDiff;
    });

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'core', name: 'Core Coding' },
    { id: 'python', name: 'Python-Specific' },
    { id: 'java', name: 'Java-Specific' },
    { id: 'cpp', name: 'C++-Specific' },
    { id: 'c', name: 'C-Specific' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="coding-practice-container">
        <div className="coding-practice-grid">
          {/* Left Panel - Problems */}
          <div className="left-panel">
            {/* Category Selector */}
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="text-lg text-white">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      className={`w-full justify-start transition-all duration-200 ${
                        selectedCategory === category.id 
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
                          : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Problems List */}
            <Card className="enhanced-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Problems</CardTitle>
                  <Badge className="category-badge">
                    {filteredProblems.length} problems
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedProblem?.id === problem.id
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 border border-purple-500 shadow-lg'
                          : 'hover:bg-gray-700 text-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedProblem(problem)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${selectedProblem?.id === problem.id ? 'text-white' : 'text-gray-300'}`}>{problem.title}</span>
                        <Badge className={`difficulty-badge ${problem.difficulty}`}>
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
              <Card className="problem-description-card">
                <CardHeader className="problem-header">
                  <div className="problem-badges">
                    <Badge className={`difficulty-badge ${selectedProblem.difficulty}`}>
                      {selectedProblem.difficulty}
                    </Badge>
                    <Badge className="category-badge">
                      {selectedProblem.category}
                    </Badge>
                  </div>
                  <div className="problem-actions">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        console.log('Button clicked!');
                        handleShowSolution();
                      }}
                      className="action-button secondary"
                      disabled={!selectedProblem?.solutions}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      See Solution
                    </Button>
                    <Button variant="outline" size="sm" className="action-button secondary">
                      <Download className="w-4 h-4 mr-1" />
                      Download PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="problem-content">
                  <p className="problem-description">{selectedProblem.description}</p>
                  
                  <div className="examples-section">
                    <h4 className="examples-title">Examples:</h4>
                    {selectedProblem.examples.map((example, index) => (
                      <div key={index} className="example-item">
                        <div className="example-number">
                          Example {index + 1}:
                        </div>
                        <div className="example-content">
                          <div className="example-field">
                            <span className="example-label">Input:</span>
                            <span className="example-value">{example.input}</span>
                          </div>
                          <div className="example-field">
                            <span className="example-label">Output:</span>
                            <span className="example-value">{example.output}</span>
                          </div>
                          <div className="example-field">
                            <span className="example-label">Explanation:</span>
                            <span className="example-value">{example.explanation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="constraints-section">
                    <h4 className="constraints-title">Constraints:</h4>
                    <ul className="constraints-list">
                      {selectedProblem.constraints.map((constraint, index) => (
                        <li key={index} className="constraint-item">{constraint}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Code Editor and Output */}
          <div className="flex flex-col space-y-6">
            {/* Code Editor */}
            <Card className="enhanced-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-lg text-white">Code Editor</CardTitle>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                                             <SelectContent className="bg-gray-700 border-gray-600">
                         <SelectItem value="java" className="text-white hover:bg-gray-600">Java</SelectItem>
                         <SelectItem value="cpp" className="text-white hover:bg-gray-600">C++</SelectItem>
                         <SelectItem value="c" className="text-white hover:bg-gray-600">C</SelectItem>
                         <SelectItem value="python" className="text-white hover:bg-gray-600">Python</SelectItem>
                         <SelectItem value="javascript" className="text-white hover:bg-gray-600">JavaScript</SelectItem>
                         <SelectItem value="typescript" className="text-white hover:bg-gray-600">TypeScript</SelectItem>
                         <SelectItem value="csharp" className="text-white hover:bg-gray-600">C#</SelectItem>
                         <SelectItem value="php" className="text-white hover:bg-gray-600">PHP</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleToggleCodeView}
                      className={`action-button ${showBoilerplate ? 'bg-blue-600 text-white' : 'secondary'}`}
                    >
                      {showBoilerplate ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Show Solution
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-1" />
                          Show Boilerplate
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleResetCode} className="action-button secondary">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset Code
                    </Button>
                    <Button className="action-button primary">
                      Submit Solution
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
                    <div className="flex items-center gap-2">
                      <Badge className={`${showBoilerplate ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                        {showBoilerplate ? '📝 Boilerplate' : '💡 Solution'}
                      </Badge>
                      <span className="text-gray-400 text-sm">
                        {showBoilerplate ? 'Start with this template' : 'Complete solution with examples'}
                      </span>
                    </div>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-80 bg-gray-900 text-green-400 font-mono text-sm border-none outline-none resize-none"
                    placeholder="Write your code here..."
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Time: {formatTime(timer)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={async () => {
                        setCode('System.out.println("Hello, World!");');
                        setSelectedLanguage('java');
                        
                        // Test the API connection
                        try {
                          console.log('Testing API connection...');
                          setOutput('Testing API connection...');
                          
                          // Test with Java first (most reliable)
                          try {
                            const testResult = await codeExecutionService.executeCode('java', 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }');
                            if (!testResult.error) {
                              setOutput(`API Test Successful! Java is working.\nOutput: ${testResult.output}`);
                            } else {
                              setOutput(`API Test Failed: ${testResult.error}`);
                            }
                          } catch (error) {
                            console.error('API test error:', error);
                            setOutput(`API Test Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                          }
                        } catch (error) {
                          console.error('API test error:', error);
                          setOutput(`API Test Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                        }
                      }}
                      variant="outline" 
                      size="sm" 
                      className="action-button secondary"
                    >
                      Test
                    </Button>
                    <Button 
                      onClick={handleRunCode} 
                      disabled={isRunning}
                      className="action-button primary"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Run Code
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card className="enhanced-card flex-1 flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-white">Output</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="action-button secondary"
                    onClick={() => setOutput('')}
                  >
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="bg-gray-900 rounded-lg p-3 sm:p-4 flex-1 overflow-y-auto">
                  {isRunning ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span className="text-sm">Running code...</span>
                    </div>
                  ) : (
                    <pre className="text-green-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                      {output || '// Output will appear here after running your code'}
                    </pre>
                  )}
                  
                  {/* Solution Box - appears at the end of output */}
                  {showSolution && selectedSolution && (
                    <div className="mt-4 sm:mt-6 border-t border-gray-700 pt-3 sm:pt-4">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <span className="text-yellow-400">💡</span>
                          Solution
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSolution(false)}
                          className="action-button secondary p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-600">
                        <pre className="text-yellow-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                          {selectedSolution}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
           </div>
         </div>
       </div>

      {/* Solution Dialog */}
      <Dialog open={showSolutionDialog} onOpenChange={setShowSolutionDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-gray-800 border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <span className="text-yellow-400">💡</span>
              Solution for {selectedProblem?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-blue-600 text-white">
                {selectedLanguage.toUpperCase()}
              </Badge>
              <Button
                onClick={handleCopySolution}
                variant="outline"
                size="sm"
                className="action-button secondary"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 max-h-96 overflow-y-auto">
              <pre className="text-yellow-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {selectedSolution}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>

     </div>
   );
 };

export default CodingPractice; 