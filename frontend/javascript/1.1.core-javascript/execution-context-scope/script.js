// ============================================================================
// EXECUTION CONTEXT & SCOPE - COMPREHENSIVE GUIDE
// ============================================================================

/*
TABLE OF CONTENTS:
1. Execution Context
2. Types of Scope (Global, Function, Block)
3. Execution Context Stack (Call Stack)
4. Variable Hoisting
5. Temporal Dead Zone (TDZ)
6. Lexical Environment
7. Scope Chain
*/

// ============================================================================
// 1. EXECUTION CONTEXT
// ============================================================================

/*
DEFINITION:
An Execution Context is an abstract concept that holds information about the 
environment within which the current code is being executed.

COMPONENTS OF EXECUTION CONTEXT:
1. Variable Environment: stores variables, functions, and arguments
2. Lexical Environment: holds identifier-variable mapping
3. this binding: value of 'this' keyword

TYPES OF EXECUTION CONTEXT:
1. Global Execution Context (GEC)
2. Function Execution Context (FEC)
3. Eval Execution Context (rarely used)

PHASES OF EXECUTION CONTEXT:
1. Creation Phase (Memory Creation Phase)
   - Creates Variable Object
   - Creates Scope Chain
   - Determines 'this' value
   - Hoisting occurs here
   
2. Execution Phase (Code Execution Phase)
   - Assigns values to variables
   - Executes function calls
   - Executes code line by line
*/

// Example demonstrating execution context creation
console.log("=== EXECUTION CONTEXT EXAMPLE ===");

var globalVar = "I'm global";

function demonstrateContext() {
    var functionVar = "I'm in function scope";
    
    console.log(globalVar);    // Accessible
    console.log(functionVar);  // Accessible
    
    function innerFunction() {
        var innerVar = "I'm in inner function";
        console.log(globalVar);     // Accessible
        console.log(functionVar);   // Accessible
        console.log(innerVar);      // Accessible
    }
    
    innerFunction();
    // console.log(innerVar);  // Error: innerVar is not defined
}

demonstrateContext();

/*
EXECUTION FLOW:
1. Global Execution Context is created
   - globalVar is hoisted
   - demonstrateContext is hoisted
   
2. When demonstrateContext() is called:
   - New Function Execution Context is created
   - functionVar is hoisted in this context
   - innerFunction is hoisted in this context
   
3. When innerFunction() is called:
   - Another Function Execution Context is created
   - innerVar is hoisted in this context
*/

// ============================================================================
// 2. TYPES OF SCOPE
// ============================================================================

/*
SCOPE DEFINITION:
Scope determines the accessibility (visibility) of variables, functions, and 
objects in some particular part of your code during runtime.

JavaScript has three types of scope:
1. Global Scope
2. Function Scope
3. Block Scope
*/

// ----------------------------------------------------------------------------
// 2.1 GLOBAL SCOPE
// ----------------------------------------------------------------------------

/*
GLOBAL SCOPE:
- Variables declared outside any function or block
- Accessible from anywhere in the code
- In browsers, global variables become properties of the window object
- Should be used sparingly to avoid naming conflicts
*/

console.log("\n=== GLOBAL SCOPE ===");

var globalVariable = "I'm global";
let globalLet = "I'm also global";
const globalConst = "I'm global too";

function accessGlobal() {
    console.log(globalVariable);  // Accessible
    console.log(globalLet);       // Accessible
    console.log(globalConst);     // Accessible
}

accessGlobal();

// Global scope pollution example (what to avoid)
var name = "John";  // Global variable

function greet() {
    name = "Jane";  // Modifies global variable (no var/let/const)
}

console.log(name);  // "John"
greet();
console.log(name);  // "Jane" - global variable was modified!

// ----------------------------------------------------------------------------
// 2.2 FUNCTION SCOPE
// ----------------------------------------------------------------------------

/*
FUNCTION SCOPE:
- Variables declared inside a function are local to that function
- Only accessible within the function
- Each function creates its own scope
- var, let, and const all have function scope
*/

console.log("\n=== FUNCTION SCOPE ===");

function functionScopeDemo() {
    var functionVar = "I'm function scoped";
    let functionLet = "I'm also function scoped";
    const functionConst = "Me too!";
    
    console.log(functionVar);   // Works
    console.log(functionLet);   // Works
    console.log(functionConst); // Works
}

functionScopeDemo();

// console.log(functionVar);   // ReferenceError: functionVar is not defined
// console.log(functionLet);   // ReferenceError: functionLet is not defined
// console.log(functionConst); // ReferenceError: functionConst is not defined

// Function parameters are also function-scoped
function parameterScope(param1, param2) {
    console.log(param1, param2);  // Accessible inside
}

parameterScope("Hello", "World");
// console.log(param1);  // ReferenceError: param1 is not defined

// Nested function scope
function outerFunction() {
    var outerVar = "I'm outer";
    
    function innerFunction() {
        var innerVar = "I'm inner";
        console.log(outerVar);  // Can access outer scope
        console.log(innerVar);  // Can access own scope
    }
    
    innerFunction();
    console.log(outerVar);   // Can access own scope
    // console.log(innerVar);  // Error: Cannot access inner scope
}

outerFunction();

// ----------------------------------------------------------------------------
// 2.3 BLOCK SCOPE
// ----------------------------------------------------------------------------

/*
BLOCK SCOPE:
- Introduced in ES6 with let and const
- Variables declared with let and const inside {} are block-scoped
- var is NOT block-scoped (it's function-scoped)
- Blocks include: if statements, loops, standalone blocks
*/

console.log("\n=== BLOCK SCOPE ===");

// var vs let/const in blocks
if (true) {
    var varVariable = "I'm var";
    let letVariable = "I'm let";
    const constVariable = "I'm const";
    
    console.log(varVariable);    // Works
    console.log(letVariable);    // Works
    console.log(constVariable);  // Works
}

console.log(varVariable);     // Works - var is NOT block-scoped!
// console.log(letVariable);    // ReferenceError - let IS block-scoped
// console.log(constVariable);  // ReferenceError - const IS block-scoped

// Block scope in loops
console.log("\n--- Loop Block Scope ---");

// Using var (not block-scoped)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var i:", i), 100);
}
// Output: 3, 3, 3 (because var is not block-scoped)

// Using let (block-scoped)
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let j:", j), 200);
}
// Output: 0, 1, 2 (because let creates a new binding for each iteration)

// Standalone block scope
{
    let blockScoped = "I'm in a block";
    const alsoBlockScoped = "Me too";
    var notBlockScoped = "I'm not block scoped";
    
    console.log(blockScoped);      // Works
    console.log(alsoBlockScoped);  // Works
}

// console.log(blockScoped);      // ReferenceError
// console.log(alsoBlockScoped);  // ReferenceError
console.log(notBlockScoped);      // Works - var ignores block scope

// Switch statement block scope
let value = 2;

switch (value) {
    case 1:
        let result = "one";
        break;
    case 2:
        let result = "two";  // Each case needs its own block for let
        console.log(result);
        break;
}

// Better approach with explicit blocks
switch (value) {
    case 1: {
        let result = "one";
        console.log(result);
        break;
    }
    case 2: {
        let result = "two";
        console.log(result);
        break;
    }
}

// ============================================================================
// 3. EXECUTION CONTEXT STACK (CALL STACK)
// ============================================================================

/*
EXECUTION CONTEXT STACK (Call Stack):
- A LIFO (Last In, First Out) stack structure
- Keeps track of all execution contexts
- When a function is called, its execution context is pushed onto the stack
- When a function completes, its context is popped off the stack
- The Global Execution Context is at the bottom of the stack

STACK OPERATIONS:
1. Push: Add execution context when function is called
2. Pop: Remove execution context when function returns
*/

console.log("\n=== EXECUTION CONTEXT STACK ===");

function first() {
    console.log("Inside first function");
    second();
    console.log("Back to first function");
}

function second() {
    console.log("Inside second function");
    third();
    console.log("Back to second function");
}

function third() {
    console.log("Inside third function");
}

console.log("Global execution context");
first();
console.log("Back to global execution context");

/*
CALL STACK VISUALIZATION:

Step 1: Global Execution Context
[Global EC]

Step 2: first() is called
[first() EC]
[Global EC]

Step 3: second() is called from first()
[second() EC]
[first() EC]
[Global EC]

Step 4: third() is called from second()
[third() EC]
[second() EC]
[first() EC]
[Global EC]

Step 5: third() completes and is popped
[second() EC]
[first() EC]
[Global EC]

Step 6: second() completes and is popped
[first() EC]
[Global EC]

Step 7: first() completes and is popped
[Global EC]

Step 8: Program ends
[Empty Stack]
*/

// Stack overflow example (be careful!)
function recursiveFunction(count) {
    console.log(count);
    if (count > 0) {
        recursiveFunction(count - 1);
    }
}

// recursiveFunction(10000);  // Will cause stack overflow on large numbers

// Proper recursive function with base case
function factorial(n) {
    if (n <= 1) return 1;  // Base case
    return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));

// ============================================================================
// 4. VARIABLE HOISTING
// ============================================================================

/*
HOISTING DEFINITION:
JavaScript's default behavior of moving declarations to the top of their scope
before code execution. Only declarations are hoisted, not initializations.

WHAT GETS HOISTED:
1. var declarations (initialized with undefined)
2. function declarations (fully hoisted with body)
3. let and const declarations (hoisted but in TDZ)
4. class declarations (hoisted but in TDZ)

WHAT DOESN'T GET HOISTED:
1. Variable initializations
2. Function expressions
3. Arrow functions
*/

console.log("\n=== VARIABLE HOISTING ===");

// ----------------------------------------------------------------------------
// 4.1 VAR HOISTING
// ----------------------------------------------------------------------------

console.log("\n--- var Hoisting ---");

console.log(hoistedVar);  // undefined (not ReferenceError!)
var hoistedVar = "I'm hoisted";
console.log(hoistedVar);  // "I'm hoisted"

/*
How JavaScript interprets the above code:

var hoistedVar;              // Declaration hoisted
console.log(hoistedVar);     // undefined
hoistedVar = "I'm hoisted";  // Initialization stays in place
console.log(hoistedVar);     // "I'm hoisted"
*/

// Multiple var declarations
console.log(a, b, c);  // undefined undefined undefined
var a = 1;
var b = 2;
var c = 3;
console.log(a, b, c);  // 1 2 3

// ----------------------------------------------------------------------------
// 4.2 FUNCTION HOISTING
// ----------------------------------------------------------------------------

console.log("\n--- Function Hoisting ---");

// Function declaration - fully hoisted
sayHello();  // Works! "Hello!"

function sayHello() {
    console.log("Hello!");
}

// Function expression - NOT hoisted
// sayGoodbye();  // TypeError: sayGoodbye is not a function

var sayGoodbye = function() {
    console.log("Goodbye!");
};

sayGoodbye();  // Now it works

/*
How JavaScript interprets function expression:

var sayGoodbye;              // Declaration hoisted (undefined)
sayGoodbye();                // TypeError: undefined is not a function
sayGoodbye = function() {    // Assignment stays in place
    console.log("Goodbye!");
};
*/

// Arrow function - NOT hoisted
// greet();  // TypeError: greet is not a function

const greet = () => {
    console.log("Greetings!");
};

greet();  // Now it works

// ----------------------------------------------------------------------------
// 4.3 LET AND CONST HOISTING
// ----------------------------------------------------------------------------

console.log("\n--- let and const Hoisting ---");

// let and const are hoisted but not initialized (Temporal Dead Zone)
// console.log(hoistedLet);  // ReferenceError: Cannot access before initialization
let hoistedLet = "I'm let";
console.log(hoistedLet);

// console.log(hoistedConst);  // ReferenceError: Cannot access before initialization
const hoistedConst = "I'm const";
console.log(hoistedConst);

// ----------------------------------------------------------------------------
// 4.4 CLASS HOISTING
// ----------------------------------------------------------------------------

console.log("\n--- Class Hoisting ---");

// Class declarations are hoisted but in TDZ
// const obj = new MyClass();  // ReferenceError: Cannot access before initialization

class MyClass {
    constructor(name) {
        this.name = name;
    }
}

const obj = new MyClass("Test");
console.log(obj.name);

// ----------------------------------------------------------------------------
// 4.5 HOISTING IN DIFFERENT SCOPES
// ----------------------------------------------------------------------------

console.log("\n--- Hoisting in Different Scopes ---");

var globalHoisted = "global";

function hoistingScope() {
    console.log(globalHoisted);      // "global"
    console.log(functionHoisted);    // undefined (hoisted in function scope)
    
    var functionHoisted = "function";
    
    console.log(functionHoisted);    // "function"
    
    if (true) {
        console.log(blockHoisted);   // undefined (var is function-scoped)
        var blockHoisted = "block";
        console.log(blockHoisted);   // "block"
    }
    
    console.log(blockHoisted);       // "block" (var leaked out of block)
}

hoistingScope();

// ============================================================================
// 5. TEMPORAL DEAD ZONE (TDZ)
// ============================================================================

/*
TEMPORAL DEAD ZONE (TDZ):
The time between entering scope and the variable being declared where you 
cannot access the variable.

KEY POINTS:
1. Applies to let, const, and class declarations
2. Starts from the beginning of the scope
3. Ends when the variable is declared
4. Accessing variable in TDZ throws ReferenceError
5. Helps catch errors and promotes better coding practices

WHY TDZ EXISTS:
1. Makes const truly constant (can't be used before assignment)
2. Catches errors early
3. Makes code more predictable
4. Encourages declaring variables before use
*/

console.log("\n=== TEMPORAL DEAD ZONE ===");

// ----------------------------------------------------------------------------
// 5.1 TDZ WITH LET
// ----------------------------------------------------------------------------

console.log("\n--- TDZ with let ---");

// TDZ starts here for 'tdzVariable'
// console.log(tdzVariable);  // ReferenceError: Cannot access before initialization
// console.log(typeof tdzVariable);  // ReferenceError (in TDZ)

let tdzVariable = "Now I'm accessible";  // TDZ ends here
console.log(tdzVariable);  // Works

// ----------------------------------------------------------------------------
// 5.2 TDZ WITH CONST
// ----------------------------------------------------------------------------

console.log("\n--- TDZ with const ---");

// TDZ starts here for 'tdzConst'
// console.log(tdzConst);  // ReferenceError

const tdzConst = "I'm const";  // TDZ ends here
console.log(tdzConst);

// ----------------------------------------------------------------------------
// 5.3 TDZ IN BLOCKS
// ----------------------------------------------------------------------------

console.log("\n--- TDZ in Blocks ---");

{
    // TDZ for blockLet starts here
    // console.log(blockLet);  // ReferenceError
    
    let blockLet = "Block scoped";  // TDZ ends here
    console.log(blockLet);
}

// ----------------------------------------------------------------------------
// 5.4 TDZ WITH FUNCTION PARAMETERS
// ----------------------------------------------------------------------------

console.log("\n--- TDZ with Function Parameters ---");

// This will cause an error because 'b' is in TDZ when used in default value
// function tdzInParams(a = b, b = 2) {
//     console.log(a, b);
// }
// tdzInParams();  // ReferenceError: Cannot access 'b' before initialization

// Correct way
function correctParams(a = 2, b = a) {
    console.log(a, b);
}
correctParams();  // 2 2

// ----------------------------------------------------------------------------
// 5.5 TDZ VISUALIZATION
// ----------------------------------------------------------------------------

console.log("\n--- TDZ Visualization ---");

function demonstrateTDZ() {
    // TDZ for 'x' starts here
    // |
    // | TDZ for 'x'
    // |
    // console.log(x);  // ReferenceError
    // |
    // | TDZ for 'x'
    // |
    let x = 10;  // TDZ for 'x' ends here
    // 
    console.log(x);  // 10 - Now accessible
}

demonstrateTDZ();

// ----------------------------------------------------------------------------
// 5.6 TDZ VS VAR HOISTING
// ----------------------------------------------------------------------------

console.log("\n--- TDZ vs var Hoisting ---");

function compareHoisting() {
    console.log(varVariable);  // undefined (hoisted and initialized)
    // console.log(letVariable);  // ReferenceError (in TDZ)
    
    var varVariable = "I'm var";
    let letVariable = "I'm let";
    
    console.log(varVariable);  // "I'm var"
    console.log(letVariable);  // "I'm let"
}

compareHoisting();

// ============================================================================
// 6. LEXICAL ENVIRONMENT
// ============================================================================

/*
LEXICAL ENVIRONMENT:
A structure that holds identifier-variable mapping. It's where variables and 
functions live during execution.

COMPONENTS:
1. Environment Record: Stores variables and function declarations
   - Declarative Environment Record (for functions, variables)
   - Object Environment Record (for global object, with statement)
   
2. Reference to Outer Environment: Link to parent lexical environment
   - Enables scope chain
   - null for global environment

TYPES:
1. Global Lexical Environment
2. Function Lexical Environment
3. Block Lexical Environment (for let/const)

LEXICAL SCOPE:
The scope is determined by where functions and variables are written in the code,
not where they are called from (static scoping).
*/

console.log("\n=== LEXICAL ENVIRONMENT ===");

// ----------------------------------------------------------------------------
// 6.1 BASIC LEXICAL ENVIRONMENT
// ----------------------------------------------------------------------------

console.log("\n--- Basic Lexical Environment ---");

let globalLexical = "global";

function outerLexical() {
    let outerVar = "outer";
    
    function innerLexical() {
        let innerVar = "inner";
        
        console.log(innerVar);   // Own environment
        console.log(outerVar);   // Parent environment
        console.log(globalLexical);  // Global environment
    }
    
    innerLexical();
}

outerLexical();

/*
LEXICAL ENVIRONMENT STRUCTURE:

Global Lexical Environment:
{
    environmentRecord: {
        globalLexical: "global",
        outerLexical: <function>
    },
    outer: null
}

outerLexical Lexical Environment:
{
    environmentRecord: {
        outerVar: "outer",
        innerLexical: <function>
    },
    outer: <Global Lexical Environment>
}

innerLexical Lexical Environment:
{
    environmentRecord: {
        innerVar: "inner"
    },
    outer: <outerLexical Lexical Environment>
}
*/

// ----------------------------------------------------------------------------
// 6.2 LEXICAL SCOPING
// ----------------------------------------------------------------------------

console.log("\n--- Lexical Scoping ---");

function lexicalScopeDemo() {
    let message = "Hello from lexical scope";
    
    function inner() {
        console.log(message);  // Accesses from lexical parent
    }
    
    return inner;
}

const innerFunc = lexicalScopeDemo();
innerFunc();  // "Hello from lexical scope"

// The function remembers its lexical environment even after outer function returns

// ----------------------------------------------------------------------------
// 6.3 LEXICAL ENVIRONMENT WITH CLOSURES
// ----------------------------------------------------------------------------

console.log("\n--- Lexical Environment with Closures ---");

function createCounter() {
    let count = 0;  // Private variable in lexical environment
    
    return {
        increment: function() {
            count++;
            console.log(count);
        },
        decrement: function() {
            count--;
            console.log(count);
        },
        getCount: function() {
            return count;
        }
    };
}

const counter1 = createCounter();
counter1.increment();  // 1
counter1.increment();  // 2
counter1.decrement();  // 1
console.log(counter1.getCount());  // 1

const counter2 = createCounter();
counter2.increment();  // 1
console.log(counter2.getCount());  // 1

// Each counter has its own lexical environment

// ----------------------------------------------------------------------------
// 6.4 LEXICAL ENVIRONMENT IN LOOPS
// ----------------------------------------------------------------------------

console.log("\n--- Lexical Environment in Loops ---");

// var - single lexical environment
var functionsVar = [];
for (var i = 0; i < 3; i++) {
    functionsVar.push(function() {
        console.log("var i:", i);
    });
}

functionsVar[0]();  // 3
functionsVar[1]();  // 3
functionsVar[2]();  // 3

// let - new lexical environment per iteration
let functionsLet = [];
for (let j = 0; j < 3; j++) {
    functionsLet.push(function() {
        console.log("let j:", j);
    });
}

functionsLet[0]();  // 0
functionsLet[1]();  // 1
functionsLet[2]();  // 2

// ----------------------------------------------------------------------------
// 6.5 LEXICAL ENVIRONMENT WITH NESTED FUNCTIONS
// ----------------------------------------------------------------------------

console.log("\n--- Nested Functions Lexical Environment ---");

function level1() {
    let l1 = "Level 1";
    
    function level2() {
        let l2 = "Level 2";
        
        function level3() {
            let l3 = "Level 3";
            
            console.log(l1);  // Access level 1
            console.log(l2);  // Access level 2
            console.log(l3);  // Access level 3
        }
        
        level3();
    }
    
    level2();
}

level1();

// ============================================================================
// 7. SCOPE CHAIN
// ============================================================================

/*
SCOPE CHAIN:
The mechanism JavaScript uses to resolve variable references by looking up 
through nested scopes.

HOW IT WORKS:
1. JavaScript looks for variable in current scope
2. If not found, looks in outer scope
3. Continues up the chain until global scope
4. If not found in global scope, ReferenceError is thrown

KEY POINTS:
1. Created when function is defined (lexical scoping)
2. Based on physical location of code
3. Determines variable accessibility
4. Follows the outer environment reference
5. Unidirectional (inner can access outer, not vice versa)
*/

console.log("\n=== SCOPE CHAIN ===");

// ----------------------------------------------------------------------------
// 7.1 BASIC SCOPE CHAIN
// ----------------------------------------------------------------------------

console.log("\n--- Basic Scope Chain ---");

let level0 = "Global";

function scopeChainDemo() {
    let level1 = "Function";
    
    function inner() {
        let level2 = "Inner";
        
        console.log(level2);  // Found in current scope
        console.log(level1);  // Found in parent scope
        console.log(level0);  // Found in global scope
    }
    
    inner();
}

scopeChainDemo();

/*
SCOPE CHAIN LOOKUP:

When inner() executes and looks for 'level1':
1. Check inner() scope - Not found
2. Check scopeChainDemo() scope - Found! Return value
3. (Would check global scope if not found)
4. (Would throw ReferenceError if still not found)
*/

// ----------------------------------------------------------------------------
// 7.2 SCOPE CHAIN WITH MULTIPLE LEVELS
// ----------------------------------------------------------------------------

console.log("\n--- Multi-Level Scope Chain ---");

let global = "I'm global";

function first() {
    let firstVar = "I'm in first";
    
    function second() {
        let secondVar = "I'm in second";
        
        function third() {
            let thirdVar = "I'm in third";
            
            console.log(thirdVar);   // Own scope
            console.log(secondVar);  // Parent scope
            console.log(firstVar);   // Grandparent scope
            console.log(global);     // Global scope
        }
        
        third();
    }
    
    second();
}

first();

// ----------------------------------------------------------------------------
// 7.3 SCOPE CHAIN AND VARIABLE SHADOWING
// ----------------------------------------------------------------------------

console.log("\n--- Variable Shadowing in Scope Chain ---");

let shadowVar = "global";

function shadowDemo() {
    let shadowVar = "function";  // Shadows global variable
    
    console.log(shadowVar);  // "function" (local takes precedence)
    
    function inner() {
        let shadowVar = "inner";  // Shadows function variable
        console.log(shadowVar);  // "inner" (most local takes precedence)
    }
    
    inner();
    console.log(shadowVar);  // "function" (back to function scope)
}

shadowDemo();
console.log(shadowVar);  // "global" (back to global scope)

// ----------------------------------------------------------------------------
// 7.4 SCOPE CHAIN WITH CLOSURES
// ----------------------------------------------------------------------------

console.log("\n--- Scope Chain with Closures ---");

function outerClosure(outerParam) {
    let outerVar = "outer";
    
    function middleClosure(middleParam) {
        let middleVar = "middle";
        
        function innerClosure(innerParam) {
            let innerVar = "inner";
            
            // Can access all variables in the scope chain
            console.log(innerVar, innerParam);      // Own scope
            console.log(middleVar, middleParam);    // Parent scope
            console.log(outerVar, outerParam);      // Grandparent scope
        }
        
        return innerClosure;
    }
    
    return middleClosure;
}

const middle = outerClosure("outer arg");
const inner = middle("middle arg");
inner("inner arg");

// The scope chain is preserved even after outer functions return!

// ----------------------------------------------------------------------------
// 7.5 SCOPE CHAIN LOOKUP PERFORMANCE
// ----------------------------------------------------------------------------

console.log("\n--- Scope Chain Lookup Performance ---");

let globalCounter = 0;

function performanceDemo() {
    let localCounter = 0;
    
    // Accessing local variable (fast - found immediately)
    for (let i = 0; i < 1000000; i++) {
        localCounter++;
    }
    
    // Accessing global variable (slower - must traverse scope chain)
    for (let i = 0; i < 1000000; i++) {
        globalCounter++;
    }
    
    console.log("Local counter:", localCounter);
    console.log("Global counter:", globalCounter);
}

// performanceDemo();  // Uncomment to see performance difference

// Best practice: Cache global/outer scope variables locally
function optimizedDemo() {
    let localGlobalCounter = globalCounter;  // Cache global variable
    
    for (let i = 0; i < 1000000; i++) {
        localGlobalCounter++;
    }
    
    globalCounter = localGlobalCounter;  // Update global once
}

// ----------------------------------------------------------------------------
// 7.6 SCOPE CHAIN VISUALIZATION
// ----------------------------------------------------------------------------

console.log("\n--- Scope Chain Visualization ---");

let a = "global a";

function outer() {
    let b = "outer b";
    
    function middle() {
        let c = "middle c";
        
        function inner() {
            let d = "inner d";
            
            console.log(d);  // Scope chain: inner -> middle -> outer -> global
            console.log(c);  // Scope chain: inner -> middle -> outer -> global
            console.log(b);  // Scope chain: inner -> middle -> outer -> global
            console.log(a);  // Scope chain: inner -> middle -> outer -> global
        }
        
        inner();
    }
    
    middle();
}

outer();

/*
SCOPE CHAIN DIAGRAM:

inner() scope: { d }
    ↓ (outer reference)
middle() scope: { c }
    ↓ (outer reference)
outer() scope: { b }
    ↓ (outer reference)
Global scope: { a }
    ↓ (outer reference)
null
*/

// ----------------------------------------------------------------------------
// 7.7 SCOPE CHAIN WITH IIFE
// ----------------------------------------------------------------------------

console.log("\n--- Scope Chain with IIFE ---");

(function() {
    let iifeVar = "IIFE scope";
    
    (function() {
        let nestedIIFE = "Nested IIFE";
        
        console.log(nestedIIFE);  // Own scope
        console.log(iifeVar);     // Parent IIFE scope
        console.log(global);      // Global scope
    })();
    
    // console.log(nestedIIFE);  // ReferenceError - not in scope chain
})();

// console.log(iifeVar);  // ReferenceError - not in scope chain

// ============================================================================
// PRACTICAL EXAMPLES AND BEST PRACTICES
// ============================================================================

console.log("\n=== PRACTICAL EXAMPLES ===");

// ----------------------------------------------------------------------------
// Example 1: Module Pattern using Scope
// ----------------------------------------------------------------------------

const calculator = (function() {
    // Private variables (not in global scope)
    let result = 0;
    
    // Private function
    function log(operation, value) {
        console.log(`${operation}: ${value}, Result: ${result}`);
    }
    
    // Public API
    return {
        add: function(num) {
            result += num;
            log("Add", num);
            return this;
        },
        subtract: function(num) {
            result -= num;
            log("Subtract", num);
            return this;
        },
        multiply: function(num) {
            result *= num;
            log("Multiply", num);
            return this;
        },
        getResult: function() {
            return result;
        },
        reset: function() {
            result = 0;
            console.log("Reset");
            return this;
        }
    };
})();

calculator.add(10).multiply(2).subtract(5);
console.log("Final result:", calculator.getResult());

// ----------------------------------------------------------------------------
// Example 2: Event Handler with Proper Scope
// ----------------------------------------------------------------------------

function createButton(buttonName) {
    // Each button gets its own lexical environment
    let clickCount = 0;
    
    return {
        click: function() {
            clickCount++;
            console.log(`${buttonName} clicked ${clickCount} times`);
        },
        getClickCount: function() {
            return clickCount;
        }
    };
}

const button1 = createButton("Button 1");
const button2 = createButton("Button 2");

button1.click();
button1.click();
button2.click();

console.log("Button 1 clicks:", button1.getClickCount());
console.log("Button 2 clicks:", button2.getClickCount());

// ----------------------------------------------------------------------------
// Example 3: Avoiding Global Scope Pollution
// ----------------------------------------------------------------------------

// Bad practice
// var config = { ... };
// var utils = { ... };
// var data = [ ... ];

// Good practice - use IIFE or modules
const app = (function() {
    // All variables are scoped to this function
    const config = {
        apiUrl: "https://api.example.com",
        timeout: 5000
    };
    
    const utils = {
        formatDate: function(date) {
            return date.toISOString();
        }
    };
    
    let data = [];
    
    return {
        init: function() {
            console.log("App initialized with config:", config);
        },
        getData: function() {
            return data;
        }
    };
})();

app.init();

// ----------------------------------------------------------------------------
// Example 4: Proper Loop Handling
// ----------------------------------------------------------------------------

// Problem with var
console.log("\n--- Loop Problem with var ---");
var buttons = [];
for (var i = 0; i < 3; i++) {
    buttons.push({
        click: function() {
            console.log("Button " + i + " clicked");
        }
    });
}

buttons[0].click();  // Button 3 clicked (wrong!)
buttons[1].click();  // Button 3 clicked (wrong!)
buttons[2].click();  // Button 3 clicked (wrong!)

// Solution 1: Use let
console.log("\n--- Solution 1: Use let ---");
let buttonsLet = [];
for (let i = 0; i < 3; i++) {
    buttonsLet.push({
        click: function() {
            console.log("Button " + i + " clicked");
        }
    });
}

buttonsLet[0].click();  // Button 0 clicked (correct!)
buttonsLet[1].click();  // Button 1 clicked (correct!)
buttonsLet[2].click();  // Button 2 clicked (correct!)

// Solution 2: Use IIFE with var
console.log("\n--- Solution 2: Use IIFE ---");
var buttonsIIFE = [];
for (var i = 0; i < 3; i++) {
    (function(index) {
        buttonsIIFE.push({
            click: function() {
                console.log("Button " + index + " clicked");
            }
        });
    })(i);
}

buttonsIIFE[0].click();  // Button 0 clicked (correct!)
buttonsIIFE[1].click();  // Button 1 clicked (correct!)
buttonsIIFE[2].click();  // Button 2 clicked (correct!)

// ============================================================================
// COMMON PITFALLS AND HOW TO AVOID THEM
// ============================================================================

console.log("\n=== COMMON PITFALLS ===");

// Pitfall 1: Accessing variables before declaration
try {
    console.log(notDeclared);  // ReferenceError
} catch (e) {
    console.log("Error:", e.message);
}

// Pitfall 2: Assuming var is block-scoped
if (true) {
    var leakedVar = "I leaked!";
}
console.log(leakedVar);  // Accessible (var is not block-scoped)

// Pitfall 3: Modifying global variables accidentally
function accidentalGlobal() {
    accidentalVar = "I'm accidentally global!";  // No var/let/const
}
accidentalGlobal();
console.log(accidentalVar);  // Accessible globally!

// Pitfall 4: Closure memory leaks
function createHeavyClosures() {
    let largeData = new Array(1000000).fill("data");
    
    return function() {
        // This closure keeps largeData in memory
        console.log(largeData[0]);
    };
}

// Solution: Only close over what you need
function createOptimizedClosure() {
    let largeData = new Array(1000000).fill("data");
    let firstElement = largeData[0];  // Extract only what's needed
    
    return function() {
        console.log(firstElement);  // Only closes over firstElement
    };
}

// ============================================================================
// SUMMARY AND BEST PRACTICES
// ============================================================================

console.log("\n=== BEST PRACTICES SUMMARY ===");

/*
1. EXECUTION CONTEXT:
   - Understand the creation and execution phases
   - Remember that each function call creates a new execution context

2. SCOPE:
   - Use let and const instead of var for block scoping
   - Minimize global variables
   - Use IIFE or modules to create private scope

3. EXECUTION CONTEXT STACK:
   - Be aware of stack size limits (avoid infinite recursion)
   - Understand the order of function execution

4. HOISTING:
   - Declare variables at the top of their scope
   - Use function declarations for hoisting, expressions for control
   - Prefer let/const over var

5. TEMPORAL DEAD ZONE:
   - Always declare variables before use
   - Understand that let/const are hoisted but not initialized

6. LEXICAL ENVIRONMENT:
   - Remember that scope is determined by code structure, not execution
   - Use closures wisely to maintain private state

7. SCOPE CHAIN:
   - Minimize scope chain traversal for better performance
   - Cache frequently accessed outer scope variables
   - Understand variable shadowing

GENERAL TIPS:
- Use strict mode ('use strict') to catch common mistakes
- Use linters (ESLint) to enforce best practices
- Keep functions small and focused
- Avoid deeply nested functions
- Use modules to organize code
- Document complex scope interactions
*/

console.log("\n=== END OF EXECUTION CONTEXT & SCOPE GUIDE ===");

