/**
 * Main Application Controller
 * Orchestrates all components and handles user interactions
 */

import Editor from './classes/Editor.js';
import PreviewFrame from './classes/PreviewFrame.js';
import Console from './classes/Console.js';
import { debounce } from './utils/debounce.js';
import storage from './utils/storage.js';
import { urlSharing } from './utils/urlSharing.js';
import dbManager from './services/indexedDBManager.js';
import autoSave from './services/autoSave.js';
import cloudStorage from './services/cloudStorage.js';

class CodePlayground {
    constructor() {
        this.editors = {};
        this.previewFrame = null;
        this.console = null;
        this.currentTheme = 'dark';
        this.isInitialized = false;
    }

    async init() {
        console.log('🚀 Initializing Code Playground...');

        try {
            // Initialize IndexedDB
            await dbManager.init();

            // Initialize editors
            this.initEditors();

            // Initialize preview frame
            this.initPreviewFrame();

            // Initialize console
            this.initConsole();

            // Initialize auto-save
            this.initAutoSave();

            // Setup event listeners
            this.setupEventListeners();

            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();

            // Setup resize handles
            this.setupResizeHandles();

            // Load theme
            this.loadTheme();

            // Check for URL parameters (shared code)
            await this.loadFromURL();

            // Load draft if exists
            this.loadDraft();

            this.isInitialized = true;
            console.log('✅ Code Playground initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Code Playground:', error);
        }
    }

    initEditors() {
        // HTML Editor
        this.editors.html = new Editor(
            document.getElementById('htmlEditor'),
            document.getElementById('htmlLineNumbers'),
            'html'
        );

        // CSS Editor
        this.editors.css = new Editor(
            document.getElementById('cssEditor'),
            document.getElementById('cssLineNumbers'),
            'css'
        );

        // JavaScript Editor
        this.editors.js = new Editor(
            document.getElementById('jsEditor'),
            document.getElementById('jsLineNumbers'),
            'javascript'
        );

        // Listen for editor changes
        Object.values(this.editors).forEach(editor => {
            editor.on('change', debounce(() => {
                this.handleCodeChange();
            }, 500));
        });
    }

    initPreviewFrame() {
        const iframe = document.getElementById('previewFrame');
        this.previewFrame = new PreviewFrame(iframe, this.console);

        this.previewFrame.on('render-success', () => {
            console.log('✅ Preview rendered successfully');
        });

        this.previewFrame.on('render-error', (error) => {
            console.error('Preview render error:', error);
        });
    }

    initConsole() {
        const consoleElement = document.getElementById('consoleContent');
        this.console = new Console(consoleElement);

        // Update PreviewFrame console reference
        if (this.previewFrame) {
            this.previewFrame.console = this.console;
        }
    }

    initAutoSave() {
        const saveIndicator = document.getElementById('saveIndicator');
        autoSave.init(saveIndicator);

        autoSave.on('save-success', () => {
            console.log('💾 Auto-saved successfully');
        });

        autoSave.on('draft-loaded', (draft) => {
            console.log('📂 Draft loaded from', new Date(draft.timestamp).toLocaleString());
        });
    }

    setupEventListeners() {
        // Toolbar buttons
        document.getElementById('newBtn')?.addEventListener('click', () => this.handleNew());
        document.getElementById('saveBtn')?.addEventListener('click', () => this.handleSave());
        document.getElementById('loadBtn')?.addEventListener('click', () => this.handleLoad());
        document.getElementById('shareBtn')?.addEventListener('click', () => this.handleShare());
        document.getElementById('exportBtn')?.addEventListener('click', () => this.handleExport());
        document.getElementById('themeBtn')?.addEventListener('click', () => this.toggleTheme());

        // Editor clear buttons
        document.querySelectorAll('.editor-clear-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const editorType = e.target.dataset.editor;
                if (this.editors[editorType]) {
                    this.editors[editorType].clear();
                }
            });
        });

        // Console controls
        document.getElementById('clearConsole')?.addEventListener('click', () => {
            this.console?.clear();
        });

        document.querySelectorAll('.console-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setConsoleFilter(filter);

                // Update active state
                document.querySelectorAll('.console-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Preview refresh
        document.getElementById('refreshPreview')?.addEventListener('click', () => {
            this.updatePreview();
        });

        // Modal controls
        this.setupModalControls();

        // Save modal
        document.getElementById('confirmSave')?.addEventListener('click', () => this.confirmSave());

        // Share modal
        document.getElementById('copyUrlBtn')?.addEventListener('click', () => this.copyShareURL());
    }

    setupModalControls() {
        // Close modal buttons
        document.querySelectorAll('.modal-close, .btn-secondary[data-modal]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.dataset.modal || e.target.closest('.modal').id;
                this.closeModal(modalId);
            });
        });

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S: Save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.handleSave();
            }

            // Ctrl/Cmd + N: New
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.handleNew();
            }

            // Ctrl/Cmd + K: Share
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.handleShare();
            }

            // Ctrl/Cmd + L: Clear console
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                this.console?.clear();
            }

            // Ctrl/Cmd + Enter: Force preview update
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.updatePreview();
            }
        });
    }

    setupResizeHandles() {
        const horizontalResize = document.getElementById('horizontalResize');
        const verticalResize = document.getElementById('verticalResize');
        const editorsSection = document.getElementById('editorsSection');
        const outputSection = document.getElementById('outputSection');

        if (horizontalResize) {
            let isResizing = false;

            horizontalResize.addEventListener('mousedown', (e) => {
                isResizing = true;
                document.body.style.cursor = 'row-resize';
                e.preventDefault();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;

                const containerHeight = window.innerHeight - 60; // Minus toolbar
                const newEditorsHeight = e.clientY - 60;
                const editorsPercent = (newEditorsHeight / containerHeight) * 100;
                const outputPercent = 100 - editorsPercent;

                if (editorsPercent > 20 && editorsPercent < 80) {
                    editorsSection.style.height = `${editorsPercent}%`;
                    outputSection.style.height = `${outputPercent}%`;
                }
            });

            document.addEventListener('mouseup', () => {
                isResizing = false;
                document.body.style.cursor = 'default';
            });
        }

        // Similar for vertical resize (left-right in output section)
        if (verticalResize) {
            let isResizing = false;

            verticalResize.addEventListener('mousedown', (e) => {
                isResizing = true;
                document.body.style.cursor = 'col-resize';
                e.preventDefault();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;

                const outputWidth = outputSection.offsetWidth;
                const newPreviewWidth = e.clientX - outputSection.offsetLeft;
                const previewPercent = (newPreviewWidth / outputWidth) * 100;

                if (previewPercent > 20 && previewPercent < 80) {
                    const previewPanel = document.querySelector('.preview-panel');
                    const consolePanel = document.querySelector('.console-panel');
                    previewPanel.style.flex = `0 0 ${previewPercent}%`;
                    consolePanel.style.flex = `0 0 ${100 - previewPercent}%`;
                }
            });

            document.addEventListener('mouseup', () => {
                isResizing = false;
                document.body.style.cursor = 'default';
            });
        }
    }

    handleCodeChange() {
        // Update preview
        this.updatePreview();

        // Trigger auto-save
        const code = this.getAllCode();
        autoSave.save(code.html, code.css, code.js);
    }

    updatePreview() {
        const code = this.getAllCode();
        this.previewFrame.render(code.html, code.css, code.js);
    }

    getAllCode() {
        return {
            html: this.editors.html.getContent(),
            css: this.editors.css.getContent(),
            js: this.editors.js.getContent()
        };
    }

    setAllCode(html = '', css = '', js = '') {
        this.editors.html.setContent(html);
        this.editors.css.setContent(css);
        this.editors.js.setContent(js);
        this.updatePreview();
    }

    handleNew() {
        if (confirm('Create new snippet? Any unsaved changes will be lost.')) {
            this.setAllCode('', '', '');
            this.console.clear();
            autoSave.clearDraft();
            urlSharing.clearURLParams();
            this.showToast('New snippet created');
        }
    }

    handleSave() {
        this.openModal('saveModal');
    }

    async confirmSave() {
        const name = document.getElementById('snippetName').value.trim();
        const description = document.getElementById('snippetDescription').value.trim();

        if (!name) {
            alert('Please enter a snippet name');
            return;
        }

        try {
            const code = this.getAllCode();

            // Save to IndexedDB
            const snippet = await dbManager.addSnippet({
                name,
                description,
                ...code
            });

            // Optionally save to cloud
            try {
                const cloudSnippet = await cloudStorage.saveSnippet(snippet);
                console.log('Saved to cloud:', cloudSnippet);
            } catch (error) {
                console.warn('Cloud save failed, saved locally only:', error);
            }

            this.closeModal('saveModal');
            this.showToast(`Snippet "${name}" saved successfully!`);

            // Clear form
            document.getElementById('snippetName').value = '';
            document.getElementById('snippetDescription').value = '';
        } catch (error) {
            console.error('Failed to save snippet:', error);
            alert('Failed to save snippet: ' + error.message);
        }
    }

    async handleLoad() {
        try {
            const snippets = await dbManager.getAllSnippets();
            this.displaySnippetList(snippets);
            this.openModal('loadModal');
        } catch (error) {
            console.error('Failed to load snippets:', error);
            alert('Failed to load snippets: ' + error.message);
        }
    }

    displaySnippetList(snippets) {
        const listContainer = document.getElementById('snippetList');

        if (snippets.length === 0) {
            listContainer.innerHTML = '<div class="snippet-list-loading">No saved snippets found</div>';
            return;
        }

        listContainer.innerHTML = snippets.map(snippet => `
            <div class="snippet-item" data-id="${snippet.id}">
                <div class="snippet-info">
                    <h3>${this.escapeHTML(snippet.name)}</h3>
                    <p>${this.escapeHTML(snippet.description || 'No description')}</p>
                    <div class="snippet-meta">
                        Saved: ${new Date(snippet.timestamp).toLocaleString()}
                    </div>
                </div>
                <div class="snippet-actions">
                    <button class="snippet-delete-btn" data-id="${snippet.id}">Delete</button>
                </div>
            </div>
        `).join('');

        // Add click handlers
        listContainer.querySelectorAll('.snippet-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                if (e.target.classList.contains('snippet-delete-btn')) {
                    e.stopPropagation();
                    await this.deleteSnippet(e.target.dataset.id);
                    return;
                }

                const snippetId = item.dataset.id;
                await this.loadSnippet(snippetId);
            });
        });
    }

    async loadSnippet(snippetId) {
        try {
            const snippet = await dbManager.getSnippet(snippetId);
            if (snippet) {
                this.setAllCode(snippet.html, snippet.css, snippet.js);
                this.closeModal('loadModal');
                this.showToast(`Loaded "${snippet.name}"`);
            }
        } catch (error) {
            console.error('Failed to load snippet:', error);
            alert('Failed to load snippet: ' + error.message);
        }
    }

    async deleteSnippet(snippetId) {
        if (!confirm('Delete this snippet?')) return;

        try {
            await dbManager.deleteSnippet(snippetId);
            this.showToast('Snippet deleted');
            // Refresh list
            const snippets = await dbManager.getAllSnippets();
            this.displaySnippetList(snippets);
        } catch (error) {
            console.error('Failed to delete snippet:', error);
            alert('Failed to delete snippet: ' + error.message);
        }
    }

    async handleShare() {
        try {
            const code = this.getAllCode();
            const shareURL = urlSharing.createShareURL(code.html, code.css, code.js);

            document.getElementById('shareUrl').value = shareURL;
            this.openModal('shareModal');
        } catch (error) {
            console.error('Failed to create share URL:', error);
            alert('Failed to create share URL: ' + error.message);
        }
    }

    async copyShareURL() {
        const urlInput = document.getElementById('shareUrl');
        const url = urlInput.value;

        try {
            await urlSharing.copyToClipboard(url);
            document.getElementById('shareSuccess').classList.add('show');
            setTimeout(() => {
                document.getElementById('shareSuccess').classList.remove('show');
            }, 2000);
        } catch (error) {
            console.error('Failed to copy URL:', error);
            alert('Failed to copy URL');
        }
    }

    handleExport() {
        const code = this.getAllCode();
        const html = this.buildExportHTML(code.html, code.css, code.js);

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'code-playground-export.html';
        a.click();

        URL.revokeObjectURL(url);
        this.showToast('Code exported successfully!');
    }

    buildExportHTML(html, css, js) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground Export</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
    <script>
${js}
    </script>
</body>
</html>`;
    }

    async loadFromURL() {
        const urlData = urlSharing.loadFromURL();

        if (!urlData) return;

        if (urlData.type === 'code') {
            this.setAllCode(urlData.html, urlData.css, urlData.js);
            this.showToast('Code loaded from URL');
            urlSharing.clearURLParams();
        } else if (urlData.type === 'snippet') {
            try {
                const snippet = await cloudStorage.loadSnippet(urlData.snippetId);
                this.setAllCode(snippet.html, snippet.css, snippet.js);
                this.showToast(`Loaded snippet: ${snippet.name}`);
                urlSharing.clearURLParams();
            } catch (error) {
                console.error('Failed to load snippet from URL:', error);
            }
        }
    }

    loadDraft() {
        const draft = autoSave.loadDraft();
        if (draft) {
            const shouldLoad = confirm('A draft was found. Do you want to load it?');
            if (shouldLoad) {
                this.setAllCode(draft.html, draft.css, draft.js);
                this.showToast('Draft loaded');
            } else {
                autoSave.clearDraft();
            }
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = this.currentTheme;
        storage.set('theme', this.currentTheme);

        const themeBtn = document.getElementById('themeBtn');
        themeBtn.querySelector('span').textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
    }

    loadTheme() {
        this.currentTheme = storage.get('theme', 'dark');
        document.body.dataset.theme = this.currentTheme;

        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.querySelector('span').textContent = this.currentTheme === 'dark' ? '🌙' : '☀️';
        }
    }

    setConsoleFilter(filter) {
        this.console?.setFilter(filter);
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');

        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }

    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new CodePlayground();
        app.init();

        // Expose to window for debugging
        window.codePlayground = app;
    });
} else {
    const app = new CodePlayground();
    app.init();
    window.codePlayground = app;
}
