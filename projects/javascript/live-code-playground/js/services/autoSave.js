/**
 * Auto-Save Service
 * Handles automatic saving of code with debouncing
 * Demonstrates Promise-based auto-save with timing control
 */

import { debounceAsync, delay } from '../utils/debounce.js';
import storage from '../utils/storage.js';

export class AutoSaveService {
    constructor(saveInterval = 5000, debounceDelay = 2000) {
        this.saveInterval = saveInterval;
        this.debounceDelay = debounceDelay;
        this.isEnabled = true;
        this.lastSaveTime = null;
        this.saveIndicator = null;
        this.pendingChanges = false;
        this.listeners = new Map();

        // Create debounced save function
        this.debouncedSave = debounceAsync(
            this.performSave.bind(this),
            this.debounceDelay
        );
    }

    /**
     * Initialize auto-save with save indicator element
     */
    init(saveIndicatorElement) {
        this.saveIndicator = saveIndicatorElement;
        this.loadSettings();
    }

    /**
     * Load settings from storage
     */
    loadSettings() {
        const settings = storage.get('autoSaveSettings', {
            enabled: true,
            interval: 5000
        });

        this.isEnabled = settings.enabled;
        this.saveInterval = settings.interval;
    }

    /**
     * Save settings to storage
     */
    saveSettings() {
        storage.set('autoSaveSettings', {
            enabled: this.isEnabled,
            interval: this.saveInterval
        });
    }

    /**
     * Trigger auto-save (debounced)
     */
    async save(html, css, js) {
        if (!this.isEnabled) {
            return;
        }

        this.pendingChanges = true;
        this.updateIndicator('saving');

        try {
            await this.debouncedSave(html, css, js);
        } catch (error) {
            console.error('Auto-save failed:', error);
            this.updateIndicator('error');
            this.emit('save-error', error);
        }
    }

    /**
     * Perform the actual save operation
     * Returns a Promise that resolves when save is complete
     */
    async performSave(html, css, js) {
        return new Promise(async (resolve, reject) => {
            try {
                // Save to localStorage
                const draft = {
                    html: html || '',
                    css: css || '',
                    js: js || '',
                    timestamp: Date.now()
                };

                storage.set('currentDraft', draft);

                // Simulate async operation (promisification of setTimeout)
                await delay(100);

                this.lastSaveTime = Date.now();
                this.pendingChanges = false;
                this.updateIndicator('saved');
                this.emit('save-success', draft);

                resolve(draft);
            } catch (error) {
                this.updateIndicator('error');
                this.emit('save-error', error);
                reject(error);
            }
        });
    }

    /**
     * Load draft from storage
     */
    loadDraft() {
        try {
            const draft = storage.get('currentDraft');

            if (draft && draft.timestamp) {
                const age = Date.now() - draft.timestamp;
                const maxAge = 24 * 60 * 60 * 1000; // 24 hours

                if (age < maxAge) {
                    this.emit('draft-loaded', draft);
                    return draft;
                } else {
                    // Draft is too old, delete it
                    this.clearDraft();
                }
            }

            return null;
        } catch (error) {
            console.error('Failed to load draft:', error);
            return null;
        }
    }

    /**
     * Clear current draft
     */
    clearDraft() {
        try {
            storage.remove('currentDraft');
            this.pendingChanges = false;
            this.updateIndicator('saved');
            this.emit('draft-cleared');
            return true;
        } catch (error) {
            console.error('Failed to clear draft:', error);
            return false;
        }
    }

    /**
     * Force immediate save (bypass debounce)
     */
    async forceSave(html, css, js) {
        if (!this.isEnabled) {
            return;
        }

        this.updateIndicator('saving');

        try {
            const result = await this.performSave(html, css, js);
            return result;
        } catch (error) {
            console.error('Force save failed:', error);
            this.updateIndicator('error');
            throw error;
        }
    }

    /**
     * Update save indicator UI
     */
    updateIndicator(status) {
        if (!this.saveIndicator) return;

        // Remove all status classes
        this.saveIndicator.classList.remove('saving', 'saved', 'error');

        // Add current status class
        this.saveIndicator.classList.add(status);

        // Update text
        const textElement = this.saveIndicator.querySelector('.indicator-text');
        if (textElement) {
            const statusTexts = {
                saving: 'Saving...',
                saved: 'Saved',
                error: 'Save failed'
            };
            textElement.textContent = statusTexts[status] || 'Unknown';
        }

        // Show last save time for saved status
        if (status === 'saved' && this.lastSaveTime) {
            const timeAgo = this.getTimeAgo(this.lastSaveTime);
            if (textElement) {
                textElement.textContent = `Saved ${timeAgo}`;
            }
        }
    }

    /**
     * Get time ago string
     */
    getTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < 10) return 'just now';
        if (seconds < 60) return `${seconds}s ago`;

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }

    /**
     * Enable/disable auto-save
     */
    setEnabled(enabled) {
        this.isEnabled = enabled;
        this.saveSettings();

        if (enabled) {
            this.emit('enabled');
        } else {
            this.emit('disabled');
        }
    }

    /**
     * Check if auto-save is enabled
     */
    isAutoSaveEnabled() {
        return this.isEnabled;
    }

    /**
     * Set save interval
     */
    setSaveInterval(interval) {
        this.saveInterval = interval;
        this.saveSettings();
    }

    /**
     * Get save statistics
     */
    getStats() {
        return {
            lastSaveTime: this.lastSaveTime,
            isEnabled: this.isEnabled,
            pendingChanges: this.pendingChanges,
            saveInterval: this.saveInterval,
            lastSaveAge: this.lastSaveTime ? Date.now() - this.lastSaveTime : null
        };
    }

    /**
     * Create a backup
     */
    async createBackup(html, css, js, label = '') {
        const backup = {
            html,
            css,
            js,
            timestamp: Date.now(),
            label: label || `Backup ${new Date().toLocaleString()}`
        };

        try {
            // Get existing backups
            const backups = storage.get('backups', []);

            // Add new backup
            backups.unshift(backup);

            // Keep only last 10 backups
            if (backups.length > 10) {
                backups.splice(10);
            }

            storage.set('backups', backups);
            this.emit('backup-created', backup);

            return backup;
        } catch (error) {
            console.error('Failed to create backup:', error);
            throw error;
        }
    }

    /**
     * Get all backups
     */
    getBackups() {
        return storage.get('backups', []);
    }

    /**
     * Restore from backup
     */
    restoreBackup(timestamp) {
        const backups = this.getBackups();
        const backup = backups.find(b => b.timestamp === timestamp);

        if (backup) {
            this.emit('backup-restored', backup);
            return backup;
        }

        return null;
    }

    /**
     * Delete a backup
     */
    deleteBackup(timestamp) {
        const backups = this.getBackups();
        const filtered = backups.filter(b => b.timestamp !== timestamp);
        storage.set('backups', filtered);
        this.emit('backup-deleted', timestamp);
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

export const autoSave = new AutoSaveService();

export default autoSave;
