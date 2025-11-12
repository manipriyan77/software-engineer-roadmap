/**
 * API Service
 * Handles HTTP requests to backend server for syncing tasks
 * Note: This is a mock service - you'll need to replace with actual API endpoints
 */

export class NetworkError extends Error {
    constructor(message, statusCode = null) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

export class APIService {
    constructor(baseURL = 'http://localhost:3000/api') {
        this.baseURL = baseURL;
        this.retryAttempts = 3;
        this.retryDelay = 1000; // 1 second
        this.timeout = 10000; // 10 seconds
    }

    /**
     * Make HTTP request with retry logic
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        let lastError;
        for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(url, {
                    ...config,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new NetworkError(
                        `HTTP ${response.status}: ${response.statusText}`,
                        response.status
                    );
                }

                return await response.json();
            } catch (error) {
                lastError = error;

                // Don't retry on 4xx errors (client errors)
                if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
                    throw error;
                }

                // Wait before retrying (exponential backoff)
                if (attempt < this.retryAttempts - 1) {
                    await this.sleep(this.retryDelay * Math.pow(2, attempt));
                }
            }
        }

        throw lastError;
    }

    /**
     * Sleep utility for retry delays
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Fetch all tasks from server
     */
    async fetchTasks(lastSyncTime = null) {
        const endpoint = lastSyncTime
            ? `/tasks?since=${encodeURIComponent(lastSyncTime)}`
            : '/tasks';

        return await this.request(endpoint, {
            method: 'GET'
        });
    }

    /**
     * Create a new task on server
     */
    async createTask(task) {
        return await this.request('/tasks', {
            method: 'POST',
            body: JSON.stringify(task)
        });
    }

    /**
     * Update a task on server
     */
    async updateTask(taskId, task) {
        return await this.request(`/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(task)
        });
    }

    /**
     * Delete a task on server
     */
    async deleteTask(taskId) {
        return await this.request(`/tasks/${taskId}`, {
            method: 'DELETE'
        });
    }

    /**
     * Batch sync tasks
     */
    async batchSync(operations) {
        return await this.request('/tasks/batch', {
            method: 'POST',
            body: JSON.stringify({ operations })
        });
    }

    /**
     * Fetch all categories from server
     */
    async fetchCategories() {
        return await this.request('/categories', {
            method: 'GET'
        });
    }

    /**
     * Create a new category on server
     */
    async createCategory(category) {
        return await this.request('/categories', {
            method: 'POST',
            body: JSON.stringify(category)
        });
    }

    /**
     * Update a category on server
     */
    async updateCategory(categoryId, category) {
        return await this.request(`/categories/${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify(category)
        });
    }

    /**
     * Delete a category on server
     */
    async deleteCategory(categoryId) {
        return await this.request(`/categories/${categoryId}`, {
            method: 'DELETE'
        });
    }

    /**
     * Check server health
     */
    async ping() {
        try {
            await this.request('/health', { method: 'GET' });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Set auth token
     */
    setAuthToken(token) {
        this.authToken = token;
    }

    /**
     * Get request headers with auth
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.authToken) {
            headers['Authorization'] = `Bearer ${this.authToken}`;
        }

        return headers;
    }
}

// Create and export a singleton instance
export const apiService = new APIService();
