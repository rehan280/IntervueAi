// C++-specific coding interview problems

export const cppProblems = [
  {
    id: '19',
    title: 'C++ STL Algorithms',
    difficulty: 'medium',
    category: 'cpp',
    description: 'Use STL algorithms to sort a vector and find the median.',
    examples: [
      {
        input: 'nums = [3, 1, 4, 1, 5, 9, 2, 6]',
        output: '3.5',
        explanation: 'Sorted: [1,1,2,3,4,5,6,9], median = (3+4)/2 = 3.5'
      }
    ],
    constraints: [
      '1 <= len(nums) <= 10^5',
      'Use STL algorithms'
    ],
    starterCode: {
      python: `def find_median(nums):
    # Write your code here
    nums.sort()
    n = len(nums)
    if n % 2 == 0:
        return (nums[n//2 - 1] + nums[n//2]) / 2
    else:
        return nums[n//2]

# Test the function
nums = [3, 1, 4, 1, 5, 9, 2, 6]
result = find_median(nums)
print(f"Input: nums = {nums}")
print(f"Output: {result}")`,
      java: `import java.util.*;

public class Solution {
    public double findMedian(int[] nums) {
        // Write your code here
        Arrays.sort(nums);
        int n = nums.length;
        if (n % 2 == 0) {
            return (nums[n/2 - 1] + nums[n/2]) / 2.0;
        } else {
            return nums[n/2];
        }
    }
    
    public static void main(String[] args) {
        int[] nums = {3, 1, 4, 1, 5, 9, 2, 6};
        Solution solution = new Solution();
        double result = solution.findMedian(nums);
        System.out.println("Input: nums = [" + java.util.Arrays.toString(nums) + "]");
        System.out.println("Output: " + result);
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    double findMedian(vector<int>& nums) {
        // Write your code here using STL algorithms
        sort(nums.begin(), nums.end());
        int n = nums.size();
        if (n % 2 == 0) {
            return (nums[n/2 - 1] + nums[n/2]) / 2.0;
        } else {
            return nums[n/2];
        }
    }
};

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6};
    Solution solution;
    double result = solution.findMedian(nums);
    
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

int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

double findMedian(int* nums, int numsSize) {
    // Write your code here
    qsort(nums, numsSize, sizeof(int), compare);
    
    if (numsSize % 2 == 0) {
        return (nums[numsSize/2 - 1] + nums[numsSize/2]) / 2.0;
    } else {
        return nums[numsSize/2];
    }
}

int main() {
    int nums[] = {3, 1, 4, 1, 5, 9, 2, 6};
    int numsSize = 8;
    double result = findMedian(nums, numsSize);
    
    printf("Input: nums = [");
    for (int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if (i < numsSize - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("Output: %.1f\\n", result);
    
    return 0;
}`
    }
  },
  {
    id: '20',
    title: 'C++ Smart Pointers',
    difficulty: 'medium',
    category: 'cpp',
    description: 'Create a class that uses smart pointers to manage memory automatically.',
    examples: [
      {
        input: 'Create and use smart pointer',
        output: 'Memory managed automatically',
        explanation: 'Smart pointer automatically deallocates memory'
      }
    ],
    constraints: [
      'Use unique_ptr or shared_ptr',
      'Demonstrate RAII'
    ],
    starterCode: {
      python: `class SmartResource:
    def __init__(self, data):
        self.data = data
        print(f"Resource created with data: {data}")
    
    def __del__(self):
        print(f"Resource destroyed with data: {self.data}")
    
    def get_data(self):
        return self.data

# Test smart resource management
def test_smart_pointer():
    # Write your code here
    resource = SmartResource("Hello World")
    print(f"Data: {resource.get_data()}")
    # Resource will be automatically destroyed when out of scope

test_smart_pointer()
print("Function completed")`,
      java: `public class SmartResource {
    private String data;
    
    public SmartResource(String data) {
        this.data = data;
        System.out.println("Resource created with data: " + data);
    }
    
    public String getData() {
        return data;
    }
    
    protected void finalize() {
        System.out.println("Resource destroyed with data: " + data);
    }
    
    public static void testSmartPointer() {
        // Write your code here
        SmartResource resource = new SmartResource("Hello World");
        System.out.println("Data: " + resource.getData());
        // Resource will be garbage collected
    }
    
    public static void main(String[] args) {
        testSmartPointer();
        System.gc(); // Request garbage collection
        System.out.println("Function completed");
    }
}`,
      cpp: `#include <iostream>
#include <memory>
using namespace std;

class SmartResource {
private:
    string data;
    
public:
    SmartResource(const string& d) : data(d) {
        cout << "Resource created with data: " << data << endl;
    }
    
    ~SmartResource() {
        cout << "Resource destroyed with data: " << data << endl;
    }
    
    string getData() const {
        return data;
    }
};

void testSmartPointer() {
    // Write your code here using smart pointers
    unique_ptr<SmartResource> resource = make_unique<SmartResource>("Hello World");
    cout << "Data: " << resource->getData() << endl;
    // Resource automatically destroyed when unique_ptr goes out of scope
}

int main() {
    testSmartPointer();
    cout << "Function completed" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char data[50];
} SmartResource;

SmartResource* createSmartResource(const char* data) {
    SmartResource* resource = (SmartResource*)malloc(sizeof(SmartResource));
    strcpy(resource->data, data);
    printf("Resource created with data: %s\\n", data);
    return resource;
}

void destroySmartResource(SmartResource* resource) {
    printf("Resource destroyed with data: %s\\n", resource->data);
    free(resource);
}

void testSmartPointer() {
    // Write your code here
    SmartResource* resource = createSmartResource("Hello World");
    printf("Data: %s\\n", resource->data);
    destroySmartResource(resource);
}

int main() {
    testSmartPointer();
    printf("Function completed\\n");
    return 0;
}`
    }
  },
  {
    id: '21',
    title: 'C++ Templates',
    difficulty: 'medium',
    category: 'cpp',
    description: 'Create a template function that finds the maximum of two values.',
    examples: [
      {
        input: 'a = 5, b = 10',
        output: '10',
        explanation: 'Maximum of 5 and 10 is 10'
      }
    ],
    constraints: [
      'Use template function',
      'Work with different data types'
    ],
    starterCode: {
      python: `def find_max(a, b):
    # Write your code here
    return max(a, b)

# Test the function
print(f"Max of 5 and 10: {find_max(5, 10)}")
print(f"Max of 3.14 and 2.71: {find_max(3.14, 2.71)}")
print(f"Max of 'hello' and 'world': {find_max('hello', 'world')}")`,
      java: `public class Solution {
    // Write your code here using generics
    public static <T extends Comparable<T>> T findMax(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }
    
    public static void main(String[] args) {
        System.out.println("Max of 5 and 10: " + findMax(5, 10));
        System.out.println("Max of 3.14 and 2.71: " + findMax(3.14, 2.71));
        System.out.println("Max of 'hello' and 'world': " + findMax("hello", "world"));
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

// Write your code here using templates
template<typename T>
T findMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << "Max of 5 and 10: " << findMax(5, 10) << endl;
    cout << "Max of 3.14 and 2.71: " << findMax(3.14, 2.71) << endl;
    cout << "Max of 'hello' and 'world': " << findMax(string("hello"), string("world")) << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <string.h>

// C doesn't have templates, but we can use macros
#define FIND_MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    printf("Max of 5 and 10: %d\\n", FIND_MAX(5, 10));
    printf("Max of 3.14 and 2.71: %.2f\\n", FIND_MAX(3.14, 2.71));
    
    // For strings, we need a separate function
    const char* str1 = "hello";
    const char* str2 = "world";
    const char* maxStr = (strcmp(str1, str2) > 0) ? str1 : str2;
    printf("Max of 'hello' and 'world': %s\\n", maxStr);
    
    return 0;
}`
    }
  },
  {
    id: '22',
    title: 'C++ Move Semantics',
    difficulty: 'hard',
    category: 'cpp',
    description: 'Implement a class with move constructor and move assignment operator.',
    examples: [
      {
        input: 'Create and move object',
        output: 'Move constructor and assignment used',
        explanation: 'Demonstrates move semantics'
      }
    ],
    constraints: [
      'Use move constructor',
      'Use move assignment operator'
    ],
    starterCode: {
      python: `class MoveableObject:
    def __init__(self, data):
        self.data = data
        print(f"Constructor called with data: {data}")
    
    def __del__(self):
        print(f"Destructor called for data: {self.data}")
    
    def move_from(self, other):
        # Write your code here
        self.data = other.data
        other.data = None
        print(f"Moved data: {self.data}")

# Test move semantics
obj1 = MoveableObject("Original")
obj2 = MoveableObject("Target")
obj2.move_from(obj1)
print(f"obj1.data: {obj1.data}")
print(f"obj2.data: {obj2.data}")`,
      java: `public class MoveableObject {
    private String data;
    
    public MoveableObject(String data) {
        this.data = data;
        System.out.println("Constructor called with data: " + data);
    }
    
    public void moveFrom(MoveableObject other) {
        // Write your code here
        this.data = other.data;
        other.data = null;
        System.out.println("Moved data: " + this.data);
    }
    
    public String getData() {
        return data;
    }
    
    public static void main(String[] args) {
        MoveableObject obj1 = new MoveableObject("Original");
        MoveableObject obj2 = new MoveableObject("Target");
        obj2.moveFrom(obj1);
        System.out.println("obj1.data: " + obj1.getData());
        System.out.println("obj2.data: " + obj2.getData());
    }
}`,
      cpp: `#include <iostream>
#include <string>
using namespace std;

class MoveableObject {
private:
    string* data;
    
public:
    // Constructor
    MoveableObject(const string& d) {
        data = new string(d);
        cout << "Constructor called with data: " << *data << endl;
    }
    
    // Move constructor
    MoveableObject(MoveableObject&& other) noexcept {
        // Write your code here
        data = other.data;
        other.data = nullptr;
        cout << "Move constructor called" << endl;
    }
    
    // Move assignment operator
    MoveableObject& operator=(MoveableObject&& other) noexcept {
        // Write your code here
        if (this != &other) {
            delete data;
            data = other.data;
            other.data = nullptr;
            cout << "Move assignment called" << endl;
        }
        return *this;
    }
    
    // Destructor
    ~MoveableObject() {
        if (data) {
            cout << "Destructor called for data: " << *data << endl;
            delete data;
        }
    }
    
    string getData() const {
        return data ? *data : "null";
    }
};

int main() {
    MoveableObject obj1("Original");
    MoveableObject obj2 = move(obj1);  // Move constructor
    MoveableObject obj3("Another");
    obj3 = move(obj2);  // Move assignment
    
    cout << "obj1.data: " << obj1.getData() << endl;
    cout << "obj2.data: " << obj2.getData() << endl;
    cout << "obj3.data: " << obj3.getData() << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char* data;
} MoveableObject;

MoveableObject* createMoveableObject(const char* data) {
    MoveableObject* obj = (MoveableObject*)malloc(sizeof(MoveableObject));
    obj->data = strdup(data);
    printf("Constructor called with data: %s\\n", data);
    return obj;
}

void moveFrom(MoveableObject* dest, MoveableObject* src) {
    // Write your code here
    free(dest->data);
    dest->data = src->data;
    src->data = NULL;
    printf("Moved data: %s\\n", dest->data);
}

void destroyMoveableObject(MoveableObject* obj) {
    if (obj->data) {
        printf("Destructor called for data: %s\\n", obj->data);
        free(obj->data);
    }
    free(obj);
}

int main() {
    MoveableObject* obj1 = createMoveableObject("Original");
    MoveableObject* obj2 = createMoveableObject("Target");
    moveFrom(obj2, obj1);
    
    printf("obj1.data: %s\\n", obj1->data ? obj1->data : "null");
    printf("obj2.data: %s\\n", obj2->data ? obj2->data : "null");
    
    destroyMoveableObject(obj1);
    destroyMoveableObject(obj2);
    
    return 0;
}`
    }
  },
  {
    id: '23',
    title: 'C++ Lambda Expressions',
    difficulty: 'medium',
    category: 'cpp',
    description: 'Use lambda expressions to sort a vector of custom objects.',
    examples: [
      {
        input: 'persons = [{"Alice", 25}, {"Bob", 30}, {"Charlie", 20}]',
        output: '[{"Charlie", 20}, {"Alice", 25}, {"Bob", 30}]',
        explanation: 'Sorted by age using lambda'
      }
    ],
    constraints: [
      'Use lambda expression',
      'Sort by custom criteria'
    ],
    starterCode: {
      python: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __str__(self):
        return f'{{"{self.name}", {self.age}}}'

def sort_persons(persons):
    # Write your code here using lambda
    return sorted(persons, key=lambda p: p.age)

# Test the function
persons = [Person("Alice", 25), Person("Bob", 30), Person("Charlie", 20)]
sorted_persons = sort_persons(persons)
print("Input: persons = [", end="")
for i, p in enumerate(persons):
    print(p, end=", " if i < len(persons)-1 else "")
print("]")
print("Output: [", end="")
for i, p in enumerate(sorted_persons):
    print(p, end=", " if i < len(sorted_persons)-1 else "")
print("]")`,
      java: `import java.util.*;

class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    @Override
    public String toString() {
        return "{\\"" + name + "\\", " + age + "}";
    }
}

public class Solution {
    public static List<Person> sortPersons(List<Person> persons) {
        // Write your code here using lambda
        persons.sort((p1, p2) -> Integer.compare(p1.age, p2.age));
        return persons;
    }
    
    public static void main(String[] args) {
        List<Person> persons = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 20)
        );
        
        List<Person> sortedPersons = sortPersons(persons);
        
        System.out.print("Input: persons = [");
        for (int i = 0; i < persons.size(); i++) {
            System.out.print(persons.get(i));
            if (i < persons.size() - 1) System.out.print(", ");
        }
        System.out.println("]");
        
        System.out.print("Output: [");
        for (int i = 0; i < sortedPersons.size(); i++) {
            System.out.print(sortedPersons.get(i));
            if (i < sortedPersons.size() - 1) System.out.print(", ");
        }
        System.out.println("]");
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

struct Person {
    string name;
    int age;
    
    Person(const string& n, int a) : name(n), age(a) {}
    
    friend ostream& operator<<(ostream& os, const Person& p) {
        return os << "{\\"" << p.name << "\\", " << p.age << "}";
    }
};

vector<Person> sortPersons(vector<Person> persons) {
    // Write your code here using lambda expression
    sort(persons.begin(), persons.end(), 
         [](const Person& a, const Person& b) {
             return a.age < b.age;
         });
    return persons;
}

int main() {
    vector<Person> persons = {
        Person("Alice", 25),
        Person("Bob", 30),
        Person("Charlie", 20)
    };
    
    vector<Person> sortedPersons = sortPersons(persons);
    
    cout << "Input: persons = [";
    for (size_t i = 0; i < persons.size(); i++) {
        cout << persons[i];
        if (i < persons.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    cout << "Output: [";
    for (size_t i = 0; i < sortedPersons.size(); i++) {
        cout << sortedPersons[i];
        if (i < sortedPersons.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
} Person;

int comparePersons(const void* a, const void* b) {
    // Write your code here
    return ((Person*)a)->age - ((Person*)b)->age;
}

Person* sortPersons(Person* persons, int count) {
    qsort(persons, count, sizeof(Person), comparePersons);
    return persons;
}

void printPerson(const Person* p) {
    printf("{\\"%s\\", %d}", p->name, p->age);
}

int main() {
    Person persons[] = {
        {"Alice", 25},
        {"Bob", 30},
        {"Charlie", 20}
    };
    int count = 3;
    
    Person* sortedPersons = sortPersons(persons, count);
    
    printf("Input: persons = [");
    for (int i = 0; i < count; i++) {
        printPerson(&persons[i]);
        if (i < count - 1) printf(", ");
    }
    printf("]\\n");
    
    printf("Output: [");
    for (int i = 0; i < count; i++) {
        printPerson(&sortedPersons[i]);
        if (i < count - 1) printf(", ");
    }
    printf("]\\n");
    
    return 0;
}`
    }
  },
  {
    id: '24',
    title: 'C++ RAII Pattern',
    difficulty: 'hard',
    category: 'cpp',
    description: 'Implement a RAII (Resource Acquisition Is Initialization) pattern for file handling.',
    examples: [
      {
        input: 'Open and write to file',
        output: 'File automatically closed',
        explanation: 'RAII ensures resource cleanup'
      }
    ],
    constraints: [
      'Use RAII pattern',
      'Automatic resource management'
    ],
    starterCode: {
      python: `class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        print(f"File {self.filename} opened")
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
            print(f"File {self.filename} closed")

# Test RAII pattern
with FileManager("test.txt", "w") as f:
    f.write("Hello World")
    print("Data written to file")
print("File automatically closed")`,
      java: `import java.io.*;

public class FileManager implements AutoCloseable {
    private String filename;
    private FileWriter writer;
    
    public FileManager(String filename, String mode) throws IOException {
        this.filename = filename;
        if (mode.equals("w")) {
            this.writer = new FileWriter(filename);
        }
    }
    
    public void write(String data) throws IOException {
        if (writer != null) {
            writer.write(data);
        }
    }
    
    @Override
    public void close() throws IOException {
        if (writer != null) {
            writer.close();
            System.out.println("File " + filename + " closed");
        }
    }
    
    public static void main(String[] args) {
        try (FileManager fm = new FileManager("test.txt", "w")) {
            fm.write("Hello World");
            System.out.println("Data written to file");
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("File automatically closed");
    }
}`,
      cpp: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

class FileManager {
private:
    string filename;
    fstream file;
    
public:
    FileManager(const string& fname, const string& mode) : filename(fname) {
        // Write your code here using RAII
        if (mode == "w") {
            file.open(filename, ios::out);
        } else if (mode == "r") {
            file.open(filename, ios::in);
        }
        cout << "File " << filename << " opened" << endl;
    }
    
    void write(const string& data) {
        if (file.is_open()) {
            file << data;
        }
    }
    
    ~FileManager() {
        if (file.is_open()) {
            file.close();
            cout << "File " << filename << " closed" << endl;
        }
    }
};

int main() {
    {
        FileManager fm("test.txt", "w");
        fm.write("Hello World");
        cout << "Data written to file" << endl;
    } // File automatically closed when object goes out of scope
    
    cout << "File automatically closed" << endl;
    return 0;
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char* filename;
    FILE* file;
} FileManager;

FileManager* createFileManager(const char* filename, const char* mode) {
    FileManager* fm = (FileManager*)malloc(sizeof(FileManager));
    fm->filename = strdup(filename);
    fm->file = fopen(filename, mode);
    printf("File %s opened\\n", filename);
    return fm;
}

void writeToFile(FileManager* fm, const char* data) {
    if (fm->file) {
        fprintf(fm->file, "%s", data);
    }
}

void destroyFileManager(FileManager* fm) {
    if (fm->file) {
        fclose(fm->file);
        printf("File %s closed\\n", fm->filename);
    }
    free(fm->filename);
    free(fm);
}

int main() {
    FileManager* fm = createFileManager("test.txt", "w");
    writeToFile(fm, "Hello World");
    printf("Data written to file\\n");
    destroyFileManager(fm);
    
    printf("File automatically closed\\n");
    return 0;
}`
    }
  }
]; 