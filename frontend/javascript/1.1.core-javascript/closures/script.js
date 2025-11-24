// ============================================================================
// CLOSURES IN JAVASCRIPT - COMPREHENSIVE GUIDE
// ============================================================================

// ============================================================================
// 1. WHAT ARE CLOSURES AND HOW THEY WORK
// ============================================================================

/*
DEFINITION:
A closure is a function that has access to variables in its outer (enclosing) 
lexical scope, even after the outer function has returned.

KEY CONCEPTS:
- Lexical Scoping: Functions are executed using the scope chain that was in 
  effect when they were DEFINED, not when they are CALLED
- Closure = Function + Lexical Environment
- The inner function "closes over" the variables from outer scope
*/

// Basic Example
function outerFunction() {
  const outerVariable = "I'm from outer scope";
  
  function innerFunction() {
    console.log(outerVariable); // Can access outerVariable
  }
  
  return innerFunction;
}

const closureExample = outerFunction();
closureExample(); // Output: "I'm from outer scope"
// Even though outerFunction has finished executing, innerFunction 
// still has access to outerVariable

console.log("\n--- Basic Closure Example ---");
closureExample();

// How Closures Work - Step by Step
function createCounter() {
  let count = 0; // This variable is "closed over"
  
  return function() {
    count++; // Inner function can access and modify count
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("\n--- How Closures Work ---");
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3
console.log(counter2()); // 1 (separate closure, separate count variable)
console.log(counter2()); // 2

// Multiple Nested Closures
function outermost() {
  const outerVar = "outer";
  
  function middle() {
    const middleVar = "middle";
    
    function innermost() {
      const innerVar = "inner";
      console.log(outerVar, middleVar, innerVar);
    }
    
    return innermost;
  }
  
  return middle;
}

console.log("\n--- Nested Closures ---");
const middleFn = outermost();
const innermostFn = middleFn();
innermostFn(); // Output: "outer middle inner"

// ============================================================================
// 2. PRACTICAL USE CASES
// ============================================================================

// Use Case 1: Data Privacy and Encapsulation
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited: $${amount}. New balance: $${balance}`;
      }
      return "Invalid amount";
    },
    
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrew: $${amount}. New balance: $${balance}`;
      }
      return "Invalid amount or insufficient funds";
    },
    
    getBalance() {
      return `Current balance: $${balance}`;
    }
  };
}

console.log("\n--- Use Case 1: Bank Account (Data Privacy) ---");
const myAccount = createBankAccount(1000);
console.log(myAccount.deposit(500));
console.log(myAccount.withdraw(200));
console.log(myAccount.getBalance());
// console.log(myAccount.balance); // undefined - balance is private!

// Use Case 2: Function Factories
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

console.log("\n--- Use Case 2: Function Factories ---");
const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));     // 10
console.log(triple(5));     // 15
console.log(quadruple(5));  // 20

// Use Case 3: Event Handlers with Private State
function createButton(buttonName) {
  let clickCount = 0;
  
  return {
    click() {
      clickCount++;
      console.log(`${buttonName} clicked ${clickCount} times`);
    },
    
    reset() {
      clickCount = 0;
      console.log(`${buttonName} click count reset`);
    }
  };
}

console.log("\n--- Use Case 3: Event Handlers ---");
const submitButton = createButton("Submit");
submitButton.click();
submitButton.click();
submitButton.click();
submitButton.reset();

// Use Case 4: Memoization (Caching)
function memoize(fn) {
  const cache = {}; // Closed over by returned function
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log("Returning from cache");
      return cache[key];
    }
    
    console.log("Calculating result");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function expensiveCalculation(n) {
  // Simulate expensive operation
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}

console.log("\n--- Use Case 4: Memoization ---");
const memoizedCalc = memoize(expensiveCalculation);
console.log(memoizedCalc(1000000)); // Calculates
console.log(memoizedCalc(1000000)); // Returns from cache
console.log(memoizedCalc(2000000)); // Calculates new value

// Use Case 5: Partial Application and Currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

console.log("\n--- Use Case 5: Currying ---");
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));        // 6
console.log(curriedAdd(1, 2)(3));        // 6
console.log(curriedAdd(1)(2, 3));        // 6

// Use Case 6: setTimeout with Closures
function delayedGreeting(name) {
  const greeting = `Hello, ${name}!`;
  
  setTimeout(function() {
    console.log(greeting); // Closure over greeting
  }, 1000);
}

console.log("\n--- Use Case 6: setTimeout ---");
console.log("Setting up delayed greeting...");
delayedGreeting("Alice");

// Use Case 7: Iterator Pattern
function createIterator(array) {
  let index = 0;
  
  return {
    next() {
      if (index < array.length) {
        return { value: array[index++], done: false };
      }
      return { value: undefined, done: true };
    },
    
    hasNext() {
      return index < array.length;
    },
    
    reset() {
      index = 0;
    }
  };
}

console.log("\n--- Use Case 7: Iterator Pattern ---");
const iterator = createIterator([1, 2, 3, 4, 5]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.hasNext()); // true

// ============================================================================
// 3. MODULE PATTERN USING CLOSURES
// ============================================================================

/*
The Module Pattern uses closures to create private and public members,
providing encapsulation and organization of code.
*/

// Basic Module Pattern
const Calculator = (function() {
  // Private variables and functions
  let result = 0;
  
  function log(operation, value) {
    console.log(`${operation}: ${value}, Result: ${result}`);
  }
  
  // Public API
  return {
    add(value) {
      result += value;
      log("Add", value);
      return this; // For method chaining
    },
    
    subtract(value) {
      result -= value;
      log("Subtract", value);
      return this;
    },
    
    multiply(value) {
      result *= value;
      log("Multiply", value);
      return this;
    },
    
    divide(value) {
      if (value !== 0) {
        result /= value;
        log("Divide", value);
      } else {
        console.log("Cannot divide by zero");
      }
      return this;
    },
    
    getResult() {
      return result;
    },
    
    reset() {
      result = 0;
      console.log("Calculator reset");
      return this;
    }
  };
})();

console.log("\n--- Module Pattern: Calculator ---");
Calculator.add(10).multiply(2).subtract(5);
console.log("Final result:", Calculator.getResult());
Calculator.reset();

// Revealing Module Pattern
const UserManager = (function() {
  // Private state
  const users = [];
  let nextId = 1;
  
  // Private functions
  function validateUser(user) {
    return user.name && user.name.trim() !== '' && user.email && user.email.includes('@');
  }
  
  function findUserIndex(id) {
    return users.findIndex(user => user.id === id);
  }
  
  // Public functions
  function addUser(name, email) {
    const user = { id: nextId++, name, email };
    
    if (validateUser(user)) {
      users.push(user);
      return { success: true, user };
    }
    
    return { success: false, error: "Invalid user data" };
  }
  
  function removeUser(id) {
    const index = findUserIndex(id);
    
    if (index !== -1) {
      const removed = users.splice(index, 1)[0];
      return { success: true, user: removed };
    }
    
    return { success: false, error: "User not found" };
  }
  
  function getUser(id) {
    return users.find(user => user.id === id) || null;
  }
  
  function getAllUsers() {
    return [...users]; // Return copy to prevent external modification
  }
  
  function getUserCount() {
    return users.length;
  }
  
  // Reveal public API
  return {
    addUser,
    removeUser,
    getUser,
    getAllUsers,
    getUserCount
  };
})();

console.log("\n--- Revealing Module Pattern: User Manager ---");
console.log(UserManager.addUser("Alice", "alice@example.com"));
console.log(UserManager.addUser("Bob", "bob@example.com"));
console.log(UserManager.addUser("Charlie", "charlie@example.com"));
console.log("Total users:", UserManager.getUserCount());
console.log("All users:", UserManager.getAllUsers());
console.log(UserManager.removeUser(2));
console.log("After removal:", UserManager.getAllUsers());

// Module with Configuration
const ConfigurableModule = (function(config) {
  // Private state initialized with config
  const settings = { ...config };
  let isInitialized = false;
  
  function init() {
    if (!isInitialized) {
      console.log("Module initialized with settings:", settings);
      isInitialized = true;
    }
  }
  
  return {
    getSetting(key) {
      return settings[key];
    },
    
    updateSetting(key, value) {
      if (key in settings) {
        settings[key] = value;
        return true;
      }
      return false;
    },
    
    initialize() {
      init();
    },
    
    getStatus() {
      return isInitialized ? "Initialized" : "Not initialized";
    }
  };
})({ theme: "dark", language: "en", timeout: 5000 });

console.log("\n--- Configurable Module ---");
ConfigurableModule.initialize();
console.log("Theme:", ConfigurableModule.getSetting("theme"));
ConfigurableModule.updateSetting("theme", "light");
console.log("Updated theme:", ConfigurableModule.getSetting("theme"));

// Singleton Module Pattern
const DatabaseConnection = (function() {
  let instance;
  
  function createConnection() {
    // Private variables
    const connectionId = Math.random().toString(36).substr(2, 9);
    let isConnected = false;
    
    // Private methods
    function log(message) {
      console.log(`[DB ${connectionId}] ${message}`);
    }
    
    // Public methods
    return {
      connect() {
        if (!isConnected) {
          isConnected = true;
          log("Connected to database");
        } else {
          log("Already connected");
        }
      },
      
      disconnect() {
        if (isConnected) {
          isConnected = false;
          log("Disconnected from database");
        } else {
          log("Not connected");
        }
      },
      
      query(sql) {
        if (isConnected) {
          log(`Executing query: ${sql}`);
          return { success: true, data: [] };
        }
        log("Cannot query: Not connected");
        return { success: false, error: "Not connected" };
      },
      
      getConnectionId() {
        return connectionId;
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createConnection();
      }
      return instance;
    }
  };
})();

console.log("\n--- Singleton Pattern ---");
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log("Same instance?", db1.getConnectionId() === db2.getConnectionId());
db1.connect();
db1.query("SELECT * FROM users");

// ============================================================================
// 4. PRIVATE VARIABLES
// ============================================================================

/*
Closures enable true private variables in JavaScript, which cannot be 
accessed or modified from outside the function scope.
*/

// Private Variables - Basic Example
function createPerson(name, age) {
  // Private variables
  let _name = name;
  let _age = age;
  let _secrets = [];
  
  // Public interface
  return {
    getName() {
      return _name;
    },
    
    setName(newName) {
      if (typeof newName === 'string' && newName.trim() !== '') {
        _name = newName;
        return true;
      }
      return false;
    },
    
    getAge() {
      return _age;
    },
    
    haveBirthday() {
      _age++;
      return `Happy birthday! Now ${_age} years old.`;
    },
    
    addSecret(secret) {
      _secrets.push(secret);
    },
    
    getSecretCount() {
      return _secrets.length;
    },
    
    // Secrets themselves remain private!
    // No way to access _secrets array directly
    
    toString() {
      return `${_name}, ${_age} years old`;
    }
  };
}

console.log("\n--- Private Variables: Person ---");
const person = createPerson("Alice", 25);
console.log(person.toString());
console.log(person.haveBirthday());
person.addSecret("Loves chocolate");
person.addSecret("Afraid of spiders");
console.log("Number of secrets:", person.getSecretCount());
// console.log(person._secrets); // undefined - truly private!
// console.log(person._name); // undefined - truly private!

// Private Variables with Validation
function createProduct(name, price) {
  // Private variables with validation
  let _name = name;
  let _price = price;
  let _discount = 0;
  
  // Private validation functions
  function isValidPrice(value) {
    return typeof value === 'number' && value >= 0;
  }
  
  function isValidDiscount(value) {
    return typeof value === 'number' && value >= 0 && value <= 100;
  }
  
  return {
    getName() {
      return _name;
    },
    
    getPrice() {
      return _price;
    },
    
    setPrice(newPrice) {
      if (isValidPrice(newPrice)) {
        _price = newPrice;
        return true;
      }
      console.log("Invalid price");
      return false;
    },
    
    getDiscount() {
      return _discount;
    },
    
    setDiscount(percentage) {
      if (isValidDiscount(percentage)) {
        _discount = percentage;
        return true;
      }
      console.log("Invalid discount (must be 0-100)");
      return false;
    },
    
    getFinalPrice() {
      return _price * (1 - _discount / 100);
    },
    
    getInfo() {
      return {
        name: _name,
        originalPrice: _price,
        discount: _discount,
        finalPrice: this.getFinalPrice()
      };
    }
  };
}

console.log("\n--- Private Variables with Validation ---");
const laptop = createProduct("Laptop", 1000);
console.log(laptop.getInfo());
laptop.setDiscount(20);
console.log("After discount:", laptop.getInfo());
laptop.setDiscount(150); // Invalid
laptop.setPrice(-500); // Invalid

// Private Static Variables (Shared across instances)
const Counter = (function() {
  // Private static variable (shared by all instances)
  let instanceCount = 0;
  
  return function(name) {
    // Private instance variable
    let count = 0;
    instanceCount++;
    
    const instanceId = instanceCount;
    
    return {
      increment() {
        count++;
        return count;
      },
      
      getCount() {
        return count;
      },
      
      getInstanceId() {
        return instanceId;
      },
      
      getInfo() {
        return `${name} (Instance #${instanceId}): count = ${count}`;
      }
    };
  };
})();

console.log("\n--- Private Static Variables ---");
const counterA = Counter("Counter A");
const counterB = Counter("Counter B");
const counterC = Counter("Counter C");

counterA.increment();
counterA.increment();
counterB.increment();

console.log(counterA.getInfo());
console.log(counterB.getInfo());
console.log(counterC.getInfo());

// WeakMap for Private Variables (Alternative Modern Approach)
const PrivateStore = (function() {
  const privateData = new WeakMap();
  
  return class {
    constructor(name, secret) {
      privateData.set(this, {
        name,
        secret,
        accessCount: 0
      });
    }
    
    getName() {
      const data = privateData.get(this);
      data.accessCount++;
      return data.name;
    }
    
    getSecret() {
      const data = privateData.get(this);
      data.accessCount++;
      return data.secret;
    }
    
    getAccessCount() {
      return privateData.get(this).accessCount;
    }
  };
})();

console.log("\n--- WeakMap for Private Variables ---");
const obj = new PrivateStore("MyObject", "SuperSecret");
console.log(obj.getName());
console.log(obj.getSecret());
console.log("Access count:", obj.getAccessCount());

// ============================================================================
// 5. MEMORY CONSIDERATIONS
// ============================================================================

/*
IMPORTANT: Closures can lead to memory issues if not used carefully.
Each closure maintains references to its outer scope variables, preventing
garbage collection.
*/

// Memory Issue 1: Unintentional Variable Retention
function createHeavyClosures() {
  const heavyData = new Array(1000000).fill('x'); // Large array
  
  // This closure keeps heavyData in memory even if we don't use it
  return function() {
    console.log("I don't even use heavyData!");
  };
}

console.log("\n--- Memory Issue 1: Unintentional Retention ---");
const closure1 = createHeavyClosures();
// heavyData is still in memory because the closure has access to it
closure1();

// Solution: Only close over what you need
function createLightClosure() {
  const heavyData = new Array(1000000).fill('x');
  const neededValue = heavyData.length; // Extract only what's needed
  
  // Now heavyData can be garbage collected
  return function() {
    console.log("Array length was:", neededValue);
  };
}

console.log("\n--- Solution: Only Close Over What You Need ---");
const closure2 = createLightClosure();
closure2();

// Memory Issue 2: Closures in Loops (Classic Problem)
console.log("\n--- Memory Issue 2: Closures in Loops (Problem) ---");
function createFunctionsWrong() {
  const functions = [];
  
  for (var i = 0; i < 5; i++) {
    functions.push(function() {
      console.log(i); // All closures reference the same 'i'
    });
  }
  
  return functions;
}

const wrongFunctions = createFunctionsWrong();
console.log("Expected 0-4, but got:");
wrongFunctions.forEach(fn => fn()); // All print 5!

// Solution 1: Use let (block scope)
console.log("\n--- Solution 1: Use 'let' ---");
function createFunctionsRight1() {
  const functions = [];
  
  for (let i = 0; i < 5; i++) { // 'let' creates new binding each iteration
    functions.push(function() {
      console.log(i);
    });
  }
  
  return functions;
}

const rightFunctions1 = createFunctionsRight1();
rightFunctions1.forEach(fn => fn()); // Prints 0, 1, 2, 3, 4

// Solution 2: IIFE (Immediately Invoked Function Expression)
console.log("\n--- Solution 2: IIFE ---");
function createFunctionsRight2() {
  const functions = [];
  
  for (var i = 0; i < 5; i++) {
    functions.push((function(index) {
      return function() {
        console.log(index);
      };
    })(i)); // Pass i as argument, creating new scope
  }
  
  return functions;
}

const rightFunctions2 = createFunctionsRight2();
rightFunctions2.forEach(fn => fn());

// Memory Issue 3: Event Listeners and Closures
console.log("\n--- Memory Issue 3: Event Listeners ---");

// Problematic: Creates memory leak if not cleaned up
function attachEventListenerBad() {
  const largeData = new Array(100000).fill('data');
  
  // In browser: document.getElementById('button').addEventListener('click', function() {
  //   console.log(largeData.length); // Keeps largeData in memory
  // });
  
  console.log("Event listener attached (with large data in closure)");
  // If element is removed without removing listener, memory leak!
}

// Better: Clean up or avoid closing over large data
function attachEventListenerGood() {
  const largeData = new Array(100000).fill('data');
  const dataLength = largeData.length; // Extract what you need
  
  function handleClick() {
    console.log(dataLength); // Only closes over small value
  }
  
  // In browser:
  // const button = document.getElementById('button');
  // button.addEventListener('click', handleClick);
  
  // Return cleanup function
  return function cleanup() {
    // button.removeEventListener('click', handleClick);
    console.log("Event listener removed");
  };
}

const cleanup = attachEventListenerGood();
// Later: cleanup();

// Memory Issue 4: Circular References
console.log("\n--- Memory Issue 4: Circular References ---");

function createCircularReference() {
  const obj1 = {};
  const obj2 = {};
  
  obj1.ref = obj2;
  obj2.ref = obj1; // Circular reference
  
  // Closure that references both
  return function() {
    console.log(obj1, obj2);
  };
}

// Modern JavaScript engines handle this, but be aware
const circularClosure = createCircularReference();

// Memory Issue 5: Accumulating Closures
console.log("\n--- Memory Issue 5: Accumulating Closures ---");

// Problematic: Each call creates new closure with reference to array
function createAccumulatingProblem() {
  const items = [];
  
  return {
    add(item) {
      items.push(item);
      
      // Each timeout creates a closure over items array
      setTimeout(function() {
        console.log("Items count:", items.length);
      }, 1000);
    }
  };
}

// If add() is called many times, many closures accumulate
const accumulator = createAccumulatingProblem();
// accumulator.add("item1");
// accumulator.add("item2");
// ... many more calls = many closures in memory

// Memory Profiling Example
console.log("\n--- Memory Profiling Tips ---");

function demonstrateMemoryUsage() {
  // Check memory before (in Node.js)
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const before = process.memoryUsage().heapUsed;
    
    // Create many closures
    const closures = [];
    for (let i = 0; i < 10000; i++) {
      const data = new Array(1000).fill(i);
      closures.push(function() {
        return data[0];
      });
    }
    
    const after = process.memoryUsage().heapUsed;
    const diff = ((after - before) / 1024 / 1024).toFixed(2);
    
    console.log(`Memory used by closures: ~${diff} MB`);
    
    // Keep reference to prevent garbage collection
    return closures;
  } else {
    console.log("Memory profiling not available in this environment");
  }
}

demonstrateMemoryUsage();

// Best Practices for Memory Management
console.log("\n--- Best Practices ---");

// 1. Nullify references when done
function goodPractice1() {
  let largeObject = { data: new Array(100000) };
  
  function useData() {
    console.log(largeObject.data.length);
  }
  
  useData();
  largeObject = null; // Allow garbage collection
}

// 2. Use WeakMap for private data (automatically garbage collected)
const privateDataStore = new WeakMap();

function goodPractice2(obj) {
  privateDataStore.set(obj, { secret: "data" });
  // When obj is garbage collected, the WeakMap entry is too
}

// 3. Return cleanup functions
function goodPractice3() {
  const resources = [];
  
  function allocate() {
    resources.push(new Array(1000));
  }
  
  function cleanup() {
    resources.length = 0; // Clear array
    console.log("Resources cleaned up");
  }
  
  return { allocate, cleanup };
}

const manager = goodPractice3();
manager.allocate();
manager.cleanup(); // Explicitly clean up

// 4. Be careful with timers
function goodPractice4() {
  const data = { value: "important" };
  
  const timerId = setTimeout(function() {
    console.log(data.value);
  }, 5000);
  
  // Return way to cancel
  return function cancel() {
    clearTimeout(timerId);
    console.log("Timer cancelled, closure can be garbage collected");
  };
}

// 5. Avoid unnecessary closures
function goodPractice5() {
  const data = [1, 2, 3, 4, 5];
  
  // Bad: Creates closure for each element
  // data.forEach(function(item) {
  //   console.log(item);
  // });
  
  // Better: Use arrow function (still creates closure but more efficient)
  data.forEach(item => console.log(item));
  
  // Best for simple operations: Use built-in methods
  console.log(data.join(', '));
}

// ============================================================================
// SUMMARY AND KEY TAKEAWAYS
// ============================================================================

console.log("\n=== KEY TAKEAWAYS ===");
console.log(`
1. CLOSURES:
   - Function + Lexical Environment
   - Inner function retains access to outer scope
   - Created every time a function is created

2. PRACTICAL USES:
   - Data privacy and encapsulation
   - Function factories
   - Memoization and caching
   - Event handlers
   - Partial application and currying

3. MODULE PATTERN:
   - Encapsulates private and public members
   - IIFE creates single instance
   - Revealing module pattern exposes selected functions

4. PRIVATE VARIABLES:
   - True privacy through closures
   - No direct access from outside
   - Can include validation logic

5. MEMORY CONSIDERATIONS:
   - Closures prevent garbage collection of referenced variables
   - Be mindful of what you close over
   - Clean up event listeners and timers
   - Use WeakMap for automatically managed private data
   - Profile memory usage in production
   - Nullify references when done
   - Return cleanup functions for resource management

REMEMBER: Closures are powerful but use them wisely!
`);

