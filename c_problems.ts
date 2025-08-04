// C-specific coding interview problems

export const cProblems = [
  {
    id: '25',
    title: 'C Pointers and Memory Management',
    difficulty: 'medium',
    category: 'c',
    description: 'Create a function that dynamically allocates memory for an array and reverses it.',
    examples: [
      {
        input: 'nums = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'Array reversed using pointers'
      }
    ],
    constraints: [
      '1 <= len(nums) <= 1000',
      'Use dynamic memory allocation'
    ],
    starterCode: {
      python: `def reverse_array(nums):
    # Write your code here
    return nums[::-1]

# Test the function
nums = [1, 2, 3, 4, 5]
result = reverse_array(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      java: `import java.util.*;

public class Solution {
    public int[] reverseArray(int[] nums) {
        // Write your code here
        int[] result = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            result[i] = nums[nums.length - 1 - i];
        }
        return result;
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        Solution solution = new Solution();
        int[] result = solution.reverseArray(nums);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "]");
        System.out.println("Output: [" + java.util.Arrays.toString(result) + "]");
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        // Write your code here
        vector<int> result(nums.size());
        for (int i = 0; i < nums.size(); i++) {
            result[i] = nums[nums.size() - 1 - i];
        }
        return result;
    }
};

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    Solution solution;
    vector<int> result = solution.reverseArray(nums);
    
    cout << "Input: nums = [";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i < nums.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
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

int* reverseArray(int* nums, int numsSize) {
    // Write your code here using dynamic memory allocation
    int* result = (int*)malloc(numsSize * sizeof(int));
    
    for (int i = 0; i < numsSize; i++) {
        result[i] = nums[numsSize - 1 - i];
    }
    
    return result;
}

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    int numsSize = 5;
    int* result = reverseArray(nums, numsSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("Output: [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", result[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
    free(result);
    return 0;
}`
    }
  },
  {
    id: '26',
    title: 'C Structs and Unions',
    difficulty: 'medium',
    category: 'c',
    description: 'Create a union that can store different data types and demonstrate its usage.',
    examples: [
      {
        input: 'Store int, float, and char in union',
        output: 'Union can hold different types',
        explanation: 'Union shares memory space for different types'
      }
    ],
    constraints: [
      'Use union',
      'Demonstrate memory sharing'
    ],
    starterCode: {
      python: `class FlexibleData:
    def __init__(self):
        self.data_type = None
        self.value = None
    
    def set_int(self, value):
        self.data_type = "int"
        self.value = value
    
    def set_float(self, value):
        self.data_type = "float"
        self.value = value
    
    def set_char(self, value):
        self.data_type = "char"
        self.value = value
    
    def get_value(self):
        return self.value

# Test union-like behavior
data = FlexibleData()
data.set_int(42)
print(f"Stored int: {data.get_value()}")
data.set_float(3.14)
print(f"Stored float: {data.get_value()}")`,
      java: `public class FlexibleData {
    private String dataType;
    private Object value;
    
    public void setInt(int value) {
        this.dataType = "int";
        this.value = value;
    }
    
    public void setFloat(float value) {
        this.dataType = "float";
        this.value = value;
    }
    
    public void setChar(char value) {
        this.dataType = "char";
        this.value = value;
    }
    
    public Object getValue() {
        return value;
    }
    
    public static void main(String[] args) {
        FlexibleData data = new FlexibleData();
        data.setInt(42);
        System.out.println("Stored int: " + data.getValue());
        data.setFloat(3.14f);
        System.out.println("Stored float: " + data.getValue());
    }
}`,
      cpp: `#include <iostream>
#include <variant>
using namespace std;

class FlexibleData {
private:
    variant<int, float, char> data;
    
public:
    void setInt(int value) {
        data = value;
    }
    
    void setFloat(float value) {
        data = value;
    }
    
    void setChar(char value) {
        data = value;
    }
    
    void printValue() {
        visit([](auto& value) {
            cout << "Value: " << value << endl;
        }, data);
    }
};

int main() {
    FlexibleData data;
    data.setInt(42);
    cout << "Stored int: ";
    data.printValue();
    
    data.setFloat(3.14f);
    cout << "Stored float: ";
    data.printValue();
    
    return 0;
}`,
      c: `#include <stdio.h>

typedef union {
    int i;
    float f;
    char c;
} FlexibleData;

int main() {
    // Write your code here using union
    FlexibleData data;
    
    data.i = 42;
    printf("Stored int: %d\\n", data.i);
    
    data.f = 3.14f;
    printf("Stored float: %.2f\\n", data.f);
    
    data.c = 'A';
    printf("Stored char: %c\\n", data.c);
    
    return 0;
}`
    }
  },
  {
    id: '27',
    title: 'C Function Pointers',
    difficulty: 'medium',
    category: 'c',
    description: 'Create a function that uses function pointers to perform different operations.',
    examples: [
      {
        input: 'Apply different operations to numbers',
        output: 'Results of different operations',
        explanation: 'Function pointers allow dynamic function calls'
      }
    ],
    constraints: [
      'Use function pointers',
      'Demonstrate callback pattern'
    ],
    starterCode: {
      python: `def square(x):
    return x * x

def cube(x):
    return x * x * x

def apply_operation(func, x):
    # Write your code here
    return func(x)

# Test function pointers
x = 5
print(f"Square of {x}: {apply_operation(square, x)}")
print(f"Cube of {x}: {apply_operation(cube, x)}")`,
      java: `import java.util.function.Function;

public class Solution {
    public static int square(int x) {
        return x * x;
    }
    
    public static int cube(int x) {
        return x * x * x;
    }
    
    public static int applyOperation(Function<Integer, Integer> func, int x) {
        // Write your code here
        return func.apply(x);
    }
    
    public static void main(String[] args) {
        int x = 5;
        System.out.println("Square of " + x + ": " + applyOperation(Solution::square, x));
        System.out.println("Cube of " + x + ": " + applyOperation(Solution::cube, x));
    }
}`,
      cpp: `#include <iostream>
#include <functional>
using namespace std;

int square(int x) {
    return x * x;
}

int cube(int x) {
    return x * x * x;
}

int applyOperation(function<int(int)> func, int x) {
    // Write your code here
    return func(x);
}

int main() {
    int x = 5;
    cout << "Square of " << x << ": " << applyOperation(square, x) << endl;
    cout << "Cube of " << x << ": " << applyOperation(cube, x) << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>

int square(int x) {
    return x * x;
}

int cube(int x) {
    return x * x * x;
}

int applyOperation(int (*func)(int), int x) {
    // Write your code here using function pointers
    return func(x);
}

int main() {
    int x = 5;
    printf("Square of %d: %d\\n", x, applyOperation(square, x));
    printf("Cube of %d: %d\\n", x, applyOperation(cube, x));
    
    return 0;
}`
    }
  },
  {
    id: '28',
    title: 'C Preprocessor Macros',
    difficulty: 'medium',
    category: 'c',
    description: 'Create macros for common operations and demonstrate their usage.',
    examples: [
      {
        input: 'Use macros for calculations',
        output: 'Results using preprocessor macros',
        explanation: 'Macros provide compile-time text substitution'
      }
    ],
    constraints: [
      'Use #define macros',
      'Demonstrate macro expansion'
    ],
    starterCode: {
      python: `def max_value(a, b):
    return a if a > b else b

def min_value(a, b):
    return a if a < b else b

def abs_value(x):
    return x if x >= 0 else -x

# Test macro-like functions
a, b = 10, 5
print(f"Max of {a} and {b}: {max_value(a, b)}")
print(f"Min of {a} and {b}: {min_value(a, b)}")
print(f"Absolute value of -7: {abs_value(-7)}")`,
      java: `public class Solution {
    public static int maxValue(int a, int b) {
        return a > b ? a : b;
    }
    
    public static int minValue(int a, int b) {
        return a < b ? a : b;
    }
    
    public static int absValue(int x) {
        return x >= 0 ? x : -x;
    }
    
    public static void main(String[] args) {
        int a = 10, b = 5;
        System.out.println("Max of " + a + " and " + b + ": " + maxValue(a, b));
        System.out.println("Min of " + a + " and " + b + ": " + minValue(a, b));
        System.out.println("Absolute value of -7: " + absValue(-7));
    }
}`,
      cpp: `#include <iostream>
using namespace std;

int maxValue(int a, int b) {
    return a > b ? a : b;
}

int minValue(int a, int b) {
    return a < b ? a : b;
}

int absValue(int x) {
    return x >= 0 ? x : -x;
}

int main() {
    int a = 10, b = 5;
    cout << "Max of " << a << " and " << b << ": " << maxValue(a, b) << endl;
    cout << "Min of " << a << " and " << b << ": " << minValue(a, b) << endl;
    cout << "Absolute value of -7: " << absValue(-7) << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>

// Write your code here using preprocessor macros
#define MAX_VALUE(a, b) ((a) > (b) ? (a) : (b))
#define MIN_VALUE(a, b) ((a) < (b) ? (a) : (b))
#define ABS_VALUE(x) ((x) >= 0 ? (x) : -(x))

int main() {
    int a = 10, b = 5;
    printf("Max of %d and %d: %d\\n", a, b, MAX_VALUE(a, b));
    printf("Min of %d and %d: %d\\n", a, b, MIN_VALUE(a, b));
    printf("Absolute value of -7: %d\\n", ABS_VALUE(-7));
    
    return 0;
}`
    }
  },
  {
    id: '29',
    title: 'C Bit Manipulation',
    difficulty: 'hard',
    category: 'c',
    description: 'Implement bit manipulation functions for common operations.',
    examples: [
      {
        input: 'num = 42 (binary: 101010)',
        output: 'Count of set bits: 3',
        explanation: 'Count the number of 1s in binary representation'
      }
    ],
    constraints: [
      'Use bitwise operators',
      'Work with binary representation'
    ],
    starterCode: {
      python: `def count_set_bits(num):
    # Write your code here
    count = 0
    while num:
        count += num & 1
        num >>= 1
    return count

def is_power_of_two(num):
    return num > 0 and (num & (num - 1)) == 0

# Test bit manipulation
num = 42
print(f"Number: {num} (binary: {bin(num)})")
print(f"Count of set bits: {count_set_bits(num)}")
print(f"Is power of 2: {is_power_of_two(num)}")`,
      java: `public class Solution {
    public static int countSetBits(int num) {
        // Write your code here
        int count = 0;
        while (num != 0) {
            count += num & 1;
            num >>= 1;
        }
        return count;
    }
    
    public static boolean isPowerOfTwo(int num) {
        return num > 0 && (num & (num - 1)) == 0;
    }
    
    public static void main(String[] args) {
        int num = 42;
        System.out.println("Number: " + num + " (binary: " + Integer.toBinaryString(num) + ")");
        System.out.println("Count of set bits: " + countSetBits(num));
        System.out.println("Is power of 2: " + isPowerOfTwo(num));
    }
}`,
      cpp: `#include <iostream>
#include <bitset>
using namespace std;

class Solution {
public:
    static int countSetBits(int num) {
        // Write your code here
        int count = 0;
        while (num != 0) {
            count += num & 1;
            num >>= 1;
        }
        return count;
    }
    
    static bool isPowerOfTwo(int num) {
        return num > 0 && (num & (num - 1)) == 0;
    }
};

int main() {
    int num = 42;
    cout << "Number: " << num << " (binary: " << bitset<8>(num) << ")" << endl;
    cout << "Count of set bits: " << Solution::countSetBits(num) << endl;
    cout << "Is power of 2: " << (Solution::isPowerOfTwo(num) ? "true" : "false") << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>

int countSetBits(int num) {
    // Write your code here using bitwise operators
    int count = 0;
    while (num != 0) {
        count += num & 1;
        num >>= 1;
    }
    return count;
}

int isPowerOfTwo(int num) {
    return num > 0 && (num & (num - 1)) == 0;
}

void printBinary(int num) {
    for (int i = 7; i >= 0; i--) {
        printf("%d", (num >> i) & 1);
    }
}

int main() {
    int num = 42;
    printf("Number: %d (binary: ", num);
    printBinary(num);
    printf(")\\n");
    printf("Count of set bits: %d\\n", countSetBits(num));
    printf("Is power of 2: %s\\n", isPowerOfTwo(num) ? "true" : "false");
    
    return 0;
}`
    }
  },
  {
    id: '30',
    title: 'C Linked Lists',
    difficulty: 'hard',
    category: 'c',
    description: 'Implement a linked list with basic operations (insert, delete, reverse).',
    examples: [
      {
        input: 'Create list: 1->2->3->4->5',
        output: 'Reversed: 5->4->3->2->1',
        explanation: 'Reverse the linked list'
      }
    ],
    constraints: [
      'Use dynamic memory allocation',
      'Implement linked list operations'
    ],
    starterCode: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # Write your code here
    prev = None
    current = head
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    return prev

def print_list(head):
    current = head
    while current:
        print(current.val, end=" -> " if current.next else "\\n")
        current = current.next

# Test linked list
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)
head.next.next.next.next = ListNode(5)

print("Original list:")
print_list(head)
reversed_head = reverse_list(head)
print("Reversed list:")
print_list(reversed_head)`,
      java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public static ListNode reverseList(ListNode head) {
        // Write your code here
        ListNode prev = null;
        ListNode current = head;
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }
    
    public static void printList(ListNode head) {
        ListNode current = head;
        while (current != null) {
            System.out.print(current.val);
            if (current.next != null) {
                System.out.print(" -> ");
            }
            current = current.next;
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);
        
        System.out.println("Original list:");
        printList(head);
        
        ListNode reversedHead = reverseList(head);
        System.out.println("Reversed list:");
        printList(reversedHead);
    }
}`,
      cpp: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    static ListNode* reverseList(ListNode* head) {
        // Write your code here
        ListNode* prev = nullptr;
        ListNode* current = head;
        while (current != nullptr) {
            ListNode* nextTemp = current->next;
            current->next = prev;
            prev = current;
            current = nextTemp;
        }
        return prev;
    }
    
    static void printList(ListNode* head) {
        ListNode* current = head;
        while (current != nullptr) {
            cout << current->val;
            if (current->next != nullptr) {
                cout << " -> ";
            }
            current = current->next;
        }
        cout << endl;
    }
};

int main() {
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);
    
    cout << "Original list:" << endl;
    Solution::printList(head);
    
    ListNode* reversedHead = Solution::reverseList(head);
    cout << "Reversed list:" << endl;
    Solution::printList(reversedHead);
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct ListNode {
    int val;
    struct ListNode* next;
} ListNode;

ListNode* createNode(int val) {
    ListNode* node = (ListNode*)malloc(sizeof(ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}

ListNode* reverseList(ListNode* head) {
    // Write your code here using dynamic memory allocation
    ListNode* prev = NULL;
    ListNode* current = head;
    while (current != NULL) {
        ListNode* nextTemp = current->next;
        current->next = prev;
        prev = current;
        current = nextTemp;
    }
    return prev;
}

void printList(ListNode* head) {
    ListNode* current = head;
    while (current != NULL) {
        printf("%d", current->val);
        if (current->next != NULL) {
            printf(" -> ");
        }
        current = current->next;
    }
    printf("\\n");
}

void freeList(ListNode* head) {
    ListNode* current = head;
    while (current != NULL) {
        ListNode* temp = current;
        current = current->next;
        free(temp);
    }
}

int main() {
    ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);
    
    printf("Original list:\\n");
    printList(head);
    
    ListNode* reversedHead = reverseList(head);
    printf("Reversed list:\\n");
    printList(reversedHead);
    
    freeList(reversedHead);
    return 0;
}`
    }
  }
]; 