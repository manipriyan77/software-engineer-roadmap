/**
 * Console Class
 * Manages console output panel with error display and filtering
 */

import { RuntimeError } from './CustomErrors.js';

export class Console {
    constructor(consoleElement) {
        this.element = consoleElement;
        this.entries = [];
        this.currentFilter = 'all';
        this.maxEntries = 1000;
        this.groupStack = [];

        this.init();
    }

    init() {
        // Clear welcome message on first log
        this.hasLogged = false;
    }

    log(message, level = 'log', metadata = {}) {
        if (!this.hasLogged) {
            this.element.innerHTML = '';
            this.hasLogged = true;
        }

        const entry = {
            id: Date.now() + Math.random(),
            level,
            message,
            metadata,
            timestamp: new Date(),
            taskType: metadata.taskType || null
        };

        this.entries.push(entry);

        // Limit entries
        if (this.entries.length > this.maxEntries) {
            this.entries.shift();
            // Optionally remove first child from DOM
            const firstEntry = this.element.querySelector('.console-entry');
            if (firstEntry) firstEntry.remove();
        }

        this.renderEntry(entry);
        this.scrollToBottom();
    }

    warn(message, metadata = {}) {
        this.log(message, 'warn', metadata);
    }

    error(error, metadata = {}) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const entry = {
            id: Date.now() + Math.random(),
            level: 'error',
            message: errorMessage,
            error: error,
            metadata,
            timestamp: new Date()
        };

        this.entries.push(entry);
        this.renderErrorEntry(entry);
        this.scrollToBottom();
    }

    info(message, metadata = {}) {
        this.log(message, 'info', metadata);
    }

    table(data, metadata = {}) {
        if (!this.hasLogged) {
            this.element.innerHTML = '';
            this.hasLogged = true;
        }

        const entry = {
            id: Date.now() + Math.random(),
            level: 'table',
            message: data,
            metadata,
            timestamp: new Date()
        };

        this.entries.push(entry);
        this.renderTableEntry(entry);
        this.scrollToBottom();
    }

    renderEntry(entry) {
        // Check filter
        if (this.currentFilter !== 'all' && this.currentFilter !== entry.level) {
            return; // Don't render if filtered out
        }

        const entryElement = document.createElement('div');
        entryElement.className = `console-entry ${entry.level}`;
        entryElement.dataset.entryId = entry.id;
        entryElement.dataset.level = entry.level;

        // Add macrotask/microtask class
        if (entry.taskType) {
            entryElement.classList.add(entry.taskType);
        }

        const icon = this.getIcon(entry.level);
        const timestamp = this.formatTimestamp(entry.timestamp);
        const message = this.formatMessage(entry.message);

        entryElement.innerHTML = `
            <span class="console-icon">${icon}</span>
            <span class="console-timestamp">${timestamp}</span>
            <div class="console-message">${message}</div>
            ${entry.taskType ? `<span class="console-event-loop-indicator ${entry.taskType}">${entry.taskType}</span>` : ''}
            <button class="console-copy-btn" title="Copy">📋</button>
        `;

        // Add copy functionality
        const copyBtn = entryElement.querySelector('.console-copy-btn');
        copyBtn.addEventListener('click', () => this.copyEntry(entry));

        this.element.appendChild(entryElement);

        // Animate entry
        requestAnimationFrame(() => {
            entryElement.style.opacity = '1';
        });
    }

    renderErrorEntry(entry) {
        const entryElement = document.createElement('div');
        entryElement.className = 'console-entry error';
        entryElement.dataset.entryId = entry.id;
        entryElement.dataset.level = 'error';

        const timestamp = this.formatTimestamp(entry.timestamp);
        const message = entry.message;

        let stackTraceHTML = '';
        if (entry.error instanceof RuntimeError) {
            const location = entry.error.getErrorLocation();
            const snippet = entry.error.getSourceSnippet();

            stackTraceHTML = `
                <div class="console-stack-trace">
                    <div class="console-stack-trace-header">
                        <span>📍 ${location}</span>
                        <span style="cursor: pointer;">▼ Stack Trace</span>
                    </div>
                    <div class="console-stack-trace-content">
                        ${snippet ? this.renderSourceSnippet(snippet) : ''}
                        <pre>${this.escapeHTML(entry.error.stack || 'No stack trace available')}</pre>
                    </div>
                </div>
            `;
        } else if (entry.error?.stack) {
            stackTraceHTML = `
                <div class="console-stack-trace">
                    <div class="console-stack-trace-header">
                        <span>Stack Trace</span>
                        <span style="cursor: pointer;">▼</span>
                    </div>
                    <div class="console-stack-trace-content">
                        <pre>${this.escapeHTML(entry.error.stack)}</pre>
                    </div>
                </div>
            `;
        }

        entryElement.innerHTML = `
            <span class="console-icon">❌</span>
            <span class="console-timestamp">${timestamp}</span>
            <div class="console-message">${this.escapeHTML(message)}</div>
            ${stackTraceHTML}
        `;

        // Make stack trace collapsible
        const stackTraceHeader = entryElement.querySelector('.console-stack-trace-header');
        if (stackTraceHeader) {
            stackTraceHeader.addEventListener('click', () => {
                const content = entryElement.querySelector('.console-stack-trace-content');
                content.classList.toggle('show');
            });
        }

        this.element.appendChild(entryElement);
    }

    renderTableEntry(entry) {
        const entryElement = document.createElement('div');
        entryElement.className = 'console-entry log';
        entryElement.dataset.entryId = entry.id;

        const timestamp = this.formatTimestamp(entry.timestamp);
        const tableHTML = this.createTable(entry.message);

        entryElement.innerHTML = `
            <span class="console-icon">📊</span>
            <span class="console-timestamp">${timestamp}</span>
            <div class="console-message">${tableHTML}</div>
        `;

        this.element.appendChild(entryElement);
    }

    createTable(data) {
        if (!data || typeof data !== 'object') {
            return '<div>Invalid table data</div>';
        }

        const isArray = Array.isArray(data);
        let html = '<table class="console-table">';

        if (isArray && data.length > 0) {
            // Array of objects
            const keys = Object.keys(data[0]);
            html += '<thead><tr><th>(index)</th>';
            keys.forEach(key => {
                html += `<th>${this.escapeHTML(String(key))}</th>`;
            });
            html += '</tr></thead><tbody>';

            data.forEach((item, index) => {
                html += `<tr><td>${index}</td>`;
                keys.forEach(key => {
                    html += `<td>${this.formatValue(item[key])}</td>`;
                });
                html += '</tr>';
            });
        } else {
            // Object
            html += '<thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';
            Object.entries(data).forEach(([key, value]) => {
                html += `<tr><td>${this.escapeHTML(String(key))}</td><td>${this.formatValue(value)}</td></tr>`;
            });
        }

        html += '</tbody></table>';
        return html;
    }

    renderSourceSnippet(snippetData) {
        const { snippet, startLine, errorLine } = snippetData;
        let html = '<div class="source-snippet"><pre>';

        snippet.forEach((line, index) => {
            const lineNumber = startLine + index;
            const isErrorLine = lineNumber === errorLine;
            const className = isErrorLine ? 'error-line' : '';
            html += `<div class="${className}"><span class="line-number">${lineNumber}</span>${this.escapeHTML(line)}</div>`;
        });

        html += '</pre></div>';
        return html;
    }

    formatMessage(message) {
        if (Array.isArray(message)) {
            return message.map(item => this.formatValue(item)).join(' ');
        }
        return this.formatValue(message);
    }

    formatValue(value) {
        const type = typeof value;

        switch (type) {
            case 'string':
                return `<span class="console-string">"${this.escapeHTML(value)}"</span>`;
            case 'number':
                return `<span class="console-number">${value}</span>`;
            case 'boolean':
                return `<span class="console-boolean">${value}</span>`;
            case 'undefined':
                return `<span class="console-undefined">undefined</span>`;
            case 'object':
                if (value === null) {
                    return `<span class="console-null">null</span>`;
                }
                if (Array.isArray(value)) {
                    return this.formatArray(value);
                }
                return this.formatObject(value);
            case 'function':
                return `<span class="console-function">ƒ ${value.name || 'anonymous'}()</span>`;
            default:
                return this.escapeHTML(String(value));
        }
    }

    formatArray(arr) {
        if (arr.length === 0) {
            return `<span class="console-object">[]</span>`;
        }

        const id = 'arr-' + Date.now() + Math.random();
        const preview = arr.slice(0, 3).map(item => this.formatValue(item)).join(', ');
        const more = arr.length > 3 ? `, ... ${arr.length - 3} more` : '';

        return `
            <div class="console-expandable" data-id="${id}">
                <span class="console-object">Array(${arr.length}) [${preview}${more}]</span>
                <div class="console-expandable-content">
                    ${arr.map((item, i) => `<div>${i}: ${this.formatValue(item)}</div>`).join('')}
                </div>
            </div>
        `;
    }

    formatObject(obj) {
        const keys = Object.keys(obj);
        if (keys.length === 0) {
            return `<span class="console-object">{}</span>`;
        }

        const id = 'obj-' + Date.now() + Math.random();
        const preview = keys.slice(0, 3).map(key => `${key}: ${this.formatValue(obj[key])}`).join(', ');
        const more = keys.length > 3 ? `, ... ${keys.length - 3} more` : '';

        return `
            <div class="console-expandable" data-id="${id}">
                <span class="console-object">{${preview}${more}}</span>
                <div class="console-expandable-content">
                    ${keys.map(key => `
                        <div>
                            <span class="console-object-key">${this.escapeHTML(key)}</span>:
                            ${this.formatValue(obj[key])}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getIcon(level) {
        const icons = {
            log: '📝',
            warn: '⚠️',
            error: '❌',
            info: 'ℹ️',
            debug: '🐛',
            success: '✅'
        };
        return icons[level] || '📝';
    }

    formatTimestamp(date) {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3
        });
    }

    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    copyEntry(entry) {
        const text = Array.isArray(entry.message)
            ? entry.message.join(' ')
            : String(entry.message);

        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.rerender();
    }

    rerender() {
        this.element.innerHTML = '';
        this.hasLogged = true;

        this.entries.forEach(entry => {
            if (entry.level === 'error') {
                this.renderErrorEntry(entry);
            } else if (entry.level === 'table') {
                this.renderTableEntry(entry);
            } else {
                this.renderEntry(entry);
            }
        });

        this.scrollToBottom();
    }

    clear() {
        this.entries = [];
        this.element.innerHTML = '<div class="console-welcome">Console cleared</div>';
        this.hasLogged = false;
    }

    scrollToBottom() {
        this.element.scrollTop = this.element.scrollHeight;
    }

    // Group logging (future enhancement)
    group(label) {
        this.groupStack.push(label);
        const groupElement = document.createElement('div');
        groupElement.className = 'console-group';
        groupElement.innerHTML = `
            <div class="console-group-header">${this.escapeHTML(label)}</div>
            <div class="console-group-content"></div>
        `;
        this.element.appendChild(groupElement);
    }

    groupEnd() {
        this.groupStack.pop();
    }

    // Export console history
    export() {
        return this.entries.map(entry => ({
            timestamp: entry.timestamp.toISOString(),
            level: entry.level,
            message: entry.message,
            metadata: entry.metadata
        }));
    }

    // Import console history
    import(data) {
        this.clear();
        data.forEach(entry => {
            this.log(entry.message, entry.level, entry.metadata);
        });
    }

    getEntries() {
        return [...this.entries];
    }
}

export default Console;
