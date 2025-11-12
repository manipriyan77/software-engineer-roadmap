# 🎨 Interactive Code Playground with Live Preview

A fully-featured, browser-based code editor with live preview, console output, and cloud storage capabilities. Built with vanilla JavaScript to demonstrate advanced JavaScript concepts.

## 🚀 Features

### Core Features
- **Split-Pane Editor**: Separate editors for HTML, CSS, and JavaScript with syntax highlighting
- **Live Preview**: Real-time preview of your code in a sandboxed iframe
- **Console Output Panel**: Captures and displays console logs, warnings, and errors from your code
- **Code Sharing**: Share your code via unique URLs
- **Auto-Save**: Automatic saving with LocalStorage and draft recovery
- **Cloud Storage**: Save and load snippets (with mock cloud storage)
- **Dark/Light Theme**: Toggle between themes
- **Export**: Download your code as a standalone HTML file

### Advanced Features
- Syntax highlighting for HTML, CSS, and JavaScript
- Line numbers and scrolling sync
- Auto-closing brackets and quotes
- Tab indentation support
- Comment toggling (Ctrl+/)
- Undo/Redo functionality
- Error highlighting with stack traces
- Event loop visualization helpers
- Resizable panels
- Keyboard shortcuts

## 📚 JavaScript Concepts Covered

### 1. **Classes**
- `Editor`: Manages individual code editors with syntax highlighting
- `Console`: Handles console output with filtering and formatting
- `PreviewFrame`: Manages iframe rendering and console interception
- Custom Error Classes: `RuntimeError`, `NetworkError`, `StorageError`, etc.

### 2. **DOM Manipulation**
- `contenteditable` for code editing
- Dynamic element creation and manipulation
- `MutationObserver` for tracking iframe DOM changes
- `Selection API` for cursor positioning and text selection

### 3. **Events**
- Event listeners for keyboard shortcuts (`keydown`, `keyup`)
- Input events with debouncing
- Custom event emitters
- Message passing between iframe and parent (`postMessage`)

### 4. **Async/Await & Promises**
- Promise-based auto-save
- `async/await` for IndexedDB operations
- `fetch` API for network requests
- Promisification of callback-based APIs

### 5. **Error Handling**
- Try-catch blocks for user code execution
- Custom error classes extending `Error`
- Error boundaries in iframe
- Network error handling with retry logic

### 6. **Storage**
- **LocalStorage**: Draft auto-save, settings, backups
- **IndexedDB**: Snippet history and persistent storage
- Storage quota management
- Data serialization and compression

### 7. **Network**
- Fetch API for HTTP requests
- URL objects for sharing
- CORS handling
- Network error recovery

### 8. **Event Loop**
- Macrotask vs Microtask demonstration
- `setTimeout` and `Promise` timing
- Helper functions for event loop visualization

## 🎯 Project Structure

```
live-code-playground/
├── index.html                  # Main HTML structure
├── styles/
│   ├── main.css               # General layout and UI
│   ├── editor.css             # Editor-specific styles
│   └── console.css            # Console panel styles
├── js/
│   ├── classes/
│   │   ├── Editor.js          # Editor class with syntax highlighting
│   │   ├── PreviewFrame.js    # Iframe preview manager
│   │   ├── Console.js         # Console output handler
│   │   └── CustomErrors.js    # Custom error classes
│   ├── utils/
│   │   ├── debounce.js        # Debounce, throttle utilities
│   │   ├── storage.js         # LocalStorage manager
│   │   └── urlSharing.js      # URL encoding/sharing
│   ├── services/
│   │   ├── indexedDBManager.js # IndexedDB operations
│   │   ├── autoSave.js        # Auto-save service
│   │   └── cloudStorage.js    # Cloud storage service
│   └── main.js                # Main application controller
└── README.md
```

## 🛠️ Getting Started

### Installation

1. Clone or download this project
2. Open `index.html` in a modern web browser
3. No build step or dependencies required!

### Usage

1. **Write Code**: Type HTML, CSS, and JavaScript in the respective editors
2. **Live Preview**: See your code running in real-time in the preview panel
3. **Console**: Check console output, logs, and errors
4. **Save**: Click "Save" to store your snippet locally and in IndexedDB
5. **Share**: Click "Share" to generate a shareable URL
6. **Export**: Click "Export" to download as a standalone HTML file

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save snippet |
| `Ctrl/Cmd + N` | New snippet |
| `Ctrl/Cmd + K` | Share code |
| `Ctrl/Cmd + L` | Clear console |
| `Ctrl/Cmd + Enter` | Force preview update |
| `Ctrl/Cmd + /` | Toggle comment |
| `Tab` | Insert 2 spaces |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |

## 🔧 Architecture

### Editor Class
```javascript
class Editor {
    - Manages contenteditable elements
    - Implements syntax highlighting
    - Handles keyboard shortcuts
    - Tracks undo/redo history
    - Emits change events
}
```

### PreviewFrame Class
```javascript
class PreviewFrame {
    - Renders code in sandboxed iframe
    - Intercepts console messages
    - Handles runtime errors
    - Uses MutationObserver for DOM changes
    - Provides event loop demo helpers
}
```

### Console Class
```javascript
class Console {
    - Displays logs, warnings, errors
    - Filters by log level
    - Formats objects and arrays
    - Shows stack traces
    - Supports event loop indicators
}
```

## 🎓 Learning Points

### 1. Custom Error Handling
See `CustomErrors.js` for examples of extending the Error class:

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

### 2. Debouncing
Prevents excessive function calls:

```javascript
const debouncedUpdate = debounce(() => {
    updatePreview();
}, 500);
```

### 3. Promise-based IndexedDB
Wrapping callback-based APIs in Promises:

```javascript
async addSnippet(snippet) {
    return new Promise((resolve, reject) => {
        const request = store.add(snippet);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
```

### 4. Event Loop Demonstration
Use the built-in helper functions in the JavaScript editor:

```javascript
// In your JS editor, try:
demoEventLoop();

// Or manually:
console.log('1: Sync');

setTimeout(() => {
    logMacrotask('3: Macrotask');
}, 0);

Promise.resolve().then(() => {
    logMicrotask('2: Microtask');
});
```

### 5. Iframe Security
The preview uses sandbox attributes for security:

```html
<iframe sandbox="allow-scripts allow-modals allow-forms">
```

## 🐛 Error Handling Examples

The playground demonstrates comprehensive error handling:

1. **Runtime Errors**: Caught from iframe execution
2. **Network Errors**: With retry logic
3. **Storage Errors**: Quota exceeded handling
4. **Validation Errors**: Input validation

## 💾 Storage Architecture

### LocalStorage
- Current draft (auto-saved)
- User preferences
- Backups (last 10)
- Settings

### IndexedDB
- Snippet history
- Long-term storage
- Search capabilities
- Export/import support

## 🎨 Customization

### Adding New Themes
Edit CSS variables in `main.css`:

```css
[data-theme="custom"] {
    --bg-primary: #your-color;
    --text-primary: #your-color;
    /* ... */
}
```

### Adding Language Support
Extend the `Editor` class to add more syntax highlighting:

```javascript
highlightPython(code) {
    // Add Python syntax highlighting
}
```

## 🔒 Security Considerations

1. **Iframe Sandbox**: User code runs in a sandboxed iframe
2. **Content Security**: No external script loading allowed
3. **XSS Prevention**: HTML escaping for user input
4. **Storage Limits**: Quota management for storage

## 🚀 Future Enhancements

- [ ] Multiple file support
- [ ] Code formatting (Prettier integration)
- [ ] Collaborative editing (WebSockets)
- [ ] More language support
- [ ] Terminal emulation
- [ ] Git integration
- [ ] NPM package support
- [ ] Mobile responsive design

## 📝 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (some IndexedDB limitations)
- Mobile browsers: ⚠️ Limited (large screens recommended)

## 🤝 Contributing

This is an educational project. Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Use it as a learning resource

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Educational Use

This project is perfect for learning:
- Modern JavaScript (ES6+)
- Async programming patterns
- Browser APIs (Storage, IndexedDB, Fetch)
- DOM manipulation
- Event handling
- Error handling strategies
- Code organization and architecture

## 🙏 Acknowledgments

Built as a comprehensive demonstration of JavaScript concepts including:
- Classes and OOP
- Promises and async/await
- Browser storage APIs
- DOM and events
- Error handling
- Network requests
- Event loop mechanics

---

**Happy Coding! 🎉**

For questions or feedback, open an issue or contribute to the project.
