/**
 * PreviewFrame Class
 * Manages iframe for live preview with console interception
 */

import { RuntimeError, SecurityError } from './CustomErrors.js';

export class PreviewFrame {
    constructor(iframeElement, consoleInstance) {
        this.iframe = iframeElement;
        this.console = consoleInstance;
        this.isRendering = false;
        this.renderQueue = [];
        this.observer = null;
        this.listeners = new Map();

        this.init();
    }

    init() {
        // Set up iframe error handling
        window.addEventListener('message', this.handleMessage.bind(this));

        // Set up mutation observer for iframe content
        this.setupMutationObserver();
    }

    setupMutationObserver() {
        // Wait for iframe to load before observing
        this.iframe.addEventListener('load', () => {
            try {
                const iframeDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;

                if (this.observer) {
                    this.observer.disconnect();
                }

                this.observer = new MutationObserver((mutations) => {
                    this.emit('dom-change', {
                        mutations: mutations.map(m => ({
                            type: m.type,
                            target: m.target.nodeName,
                            addedNodes: m.addedNodes.length,
                            removedNodes: m.removedNodes.length
                        }))
                    });
                });

                this.observer.observe(iframeDoc.body || iframeDoc.documentElement, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    characterData: true
                });
            } catch (error) {
                console.error('Failed to setup MutationObserver:', error);
            }
        });
    }

    handleMessage(event) {
        // Security: verify message origin if needed
        // if (event.origin !== window.location.origin) return;

        const { type, data } = event.data;

        switch (type) {
            case 'console-log':
                this.console?.log(data.args, data.level);
                break;
            case 'console-error':
                this.console?.error(new RuntimeError(data.message, data.line, data.column));
                break;
            case 'runtime-error':
                this.handleRuntimeError(data);
                break;
        }
    }

    handleRuntimeError(errorData) {
        const error = new RuntimeError(
            errorData.message,
            errorData.lineno,
            errorData.colno,
            errorData.stack
        );
        this.console?.error(error);
        this.emit('error', error);
    }

    async render(html, css, js) {
        // Add to queue if currently rendering
        if (this.isRendering) {
            this.renderQueue.push({ html, css, js });
            return;
        }

        this.isRendering = true;

        try {
            // Security check
            this.performSecurityCheck(html, css, js);

            // Build complete HTML document
            const document = this.buildDocument(html, css, js);

            // Render in iframe
            await this.renderDocument(document);

            this.emit('render-success', { html, css, js });
        } catch (error) {
            this.emit('render-error', error);
            this.console?.error(error);
        } finally {
            this.isRendering = false;

            // Process queue
            if (this.renderQueue.length > 0) {
                const next = this.renderQueue.pop();
                this.renderQueue = []; // Clear queue, only render latest
                this.render(next.html, next.css, next.js);
            }
        }
    }

    performSecurityCheck(html, css, js) {
        // Check for potentially dangerous patterns
        const dangerousPatterns = [
            /eval\s*\(/gi,
            /Function\s*\(/gi,
            /<script[^>]*src\s*=\s*["'](?!data:)/gi, // External scripts
        ];

        const allCode = html + css + js;

        for (const pattern of dangerousPatterns) {
            if (pattern.test(allCode)) {
                console.warn('Potentially dangerous code detected:', pattern);
                // Don't block, just warn for educational purposes
                // In production, you might want to block or sanitize
            }
        }
    }

    buildDocument(html, css, js) {
        // Wrap JS code with console interception and error handling
        const wrappedJS = this.wrapJavaScript(js);

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Reset styles for consistent preview */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 1rem;
        }
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        ${wrappedJS}
    </script>
</body>
</html>
        `.trim();
    }

    wrapJavaScript(js) {
        return `
(function() {
    'use strict';

    // Intercept console methods
    const originalConsole = {
        log: console.log.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console),
        info: console.info.bind(console),
        debug: console.debug.bind(console),
        table: console.table.bind(console)
    };

    function postToParent(type, data) {
        try {
            window.parent.postMessage({ type, data }, '*');
        } catch (e) {
            originalConsole.error('Failed to post message to parent:', e);
        }
    }

    // Override console methods
    ['log', 'warn', 'error', 'info', 'debug'].forEach(level => {
        console[level] = function(...args) {
            originalConsole[level](...args);
            postToParent('console-log', {
                level,
                args: args.map(arg => {
                    try {
                        if (typeof arg === 'object') {
                            return JSON.parse(JSON.stringify(arg));
                        }
                        return arg;
                    } catch (e) {
                        return String(arg);
                    }
                }),
                timestamp: Date.now()
            });
        };
    });

    // Override console.table
    console.table = function(data) {
        originalConsole.table(data);
        postToParent('console-log', {
            level: 'table',
            args: [data],
            timestamp: Date.now()
        });
    };

    // Global error handler
    window.addEventListener('error', function(event) {
        postToParent('runtime-error', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error ? event.error.stack : '',
            timestamp: Date.now()
        });
        return false; // Don't suppress default error handling
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        postToParent('runtime-error', {
            message: 'Unhandled Promise Rejection: ' + event.reason,
            lineno: null,
            colno: null,
            stack: event.reason && event.reason.stack ? event.reason.stack : '',
            timestamp: Date.now()
        });
    });

    // Provide helper functions for event loop demonstration
    window.logMacrotask = function(message) {
        postToParent('console-log', {
            level: 'log',
            args: [message],
            taskType: 'macrotask',
            timestamp: Date.now()
        });
    };

    window.logMicrotask = function(message) {
        postToParent('console-log', {
            level: 'log',
            args: [message],
            taskType: 'microtask',
            timestamp: Date.now()
        });
    };

    window.demoEventLoop = function() {
        console.log('🏁 Event Loop Demo Started');

        console.log('1️⃣ Synchronous code');

        setTimeout(() => {
            window.logMacrotask('3️⃣ Macrotask (setTimeout)');
        }, 0);

        Promise.resolve().then(() => {
            window.logMicrotask('2️⃣ Microtask (Promise)');
        });

        Promise.resolve().then(() => {
            window.logMicrotask('2️⃣ Another Microtask');
        }).then(() => {
            window.logMicrotask('2️⃣ Chained Microtask');
        });

        setTimeout(() => {
            window.logMacrotask('3️⃣ Another Macrotask');
            Promise.resolve().then(() => {
                window.logMicrotask('4️⃣ Microtask after Macrotask');
            });
        }, 0);

        console.log('1️⃣ More synchronous code');
    };

    // Performance tracking
    window.measurePerformance = function(fn, label = 'Operation') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(\`⏱️  \${label}: \${(end - start).toFixed(2)}ms\`);
        return result;
    };

    try {
        // User code starts here
        ${js}
        // User code ends here
    } catch (error) {
        postToParent('runtime-error', {
            message: error.message,
            lineno: error.lineNumber || null,
            colno: error.columnNumber || null,
            stack: error.stack || '',
            timestamp: Date.now()
        });
        throw error; // Re-throw for iframe console
    }
})();
        `.trim();
    }

    renderDocument(documentString) {
        return new Promise((resolve, reject) => {
            try {
                // Use srcdoc for safer rendering
                this.iframe.srcdoc = documentString;

                // Wait for load
                const handleLoad = () => {
                    this.iframe.removeEventListener('load', handleLoad);
                    resolve();
                };

                this.iframe.addEventListener('load', handleLoad);

                // Timeout after 5 seconds
                setTimeout(() => {
                    this.iframe.removeEventListener('load', handleLoad);
                    reject(new Error('Preview rendering timeout'));
                }, 5000);
            } catch (error) {
                reject(error);
            }
        });
    }

    clearPreview() {
        this.iframe.srcdoc = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #888;
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <div>Preview cleared. Start coding to see output.</div>
</body>
</html>
        `;

        if (this.observer) {
            this.observer.disconnect();
        }

        this.emit('clear');
    }

    refresh() {
        // Force reload iframe
        const currentSrc = this.iframe.srcdoc;
        this.iframe.srcdoc = '';
        setTimeout(() => {
            this.iframe.srcdoc = currentSrc;
        }, 10);
    }

    getIframeDocument() {
        try {
            return this.iframe.contentDocument || this.iframe.contentWindow.document;
        } catch (error) {
            console.error('Cannot access iframe document:', error);
            return null;
        }
    }

    getIframeWindow() {
        try {
            return this.iframe.contentWindow;
        } catch (error) {
            console.error('Cannot access iframe window:', error);
            return null;
        }
    }

    // Event emitter functionality
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;
        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    emit(event, data) {
        if (!this.listeners.has(event)) return;
        this.listeners.get(event).forEach(callback => callback(data));
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        window.removeEventListener('message', this.handleMessage.bind(this));
        this.listeners.clear();
    }
}

export default PreviewFrame;
