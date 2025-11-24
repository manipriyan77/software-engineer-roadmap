// ============================================================================
// THE 'this' KEYWORD IN JAVASCRIPT - COMPREHENSIVE GUIDE
// ============================================================================

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * CORE DEFINITION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 'this' is a special keyword in JavaScript that refers to the EXECUTION CONTEXT
 * of a function. It's a reference to an object that is determined by HOW a 
 * function is called, not WHERE it's defined.
 * 
 * Think of 'this' as a pronoun in natural language - it refers to different 
 * things depending on the context of the conversation.
 * 
 * MENTAL MODEL:
 * Think of 'this' as a MOVING SPOTLIGHT that shines on different objects 
 * depending on how a function is called:
 * 
 * 1. new Constructor()     → Spotlight on the newly created object
 * 2. func.call(obj)        → You manually point the spotlight at 'obj'
 * 3. obj.method()          → Spotlight automatically points at 'obj'
 * 4. func()                → Spotlight points at nothing (undefined) or global
 * 5. Arrow () => {}        → Spotlight inherited from parent (can't be moved)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 4 MAIN BINDING RULES (in order of precedence - highest to lowest)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. NEW BINDING (Highest Priority)
 *    - When: Function called with 'new' keyword
 *    - 'this' refers to: The newly created object
 *    - Example: const obj = new Constructor()
 * 
 * 2. EXPLICIT BINDING (Second Priority)
 *    - When: Using call(), apply(), or bind()
 *    - 'this' refers to: The object you explicitly specify
 *    - Example: func.call(obj), func.apply(obj), func.bind(obj)
 * 
 * 3. IMPLICIT BINDING (Third Priority)
 *    - When: Function called as a method of an object
 *    - 'this' refers to: The object that owns the method (left of the dot)
 *    - Example: obj.method()
 * 
 * 4. DEFAULT BINDING (Lowest Priority)
 *    - When: None of the above rules apply
 *    - 'this' refers to: undefined (strict mode) or global object (non-strict)
 *    - Example: func()
 * 
 * SPECIAL CASE: ARROW FUNCTIONS
 *    - Arrow functions DON'T have their own 'this'
 *    - They inherit 'this' from the enclosing lexical scope
 *    - Cannot be changed with call/apply/bind
 *    - Cannot be used with 'new'
 */

// ============================================================================
// 1. IMPLICIT BINDING (Third Priority)
// ============================================================================
/*
 * DEFINITION:
 * When a function is called as a method of an object, 'this' refers to the 
 * object that owns the method (the object to the left of the dot).
 * 
 * PATTERN: obj.method()
 * RESULT: 'this' inside method = obj
 * 
 * KEY CONCEPT:
 * The call-site (where the function is called) determines 'this', not where
 * the function is defined. Look to the left of the dot at the call-site.
 * 
 * COMMON PITFALL:
 * When you extract a method from an object and call it directly, you lose
 * the implicit binding because there's no object to the left of the dot.
 */

console.log('\n=== IMPLICIT BINDING ===\n');

const person = {
  name: 'Alice',
  age: 30,
  greet: function() {
    console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
    // 'this' refers to the 'person' object
  },
  
  getDetails: function() {
    return {
      name: this.name,
      age: this.age,
      context: 'person object'
    };
  }
};

person.greet(); // Output: Hello, I'm Alice and I'm 30 years old.
console.log(person.getDetails());

// Nested objects - 'this' refers to the immediate parent
const company = {
  name: 'TechCorp',
  employee: {
    name: 'Bob',
    showName: function() {
      console.log(`Employee name: ${this.name}`);
      // 'this' refers to 'employee', not 'company'
    }
  }
};

company.employee.showName(); // Output: Employee name: Bob

// ─────────────────────────────────────────────────────────────────────────────
// CRITICAL PITFALL: Losing Implicit Binding
// ─────────────────────────────────────────────────────────────────────────────
/*
 * When you extract a method and store it in a variable, you lose the implicit
 * binding. The function is no longer called as a method of an object.
 * 
 * WHY? Because at the call-site, there's no object to the left of the dot.
 * The function is called directly: greetFunction() instead of person.greet()
 */
const greetFunction = person.greet;
// greetFunction(); // 'this' is undefined in strict mode, or global object in non-strict
// This happens because the function is no longer called as a method

// SOLUTION: Use bind() to permanently attach 'this'
const boundGreetFunction = person.greet.bind(person);
// boundGreetFunction(); // Now 'this' correctly refers to person

// ============================================================================
// 2. EXPLICIT BINDING (Second Priority) - call, apply, bind
// ============================================================================
/*
 * DEFINITION:
 * Manually and explicitly set what 'this' should refer to using built-in
 * JavaScript methods: call(), apply(), or bind().
 * 
 * This binding has HIGHER priority than implicit binding, meaning you can
 * override the implicit binding by explicitly specifying 'this'.
 * 
 * THREE METHODS:
 * 
 * 1. call(thisArg, arg1, arg2, ...)
 *    - Invokes the function IMMEDIATELY
 *    - Arguments passed INDIVIDUALLY
 *    - Use when: You know the exact number of arguments
 * 
 * 2. apply(thisArg, [arg1, arg2, ...])
 *    - Invokes the function IMMEDIATELY
 *    - Arguments passed as an ARRAY
 *    - Use when: You have arguments in an array or don't know the count
 * 
 * 3. bind(thisArg, arg1, arg2, ...)
 *    - Does NOT invoke immediately
 *    - Returns a NEW function with 'this' PERMANENTLY bound
 *    - The binding CANNOT be changed later (even with call/apply)
 *    - Use when: You need a function with fixed 'this' for later use
 */

console.log('\n=== EXPLICIT BINDING ===\n');

// ─────────────────────────────────────────────────────────────────────────────
// 2a. call() - Invoke Immediately with Individual Arguments
// ─────────────────────────────────────────────────────────────────────────────
/*
 * SYNTAX: func.call(thisArg, arg1, arg2, ...)
 * 
 * PARAMETERS:
 * - thisArg: The object that 'this' should refer to inside the function
 * - arg1, arg2, ...: Arguments passed to the function individually
 * 
 * BEHAVIOR:
 * - Invokes the function IMMEDIATELY
 * - Sets 'this' to thisArg for the duration of that function call
 * 
 * USE CASES:
 * - Method borrowing (using a method from one object on another)
 * - Function invocation with specific context
 * - Inheritance patterns
 */

function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const user1 = { name: 'Charlie' };
const user2 = { name: 'Diana' };

introduce.call(user1, 'Hello', '!'); // Output: Hello, I'm Charlie!
introduce.call(user2, 'Hi', '.'); // Output: Hi, I'm Diana.

// Practical example: Borrowing methods
const numbers1 = {
  values: [1, 2, 3],
  sum: function() {
    return this.values.reduce((acc, val) => acc + val, 0);
  }
};

const numbers2 = { values: [10, 20, 30] };
console.log(numbers1.sum.call(numbers2)); // Output: 60 (borrows sum method)

// ─────────────────────────────────────────────────────────────────────────────
// 2b. apply() - Invoke Immediately with Array of Arguments
// ─────────────────────────────────────────────────────────────────────────────
/*
 * SYNTAX: func.apply(thisArg, [arg1, arg2, ...])
 * 
 * PARAMETERS:
 * - thisArg: The object that 'this' should refer to inside the function
 * - [arg1, arg2, ...]: Arguments passed as an ARRAY
 * 
 * BEHAVIOR:
 * - Invokes the function IMMEDIATELY
 * - Sets 'this' to thisArg for the duration of that function call
 * - Spreads the array elements as individual arguments to the function
 * 
 * DIFFERENCE FROM call():
 * - call() takes arguments individually: func.call(obj, 1, 2, 3)
 * - apply() takes arguments as array: func.apply(obj, [1, 2, 3])
 * 
 * USE CASES:
 * - When you have arguments in an array
 * - Math operations (Math.max.apply(null, arrayOfNumbers))
 * - Variable number of arguments
 * 
 * NOTE: With modern ES6, you can often use spread operator instead:
 * func.call(obj, ...args) is equivalent to func.apply(obj, args)
 */

function calculateTotal(tax, discount) {
  const subtotal = this.price * this.quantity;
  return subtotal + tax - discount;
}

const order = { price: 50, quantity: 2 };
console.log(calculateTotal.apply(order, [10, 5])); // Output: 105

// Practical example: Finding max in array
const nums = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, nums);
console.log(`Max value: ${max}`); // Output: Max value: 7

// ─────────────────────────────────────────────────────────────────────────────
// 2c. bind() - Create New Function with Permanent 'this' Binding
// ─────────────────────────────────────────────────────────────────────────────
/*
 * SYNTAX: const boundFunc = func.bind(thisArg, arg1, arg2, ...)
 * 
 * PARAMETERS:
 * - thisArg: The object that 'this' should PERMANENTLY refer to
 * - arg1, arg2, ...: Optional arguments to pre-fill (partial application)
 * 
 * BEHAVIOR:
 * - Does NOT invoke the function immediately
 * - Returns a NEW function with 'this' PERMANENTLY bound to thisArg
 * - The bound 'this' CANNOT be changed later (even with call/apply/bind)
 * - Creates a "hard binding"
 * 
 * KEY DIFFERENCE FROM call/apply:
 * - call/apply: Invoke immediately, 'this' is set for that one call
 * - bind: Returns new function, 'this' is permanently set for all future calls
 * 
 * USE CASES:
 * - Event handlers (preserving context in callbacks)
 * - setTimeout/setInterval callbacks
 * - Passing methods as callbacks
 * - Partial application (pre-filling arguments)
 * - Creating functions with fixed context
 * 
 * IMPORTANT:
 * Once a function is bound, its 'this' cannot be changed:
 * const bound = func.bind(obj1);
 * bound.call(obj2); // 'this' is still obj1, NOT obj2
 */

const person2 = {
  name: 'Eve',
  greet: function(greeting) {
    console.log(`${greeting}, I'm ${this.name}`);
  }
};

const boundGreet = person2.greet.bind(person2, 'Hey');
boundGreet(); // Output: Hey, I'm Eve

// Even if we try to change 'this', it won't work
const anotherPerson = { name: 'Frank' };
boundGreet.call(anotherPerson); // Still outputs: Hey, I'm Eve

// Practical example: Event handlers (we'll see more later)
const button = {
  label: 'Click me',
  click: function() {
    console.log(`Button "${this.label}" was clicked`);
  }
};

// Without bind, 'this' would be lost in setTimeout
setTimeout(button.click.bind(button), 1000);

// ─────────────────────────────────────────────────────────────────────────────
// Partial Application with bind()
// ─────────────────────────────────────────────────────────────────────────────
/*
 * PARTIAL APPLICATION:
 * Pre-filling some arguments of a function to create a new specialized function.
 * 
 * bind() can be used for partial application by passing arguments after thisArg.
 * These arguments are "baked in" to the new function.
 * 
 * PATTERN: const specialized = func.bind(thisArg, arg1, arg2, ...)
 * When you call specialized(arg3), it's like calling func(arg1, arg2, arg3)
 */
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // First argument is always 2
console.log(double(5)); // Output: 10 (multiply(2, 5))
console.log(double(10)); // Output: 20 (multiply(2, 10))

// We use 'null' for thisArg because multiply doesn't use 'this'

// ============================================================================
// 3. NEW BINDING (Highest Priority)
// ============================================================================
/*
 * DEFINITION:
 * When a function is invoked with the 'new' keyword, JavaScript creates a
 * brand new object and sets 'this' to refer to that new object.
 * 
 * PATTERN: const instance = new Constructor()
 * RESULT: 'this' inside Constructor = newly created object
 * 
 * WHAT HAPPENS WHEN YOU USE 'new':
 * ────────────────────────────────────────────────────────────────────────
 * 1. A new empty object is created: {}
 * 2. The new object's [[Prototype]] is linked to Constructor.prototype
 * 3. 'this' is bound to the new object
 * 4. The constructor function body is executed (properties added to 'this')
 * 5. The new object is automatically returned (unless constructor explicitly
 *    returns a different object)
 * 
 * KEY CONCEPTS:
 * - Constructor functions are regular functions called with 'new'
 * - By convention, constructor names start with capital letter
 * - Each call to 'new Constructor()' creates a separate instance
 * - Each instance has its own 'this' context
 * 
 * PRIORITY:
 * 'new' binding has the HIGHEST priority - it overrides all other bindings
 * (except you can't use 'new' with bound functions in some cases)
 */

console.log('\n=== NEW BINDING ===\n');

function Car(brand, model, year) {
  // 'this' refers to the newly created object
  this.brand = brand;
  this.model = model;
  this.year = year;
  
  this.getInfo = function() {
    return `${this.year} ${this.brand} ${this.model}`;
  };
}

const car1 = new Car('Toyota', 'Camry', 2020);
const car2 = new Car('Honda', 'Civic', 2021);

console.log(car1.getInfo()); // Output: 2020 Toyota Camry
console.log(car2.getInfo()); // Output: 2021 Honda Civic

// ─────────────────────────────────────────────────────────────────────────────
// Understanding the 'new' Operator Step-by-Step
// ─────────────────────────────────────────────────────────────────────────────
/*
 * When you write: const car1 = new Car('Toyota', 'Camry', 2020)
 * 
 * JavaScript does this behind the scenes:
 * 
 * Step 1: Create a new empty object
 *         const newObj = {}
 * 
 * Step 2: Set the prototype chain
 *         Object.setPrototypeOf(newObj, Car.prototype)
 *         This allows the new object to inherit from Car.prototype
 * 
 * Step 3: Bind 'this' to the new object
 *         'this' inside Car now refers to newObj
 * 
 * Step 4: Execute the constructor function
 *         Car.call(newObj, 'Toyota', 'Camry', 2020)
 *         This adds properties to newObj
 * 
 * Step 5: Return the new object
 *         If the constructor doesn't explicitly return an object, newObj is returned
 *         If the constructor returns a primitive, it's ignored and newObj is returned
 *         If the constructor returns an object, that object is returned instead
 */

function Person(name) {
  this.name = name;
  // Implicit return: return this;
}

const p1 = new Person('Grace');
console.log(p1.name); // Output: Grace

// ─────────────────────────────────────────────────────────────────────────────
// Special Case: Explicit Return in Constructor
// ─────────────────────────────────────────────────────────────────────────────
/*
 * RULE: If a constructor explicitly returns an OBJECT, that object is returned
 * instead of the newly created 'this' object.
 * 
 * If it returns a PRIMITIVE (string, number, boolean, etc.), the return is
 * ignored and the new object is returned as normal.
 * 
 * This is rarely used in practice but important to understand.
 */
function WeirdConstructor(name) {
  this.name = name;
  return { different: 'object' }; // This is what gets returned
}

const weird = new WeirdConstructor('Henry');
console.log(weird); // Output: { different: 'object' }
// The 'this' object with name='Henry' is discarded

// Returning a primitive is ignored:
function NormalConstructor(name) {
  this.name = name;
  return 'ignored'; // Primitives are ignored
}

const normal = new NormalConstructor('Test');
// console.log(normal); // Output: { name: 'Test' } - the new object is returned

// ============================================================================
// 4. ARROW FUNCTIONS AND 'this' (Special Case - Lexical Binding)
// ============================================================================
/*
 * DEFINITION:
 * Arrow functions DON'T have their own 'this' binding. Instead, they inherit
 * 'this' from the enclosing lexical scope (where they are DEFINED, not where
 * they are CALLED).
 * 
 * This is called "LEXICAL THIS" or "LEXICAL SCOPING"
 * 
 * KEY DIFFERENCES FROM REGULAR FUNCTIONS:
 * ────────────────────────────────────────────────────────────────────────
 * Regular Function:                Arrow Function:
 * - Has its own 'this'            - NO own 'this' (inherits from parent)
 * - 'this' determined by call     - 'this' determined by definition location
 * - Can use with 'new'            - CANNOT use with 'new'
 * - Has 'arguments' object        - NO 'arguments' object (inherits parent's)
 * - 'this' can be changed         - 'this' CANNOT be changed (even with call/apply/bind)
 * 
 * MENTAL MODEL:
 * Think of arrow functions as "transparent" to 'this' - they don't create
 * a new 'this' context, they just use whatever 'this' is in their surrounding
 * code.
 * 
 * WHEN TO USE ARROW FUNCTIONS:
 * ✓ Callbacks (setTimeout, setInterval, array methods)
 * ✓ When you want to preserve the outer 'this'
 * ✓ Short, simple functions
 * 
 * WHEN NOT TO USE ARROW FUNCTIONS:
 * ✗ Object methods (if you need 'this' to refer to the object)
 * ✗ Constructor functions
 * ✗ Event handlers (if you need 'this' to refer to the element)
 * ✗ When you need the 'arguments' object
 */

console.log('\n=== ARROW FUNCTIONS ===\n');

// ─────────────────────────────────────────────────────────────────────────────
// Regular Function vs Arrow Function - The Critical Difference
// ─────────────────────────────────────────────────────────────────────────────
/*
 * REGULAR FUNCTION:
 * - Creates its own 'this' binding
 * - 'this' is determined by HOW the function is called
 * - When called as obj.method(), 'this' = obj
 * 
 * ARROW FUNCTION:
 * - Does NOT create its own 'this' binding
 * - 'this' is inherited from WHERE the function is defined
 * - Even when called as obj.method(), 'this' is NOT obj
 * - 'this' is captured from the surrounding scope at definition time
 */
const obj1 = {
  name: 'Regular',
  regularFunc: function() {
    console.log(`Regular function: ${this.name}`);
    // 'this' = obj1 (because called as obj1.regularFunc())
  },
  arrowFunc: () => {
    console.log(`Arrow function: ${this.name}`);
    // 'this' is NOT obj1!
    // It's inherited from the scope where obj1 is defined (global/module scope)
  }
};

obj1.regularFunc(); // Output: Regular function: Regular
obj1.arrowFunc(); // Output: Arrow function: undefined (or global name if exists)

/*
 * WHY? The arrow function was defined in the global/module scope, so it
 * inherits 'this' from there, NOT from obj1.
 */

// ─────────────────────────────────────────────────────────────────────────────
// THE CALLBACK PROBLEM - Why Arrow Functions Were Invented
// ─────────────────────────────────────────────────────────────────────────────
/*
 * THE PROBLEM:
 * When you pass a regular function as a callback, it loses its 'this' context
 * because it's called as a simple function (default binding), not as a method.
 * 
 * EXAMPLE: setTimeout(function() { this.count++ }, 100)
 * - The function is called by setTimeout, not by the counter object
 * - There's no object to the left of the dot
 * - 'this' becomes undefined (strict) or global (non-strict)
 * 
 * THREE SOLUTIONS TO THE CALLBACK PROBLEM:
 */
const counter = {
  count: 0,
  
  // ❌ PROBLEM: Using regular function - 'this' binding is lost
  incrementWithRegular: function() {
    setTimeout(function() {
      // 'this' is undefined/global here, not 'counter'
      // this.count++; // Would fail - cannot read property 'count' of undefined
      console.log('Regular function in setTimeout - this is lost');
    }, 100);
  },
  
  // ✅ SOLUTION 1: Arrow function (BEST - Modern approach)
  // Arrow function inherits 'this' from incrementWithArrow's scope
  incrementWithArrow: function() {
    // At this point, 'this' = counter (implicit binding)
    setTimeout(() => {
      // Arrow function inherits 'this' from parent scope
      // So 'this' here also = counter
      this.count++; // Works perfectly!
      console.log(`Count with arrow: ${this.count}`);
    }, 100);
  },
  
  // ✅ SOLUTION 2: Store 'this' in a variable (OLD approach - pre-ES6)
  // Common pattern: const self = this, const that = this, const _this = this
  incrementWithSelf: function() {
    const self = this; // Store reference to 'counter' in closure
    setTimeout(function() {
      // Regular function has its own 'this' (undefined/global)
      // But we can access 'self' from the closure
      self.count++; // Works because 'self' is captured in closure
      console.log(`Count with self: ${self.count}`);
    }, 100);
  },
  
  // ✅ SOLUTION 3: Use bind() to create a bound function
  incrementWithBind: function() {
    setTimeout(function() {
      this.count++; // 'this' is bound to counter
      console.log(`Count with bind: ${this.count}`);
    }.bind(this), 100); // .bind(this) creates new function with 'this' = counter
  }
};

counter.incrementWithArrow();
counter.incrementWithSelf();
counter.incrementWithBind();

// Arrow functions in array methods
const team = {
  name: 'Developers',
  members: ['Alice', 'Bob', 'Charlie'],
  
  showMembers: function() {
    // Arrow function inherits 'this' from showMembers
    this.members.forEach(member => {
      console.log(`${member} is in team ${this.name}`);
    });
  },
  
  showMembersRegular: function() {
    // Regular function loses 'this' context
    this.members.forEach(function(member) {
      // console.log(`${member} is in team ${this.name}`); // Would fail
      console.log(`${member} is in team (this is undefined here)`);
    });
  }
};

team.showMembers();
team.showMembersRegular();

// ─────────────────────────────────────────────────────────────────────────────
// Arrow Function Limitations
// ─────────────────────────────────────────────────────────────────────────────

// LIMITATION 1: Arrow functions CANNOT be used as constructors
/*
 * WHY? Because arrow functions don't have their own 'this' binding.
 * The 'new' operator needs to create a new object and bind 'this' to it,
 * but arrow functions can't have their 'this' changed.
 */
const ArrowConstructor = (name) => {
  this.name = name;
};

// const instance = new ArrowConstructor('Test'); 
// TypeError: ArrowConstructor is not a constructor

// LIMITATION 2: Arrow functions don't have their own 'arguments' object
/*
 * Regular functions have an 'arguments' object containing all passed arguments.
 * Arrow functions DON'T have their own 'arguments' - they inherit it from
 * the parent scope (if the parent is a regular function).
 * 
 * MODERN ALTERNATIVE: Use rest parameters (...args) instead
 */
function regularWithArgs() {
  console.log('Regular function arguments:', arguments);
  // arguments = [1, 2, 3] (array-like object)
  
  const arrowInside = () => {
    console.log('Arrow function arguments:', arguments); 
    // Inherits 'arguments' from parent (regularWithArgs)
    // Also [1, 2, 3]
  };
  
  arrowInside();
}

regularWithArgs(1, 2, 3);

// Modern approach with rest parameters (works with arrow functions):
const arrowWithRest = (...args) => {
  console.log('Arrow with rest params:', args); // [1, 2, 3]
};
// arrowWithRest(1, 2, 3);

// ============================================================================
// 5. 'this' IN DIFFERENT CONTEXTS
// ============================================================================
/*
 * The value of 'this' varies depending on the context where code is executed.
 * Let's explore 'this' in different environments and situations.
 */

console.log('\n=== DIFFERENT CONTEXTS ===\n');

// ─────────────────────────────────────────────────────────────────────────────
// 5a. GLOBAL CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
/*
 * DEFINITION:
 * In the global context (outside any function), 'this' refers to the global
 * object.
 * 
 * ENVIRONMENT DIFFERENCES:
 * - Browsers: 'this' = window object
 * - Node.js (module): 'this' = {} (empty object, NOT global)
 * - Node.js (REPL): 'this' = global object
 * - Web Workers: 'this' = self
 * 
 * MODERN APPROACH:
 * Use 'globalThis' for cross-environment compatibility (ES2020)
 * - Works in browsers, Node.js, Web Workers, etc.
 * - Always refers to the global object regardless of environment
 */
console.log('--- Global Context ---');

// In browsers: 'this' refers to 'window'
// In Node.js: 'this' refers to 'global' (or 'globalThis')
console.log('Global this:', this); // In browser: Window, In Node: {}

/*
 * STRICT MODE vs NON-STRICT MODE:
 * 
 * In strict mode ('use strict'):
 * - 'this' in a regular function call is undefined
 * - Prevents accidental global variable creation
 * - More predictable and safer behavior
 * 
 * In non-strict mode (sloppy mode):
 * - 'this' in a regular function call is the global object
 * - Can lead to bugs (accidentally modifying global variables)
 * - Legacy behavior for backwards compatibility
 */
function globalFunction() {
  'use strict';
  console.log('Strict mode this:', this); // undefined
}

function nonStrictFunction() {
  console.log('Non-strict mode this:', this); // global object (window/global)
}

globalFunction();
// nonStrictFunction();

// ─────────────────────────────────────────────────────────────────────────────
// 5b. FUNCTION CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
/*
 * DEFINITION:
 * When a function is called as a standalone function (not as a method, not
 * with 'new', not with call/apply/bind), 'this' follows the default binding.
 * 
 * RULE:
 * - Strict mode: 'this' = undefined
 * - Non-strict mode: 'this' = global object
 * 
 * This is the LOWEST priority binding rule.
 */
console.log('\n--- Function Context ---');

// Simple function call
function simpleFunction() {
  console.log('Simple function this:', this);
  // Strict mode: undefined
  // Non-strict: global object
}

simpleFunction(); // No object to the left of the dot = default binding

// ─────────────────────────────────────────────────────────────────────────────
// Function as a Callback - Context Loss Problem
// ─────────────────────────────────────────────────────────────────────────────
/*
 * THE PROBLEM:
 * When you pass a method as a callback, it loses its object context.
 * 
 * WHY?
 * - myObject.getValue extracts the function from the object
 * - When executeCallback calls it as callback(), there's no object
 * - It's a simple function call, so default binding applies
 * - 'this' becomes undefined (strict) or global (non-strict)
 * 
 * SOLUTION:
 * Use bind() to create a version of the function with 'this' permanently
 * bound to the object.
 */
const myObject = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};

function executeCallback(callback) {
  console.log('Callback result:', callback()); // 'this' is lost
}

// executeCallback(myObject.getValue); // Would return undefined
executeCallback(myObject.getValue.bind(myObject)); // Returns 42

// ─────────────────────────────────────────────────────────────────────────────
// 5c. METHOD CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
/*
 * DEFINITION:
 * When a function is called as a method of an object (obj.method()), 'this'
 * refers to the object (implicit binding).
 * 
 * METHOD CHAINING PATTERN:
 * By returning 'this' from a method, you can chain multiple method calls.
 * Each method operates on the same object and returns it for the next call.
 * 
 * PATTERN:
 * obj.method1().method2().method3()
 * 
 * This works because:
 * 1. obj.method1() returns 'this' (which is obj)
 * 2. The result is obj, so obj.method2() is called
 * 3. obj.method2() returns 'this' (which is obj)
 * 4. And so on...
 */
console.log('\n--- Method Context ---');

const calculator = {
  value: 0,
  
  add: function(num) {
    this.value += num;
    return this; // Return the object for chaining
  },
  
  subtract: function(num) {
    this.value -= num;
    return this; // Return the object for chaining
  },
  
  getResult: function() {
    return this.value;
  }
};

// Method chaining works because each method returns 'this'
const result = calculator.add(10).add(5).subtract(3).getResult();
console.log('Calculator result:', result); // 12
// Breakdown: calculator.add(10) returns calculator
//           calculator.add(5) returns calculator
//           calculator.subtract(3) returns calculator
//           calculator.getResult() returns 12

// Computed property names
const methodName = 'dynamicMethod';
const objWithDynamic = {
  [methodName]: function() {
    console.log('Dynamic method this:', this);
  }
};

objWithDynamic.dynamicMethod();

// ─────────────────────────────────────────────────────────────────────────────
// 5d. EVENT HANDLER CONTEXT (Browser Environment)
// ─────────────────────────────────────────────────────────────────────────────
/*
 * DEFINITION:
 * In browser event handlers, 'this' behavior depends on how the handler is
 * attached and what type of function is used.
 * 
 * TRADITIONAL EVENT HANDLERS:
 * When you use addEventListener with a regular function, 'this' refers to
 * the DOM element that triggered the event.
 * 
 * Example: button.addEventListener('click', function() { ... })
 * Inside the function, 'this' = the button element
 * 
 * ARROW FUNCTION HANDLERS:
 * Arrow functions inherit 'this' from the enclosing scope, NOT the element.
 * 
 * Example: button.addEventListener('click', () => { ... })
 * Inside the arrow function, 'this' = whatever it was in the outer scope
 * 
 * COMMON PATTERN:
 * When you need to access both the element AND your object's data:
 * 1. Use a regular function and bind it: handler.bind(this)
 * 2. Or use an arrow function (which captures the outer 'this')
 * 3. Or use event.currentTarget to access the element explicitly
 */
console.log('\n--- Event Handler Context ---');

// Simulating DOM event handlers (in browser environment)
const buttonSimulation = {
  element: 'button',
  
  // Traditional event handler
  handleClickTraditional: function() {
    console.log('Traditional handler this:', this);
    // In real DOM: 'this' would be the button element
  },
  
  // Arrow function handler
  handleClickArrow: () => {
    console.log('Arrow handler this:', this);
    // 'this' is inherited from outer scope, NOT the element
  },
  
  // Best practice: Use regular function and bind if needed
  init: function() {
    // In real code: element.addEventListener('click', this.handleClickTraditional.bind(this));
    console.log('Would bind handler to maintain context');
  }
};

buttonSimulation.handleClickTraditional();
buttonSimulation.handleClickArrow();

// ─────────────────────────────────────────────────────────────────────────────
// Real-World Pattern: Event Handlers in Classes
// ─────────────────────────────────────────────────────────────────────────────
/*
 * THE PROBLEM:
 * When you pass a class method as an event handler, it loses its 'this' context.
 * 
 * TWO SOLUTIONS:
 * 
 * 1. BIND IN CONSTRUCTOR (Traditional approach):
 *    - Explicitly bind the method to the instance in the constructor
 *    - Creates one bound function per instance
 *    - Ensures 'this' always refers to the instance
 * 
 * 2. ARROW FUNCTION AS CLASS FIELD (Modern approach):
 *    - Use class field syntax with arrow function
 *    - Arrow function inherits 'this' from the class instance
 *    - Automatically bound, no need for manual binding
 *    - Each instance gets its own copy of the function
 * 
 * WHEN TO USE WHICH:
 * - Arrow function fields: Simpler, modern, recommended for new code
 * - Bind in constructor: Better for older browsers, explicit control
 */
class Component {
  constructor(name) {
    this.name = name;
    this.count = 0;
    
    // SOLUTION 1: Bind methods in constructor for consistent 'this'
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.count++;
    console.log(`${this.name} clicked ${this.count} times`);
  }
  
  // SOLUTION 2: Arrow function as class field (Modern ES2022+)
  // Arrow function inherits 'this' from the instance
  handleClickArrow = () => {
    this.count++;
    console.log(`${this.name} clicked ${this.count} times`);
  }
}

const component = new Component('MyButton');
component.handleClick();
component.handleClick();

// Simulating event listener
const simulatedListener = component.handleClick;
simulatedListener(); // Still works because we bound it in constructor

// ─────────────────────────────────────────────────────────────────────────────
// 5e. CLASS CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
/*
 * DEFINITION:
 * In ES6 classes, 'this' refers to the instance of the class.
 * 
 * TYPES OF METHODS AND 'this':
 * 
 * 1. CONSTRUCTOR:
 *    - 'this' refers to the newly created instance
 *    - Similar to constructor functions with 'new'
 * 
 * 2. INSTANCE METHODS:
 *    - 'this' refers to the instance that called the method
 *    - Uses implicit binding (instance.method())
 * 
 * 3. STATIC METHODS:
 *    - 'this' refers to the CLASS itself, NOT an instance
 *    - Called on the class: Animal.info()
 *    - Used for utility functions related to the class
 * 
 * 4. GETTERS/SETTERS:
 *    - 'this' refers to the instance
 *    - Accessed like properties but execute functions
 * 
 * IMPORTANT:
 * Class methods are NOT automatically bound. If you extract a method and
 * call it separately, you'll lose the 'this' context (same as regular objects).
 */
console.log('\n--- Class Context ---');

class Animal {
  constructor(name, species) {
    // 'this' = the new instance being created
    this.name = name;
    this.species = species;
  }
  
  // Regular instance method - 'this' = the instance
  speak() {
    console.log(`${this.name} the ${this.species} makes a sound`);
  }
  
  // Static method - 'this' refers to the CLASS itself, not an instance
  static info() {
    console.log('This is the Animal class');
    console.log('Static method this:', this); // The Animal class (constructor function)
  }
  
  // Getter - 'this' = the instance
  get description() {
    return `${this.name} (${this.species})`;
  }
  
  // Setter - 'this' = the instance
  set nickname(value) {
    this._nickname = value;
  }
  
  get nickname() {
    return this._nickname || 'No nickname';
  }
}

const dog = new Animal('Rex', 'Dog');
dog.speak();
console.log(dog.description);
dog.nickname = 'Rexy';
console.log(dog.nickname);

Animal.info();

// ─────────────────────────────────────────────────────────────────────────────
// Inheritance and 'this'
// ─────────────────────────────────────────────────────────────────────────────
/*
 * INHERITANCE WITH 'this':
 * 
 * When a class extends another class:
 * 1. The child constructor MUST call super() before using 'this'
 * 2. super() calls the parent constructor with the child's 'this'
 * 3. After super(), 'this' refers to the child instance
 * 4. Methods can access 'this' properties from both parent and child
 * 
 * METHOD OVERRIDING:
 * - Child class can override parent methods
 * - Inside overridden method, 'this' still refers to the child instance
 * - Can call parent method with super.methodName()
 */
class Dog extends Animal {
  constructor(name, breed) {
    // MUST call super() before accessing 'this'
    super(name, 'Dog'); // Calls parent constructor with 'this' context
    // Now we can use 'this'
    this.breed = breed;
  }
  
  // Override parent's speak method
  speak() {
    console.log(`${this.name} barks!`);
    // 'this' refers to the Dog instance
  }
  
  getDetails() {
    // 'this' has access to both parent (name, species) and child (breed) properties
    return `${this.name} is a ${this.breed}`;
  }
}

const goldenRetriever = new Dog('Buddy', 'Golden Retriever');
goldenRetriever.speak(); // Calls Dog's speak method
console.log(goldenRetriever.getDetails());

// ============================================================================
// 6. COMMON PITFALLS AND SOLUTIONS
// ============================================================================
/*
 * Understanding 'this' is tricky because it's determined at runtime, not
 * at definition time. Here are the most common mistakes developers make
 * and how to fix them.
 * 
 * COMMON PITFALLS:
 * 1. Losing 'this' in callbacks
 * 2. Method extraction (assigning method to variable)
 * 3. Nested functions creating new 'this' context
 * 4. Forgetting to bind event handlers
 * 5. Using arrow functions as object methods
 * 
 * Each pitfall has multiple solutions - choose based on your use case.
 */

console.log('\n=== COMMON PITFALLS ===\n');

// ─────────────────────────────────────────────────────────────────────────────
// PITFALL 1: Losing 'this' in Callbacks
// ─────────────────────────────────────────────────────────────────────────────
/*
 * THE PROBLEM:
 * When you pass a regular function as a callback to array methods (forEach,
 * map, filter, etc.) or async functions (setTimeout, setInterval), the
 * callback loses its 'this' context.
 * 
 * WHY?
 * The callback is invoked as a simple function call, not as a method.
 * There's no object to the left of the dot, so default binding applies.
 * 
 * SOLUTIONS:
 * 1. Use arrow function (BEST - most common in modern code)
 * 2. Pass 'this' as second argument (array methods only)
 * 3. Use bind() to create bound function
 * 4. Store 'this' in variable (old pattern, pre-ES6)
 */
const user = {
  name: 'John',
  friends: ['Jane', 'Jim'],
  
  // ❌ PROBLEM: Regular function loses 'this'
  greetFriendsProblem: function() {
    this.friends.forEach(function(friend) {
      // 'this' is undefined here - the callback is called as a simple function
      // console.log(`${this.name} greets ${friend}`); // Error: this.name is undefined
    });
  },
  
  // ✅ SOLUTION 1: Arrow function (RECOMMENDED)
  greetFriendsArrow: function() {
    this.friends.forEach(friend => {
      // Arrow function inherits 'this' from greetFriendsArrow
      console.log(`${this.name} greets ${friend}`);
    });
  },
  
  // ✅ SOLUTION 2: Pass 'this' as second argument (forEach, map, filter, etc.)
  greetFriendsThisArg: function() {
    this.friends.forEach(function(friend) {
      console.log(`${this.name} greets ${friend}`);
    }, this); // Many array methods accept 'this' as second parameter
  }
};

user.greetFriendsArrow();
user.greetFriendsThisArg();

// ─────────────────────────────────────────────────────────────────────────────
// PITFALL 2: Method Extraction (Losing Context When Assigning to Variable)
// ─────────────────────────────────────────────────────────────────────────────
/*
 * THE PROBLEM:
 * When you extract a method from an object and store it in a variable, you
 * lose the implicit binding. The function is no longer associated with the
 * object.
 * 
 * WHY?
 * - person3.sayName() → 'this' = person3 (implicit binding)
 * - extracted = person3.sayName → Just assigns the function
 * - extracted() → Called as simple function, no object reference
 * - 'this' becomes undefined (strict) or global (non-strict)
 * 
 * REAL-WORLD EXAMPLE:
 * This happens when passing methods as callbacks:
 * setTimeout(obj.method, 1000) ← method is extracted
 * 
 * SOLUTION:
 * Use bind() to create a new function with 'this' permanently bound.
 */
const person3 = {
  name: 'Kate',
  sayName: function() {
    console.log(this.name);
  }
};

person3.sayName(); // ✓ Works: 'this' = person3 (implicit binding)

const extracted = person3.sayName; // Extract method (loses binding)
// extracted(); // ✗ Fails: 'this' is undefined - no implicit binding

// ✅ SOLUTION: Bind the method to preserve context
const boundSayName = person3.sayName.bind(person3);
boundSayName(); // ✓ Works: 'this' is permanently bound to person3

// ─────────────────────────────────────────────────────────────────────────────
// PITFALL 3: Nested Functions Create New 'this' Context
// ─────────────────────────────────────────────────────────────────────────────
/*
 * THE PROBLEM:
 * Each regular function creates its own 'this' binding. When you define a
 * function inside another function, the inner function has a different 'this'.
 * 
 * WHY?
 * - Outer function: obj2.method() → 'this' = obj2 (implicit binding)
 * - Inner function: inner() → Called as simple function
 * - Inner 'this' = undefined (strict) or global (non-strict)
 * 
 * This is one of the most confusing aspects of JavaScript's 'this' behavior.
 * 
 * SOLUTIONS:
 * 1. Use arrow function (inherits 'this' from parent)
 * 2. Store 'this' in variable (const self = this)
 * 3. Use bind() on the inner function
 * 
 * Arrow functions solve this problem elegantly by not creating their own
 * 'this' binding.
 */
const obj2 = {
  value: 10,
  method: function() {
    console.log('Outer this.value:', this.value); // 10 (implicit binding)
    
    // ❌ PROBLEM: Regular nested function has different 'this'
    function inner() {
      // 'this' is undefined here - inner() is called as simple function
      // console.log('Inner this.value:', this.value); // undefined
    }
    
    inner(); // Simple function call, no implicit binding
    
    // ✅ SOLUTION: Arrow function inherits 'this' from parent scope
    const innerArrow = () => {
      // Arrow function doesn't create its own 'this'
      // It uses 'this' from method(), which is obj2
      console.log('Inner arrow this.value:', this.value); // 10
    };
    
    innerArrow();
  }
};

obj2.method();

// ============================================================================
// 7. ADVANCED PATTERNS AND TECHNIQUES
// ============================================================================
/*
 * Advanced patterns that leverage 'this' for powerful JavaScript techniques.
 * These patterns are commonly used in libraries, frameworks, and production code.
 * 
 * PATTERNS COVERED:
 * 1. Module Pattern with 'this'
 * 2. Mixin Pattern (sharing behavior across objects)
 * 3. Proxy and 'this' (metaprogramming)
 * 4. Method borrowing
 * 5. Constructor stealing (inheritance pattern)
 */

console.log('\n=== ADVANCED PATTERNS ===\n');

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN 1: Module Pattern with 'this'
// ─────────────────────────────────────────────────────────────────────────────
/*
 * MODULE PATTERN:
 * Uses an IIFE (Immediately Invoked Function Expression) to create private
 * variables and expose public methods.
 * 
 * HOW IT WORKS:
 * 1. IIFE creates a closure
 * 2. Private variables are trapped in the closure
 * 3. Returned object has methods that can access private variables
 * 4. 'this' in the methods refers to the returned object
 * 
 * BENEFITS:
 * - Encapsulation (private variables)
 * - Namespace management
 * - Controlled public API
 * 
 * 'this' BEHAVIOR:
 * When you call Module.publicMethod(), 'this' = Module (implicit binding)
 */
const Module = (function() {
  // Private variable (not accessible from outside)
  let privateVar = 0;
  
  // Return public API
  return {
    publicMethod: function() {
      privateVar++; // Can access private variable via closure
      console.log(`Private var: ${privateVar}, this:`, this);
      // 'this' refers to the Module object (implicit binding)
    },
    
    getPrivateVar: function() {
      return privateVar;
    }
  };
})(); // IIFE - immediately invoked

Module.publicMethod(); // 'this' = Module
console.log('Private var via getter:', Module.getPrivateVar());

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN 2: Mixin Pattern (Composition over Inheritance)
// ─────────────────────────────────────────────────────────────────────────────
/*
 * MIXIN PATTERN:
 * A way to add functionality to objects/classes by copying methods from
 * other objects. This is composition - combining behaviors from multiple sources.
 * 
 * HOW IT WORKS:
 * 1. Define behavior objects (canEat, canWalk) with methods
 * 2. Copy methods to target object's prototype
 * 3. Methods use 'this' to access instance properties
 * 4. When called on instance, 'this' = instance (implicit binding)
 * 
 * BENEFITS:
 * - Reuse behavior across unrelated objects
 * - Avoid deep inheritance hierarchies
 * - More flexible than classical inheritance
 * 
 * 'this' BEHAVIOR:
 * Even though methods are defined in separate objects (canEat, canWalk),
 * when they're called on an instance (human.eat()), 'this' refers to that
 * instance due to implicit binding.
 */
function mixin(target, source) {
  // Copy all properties from source to target
  Object.keys(source).forEach(key => {
    target[key] = source[key];
  });
}

// Behavior objects (mixins)
const canEat = {
  eat: function(food) {
    // 'this' will refer to whatever object calls this method
    console.log(`${this.name} is eating ${food}`);
  }
};

const canWalk = {
  walk: function() {
    // 'this' will refer to whatever object calls this method
    console.log(`${this.name} is walking`);
  }
};

// Constructor function
function Human(name) {
  this.name = name;
}

// Mix behaviors into Human's prototype
mixin(Human.prototype, canEat);
mixin(Human.prototype, canWalk);

// Create instance and use mixed-in methods
const human = new Human('Laura');
human.eat('pizza');  // 'this' = human (implicit binding)
human.walk();        // 'this' = human (implicit binding)

// ─────────────────────────────────────────────────────────────────────────────
// PATTERN 3: Proxy and 'this' (Metaprogramming)
// ─────────────────────────────────────────────────────────────────────────────
/*
 * PROXY PATTERN:
 * ES6 Proxy allows you to intercept and customize operations on objects.
 * You can trap property access, assignment, function calls, etc.
 * 
 * HOW IT WORKS:
 * 1. Create a target object
 * 2. Create a handler with trap functions (get, set, apply, etc.)
 * 3. Create proxy: new Proxy(target, handler)
 * 4. Operations on proxy are intercepted by handler
 * 
 * 'this' BEHAVIOR WITH PROXIES:
 * When you call a method on a proxy, 'this' inside the method refers to
 * the PROXY, not the target object. This is important for maintaining
 * consistency.
 * 
 * USE CASES:
 * - Validation
 * - Logging/debugging
 * - Property access control
 * - Virtual properties
 * - Reactive programming (Vue.js uses proxies for reactivity)
 */
const target = {
  name: 'Target',
  greet: function() {
    console.log(`Hello from ${this.name}`);
    // 'this' refers to the proxy, not the target
  }
};

const handler = {
  // Trap for property access
  get: function(obj, prop) {
    console.log(`Accessing property: ${prop}`);
    return obj[prop]; // Return the actual property
  }
};

const proxy = new Proxy(target, handler);
proxy.greet(); 
// 1. Accessing 'greet' triggers handler.get
// 2. greet() is called
// 3. Inside greet, 'this' = proxy (not target)

// ============================================================================
// 8. COMPREHENSIVE SUMMARY AND RULES
// ============================================================================

console.log('\n=== SUMMARY ===\n');

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * THE 'this' BINDING RULES - PRECEDENCE ORDER (Highest to Lowest)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * To determine what 'this' refers to, ask these questions IN ORDER:
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 1. NEW BINDING (Highest Priority)                                      │
 * │    Question: Is the function called with 'new'?                        │
 * │    Pattern:  const obj = new Constructor()                             │
 * │    Result:   'this' = newly created object                             │
 * │    Example:  const car = new Car('Toyota')                             │
 * │              // 'this' inside Car = new empty object                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 2. EXPLICIT BINDING (Second Priority)                                  │
 * │    Question: Is the function called with call(), apply(), or bind()?   │
 * │    Pattern:  func.call(obj), func.apply(obj), func.bind(obj)           │
 * │    Result:   'this' = the object you explicitly specify                │
 * │    Example:  greet.call(person, 'Hello')                               │
 * │              // 'this' inside greet = person                           │
 * │                                                                         │
 * │    Note: bind() creates a permanently bound function that cannot be    │
 * │          overridden by call/apply or even another bind                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 3. IMPLICIT BINDING (Third Priority)                                   │
 * │    Question: Is the function called as a method of an object?          │
 * │    Pattern:  obj.method()                                              │
 * │    Result:   'this' = the object to the left of the dot                │
 * │    Example:  person.greet()                                            │
 * │              // 'this' inside greet = person                           │
 * │                                                                         │
 * │    Pitfall: Extracting the method loses implicit binding               │
 * │             const func = obj.method; func(); // 'this' is lost         │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 4. DEFAULT BINDING (Lowest Priority)                                   │
 * │    Question: None of the above? (Simple function call)                 │
 * │    Pattern:  func()                                                    │
 * │    Result:   'this' = undefined (strict mode)                          │
 * │                       global object (non-strict mode)                  │
 * │    Example:  greet()                                                   │
 * │              // 'this' = undefined or global                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * SPECIAL CASE: ARROW FUNCTIONS (Lexical 'this')
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Arrow functions DON'T follow the above rules!
 * 
 * Pattern:  () => {}
 * Result:   'this' = inherited from enclosing scope (where defined, not called)
 * 
 * Key Characteristics:
 * ✓ Inherit 'this' from parent scope (lexical scoping)
 * ✓ 'this' is determined at DEFINITION time, not call time
 * ✗ Cannot be changed with call/apply/bind
 * ✗ Cannot be used as constructors with 'new'
 * ✗ Don't have their own 'arguments' object
 * 
 * Best Use Cases:
 * ✓ Callbacks (setTimeout, array methods, event handlers)
 * ✓ When you want to preserve outer 'this'
 * ✓ Short, simple functions
 * 
 * Avoid For:
 * ✗ Object methods (if you need 'this' to refer to the object)
 * ✗ Constructors
 * ✗ Methods that need dynamic 'this'
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * DECISION TREE: What is 'this'?
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 *                         Is it an arrow function?
 *                                  │
 *                    ┌─────────────┴─────────────┐
 *                   YES                          NO
 *                    │                            │
 *           Inherit from parent          Called with 'new'?
 *                                                 │
 *                                   ┌─────────────┴─────────────┐
 *                                  YES                          NO
 *                                   │                            │
 *                          New object created          Called with call/apply/bind?
 *                                                                │
 *                                                  ┌─────────────┴─────────────┐
 *                                                 YES                          NO
 *                                                  │                            │
 *                                         Explicitly specified         Called as obj.method()?
 *                                                                               │
 *                                                                 ┌─────────────┴─────────────┐
 *                                                                YES                          NO
 *                                                                 │                            │
 *                                                        Object to left of dot      undefined or global
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * KEY TAKEAWAYS AND BEST PRACTICES
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 1. CALL-SITE DETERMINES 'this'
 *    'this' is determined by HOW a function is called, not WHERE it's defined
 *    (except for arrow functions which use lexical scoping)
 * 
 * 2. LOOK AT THE CALL-SITE
 *    To know what 'this' is, look at how the function is invoked:
 *    - new func()        → new object
 *    - func.call(obj)    → obj
 *    - obj.func()        → obj
 *    - func()            → undefined/global
 * 
 * 3. ARROW FUNCTIONS FOR CALLBACKS
 *    Use arrow functions in callbacks to preserve the outer 'this':
 *    setTimeout(() => { this.value++ }, 1000)
 * 
 * 4. BIND FOR EVENT HANDLERS
 *    In classes, bind event handlers in constructor or use arrow functions:
 *    this.handleClick = this.handleClick.bind(this)
 *    OR
 *    handleClick = () => { ... }
 * 
 * 5. AVOID COMMON PITFALLS
 *    - Method extraction: const func = obj.method; func() // loses 'this'
 *    - Callbacks: setTimeout(obj.method, 1000) // loses 'this'
 *    - Nested functions: function outer() { function inner() { } } // different 'this'
 * 
 * 6. USE STRICT MODE
 *    Always use strict mode ('use strict') to catch 'this' errors early
 *    In strict mode, 'this' is undefined instead of global, making bugs obvious
 * 
 * 7. MODERN APPROACH
 *    - Prefer arrow functions for callbacks and short functions
 *    - Use classes with arrow function fields for methods
 *    - Use bind() when you need to pass methods as callbacks
 *    - Avoid 'const self = this' pattern (use arrow functions instead)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * QUICK REFERENCE TABLE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Call Pattern              │ 'this' Refers To              │ Priority
 * ──────────────────────────┼───────────────────────────────┼─────────
 * new Func()                │ New object                    │ Highest
 * func.call(obj)            │ obj (explicit)                │ High
 * func.apply(obj)           │ obj (explicit)                │ High
 * func.bind(obj)()          │ obj (permanent)               │ High
 * obj.method()              │ obj (implicit)                │ Medium
 * func()                    │ undefined / global (default)  │ Lowest
 * () => {}                  │ Inherited (lexical)           │ Special
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * REMEMBER
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * "this" is not about WHERE a function is written,
 * it's about HOW a function is called.
 * 
 * (Except for arrow functions, which inherit 'this' from WHERE they're written)
 */

console.log('\n=== END OF COMPREHENSIVE GUIDE ===\n');

