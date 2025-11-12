/**
 * Cloud Storage Service
 * Handles saving/loading snippets to/from cloud
 * Demonstrates Fetch API, error handling, and async operations
 */

import { NetworkError, ValidationError } from '../classes/CustomErrors.js';

export class CloudStorageService {
    constructor(apiBaseURL = null) {
        // For demo purposes, we'll use localStorage as a mock cloud storage
        // In production, replace this with your actual API endpoint
        this.apiBaseURL = apiBaseURL || 'mock://cloud-storage';
        this.useMockStorage = !apiBaseURL || apiBaseURL.startsWith('mock://');
        this.listeners = new Map();
    }

    /**
     * Save snippet to cloud
     * Returns Promise with snippet ID
     */
    async saveSnippet(snippet) {
        try {
            this.validateSnippet(snippet);

            if (this.useMockStorage) {
                return await this.mockSave(snippet);
            }

            // Real API implementation
            const response = await fetch(`${this.apiBaseURL}/snippets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(snippet)
            });

            if (!response.ok) {
                throw new NetworkError(
                    'Failed to save snippet',
                    `${this.apiBaseURL}/snippets`,
                    response.status,
                    'POST'
                );
            }

            const data = await response.json();
            this.emit('snippet-saved', data);

            return data;
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError(
                error.message || 'Network request failed',
                this.apiBaseURL,
                null,
                'POST'
            );
        }
    }

    /**
     * Load snippet from cloud by ID
     */
    async loadSnippet(snippetId) {
        try {
            if (this.useMockStorage) {
                return await this.mockLoad(snippetId);
            }

            // Real API implementation
            const response = await fetch(`${this.apiBaseURL}/snippets/${snippetId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new NetworkError(
                        'Snippet not found',
                        `${this.apiBaseURL}/snippets/${snippetId}`,
                        404,
                        'GET'
                    );
                }

                throw new NetworkError(
                    'Failed to load snippet',
                    `${this.apiBaseURL}/snippets/${snippetId}`,
                    response.status,
                    'GET'
                );
            }

            const data = await response.json();
            this.emit('snippet-loaded', data);

            return data;
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError(
                error.message || 'Network request failed',
                this.apiBaseURL,
                null,
                'GET'
            );
        }
    }

    /**
     * Update existing snippet
     */
    async updateSnippet(snippetId, updates) {
        try {
            if (this.useMockStorage) {
                return await this.mockUpdate(snippetId, updates);
            }

            const response = await fetch(`${this.apiBaseURL}/snippets/${snippetId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new NetworkError(
                    'Failed to update snippet',
                    `${this.apiBaseURL}/snippets/${snippetId}`,
                    response.status,
                    'PUT'
                );
            }

            const data = await response.json();
            this.emit('snippet-updated', data);

            return data;
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError(
                error.message || 'Network request failed',
                this.apiBaseURL,
                null,
                'PUT'
            );
        }
    }

    /**
     * Delete snippet from cloud
     */
    async deleteSnippet(snippetId) {
        try {
            if (this.useMockStorage) {
                return await this.mockDelete(snippetId);
            }

            const response = await fetch(`${this.apiBaseURL}/snippets/${snippetId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new NetworkError(
                    'Failed to delete snippet',
                    `${this.apiBaseURL}/snippets/${snippetId}`,
                    response.status,
                    'DELETE'
                );
            }

            this.emit('snippet-deleted', snippetId);

            return true;
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError(
                error.message || 'Network request failed',
                this.apiBaseURL,
                null,
                'DELETE'
            );
        }
    }

    /**
     * List all snippets for user
     */
    async listSnippets(limit = 50, offset = 0) {
        try {
            if (this.useMockStorage) {
                return await this.mockList(limit, offset);
            }

            const url = new URL(`${this.apiBaseURL}/snippets`);
            url.searchParams.set('limit', limit);
            url.searchParams.set('offset', offset);

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new NetworkError(
                    'Failed to list snippets',
                    url.toString(),
                    response.status,
                    'GET'
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof NetworkError) {
                throw error;
            }
            throw new NetworkError(
                error.message || 'Network request failed',
                this.apiBaseURL,
                null,
                'GET'
            );
        }
    }

    /**
     * Validate snippet data
     */
    validateSnippet(snippet) {
        if (!snippet.name || snippet.name.trim() === '') {
            throw new ValidationError('Snippet name is required', 'name', snippet.name);
        }

        if (snippet.name.length > 100) {
            throw new ValidationError('Snippet name is too long (max 100 characters)', 'name', snippet.name);
        }

        // Optional validation for code size
        const totalSize = (snippet.html || '').length +
            (snippet.css || '').length +
            (snippet.js || '').length;

        if (totalSize > 1024 * 1024) { // 1MB limit
            throw new ValidationError('Snippet is too large (max 1MB)', 'size', totalSize);
        }

        return true;
    }

    // Mock storage methods (using localStorage as cloud storage simulation)
    async mockSave(snippet) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const snippetId = this.generateId();
                    const cloudSnippets = this.getMockCloudSnippets();

                    const savedSnippet = {
                        id: snippetId,
                        ...snippet,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    };

                    cloudSnippets[snippetId] = savedSnippet;
                    this.setMockCloudSnippets(cloudSnippets);

                    resolve(savedSnippet);
                } catch (error) {
                    reject(new NetworkError('Mock save failed', 'mock://save', null, 'POST'));
                }
            }, 500); // Simulate network delay
        });
    }

    async mockLoad(snippetId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const cloudSnippets = this.getMockCloudSnippets();
                const snippet = cloudSnippets[snippetId];

                if (!snippet) {
                    reject(new NetworkError('Snippet not found', `mock://load/${snippetId}`, 404, 'GET'));
                } else {
                    resolve(snippet);
                }
            }, 300); // Simulate network delay
        });
    }

    async mockUpdate(snippetId, updates) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const cloudSnippets = this.getMockCloudSnippets();
                const snippet = cloudSnippets[snippetId];

                if (!snippet) {
                    reject(new NetworkError('Snippet not found', `mock://update/${snippetId}`, 404, 'PUT'));
                } else {
                    const updated = {
                        ...snippet,
                        ...updates,
                        id: snippetId, // Preserve ID
                        createdAt: snippet.createdAt, // Preserve creation time
                        updatedAt: Date.now()
                    };

                    cloudSnippets[snippetId] = updated;
                    this.setMockCloudSnippets(cloudSnippets);

                    resolve(updated);
                }
            }, 400);
        });
    }

    async mockDelete(snippetId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const cloudSnippets = this.getMockCloudSnippets();

                if (!cloudSnippets[snippetId]) {
                    reject(new NetworkError('Snippet not found', `mock://delete/${snippetId}`, 404, 'DELETE'));
                } else {
                    delete cloudSnippets[snippetId];
                    this.setMockCloudSnippets(cloudSnippets);
                    resolve(true);
                }
            }, 300);
        });
    }

    async mockList(limit, offset) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const cloudSnippets = this.getMockCloudSnippets();
                const snippets = Object.values(cloudSnippets)
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .slice(offset, offset + limit);

                resolve({
                    snippets,
                    total: Object.keys(cloudSnippets).length,
                    limit,
                    offset
                });
            }, 300);
        });
    }

    getMockCloudSnippets() {
        try {
            const data = localStorage.getItem('mock_cloud_snippets');
            return data ? JSON.parse(data) : {};
        } catch {
            return {};
        }
    }

    setMockCloudSnippets(snippets) {
        try {
            localStorage.setItem('mock_cloud_snippets', JSON.stringify(snippets));
        } catch (error) {
            console.error('Failed to save to mock cloud storage:', error);
        }
    }

    generateId() {
        return `cloud_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

export const cloudStorage = new CloudStorageService();

export default cloudStorage;
