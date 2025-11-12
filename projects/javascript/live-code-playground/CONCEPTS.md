# JavaScript Concepts Demonstrated

This document outlines all the JavaScript concepts covered in the Interactive Code Playground project.

## 1. Classes (Object-Oriented Programming)

### Custom Classes
- **Editor Class** ([Editor.js](js/classes/Editor.js))
  - Constructor with initialization
  - Private properties and methods
  - Public API methods
  - Event emitter pattern

- **Console Class** ([Console.js](js/classes/Console.js))
  - Managing state
  - Rendering methods
  - Data formatting

- **PreviewFrame Class** ([PreviewFrame.js](js/classes/PreviewFrame.js))
  - Composition (contains Console reference)
  - Event handling
  - Async rendering

### Extending Built-in Classes
- **Custom Error Classes** ([CustomErrors.js](js/classes/CustomErrors.js))
  ```javascript
  class RuntimeError extends Error {
      constructor(message, line, column) {
          super(message);
          this.name = 'RuntimeError';
          this.line = line;
          this.column = column;
      }
  }
  ```
  - RuntimeError
  - NetworkError
  - StorageError
  - ValidationError
  - SecurityError

## 2. DOM Manipulation

### Core DOM APIs
- **contenteditable**: Used for code editors
  ```javascript
  editorElement.contentEditable = true;
  ```

- **Selection API**: Cursor positioning
  ```javascript
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  ```

- **TreeWalker**: Navigating DOM nodes
  ```javascript
  const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
  );
  ```

### MutationObserver
Watches for DOM changes in iframe:
```javascript
this.observer = new MutationObserver((mutations) => {
    // Handle DOM changes
});
this.observer.observe(element, {
    childList: true,
    subtree: true,
    attributes: true
});
```

### Dynamic Element Creation
```javascript
const entryElement = document.createElement('div');
entryElement.innerHTML = `...`;
container.appendChild(entryElement);
```

## 3. Events

### Event Listeners
```javascript
element.addEventListener('input', this.handleInput.bind(this));
element.addEventListener('keydown', this.handleKeyDown.bind(this));
```

### Custom Event Emitters
```javascript
class Editor {
    emit(event, data) {
        if (!this.listeners.has(event)) return;
        this.listeners.get(event).forEach(callback => callback(data));
    }
}
```

### Window Messages (postMessage)
Communication between iframe and parent:
```javascript
// Iframe sends message
window.parent.postMessage({ type: 'log', data }, '*');

// Parent receives message
window.addEventListener('message', (event) => {
    const { type, data } = event.data;
});
```

### Keyboard Shortcuts
```javascript
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.handleSave();
    }
});
```

## 4. Async/Await & Promises

### Promise-based Operations
```javascript
async performSave(html, css, js) {
    return new Promise(async (resolve, reject) => {
        try {
            await delay(100);
            resolve(draft);
        } catch (error) {
            reject(error);
        }
    });
}
```

### Fetch API
```javascript
async saveSnippet(snippet) {
    const response = await fetch(`${this.apiBaseURL}/snippets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snippet)
    });

    if (!response.ok) throw new NetworkError('Failed to save');
    return await response.json();
}
```

### Promisification
Converting callback-based APIs to Promises:
```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Promise.all for Parallel Operations
```javascript
const promises = stores.map(storeName => {
    return new Promise((resolve, reject) => {
        const request = transaction.objectStore(storeName).clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject();
    });
});

await Promise.all(promises);
```

## 5. Error Handling

### Try-Catch Blocks
```javascript
try {
    const result = await this.performSave(html, css, js);
} catch (error) {
    console.error('Auto-save failed:', error);
    this.updateIndicator('error');
}
```

### Custom Error Classes
```javascript
throw new NetworkError(
    'Failed to save snippet',
    url,
    response.status,
    'POST'
);
```

### Error Boundaries in Iframe
```javascript
window.addEventListener('error', function(event) {
    postToParent('runtime-error', {
        message: event.message,
        lineno: event.lineno,
        colno: event.colno
    });
});
```

### Unhandled Promise Rejection
```javascript
window.addEventListener('unhandledrejection', function(event) {
    postToParent('runtime-error', {
        message: 'Unhandled Promise Rejection: ' + event.reason
    });
});
```

## 6. Storage APIs

### LocalStorage
```javascript
class LocalStorageManager {
    set(key, value) {
        const serialized = JSON.stringify(value);
        localStorage.setItem(this.getKey(key), serialized);
    }

    get(key, defaultValue = null) {
        const item = localStorage.getItem(this.getKey(key));
        return item ? JSON.parse(item) : defaultValue;
    }
}
```

### IndexedDB (Promise-wrapped)
```javascript
async init() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);

        request.onsuccess = () => {
            this.db = request.result;
            resolve(this.db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const store = db.createObjectStore('snippets', {
                keyPath: 'id'
            });
            store.createIndex('name', 'name', { unique: false });
        };
    });
}
```

### Storage Quota Management
```javascript
async estimateSize() {
    if (navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        return {
            usage: estimate.usage,
            quota: estimate.quota,
            percentage: (estimate.usage / estimate.quota) * 100
        };
    }
}
```

## 7. Network & URL

### Fetch with Error Handling
```javascript
const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

if (!response.ok) {
    throw new NetworkError('Request failed', url, response.status);
}
```

### URL Objects
```javascript
const url = new URL(window.location.href);
url.searchParams.set('snippet', snippetId);
return url.toString();
```

### URLSearchParams
```javascript
const urlParams = new URLSearchParams(window.location.search);
const snippetId = urlParams.get('snippet');
```

### Base64 Encoding/Decoding
```javascript
// Encode
const base64 = btoa(compressed);

// Decode
const compressed = atob(base64);
```

### Clipboard API
```javascript
async copyToClipboard(url) {
    try {
        await navigator.clipboard.writeText(url);
        return true;
    } catch (error) {
        return this.copyToClipboardFallback(url);
    }
}
```

## 8. Event Loop

### Macrotasks (setTimeout)
```javascript
setTimeout(() => {
    window.logMacrotask('Macrotask executed');
}, 0);
```

### Microtasks (Promises)
```javascript
Promise.resolve().then(() => {
    window.logMicrotask('Microtask executed');
});
```

### Event Loop Demonstration
```javascript
window.demoEventLoop = function() {
    console.log('1️⃣ Synchronous code');

    setTimeout(() => {
        logMacrotask('3️⃣ Macrotask');
    }, 0);

    Promise.resolve().then(() => {
        logMicrotask('2️⃣ Microtask');
    });

    console.log('1️⃣ More synchronous code');
};
```

## 9. Utility Patterns

### Debouncing
```javascript
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
```

### Throttling
```javascript
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

### Async Debounce
```javascript
function debounceAsync(func, wait = 300) {
    let timeout;
    return function(...args) {
        return new Promise((resolve) => {
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                const result = await func.apply(this, args);
                resolve(result);
            }, wait);
        });
    };
}
```

## 10. Advanced Patterns

### Singleton Pattern
```javascript
export const storage = new LocalStorageManager();
export default storage;
```

### Event Emitter Pattern
```javascript
class EventEmitter {
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    emit(event, data) {
        if (!this.listeners.has(event)) return;
        this.listeners.get(event).forEach(cb => cb(data));
    }
}
```

### Builder Pattern
```javascript
buildDocument(html, css, js) {
    const wrappedJS = this.wrapJavaScript(js);
    return `
        <!DOCTYPE html>
        <html>
            <head><style>${css}</style></head>
            <body>${html}<script>${wrappedJS}</script></body>
        </html>
    `;
}
```

### Composition
```javascript
class PreviewFrame {
    constructor(iframeElement, consoleInstance) {
        this.iframe = iframeElement;
        this.console = consoleInstance; // Composition
    }
}
```

## 11. Modern JavaScript Features

### Destructuring
```javascript
const { type, data } = event.data;
const { html, css, js } = this.getAllCode();
```

### Spread Operator
```javascript
const updated = { ...snippet, ...updates };
```

### Template Literals
```javascript
const html = `
    <div class="console-entry ${entry.level}">
        ${message}
    </div>
`;
```

### Arrow Functions
```javascript
editor.on('change', debounce(() => {
    this.handleCodeChange();
}, 500));
```

### Optional Chaining
```javascript
this.console?.log(message);
```

### Nullish Coalescing
```javascript
const theme = storage.get('theme') ?? 'dark';
```

## 12. Regex for Syntax Highlighting

```javascript
highlightJavaScript(code) {
    return code
        // Keywords
        .replace(/\b(const|let|var|function)\b/g,
                '<span class="token keyword">$1</span>')
        // Strings
        .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g,
                '<span class="token string">$1</span>')
        // Numbers
        .replace(/\b(\d+\.?\d*)\b/g,
                '<span class="token number">$1</span>');
}
```

## Summary

This project demonstrates:
- ✅ 5+ custom classes
- ✅ Extended Error class
- ✅ DOM manipulation (contenteditable, Selection API)
- ✅ MutationObserver
- ✅ Event listeners and custom emitters
- ✅ Promises and async/await
- ✅ Fetch API
- ✅ LocalStorage and IndexedDB
- ✅ Error handling patterns
- ✅ Event loop concepts
- ✅ Debouncing and throttling
- ✅ URL manipulation
- ✅ Clipboard API
- ✅ Modern ES6+ features

Perfect for learning intermediate to advanced JavaScript! 🚀
