/**
 * LocalStorage Manager
 * Handles browser LocalStorage with error handling and JSON serialization
 */

import { StorageError } from '../classes/CustomErrors.js';

export class LocalStorageManager {
    constructor(namespace = 'code-playground') {
        this.namespace = namespace;
        this.isAvailable = this.checkAvailability();
    }

    checkAvailability() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('LocalStorage is not available:', e);
            return false;
        }
    }

    getKey(key) {
        return `${this.namespace}:${key}`;
    }

    set(key, value) {
        if (!this.isAvailable) {
            throw new StorageError('LocalStorage is not available', 'localStorage', 'set');
        }

        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(this.getKey(key), serialized);
            return true;
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                throw new StorageError('Storage quota exceeded', 'localStorage', 'set');
            }
            throw new StorageError(error.message, 'localStorage', 'set');
        }
    }

    get(key, defaultValue = null) {
        if (!this.isAvailable) {
            return defaultValue;
        }

        try {
            const item = localStorage.getItem(this.getKey(key));
            if (item === null) {
                return defaultValue;
            }
            return JSON.parse(item);
        } catch (error) {
            console.error('Failed to parse stored value:', error);
            return defaultValue;
        }
    }

    remove(key) {
        if (!this.isAvailable) {
            return false;
        }

        try {
            localStorage.removeItem(this.getKey(key));
            return true;
        } catch (error) {
            throw new StorageError(error.message, 'localStorage', 'remove');
        }
    }

    clear() {
        if (!this.isAvailable) {
            return false;
        }

        try {
            // Only clear items with our namespace
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.namespace + ':')) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            throw new StorageError(error.message, 'localStorage', 'clear');
        }
    }

    has(key) {
        if (!this.isAvailable) {
            return false;
        }

        return localStorage.getItem(this.getKey(key)) !== null;
    }

    keys() {
        if (!this.isAvailable) {
            return [];
        }

        const prefix = this.namespace + ':';
        return Object.keys(localStorage)
            .filter(key => key.startsWith(prefix))
            .map(key => key.slice(prefix.length));
    }

    size() {
        if (!this.isAvailable) {
            return 0;
        }

        let size = 0;
        const keys = this.keys();
        keys.forEach(key => {
            const value = localStorage.getItem(this.getKey(key));
            if (value) {
                size += value.length;
            }
        });
        return size;
    }

    getUsage() {
        if (!this.isAvailable) {
            return { used: 0, total: 0, percentage: 0 };
        }

        const used = this.size();
        const total = 5 * 1024 * 1024; // Typical 5MB limit

        return {
            used,
            total,
            percentage: (used / total) * 100,
            formattedUsed: this.formatBytes(used),
            formattedTotal: this.formatBytes(total)
        };
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Batch operations
    setMany(entries) {
        const results = {};
        for (const [key, value] of Object.entries(entries)) {
            try {
                this.set(key, value);
                results[key] = { success: true };
            } catch (error) {
                results[key] = { success: false, error: error.message };
            }
        }
        return results;
    }

    getMany(keys) {
        const results = {};
        keys.forEach(key => {
            results[key] = this.get(key);
        });
        return results;
    }

    // Utility: Save with expiry
    setWithExpiry(key, value, ttl) {
        const item = {
            value,
            expiry: Date.now() + ttl
        };
        this.set(key, item);
    }

    getWithExpiry(key) {
        const item = this.get(key);
        if (!item) {
            return null;
        }

        if (Date.now() > item.expiry) {
            this.remove(key);
            return null;
        }

        return item.value;
    }
}

// Singleton instance
export const storage = new LocalStorageManager();

export default storage;
