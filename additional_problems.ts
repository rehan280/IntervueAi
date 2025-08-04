// Additional coding interview problems for Java, Python, C++, and C

export const additionalProblems = [
  // Python-Specific Questions (6 more)
  {
    id: '7',
    title: 'Python Lambda Functions',
    difficulty: 'easy',
    category: 'python',
    description: 'Create a function that uses lambda to filter even numbers from a list and square them.',
    examples: [
      {
        input: 'nums = [1, 2, 3, 4, 5, 6]',
        output: '[4, 16, 36]',
        explanation: 'Even numbers [2,4,6] squared gives [4,16,36]'
      }
    ],
    constraints: [
      '1 <= len(nums) <= 100',
      'Use lambda function'
    ],
    starterCode: {
      python: `def filter_and_square(nums):
    # Write your code here using lambda
    even_nums = list(filter(lambda x: x % 2 == 0, nums))
    return list(map(lambda x: x**2, even_nums))

# Test the function
nums = [1, 2, 3, 4, 5, 6]
result = filter_and_square(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> filterAndSquare(vector<int>& nums) {
        // Write your code here
        vector<int> result;
        for (int num : nums) {
            if (num % 2 == 0) {
                result.push_back(num * num);
            }
        }
        return result;
    }
};

int main() {
    vector<int> nums = {1, 2, 3, 4, 5, 6};
    Solution solution;
    vector<int> result = solution.filterAndSquare(nums);
    
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

int* filterAndSquare(int* nums, int numsSize, int* returnSize) {
    // Write your code here
    int* result = (int*)malloc(numsSize * sizeof(int));
    int count = 0;
    
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] % 2 == 0) {
            result[count] = nums[i] * nums[i];
            count++;
        }
    }
    
    *returnSize = count;
    return result;
}

int main() {
    int nums[] = {1, 2, 3, 4, 5, 6};
    int numsSize = 6;
    int returnSize;
    int* result = filterAndSquare(nums, numsSize, &returnSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
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
    id: '8',
    title: 'Python Generators',
    difficulty: 'medium',
    category: 'python',
    description: 'Create a generator function that yields Fibonacci numbers up to n.',
    examples: [
      {
        input: 'n = 10',
        output: '[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]',
        explanation: 'First 10 Fibonacci numbers'
      }
    ],
    constraints: [
      '1 <= n <= 50',
      'Use generator function'
    ],
    starterCode: {
      python: `def fibonacci_generator(n):
    # Write your code here using generator
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

# Test the function
n = 10
result = list(fibonacci_generator(n))
print(f"Input: n = {n}")
print(f"Output: {result}")`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> fibonacci(int n) {
        // Write your code here
        vector<int> result;
        if (n >= 1) result.push_back(0);
        if (n >= 2) result.push_back(1);
        
        for (int i = 2; i < n; i++) {
            result.push_back(result[i-1] + result[i-2]);
        }
        return result;
    }
};

int main() {
    int n = 10;
    Solution solution;
    vector<int> result = solution.fibonacci(n);
    
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

int* fibonacci(int n, int* returnSize) {
    // Write your code here
    int* result = (int*)malloc(n * sizeof(int));
    *returnSize = n;
    
    if (n >= 1) result[0] = 0;
    if (n >= 2) result[1] = 1;
    
    for (int i = 2; i < n; i++) {
        result[i] = result[i-1] + result[i-2];
    }
    
    return result;
}

int main() {
    int n = 10;
    int returnSize;
    int* result = fibonacci(n, &returnSize);
    
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
    id: '9',
    title: 'Python Decorators',
    difficulty: 'medium',
    category: 'python',
    description: 'Create a decorator that measures the execution time of a function.',
    examples: [
      {
        input: 'function that sleeps for 1 second',
        output: 'Execution time: ~1.0 seconds',
        explanation: 'Decorator measures and prints execution time'
      }
    ],
    constraints: [
      'Use decorator pattern',
      'Import time module'
    ],
    starterCode: {
      python: `import time

def timer_decorator(func):
    # Write your code here
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Execution time: {end_time - start_time:.4f} seconds")
        return result
    return wrapper

@timer_decorator
def slow_function():
    time.sleep(1)
    return "Function completed"

# Test the function
result = slow_function()
print(f"Result: {result}")`,
      cpp: `#include <iostream>
#include <chrono>
#include <thread>
using namespace std;

class Timer {
public:
    Timer() : start_(chrono::high_resolution_clock::now()) {}
    
    ~Timer() {
        auto end = chrono::high_resolution_clock::now();
        auto duration = chrono::duration_cast<chrono::milliseconds>(end - start_);
        cout << "Execution time: " << duration.count() << " milliseconds" << endl;
    }
    
private:
    chrono::high_resolution_clock::time_point start_;
};

void slowFunction() {
    Timer timer;
    this_thread::sleep_for(chrono::seconds(1));
    cout << "Function completed" << endl;
}

int main() {
    slowFunction();
    return 0;
}`,
      c: `#include <stdio.h>
#include <time.h>
#include <unistd.h>

void slowFunction() {
    clock_t start = clock();
    
    sleep(1); // Sleep for 1 second
    printf("Function completed\\n");
    
    clock_t end = clock();
    double time_spent = (double)(end - start) / CLOCKS_PER_SEC;
    printf("Execution time: %.4f seconds\\n", time_spent);
}

int main() {
    slowFunction();
    return 0;
}`
    }
  },
  {
    id: '10',
    title: 'Python Context Managers',
    difficulty: 'medium',
    category: 'python',
    description: 'Create a context manager that automatically handles file operations.',
    examples: [
      {
        input: 'Write "Hello World" to file',
        output: 'File written and closed automatically',
        explanation: 'Context manager handles file opening and closing'
      }
    ],
    constraints: [
      'Use context manager',
      'Handle file operations safely'
    ],
    starterCode: {
      python: `class FileManager:
    def __init__(self, filename, mode):
        # Write your code here
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# Test the context manager
with FileManager("test.txt", "w") as f:
    f.write("Hello World")
    print("File written successfully")

print("File closed automatically")`,
      cpp: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

class FileManager {
private:
    string filename;
    string mode;
    fstream file;
    
public:
    FileManager(const string& fname, const string& m) : filename(fname), mode(m) {}
    
    void open() {
        if (mode == "w") {
            file.open(filename, ios::out);
        } else if (mode == "r") {
            file.open(filename, ios::in);
        }
    }
    
    void close() {
        if (file.is_open()) {
            file.close();
        }
    }
    
    fstream& getFile() { return file; }
    
    ~FileManager() {
        close();
    }
};

int main() {
    FileManager fm("test.txt", "w");
    fm.open();
    fm.getFile() << "Hello World";
    fm.close();
    
    cout << "File written and closed" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char* filename;
    char* mode;
    FILE* file;
} FileManager;

FileManager* createFileManager(const char* filename, const char* mode) {
    FileManager* fm = (FileManager*)malloc(sizeof(FileManager));
    fm->filename = (char*)filename;
    fm->mode = (char*)mode;
    fm->file = NULL;
    return fm;
}

void openFile(FileManager* fm) {
    fm->file = fopen(fm->filename, fm->mode);
}

void closeFile(FileManager* fm) {
    if (fm->file) {
        fclose(fm->file);
        fm->file = NULL;
    }
}

void destroyFileManager(FileManager* fm) {
    closeFile(fm);
    free(fm);
}

int main() {
    FileManager* fm = createFileManager("test.txt", "w");
    openFile(fm);
    fprintf(fm->file, "Hello World");
    closeFile(fm);
    destroyFileManager(fm);
    
    printf("File written and closed\\n");
    return 0;
}`
    }
  },
  {
    id: '11',
    title: 'Python Metaclasses',
    difficulty: 'hard',
    category: 'python',
    description: 'Create a metaclass that automatically adds a method to all classes.',
    examples: [
      {
        input: 'Create a class with metaclass',
        output: 'Class has new method added by metaclass',
        explanation: 'Metaclass automatically adds method to class'
      }
    ],
    constraints: [
      'Use metaclass',
      'Add method dynamically'
    ],
    starterCode: {
      python: `class AutoMethodMeta(type):
    def __new__(cls, name, bases, attrs):
        # Write your code here
        attrs['new_method'] = lambda self: f"New method from {name}"
        return super().__new__(cls, name, bases, attrs)

class MyClass(metaclass=AutoMethodMeta):
    def __init__(self):
        self.name = "Test"
    
    def original_method(self):
        return "Original method"

# Test the class
obj = MyClass()
print(f"Original: {obj.original_method()}")
print(f"New: {obj.new_method()}")`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

// C++ doesn't have metaclasses, but we can simulate with templates
template<typename T>
class AutoMethod {
public:
    string newMethod() {
        return "New method from " + string(typeid(T).name());
    }
};

class MyClass : public AutoMethod<MyClass> {
public:
    string name;
    
    MyClass() : name("Test") {}
    
    string originalMethod() {
        return "Original method";
    }
};

int main() {
    MyClass obj;
    cout << "Original: " << obj.originalMethod() << endl;
    cout << "New: " << obj.newMethod() << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

// C doesn't have classes, but we can simulate with structs and function pointers
typedef struct {
    char name[50];
    char* (*originalMethod)(void);
    char* (*newMethod)(void);
} MyClass;

char* originalMethod() {
    return "Original method";
}

char* newMethod() {
    return "New method from MyClass";
}

MyClass* createMyClass() {
    MyClass* obj = (MyClass*)malloc(sizeof(MyClass));
    strcpy(obj->name, "Test");
    obj->originalMethod = originalMethod;
    obj->newMethod = newMethod;
    return obj;
}

void destroyMyClass(MyClass* obj) {
    free(obj);
}

int main() {
    MyClass* obj = createMyClass();
    printf("Original: %s\\n", obj->originalMethod());
    printf("New: %s\\n", obj->newMethod());
    destroyMyClass(obj);
    return 0;
}`
    }
  },
  {
    id: '12',
    title: 'Python Async/Await',
    difficulty: 'hard',
    category: 'python',
    description: 'Create an async function that fetches data from multiple URLs concurrently.',
    examples: [
      {
        input: 'urls = ["http://example1.com", "http://example2.com"]',
        output: 'Data fetched from all URLs concurrently',
        explanation: 'Async function processes multiple URLs in parallel'
      }
    ],
    constraints: [
      'Use async/await',
      'Use aiohttp or similar'
    ],
    starterCode: {
      python: `import asyncio
import aiohttp

async def fetch_url(session, url):
    # Write your code here
    async with session.get(url) as response:
        return await response.text()

async def fetch_all_urls(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

# Test the async function
async def main():
    urls = ["http://httpbin.org/delay/1", "http://httpbin.org/delay/1"]
    print("Fetching URLs concurrently...")
    results = await fetch_all_urls(urls)
    print(f"Fetched {len(results)} URLs")

# Run the async function
asyncio.run(main())`,
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <thread>
#include <future>
using namespace std;

string fetchUrl(const string& url) {
    // Simulate HTTP request
    this_thread::sleep_for(chrono::seconds(1));
    return "Data from " + url;
}

vector<string> fetchAllUrls(const vector<string>& urls) {
    vector<future<string>> futures;
    
    for (const string& url : urls) {
        futures.push_back(async(launch::async, fetchUrl, url));
    }
    
    vector<string> results;
    for (auto& future : futures) {
        results.push_back(future.get());
    }
    
    return results;
}

int main() {
    vector<string> urls = {"http://example1.com", "http://example2.com"};
    cout << "Fetching URLs concurrently..." << endl;
    
    vector<string> results = fetchAllUrls(urls);
    cout << "Fetched " << results.size() << " URLs" << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <unistd.h>

typedef struct {
    char* url;
    char* result;
} UrlTask;

void* fetchUrl(void* arg) {
    UrlTask* task = (UrlTask*)arg;
    sleep(1); // Simulate HTTP request
    
    task->result = malloc(100);
    sprintf(task->result, "Data from %s", task->url);
    return NULL;
}

char** fetchAllUrls(char** urls, int count) {
    pthread_t* threads = malloc(count * sizeof(pthread_t));
    UrlTask* tasks = malloc(count * sizeof(UrlTask));
    char** results = malloc(count * sizeof(char*));
    
    for (int i = 0; i < count; i++) {
        tasks[i].url = urls[i];
        tasks[i].result = NULL;
        pthread_create(&threads[i], NULL, fetchUrl, &tasks[i]);
    }
    
    for (int i = 0; i < count; i++) {
        pthread_join(threads[i], NULL);
        results[i] = tasks[i].result;
    }
    
    free(threads);
    free(tasks);
    return results;
}

int main() {
    char* urls[] = {"http://example1.com", "http://example2.com"};
    int count = 2;
    
    printf("Fetching URLs concurrently...\\n");
    char** results = fetchAllUrls(urls, count);
    printf("Fetched %d URLs\\n", count);
    
    for (int i = 0; i < count; i++) {
        free(results[i]);
    }
    free(results);
    
    return 0;
}`
    }
  }
]; 