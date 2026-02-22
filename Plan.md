# Phase 1: JavaScript Fundamentals Mastery

## Module 1.1: Core JavaScript (Until Mastery)

### Fundamentals

#### Day 1 — Variables (var, let, const & Scope Differences)

**Read:**

- [MDN var](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/var)
- [MDN let](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/let)
- [MDN const](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const)
- [High-quality article](https://javascript.info/variables)

**Exercises:**

- Rewrite the same program using `var` → `let` → `const` and note differences.
- Predict output for loops using `var` vs `let`.

---

#### Day 2 — Data Types (Primitive vs Reference)

**Read:**

- [MDN Data Types](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures)
- [JS.info primitives](https://javascript.info/types)

**Exercises:**

- Show difference between copying primitives vs objects.
- Write examples showing `==` vs `===` with primitive types.

---

#### Day 3 — Type Coercion & Conversion

**Read:**

- [MDN Type coercion](https://developer.mozilla.org/docs/Glossary/Type_coercion)
- [JS.info Type Conversions](https://javascript.info/type-conversions)

**Exercises:**

- Predict outputs of tricky coercions: `"5" - 2`, `"5" + 2`, `true + false`, `[1,2] + [3,4]`.
- Implement your own `toNumber`, `toBoolean`, `toString` utilities.

---

#### Day 4 — Operators & Expressions

**Read:**

- [MDN Operators](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Expressions_and_Operators)

**Exercises:**

- Build a mini calculator using only expressions.
- Show difference between `==` and `===` with 10+ examples.

---

#### Day 5 — Conditionals & Loops

**Read:**

- [MDN Conditionals](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN Loops](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Loops_and_iteration)

**Exercises:**

- Write loops for arrays, objects, maps, sets.
- Convert every `for` loop to `while` and `for…of`.

---

#### Day 6 — Functions: Declarations, Expressions, Arrow Functions

**Read:**

- [JS.info Functions](https://javascript.info/function-basics)
- [JS.info Arrow functions](https://javascript.info/arrow-functions-basics)

**Exercises:**

- Convert normal functions → arrow functions → function expressions.
- Show differences in hoisting for each.

---

### Execution Context & Scope

#### Day 7 — Global, Function & Block Scope

**Read:**

- [JS.info Scope](https://javascript.info/closure#lexical-environment)
- [MDN Blocks & Scope](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Grammar_and_types#block-level_scope)

**Exercises:**

- Identify scope of 10 given variables in sample code.
- Debug scoping bugs in nested functions.

---

#### Day 8 — Execution Context Stack

**Read:**

- [Deep Dive](https://www.javascripttutorial.net/javascript-execution-context/)
- [Video: JS Event Loop + Call Stack](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

**Exercises:**

- Draw the execution context stack for a program with nested functions.
- Simulate how JS creates global → function → eval contexts.

---

#### Day 9 — Variable Hoisting

**Read:**

- [MDN Hoisting](https://developer.mozilla.org/docs/Glossary/Hoisting)
- [JS.info Hoisting mechanics](https://javascript.info/var#var-hoisting)

**Exercises:**

- Predict output of hoisted `var`, `let`, `const` examples.
- Write a “hoisting visualizer” comment block for sample code.

---

#### Day 10 — Temporal Dead Zone (TDZ)

**Read:**

- [Detailed explanation](https://javascript.info/closure#temporal-dead-zone)
- [MDN let/const TDZ explanation](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone)

**Exercises:**

- Create 10 TDZ error examples and explain why each fails.

---

#### Day 11 — Lexical Environment & Scope Chain

**Read:**

- [JS.info Lexical Environment](https://javascript.info/closure#lexical-environment)
- [Deep Explanation](https://medium.com/swlh/lexical-environment-ecmascript-concepts-7d5d53698ef4)

**Exercises:**

- Draw scope chain diagrams for nested closures.
- Write a function that tries to access variables from 3 levels above.

---

### The `this` Keyword

#### Day 12 — this Keyword (Overview & Rules)

**Read:**

- [MDN this](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/this)
- [JS.info this](https://javascript.info/object-methods#this)

**Exercises:**

- Predict `this` for 15 snippets with methods, callbacks, event handlers.

---

#### Day 13 — Implicit Binding (Object Method Calls)

**Read:**

- [JS.info Object Methods](https://javascript.info/object-methods#this)

**Exercises:**

- Show how losing method reference breaks implicit binding.
- Fix it using wrapper functions.

---

#### Day 14 — Method Extraction Pitfalls

**Read:**

- [MDN this pitfalls](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/this#method_binding)

**Exercises:**

- Simulate React-style "callback extraction" issues.
- Patch issues using `bind` + arrow functions.

---

#### Day 15 — Explicit Binding (call, apply, bind)

**Read:**

- [MDN call/apply/bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [JS.info Borrowing Methods](https://javascript.info/object-methods#method-borrowing)

**Exercises:**

- Create utilities that bind functions with preset contexts.
- Implement partial functions using `bind`.

---

#### Day 16 — new Binding & Constructor Functions

**Read:**

- [JS.info new & constructors](https://javascript.info/constructor-new)
- [MDN new operator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/new)

**Exercises:**

- Write constructor functions manually (with prototype).
- Compare constructor vs factory outputs.

---

#### Day 17 — Arrow Functions & this

**Read:**

- [JS.info arrow & this](https://javascript.info/arrow-functions#arrow-functions-have-no-this)

**Exercises:**

- Convert functions to arrows and observe `this` differences.
- Implement event handlers using arrow functions.

---

#### Day 18 — this in Different Contexts

**Read:**

- [MDN Examples](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/this#examples)
- [Blog Explanation](https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/)

**Exercises:**

- Test `this` in:
  - global
  - method
  - function
  - strict mode
  - event handler
  - constructor

---

### Closures

#### Day 19 — What Closures Are & How They Work

**Read:**

- [JS.info Closures](https://javascript.info/closure)
- [MDN Closures](https://developer.mozilla.org/docs/Web/JavaScript/Closures)

**Exercises:**

- Build counting functions using closures.
- Show how nested closures retain outer variables.

---

#### Day 20 — Practical Closure Use Cases

**Read:**

- [Great patterns](https://dmitripavlutin.com/simple-explanation-of-javascript-closures/)

**Exercises:**

- Create closures for:
  - caching/memoization
  - currying
  - DOM event handler factories

---

#### Day 21 — Module Pattern using Closures

**Read:**

- [Revealing Module Pattern](https://toddmotto.com/mastering-the-module-pattern/)

**Exercises:**

- Build a module:
  - public methods
  - private state
- Compare ES6 modules vs closure modules.

---

#### Day 22 — Private Variables via Closures

**Read:**

- [MDN Private variables via closures](https://developer.mozilla.org/docs/Web/JavaScript/Closures#using_closures_in_this_way)

**Exercises:**

- Implement banking account module with private balance.

---

#### Day 23 — Memory Considerations in Closures

**Read:**

- [MDN Memory Management](https://developer.mozilla.org/docs/Web/JavaScript/Memory_Management)
- [Blog on closures & memory leaks](https://javascript.plainenglish.io/closures-and-memory-leaks)

**Exercises:**

- Identify closure-based memory leaks in sample code.
- Rewrite code to avoid unnecessary retained references.

---

### Exit Criteria Checklist (Self-Assessment)

✔ You should be able to:

- Explain execution context, scope chain, lexical environment clearly to someone else.
- Predict `this` value in any environment (method, callback, arrow, strict, constructor).
- Implement closures for real-world problems (modules, currying, memoization).
- Debug scope & `this` bugs confidently without running code.

## Module 1.2: Functions Deep Dive (Until Mastery)

### Function Concepts

#### Day 1 — First-Class Functions

**Read:**

- [JS.info: Functions Are Objects](https://javascript.info/function-object)
- [MDN Function reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions)

**Exercises:**

- Pass functions as arguments in 5 different examples.
- Store a function inside an object and an array.
- Return a function from another function.

---

#### Day 2 — Higher-Order Functions (HOFs)

**Read:**

- [Eloquent JavaScript: Higher-Order Functions](https://eloquentjavascript.net/05_higher_order.html)
- [JS.info Callbacks & HOFs](https://javascript.info/callbacks)

**Exercises:**

- Write 5 HOFs that accept callbacks.
- Implement a logger HOF that wraps any function.

---

#### Day 3 — Callback Functions

**Read:**

- [MDN Callbacks](https://developer.mozilla.org/docs/Glossary/Callback_function)

**Exercises:**

- Convert synchronous code → callback pattern.
- Write a mock API simulation using callback-based design.

---

#### Day 4 — IIFE (Immediately Invoked Function Expressions)

**Read:**

- [MDN IIFE](https://developer.mozilla.org/docs/Glossary/IIFE)
- [JS.info IIFE & Grouping](https://javascript.info/function-expressions#immediately-called-function-expression)

**Exercises:**

- Create a private module using IIFE.
- Use IIFE to isolate global variables.

---

#### Day 5 — Parameters: Default, Rest, Spread

**Read:**

- [Default parameters](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [Rest parameters](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/rest_parameters)
- [Spread syntax](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

**Exercises:**

- Create functions using default config objects.
- Merge arrays and objects using spread.
- Implement a rest-parameter-based `sum()` function.

---

### Advanced Function Patterns

#### Day 6 — Currying (Manual & Using bind)

**Read:**

- [JS.info Currying](https://javascript.info/currying-partials)
- [Functional programming basics](https://javascript.info/function-expressions#currying)

**Exercises:**

- Implement manual `curry(fn)`.
- Implement bind-based curry.
- Write curried versions of `add`, `multiply`, and `discount` calculators.

---

#### Day 7 — Partial Application

**Read:**

- [Partial functions article](https://javascript.info/currying-partials#partial-application)

**Exercises:**

- Write your own `partial(fn, …presetArgs)`.
- Pre-configure a function like `log(level, message)` → `logInfo` → `logWarn`.

---

#### Day 8 — Function Composition (compose / pipe)

**Read:**

- [Compose explained](https://medium.com/dailyjs/functional-js-why-you-should-use-pipe-and-compose-5b29b9bb0c75)
- [Functional concepts](https://mostly-adequate.gitbook.io/mostly-adequate-guide)

**Exercises:**

- Implement `compose(f, g)` → `f(g(x))`.
- Implement a multi-function `compose([...fns])`.
- Use it to build data transformers.

---

#### Day 9 — Pipe Function Implementation

**Read:**

- [Pipe overview](https://ramdajs.com/docs/#pipe)

**Exercises:**

- Implement `pipe(...fns)`.
- Convert imperative code → piped flow: `pipe(trim, toLower, capitalize)`.

---

#### Day 10 — Recursion Deep Dive

**Read:**

- [JS.info Recursion](https://javascript.info/recursion)
- [MDN Recursion examples](https://developer.mozilla.org/docs/Glossary/Recursion)

**Exercises:**

- Implement:
  - factorial
  - fibonacci
  - sum of nested arrays
  - deep clone (recursive)
  - flatten arrays

---

#### Day 11 — Tail Call Optimization (TCO)

**Read:**

- [Tail recursion](https://javascript.info/recursion#optimization)
- [MDN Tail calls (strict mode)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Default_parameters#tail_call_optimizations)

**Exercises:**

- Convert recursive functions → tail-recursive form.
- Compare stack traces with and without TCO patterns.

---

### Practical Implementations

#### Day 12 — Implement Your Own: map, filter, reduce, forEach

**Read:**

- [MDN Array.prototype.map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN filter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN reduce](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

**Exercises:**

- Reimplement:
  - `myMap`
  - `myFilter`
  - `myReduce`
  - `myForEach`
- Compare output to originals.

---

#### Day 13 — Debouncing (from scratch)

**Read:**

- [Debounce explanation](https://www.freecodecamp.org/news/javascript-debounce-example/)
- [Best article](https://davidwalsh.name/javascript-debounce-function)

**Exercises:**

- Implement `debounce(fn, delay)`.
- Apply to scroll → show “scrolling…” only after stop.
- Apply to input search field.

---

#### Day 14 — Throttling (from scratch)

**Read:**

- [Throttle concept](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [Throttle JS](https://lodash.com/docs/#throttle) (reference behavior only)

**Exercises:**

- Implement `throttle(fn, wait)`.
- Use it for window resize event.
- Use it for button spam-prevention.

---

#### Day 15 — Memoization (from scratch)

**Read:**

- [Memoization basics](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Clean article](https://www.freecodecamp.org/news/understanding-memoization-in-javascript/)

**Exercises:**

- Implement `memoize(fn)`.
- Memoize Fibonacci and expensive calculations.
- Cache using `Map`, then try `WeakMap`.

---

#### Day 16 — Once Function (execute only once)

**Read:**

- [Lodash once behavior](https://lodash.com/docs/#once)

**Exercises:**

- Implement `once(fn)`.
- Use it for initialization code (e.g., `connectToDB`).

---

### Exit Criteria

By the end of Module 1.2 you MUST be able to:

✔ Write curry, compose, and pipe from scratch (no lookup, no hints).  
✔ Implement debounce/throttle manually (use closures, timers, and context-binding correctly).  
✔ Solve any recursive problem (from `flatten()` to deep clone, nested tree traversal, DFS, BFS).  
✔ Clearly explain:

- Currying vs partial
- Compose vs pipe
- Why recursion sometimes beats loops
- When memoization is useful
- Why debouncing and throttling solve different UX problems

# Phase 1: JavaScript Fundamentals Mastery

## Module 1.3: Objects & Prototypes (Until Mastery)

### Objects

#### Day 1 — Object Creation Methods

**Read:**

- [JS.info: Object Basics](https://javascript.info/object)
- [MDN Object Creation Patterns](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Exercises:**

- Create objects using:
  - literal
  - constructor (`new Object()`)
  - function constructors
  - `Object.create()`
- Compare all 4 by logging `__proto__`.

---

#### Day 2 — Property Descriptors (writable, enumerable, configurable)

**Read:**

- [MDN defineProperty](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- [JS.info Descriptors](https://javascript.info/property-descriptors)

**Exercises:**

- Create non-writable properties.
- Create non-enumerable properties.
- Freeze one property but not others.
- Compare default vs custom descriptors.

---

#### Day 3 — Object Methods (keys, values, entries, freeze, seal)

**Read:**

- [MDN Object Methods](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

**Exercises:**

- Compare frozen vs sealed vs extensible objects.
- Reimplement `Object.keys` manually using `for…in` & `hasOwnProperty`.

---

#### Day 4 — Property Accessors (getters/setters)

**Read:**

- [MDN getters/setters](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/get)

**Exercises:**

- Implement virtual properties (e.g., `fullName` derived from `firstName`/`lastName`).
- Add validation using setters.

---

#### Day 5 — Object Destructuring & Spread

**Read:**

- [MDN Destructuring](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN Spread Operator](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

**Exercises:**

- Remove a property using destructuring rest.
- Clone nested objects using spread & compare references.

---

### Prototypes

#### Day 6 — What Prototypes Are

**Read:**

- [JS.info Prototype Basics](https://javascript.info/prototype-inheritance)
- [MDN Prototype Inheritance](https://developer.mozilla.org/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

**Exercises:**

- Inspect prototype of objects using `Object.getPrototypeOf`.
- Create a prototype method & call it from multiple objects.

---

#### Day 7 — `__proto__` vs `prototype`

**Read:**

- [JS.info Function Prototype](https://javascript.info/function-prototype)

**Exercises:**

- Show difference between `instance.__proto__` and `Constructor.prototype`.
- Modify prototype & observe instance behavior.

---

#### Day 8 — Prototype Chain

**Read:**

- [MDN Prototype Chain](https://developer.mozilla.org/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

**Exercises:**

- Draw prototype chain for 10 different objects.
- Log lookup failing (search chain until null).

---

#### Day 9 — Constructor Functions

**Read:**

- [JS.info Constructors](https://javascript.info/constructor-new)
- [Prototypes & Constructors](https://javascript.info/native-prototypes)

**Exercises:**

- Build constructor functions for:
  - `User`
  - `Book`
  - `Product`
- Add shared methods via prototype.

---

#### Day 10 — Object.create() for Inheritance

**Read:**

- [MDN Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

**Exercises:**

- Build inheritance without constructors using `Object.create()`.
- Implement a proto-chain manually.

---

#### Day 11 — `instanceof` and How It Works

**Read:**

- [MDN instanceof](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/instanceof)

**Exercises:**

- Reimplement `instanceof` manually.
- Show how changing prototype affects `instanceof`.

---

#### Day 12 — `hasOwnProperty` vs `in` Operator

**Read:**

- [MDN hasOwnProperty](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

**Exercises:**

- Write examples where:
  - property exists in prototype only
  - property exists in object only
  - property is shadowed

---

### Prototypal Inheritance

#### Day 13 — Classical Pattern with Prototypes

**Read:**

- [JS.info Prototype-based Inheritance](https://javascript.info/prototype-inheritance)

**Exercises:**

- Implement a `Person` → `Employee` inheritance using prototypes.

---

#### Day 14 — Constructor Stealing

**Read:**

- [Constructor Stealing](https://developer.mozilla.org/en-US/docs/Glossary/Constructor)

**Exercises:**

- Use `call()` inside constructor to steal properties.

---

#### Day 15 — Parasitic & Parasitic Combination Inheritance

**Read:**

- [Parasitic Inheritance Patterns](https://medium.com/@jmmap/understanding-parasitic-inheritance-in-javascript-8d2c7f444ec4)

**Exercises:**

- Implement parasitic inheritance.
- Optimize prototype chain for efficiency.

---

#### Day 16 — Prototypal Patterns Overview

**Read:**

- [Prototypal Patterns Summary](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#prototypepatternjavascript)

**Exercises:**

- Implement inheritance using mixins, `Object.create`, and prototypes.

---

### Module 1.3 Exit Criteria

✔ Draw the prototype chain & explain lookup rules  
✔ Implement inheritance without classes  
✔ Debug prototype issues  
✔ Explain difference between prototype, `__proto__`, constructor  
✔ Implement custom `instanceof`

# Phase 1: JavaScript Fundamentals Mastery

## Module 1.4: OOP in JavaScript (Until Mastery)

### ES6 Classes

#### Day 17 — Class Declarations & Expressions

**Read:**

- [MDN Class](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes)
- [JS.info Classes](https://javascript.info/class)

**Exercises:**

- Create class using declaration & expression.
- Add multiple instance methods & properties.

---

#### Day 18 — Constructor, Instance, Static Methods

**Read:**

- [JS.info Class Properties](https://javascript.info/class#class-properties)

**Exercises:**

- Create static helper methods.
- Explain why static methods are not part of the prototype.

---

#### Day 19 — Public Fields & Private Fields

**Read:**

- [MDN Private Fields (#)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes/Private_class_fields)

**Exercises:**

- Implement class with validation using private fields.
- Expose controlled getters/setters.

---

#### Day 20 — Getters & Setters in Classes

**Read:**

- [MDN Class Accessors](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes#private_methods)

**Exercises:**

- Add computed properties (e.g., `priceWithTax`).
- Add setter constraints (e.g., prevent negative values).

---

### The Four OOP Pillars

#### Day 21 — Encapsulation

**Read:**

- [Closures for Encapsulation](https://javascript.info/closure)
- [Module Pattern](https://toddmotto.com/mastering-the-module-pattern)

**Exercises:**

- Rewrite class-based encapsulation using closures.
- Create revealing module pattern with private state.

---

#### Day 22 — Inheritance

**Read:**

- [JS.info extends/super](https://javascript.info/class-inheritance)

**Exercises:**

- Build class `Employee` extending `Person`.
- Override methods using `super`.
- Inspect prototype chain for classes.

---

#### Day 23 — Polymorphism

**Read:**

- [Duck Typing in JS](https://medium.com/better-programming/duck-typing-in-javascript-be2e3b39b43f)

**Exercises:**

- Create polymorphic `render()` method for multiple shapes.
- Build payment processors implementing the same interface.

---

#### Day 24 — Abstraction

**Read:**

- [JS Abstraction Ideas](https://javascript.info/class#abstract-classes)

**Exercises:**

- Simulate abstract class by throwing errors in base method.
- Implement interface-like patterns using objects.

---

### SOLID Principles

#### Day 25 — SRP & OCP

**Read:**

- [SRP/OCP Explained for JS](https://medium.com/swlh/solid-principles-with-javascript)

**Exercises:**

- Refactor class violating SRP.
- Apply OCP using function composition & inheritance.

---

#### Day 26 — LSP & ISP

**Read:**

- [Liskov Substitution Principle](https://medium.com/better-programming/liskov-substitution-principle)
- [Interface Segregation Principle](https://www.freecodecamp.org/news/interface-segregation-principle/)

**Exercises:**

- Create subclasses that fail LSP → fix them.
- Break one big class into multiple interfaces.

---

#### Day 27 — Dependency Inversion Principle

**Read:**

- [DIP Explained](https://javascript.plainenglish.io/solid-javascript-dip)

**Exercises:**

- Apply DIP using dependency injection.
- Create Logger interface & inject different loggers.

---

### Composition vs Inheritance

#### Day 28 — Composition & Mixins

**Read:**

- [Composition over Inheritance](https://javascript.info/mixins)
- [Mixins Deep Dive](https://www.patterns.dev/posts/mixin-pattern/)

**Exercises:**

- Build mixins: `EventEmitter`, `Logger`, `Validator`.
- Compose object capabilities using functions.

---

#### Day 29 — When to Use Composition vs Inheritance

**Read:**

- [Composition Patterns Video](https://www.youtube.com/watch?v=wfMtDGfHWpA)

**Exercises:**

- Rewrite inheritance-heavy system → composition.
- Show trade-offs for both patterns.

---

### Design Patterns (Days 30–39)

**Read:**

- [Essential JS Patterns (Addy Osmani)](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

**Your Patterns:**

- Day 30 — Factory Pattern
- Day 31 — Constructor Pattern
- Day 32 — Singleton Pattern
- Day 33 — Module Pattern
- Day 34 — Observer Pattern (Pub/Sub)
- Day 35 — Strategy Pattern
- Day 36 — Decorator Pattern
- Day 37 — Facade Pattern
- Day 38 — Proxy Pattern
- Day 39 — Command Pattern

**Exercises (for each pattern):**

- Implement from scratch with real-world examples.
- Compare pattern vs alternative approaches.

---

### Practice Projects

Choose any order:

1. Library Management System → inheritance, encapsulation
2. Game Character System → polymorphism, composition
3. Payment Processing System → strategy pattern
4. Notification System → observer pattern
5. Shape Calculator → inheritance + polymorphism
6. Plugin Architecture → factory + composition
7. Undo/Redo System → command pattern
8. Access Control System → proxy pattern

---

### Module 1.4 Exit Criteria

✔ Explain all 4 OOP pillars with code  
✔ Implement all SOLID principles  
✔ Choose composition vs inheritance intentionally  
✔ Implement 8–10 design patterns from scratch  
✔ Build OOP systems & refactor procedural → OOP  
✔ Debug prototype/class inheritance issues instantly

✅ Module 1.5 — Asynchronous JavaScript (Until Mastery)
Topic-Wise Free Learning Resources (Best on the Web)

🔹 Callbacks
Callback pattern

- MDN — Callback functions (official):https://developer.mozilla.org/docs/Glossary/Callback_function
- JavaScript.info — Callbacks intro:https://javascript.info/callbacks
  Callback hell & pyramid of doom
- MDN — “Introduction to callbacks” (scroll to nested callbacks):https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Callbacks
- Node.js docs — Callback conventions:https://nodejs.org/en/docs/guides/blocking-vs-non-blocking
  Error-first callbacks
- Node.js official error-first pattern:https://nodejs.org/en/knowledge/errors/what-are-the-error-conventions/
  Callback limitations
- Article (clean & clear):https://javascript.info/callbacks#pyramid-of-doom

🔹 Promises
Creating promises (new Promise)

- MDN — Promise constructor:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise
- JavaScript.info — Promise basics:https://javascript.info/promise-basics
  Promise states (pending/fulfilled/rejected)
- MDN — Promise states explained:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#description
  then(), catch(), finally()
- MDN — Promise methods:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
  Promise chaining
- JS.info — chaining promises (the best explanation):https://javascript.info/promise-chaining
  Error handling in chains
- JS.info — error propagation:https://javascript.info/promise-error-handling
  Promise utilities
- Promise.all (parallel, fail fast):https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
- Promise.race (first to settle):https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
- Promise.allSettled (complete all, collect results):https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
- Promise.any (first fulfilled):https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

🔹 Async/Await
async function syntax

- MDN — async functions:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function
  await keyword
- MDN — await:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await
  Error handling — try/catch
- JS.info — async/await with error handling:https://javascript.info/async-await#error-handling
  Parallel execution using async/await
- JS.info — Running promises in parallel:https://javascript.info/async-await#parallel-running
  Sequential vs Parallel patterns
- Best explanation:https://javascript.info/async-await#await-in-loop
  Top-level await
- MDN — Top-level await:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await#top-level-await

🔹 Event Loop
Call stack, Web APIs, queues

- Philip Roberts’ legendary event loop article (the OG):https://v8.dev/blog/event-loop
  Callback queue (macrotask queue)
- Jake Archibald — Tasks, microtasks, queues:https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
  Microtask queue (Promises)
- MDN — Microtasks & event loop:https://developer.mozilla.org/docs/Web/API/HTML_DOM_API/Microtask_guide
  Event loop phases
- Node.js event loop phases explained:https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick
  Microtask vs macrotask priority
- Great breakdown:https://javascript.info/microtask-queue
  Visualization of execution order
- JS visualizer:https://www.jsv9000.app

🔹 Advanced Async Patterns
Promisifying callback-based functions

- JS.info — Promisify tutorial:https://javascript.info/promisify
  Build a custom Promise from scratch
- Advanced but simple guide:https://dev.to/lydiahallie/creating-your-own-promise-1k1f
- Step-by-step from JS.info:https://javascript.info/promise-basics#appendix-promise-mini-implementation
  Async queue with concurrency limit
- Concept explanation (Promise concurrency):https://javascript.info/promise-basics#promise-queue
- Implementation article:https://github.com/promise-n/promise-map
  Retry logic implementation
- Retry pattern explained:https://javascript.info/async-await#retrying
  Timeout wrapper
- Guide with explanation:https://dmitripavlutin.com/timeout-promise/
  Race with timeout
- Simple implementation article:https://kentcdodds.com/blog/use-promise-race-to-implement-a-request-timeout
  Parallel execution with limit
- Clean implementation:https://github.com/rxaviers/async-pool

🔹 Generators & Iterators
Iterator protocol

- MDN — Iterators explained:https://developer.mozilla.org/docs/Web/JavaScript/Guide/Iterators_and_Generators
  Generator functions (function)\*
- MDN — function*:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*
  yield keyword
- MDN — yield:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/yield
  Generators as iterators
- JS.info — Generators introduction:https://javascript.info/generators
  Async generators
- MDN — async generator functions:https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for-await...of
  for...of with generators
- MDN — Iteration protocols section:https://developer.mozilla.org/docs/Web/JavaScript/Guide/Iterators_and_Generators#the_iterator_protocol

🎯 EXIT CRITERIA — Must Accomplish
✅ 1. Implement a Promise from scratch

- States: pending → fulfilled/rejected
- Store callbacks
- Async execution of then() handlers
- Support chaining
  ✅ 2. Predict event loop execution order
  Given tasks like:

console.log(1)
setTimeout(()=>console.log(2))
Promise.resolve().then(()=>console.log(3))
console.log(4)
You should confidently predict outputs.
✅ 3. Solve async race conditions

- Implement raceWithTimeout
- Implement “request cancellation” using AbortController
  ✅ 4. Build async utilities
  You must be able to implement:
- retry(fn, retries)
- withTimeout(promise, ms)
- asyncPool(limit, tasks)
- promisify(fn)
  ✅ 5. Explain microtask vs macrotask queue
  In terms of:
- execution priority
- scheduling differences
- real browser examples

✅ Module 1.6 — Functional Programming in JavaScript (Until Mastery)
Daily Plan (Format Exactly Like Your Example)

Day 1 — Pure Functions & Side Effects
Read:MDN → What is a Pure Function:https://developer.mozilla.org/en-US/docs/Glossary/Pure_function
FreeCodeCamp → Pure Functions Explained:https://www.freecodecamp.org/news/what-are-pure-functions/
Exercises:

- Convert 5 impure functions (using Date, Math.random, DOM, global vars) into pure versions.
- Write a pure calculateTotal(cart) with no mutation.

Day 2 — Immutability Basics
Read:MDN → Immutability definition:https://developer.mozilla.org/en-US/docs/Glossary/Immutable
Redux Docs (best immutability guide):https://redux.js.org/usage/structuring-reducers/immutable-update-patterns
Exercises:

- Update objects/arrays immutably (no direct mutations).
- Convert a mutating function (push, splice) into a non-mutating version.

Day 3 — Declarative vs Imperative
Read:Imperative vs Declarative:https://ui.dev/imperative-vs-declarative-programming
Exercises:

- Convert imperative loops (for, while) into declarative array methods.
- Rewrite a 20-line imperative script into a 5-line declarative version.

Day 4 — map() Implementation & Practice
Read:MDN map():https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
Exercises:

- Implement your own myMap().
- Rewrite three loops using map().

Day 5 — filter() & reduce() (Implement from Scratch)
Read:filter → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filterreduce → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
Exercises:

- Implement myFilter() and myReduce().
- Build a reduce-powered analytics function (sum, groupBy, countBy).

Day 6 — Additional Array Methods
Read:some → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/someevery → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/everyfind → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
Exercises:

- Implement myFind, mySome, myEvery.
- Recreate a mini Lodash searchUtils file.

Day 7 — flat(), flatMap() & Method Chaining
Read:flat → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatflatMap → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
Exercises:

- Flatten deeply nested arrays using custom recursion.
- Build a chained transformation pipeline:users.flatMap().filter().map().reduce()
-

Day 8 — Performance Considerations in FP
Read:Array performance cost:https://medium.com/@omergoldberg/the-performance-cost-of-array-prototype-functions-in-javascript-7e53f58fd476
Exercises:

- Benchmark for vs map vs reduce.
- Identify 3 FP operations that cause unnecessary iterations.

Day 9 — Immutability: Spread, assign(), cloning
Read:Spread Operator → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntaxObject.assign → https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assignstructuredClone → https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
Exercises:

- Deep clone without JSON methods.
- Convert a "mutating" Redux reducer into a fully immutable reducer.

Day 10 — Immer & Immutable.js Concepts
Read:Immer.js → https://immerjs.github.io/immer/Immutable.js → https://immutable-js.com/
Exercises:

- Rewrite a reducer using Immer.
- Create an immutable list using Immutable.js Maps/Sets.

Day 11 — Currying (Implement Your Own curry())
Read:Currying → https://javascript.info/currying-partials
Exercises:

- Implement curry(fn) → must handle multiple arguments.
- Curry your own utility functions (sum, multiply, filterBy).

Day 12 — Partial Application
Read:Partial application guide:https://www.geeksforgeeks.org/partial-function-application-in-javascript/
Exercises:

- Implement partial(fn, ...presetArgs).
- Use partials to build reusable discount(0.1) functions.

Day 13 — Function Composition (compose & pipe)
Read:Function composition →https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-d5425f3982c4
Exercises:

- Implement compose() (right-to-left).
- Implement pipe() (left-to-right).
- Build a data pipeline with compose + map/filter.

Day 14 — Point-Free Style & Lazy Evaluation
Read:Point-free JS →https://medium.com/javascript-scene/tackling-a-large-javascript-codebase-with-pointfree-functional-style-89c2b3d65c7f
Lazy evaluation →https://ui.dev/lazy-evaluation/
Exercises:

- Convert 5 functions into point-free versions.
- Build a lazy range generator.

Day 15 — Transducers (Advanced)
Read:Transducers JS → https://github.com/cognitect-labs/transducers-js
Exercises:

- Build a transducer:
  - map + filter → single pass
- Run the transducer on a 1M-element array and measure improvement.

Day 16 — Monads (Beginner-Level)
Read:Monads for beginners:https://dev.to/rametta/monads-in-javascript-for-dummies-4g58
Exercises:

- Build a simple Maybe monad.
- Wrap a nullable API response using Maybe.

Day 17 — Refactoring Imperative → Declarative
Read:Declarative/Functional rewrite examples:https://www.freecodecamp.org/news/imperative-vs-declarative-programming/
Exercises:

- Rewrite 10 loops into FP alternatives.
- Convert nested conditionals into pipelines.

Day 18 — Reducers & State Management
Read:Reducers (Redux docs):https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
Exercises:

- Implement your own reducer engine (mini Redux).
- Convert repeated setter functions into a reducer-based pattern.

Day 19 — Data Transformation Pipelines
Read:JS pipelines:https://medium.com/serverlessguru/functional-programming-in-javascript-data-pipelines-1a0ae5806f7f
Exercises:

- Build a pipeline that processes:users → filter → map → group → reduce.
- Create a reusable pipeline utility.

Day 20 — Functional Programming in React
Read:Pure components → https://react.dev/learn/keeping-components-pureuseReducer logic → https://kentcdodds.com/blog/how-to-implement-usestate-with-a-reducer
Exercises:

- Convert stateful React logic into pure reducer functions.
- Build a small FP-based component (no class components).

🎯 Exit Criteria (Mastery)
You can move to the next module ONLY if you can:
✔ Write point-free declarative functions
✔ Implement compose() and pipe() from scratch
✔ Implement curry(), partial(), and lazy iterators
✔ Implement your own map/filter/reduce
✔ Explain immutability deeply (structural sharing, cloning, spread)
✔ Convert any imperative code to FP-style cleanly
✔ Decide FP vs OOP trade-offs (performance, readability, domains)

✅ Module 1.7 — ES6+ FEATURES (UNTIL MASTERY)

Day 1 — Object Destructuring (Basics)
Read:MDN — Destructuring assignment: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignmentJS.Info — Destructuring: https://javascript.info/destructuring-assignment
Exercises:

- Extract {a, b} from {a:1, b:2, c:3} and rename them to {x:a, y:b}.
- Use destructuring to swap two variables without a temp var.
- Destructure with defaults: extract {name = 'Anon', age = 0}.

Day 2 — Array Destructuring & Rest in Destructuring
Read:MDN — Array destructuring examples: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuringJS.Info — Array destructuring: https://javascript.info/destructuring-assignment#array-destructuring
Exercises:

- Extract first, second, and rest: [first, second, ...rest].
- Skip elements: [ , , third] = [1,2,3,4].
- Use destructuring in function params to pick first 2 args and gather rest.

Day 3 — Nested Destructuring & Defaults
Read:MDN — Nested destructuring: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#nestingJS.Info — Nested patterns: https://javascript.info/destructuring-assignment#nested-destructuring
Exercises:

- Destructure { user: { name, address: { city } } } safely with defaults.
- Extract deeply nested array values with defaults.

Day 4 — Destructuring in Function Parameters
Read:MDN — Function parameters & destructuring: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions#parameter_handlingJS.Info — Destructuring in params: https://javascript.info/destructuring-assignment#function-parameters
Exercises:

- Write function createUser({name='Anon', role='guest'} = {}) {} and call safely without args.
- Implement a fetchWithConfig({url, method='GET', headers={}}) signature.

Day 5 — Spread Operator for Arrays & Objects
Read:MDN — Spread syntax: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax
Exercises:

- Merge arrays immutably: a=[1,2]; b=[3,4]; [...a, ...b].
- Merge objects: {...defaults, ...overrides}.
- Implement pushImmutable(arr, item) using spread.

Day 6 — Rest Parameters in Functions & Shallow vs Deep Copy
Read:MDN — Rest parameters: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/rest_parametersArticle — shallow vs deep copy: https://developer.mozilla.org/docs/Glossary/Deep_copy
Exercises:

- Implement sum(...nums) using rest.
- Show a shallow copy bug: copy top-level then mutate nested property — explain why.
- Use structuredClone to deep copy an object and compare.

Day 7 — Template Literals & Tagged Templates
Read:MDN — Template strings: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literalsMDN — Tagged templates: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
Exercises:

- Build multi-line HTML string with template literals.
- Create a simple tagged template safeHTML that escapes </> to prevent injection.
- Implement localization placeholder tag that uppercases certain tokens.

Day 8 — Symbols & Well-Known Symbols
Read:MDN — Symbol: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SymbolMDN — Well-known symbols: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols
Exercises:

- Create a Symbol-based private key on an object and show it’s non-enumerable.
- Implement obj[Symbol.toStringTag] = 'MyType' and inspect Object.prototype.toString.call(obj).
- Use Symbol.iterator in a custom object (preview for later).

Day 9 — Iterator Protocol & Creating Custom Iterables
Read:MDN — Iterators and generators: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Iterators_and_GeneratorsJS.Info — Iterables & iterators: https://javascript.info/iterable
Exercises:

- Create range(n) iterable using manual iterator object { next() { ... } }.
- Use for...of to loop range(5).
- Implement [Symbol.iterator]() on an object to make it iterable.

Day 10 — Generator Functions & yield
Read:MDN — Generator functions: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function*JS.Info — Generators: https://javascript.info/generators
Exercises:

- Implement function\* idMaker() { let id=1; while(true) yield id++; }.
- Use generator to lazily produce Fibonacci numbers and take first N.
- Consume generator with for...of and manual next().

Day 11 — Async Generators & for-await-of
Read:MDN — Async generators & for await...of: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/for-await...of
Exercises:

- Simulate streaming data with an async generator that awaits delays and yields chunks.
- Consume it with for await (const chunk of stream) {}.

Day 12 — Proxy Basics: get / set / has / deleteProperty
Read:MDN — Proxy: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy
Exercises:

- Create a validation proxy that enforces types on set.
- Build a proxy that logs all get accesses for debugging.
- Implement a proxy that prevents deletion of certain props.

Day 13 — Reflect API & Use Cases
Read:MDN — Reflect: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Reflect
Exercises:

- Reimplement a set using Reflect.set inside a proxy handler.
- Use Reflect.construct to call a constructor with an arguments array.
- Demonstrate Reflect.ownKeys() vs Object.keys().

Day 14 — Practical Proxy Use-cases (Validation, Tracking, Negative Indices)
Read:Article: Proxy use-cases & examples: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Proxies
Exercises:

- Create an array proxy supporting negative indices (arr[-1] → last element).
- Implement a reactive watcher (basic): proxy that calls a callback on writes.
- Build an access-control proxy that forbids reading certain keys.

Day 15 — Map, Set, WeakMap, WeakSet
Read:MDN — Map: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/MapMDN — Set: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SetMDN — WeakMap / WeakSet: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
Exercises:

- Use Map to count word frequencies from a large text.
- Use Set to deduplicate an array.
- Attach private data to objects with WeakMap and show GC friendliness (explain conceptually).

Day 16 — Module System: ES6 Modules (import / export)
Read:MDN — Modules: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules
Exercises:

- Create math.js with named exports and import them in app.js.
- Export a default function and import it with a custom name.
- Demonstrate circular import caveat with two small modules and explain the behavior.

Day 17 — Dynamic Imports & Code-Splitting
Read:MDN — Dynamic import(): https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/importWebpack / general: dynamic import for code splitting (concept)
Exercises:

- Use const module = await import('./utils.js') in an async function.
- Implement conditional dynamic import (load heavy chart lib only when needed).
- Measure bundle-splitting effect (conceptually / with a bundler if available).

Day 18 — CommonJS vs ES Modules (Node & Browser Differences)
Read:Node docs — Modules guide: https://nodejs.org/api/modules.htmlMDN — Modules in browsers & Node: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules#modules_in_browsers
Exercises:

- Convert a small CommonJS module.exports file to ES module syntax.
- Explain differences: sync vs async loading, hoisting, top-level this, require() behavior.

Day 19 — Advanced Iterables & Custom Collections
Read:MDN — Iterables deep: https://developer.mozilla.org/docs/Web/JavaScript/Guide/Iterators_and_Generators
Exercises:

- Implement a custom LinkedList that is iterable ([Symbol.iterator]), supports for...of.
- Add map/filter methods that return new iterable instances (lazy).

Day 20 — Final Project & Mastery Problems
Read:Review MDN sections referenced above as needed.
Exercises (Project):

- Build a small library that exposes:
  - createRange(start, end) → iterable + generator-based implementation
  - makeReactive(obj, onChange) → Proxy-based reactivity (shallow)
  - negativeIndexArray() → array-like proxy supporting negative indices
  - An ES module package that exports these utilities with named + default exports
- Write tests (node / vitest / jest) that validate behavior.

🎯 Exit Criteria — What “Mastery” Looks Like
You should be able to:

- Use destructuring, spread/rest, template literals, and symbols fluently in day-to-day code.
- Implement custom iterables (manual iterator & generator-based) and use them idiomatically.
- Build practical Proxy use-cases: validation, reactivity (basic), negative indexing, access control.
- Explain and choose between Map/Object and when to use WeakMap/WeakSet.
- Understand ES modules deeply (named vs default, dynamic import, circular import caveats, Node vs browser differences).
- Package a small ES module library that uses modern features and can be imported dynamically.

✅ Module 2.1 — TYPESCRIPT FUNDAMENTALS (UNTIL MASTERY)

Day 1 — Installing TypeScript & Basic CLI Usage
Read:

- Official Handbook — Getting Started: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- TS CLI: https://www.typescriptlang.org/docs/handbook/compiler-options.html
  Exercises:
- Install TS globally & locally: npm i -D typescript.
- Compile a .ts file using tsc file.ts.
- Create a small script that prints “Hello TS”.

Day 2 — tsconfig.json Deep Dive
Read:

- tsconfig reference: https://www.typescriptlang.org/tsconfig
- Understanding the config: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  Exercises:
- Generate config: tsc --init.
- Edit these and see effects:
  - "target"
  - "module"
  - "rootDir" vs "outDir"
  - "strict"
- Break the project intentionally and fix path issues.

Day 3 — Compiler Options (Strict Mode, Module, Target)
Read:

- Strict mode: https://www.typescriptlang.org/tsconfig#strict
- Module resolution: https://www.typescriptlang.org/docs/handbook/module-resolution.html
  Exercises:
- Enable strict mode and fix errors.
- Compare "module": "esnext" vs "commonjs".
- Change "target" to ES5, ES6, and ES2020 and check output JS.

Day 4 — Project References & Path Mapping
Read:

- Project references: https://www.typescriptlang.org/docs/handbook/project-references.html
- Path mapping: https://www.typescriptlang.org/tsconfig#paths
  Exercises:
- Create a multi-package project: /core, /utils, /app.
- Add "composite": true and configure references.
- Add path aliases:"paths": { "@core/_": ["src/core/_"] }
-
- Import using alias.

Day 5 — Primitive Types (string, number, boolean)
Read:

- Basic Types: https://www.typescriptlang.org/docs/handbook/basic-types.html
- JS.Info TS Basics: https://javascript.info/typescript
  Exercises:
- Annotate variables with primitives.
- Write a function that accepts only numbers and returns string.
- Force incorrect type assignments and fix them.

Day 6 — Arrays & Tuples
Read:

- Arrays: https://www.typescriptlang.org/docs/handbook/basic-types.html#array
- Tuples: https://www.typescriptlang.org/docs/handbook/basic-types.html#tuple
  Exercises:
- Create typed arrays: number[], Array<string>.
- Build tuple: [string, number, boolean] and use it.
- Tuple with optional elements and rest tuple: [string, ...number[]].

Day 7 — Enums (Numeric, String, Const, Computed)
Read:

- Enums: https://www.typescriptlang.org/docs/handbook/enums.html
  Exercises:
- Create numeric enum, string enum, and const enum.
- Create computed enum values.
- Explain why const enums remove code from JS output.

Day 8 — any, unknown, never, void
Read:

- any: https://www.typescriptlang.org/docs/handbook/basic-types.html#any
- unknown: https://www.typescriptlang.org/docs/handbook/basic-types.html#unknown
- never: https://www.typescriptlang.org/docs/handbook/basic-types.html#never
- void: https://www.typescriptlang.org/docs/handbook/basic-types.html#void
  Exercises:
- Convert any to unknown and safely narrow it.
- Write a function that returns never (throw).
- Create callbacks that return void.

Day 9 — null, undefined & strictNullChecks
Read:

- Null & undefined: https://www.typescriptlang.org/docs/handbook/basic-types.html#null-and-undefined
- strictNullChecks: https://www.typescriptlang.org/tsconfig#strictNullChecks
  Exercises:
- Enable strictNullChecks and fix failures.
- Handle undefined safely using optional chaining.
- Write a function returning string | null.

Day 10 — Type Assertions (as, angle-bracket)
Read:

- Type Assertions: https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions
  Exercises:
- Cast DOM element:const input = document.querySelector('input') as HTMLInputElement;
-
- Convert JSON.parse result using assertion.
- Lift type from unknown using assertion.

Day 11 — Type Inference Basics
Read:

- Inference: https://www.typescriptlang.org/docs/handbook/type-inference.html
  Exercises:
- Let TS infer all possible types and avoid annotation.
- Check contextual typing in functions:['a','b','c'].forEach(str => { ... })
-
- Create a variable with broad vs narrow inference.

Day 12 — When to Annotate vs Let Inference Work
Read:

- Best practices (guide): https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
  Exercises:
- Annotate only function parameters and return types.
- Remove unnecessary annotations.
- Identify places where inference needs help.

Day 13 — Union Types (A | B)
Read:

- Unions: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
  Exercises:
- Build a function accepting number | string.
- Create a type representing success | error shapes.
- Narrow using typeof, in, instanceof.

Day 14 — Intersection Types (A & B)
Read:

- Intersections: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#intersection-types
  Exercises:
- Combine two interfaces into one type.
- Create a type that merges user + permissions.
- Build a function that enforces both types.

Day 15 — Discriminated Unions
Read:

- Discriminated unions: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminating-unions
  Exercises:
- Create shapes:type Circle = { type:'circle', radius:number }
- type Square = { type:'square', side:number }
-
- Build a function that switches on type and returns area.
- Add exhaustiveness check using never.

Day 16 — Type Guards (typeof, instanceof, custom guards)
Read:

- Type guards: https://www.typescriptlang.org/docs/handbook/2/narrowing.html
  Exercises:
- Implement function isNumber(x: any): x is number.
- Narrow unknown values safely.
- Build class-based guards with instanceof.

Day 17 — Literal Types (String, Numeric, Boolean)
Read:

- Literal types: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types
  Exercises:
- Create function accepting "success" | "error" only.
- Build numeric literal type and limit allowed values.
- Use boolean literal types to enforce on/off modes.

Day 18 — Template Literal Types
Read:

- Template literal types:https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
  Exercises:
- Build type:type EventName = `on${string}`
-
- Create URL types:type HTTPMethod = 'GET' | 'POST'
- type Endpoint = `${HTTPMethod} /api/${string}`
-
- Enforce allowed property keys using template types.

Day 19 — Build a Mini TS Project
Project Tasks:

- Create tsconfig with strict mode, path mapping, module=ESNext, target=ES2020.
- Create modules: /lib/math.ts, /models/user.ts, /utils/helpers.ts.
- Use:
  - unions
  - intersections
  - literal types
  - template literal types
  - type guards
- Compile and run with ts-node or node --loader ts-node/esm.

Day 20 — Mastery Problems
Exercises:

- Convert a JS module to TS with full typing (dom + generics if needed).
- Build a function that returns:
  - success object → { status:'ok', data:T }
  - error object → { status:'error', message:string }using discriminated unions.
- Create a reusable type guard library.
- Model a small user permissions system using literal & intersection types.

🎯 EXIT CRITERIA (WHAT “MASTERY” LOOKS LIKE)
You should be able to:

- Configure a TS project from scratch with strict mode, paths, references.
- Choose appropriate types: unions, intersections, literals, tuples, unknown, never.
- Know when to annotate vs trust inference.
- Write safe type guards for narrowing complex unions.
- Design small modules with strong, ergonomic type modeling.
- Understand TS compiler behavior (target/module differences, strict flags, declaration output).

✅ Module 2.2 — TypeScript Intermediate (Until Mastery)

## Day 1 — Interfaces: Declaration, Optional & Readonly Properties

**Read:**

- [Official Handbook — Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [Optional & readonly](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties)

**Exercises:**

- Declare an interface `User` with `name`, `age`, and optional `email`.
- Add a readonly `id` property.
- Try changing `id` and note the compiler error.

---

## Day 2 — Interfaces: Index Signatures & Extending

**Read:**

- [Index signatures](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures)
- [Extending interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html#extending-interfaces)

**Exercises:**

- Create an interface `Dictionary` with `[key: string]: string`.
- Create `Admin` interface extending `User` with extra `role`.

---

## Day 3 — Implementing Interfaces in Classes & Interface vs Type

**Read:**

- [Classes & interfaces](https://www.typescriptlang.org/docs/handbook/classes.html#implementing-interfaces)
- [Type vs Interface](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

**Exercises:**

- Implement `User` interface in a `UserClass`.
- Try converting interface to type alias. Observe differences.

---

## Day 4 — Type Aliases: Basic & Unions/Intersections

**Read:**

- [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [Unions & intersections](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

**Exercises:**

- Create type aliases for `StringOrNumber = string | number`.
- Create `AdminUser = User & { role: string }`.

---

## Day 5 — Functions: Type Annotations, Optional & Default Parameters

**Read:**

- [Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

**Exercises:**

- Create functions with typed parameters & return types.
- Add optional and default parameters.
- Check compiler errors for missing arguments.

---

## Day 6 — Functions: Rest Parameters, Overloads, `this`

**Read:**

- [Rest parameters](https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters)
- [Function overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#overloads)
- [`this` parameter](https://www.typescriptlang.org/docs/handbook/2/functions.html#this-parameters)

**Exercises:**

- Create a function `sum(...nums: number[])`.
- Create a function with overloads for `string` and `number`.
- Create a method using `this` type in a class.

---

## Day 7 — Functions: Call & Construct Signatures

**Read:**

- [Call & construct signatures](https://www.typescriptlang.org/docs/handbook/interfaces.html#function-types)

**Exercises:**

- Define an interface for a function type `(x: number, y: number) => number`.
- Define a construct signature for a class factory interface.

---

## Day 8 — Classes: Property Types, Access Modifiers, Readonly

**Read:**

- [Classes](https://www.typescriptlang.org/docs/handbook/classes.html)
- [Access modifiers](https://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers)

**Exercises:**

- Create a class `Employee` with `public`, `private`, `protected` properties.
- Add readonly property `id`.
- Try accessing properties from outside the class.

---

## Day 9 — Classes: Parameter Properties, Abstract Classes & Static Members

**Read:**

- [Parameter properties & abstract classes](https://www.typescriptlang.org/docs/handbook/classes.html#parameter-properties)
- [Static members](https://www.typescriptlang.org/docs/handbook/classes.html#static-properties)

**Exercises:**

- Convert constructor parameters to parameter properties.
- Create an abstract class `Shape` with abstract `area()` method.
- Create a static counter property in a class.

---

## Day 10 — Generics: Basics, Constraints, Multiple Parameters

**Read:**

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

**Exercises:**

- Create generic function `identity<T>(arg: T): T`.
- Create a generic interface `KeyValue<K, V>`.
- Add constraints: `T extends { name: string }`.
- Use multiple type parameters: `Pair<K, V>`.

---

## ✅ Exit Criteria

By the end of Day 10, you should be able to:

- Decide when to use interface vs type.
- Write type-safe functions and classes.
- Implement and use generics confidently.
- Understand and enforce access modifiers in classes.

# Module 2.3: TypeScript Advanced — 10-Day Plan

---

## Day 1 — Advanced Generics: Constraints & Defaults

**Read:**

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Generic constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
- [Default generic types](https://www.typescriptlang.org/docs/handbook/2/generics.html#default-generic-types)

**Exercises:**

- Create generic function `getProperty<T, K extends keyof T>(obj: T, key: K)`
- Create generic class with default type parameter
- Experiment with `extends` and type parameters in constraints

---

## Day 2 — Conditional Types & `infer` Keyword

**Read:**

- [Conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Distributive conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)

**Exercises:**

- Write conditional types `IsString<T>` returning `"Yes"` | `"No"`
- Use `infer` to extract return type of a function

---

## Day 3 — Utility Types Part 1

**Read:**

- [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

**Exercises:**

- Use `Partial<T>` and `Required<T>` on interfaces
- Apply `Readonly<T>` and test immutability
- Experiment with `Pick<T, K>` and `Omit<T, K>`

---

## Day 4 — Utility Types Part 2

**Read:**

- [Utility types continuation](https://www.typescriptlang.org/docs/handbook/utility-types.html)

**Exercises:**

- Use `Record<K, T>` to create typed objects
- Apply `Exclude<T, U>` and `Extract<T, U>`
- Experiment with `NonNullable<T>`, `ReturnType<T>`, `Parameters<T>`
- Use `InstanceType<T>` and `Awaited<T>`

---

## Day 5 — Mapped Types & Custom Utilities

**Read:**

- [Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

**Exercises:**

- Create a mapped type that makes all properties optional or readonly
- Remap keys with `as`
- Use template literal types to create new types
- Build a small custom utility type

---

## Day 6 — Type Manipulation

**Read:**

- [Type operators](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [Indexed access types & conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

**Exercises:**

- Experiment with `keyof`, `typeof`, `T[K]`
- Create a recursive type for nested objects
- Play with template literal types in types

---

## Day 7 — Type Guards & Narrowing

**Read:**

- [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

**Exercises:**

- Use `typeof` and `instanceof` guards
- Write custom type guards (`isString`, `isUser`)
- Practice discriminated unions
- Apply `in` operator and truthiness narrowing

---

## Day 8 — Advanced Patterns: Declarations & Modules

**Read:**

- [Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
- [Module augmentation & namespaces](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
- [Ambient declarations](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

**Exercises:**

- Merge interfaces and namespaces
- Augment a module with new types
- Write a `.d.ts` file for a small library
- Use triple-slash directives

---

## Day 9 — Decorators Basics

**Read:**

- [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

**Exercises:**

- Create class, method, property, and parameter decorators
- Build a decorator factory that accepts parameters
- Use metadata reflection with decorators

---

## Day 10 — Consolidation & Projects

**Exercises / Mini Projects:**

- Combine advanced generics, utility types, mapped types, and type guards in a single small project
- Example: Build a type-safe API client with generics and conditional types
- Implement custom utility types for a mock project
- Test type-safety with complex library-like types

---

## ✅ Exit Criteria

By the end of Day 10, you should be able to:

- Create custom utility types
- Write complex generic constraints
- Build type-safe APIs
- Read and understand complex library types
- Implement advanced type patterns in TypeScript

# Module 2.4: TypeScript with OOP & FP — 10-Day Plan

---

## Day 1 — OOP Patterns: Interface-based Design

**Read:**

- [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [OOP Principles in TypeScript](https://www.typescriptlang.org/docs/handbook/classes.html)

**Exercises:**

- Create interfaces for `Shape`, `Vehicle`, and `User`
- Implement classes that follow these interfaces
- Enforce type safety through interface contracts

---

## Day 2 — OOP Patterns: Abstract Classes & Polymorphism

**Read:**

- [Abstract Classes](https://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes)
- [Polymorphism in TypeScript](https://www.typescriptlang.org/docs/handbook/classes.html#interfaces-and-classes)

**Exercises:**

- Create an abstract class `Animal` with abstract method `makeSound()`
- Implement subclasses `Dog` and `Cat` overriding `makeSound()`
- Demonstrate polymorphic behavior in arrays of `Animal`

---

## Day 3 — OOP Patterns: Generic Classes & Type-Safe Design Patterns

**Read:**

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Design Patterns in TypeScript](https://refactoring.guru/design-patterns/typescript)

**Exercises:**

- Create a generic `Repository<T>` class
- Implement Singleton and Factory patterns with type safety
- Apply generic constraints for class methods

---

## Day 4 — OOP Patterns: SOLID Principles

**Read:**

- [SOLID Principles](https://medium.com/swlh/solid-principles-in-typescript-2a59a18dcf15)

**Exercises:**

- Apply Single Responsibility Principle with classes
- Demonstrate Open/Closed Principle using interfaces and inheritance
- Implement Dependency Inversion using abstract types and generics

---

## Day 5 — Functional Patterns: Type-safe Function Composition

**Read:**

- [Functional Programming in TypeScript](https://www.typescriptlang.org/docs/handbook/functions.html#higher-order-functions)

**Exercises:**

- Write `compose` and `pipe` functions with generic types
- Chain multiple functions ensuring type safety
- Test with different input/output types

---

## Day 6 — Functional Patterns: Higher-Order Functions & Discriminated Unions

**Read:**

- [Higher-Order Functions](https://www.typescriptlang.org/docs/handbook/functions.html#functions-as-types)
- [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

**Exercises:**

- Create generic higher-order function that transforms an array
- Build a simple state machine using discriminated unions
- Ensure exhaustive checks with `never` type

---

## Day 7 — Functional Patterns: Type-safe Immutability & Error Handling

**Read:**

- [Readonly & Immutable Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlyt)
- [Functional Error Handling Concepts](https://dev.to/gcanti/introduction-to-fp-ts-2bj)

**Exercises:**

- Use `Readonly` and immutable patterns in objects and arrays
- Implement `Option` and `Either` types for functional error handling
- Compose functions that handle errors type-safely

---

## Day 8 — Practice Project 1 & 2

**Projects:**

1. **Type-safe State Machine**
   - Use discriminated unions for states
   - Ensure exhaustive type checking
2. **Generic Data Structures**
   - Implement `Stack<T>`, `Queue<T>`, `Tree<T>`
   - Use generics and constraints for type safety

---

## Day 9 — Practice Project 3 & 4

**Projects:**  
3. **API Client**

- Type-safe request/response handling
- Generic fetch wrapper for REST APIs

4. **Form Validation System**
   - Use complex generics and type guards
   - Ensure type-safe validation logic

---

## Day 10 — Practice Project 5 & 6 / Consolidation

**Projects:**  
5. **Plugin Architecture**

- Use advanced generics, constraints, and interfaces

6. **Event System**
   - Implement type-safe event emitter
   - Use generics for event payloads

**Exercises:**

- Combine OOP and FP patterns in mini-projects
- Enforce compile-time type safety in all systems

---

## ✅ Exit Criteria

By the end of Day 10, you should be able to:

- Write TypeScript that catches bugs at compile time
- Design type-safe APIs and systems
- Balance type safety with pragmatism
- Read and understand any TypeScript codebase confidently

# Phase 3: Browser & DOM Mastery

## Module 3.1: DOM Manipulation — 7-Day Plan

---

## Day 1 — DOM Basics & Node Types

**Read:**

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Node interface](https://developer.mozilla.org/en-US/docs/Web/API/Node)

**Exercises:**

- Inspect a webpage’s DOM tree in browser DevTools
- Identify element, text, comment, and document nodes
- Traverse parent, children, and siblings of an element

---

## Day 2 — Selecting Elements

**Read:**

- [MDN: Document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
- [MDN: querySelector & querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [NodeLists vs HTMLCollections](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)

**Exercises:**

- Select elements using `getElementById`, `getElementsByClassName`, `getElementsByTagName`
- Select elements using `querySelector` and `querySelectorAll`
- Compare live vs static node lists

---

## Day 3 — Creating & Modifying Elements

**Read:**

- [MDN: Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [MDN: Node manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Node)

**Exercises:**

- Create elements with `createElement` and text nodes with `createTextNode`
- Append elements using `appendChild` and `append`
- Insert elements using `insertBefore` and `insertAdjacentElement`
- Remove elements with `removeChild` and `remove`
- Replace elements using `replaceChild`
- Clone nodes shallowly and deeply with `cloneNode`

---

## Day 4 — Element Properties & Attributes

**Read:**

- [MDN: HTMLElement properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
- [MDN: Element.dataset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
- [MDN: classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

**Exercises:**

- Manipulate `innerHTML`, `outerHTML`, `textContent`, `innerText`
- Use `getAttribute`, `setAttribute`, `removeAttribute`, `hasAttribute`
- Access and modify `data-*` attributes via `dataset`
- Modify `classList` using `add`, `remove`, `toggle`, `contains`
- Change inline styles using the `style` property

---

## Day 5 — DOM Traversal

**Read:**

- [MDN: Traversing the DOM](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Traversing_an_HTML_table)

**Exercises:**

- Traverse `parentNode`, `parentElement`
- Differentiate `childNodes` vs `children`
- Access `firstChild` / `lastChild` vs `firstElementChild` / `lastElementChild`
- Navigate `nextSibling` / `previousSibling` vs `nextElementSibling` / `previousElementSibling`
- Use `closest()` to find nearest ancestor matching a selector

---

## Day 6 — Document Fragments & Performance

**Read:**

- [MDN: DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)

**Exercises:**

- Create a `DocumentFragment` and append multiple elements to it
- Append the fragment to the DOM in one operation
- Compare performance with direct DOM insertion

---

## Day 7 — Practice & Consolidation

**Exercises:**

- Build a small dynamic UI (e.g., todo list or modal system) with vanilla JavaScript
- Use a combination of element creation, traversal, and attribute manipulation
- Optimize updates using `DocumentFragment` to minimize reflows/repaints
- Identify appropriate DOM methods for different use cases

---

## ✅ Exit Criteria

By the end of this module, you should be able to:

- Build complex UIs with vanilla JavaScript
- Optimize DOM manipulation for performance
- Understand reflow and repaint
- Choose appropriate methods for each use case

# Phase 3: Browser & DOM Mastery

## Module 3.2: Event Handling — 7-Day Plan

---

## Day 1 — Event Basics

**Read:**

- [MDN: EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN: Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)

**Exercises:**

- Attach events using `addEventListener` and remove them with `removeEventListener`
- Explore common event types: `click`, `input`, `submit`, `keydown`
- Access event object properties (`type`, `target`, `currentTarget`)
- Use `preventDefault`, `stopPropagation`, and `stopImmediatePropagation`

---

## Day 2 — Event Flow: Capturing, Target, Bubbling

**Read:**

- [MDN: Event propagation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_propagation)

**Exercises:**

- Experiment with event capturing and bubbling
- Use `useCapture` parameter in `addEventListener`
- Compare `event.target` vs `event.currentTarget`
- Create nested elements and observe event flow

---

## Day 3 — Event Delegation

**Read:**

- [MDN: Event delegation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)

**Exercises:**

- Implement event delegation for a list of dynamic items
- Compare performance with individual event listeners
- Practice dynamic content handling using delegation

---

## Day 4 — Custom Events

**Read:**

- [MDN: CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

**Exercises:**

- Create and dispatch a custom event with `CustomEvent`
- Pass additional data using the `detail` property
- Listen for and handle custom events
- Explore real-world use cases for custom events

---

## Day 5 — Keyboard & Mouse Events

**Read:**

- [MDN: KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
- [MDN: MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)

**Exercises:**

- Capture `keydown`, `keyup`, and `keypress` events
- Use key codes, key values, and modifier keys (`shift`, `ctrl`, `alt`, `meta`)
- Track mouse events: `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`
- Get mouse coordinates: `clientX/Y`, `pageX/Y`, `screenX/Y`

---

## Day 6 — Form Events

**Read:**

- [MDN: Form events](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

**Exercises:**

- Handle `submit`, `input`, `change`, `focus`, and `blur` events
- Build a simple form with validation using event listeners
- Prevent default form submission behavior and provide custom feedback

---

## Day 7 — Touch Events & Consolidation

**Read:**

- [MDN: Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

**Exercises:**

- Implement `touchstart`, `touchmove`, and `touchend` events
- Explore touch object properties (`touches`, `targetTouches`, `changedTouches`)
- Handle multi-touch scenarios on an element
- Combine event types to build an interactive component (e.g., draggable, swipable list)

---

## ✅ Exit Criteria

By the end of this module, you should be able to:

- Implement complex event handling scenarios
- Optimize event listeners for performance
- Build accessible interactive components
- Handle all edge cases in events, including custom, keyboard, mouse, form, and touch events

# Phase 3: Browser & DOM Mastery

## Module 3.3: Browser APIs — 10-Day Plan

---

## Day 1 — Storage APIs: localStorage & sessionStorage

**Read:**

- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

**Exercises:**

- Store, retrieve, and remove items using `localStorage` and `sessionStorage`
- Serialize/deserialize objects using JSON
- Observe storage events when data changes in another tab
- Compare lifetime and scope differences

---

## Day 2 — Storage APIs: IndexedDB

**Read:**

- [MDN: IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

**Exercises:**

- Create a database, object store, and index
- Perform CRUD operations using transactions
- Iterate records using cursors
- Handle database version upgrades
- Compare IndexedDB vs localStorage use cases

---

## Day 3 — Storage APIs: Cookies

**Read:**

- [MDN: Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

**Exercises:**

- Set, read, and delete cookies
- Use cookie attributes: `expires`, `max-age`, `domain`, `path`, `secure`, `httpOnly`, `sameSite`
- Compare limitations vs localStorage/sessionStorage

---

## Day 4 — Fetch API

**Read:**

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

**Exercises:**

- Make GET and POST requests with `fetch`
- Configure headers, request body, and methods
- Parse response with `json()`, `text()`, `blob()`, `arrayBuffer()`
- Handle HTTP errors vs network errors
- Use `AbortController` to cancel requests
- Explore CORS basics

---

## Day 5 — File APIs

**Read:**

- [MDN: File API](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [MDN: FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

**Exercises:**

- Access `File` and `FileList` objects
- Read files with `readAsText`, `readAsDataURL`, `readAsArrayBuffer`
- Create `Blob` objects and generate URLs with `URL.createObjectURL`
- Implement file uploads via input and drag-and-drop

---

## Day 6 — Canvas API: 2D Drawing

**Read:**

- [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

**Exercises:**

- Draw shapes: rectangles, arcs, lines, and paths
- Set fill, stroke, and line styles
- Render text on canvas
- Load and manipulate images
- Animate elements using `requestAnimationFrame`
- Consider performance best practices

---

## Day 7 — Geolocation API

**Read:**

- [MDN: Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

**Exercises:**

- Use `getCurrentPosition` to fetch location
- Track position continuously with `watchPosition`
- Access coordinates, accuracy, and timestamp
- Handle errors and permission issues
- Consider privacy and security best practices

---

## Day 8 — History API

**Read:**

- [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History)

**Exercises:**

- Use `pushState` and `replaceState` to manage URLs
- Listen for `popstate` events
- Implement navigation for a single-page app
- Manage state in the URL

---

## Day 9 — Clipboard API

**Read:**

- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)

**Exercises:**

- Copy text using `navigator.clipboard.writeText`
- Read text using `navigator.clipboard.readText`
- Build copy/paste functionality for input elements
- Handle permissions and fallbacks

---

## Day 10 — Consolidation & Mini Project

**Project Ideas:**

- Build a full-featured note-taking app:
  - Store notes in `localStorage` or `IndexedDB`
  - Allow image/file attachments via File API
  - Render canvas-based doodles
  - Fetch/sync notes from a remote API
  - Implement copy/paste for note content

---

## ✅ Exit Criteria

By the end of this module, you should be able to:

- Use all storage APIs appropriately
- Build file upload/download features
- Create canvas-based visualizations
- Implement complex fetch patterns and handle network edge cases

### Phase 3: Browser & DOM Mastery

## Module 3.4: Modern Browser Features — 10-Day Plan

---

## Day 1 — Intersection Observer API

**Read:**

- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

**Exercises:**

- Create an `IntersectionObserver` instance
- Experiment with `root`, `rootMargin`, and `threshold` options
- Access `isIntersecting` and `intersectionRatio` from entries
- Build examples for:
  - Infinite scroll
  - Lazy loading images
  - Animations on scroll

---

## Day 2 — Mutation Observer API

**Read:**

- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

**Exercises:**

- Observe DOM changes (childList, attributes, characterData, subtree)
- Access `MutationRecord` properties
- Implement examples for:
  - Monitoring dynamic content
  - Detecting third-party script changes
  - Developer tools features

---

## Day 3 — Resize Observer API

**Read:**

- [MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

**Exercises:**

- Observe size changes of elements
- Access `ResizeObserverEntry` properties
- Build responsive components and adaptive layouts
- Experiment with container-query-like behavior

---

## Day 4 — Web Workers

**Read:**

- [MDN: Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

**Exercises:**

- Create a Web Worker and communicate using `postMessage`
- Use transferable objects for efficiency
- Offload heavy computations and background data processing
- Note limitations (no DOM access)

---

## Day 5 — Service Workers

**Read:**

- [MDN: Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

**Exercises:**

- Register a Service Worker and explore lifecycle events
- Implement caching strategies for offline functionality
- Enable background sync and push notifications
- Start building a basic Progressive Web App (PWA)

---

## Day 6 — WebSockets

**Read:**

- [MDN: WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

**Exercises:**

- Establish a WebSocket connection
- Send and receive messages
- Track connection states and implement reconnection strategies
- Build a simple real-time chat or live-update feature

---

## Day 7 — Server-Sent Events (SSE)

**Read:**

- [MDN: Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

**Exercises:**

- Create an `EventSource` and listen for messages
- Handle auto-reconnection
- Compare SSE use cases vs WebSockets

---

## Day 8 — Web Animations API

**Read:**

- [MDN: Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

**Exercises:**

- Use `element.animate()` with keyframes
- Configure duration, easing, and iterations
- Control animations: play, pause, cancel, finish
- Compare performance and capabilities with CSS animations

---

## Day 9 — Performance APIs

**Read:**

- [MDN: Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [MDN: PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)

**Exercises:**

- Measure timings using `performance.now()`
- Observe metrics with `PerformanceObserver`
- Use Navigation Timing, Resource Timing, and User Timing APIs
- Monitor and optimize Core Web Vitals

---

## Day 10 — Consolidation & Mini Project

**Projects:**

- Build infinite scroll using Intersection Observer
- Implement a simple PWA with caching via Service Worker
- Use Web Workers to offload heavy calculations
- Build a real-time feature using WebSockets
- Monitor and optimize performance using Performance APIs

---

## ✅ Exit Criteria

By the end of this module, you should be able to:

- Implement infinite scroll and lazy-loading with Intersection Observer
- Build real-time features using WebSockets
- Create a simple PWA with Service Workers
- Use Web Workers to optimize performance
- Monitor and improve web performance metrics effectively

# Phase 4: React Mastery

## Module 4.1: React Fundamentals — 10-Day Plan

---

## Day 1 — Introduction to React & Core Concepts

**Read:**

- [React Official Docs: Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [React Official Docs: Rendering Elements](https://reactjs.org/docs/rendering-elements.html)

**Exercises:**

- Create a small React project using `create-react-app` or Vite
- Render static JSX elements
- Understand React elements vs components
- Observe how Virtual DOM works by logging updates

---

## Day 2 — Functional Components & JSX

**Read:**

- [React Functional Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components)
- [JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html)

**Exercises:**

- Build functional components with props
- Use children prop for nested components
- Practice component composition
- Render lists with `.map()`
- Use `key` props correctly for lists

---

## Day 3 — Conditional Rendering & Lists

**Read:**

- [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)

**Exercises:**

- Implement `if`, `ternary`, and `&&` conditional rendering patterns
- Render dynamic lists and handle empty states
- Experiment with `key` prop importance by modifying list items

---

## Day 4 — State Management: useState Basics

**Read:**

- [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Using the State Hook](https://reactjs.org/docs/hooks-state.html)

**Exercises:**

- Add `useState` to functional components
- Update state with direct values and functional updates
- Experiment with multiple state variables vs single object state
- Practice state colocation for related components

---

## Day 5 — State Updates & Batching

**Read:**

- [State Updates are Asynchronous](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous)

**Exercises:**

- Test synchronous and batched state updates
- Observe state behavior in event handlers
- Compare multiple `setState` calls vs functional updater pattern

---

## Day 6 — Event Handling in React

**Read:**

- [Handling Events](https://reactjs.org/docs/handling-events.html)
- [Synthetic Events](https://reactjs.org/docs/events.html)

**Exercises:**

- Attach event handlers to JSX elements
- Pass arguments to event handlers
- Understand and experiment with event pooling (legacy)
- Build simple interactive components (buttons, toggles)

---

## Day 7 — Forms: Controlled Components

**Read:**

- [Forms](https://reactjs.org/docs/forms.html)

**Exercises:**

- Create controlled inputs and manage form state via `useState`
- Handle form submission and prevent default behavior
- Implement validation patterns for inputs
- Handle different input types (text, checkbox, radio, select)

---

## Day 8 — Forms: Uncontrolled Components

**Read:**

- [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)

**Exercises:**

- Use `ref` to manage uncontrolled inputs
- Compare controlled vs uncontrolled behavior
- Integrate both approaches in a single form

---

## Day 9 — Component Composition & Prop Drilling

**Read:**

- [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)

**Exercises:**

- Build reusable components and compose them
- Pass props through multiple layers (prop drilling)
- Experiment with `children` and render props patterns

---

## Day 10 — Consolidation & Mini Project

**Project Ideas:**

- Build a small form with validation and multiple inputs
- Display a dynamic list with add/remove functionality
- Implement conditional rendering for list states and validation messages
- Manage local state effectively across components

---

## ✅ Exit Criteria

By the end of this module, you should be able to:

- Build forms and dynamic lists confidently
- Understand and implement component composition
- Manage local state effectively with `useState`
- Explain React's rendering behavior and state update patterns

# Phase 4: React Mastery

## Module 4.2: React Hooks Deep Dive — 12-Day Plan

---

## Day 1 — useEffect Basics

**Read:**

- [React Docs: Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)

**Exercises:**

- Add `useEffect` to log messages after render
- Experiment with empty, populated, and no dependency arrays
- Implement cleanup functions for timers or subscriptions
- Observe common pitfalls: infinite loops, missing dependencies
- Compare `useEffect` vs `useLayoutEffect` timing

---

## Day 2 — Fetching Data with useEffect

**Exercises:**

- Fetch API data inside `useEffect`
- Handle loading and error states
- Clean up pending requests when component unmounts

---

## Day 3 — useContext

**Read:**

- [React Docs: Context](https://reactjs.org/docs/context.html)

**Exercises:**

- Create a context and wrap components with a Provider
- Consume context with `useContext`
- Handle multiple contexts
- Implement context in a TypeScript project
- Understand when context is appropriate and its limitations

---

## Day 4 — useReducer Basics

**Read:**

- [React Docs: useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)

**Exercises:**

- Implement simple counter with `useReducer`
- Define actions and action creators
- Compare `useReducer` vs `useState`
- Manage complex state logic

---

## Day 5 — useReducer + Context (TypeScript)

**Exercises:**

- Combine `useReducer` with `useContext` for global state
- Implement a TypeScript reducer with typed actions and state
- Test complex state management patterns

---

## Day 6 — useRef

**Read:**

- [React Docs: useRef](https://reactjs.org/docs/hooks-reference.html#useref)

**Exercises:**

- Store mutable values that don’t trigger re-renders
- Access DOM elements via refs
- Experiment with forward refs and `useImperativeHandle`
- Compare ref vs state behavior
- Use callback refs

---

## Day 7 — useMemo

**Read:**

- [React Docs: useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)

**Exercises:**

- Memoize expensive computations
- Track dependency array usage
- Observe performance gains
- Identify when NOT to use `useMemo`

---

## Day 8 — useCallback

**Read:**

- [React Docs: useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)

**Exercises:**

- Memoize functions to prevent unnecessary re-renders
- Compare `useCallback` vs `useMemo`
- Track dependency array considerations

---

## Day 9 — useLayoutEffect & useId

**Read:**

- [React Docs: useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)
- [React Docs: useId](https://reactjs.org/docs/hooks-reference.html#useid)

**Exercises:**

- Use `useLayoutEffect` for DOM measurements or synchronous updates
- Generate unique IDs with `useId` for accessibility
- Understand server-side rendering considerations

---

## Day 10 — Custom Hooks Basics

**Read:**

- [React Docs: Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

**Exercises:**

- Create simple custom hooks like `useToggle` and `useLocalStorage`
- Compose multiple hooks inside a custom hook
- Test hooks in isolation
- Implement `useFetch`, `useDebounce`, `usePrevious`, `useWindowSize`

---

## Day 11 — Custom Hooks Advanced & Patterns

**Exercises:**

- Create reusable hooks for event handling (`useOnClickOutside`)
- Use custom hooks with TypeScript
- Optimize performance in hooks using `useMemo` and `useCallback`

---

## Day 12 — Rules of Hooks & Consolidation

**Read:**

- [React Docs: Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)

**Exercises:**

- Only call hooks at the top level of components or custom hooks
- Verify ESLint enforcement of hook rules
- Debug common hook-related issues
- Consolidate all previously learned hooks in a mini-project (form, list, or dashboard)

---

## ✅ Exit Criteria

By the end of this module, you should be able to:

- Use all React hooks appropriately
- Create custom hooks for reusable logic
- Optimize performance with `useMemo` and `useCallback`
- Debug and handle hook-related issues
- Choose the right hook for each scenario

# Module 4.3: Advanced React Patterns (Until Mastery)

---

## Day 1 — Compound Components

**Read:**

- [React Docs: Context](https://reactjs.org/docs/context.html)

**Exercises:**

- Build a `Tabs` component using compound component pattern
- Create an `Accordion` with internal state shared via context
- Implement `Select` dropdown with compound components
- Understand when to use compound components vs regular components

---

## Day 2 — Render Props

**Read:**

- [React Docs: Render Props](https://reactjs.org/docs/render-props.html)

**Exercises:**

- Implement a `MouseTracker` using function-as-children
- Create a `Form` component using prop getters
- Compare render props with hooks for code reuse
- Practice inversion of control pattern with render props

---

## Day 3 — Higher-Order Components (HOC)

**Read:**

- [React Docs: HOC](https://reactjs.org/docs/higher-order-components.html)

**Exercises:**

- Build `withAuth` and `withLoading` HOCs
- Implement props proxy and modify component behavior
- Identify HOC limitations and pitfalls
- Compare HOCs vs hooks for reusability

---

## Day 4 — Controlled vs Uncontrolled Components

**Read:**

- [React Docs: Forms](https://reactjs.org/docs/forms.html)

**Exercises:**

- Convert uncontrolled input to controlled input
- Use `ref` for uncontrolled form elements
- Implement `useControlled` hook pattern
- Analyze trade-offs between controlled and uncontrolled components

---

## Day 5 — State Reducer Pattern

**Read:**

- [Downshift: State Reducer Pattern](https://www.downshift-js.com/use-combobox#state-reducer)

**Exercises:**

- Build a toggle component using state reducer pattern
- Implement action types and reducer logic
- Allow user-controlled state changes with inversion of control
- Compare with simple `useState` and `useReducer` usage

---

## Day 6 — Performance Optimization: React.memo

**Read:**

- [React Docs: React.memo](https://reactjs.org/docs/react-api.html#reactmemo)

**Exercises:**

- Wrap functional components with `React.memo`
- Create a custom comparison function for memoization
- Analyze component re-renders before and after memoization
- Identify scenarios where `React.memo` is unnecessary

---

## Day 7 — Code Splitting

**Read:**

- [React Docs: Code-Splitting](https://reactjs.org/docs/code-splitting.html)

**Exercises:**

- Use `React.lazy` to split components
- Implement `Suspense` for loading states
- Apply dynamic imports to route-based splitting
- Experiment with component-based code splitting

---

## Day 8 — Virtualization

**Read:**

- [react-window Docs](https://react-window.vercel.app/#/examples/list/variable-size)

**Exercises:**

- Virtualize a long list using `react-window`
- Implement infinite scrolling with virtualization
- Compare performance with and without virtualization

---

## Day 9 — Error Handling & Portals

**Read:**

- [React Docs: Error Boundaries](https://reactjs.org/docs/error-boundaries.html)

**Exercises:**

- Create error boundaries using `getDerivedStateFromError`
- Use `componentDidCatch` for logging errors
- Place error boundaries strategically in the component tree
- Implement `ReactDOM.createPortal` for modals, tooltips, or notifications

---

## Day 10 — Refs & forwardRef

**Read:**

- [React Docs: Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

**Exercises:**

- Use `forwardRef` to pass refs to child components
- Implement `useImperativeHandle` for exposing custom methods
- Use callback refs for dynamic ref assignments
- Practice ref forwarding in reusable components

---

## Day 11 — Consolidation & Mini-Project

**Exercises:**

- Implement all advanced patterns in a small dashboard or form project
- Optimize React app for performance using memoization, virtualization, and code splitting
- Handle errors gracefully with error boundaries
- Build accessible and reusable component libraries

# Module 4.4: State Management (Until Mastery)

---

## Day 1 — Context + useReducer Basics

**Read:**

- [React Docs: Context](https://reactjs.org/docs/context.html)
- [React Docs: useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)

**Exercises:**

- Build a theme toggler using `Context`
- Implement a counter with `useReducer`
- Combine multiple contexts in a single app
- Analyze performance and avoid unnecessary re-renders
- Understand and avoid context hell

---

## Day 2 — Redux Toolkit Setup

**Read:**

- [Redux Toolkit Docs: Introduction](https://redux-toolkit.js.org/introduction/getting-started)

**Exercises:**

- Setup Redux store using `configureStore`
- Create slices with `createSlice`
- Define reducers and actions
- Access state via selectors
- Connect Redux DevTools

---

## Day 3 — Redux Toolkit Async Logic

**Read:**

- [Redux Toolkit: createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)

**Exercises:**

- Implement async actions using `createAsyncThunk`
- Fetch data from API and store in Redux state
- Handle loading, success, and error states
- Use middleware (thunk, custom)
- Practice immutable updates with Immer

---

## Day 4 — Redux Toolkit Advanced Patterns

**Exercises:**

- Normalize state to avoid nested structures
- Use selectors for derived data
- Combine multiple slices in a single store
- Optimize performance for large datasets
- Debug Redux state using DevTools

---

## Day 5 — Zustand Basics

**Read:**

- [Zustand Docs](https://zustand-demo.pmnd.rs/)

**Exercises:**

- Create a simple store using Zustand
- Subscribe to state changes in components
- Use middleware for logging or persistence
- Implement slices pattern
- Compare Zustand vs Redux use cases

---

## Day 6 — Jotai / Recoil Basics

**Read:**

- [Jotai Docs](https://jotai.org/)
- [Recoil Docs](https://recoiljs.org/)

**Exercises:**

- Create atomic state with Jotai / Recoil
- Build derived state from atoms
- Handle async atoms
- Determine when to use Jotai / Recoil over Redux or Zustand

---

## Day 7 — Server State vs Client State

**Read:**

- [React Query Docs](https://tanstack.com/query/v4)

**Exercises:**

- Identify client state (useState, useReducer) vs server state
- Lift state for shared components
- Avoid mixing server and client state
- Separate concerns for scalable architecture

---

## Day 8 — React Query / TanStack Query

**Read:**

- [React Query Docs: Basics](https://tanstack.com/query/v4/docs/overview)

**Exercises:**

- Fetch data with `useQuery`
- Cache server responses
- Implement background refetching
- Handle mutations and optimistic updates
- Create infinite queries and pagination
- Practice query invalidation
- Explore React Query DevTools

---

## Day 9 — State Management Decision Tree

**Exercises:**

- Choose correct state solution per scenario:
  - Local state: `useState`
  - Lifted state: props
  - Context: prop drilling
  - Redux Toolkit: complex global state
  - React Query: server state
- Build a mini-project implementing multiple state solutions
- Optimize state updates and reduce re-renders

---

## Day 10 — Consolidation & Mini-Project

**Exercises:**

- Build a dashboard or todo app integrating:
  - Local state
  - Redux Toolkit for global state
  - React Query for server state
- Optimize performance and architecture
- Apply learned patterns for scalable, maintainable state management

# Module 4.5: React with TypeScript (Until Mastery)

---

## Day 1 — Component Typing Basics

**Read:**

- [React + TypeScript Cheatsheet: Components](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)

**Exercises:**

- Create functional components with typed props
- Define interfaces for props
- Type `children` prop correctly
- Type event handlers (onClick, onChange)
- Build a generic component with typed props

---

## Day 2 — useState & useReducer with TypeScript

**Read:**

- [React + TypeScript Cheatsheet: Hooks](https://react-typescript-cheatsheet.netlify.app/docs/basic/hooks/)

**Exercises:**

- Use `useState` with explicit type annotations
- Build a counter with `useReducer` and typed actions
- Enforce strict typing in state updates
- Practice union and discriminated types in reducer state

---

## Day 3 — useRef & useContext Typing

**Exercises:**

- Create refs with `useRef` (DOM and generic refs)
- Type context with `useContext`
- Provide and consume typed context
- Handle optional context values
- Avoid null / undefined pitfalls

---

## Day 4 — Custom Hooks Typing

**Exercises:**

- Write type-safe custom hooks (`useToggle`, `useLocalStorage`)
- Type parameters and return values correctly
- Compose hooks with generics
- Handle optional arguments and defaults

---

## Day 5 — Advanced Patterns with TypeScript

**Exercises:**

- Type higher-order components (HOC)
- Implement render props with proper types
- Use discriminated unions for component state
- Forward refs in functional components
- Build generic reusable components

---

## Day 6 — Common React Types

**Exercises:**

- Explore `React.FC` and understand when not to use it
- Use `React.ReactNode` for children
- Apply `React.CSSProperties` for inline styles
- Type all common event handlers (`MouseEvent`, `ChangeEvent`)
- Type refs for inputs, buttons, and custom components

---

## Day 7 — Consolidation & Mini-Project

**Exercises:**

- Build a fully typed React app (e.g., todo app or dashboard)
- Apply all component typings, hooks typings, and advanced patterns
- Create reusable type-safe component APIs
- Handle real-world React + TypeScript scenarios
- Ensure no `any` types in production code

## Phase 5: Next.js Mastery

# Module 5.1: Next.js App Router Fundamentals (Until Mastery)

---

## Day 1 — Project Setup & Structure

**Read:**

- [Next.js Docs: Getting Started](https://nextjs.org/docs/getting-started)
- [Next.js Docs: App Router](https://nextjs.org/docs/app/building-your-application/routing)

**Exercises:**

- Create a new Next.js project
- Explore default project structure
- Compare App Router vs Pages Router
- Configure `next.config.js` for custom settings
- Start dev server and verify setup

---

## Day 2 — File-based Routing & Dynamic Routes

**Read:**

- [Next.js Docs: Routing](https://nextjs.org/docs/routing/introduction)

**Exercises:**

- Create static and dynamic routes
- Implement route groups and parallel routes
- Practice intercepting routes
- Create catch-all and optional catch-all routes

---

## Day 3 — Layouts & Composition

**Read:**

- [Next.js Docs: Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)

**Exercises:**

- Create root layout for the app
- Build nested layouts for subpages
- Practice layout composition
- Distinguish between template and layout components

---

## Day 4 — Loading States & Skeletons

**Read:**

- [Next.js Docs: Loading UI](https://nextjs.org/docs/app/building-your-application/loading)

**Exercises:**

- Implement `loading.tsx` for pages and components
- Use Suspense for streaming loading
- Create instant loading states
- Build skeleton UI for better UX

---

## Day 5 — Error Handling

**Read:**

- [Next.js Docs: Error Handling](https://nextjs.org/docs/app/building-your-application/error-handling)

**Exercises:**

- Create `error.tsx` and `not-found.tsx` files
- Implement global error handling
- Use error boundaries in components
- Test error states in pages and layouts

---

## Day 6 — Server vs Client Components

**Read:**

- [Next.js Docs: Server & Client Components](https://nextjs.org/docs/app/building-your-application/routing/server-and-client-components)

**Exercises:**

- Understand "use client" directive
- Implement server components for static rendering
- Implement client components for interactive UI
- Compose server and client components together
- Decide which components should be server vs client in a sample page

---

## Day 7 — Consolidation & Mini-Project

**Exercises:**

- Build a small multi-page Next.js app
- Use dynamic routes and nested layouts
- Implement loading skeletons and error handling
- Mix server and client components properly
- Ensure all routing and layout patterns are applied correctly

---

# The Complete Frontend Mastery Plan

## Phase 1: JavaScript Fundamentals Mastery

### Module 1.1: Core JavaScript (Until Mastery)

#### Fundamentals:
- Variables: `var`, `let`, `const` (scope differences)
- Data types: primitives vs reference types
- Type coercion and conversion
- Operators and expressions
- Conditionals and loops
- Functions: declarations, expressions, arrow functions

#### Execution Context & Scope:
- Global, function, and block scope
- Execution context stack
- Variable hoisting
- Temporal Dead Zone
- Lexical environment
- Scope chain

#### The this Keyword:
- Implicit binding
- Explicit binding (call, apply, bind)
- new binding
- Arrow functions and this
- this in different contexts (global, function, method, event handler)

#### Closures:
- What closures are and how they work
- Practical use cases
- Module pattern using closures
- Private variables
- Memory considerations

#### Exit Criteria:
- Explain execution context to someone clearly
- Predict this value in any context without running code
- Implement closures for practical problems
- Debug scope-related issues confidently

---

### Module 1.2: Functions Deep Dive (Until Mastery)

#### Function Concepts:
- First-class functions
- Higher-order functions
- Callback functions
- IIFE (Immediately Invoked Function Expressions)
- Function parameters: default, rest, spread

#### Advanced Function Patterns:
- Currying (manual and using bind)
- Partial application
- Function composition
- Pipe function implementation
- Recursive functions and tail call optimization

#### Practical Implementations:
- Implement your own: map, filter, reduce, forEach
- Debouncing (implement from scratch)
- Throttling (implement from scratch)
- Memoization (implement from scratch)
- Once function (execute only once)

#### Exit Criteria:
- Write curry and compose functions from scratch
- Implement debounce/throttle without looking at references
- Solve recursive problems confidently
- Explain when to use each pattern

---

### Module 1.3: Objects & Prototypes (Until Mastery)

#### Objects:
- Object creation methods
- Property descriptors (writable, enumerable, configurable)
- Object methods: Object.keys, values, entries, freeze, seal
- Property accessors (getters/setters)
- Object destructuring and spread

#### Prototypes:
- What prototypes are
- `__proto__` vs `prototype`
- Prototype chain
- Constructor functions
- `Object.create()` for inheritance
- `instanceof` operator and how it works
- `hasOwnProperty` vs `in` operator

#### Prototypal Inheritance:
- Classical inheritance pattern using prototypes
- Constructor stealing
- Parasitic inheritance
- Prototypal inheritance patterns

#### Exit Criteria:
- Draw and explain the prototype chain
- Implement inheritance without ES6 classes
- Debug prototype-related issues
- Explain prototype lookup mechanism

---

### Module 1.4: OOP in JavaScript (Until Mastery)

#### ES6 Classes:
- Class declarations and expressions
- Constructor methods
- Instance methods and properties
- Static methods and properties
- Class fields (public)
- Private fields and methods (#syntax)
- Getters and setters in classes

#### The Four Pillars:

**1. Encapsulation:**
- Data hiding with private fields
- Closures for encapsulation
- Module pattern
- Revealing module pattern
- Information hiding principles

**2. Inheritance:**
- extends keyword
- super() in constructor and methods
- Method overriding
- Inheritance chain
- When to use inheritance
- Problems with deep inheritance hierarchies

**3. Polymorphism:**
- Method overriding (runtime polymorphism)
- Duck typing in JavaScript
- Polymorphic behavior through inheritance
- Interface-like patterns

**4. Abstraction:**
- Abstract class patterns (JavaScript doesn't have true abstract classes)
- Hiding implementation details
- Creating clean interfaces
- Separation of concerns

#### SOLID Principles:
- **S**ingle Responsibility Principle (one class, one job)
- **O**pen/Closed Principle (open for extension, closed for modification)
- **L**iskov Substitution Principle (subclass should work where parent works)
- **I**nterface Segregation Principle (many specific interfaces > one general)
- **D**ependency Inversion Principle (depend on abstractions, not concretions)

#### Composition vs Inheritance:
- When to use composition
- When to use inheritance
- Mixins and traits
- Favor composition over inheritance principle
- Practical examples of both

#### Design Patterns (OOP-focused):
- Factory Pattern
- Constructor Pattern
- Singleton Pattern
- Module Pattern
- Observer Pattern (Pub/Sub)
- Strategy Pattern
- Decorator Pattern
- Facade Pattern
- Proxy Pattern
- Command Pattern

#### Practice Projects:
1. Library Management System (inheritance, encapsulation)
2. Game Character System (polymorphism, composition)
3. Payment Processing System (strategy pattern, abstraction)
4. Notification System (observer pattern)
5. Shape Calculator (inheritance, polymorphism)
6. Plugin Architecture (factory pattern, composition)
7. Undo/Redo System (command pattern)
8. Access Control System (proxy pattern)

#### Exit Criteria:
- Explain all four OOP pillars with examples
- Implement all SOLID principles in practice
- Choose between composition and inheritance appropriately
- Implement at least 8 design patterns from scratch
- Refactor procedural code to OOP and vice versa
- Explain trade-offs of different patterns

---

### Module 1.5: Asynchronous JavaScript (Until Mastery)

#### Callbacks:
- Callback pattern
- Callback hell and pyramid of doom
- Error-first callbacks
- Callback limitations

#### Promises:
- Creating promises (new Promise)
- Promise states: pending, fulfilled, rejected
- then, catch, finally methods
- Promise chaining
- Error handling in promise chains
- `Promise.all` (parallel execution, fails fast)
- `Promise.race` (first to settle)
- `Promise.allSettled` (wait for all, get all results)
- `Promise.any` (first fulfilled)

#### Async/Await:
- async function syntax
- await keyword
- Error handling with try/catch
- Parallel execution with async/await
- Sequential vs parallel patterns
- Top-level await

#### Event Loop:
- Call stack
- Web APIs / Browser APIs
- Callback queue (macrotask queue)
- Microtask queue (Promise queue)
- Event loop phases
- Microtask vs macrotask priority
- Visualization of execution order

#### Advanced Async Patterns:
- Promisifying callback-based functions
- Building a custom Promise from scratch
- Async queue with concurrency limit
- Retry logic implementation
- Timeout wrapper
- Race with timeout
- Parallel execution with limit

#### Generators & Iterators:
- Iterator protocol
- Generator functions (function*)
- yield keyword
- Generator as iterators
- Async generators
- for...of with generators

#### Exit Criteria:
- Implement Promise from scratch (simplified version)
- Predict event loop execution order
- Solve async race conditions
- Build async utilities (retry, timeout, queue, etc.)
- Explain microtask vs macrotask queue

---

### Module 1.6: Functional Programming in JavaScript (Until Mastery)

#### Core Concepts:
- Pure functions (no side effects)
- Immutability
- Function composition
- Higher-order functions
- Declarative vs imperative programming

#### Array Methods Mastery:
- map, filter, reduce (implement from scratch)
- forEach, some, every, find, findIndex
- flatMap, flat
- Chaining array methods
- Performance considerations

#### Immutability:
- Spread operator for shallow copy
- Object.assign
- Structured cloning
- Deep cloning techniques
- Immutable update patterns
- Libraries: Immer, Immutable.js (understanding concepts)

#### Advanced FP Techniques:
- Currying implementation
- Partial application
- Function composition (compose, pipe)
- Point-free style
- Lazy evaluation
- Transducers (advanced)
- Monads (basic understanding)

#### Practical FP:
- Refactoring imperative to declarative
- State management with reducers
- Data transformation pipelines
- FP in React (hooks, pure components)

#### Exit Criteria:
- Write point-free, declarative code naturally
- Implement compose and pipe utilities
- Refactor any imperative code to FP style
- Explain when FP is better than OOP and vice versa

---

### Module 1.7: ES6+ Features (Until Mastery)

#### Destructuring:
- Object destructuring
- Array destructuring
- Nested destructuring
- Default values
- Rest in destructuring
- Destructuring in function parameters

#### Spread & Rest:
- Spread operator for arrays and objects
- Rest parameters in functions
- Shallow vs deep copying implications

#### Template Literals:
- String interpolation
- Multi-line strings
- Tagged template literals
- Use cases (styling, i18n)

#### Symbols:
- Creating symbols
- Symbol use cases
- Well-known symbols
- Symbol.iterator, Symbol.toStringTag

#### Iterators & Iterables:
- Iterator protocol
- Iterable protocol
- Creating custom iterables
- for...of loop

#### Proxy & Reflect:
- Proxy traps (get, set, has, deleteProperty, etc.)
- Reflect API
- Use cases: validation, tracking, negative array indices
- Vue 3 reactivity system concept

#### Maps & Sets:
- Map vs Object (when to use each)
- WeakMap (garbage collection benefits)
- Set and WeakSet
- Practical use cases

#### Modules:
- ES6 modules (import/export)
- Default vs named exports
- Dynamic imports
- Module patterns
- CommonJS vs ES6 modules

#### Exit Criteria:
- Use modern JavaScript features naturally
- Implement custom iterables
- Create practical Proxy use cases
- Understand module systems deeply

---

## Phase 2: TypeScript Mastery

### Module 2.1: TypeScript Fundamentals (Until Mastery)

#### Setup & Configuration:
- Installing TypeScript
- tsconfig.json deep dive
- Compiler options (strict mode, target, module, etc.)
- Project references
- Path mapping

#### Basic Types:
- Primitive types: string, number, boolean
- Arrays and tuples
- Enums (numeric, string, const, computed)
- any, unknown, never, void
- null and undefined
- Type assertions (as, angle-bracket)

#### Type Annotations & Inference:
- When to annotate vs rely on inference
- Best practices for type annotations
- Contextual typing

#### Union & Intersection Types:
- Union types (A | B)
- Intersection types (A & B)
- Discriminated unions
- Narrowing with type guards

#### Literal Types:
- String literal types
- Numeric literal types
- Boolean literal types
- Template literal types

#### Exit Criteria:
- Configure TypeScript projects from scratch
- Choose appropriate types for any scenario
- Understand when compiler infers correctly

---

### Module 2.2: TypeScript Intermediate (Until Mastery)

#### Interfaces:
- Interface declaration
- Optional properties (?)
- Readonly properties
- Index signatures
- Extending interfaces
- Implementing interfaces in classes
- Interface vs Type alias (when to use each)

#### Type Aliases:
- Creating type aliases
- Combining with unions/intersections
- When to prefer type over interface

#### Functions in TypeScript:
- Function type annotations
- Optional and default parameters
- Rest parameters typing
- Function overloads
- this parameter in functions
- Call signatures
- Construct signatures

#### Classes in TypeScript:
- Class property types
- Access modifiers: public, private, protected
- Readonly modifier
- Parameter properties (shorthand)
- Abstract classes
- Implementing interfaces
- Static members typing

#### Generics Basics:
- Generic functions
- Generic interfaces
- Generic classes
- Generic constraints (extends)
- Default generic types
- Multiple type parameters

#### Exit Criteria:
- Choose between interface and type appropriately
- Write type-safe functions and classes
- Use generics for reusable code
- Understand access modifiers deeply

---

### Module 2.3: TypeScript Advanced (Until Mastery)

#### Advanced Generics:
- Generic constraints with extends
- Using type parameters in constraints
- Generic parameter defaults
- Conditional types basics
- Distributive conditional types
- infer keyword

#### Utility Types:
- `Partial<T>` - make all properties optional
- `Required<T>` - make all properties required
- `Readonly<T>` - make all properties readonly
- `Pick<T, K>` - select specific properties
- `Omit<T, K>` - exclude specific properties
- `Record<K, T>` - object with specific key types
- `Exclude<T, U>` - exclude types from union
- `Extract<T, U>` - extract types from union
- `NonNullable<T>` - remove null/undefined
- `ReturnType<T>` - extract function return type
- `Parameters<T>` - extract function parameters
- `InstanceType<T>` - get instance type of constructor
- `Awaited<T>` - unwrap Promise type

#### Mapped Types:
- Creating mapped types
- Mapping modifiers (readonly, ?)
- Key remapping with as
- Template literal types in mapping
- Creating custom utility types

#### Type Manipulation:
- keyof operator
- typeof operator
- Indexed access types (T[K])
- Conditional types advanced patterns
- Template literal types
- Recursive types

#### Type Guards & Narrowing:
- typeof type guards
- instanceof type guards
- Custom type guards (type predicates)
- Discriminated unions
- Truthiness narrowing
- Equality narrowing
- in operator narrowing
- Control flow analysis

#### Advanced Patterns:
- Declaration merging
- Module augmentation
- Namespace patterns
- Ambient declarations (.d.ts files)
- Triple-slash directives
- Type-only imports/exports

#### Decorators:
- Class decorators
- Method decorators
- Property decorators
- Parameter decorators
- Decorator factories
- Metadata with decorators

#### Exit Criteria:
- Create custom utility types
- Write complex generic constraints
- Build type-safe APIs
- Read and understand complex library types
- Implement advanced type patterns

---

### Module 2.4: TypeScript with OOP & FP (Until Mastery)

#### TypeScript OOP Patterns:
- Interface-based design
- Abstract classes for contracts
- Polymorphism with TypeScript
- Generic classes for reusability
- Type-safe design patterns implementation
- SOLID principles with TypeScript

#### TypeScript Functional Patterns:
- Type-safe function composition
- Generic higher-order functions
- Discriminated unions for state machines
- Type-safe immutability patterns
- Functional error handling (Either, Option types)

#### Practice Projects:
1. Type-safe State Machine (discriminated unions)
2. Generic Data Structures (Stack, Queue, Tree with generics)
3. API Client (full type coverage for requests/responses)
4. Form Validation System (complex generics, type guards)
5. Plugin Architecture (advanced generics, constraints)
6. Event System (type-safe event emitter)

#### Exit Criteria:
- Write TypeScript that catches bugs at compile time
- Design type-safe APIs
- Balance type safety with pragmatism
- Read any TypeScript codebase confidently

---

## Phase 3: Browser & DOM Mastery

### Module 3.1: DOM Manipulation (Until Mastery)

#### DOM Basics:
- DOM tree structure
- Node types (Element, Text, Comment, Document)
- Node relationships (parent, children, siblings)

#### Selecting Elements:
- getElementById
- getElementsByClassName / getElementsByTagName
- querySelector / querySelectorAll
- Differences and performance implications
- Live vs static node lists

#### Creating & Modifying Elements:
- createElement, createTextNode
- appendChild, append
- insertBefore, insertAdjacentElement
- removeChild, remove
- replaceChild
- cloneNode (shallow vs deep)

#### Element Properties & Attributes:
- innerHTML, outerHTML, textContent, innerText
- getAttribute, setAttribute, removeAttribute, hasAttribute
- data attributes (dataset)
- classList (add, remove, toggle, contains)
- style property (inline styles)

#### DOM Traversal:
- parentNode, parentElement
- childNodes vs children
- firstChild / lastChild vs firstElementChild / lastElementChild
- nextSibling / previousSibling vs nextElementSibling / previousElementSibling
- closest() method

#### Document Fragments:
- Creating fragments
- Performance benefits
- Batch DOM updates

#### Exit Criteria:
- Build complex UIs with vanilla JavaScript
- Optimize DOM manipulation for performance
- Understand reflow and repaint
- Choose appropriate methods for each use case

---

### Module 3.2: Event Handling (Until Mastery)

#### Event Basics:
- addEventListener, removeEventListener
- Event types (click, input, submit, keydown, etc.)
- Event object properties
- preventDefault, stopPropagation, stopImmediatePropagation

#### Event Flow:
- Event capturing (capture phase)
- Event target (target phase)
- Event bubbling (bubble phase)
- useCapture parameter
- event.target vs event.currentTarget

#### Event Delegation:
- What is event delegation
- Why use event delegation
- Implementing event delegation
- Performance benefits
- Use cases (dynamic content)

#### Custom Events:
- Creating custom events (CustomEvent)
- Dispatching events (dispatchEvent)
- Event detail property
- Use cases for custom events

#### Keyboard & Mouse Events:
- Keyboard events (keydown, keyup, keypress)
- Key codes and key values
- Modifiers (shift, ctrl, alt, meta)
- Mouse events (click, dblclick, mousedown, mouseup, mousemove)
- Mouse coordinates (clientX, pageX, screenX)

#### Form Events:
- submit event
- input vs change events
- focus, blur events
- Form validation with events

#### Touch Events:
- touchstart, touchmove, touchend
- Touch object properties
- Multi-touch handling

#### Exit Criteria:
- Implement complex event handling scenarios
- Optimize event listeners
- Build accessible interactive components
- Handle all event edge cases

---

### Module 3.3: Browser APIs (Until Mastery)

#### Storage APIs:

**localStorage:**
- setItem, getItem, removeItem, clear
- Storage events
- JSON serialization
- Size limits (typically 5-10MB)

**sessionStorage:**
- Same API as localStorage
- Differences (lifetime, scope)

**IndexedDB:**
- Database, object stores, indexes
- Transactions (readonly, readwrite)
- CRUD operations
- Cursors for iteration
- Version management
- When to use over localStorage

**Cookies:**
- document.cookie API
- Setting, reading, deleting cookies
- Cookie attributes (expires, max-age, domain, path, secure, httpOnly, sameSite)
- Limitations vs storage APIs

#### Fetch API:
- Basic fetch requests
- Request configuration (method, headers, body)
- Response object (json, text, blob, arrayBuffer)
- Status codes handling
- Error handling (network errors vs HTTP errors)
- AbortController for cancellation
- Request/Response headers
- CORS basics

#### File APIs:
- File and FileList objects
- FileReader API (readAsText, readAsDataURL, readAsArrayBuffer)
- Blob API
- URL.createObjectURL
- File upload handling
- Drag and drop file uploads

#### Canvas API:
- 2D drawing context
- Drawing shapes (rect, arc, line, path)
- Colors and styles
- Text rendering
- Image manipulation
- Animations with canvas
- Performance considerations

#### Geolocation API:
- getCurrentPosition
- watchPosition
- Position object (coords, accuracy)
- Error handling
- Privacy considerations

#### History API:
- pushState, replaceState
- popstate event
- Building single-page apps
- URL management

#### Clipboard API:
- navigator.clipboard.writeText
- navigator.clipboard.readText
- Copy/paste functionality
- Permissions

#### Exit Criteria:
- Use all storage APIs appropriately
- Build file upload/download features
- Create canvas-based visualizations
- Implement complex fetch patterns

---

### Module 3.4: Modern Browser Features (Until Mastery)

#### Intersection Observer API:
- Creating observers
- Observer options (root, rootMargin, threshold)
- Entry object properties (isIntersecting, intersectionRatio)
- Use cases:
  - Infinite scroll
  - Lazy loading images
  - View tracking
  - Animations on scroll

#### Mutation Observer API:
- Observing DOM changes
- Observer options (childList, attributes, characterData, subtree)
- MutationRecord object
- Use cases:
  - Detecting third-party script changes
  - Monitoring dynamic content
  - Building developer tools

#### Resize Observer API:
- Observing element size changes
- ResizeObserverEntry
- Use cases:
  - Responsive components
  - Container queries pattern
  - Adaptive layouts

#### Web Workers:
- Creating workers
- postMessage communication
- Transferable objects
- Use cases:
  - Heavy computations
  - Background data processing
  - Not blocking main thread
- Limitations (no DOM access)

#### Service Workers:
- Registration and lifecycle
- Caching strategies
- Offline functionality
- Background sync
- Push notifications basics
- Progressive Web Apps (PWA)

#### WebSockets:
- Establishing connections
- Sending/receiving messages
- Connection states
- Reconnection strategies
- Use cases:
  - Real-time chat
  - Live updates
  - Collaborative editing

#### Server-Sent Events (SSE):
- EventSource API
- Message format
- Auto-reconnection
- Use cases vs WebSockets

#### Web Animations API:
- element.animate()
- Keyframes
- Animation options (duration, easing, iterations)
- Animation control (play, pause, cancel, finish)
- Use cases vs CSS animations

#### Performance APIs:
- Performance.now() for precise timing
- Performance Observer
- Navigation Timing API
- Resource Timing API
- User Timing API (mark, measure)
- Monitoring Core Web Vitals

#### Exit Criteria:
- Implement infinite scroll with Intersection Observer
- Build real-time features with WebSockets
- Create a simple PWA with Service Workers
- Use Web Workers for performance optimization
- Monitor and optimize performance

---

## Phase 4: React Mastery

### Module 4.1: React Fundamentals (Until Mastery)

#### Core Concepts:
- What is React and why use it
- Virtual DOM concept
- JSX syntax and transpilation
- React elements vs components
- Reconciliation algorithm

#### Components:
- Functional components
- Props and prop drilling
- Children prop
- Component composition
- Rendering lists
- Keys and their importance
- Conditional rendering patterns

#### State:
- useState hook
- State updates (synchronous batching)
- Functional updates
- State initialization
- Multiple state variables vs single object
- State colocation

#### Event Handling:
- Synthetic events
- Event handlers in JSX
- Passing arguments to handlers
- Event pooling (legacy)

#### Forms:
- Controlled components
- Uncontrolled components
- Form submission
- Input types handling
- Form validation patterns

#### Exit Criteria:
- Build forms and lists confidently
- Understand component composition
- Manage local state effectively
- Explain React's rendering behavior

---

### Module 4.2: React Hooks Deep Dive (Until Mastery)

#### useEffect:
- Effect timing (after render)
- Dependency array (when effect runs)
- Empty dependency array (mount only)
- Cleanup functions
- Common pitfalls (infinite loops, missing dependencies)
- useEffect vs useLayoutEffect timing
- Fetching data with useEffect

#### useContext:
- Creating context
- Context Provider
- Consuming context
- When to use context
- Context limitations
- Multiple contexts
- Context with TypeScript

#### useReducer:
- Reducer concept
- Action creators
- Complex state logic
- useReducer vs useState
- Combining with context for state management
- TypeScript with reducers

#### useRef:
- Storing mutable values
- Accessing DOM elements
- Ref vs state differences
- Forward refs
- useImperativeHandle
- Callback refs

#### useMemo:
- Memoizing expensive computations
- Dependency array
- When to use (performance optimization)
- When NOT to use (premature optimization)
- Referential equality

#### useCallback:
- Memoizing functions
- Preventing unnecessary re-renders
- useCallback vs useMemo
- Dependency array considerations

#### useLayoutEffect:
- Timing differences from useEffect
- Use cases (DOM measurements, synchronous updates)
- When to avoid (performance)

#### useId:
- Generating unique IDs
- Accessibility (aria attributes)
- Server-side rendering considerations

#### Custom Hooks:
- Creating custom hooks
- Naming convention (use prefix)
- Composing hooks
- Testing custom hooks
- Common patterns:
  - useToggle
  - useLocalStorage
  - useFetch / useAsync
  - useDebounce
  - useWindowSize
  - usePrevious
  - useOnClickOutside

#### Rules of Hooks:
- Only call at top level
- Only call from React functions
- ESLint plugin for enforcement
- Why these rules exist

#### Exit Criteria:
- Use all hooks appropriately
- Create custom hooks for reusable logic
- Optimize performance with useMemo/useCallback
- Debug hook-related issues
- Choose the right hook for each scenario

---

### Module 4.3: Advanced React Patterns (Until Mastery)

#### Component Patterns:

**1. Compound Components:**
- Implicit state sharing
- Context for internal communication
- Examples: Tabs, Accordion, Select
- When to use

**2. Render Props:**
- Function as children
- Prop getter pattern
- Inversion of control
- When to use vs hooks

**3. Higher-Order Components (HOC):**
- Creating HOCs
- Props proxy
- withAuth, withLoading patterns
- Limitations and pitfalls
- HOC vs hooks

**4. Controlled vs Uncontrolled:**
- Controlled inputs
- Uncontrolled with refs
- Trade-offs
- useControlled hook pattern

**5. State Reducer Pattern:**
- User-controlled state logic
- Action types and reducers
- Inversion of control

#### Performance Optimization:

**React.memo:**
- Preventing re-renders
- Custom comparison function
- When to use
- Limitations

**Code Splitting:**
- React.lazy for component splitting
- Suspense for loading states
- Dynamic imports
- Route-based splitting
- Component-based splitting

**Virtualization:**
- Why virtualize long lists
- react-window / react-virtualized
- Implementing basic virtualization
- Infinite scroll with virtualization

#### Error Handling:
- Error boundaries (class components)
- getDerivedStateFromError
- componentDidCatch
- Error boundary placement strategy
- Suspense error handling

#### Portals:
- ReactDOM.createPortal
- Use cases (modals, tooltips, notifications)
- Event bubbling through portals

#### Refs:
- forwardRef
- useImperativeHandle
- Callback refs
- Ref forwarding patterns

#### Exit Criteria:
- Implement all advanced patterns
- Optimize React apps for performance
- Handle errors gracefully
- Build accessible, reusable component libraries

---

### Module 4.4: State Management (Until Mastery)

#### Context + useReducer:
- Building app-wide state
- Action creators and types
- Combining multiple contexts
- Performance considerations
- Avoiding context hell

#### Redux Toolkit:
- Store setup (configureStore)
- Slices (createSlice)
- Reducers and actions
- Selectors
- Async logic with createAsyncThunk
- RTK Query for data fetching
- Redux DevTools
- Middleware (thunk, custom)
- Immutable updates (Immer)
- Normalization patterns

#### Zustand:
- Creating stores
- Subscribing to state
- Middleware
- Persist state
- Slices pattern
- When to use vs Redux

#### Jotai / Recoil:
- Atomic state management
- Atoms and derived state
- Async atoms
- When to use

#### Server State vs Client State:
- Understanding the difference
- When to use each approach
- Separating concerns

#### React Query / TanStack Query:
- Fetching data
- Caching strategies
- Background refetching
- Mutations
- Optimistic updates
- Infinite queries
- Pagination
- Query invalidation
- Devtools

#### State Management Decision Tree:
- Local state (useState)
- Lifted state (props)
- Context for prop drilling
- Redux for complex global state
- React Query for server state
- When to use each

#### Exit Criteria:
- Choose appropriate state solution
- Implement Redux Toolkit properly
- Use React Query for server state
- Build scalable state architecture
- Optimize state updates

---

### Module 4.5: React with TypeScript (Until Mastery)

#### Component Typing:
- Functional component types
- Props interfaces
- Children prop typing
- Event handler types
- Generic components

#### Hooks with TypeScript:
- useState with TypeScript
- useReducer with typed actions
- useRef typing
- useContext with typed context
- Custom hooks typing

#### Advanced Patterns:
- HOC typing
- Render props with TypeScript
- Discriminated unions for state
- Generic components
- Forwarding refs with TypeScript

#### Common Types:
- React.FC (and when not to use it)
- React.ReactNode
- React.CSSProperties
- Event types (MouseEvent, ChangeEvent, etc.)
- Ref types

#### Exit Criteria:
- Write fully typed React applications
- Create type-safe component APIs
- Handle all TypeScript + React scenarios

---

## Phase 5: Next.js Mastery

### Module 5.1: Next.js App Router Fundamentals (Until Mastery)

#### Project Setup:
- Creating Next.js app
- Project structure
- App router vs Pages router
- Configuration (next.config.js)

#### Routing:
- File-based routing
- Dynamic routes
- Route groups
- Parallel routes
- Intercepting routes
- Catch-all routes
- Optional catch-all

#### Layouts:
- Root layout
- Nested layouts
- Layout composition
- Template vs layout

#### Loading States:
- loading.tsx files
- Streaming with Suspense
- Instant loading states
- Skeleton UIs

#### Error Handling:
- error.tsx files
- Error boundaries in Next.js
- not-found.tsx
- Global error handling

#### Server vs Client Components:
- Understanding the difference
- When to use each
- "use client" directive
- Server component patterns
- Client component patterns
- Composition patterns

#### Exit Criteria:
- Set up Next.js projects confidently
- Implement complex routing
- Choose server vs client components appropriately
- Handle loading and error states

---

### Module 5.2: Data Fetching & Rendering (Until Mastery)

#### Rendering Strategies:

**Server-Side Rendering (SSR):**
- Dynamic rendering
- Per-request data fetching
- When to use SSR
- Performance implications

**Static Site Generation (SSG):**
- Build-time rendering
- generateStaticParams
- When to use SSG
- Static exports

**Incremental Static Regeneration (ISR):**
- Revalidation strategies
- Time-based revalidation
- On-demand revalidation
- Stale-while-revalidate

**Client-Side Rendering (CSR):**
- useEffect for data fetching
- React Query in Next.js
- When to use CSR

#### Data Fetching Patterns:
- fetch in Server Components
- Parallel data fetching
- Sequential data fetching
- Automatic request deduplication
- Data caching
- Revalidating data

#### Server Actions:
- Creating server actions
- Calling from Client Components
- Form handling with server actions
- Progressive enhancement
- Validation and error handling
- Revalidation after mutations

#### Route Handlers:
- API routes in App Router
- GET, POST, PUT, DELETE handlers
- Dynamic route handlers
- Request and response objects
- Middleware

#### Exit Criteria:
- Choose appropriate rendering strategy
- Implement all data fetching patterns
- Use server actions effectively
- Build API routes

---

### Module 5.3: Next.js Advanced Features (Until Mastery)

#### Metadata & SEO:
- Metadata API
- Dynamic metadata
- Static metadata
- Open Graph images
- Twitter cards
- Sitemap generation
- robots.txt

#### Image Optimization:
- next/image component
- Image sizing
- Lazy loading
- Placeholder strategies (blur, empty)
- Remote images configuration
- Image formats (WebP, AVIF)

#### Font Optimization:
- next/font
- Google Fonts optimization
- Local fonts
- Font display strategies
- Variable fonts

#### Middleware:
- Creating middleware
- Request/response manipulation
- Matcher configuration
- Conditional middleware execution
- Authentication with middleware
- Redirects and rewrites
- Geolocation and A/B testing
- Edge runtime considerations

#### Caching in Next.js:
- Request memoization
- Data Cache
- Full Route Cache
- Router Cache
- Understanding cache invalidation
- Cache configuration (force-cache, no-store)
- Time-based revalidation
- On-demand revalidation (revalidatePath, revalidateTag)

#### Streaming & Suspense:
- Streaming server rendering
- Suspense boundaries
- Loading.tsx automatic suspense
- Progressive rendering
- Parallel data loading with Suspense

#### Internationalization (i18n):
- Locale detection
- Routing strategies (sub-path, domain)
- Translation patterns
- Dynamic routes with i18n
- Locale-specific content

#### Authentication:
- Session management
- JWT patterns
- OAuth integration
- Next-Auth / Auth.js
- Protected routes
- Middleware for auth
- Server vs client auth checks

#### Environment Variables:
- NEXT_PUBLIC_ prefix
- Server-only variables
- Loading environment files
- Type-safe environment variables

#### Exit Criteria:
- Implement SEO best practices
- Optimize images and fonts
- Build authentication systems
- Use caching effectively
- Deploy production-ready Next.js apps

---

### Module 5.4: Next.js Performance & Production (Until Mastery)

#### Bundle Optimization:
- Analyzing bundle size
- @next/bundle-analyzer
- Code splitting strategies
- Dynamic imports
- Tree shaking
- External packages optimization

#### Performance Monitoring:
- Core Web Vitals in Next.js
- Performance profiling
- React DevTools Profiler
- Lighthouse integration
- Real User Monitoring (RUM)

#### Production Best Practices:
- Build optimization
- Environment-specific configuration
- Error logging (Sentry integration)
- Analytics integration
- Security headers
- Content Security Policy (CSP)

#### Deployment:
- Vercel deployment
- Self-hosted deployment
- Docker containers
- Environment variables in production
- CI/CD pipelines
- Preview deployments
- Edge functions

#### Exit Criteria:
- Optimize Next.js apps for production
- Monitor and improve performance
- Deploy to various platforms
- Implement proper security practices

---

## Phase 6: Testing Mastery

### Module 6.1: Unit Testing (Until Mastery)

#### Jest Fundamentals:
- Setting up Jest
- Test structure (describe, it/test)
- Assertions (expect matchers)
- Setup and teardown (beforeEach, afterEach, beforeAll, afterAll)
- Mocking functions (jest.fn, jest.mock)
- Mocking modules
- Spying on functions
- Timer mocks (jest.useFakeTimers)
- Snapshot testing

#### Testing JavaScript:
- Testing pure functions
- Testing classes and OOP
- Testing async code (promises, async/await)
- Testing callbacks
- Testing error handling
- Testing edge cases

#### React Testing Library:
- Philosophy (test behavior, not implementation)
- Rendering components
- Queries (getBy, queryBy, findBy)
- User interactions (fireEvent vs userEvent)
- Async utilities (waitFor, waitForElementToBeRemoved)
- Testing hooks with @testing-library/react-hooks
- Custom render functions
- Testing context providers

#### Testing Patterns:
- Testing forms
- Testing API calls (with msw - Mock Service Worker)
- Testing Redux/Zustand
- Testing custom hooks
- Testing error boundaries
- Testing with React Router

#### Code Coverage:
- Understanding coverage metrics
- Coverage reports
- Setting coverage thresholds
- Meaningful vs meaningless coverage

#### Exit Criteria:
- Write comprehensive unit tests
- Test React components properly
- Mock dependencies effectively
- Achieve meaningful code coverage
- Practice TDD (Test-Driven Development)

---

### Module 6.2: Integration & E2E Testing (Until Mastery)

#### Integration Testing:
- Testing component integration
- Testing multiple components together
- Testing with real API calls (when appropriate)
- Testing routing
- Testing full user flows

#### End-to-End Testing with Playwright:
- Setting up Playwright
- Writing test scripts
- Locators and selectors
- Page object model
- Network interception
- Screenshots and videos
- Running tests in CI/CD
- Parallel test execution
- Cross-browser testing

#### E2E Testing with Cypress (Alternative):
- Setting up Cypress
- Commands and assertions
- Custom commands
- Fixtures and mocking
- Network stubbing
- Visual regression testing

#### Testing Best Practices:
- Test pyramid (more unit, fewer E2E)
- Arrange-Act-Assert pattern
- Test naming conventions
- Avoiding test brittleness
- Testing accessibility
- Testing performance

#### Exit Criteria:
- Write integration tests
- Build E2E test suites
- Test complete user journeys
- Maintain reliable test suites
- Integrate testing into CI/CD

---

## Phase 7: Frontend System Design Mastery

### Module 7.1: Architecture Fundamentals (Until Deep Mastery)

#### Component Architecture:

**Atomic Design methodology:**
- Atoms (buttons, inputs, labels)
- Molecules (search bar, card header)
- Organisms (navigation, form sections)
- Templates (page layouts)
- Pages (specific instances)
- When to use atomic design

**Container/Presentational pattern:**
- Smart vs Dumb components
- Component composition strategies

#### Folder Structure:
- Feature-based structure
- Layer-based structure
- Hybrid approaches
- Monorepo considerations
- Barrel exports (index files)
- Co-location principles
- Scaling folder structure

#### Design Systems:
- What is a design system
- Component libraries
- Design tokens
- Theming strategies
- Documentation (Storybook)
- Versioning design systems
- Consuming design systems

#### Monolith vs Micro-frontends:
- Monolithic architecture
- Micro-frontend patterns:
  - Build-time integration
  - Server-side integration
  - Runtime integration (Module Federation)
  - IFrame-based
- Trade-offs of each approach
- When to use micro-frontends
- Communication between micro-frontends

#### Module Federation:
- Webpack Module Federation
- Sharing dependencies
- Remote and host applications
- Dynamic remotes
- Versioning concerns

#### Exit Criteria:
- Design scalable component architectures
- Organize large codebases effectively
- Build and maintain design systems
- Choose appropriate architectural patterns
- Explain trade-offs of different approaches

---

### Module 7.2: Performance & Optimization (Until Deep Mastery)

#### Performance Fundamentals:
- Critical Rendering Path
- Browser rendering process (parsing, layout, paint, composite)
- Reflow and repaint
- Layout thrashing
- Paint complexity

#### Core Web Vitals:

**Largest Contentful Paint (LCP):**
- What it measures
- How to optimize (resource hints, image optimization, critical CSS)
- Target: < 2.5s

**First Input Delay (FID) / Interaction to Next Paint (INP):**
- What it measures
- JavaScript optimization
- Long tasks breakdown
- Target: < 100ms (FID), < 200ms (INP)

**Cumulative Layout Shift (CLS):**
- What it measures
- Setting dimensions on images/videos
- Font loading strategies
- Dynamic content injection
- Target: < 0.1

#### Loading Performance:
- Resource prioritization
- Critical vs non-critical resources
- Preload, prefetch, preconnect
- DNS prefetch
- Resource hints
- Lazy loading strategies
- Above-the-fold optimization

#### JavaScript Performance:
- Bundle size optimization
- Code splitting strategies:
  - Route-based splitting
  - Component-based splitting
  - Vendor splitting
- Tree shaking
- Dead code elimination
- Minification and compression (Gzip, Brotli)
- Long tasks analysis
- Web Workers for CPU-intensive tasks
- requestIdleCallback for non-critical work

#### React-Specific Performance:
- Preventing unnecessary re-renders
- React.memo usage patterns
- useMemo for expensive computations
- useCallback for stable references
- Virtualization for long lists
- Suspense for code splitting
- Concurrent rendering
- useTransition and useDeferredValue
- Profiling with React DevTools

#### Image Optimization:
- Modern formats (WebP, AVIF)
- Responsive images (srcset, sizes)
- Art direction (picture element)
- Lazy loading (loading="lazy")
- Blur-up technique
- CDN usage
- Image compression
- Critical images preloading

#### CSS Performance:
- Critical CSS extraction
- CSS-in-JS performance implications
- Unused CSS removal
- CSS containment
- will-change property
- Animation performance (transform, opacity)
- Avoiding expensive properties (box-shadow, filters)

#### Network Optimization:
- HTTP/2 and HTTP/3
- Compression (Gzip, Brotli)
- Caching strategies:
  - Browser caching (Cache-Control headers)
  - Service Worker caching
  - CDN caching
- Cache invalidation strategies
- Resource bundling vs HTTP/2 multiplexing

#### Monitoring & Profiling:
- Chrome DevTools Performance tab
- Lighthouse
- WebPageTest
- Real User Monitoring (RUM) tools
- Synthetic monitoring
- Performance budgets
- Continuous performance monitoring

#### Exit Criteria:
- Diagnose performance bottlenecks
- Optimize Core Web Vitals
- Implement comprehensive caching strategies
- Profile and optimize React applications
- Set and maintain performance budgets
- Monitor production performance

---

### Module 7.3: Data Management at Scale (Until Deep Mastery)

#### State Management Architecture:
- Local vs global state
- Server state vs client state
- Derived state patterns
- State normalization
- State machines (XState concepts)
- Optimistic UI updates
- Pessimistic updates
- Undo/redo functionality

#### Data Fetching Strategies:

**REST API patterns:**
- Resource-based endpoints
- Pagination strategies (offset, cursor)
- Filtering and sorting
- Partial responses (field selection)
- Error handling patterns

**GraphQL patterns:**
- Query structure
- Mutations and subscriptions
- Caching with Apollo Client
- Fragment composition
- Optimistic responses
- Error handling

**Comparison: REST vs GraphQL:**
- When to use each
- Over-fetching vs under-fetching
- Caching differences
- Type safety

#### Advanced Caching:

**React Query / TanStack Query:**
- Query keys and structure
- Stale time vs cache time
- Background refetching
- Window focus refetching
- Polling strategies
- Query invalidation patterns
- Optimistic updates
- Infinite queries
- Parallel queries
- Dependent queries

**Apollo Client caching:**
- Normalized cache
- Cache policies (cache-first, network-only, etc.)
- Cache updates after mutations
- Local state in Apollo

**SWR patterns:**
- Stale-while-revalidate
- Focus revalidation
- Interval polling
- Mutation and revalidation

#### Real-time Data:

**WebSockets:**
- Connection management
- Reconnection strategies
- Message queuing
- Heartbeat/ping-pong
- Scaling considerations

**Server-Sent Events:**
- When to use vs WebSockets
- Event streams
- Automatic reconnection

**Polling strategies:**
- Short polling vs long polling
- Adaptive polling
- Exponential backoff

#### Data Synchronization:
- Conflict resolution strategies
- Operational Transformation (OT) basics
- CRDT (Conflict-free Replicated Data Types) concepts
- Online/offline sync
- Queue-based sync
- Optimistic concurrency control

#### Offline-First Architecture:
- Service Worker strategies
- IndexedDB for offline storage
- Sync queue implementation
- Conflict resolution
- Background sync API
- Online/offline detection

#### Form Data Management:
- Large form optimization
- Multi-step forms
- Form state persistence
- Validation strategies (client vs server)
- Debouncing validation
- Field-level vs form-level validation

#### Exit Criteria:
- Design data fetching architecture
- Implement sophisticated caching
- Build real-time features
- Handle offline scenarios
- Manage complex form state
- Choose appropriate tools for each scenario

---

### Module 7.4: Scalability & Best Practices (Until Deep Mastery)

#### Code Quality:

**Linting:**
- ESLint configuration
- Custom rules
- React-specific rules
- TypeScript ESLint
- Accessibility linting (eslint-plugin-jsx-a11y)

**Formatting:**
- Prettier configuration
- Editor integration
- Pre-commit hooks (Husky, lint-staged)

**Type Safety:**
- Strict TypeScript configuration
- Type coverage tools
- Gradual TypeScript adoption

#### Code Review Practices:
- What to look for in reviews
- Constructive feedback
- Review checklists
- Automated review tools
- Security considerations

#### Git Workflow:
- Branching strategies (Git Flow, GitHub Flow, Trunk-based)
- Conventional commits
- Semantic versioning
- Changelog generation
- Monorepo strategies (Lerna, Nx, Turborepo)

#### Documentation:
- README best practices
- API documentation
- Component documentation (Storybook)
- JSDoc for type information
- Architecture Decision Records (ADRs)
- Runbooks and playbooks

#### CI/CD Pipelines:
- Automated testing
- Build optimization
- Deployment strategies:
  - Blue-green deployment
  - Canary releases
  - Feature flags
  - A/B testing
- Preview deployments
- Rollback strategies

#### Security:
- XSS prevention
- CSRF protection
- Content Security Policy (CSP)
- HTTPS everywhere
- Secure headers
- Dependency vulnerabilities (npm audit, Snyk)
- Authentication best practices
- Authorization patterns
- API security
- Rate limiting

#### Accessibility (a11y):
- WCAG guidelines
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader testing
- Focus management
- Color contrast
- Alt text for images
- Form accessibility
- Testing with axe-core

#### Internationalization (i18n):
- Translation libraries (i18next, react-intl)
- Pluralization rules
- Date/time formatting
- Number formatting
- RTL support
- Locale detection
- Translation management

#### Error Handling:
- Client-side error handling
- Error boundaries in React
- Global error handlers
- Network error handling
- Retry strategies
- Error logging and monitoring:
  - Sentry
  - LogRocket
  - Bugsnag
- User-friendly error messages

#### Monitoring & Observability:
- Error tracking
- Performance monitoring
- User analytics
- Custom events tracking
- Logging strategies
- Alerting and notifications
- Dashboards and reports

#### Exit Criteria:
- Establish code quality standards
- Set up comprehensive CI/CD
- Implement security best practices
- Build accessible applications
- Monitor production applications
- Handle errors gracefully

---

### Module 7.5: System Design Interview Practice (Until Deep Mastery)

#### Design Problem Framework:

**1. Requirements Clarification:**
- Functional requirements
- Non-functional requirements (scale, performance, etc.)
- Out of scope
- Assumptions

**2. High-Level Design:**
- Component diagram
- Data flow
- API design
- Technology choices

**3. Deep Dive:**
- Performance optimization
- Scalability considerations
- Edge cases
- Trade-offs

**4. Follow-up:**
- Metrics and monitoring
- Future improvements
- Alternative approaches

#### Common System Design Problems:

**1. Design a News Feed (Facebook/Twitter/Instagram)**

*Requirements:*
- Users follow other users
- View posts from followed users
- Infinite scroll
- Real-time updates
- Likes, comments

*Key Considerations:*
- Feed generation algorithm (fanout on write vs read)
- Pagination strategy
- Caching layer
- Real-time updates (WebSockets vs polling)
- Media handling (images, videos)
- Virtualized list for performance

*Architecture:*
- Component structure
- State management
- Data fetching and caching
- Optimistic updates
- Error handling

---

**2. Design a Chat Application (WhatsApp/Slack)**

*Requirements:*
- One-on-one and group chats
- Real-time messaging
- Message history
- Typing indicators
- Read receipts
- File sharing
- Search messages

*Key Considerations:*
- WebSocket connection management
- Message ordering
- Offline message queue
- Message status (sent, delivered, read)
- Notification system
- Encryption (end-to-end)

*Architecture:*
- Real-time communication layer
- Message storage (IndexedDB)
- Sync mechanism
- Conflict resolution
- Media upload/download

---

**3. Design an Autocomplete/Typeahead System (Google Search)**

*Requirements:*
- Suggest as user types
- Handle millions of queries
- Ranking of suggestions
- Keyboard navigation
- Recent searches

*Key Considerations:*
- Debouncing input
- Trie data structure (understanding)
- Caching suggestions
- Ranking algorithm
- Accessibility (ARIA)

*Architecture:*
- Input handling and debouncing
- API design
- Client-side caching
- Keyboard navigation implementation
- Highlighting matched text

---

**4. Design a Video Streaming Platform (YouTube/Netflix)**

*Requirements:*
- Video player with controls
- Adaptive bitrate streaming
- Playlist/queue management
- Comments and likes
- Recommendations
- Watch history

*Key Considerations:*
- Video format and codec
- Adaptive bitrate (HLS, DASH)
- Buffering strategy
- CDN integration
- Analytics (watch time, completion rate)

*Architecture:*
- Video player component
- Quality selection
- Progress tracking
- Thumbnail previews
- Fullscreen handling

---

**5. Design a Collaborative Editor (Google Docs/Notion)**

*Requirements:*
- Multiple users editing simultaneously
- Real-time synchronization
- Cursor positions
- Conflict resolution
- Revision history
- Comments and suggestions

*Key Considerations:*
- Operational Transformation (OT) or CRDT
- WebSocket for real-time sync
- Conflict resolution strategy
- Performance with large documents
- Offline editing and sync

*Architecture:*
- Editor component architecture
- Real-time sync layer
- Conflict resolution algorithm
- Presence system (who's online)
- Version control

---

**6. Design an E-commerce Product Listing Page (Amazon)**

*Requirements:*
- Display products with filters
- Sorting options
- Pagination or infinite scroll
- Add to cart
- Search within category
- Faceted search

*Key Considerations:*
- URL state management (filters in URL)
- Performance with thousands of products
- Filter application (client vs server)
- SEO considerations
- Lazy loading images

*Architecture:*
- Filter component architecture
- State management (URL as source of truth)
- Product grid optimization
- Cart management
- Search integration

---

**7. Design a Social Media Timeline (Facebook/LinkedIn)**

*Requirements:*
- Posts with text, images, videos
- Like, comment, share
- Infinite scroll
- Real-time updates
- Post composer

*Key Considerations:*
- Feed algorithm
- Content prioritization
- Media handling
- Optimistic updates
- Real-time new post notifications

*Architecture:*
- Timeline component structure
- Post rendering optimization
- Interaction handling
- Cache invalidation
- Notification system

---

**8. Design a Kanban Board (Trello/Jira)**

*Requirements:*
- Drag and drop cards
- Multiple columns
- Card details (modal/drawer)
- Real-time collaboration
- Comments and attachments

<!-- NOTE: Content was truncated here. Please provide the remainder of this section and any following sections to complete the plan. -->
