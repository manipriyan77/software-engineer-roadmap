# How React Rendering Works: A Complete Beginner's Guide 🚀

> **For Complete Beginners**: This guide explains React rendering like you're 5 years old, then gradually builds up to advanced concepts. No prior knowledge required!

## Table of Contents
1. [🎯 What is Rendering? (Start Here!)](#what-is-rendering-start-here)
2. [🏗️ The Restaurant Analogy](#the-restaurant-analogy)
3. [📋 The Big Picture: React's Rendering Process](#the-big-picture)
4. [🔄 Phase 1: Render Phase (The Planning Stage)](#phase-1-render-phase)
5. [✅ Phase 2: Commit Phase (The Action Stage)](#phase-2-commit-phase)
6. [👻 Virtual DOM and Diffing (The Smart Assistant)](#virtual-dom-and-diffing)
7. [🧵 React Fiber Architecture (The Smart Manager)](#react-fiber-architecture)
8. [🎬 What Triggers Re-rendering?](#triggers-for-re-rendering)
9. [⚡ Performance Optimizations](#performance-optimizations)
10. [❌ Common Misconceptions](#common-misconceptions)
11. [💡 Practical Examples](#practical-examples)
12. [📚 Glossary of Terms](#glossary-of-terms)

---

## 🎯 What is Rendering? (Start Here!)

### The Simplest Explanation
Imagine you're an artist with a magic paintbrush:
- You tell the paintbrush "draw a red circle"
- The paintbrush figures out HOW to draw it
- Then it actually draws it on the canvas

**React rendering works the same way:**
- You write code saying "show a button with text 'Click me'"
- React figures out HOW to create that button
- Then React actually creates the button in the browser

### Technical Definition
**Rendering** in React is the process of converting your component code (JSX) into actual DOM elements that users can see and interact with on the webpage.

```javascript
// You write this (JSX):
<button>Click me!</button>

// React converts it to this (HTML in browser):
<button>Click me!</button>
```

### Why is This Important?
- 🎨 **Visual Updates**: Every time you see something change on a React website, rendering happened
- ⚡ **Performance**: Understanding rendering helps you make faster apps
- 🐛 **Debugging**: When things don't update, it's usually a rendering issue

---

## 🏗️ The Restaurant Analogy

Let's understand React rendering using a restaurant analogy that anyone can relate to:

### 🍽️ The Complete Restaurant Process

**You (The Customer) = User**
- You want food (want to see something on screen)
- You place an order (click a button, type in input)

**The Waiter = React**
- Takes your order (detects state change)
- Figures out what needs to be prepared (render phase)
- Coordinates with kitchen (commit phase)

**The Kitchen = Browser DOM**
- Actually prepares the food (creates/updates HTML elements)
- Serves it to you (displays on screen)

### 📝 Step-by-Step Restaurant Process:

1. **📞 Order Placed** (Trigger)
   - Customer: "I want to change my burger to a pizza"
   - React: "Got it! Let me process this change"

2. **🤔 Planning Phase** (Render Phase)
   - Waiter thinks: "What needs to change?"
   - Waiter: "Remove burger, add pizza, keep the drink"
   - **No food is made yet - just planning!**

3. **👨‍🍳 Kitchen Action** (Commit Phase)
   - Kitchen actually removes burger
   - Kitchen actually makes pizza
   - Kitchen serves the new meal

4. **🍕 Customer Sees Result**
   - You see pizza instead of burger on your table
   - This is like seeing updated UI on screen

### 🔄 Why This Analogy Helps:
- **Planning vs Action**: Restaurant plans first, then acts (just like React)
- **Efficiency**: Kitchen only changes what's different (just like React's diffing)
- **Coordination**: Waiter coordinates everything (just like React manages updates)

---

## 📋 The Big Picture: React's Rendering Process

### 🎭 The Two-Act Play

Think of React rendering like a **two-act play**:

**🎬 Act 1: The Planning (Render Phase)**
- Actors rehearse their lines (components run)
- Director plans the scene changes (React creates Virtual DOM)
- Script is reviewed for changes (diffing algorithm)
- **Nothing happens on stage yet!**

**🎪 Act 2: The Performance (Commit Phase)**
- Actors actually perform on stage (DOM gets updated)
- Audience sees the show (users see changes)
- Special effects happen (side effects run)

### 📊 The Complete Flow (Step by Step)

```
🎯 TRIGGER: Something Happens
    ↓
    Examples: Button click, typing, timer, API response
    ↓
🔄 RENDER PHASE: React Plans What to Do
    ↓
    1. Run component functions
    2. Create new Virtual DOM tree
    3. Compare with old Virtual DOM (diffing)
    4. Make a list of changes needed
    ↓
✅ COMMIT PHASE: React Actually Does It
    ↓
    1. Update the real DOM
    2. Run layout effects (useLayoutEffect)
    3. Browser paints the screen
    4. Run effects (useEffect)
    ↓
👀 USER SEES: Updated interface
```

### 🕐 Timing Breakdown (What Happens When)

| Time | Phase | What's Happening | Can You See It? |
|------|-------|------------------|-----------------|
| 0ms | Trigger | Button clicked | ❌ No |
| 1ms | Render | Component functions run | ❌ No |
| 2ms | Render | Virtual DOM created | ❌ No |
| 3ms | Render | Diffing happens | ❌ No |
| 4ms | Commit | Real DOM updated | ❌ Not yet |
| 5ms | Commit | Browser paints | ✅ **YES! You see it!** |
| 6ms | Commit | Effects run | ❌ No (but they can cause more updates) |

### 🧠 Memory Aid: "Plan, Then Act"
- **Render Phase** = 🤔 "What should I do?"
- **Commit Phase** = 💪 "Let me do it!"

Just like you plan your day before doing tasks, React plans changes before applying them.

---

## 🔄 Phase 1: Render Phase (The Planning Stage)

### 🎯 What is the Render Phase?

**Simple Answer**: This is where React **thinks** about what needs to change, but doesn't change anything yet.

**Analogy**: Like planning a room makeover:
- 🤔 "I need to move the sofa here"
- 🤔 "Change the wall color to blue"  
- 🤔 "Add a new lamp there"
- **But you haven't moved anything yet!**

### 📋 The 4 Steps of Render Phase

#### 🚨 Step 1: The Trigger (Something Happened!)

**What triggers a re-render?**

```javascript
// 1. State Change (Most Common)
const [count, setCount] = useState(0);
setCount(5); // 🚨 TRIGGER! React says "Something changed!"

// 2. Props Change  
<Child name="John" />  // Later becomes...
<Child name="Jane" />  // 🚨 TRIGGER! Props changed!

// 3. Parent Re-renders
function Parent() {
  const [x, setX] = useState(0);
  return <Child />; // 🚨 Child re-renders when Parent does!
}

// 4. Force Update (Rare)
forceUpdate(); // 🚨 TRIGGER! "Re-render no matter what!"
```

**🧠 Remember**: React is lazy! It only re-renders when it has to.

#### 🏃‍♂️ Step 2: Component Function Execution

**What happens**: Your component function runs from top to bottom.

```javascript
function MyComponent({ name }) {
  // 🔥 RENDER PHASE STARTS HERE
  console.log('🔄 Render phase: Function executing');
  
  const [count, setCount] = useState(0);
  
  // ✅ This is OK during render phase
  const doubleCount = count * 2;
  
  // ❌ DON'T do this during render phase
  // document.title = 'Bad!'; // Side effect!
  
  console.log('🔄 Render phase: About to return JSX');
  
  return (
    <div>
      <h1>Hello {name}</h1>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
  // 🔥 RENDER PHASE ENDS HERE
}
```

**🎯 Key Points**:
- ✅ **Pure calculations** are OK
- ✅ **Reading state/props** is OK  
- ❌ **Changing DOM** is NOT OK
- ❌ **API calls** are NOT OK
- ❌ **Setting timers** is NOT OK

#### 🏗️ Step 3: Virtual DOM Creation

**What happens**: React creates a JavaScript object representing your UI.

```javascript
// Your JSX:
<div>
  <h1>Hello John</h1>
  <p>Count: 5</p>
  <button>Increment</button>
</div>

// Becomes this Virtual DOM object:
{
  type: 'div',
  props: {},
  children: [
    {
      type: 'h1',
      props: {},
      children: ['Hello John']
    },
    {
      type: 'p', 
      props: {},
      children: ['Count: 5']
    },
    {
      type: 'button',
      props: { 
        onClick: [Function] 
      },
      children: ['Increment']
    }
  ]
}
```

**🤔 Why Virtual DOM?**
- **Fast**: JavaScript objects are faster than real DOM
- **Comparable**: Easy to compare two JavaScript objects
- **Batchable**: Can plan multiple changes together

#### 🔍 Step 4: The Diffing Algorithm (The Detective Work)

**What happens**: React compares old Virtual DOM vs new Virtual DOM.

```javascript
// 🕰️ OLD Virtual DOM (what was on screen)
{
  type: 'div',
  children: [
    { type: 'h1', children: ['Hello John'] },
    { type: 'p', children: ['Count: 4'] },    // 👀 Old value
    { type: 'button', children: ['Increment'] }
  ]
}

// 🆕 NEW Virtual DOM (what should be on screen)  
{
  type: 'div',
  children: [
    { type: 'h1', children: ['Hello John'] },
    { type: 'p', children: ['Count: 5'] },    // 👀 New value  
    { type: 'button', children: ['Increment'] }
  ]
}

// 🕵️ React's Detective Work:
// "Hmm, let me compare these..."
// "h1 is the same ✅"
// "p text changed from '4' to '5' 🚨"  
// "button is the same ✅"
// "Conclusion: Only update the p element's text!"
```

### 🎯 Render Phase Characteristics (The Rules)

Think of the Render Phase like a **planning meeting**:

#### ✅ What's ALLOWED (Green Light):
- 🧮 **Pure calculations**: `const double = count * 2`
- 📖 **Reading data**: `const name = props.name`
- 🔄 **Calling useState/useReducer**: `const [count, setCount] = useState(0)`
- 📝 **Creating JSX**: `return <div>Hello</div>`
- 🖨️ **Console.log**: `console.log('Rendering...')`

#### ❌ What's FORBIDDEN (Red Light):
- 🌐 **DOM manipulation**: `document.title = 'New Title'`
- 📡 **API calls**: `fetch('/api/data')`
- ⏰ **Timers**: `setTimeout(() => {}, 1000)`
- 💾 **Local storage**: `localStorage.setItem('key', 'value')`
- 🎯 **Event listeners**: `window.addEventListener('click', handler)`

#### 🔄 Special Characteristics:
- **🛑 Interruptible**: React can pause and resume rendering
- **🔁 Repeatable**: React might call your component function multiple times
- **🚫 No side effects**: Must be "pure" - same input = same output
- **👻 Invisible**: User can't see anything happening yet

**🧠 Memory Trick**: 
> "Render Phase = Read Only, No Side Effects!"

---

## ✅ Phase 2: Commit Phase (The Action Stage)

### 🎯 What is the Commit Phase?

**Simple Answer**: This is where React **actually does** the changes it planned in the Render Phase.

**Analogy**: Like actually renovating your room:
- 💪 Move the sofa to its new position
- 🎨 Paint the wall blue
- 💡 Install the new lamp
- **Now you can see the changes!**

### 📋 The 4 Steps of Commit Phase

#### 🔨 Step 1: DOM Mutations (The Real Changes)

**What happens**: React updates the actual HTML elements in the browser.

```javascript
// React planned: "Change count from 4 to 5"
// Now React actually does it:

// ❌ React DOESN'T do this (inefficient):
// document.body.innerHTML = '<div><h1>Hello John</h1><p>Count: 5</p><button>Increment</button></div>';

// ✅ React DOES do this (efficient):
document.querySelector('p').textContent = 'Count: 5';
// Only changes what actually changed!
```

**🎯 Key Point**: React is surgical - it only changes what needs changing!

#### 🎨 Step 2: Layout Effects (Before Paint)

**What happens**: `useLayoutEffect` runs synchronously, before the browser paints.

```javascript
function MyComponent() {
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(() => {
    // 🎨 This runs AFTER DOM update, BEFORE browser paint
    console.log('Layout effect: DOM is updated but not painted yet');
    
    // Perfect for measuring DOM elements:
    const element = document.getElementById('myDiv');
    setWidth(element.offsetWidth); // Measure the element
    
    // User won't see any flicker because browser hasn't painted yet!
  }, []);
  
  return <div id="myDiv">Width: {width}px</div>;
}
```

**🕐 Timing**: DOM updated ✅ → Layout Effect runs ✅ → Browser paints 🎨

#### 🖼️ Step 3: Browser Paint (You See It!)

**What happens**: The browser actually draws the pixels on your screen.

```
Before Paint: User sees old UI 👀
    ↓
Browser Paint: Magic happens! ✨
    ↓  
After Paint: User sees new UI 👀
```

**🎯 This is when you actually see the changes!**

#### ⚡ Step 4: Effects (After Paint)

**What happens**: `useEffect` runs asynchronously, after the browser has painted.

```javascript
function MyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // ⚡ This runs AFTER browser paint
    console.log('Effect: User can already see the updated UI');
    
    // Perfect for side effects that don't affect layout:
    document.title = `Count: ${count}`; // Update page title
    
    // API calls, analytics, etc.
    fetch('/api/log-count', { 
      method: 'POST', 
      body: JSON.stringify({ count }) 
    });
    
  }, [count]);
  
  return <div>Count: {count}</div>;
}
```

**🕐 Timing**: Browser paints 🎨 → User sees changes 👀 → Effect runs ⚡

### 🎯 Commit Phase Characteristics (The Rules)

Think of the Commit Phase like **actually doing the work**:

#### ✅ What's ALLOWED (Everything!):
- 🌐 **DOM manipulation**: `document.title = 'New Title'`
- 📡 **API calls**: `fetch('/api/data')`
- ⏰ **Timers**: `setTimeout(() => {}, 1000)`
- 💾 **Local storage**: `localStorage.setItem('key', 'value')`
- 🎯 **Event listeners**: `window.addEventListener('click', handler)`
- 📊 **Analytics**: `analytics.track('button_clicked')`

#### 🔄 Special Characteristics:
- **🚫 Not interruptible**: Must complete once started
- **1️⃣ Runs once**: Unlike render phase, commit phase runs exactly once per render
- **✅ Side effects welcome**: This is where side effects belong!
- **👀 Visible**: User can see the results

**🧠 Memory Trick**: 
> "Commit Phase = Do Everything, Make It Real!"

### 📊 Commit Phase Timeline

```
🔨 DOM Mutations (0ms)
    ↓
🎨 Layout Effects (1ms) 
    ↓
🖼️ Browser Paint (2ms) ← USER SEES CHANGES!
    ↓
⚡ Effects (3ms)
```

---

## Virtual DOM and Diffing

### What is Virtual DOM?

Virtual DOM is a JavaScript representation of the real DOM. It's like a blueprint:

```javascript
// Real DOM (expensive to manipulate)
<div id="app">
  <h1>Hello World</h1>
</div>

// Virtual DOM (cheap JavaScript object)
{
  type: 'div',
  props: { id: 'app' },
  children: [
    {
      type: 'h1',
      children: ['Hello World']
    }
  ]
}
```

### Why Virtual DOM?

1. **Performance**: Manipulating JavaScript objects is faster than DOM
2. **Batching**: React can batch multiple updates
3. **Predictability**: Easier to reason about changes

### Diffing Algorithm

React uses a smart diffing algorithm with these rules:

#### Rule 1: Different Element Types
```javascript
// Old
<div>Hello</div>

// New  
<span>Hello</span>

// Result: Completely destroy old div and create new span
```

#### Rule 2: Same Element Type
```javascript
// Old
<div className="old">Hello</div>

// New
<div className="new">Hello</div>

// Result: Keep the div, only update className
```

#### Rule 3: Keys for Lists
```javascript
// Without keys (inefficient)
<ul>
  <li>Apple</li>   // React thinks this changed to Banana
  <li>Banana</li>  // React thinks this changed to Cherry  
  <li>Cherry</li>  // React thinks this is new
</ul>

// With keys (efficient)
<ul>
  <li key="apple">Apple</li>   // React knows this moved
  <li key="banana">Banana</li> // React knows this moved
  <li key="cherry">Cherry</li> // React knows this is new
</ul>
```

---

## React Fiber Architecture

### What is Fiber?

Fiber is React's reconciliation algorithm that makes rendering **interruptible** and **prioritized**.

### Before Fiber (React 15 and earlier):
```javascript
// Rendering was synchronous and blocking
function render() {
  // Process Component A (blocking)
  // Process Component B (blocking)  
  // Process Component C (blocking)
  // ... browser is frozen during this time
}
```

### With Fiber (React 16+):
```javascript
// Rendering can be interrupted and prioritized
function renderWithFiber() {
  // Process Component A
  // Check: Do we have time? Is there higher priority work?
  // If yes, continue. If no, pause and resume later.
  // Process Component B
  // Check again...
}
```

### Fiber Benefits:
- **Interruptible rendering**: Can pause for high-priority updates
- **Priority-based scheduling**: Animations get higher priority than data fetching
- **Better user experience**: UI stays responsive

---

## Triggers for Re-rendering

### 1. State Changes
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // Triggers re-render
  };
  
  return <button onClick={handleClick}>{count}</button>;
}
```

### 2. Props Changes
```javascript
function Child({ name }) {
  return <div>Hello {name}</div>;
}

function Parent() {
  const [name, setName] = useState('John');
  
  return (
    <div>
      <Child name={name} /> {/* Re-renders when name changes */}
      <button onClick={() => setName('Jane')}>
        Change Name
      </button>
    </div>
  );
}
```

### 3. Parent Re-render
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Child /> {/* Re-renders even though it has no props! */}
      <button onClick={() => setCount(count + 1)}>
        Update Parent
      </button>
    </div>
  );
}

function Child() {
  console.log('Child re-rendered'); // This will log on parent updates
  return <div>I'm a child</div>;
}
```

### 4. Context Changes
```javascript
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Child /> {/* Re-renders when theme changes */}
    </ThemeContext.Provider>
  );
}

function Child() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Themed component</div>;
}
```

---

## Performance Optimizations

### 1. React.memo (Prevent unnecessary re-renders)
```javascript
// Without memo - re-renders on every parent update
function ExpensiveChild({ name }) {
  console.log('Expensive calculation...');
  return <div>Hello {name}</div>;
}

// With memo - only re-renders when props change
const OptimizedChild = React.memo(function ExpensiveChild({ name }) {
  console.log('Expensive calculation...');
  return <div>Hello {name}</div>;
});
```

### 2. useMemo (Memoize expensive calculations)
```javascript
function ExpensiveComponent({ items }) {
  // Without useMemo - recalculates on every render
  const expensiveValue = items.reduce((sum, item) => sum + item.value, 0);
  
  // With useMemo - only recalculates when items change
  const memoizedValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>Total: {memoizedValue}</div>;
}
```

### 3. useCallback (Memoize functions)
```javascript
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  // Without useCallback - new function on every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // With useCallback - same function reference
  const memoizedHandleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty dependency array means function never changes
  
  return (
    <div>
      <Child onClick={memoizedHandleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}

const Child = React.memo(function Child({ onClick }) {
  return <button onClick={onClick}>Click me</button>;
});
```

---

## Common Misconceptions

### ❌ Misconception 1: "Rendering means DOM update"
**Reality**: Rendering is just creating the Virtual DOM. DOM updates happen in the commit phase.

### ❌ Misconception 2: "useState always causes re-render"
```javascript
function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(0); // If count is already 0, React skips re-render!
  };
  
  return <button onClick={handleClick}>{count}</button>;
}
```

### ❌ Misconception 3: "useEffect runs during render"
**Reality**: `useEffect` runs **after** the commit phase, asynchronously.

### ❌ Misconception 4: "Virtual DOM is always faster"
**Reality**: For simple updates, direct DOM manipulation can be faster. Virtual DOM shines with complex UIs and batched updates.

---

## Practical Examples

### Example 1: Understanding Render Phase
```javascript
function DebugComponent() {
  const [count, setCount] = useState(0);
  
  // This runs during RENDER PHASE
  console.log('Render phase: Component function executing');
  
  // This runs during COMMIT PHASE
  useEffect(() => {
    console.log('Commit phase: Effect running');
  });
  
  // This also runs during COMMIT PHASE (but synchronously)
  useLayoutEffect(() => {
    console.log('Commit phase: Layout effect running');
  });
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Console output when button is clicked:
// 1. "Render phase: Component function executing"
// 2. "Commit phase: Layout effect running"  
// 3. "Commit phase: Effect running"
```

### Example 2: Batching Updates
```javascript
function BatchingExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  console.log('Rendering...'); // Only logs once per batch
  
  const handleClick = () => {
    // React 18: These are automatically batched
    setCount(count + 1);
    setName('Jane');
    // Only one re-render happens, not two!
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={handleClick}>Update Both</button>
    </div>
  );
}
```

### Example 3: Conditional Rendering and Keys
```javascript
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}> {/* Key helps React identify items */}
          <input type="checkbox" checked={todo.completed} />
          <span>{todo.text}</span>
          {todo.completed && <span> ✓</span>} {/* Conditional rendering */}
        </li>
      ))}
    </ul>
  );
}

// When a todo is marked complete:
// 1. RENDER PHASE: React creates new Virtual DOM with ✓ span
// 2. DIFFING: React sees new span needs to be added
// 3. COMMIT PHASE: React adds the ✓ span to real DOM
```

---

## Summary

React's rendering process is a sophisticated system designed for performance and predictability:

1. **Render Phase**: Figure out what changed (pure, interruptible)
2. **Commit Phase**: Apply changes to DOM (synchronous, side effects allowed)
3. **Virtual DOM**: JavaScript representation for efficient diffing
4. **Fiber**: Makes rendering interruptible and prioritized
5. **Optimizations**: Use `memo`, `useMemo`, `useCallback` wisely

Understanding this process helps you:
- Write more performant React code
- Debug rendering issues
- Make informed optimization decisions
- Understand why React behaves the way it does

Remember: React is optimized by default. Only optimize when you have actual performance problems!

---

## 📚 Glossary of Terms

### 🔤 A-D

**🎨 Component**: A JavaScript function that returns JSX (like a blueprint for UI)
```javascript
function Button() { return <button>Click me</button>; }
```

**💾 Commit Phase**: The second phase where React actually updates the DOM and runs effects

**🔍 Diffing**: The process of comparing old Virtual DOM with new Virtual DOM to find changes

**🌐 DOM (Document Object Model)**: The actual HTML elements in your browser that users see

### 🔤 E-J

**⚡ Effect**: Code that runs after rendering (using `useEffect`)
```javascript
useEffect(() => { console.log('This is an effect'); }, []);
```

**🧵 Fiber**: React's internal algorithm that makes rendering interruptible and prioritized

**🎯 JSX**: A syntax that lets you write HTML-like code in JavaScript
```javascript
const element = <div>Hello World</div>; // This is JSX
```

### 🔤 K-P

**🎨 Layout Effect**: Code that runs after DOM updates but before browser paint (`useLayoutEffect`)

**📦 Props**: Data passed from parent component to child component
```javascript
<Child name="John" age={25} /> // name and age are props
```

### 🔤 Q-S

**🔄 Re-render**: When React runs the render phase again for a component

**🔄 Render Phase**: The first phase where React plans what changes to make (pure, no side effects)

**🔄 Rendering**: The entire process of converting components to DOM elements

**🏪 State**: Data that belongs to a component and can change over time
```javascript
const [count, setCount] = useState(0); // count is state
```

### 🔤 T-Z

**🚨 Trigger**: Something that causes React to start re-rendering (state change, props change, etc.)

**👻 Virtual DOM**: A JavaScript representation of the real DOM (faster to work with)

**🎣 Hook**: Special functions that let you use React features (useState, useEffect, etc.)

### 🧠 Memory Aids

**🎭 "Plan, Then Act"**: Render Phase plans, Commit Phase acts
**🏪 "State Changes = Re-renders"**: When state changes, React re-renders
**👻 "Virtual First, Real Second"**: React updates Virtual DOM first, then real DOM
**🎯 "Pure Render, Side Effect Commit"**: Render phase is pure, Commit phase allows side effects
