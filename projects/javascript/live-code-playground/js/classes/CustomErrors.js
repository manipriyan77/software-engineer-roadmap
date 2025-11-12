/**
 * Custom Error Classes
 * Demonstrates extending the built-in Error class
 */

// Base Custom Error
export class CodePlaygroundError extends Error {
    constructor(message, context = {}) {
        super(message);
        this.name = this.constructor.name;
        this.context = context;
        this.timestamp = new Date().toISOString();

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            context: this.context,
            timestamp: this.timestamp,
            stack: this.stack
        };
    }
}

// Runtime Error - for user code execution errors
export class RuntimeError extends CodePlaygroundError {
    constructor(message, line = null, column = null, sourceCode = '') {
        super(message, { line, column, sourceCode });
        this.line = line;
        this.column = column;
        this.sourceCode = sourceCode;
    }

    getErrorLocation() {
        if (this.line === null) return 'Unknown location';
        return this.column !== null
            ? `Line ${this.line}, Column ${this.column}`
            : `Line ${this.line}`;
    }

    getSourceSnippet(contextLines = 2) {
        if (!this.sourceCode || this.line === null) return null;

        const lines = this.sourceCode.split('\n');
        const startLine = Math.max(0, this.line - contextLines - 1);
        const endLine = Math.min(lines.length, this.line + contextLines);

        return {
            snippet: lines.slice(startLine, endLine),
            startLine: startLine + 1,
            errorLine: this.line
        };
    }
}

// Syntax Error - for code parsing errors
export class CodeSyntaxError extends CodePlaygroundError {
    constructor(message, language, line = null, column = null) {
        super(message, { language, line, column });
        this.language = language;
        this.line = line;
        this.column = column;
    }

    getFormattedMessage() {
        const location = this.line
            ? ` at line ${this.line}${this.column ? `, column ${this.column}` : ''}`
            : '';
        return `Syntax Error in ${this.language.toUpperCase()}${location}: ${this.message}`;
    }
}

// Network Error - for fetch and API failures
export class NetworkError extends CodePlaygroundError {
    constructor(message, url, statusCode = null, method = 'GET') {
        super(message, { url, statusCode, method });
        this.url = url;
        this.statusCode = statusCode;
        this.method = method;
    }

    isRetryable() {
        // Retry on network errors or 5xx server errors
        return this.statusCode === null || (this.statusCode >= 500 && this.statusCode < 600);
    }

    getFormattedMessage() {
        const status = this.statusCode ? ` (${this.statusCode})` : '';
        return `Network Error${status}: ${this.message}\nURL: ${this.url}`;
    }
}

// Storage Error - for LocalStorage and IndexedDB failures
export class StorageError extends CodePlaygroundError {
    constructor(message, storageType, operation) {
        super(message, { storageType, operation });
        this.storageType = storageType;
        this.operation = operation;
    }

    getFormattedMessage() {
        return `Storage Error (${this.storageType}): Failed to ${this.operation}\n${this.message}`;
    }
}

// Validation Error - for input validation failures
export class ValidationError extends CodePlaygroundError {
    constructor(message, field, value) {
        super(message, { field, value });
        this.field = field;
        this.value = value;
    }
}

// Security Error - for sandbox violations or XSS attempts
export class SecurityError extends CodePlaygroundError {
    constructor(message, violationType) {
        super(message, { violationType });
        this.violationType = violationType;
    }

    getFormattedMessage() {
        return `Security Error (${this.violationType}): ${this.message}`;
    }
}

// Export Error - for code export failures
export class ExportError extends CodePlaygroundError {
    constructor(message, format) {
        super(message, { format });
        this.format = format;
    }
}

/**
 * Error Handler Utility
 */
export class ErrorHandler {
    constructor(consoleInstance = null) {
        this.console = consoleInstance;
        this.errorHistory = [];
        this.maxHistorySize = 100;
    }

    handle(error, context = {}) {
        // Create error entry
        const errorEntry = {
            error: error instanceof CodePlaygroundError ? error : this.wrapError(error),
            context,
            timestamp: Date.now(),
            handled: true
        };

        // Add to history
        this.addToHistory(errorEntry);

        // Log to console if available
        if (this.console) {
            this.console.error(errorEntry.error);
        } else {
            console.error(errorEntry.error);
        }

        // Return the error for potential re-throwing
        return errorEntry.error;
    }

    wrapError(error) {
        if (error instanceof CodePlaygroundError) {
            return error;
        }

        // Wrap native errors
        if (error instanceof SyntaxError) {
            return new CodeSyntaxError(error.message, 'javascript');
        }

        if (error instanceof TypeError || error instanceof ReferenceError) {
            return new RuntimeError(error.message);
        }

        // Generic wrapper
        return new CodePlaygroundError(
            error.message || 'An unknown error occurred',
            { originalError: error.constructor.name }
        );
    }

    addToHistory(errorEntry) {
        this.errorHistory.unshift(errorEntry);
        if (this.errorHistory.length > this.maxHistorySize) {
            this.errorHistory.pop();
        }
    }

    getHistory() {
        return [...this.errorHistory];
    }

    clearHistory() {
        this.errorHistory = [];
    }

    getStats() {
        const stats = {
            total: this.errorHistory.length,
            byType: {}
        };

        this.errorHistory.forEach(entry => {
            const typeName = entry.error.name;
            stats.byType[typeName] = (stats.byType[typeName] || 0) + 1;
        });

        return stats;
    }

    // Parse error from iframe execution
    static parseIframeError(errorEvent) {
        const { message, filename, lineno, colno, error } = errorEvent;

        return new RuntimeError(
            message || 'Unknown error',
            lineno,
            colno,
            error?.stack || ''
        );
    }

    // Parse error from try-catch
    static parseTryCatchError(error, sourceCode = '') {
        if (error instanceof CodePlaygroundError) {
            return error;
        }

        // Try to extract line number from stack
        let line = null;
        let column = null;

        if (error.stack) {
            const match = error.stack.match(/:(\d+):(\d+)/);
            if (match) {
                line = parseInt(match[1], 10);
                column = parseInt(match[2], 10);
            }
        }

        if (error instanceof SyntaxError) {
            return new CodeSyntaxError(error.message, 'javascript', line, column);
        }

        return new RuntimeError(error.message, line, column, sourceCode);
    }
}

export default {
    CodePlaygroundError,
    RuntimeError,
    CodeSyntaxError,
    NetworkError,
    StorageError,
    ValidationError,
    SecurityError,
    ExportError,
    ErrorHandler
};
