/**
 * Editor Class
 * Manages individual code editor instances with syntax highlighting
 */

export class Editor {
    constructor(editorElement, lineNumbersElement, language) {
        this.element = editorElement;
        this.lineNumbersElement = lineNumbersElement;
        this.language = language;
        this.content = '';
        this.listeners = new Map();
        this.history = { undo: [], redo: [] };
        this.maxHistorySize = 50;

        this.init();
    }

    init() {
        // Set up event listeners
        this.element.addEventListener('input', this.handleInput.bind(this));
        this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.element.addEventListener('paste', this.handlePaste.bind(this));
        this.element.addEventListener('scroll', this.syncScroll.bind(this));

        // Initial line numbers
        this.updateLineNumbers();

        // Load content from localStorage if exists
        this.loadDraft();
    }

    handleInput(e) {
        this.content = this.element.textContent;
        this.updateLineNumbers();
        this.applySyntaxHighlighting();
        this.emit('change', { content: this.content, language: this.language });
    }

    handleKeyDown(e) {
        // Tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            this.insertText('  '); // 2 spaces
            return;
        }

        // Ctrl/Cmd + Z for undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            this.undo();
            return;
        }

        // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for redo
        if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
            e.preventDefault();
            this.redo();
            return;
        }

        // Ctrl/Cmd + / for comment toggle
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            this.toggleComment();
            return;
        }

        // Auto-closing brackets
        const pairs = {
            '(': ')',
            '[': ']',
            '{': '}',
            '"': '"',
            "'": "'",
            '`': '`'
        };

        if (pairs[e.key]) {
            e.preventDefault();
            this.insertPair(e.key, pairs[e.key]);
            return;
        }

        // Enter key - smart indentation
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleEnter();
            return;
        }
    }

    handlePaste(e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text/plain');
        this.insertText(text);
    }

    handleEnter() {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Get current line to detect indentation
        const beforeCursor = range.startContainer.textContent.substring(0, range.startOffset);
        const currentIndent = beforeCursor.match(/^\s*/)[0];

        // Check if previous line ends with opening bracket
        const lastChar = beforeCursor.trim().slice(-1);
        const extraIndent = ['{', '[', '('].includes(lastChar) ? '  ' : '';

        this.insertText('\n' + currentIndent + extraIndent);
    }

    insertText(text) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        // Save to history before modification
        this.saveToHistory();

        const range = selection.getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // Move cursor after inserted text
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);

        this.handleInput();
    }

    insertPair(opening, closing) {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        // Save to history
        this.saveToHistory();

        if (selectedText) {
            // Wrap selection
            range.deleteContents();
            const wrappedText = document.createTextNode(opening + selectedText + closing);
            range.insertNode(wrappedText);

            // Select wrapped text
            range.setStart(wrappedText, 1);
            range.setEnd(wrappedText, 1 + selectedText.length);
        } else {
            // Insert pair and position cursor between them
            const pairText = document.createTextNode(opening + closing);
            range.insertNode(pairText);
            range.setStart(pairText, 1);
            range.setEnd(pairText, 1);
        }

        selection.removeAllRanges();
        selection.addRange(range);

        this.handleInput();
    }

    toggleComment() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        this.saveToHistory();

        const commentSyntax = {
            html: { start: '<!-- ', end: ' -->' },
            css: { start: '/* ', end: ' */' },
            javascript: { start: '// ', end: '' }
        };

        const comment = commentSyntax[this.language];
        if (!comment) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.toString() || this.getCurrentLine();

        // Check if already commented
        const isCommented = selectedText.trimStart().startsWith(comment.start.trim());

        let newText;
        if (isCommented) {
            // Remove comment
            newText = selectedText.replace(new RegExp(`^\\s*${this.escapeRegex(comment.start.trim())}`), '');
            if (comment.end) {
                newText = newText.replace(new RegExp(`${this.escapeRegex(comment.end.trim())}\\s*$`), '');
            }
        } else {
            // Add comment
            newText = comment.start + selectedText + comment.end;
        }

        range.deleteContents();
        range.insertNode(document.createTextNode(newText));

        this.handleInput();
    }

    getCurrentLine() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return '';

        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        const text = node.textContent || '';
        const offset = range.startOffset;

        // Find line boundaries
        const lineStart = text.lastIndexOf('\n', offset - 1) + 1;
        const lineEnd = text.indexOf('\n', offset);

        return text.substring(lineStart, lineEnd === -1 ? text.length : lineEnd);
    }

    updateLineNumbers() {
        const lines = this.element.textContent.split('\n').length;
        const lineNumbersHTML = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
        this.lineNumbersElement.textContent = lineNumbersHTML;
    }

    syncScroll() {
        this.lineNumbersElement.scrollTop = this.element.scrollTop;
    }

    applySyntaxHighlighting() {
        // Simple regex-based syntax highlighting
        // For production, consider using a library like Prism.js or Monaco Editor

        const content = this.element.textContent;
        let highlightedHTML = content;

        if (this.language === 'javascript') {
            highlightedHTML = this.highlightJavaScript(content);
        } else if (this.language === 'css') {
            highlightedHTML = this.highlightCSS(content);
        } else if (this.language === 'html') {
            highlightedHTML = this.highlightHTML(content);
        }

        // Only update if different to avoid losing cursor position
        if (this.element.innerHTML !== highlightedHTML) {
            const selection = window.getSelection();
            const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
            const offset = range ? this.getCaretOffset() : 0;

            this.element.innerHTML = highlightedHTML;

            // Restore cursor position
            if (range) {
                this.setCaretOffset(offset);
            }
        }
    }

    highlightJavaScript(code) {
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Comments
            .replace(/(\/\/.*$)/gm, '<span class="token comment">$1</span>')
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')
            // Strings
            .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/g, '<span class="token string">$1</span>')
            // Keywords
            .replace(/\b(const|let|var|function|return|if|else|for|while|do|break|continue|switch|case|default|try|catch|finally|throw|class|extends|import|export|from|async|await|new|this|super|typeof|instanceof)\b/g, '<span class="token keyword">$1</span>')
            // Booleans and null/undefined
            .replace(/\b(true|false|null|undefined)\b/g, '<span class="token boolean">$1</span>')
            // Numbers
            .replace(/\b(\d+\.?\d*)\b/g, '<span class="token number">$1</span>')
            // Functions
            .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="token function">$1</span>(');
    }

    highlightCSS(code) {
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Comments
            .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')
            // Selectors
            .replace(/^([^{]+)\s*{/gm, '<span class="token selector">$1</span> {')
            // Properties
            .replace(/([a-z-]+):/g, '<span class="token property">$1</span>:')
            // Values
            .replace(/:\s*([^;{]+);/g, ': <span class="token value">$1</span>;')
            // Strings
            .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, '<span class="token string">$1</span>');
    }

    highlightHTML(code) {
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Comments
            .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token comment">$1</span>')
            // Tags
            .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="token tag">$2</span>')
            // Attributes
            .replace(/\s+([\w-]+)=/g, ' <span class="token attr-name">$1</span>=')
            // Attribute values
            .replace(/=("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, '=<span class="token attr-value">$1</span>');
    }

    getCaretOffset() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return 0;

        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(this.element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        return preCaretRange.toString().length;
    }

    setCaretOffset(offset) {
        const selection = window.getSelection();
        const range = document.createRange();

        let currentOffset = 0;
        const walker = document.createTreeWalker(
            this.element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        while (walker.nextNode()) {
            const node = walker.currentNode;
            const nodeLength = node.textContent.length;

            if (currentOffset + nodeLength >= offset) {
                range.setStart(node, offset - currentOffset);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                return;
            }

            currentOffset += nodeLength;
        }
    }

    saveToHistory() {
        this.history.undo.push(this.content);
        if (this.history.undo.length > this.maxHistorySize) {
            this.history.undo.shift();
        }
        this.history.redo = [];
    }

    undo() {
        if (this.history.undo.length === 0) return;

        this.history.redo.push(this.content);
        const previousContent = this.history.undo.pop();
        this.setContent(previousContent);
    }

    redo() {
        if (this.history.redo.length === 0) return;

        this.history.undo.push(this.content);
        const nextContent = this.history.redo.pop();
        this.setContent(nextContent);
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Public API
    getContent() {
        return this.element.textContent;
    }

    setContent(content) {
        this.element.textContent = content;
        this.content = content;
        this.updateLineNumbers();
        this.applySyntaxHighlighting();
        this.emit('change', { content: this.content, language: this.language });
    }

    clear() {
        this.setContent('');
        this.history = { undo: [], redo: [] };
    }

    focus() {
        this.element.focus();
    }

    loadDraft() {
        try {
            const draft = localStorage.getItem(`editor_draft_${this.language}`);
            if (draft) {
                this.setContent(draft);
            }
        } catch (error) {
            console.error('Failed to load draft:', error);
        }
    }

    saveDraft() {
        try {
            localStorage.setItem(`editor_draft_${this.language}`, this.content);
        } catch (error) {
            console.error('Failed to save draft:', error);
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
}

export default Editor;
