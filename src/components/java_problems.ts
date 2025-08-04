// Java-specific coding interview problems

export const javaProblems = [
  {
    id: '13',
    title: 'Java HashMap Operations',
    difficulty: 'medium' as const,
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
    },
    solutions: {
      python: `def char_frequency(s):
    """
    Count the frequency of each character in a string using a dictionary.
    
    Args:
        s (str): Input string
        
    Returns:
        dict: Dictionary with character counts
    """
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq

# Test the function
s = "hello"
result = char_frequency(s)
print(f"Input: s = \\"{s}\\"")
print(f"Output: {result}")

# Additional test cases
test_cases = ["hello", "programming", "aabbcc"]
for test in test_cases:
    print(f"\\nTest case: '{test}'")
    print(f"Result: {char_frequency(test)}")`,
      java: `import java.util.*;

public class Solution {
    /**
     * Count the frequency of each character in a string using HashMap.
     * 
     * @param s Input string
     * @return Map containing character frequencies
     */
    public Map<Character, Integer> charFrequency(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        
        // Iterate through each character in the string
        for (char c : s.toCharArray()) {
            // Increment count for each character
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
        
        // Additional test cases
        String[] testCases = {"hello", "programming", "aabbcc"};
        for (String test : testCases) {
            System.out.println("\\nTest case: '" + test + "'");
            System.out.println("Result: " + solution.charFrequency(test));
        }
    }
}`,
      cpp: `#include <iostream>
#include <map>
#include <string>
using namespace std;

class Solution {
public:
    /**
     * Count the frequency of each character in a string using map.
     * 
     * @param s Input string
     * @return map containing character frequencies
     */
    map<char, int> charFrequency(string s) {
        map<char, int> freq;
        
        // Iterate through each character in the string
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
    
    // Additional test cases
    string testCases[] = {"hello", "programming", "aabbcc"};
    for (const string& test : testCases) {
        cout << "\\nTest case: '" << test << "'" << endl;
        map<char, int> testResult = solution.charFrequency(test);
        cout << "Result: {";
        first = true;
        for (const auto& pair : testResult) {
            if (!first) cout << ", ";
            cout << "'" << pair.first << "': " << pair.second;
            first = false;
        }
        cout << "}" << endl;
    }
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char key;
    int value;
} CharFreq;

/**
 * Count the frequency of each character in a string.
 * 
 * @param s Input string
 * @param size Pointer to store the number of unique characters
 * @return Array of CharFreq structures
 */
CharFreq* charFrequency(char* s, int* size) {
    CharFreq* freq = (CharFreq*)malloc(256 * sizeof(CharFreq));
    int count = 0;
    int len = strlen(s);
    
    // Initialize all frequencies to 0
    for (int i = 0; i < 256; i++) {
        freq[i].key = 0;
        freq[i].value = 0;
    }
    
    // Count frequency of each character
    for (int i = 0; i < len; i++) {
        char c = s[i];
        int found = 0;
        
        // Check if character already exists in our array
        for (int j = 0; j < count; j++) {
            if (freq[j].key == c) {
                freq[j].value++;
                found = 1;
                break;
            }
        }
        
        // If character not found, add it to array
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
    
    // Additional test cases
    char* testCases[] = {"hello", "programming", "aabbcc"};
    int numTests = 3;
    
    for (int t = 0; t < numTests; t++) {
        printf("\\nTest case: '%s'\\n", testCases[t]);
        int testSize;
        CharFreq* testResult = charFrequency(testCases[t], &testSize);
        printf("Result: {");
        for (int i = 0; i < testSize; i++) {
            printf("'%c': %d", testResult[i].key, testResult[i].value);
            if (i < testSize - 1) printf(", ");
        }
        printf("}\\n");
        free(testResult);
    }
    
    free(result);
    return 0;
}`
    }
  },
  {
    id: '14',
    title: 'Java Streams API',
    difficulty: 'medium' as const,
    category: 'java',
    description: 'Use Java Streams to filter even numbers and calculate their sum.',
    examples: [
      {
        input: 'nums = [1, 2, 3, 4, 5, 6]',
        output: '12',
        explanation: 'Even numbers [2,4,6] sum to 12'
      }
    ],
    constraints: [
      '1 <= len(nums) <= 1000',
      'Use Streams API'
    ],
    starterCode: {
      python: `def sum_even_numbers(nums):
    # Write your code here
    return sum(num for num in nums if num % 2 == 0)

# Test the function
nums = [1, 2, 3, 4, 5, 6]
result = sum_even_numbers(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      java: `import java.util.*;
import java.util.stream.Collectors;

public class Solution {
    public int sumEvenNumbers(int[] nums) {
        // Write your code here using Streams API
        return Arrays.stream(nums)
                    .filter(num -> num % 2 == 0)
                    .sum();
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6};
        Solution solution = new Solution();
        int result = solution.sumEvenNumbers(nums);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "]");
        System.out.println("Output: " + result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    int sumEvenNumbers(vector<int>& nums) {
        // Write your code here
        int sum = 0;
        for (int num : nums) {
            if (num % 2 == 0) {
                sum += num;
            }
        }
        return sum;
    }
};

int main() {
    vector<int> nums = {1, 2, 3, 4, 5, 6};
    Solution solution;
    int result = solution.sumEvenNumbers(nums);
    
    cout << "Input: nums = [";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i < nums.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    cout << "Output: " << result << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int sumEvenNumbers(int* nums, int numsSize) {
    // Write your code here
    int sum = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] % 2 == 0) {
            sum += nums[i];
        }
    }
    return sum;
}

int main() {
    int nums[] = {1, 2, 3, 4, 5, 6};
    int numsSize = 6;
    int result = sumEvenNumbers(nums, numsSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("Output: %d\\n", result);
    
    return 0;
}`
    },
    solutions: {
      python: `def sum_even_numbers(nums):
    """
    Filter even numbers from a list and calculate their sum.
    
    Args:
        nums (list): List of integers
        
    Returns:
        int: Sum of even numbers
    """
    return sum(num for num in nums if num % 2 == 0)

# Test the function
nums = [1, 2, 3, 4, 5, 6]
result = sum_even_numbers(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")

# Additional test cases
test_cases = [
    [1, 2, 3, 4, 5, 6],
    [1, 3, 5, 7, 9],
    [2, 4, 6, 8, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
]

for test in test_cases:
    print(f"\\nTest case: {test}")
    print(f"Result: {sum_even_numbers(test)}")`,
      java: `import java.util.*;
import java.util.stream.Collectors;

public class Solution {
    /**
     * Use Java Streams to filter even numbers and calculate their sum.
     * 
     * @param nums Array of integers
     * @return Sum of even numbers
     */
    public int sumEvenNumbers(int[] nums) {
        return Arrays.stream(nums)
                    .filter(num -> num % 2 == 0)
                    .sum();
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6};
        Solution solution = new Solution();
        int result = solution.sumEvenNumbers(nums);
        
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "]");
        System.out.println("Output: " + result);
        
        // Additional test cases
        int[][] testCases = {
            {1, 2, 3, 4, 5, 6},
            {1, 3, 5, 7, 9},
            {2, 4, 6, 8, 10},
            {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
        };
        
        for (int[] test : testCases) {
            System.out.println("\\nTest case: " + java.util.Arrays.toString(test));
            System.out.println("Result: " + solution.sumEvenNumbers(test));
        }
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    /**
     * Filter even numbers from a vector and calculate their sum.
     * 
     * @param nums Vector of integers
     * @return Sum of even numbers
     */
    int sumEvenNumbers(vector<int>& nums) {
        int sum = 0;
        for (int num : nums) {
            if (num % 2 == 0) {
                sum += num;
            }
        }
        return sum;
    }
};

int main() {
    vector<int> nums = {1, 2, 3, 4, 5, 6};
    Solution solution;
    int result = solution.sumEvenNumbers(nums);
    
    cout << "Input: nums = [";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i < nums.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    cout << "Output: " << result << endl;
    
    // Additional test cases
    vector<vector<int>> testCases = {
        {1, 2, 3, 4, 5, 6},
        {1, 3, 5, 7, 9},
        {2, 4, 6, 8, 10},
        {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    };
    
    for (const vector<int>& test : testCases) {
        cout << "\\nTest case: [";
        for (int i = 0; i < test.size(); i++) {
            cout << test[i];
            if (i < test.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
        cout << "Result: " << solution.sumEvenNumbers(const_cast<vector<int>&>(test)) << endl;
    }
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

/**
 * Filter even numbers from an array and calculate their sum.
 * 
 * @param nums Array of integers
 * @param numsSize Size of the array
 * @return Sum of even numbers
 */
int sumEvenNumbers(int* nums, int numsSize) {
    int sum = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] % 2 == 0) {
            sum += nums[i];
        }
    }
    return sum;
}

int main() {
    int nums[] = {1, 2, 3, 4, 5, 6};
    int numsSize = 6;
    int result = sumEvenNumbers(nums, numsSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("Output: %d\\n", result);
    
    // Additional test cases
    int testCases[][10] = {
        {1, 2, 3, 4, 5, 6},
        {1, 3, 5, 7, 9},
        {2, 4, 6, 8, 10},
        {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    };
    int testSizes[] = {6, 5, 5, 10};
    int numTests = 4;
    
    for (int t = 0; t < numTests; t++) {
        printf("\\nTest case: [");
        for (int i = 0; i < testSizes[t]; i++) {
            printf("%d", testCases[t][i]);
            if (i < testSizes[t] - 1) printf(", ");
        }
        printf("]\\n");
        printf("Result: %d\\n", sumEvenNumbers(testCases[t], testSizes[t]));
    }
    
    return 0;
}`
    }
  },
  {
    id: '15',
    title: 'Java Collections Framework',
    difficulty: 'medium' as const,
    category: 'java',
    description: 'Implement a function that finds the most frequent element in an array using Collections.',
    examples: [
      {
        input: 'nums = [1, 2, 2, 3, 2, 4, 5]',
        output: '2',
        explanation: 'Element 2 appears 3 times, which is the most frequent'
      }
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      'Use Collections framework'
    ],
    starterCode: {
      python: `def most_frequent(nums):
    # Write your code here
    from collections import Counter
    counter = Counter(nums)
    return counter.most_common(1)[0][0]

# Test the function
nums = [1, 2, 2, 3, 2, 4, 5]
result = most_frequent(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      java: `import java.util.*;

public class Solution {
    public int mostFrequent(int[] nums) {
        // Write your code here using Collections
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }
        
        int maxFreq = 0;
        int mostFrequent = nums[0];
        
        for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
            if (entry.getValue() > maxFreq) {
                maxFreq = entry.getValue();
                mostFrequent = entry.getKey();
            }
        }
        
        return mostFrequent;
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 2, 3, 2, 4, 5};
        Solution solution = new Solution();
        int result = solution.mostFrequent(nums);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "]");
        System.out.println("Output: " + result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

class Solution {
public:
    int mostFrequent(vector<int>& nums) {
        // Write your code here
        map<int, int> freq;
        for (int num : nums) {
            freq[num]++;
        }
        
        int maxFreq = 0;
        int mostFrequent = nums[0];
        
        for (const auto& pair : freq) {
            if (pair.second > maxFreq) {
                maxFreq = pair.second;
                mostFrequent = pair.first;
            }
        }
        
        return mostFrequent;
    }
};

int main() {
    vector<int> nums = {1, 2, 2, 3, 2, 4, 5};
    Solution solution;
    int result = solution.mostFrequent(nums);
    
    cout << "Input: nums = [";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i < nums.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    cout << "Output: " << result << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int key;
    int value;
} IntFreq;

int mostFrequent(int* nums, int numsSize) {
    // Write your code here
    IntFreq* freq = (IntFreq*)malloc(numsSize * sizeof(IntFreq));
    int count = 0;
    
    for (int i = 0; i < numsSize; i++) {
        int found = 0;
        for (int j = 0; j < count; j++) {
            if (freq[j].key == nums[i]) {
                freq[j].value++;
                found = 1;
                break;
            }
        }
        if (!found) {
            freq[count].key = nums[i];
            freq[count].value = 1;
            count++;
        }
    }
    
    int maxFreq = 0;
    int mostFrequent = nums[0];
    
    for (int i = 0; i < count; i++) {
        if (freq[i].value > maxFreq) {
            maxFreq = freq[i].value;
            mostFrequent = freq[i].key;
        }
    }
    
    free(freq);
    return mostFrequent;
}

int main() {
    int nums[] = {1, 2, 2, 3, 2, 4, 5};
    int numsSize = 7;
    int result = mostFrequent(nums, numsSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("Output: %d\\n", result);
    
    return 0;
}`
    }
  },
  {
    id: '16',
    title: 'Java Exception Handling',
    difficulty: 'medium' as const,
    category: 'java',
    description: 'Create a function that safely divides two numbers with proper exception handling.',
    examples: [
      {
        input: 'a = 10, b = 2',
        output: '5.0',
        explanation: '10 divided by 2 equals 5'
      },
      {
        input: 'a = 10, b = 0',
        output: 'Error: Division by zero',
        explanation: 'Proper exception handling for division by zero'
      }
    ],
    constraints: [
      'Handle ArithmeticException',
      'Return appropriate error message'
    ],
    starterCode: {
      python: `def safe_divide(a, b):
    # Write your code here
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Division by zero"

# Test the function
test_cases = [(10, 2), (10, 0), (15, 3)]
for a, b in test_cases:
    result = safe_divide(a, b)
    print(f"Input: a = {a}, b = {b}")
    print(f"Output: {result}")`,
      java: `public class Solution {
    public String safeDivide(int a, int b) {
        // Write your code here with exception handling
        try {
            double result = (double) a / b;
            return String.valueOf(result);
        } catch (ArithmeticException e) {
            return "Error: Division by zero";
        }
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        
        int[][] testCases = {{10, 2}, {10, 0}, {15, 3}};
        for (int[] testCase : testCases) {
            int a = testCase[0];
            int b = testCase[1];
            String result = solution.safeDivide(a, b);
            System.out.println("Input: a = " + a + ", b = " + b);
            System.out.println("Output: " + result);
        }
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    string safeDivide(int a, int b) {
        // Write your code here
        if (b == 0) {
            return "Error: Division by zero";
        }
        double result = (double) a / b;
        return to_string(result);
    }
};

int main() {
    Solution solution;
    
    int testCases[][2] = {{10, 2}, {10, 0}, {15, 3}};
    for (int i = 0; i < 3; i++) {
        int a = testCases[i][0];
        int b = testCases[i][1];
        string result = solution.safeDivide(a, b);
        cout << "Input: a = " << a << ", b = " << b << endl;
        cout << "Output: " << result << endl;
    }
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* safeDivide(int a, int b) {
    // Write your code here
    if (b == 0) {
        char* error = (char*)malloc(50);
        strcpy(error, "Error: Division by zero");
        return error;
    }
    
    double result = (double) a / b;
    char* resultStr = (char*)malloc(50);
    sprintf(resultStr, "%.1f", result);
    return resultStr;
}

int main() {
    int testCases[][2] = {{10, 2}, {10, 0}, {15, 3}};
    
    for (int i = 0; i < 3; i++) {
        int a = testCases[i][0];
        int b = testCases[i][1];
        char* result = safeDivide(a, b);
        printf("Input: a = %d, b = %d\\n", a, b);
        printf("Output: %s\\n", result);
        free(result);
    }
    
    return 0;
}`
    }
  },
  {
    id: '17',
    title: 'Java Multithreading',
    difficulty: 'hard' as const,
    category: 'java',
    description: 'Create a program that uses multiple threads to calculate the sum of an array.',
    examples: [
      {
        input: 'nums = [1, 2, 3, 4, 5, 6, 7, 8]',
        output: '36',
        explanation: 'Sum of all numbers using multiple threads'
      }
    ],
    constraints: [
      'Use Thread class or ExecutorService',
      'Handle thread synchronization'
    ],
    starterCode: {
      python: `import threading
from concurrent.futures import ThreadPoolExecutor

def sum_array(nums):
    # Write your code here using threading
    def sum_chunk(chunk):
        return sum(chunk)
    
    # Split array into chunks for multiple threads
    chunk_size = len(nums) // 4
    chunks = [nums[i:i+chunk_size] for i in range(0, len(nums), chunk_size)]
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(sum_chunk, chunks))
    
    return sum(results)

# Test the function
nums = [1, 2, 3, 4, 5, 6, 7, 8]
result = sum_array(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      java: `import java.util.concurrent.*;

public class Solution {
    public int sumArray(int[] nums) {
        // Write your code here using multithreading
        int numThreads = 4;
        int chunkSize = nums.length / numThreads;
        
        ExecutorService executor = Executors.newFixedThreadPool(numThreads);
        Future<Integer>[] futures = new Future[numThreads];
        
        for (int i = 0; i < numThreads; i++) {
            final int start = i * chunkSize;
            final int end = (i == numThreads - 1) ? nums.length : (i + 1) * chunkSize;
            
            futures[i] = executor.submit(() -> {
                int sum = 0;
                for (int j = start; j < end; j++) {
                    sum += nums[j];
                }
                return sum;
            });
        }
        
        int totalSum = 0;
        try {
            for (Future<Integer> future : futures) {
                totalSum += future.get();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();
        }
        
        return totalSum;
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5, 6, 7, 8};
        Solution solution = new Solution();
        int result = solution.sumArray(nums);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "]");
        System.out.println("Output: " + result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <thread>
#include <future>
using namespace std;

class Solution {
public:
    int sumArray(vector<int>& nums) {
        // Write your code here using multithreading
        int numThreads = 4;
        int chunkSize = nums.size() / numThreads;
        
        vector<future<int>> futures;
        
        for (int i = 0; i < numThreads; i++) {
            int start = i * chunkSize;
            int end = (i == numThreads - 1) ? nums.size() : (i + 1) * chunkSize;
            
            futures.push_back(async(launch::async, [&nums, start, end]() {
                int sum = 0;
                for (int j = start; j < end; j++) {
                    sum += nums[j];
                }
                return sum;
            }));
        }
        
        int totalSum = 0;
        for (auto& future : futures) {
            totalSum += future.get();
        }
        
        return totalSum;
    }
};

int main() {
    vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};
    Solution solution;
    int result = solution.sumArray(nums);
    
    cout << "Input: nums = [";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i < nums.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    cout << "Output: " << result << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

typedef struct {
    int* nums;
    int start;
    int end;
    int result;
} ThreadData;

void* sumChunk(void* arg) {
    ThreadData* data = (ThreadData*)arg;
    int sum = 0;
    
    for (int i = data->start; i < data->end; i++) {
        sum += data->nums[i];
    }
    
    data->result = sum;
    return NULL;
}

int sumArray(int* nums, int numsSize) {
    // Write your code here using multithreading
    int numThreads = 4;
    int chunkSize = numsSize / numThreads;
    
    pthread_t threads[numThreads];
    ThreadData threadData[numThreads];
    
    for (int i = 0; i < numThreads; i++) {
        threadData[i].nums = nums;
        threadData[i].start = i * chunkSize;
        threadData[i].end = (i == numThreads - 1) ? numsSize : (i + 1) * chunkSize;
        
        pthread_create(&threads[i], NULL, sumChunk, &threadData[i]);
    }
    
    int totalSum = 0;
    for (int i = 0; i < numThreads; i++) {
        pthread_join(threads[i], NULL);
        totalSum += threadData[i].result;
    }
    
    return totalSum;
}

int main() {
    int nums[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int numsSize = 8;
    int result = sumArray(nums, numsSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("Output: %d\\n", result);
    
    return 0;
}`
    }
  },
  {
    id: '18',
    title: 'Java Design Patterns',
    difficulty: 'hard' as const,
    category: 'java',
    description: 'Implement the Singleton pattern in Java.',
    examples: [
      {
        input: 'Create multiple instances',
        output: 'Same instance returned',
        explanation: 'Singleton ensures only one instance exists'
      }
    ],
    constraints: [
      'Use Singleton pattern',
      'Thread-safe implementation'
    ],
    starterCode: {
      python: `class Singleton:
    _instance = None
    
    def __new__(cls):
        # Write your code here
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        self.data = "Singleton Data"

# Test the singleton
instance1 = Singleton()
instance2 = Singleton()
print(f"Instance 1: {instance1}")
print(f"Instance 2: {instance2}")
print(f"Same instance: {instance1 is instance2}")`,
      java: `public class Singleton {
    // Write your code here
    private static volatile Singleton instance;
    private String data;
    
    private Singleton() {
        data = "Singleton Data";
    }
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
    
    public String getData() {
        return data;
    }
    
    public static void main(String[] args) {
        Singleton instance1 = Singleton.getInstance();
        Singleton instance2 = Singleton.getInstance();
        
        System.out.println("Instance 1: " + instance1);
        System.out.println("Instance 2: " + instance2);
        System.out.println("Same instance: " + (instance1 == instance2));
    }
}`,
      cpp: `#include <iostream>
#include <mutex>
using namespace std;

class Singleton {
private:
    static Singleton* instance;
    static mutex mutex_;
    string data;
    
    Singleton() {
        data = "Singleton Data";
    }
    
public:
    static Singleton* getInstance() {
        if (instance == nullptr) {
            lock_guard<mutex> lock(mutex_);
            if (instance == nullptr) {
                instance = new Singleton();
            }
        }
        return instance;
    }
    
    string getData() {
        return data;
    }
};

Singleton* Singleton::instance = nullptr;
mutex Singleton::mutex_;

int main() {
    Singleton* instance1 = Singleton::getInstance();
    Singleton* instance2 = Singleton::getInstance();
    
    cout << "Instance 1: " << instance1 << endl;
    cout << "Instance 2: " << instance2 << endl;
    cout << "Same instance: " << (instance1 == instance2) << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

typedef struct {
    char data[50];
} Singleton;

static Singleton* instance = NULL;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

Singleton* getInstance() {
    if (instance == NULL) {
        pthread_mutex_lock(&mutex);
        if (instance == NULL) {
            instance = (Singleton*)malloc(sizeof(Singleton));
            strcpy(instance->data, "Singleton Data");
        }
        pthread_mutex_unlock(&mutex);
    }
    return instance;
}

int main() {
    Singleton* instance1 = getInstance();
    Singleton* instance2 = getInstance();
    
    printf("Instance 1: %p\\n", (void*)instance1);
    printf("Instance 2: %p\\n", (void*)instance2);
    printf("Same instance: %s\\n", (instance1 == instance2) ? "true" : "false");
    
    return 0;
}`
    }
  }
]; 