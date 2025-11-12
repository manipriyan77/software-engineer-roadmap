/**
 * IndexedDB Manager
 * Handles snippet storage and history using IndexedDB
 * Demonstrates Promise-based IndexedDB operations
 */

import { StorageError } from '../classes/CustomErrors.js';

export class IndexedDBManager {
    constructor(dbName = 'CodePlaygroundDB', version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    /**
     * Initialize database connection
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                reject(new StorageError('Failed to open database', 'IndexedDB', 'open'));
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create snippets store
                if (!db.objectStoreNames.contains('snippets')) {
                    const snippetStore = db.createObjectStore('snippets', {
                        keyPath: 'id',
                        autoIncrement: false
                    });
                    snippetStore.createIndex('name', 'name', { unique: false });
                    snippetStore.createIndex('timestamp', 'timestamp', { unique: false });
                    snippetStore.createIndex('tags', 'tags', { unique: false, multiEntry: true });
                }

                // Create history store
                if (!db.objectStoreNames.contains('history')) {
                    const historyStore = db.createObjectStore('history', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    historyStore.createIndex('timestamp', 'timestamp', { unique: false });
                    historyStore.createIndex('action', 'action', { unique: false });
                }

                // Create settings store
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', {
                        keyPath: 'key'
                    });
                }
            };
        });
    }

    /**
     * Ensure database is initialized
     */
    async ensureDB() {
        if (!this.db) {
            await this.init();
        }
        return this.db;
    }

    /**
     * Add a snippet
     */
    async addSnippet(snippet) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['snippets'], 'readwrite');
            const store = transaction.objectStore('snippets');

            const snippetData = {
                id: snippet.id || this.generateId(),
                name: snippet.name,
                description: snippet.description || '',
                html: snippet.html || '',
                css: snippet.css || '',
                js: snippet.js || '',
                tags: snippet.tags || [],
                timestamp: Date.now(),
                updatedAt: Date.now()
            };

            const request = store.add(snippetData);

            request.onsuccess = () => {
                resolve(snippetData);
            };

            request.onerror = () => {
                reject(new StorageError('Failed to add snippet', 'IndexedDB', 'add'));
            };
        });
    }

    /**
     * Update a snippet
     */
    async updateSnippet(id, updates) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['snippets'], 'readwrite');
            const store = transaction.objectStore('snippets');

            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const snippet = getRequest.result;
                if (!snippet) {
                    reject(new StorageError('Snippet not found', 'IndexedDB', 'update'));
                    return;
                }

                const updated = {
                    ...snippet,
                    ...updates,
                    id, // Preserve ID
                    timestamp: snippet.timestamp, // Preserve original timestamp
                    updatedAt: Date.now()
                };

                const putRequest = store.put(updated);

                putRequest.onsuccess = () => {
                    resolve(updated);
                };

                putRequest.onerror = () => {
                    reject(new StorageError('Failed to update snippet', 'IndexedDB', 'update'));
                };
            };

            getRequest.onerror = () => {
                reject(new StorageError('Failed to get snippet', 'IndexedDB', 'get'));
            };
        });
    }

    /**
     * Get a snippet by ID
     */
    async getSnippet(id) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['snippets'], 'readonly');
            const store = transaction.objectStore('snippets');
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result || null);
            };

            request.onerror = () => {
                reject(new StorageError('Failed to get snippet', 'IndexedDB', 'get'));
            };
        });
    }

    /**
     * Get all snippets
     */
    async getAllSnippets() {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['snippets'], 'readonly');
            const store = transaction.objectStore('snippets');
            const request = store.getAll();

            request.onsuccess = () => {
                // Sort by timestamp descending (newest first)
                const snippets = request.result.sort((a, b) => b.timestamp - a.timestamp);
                resolve(snippets);
            };

            request.onerror = () => {
                reject(new StorageError('Failed to get snippets', 'IndexedDB', 'getAll'));
            };
        });
    }

    /**
     * Delete a snippet
     */
    async deleteSnippet(id) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['snippets'], 'readwrite');
            const store = transaction.objectStore('snippets');
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                reject(new StorageError('Failed to delete snippet', 'IndexedDB', 'delete'));
            };
        });
    }

    /**
     * Search snippets by name
     */
    async searchSnippets(query) {
        const snippets = await this.getAllSnippets();
        const lowerQuery = query.toLowerCase();

        return snippets.filter(snippet =>
            snippet.name.toLowerCase().includes(lowerQuery) ||
            (snippet.description && snippet.description.toLowerCase().includes(lowerQuery)) ||
            (snippet.tags && snippet.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
        );
    }

    /**
     * Add to history
     */
    async addHistory(action, data) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['history'], 'readwrite');
            const store = transaction.objectStore('history');

            const historyEntry = {
                action,
                data,
                timestamp: Date.now()
            };

            const request = store.add(historyEntry);

            request.onsuccess = () => {
                resolve(historyEntry);
            };

            request.onerror = () => {
                reject(new StorageError('Failed to add history', 'IndexedDB', 'add'));
            };
        });
    }

    /**
     * Get history
     */
    async getHistory(limit = 50) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['history'], 'readonly');
            const store = transaction.objectStore('history');
            const index = store.index('timestamp');
            const request = index.openCursor(null, 'prev'); // Reverse order

            const history = [];

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor && history.length < limit) {
                    history.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(history);
                }
            };

            request.onerror = () => {
                reject(new StorageError('Failed to get history', 'IndexedDB', 'get'));
            };
        });
    }

    /**
     * Clear old history entries
     */
    async clearOldHistory(daysToKeep = 30) {
        const db = await this.ensureDB();
        const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['history'], 'readwrite');
            const store = transaction.objectStore('history');
            const index = store.index('timestamp');
            const range = IDBKeyRange.upperBound(cutoffTime);
            const request = index.openCursor(range);

            let deletedCount = 0;

            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    deletedCount++;
                    cursor.continue();
                } else {
                    resolve(deletedCount);
                }
            };

            request.onerror = () => {
                reject(new StorageError('Failed to clear history', 'IndexedDB', 'delete'));
            };
        });
    }

    /**
     * Get/Set settings
     */
    async getSetting(key, defaultValue = null) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);

            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.value : defaultValue);
            };

            request.onerror = () => {
                reject(new StorageError('Failed to get setting', 'IndexedDB', 'get'));
            };
        });
    }

    async setSetting(key, value) {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            const request = store.put({ key, value });

            request.onsuccess = () => {
                resolve(true);
            };

            request.onerror = () => {
                reject(new StorageError('Failed to set setting', 'IndexedDB', 'put'));
            };
        });
    }

    /**
     * Get database stats
     */
    async getStats() {
        const snippets = await this.getAllSnippets();
        const history = await this.getHistory(1000);

        return {
            snippetCount: snippets.length,
            historyCount: history.length,
            totalSize: await this.estimateSize()
        };
    }

    /**
     * Estimate database size
     */
    async estimateSize() {
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            return {
                usage: estimate.usage,
                quota: estimate.quota,
                percentage: (estimate.usage / estimate.quota) * 100
            };
        }
        return null;
    }

    /**
     * Export all data
     */
    async exportData() {
        const snippets = await this.getAllSnippets();
        const history = await this.getHistory(1000);

        return {
            version: this.version,
            exportDate: new Date().toISOString(),
            snippets,
            history
        };
    }

    /**
     * Import data
     */
    async importData(data) {
        const results = {
            snippets: { imported: 0, failed: 0 },
            history: { imported: 0, failed: 0 }
        };

        // Import snippets
        for (const snippet of data.snippets || []) {
            try {
                await this.addSnippet(snippet);
                results.snippets.imported++;
            } catch (error) {
                results.snippets.failed++;
                console.error('Failed to import snippet:', error);
            }
        }

        // Import history
        for (const entry of data.history || []) {
            try {
                await this.addHistory(entry.action, entry.data);
                results.history.imported++;
            } catch (error) {
                results.history.failed++;
                console.error('Failed to import history entry:', error);
            }
        }

        return results;
    }

    /**
     * Clear all data
     */
    async clearAll() {
        const db = await this.ensureDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(['snippets', 'history', 'settings'], 'readwrite');

            const stores = ['snippets', 'history', 'settings'];
            const promises = stores.map(storeName => {
                return new Promise((res, rej) => {
                    const request = transaction.objectStore(storeName).clear();
                    request.onsuccess = () => res();
                    request.onerror = () => rej();
                });
            });

            Promise.all(promises)
                .then(() => resolve(true))
                .catch(() => reject(new StorageError('Failed to clear database', 'IndexedDB', 'clear')));
        });
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return `snippet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Close database connection
     */
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}

// Singleton instance
export const dbManager = new IndexedDBManager();

export default dbManager;
