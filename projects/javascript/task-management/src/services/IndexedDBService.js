/**
 * IndexedDB Service
 * Handles all database operations for tasks and categories
 */

import { Task } from '../models/Task.js';
import { Category } from '../models/Category.js';

export class StorageError extends Error {
    constructor(message, operation = null) {
        super(message);
        this.name = 'StorageError';
        this.operation = operation;
    }
}

export class IndexedDBService {
    constructor(dbName = 'TaskManagerDB', version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    /**
     * Initialize the database
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                reject(new StorageError('Failed to open database', 'init'));
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;

                // Handle database errors
                this.db.onerror = (event) => {
                    console.error('Database error:', event.target.error);
                };

                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create tasks object store
                if (!db.objectStoreNames.contains('tasks')) {
                    const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });

                    // Create indexes for efficient querying
                    taskStore.createIndex('category', 'category', { unique: false });
                    taskStore.createIndex('priority', 'priority', { unique: false });
                    taskStore.createIndex('status', 'status', { unique: false });
                    taskStore.createIndex('deadline', 'deadline', { unique: false });
                    taskStore.createIndex('createdAt', 'createdAt', { unique: false });
                    taskStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                    taskStore.createIndex('order', 'order', { unique: false });
                }

                // Create categories object store
                if (!db.objectStoreNames.contains('categories')) {
                    const categoryStore = db.createObjectStore('categories', { keyPath: 'id' });
                    categoryStore.createIndex('name', 'name', { unique: true });
                }

                // Create settings object store
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }

                // Create sync queue object store
                if (!db.objectStoreNames.contains('syncQueue')) {
                    const syncStore = db.createObjectStore('syncQueue', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    syncStore.createIndex('timestamp', 'timestamp', { unique: false });
                    syncStore.createIndex('synced', 'synced', { unique: false });
                }
            };
        });
    }

    /**
     * Get a transaction
     */
    getTransaction(storeNames, mode = 'readonly') {
        if (!this.db) {
            throw new StorageError('Database not initialized', 'getTransaction');
        }
        return this.db.transaction(storeNames, mode);
    }

    /**
     * Add a task
     */
    async addTask(task) {
        try {
            const transaction = this.getTransaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks');
            const request = store.add(task.toJSON());

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(task);
                request.onerror = () => reject(new StorageError('Failed to add task', 'addTask'));
            });
        } catch (error) {
            throw new StorageError(`Failed to add task: ${error.message}`, 'addTask');
        }
    }

    /**
     * Get a task by ID
     */
    async getTask(taskId) {
        try {
            const transaction = this.getTransaction(['tasks'], 'readonly');
            const store = transaction.objectStore('tasks');
            const request = store.get(taskId);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const data = event.target.result;
                    resolve(data ? Task.fromJSON(data) : null);
                };
                request.onerror = () => reject(new StorageError('Failed to get task', 'getTask'));
            });
        } catch (error) {
            throw new StorageError(`Failed to get task: ${error.message}`, 'getTask');
        }
    }

    /**
     * Update a task
     */
    async updateTask(task) {
        try {
            const transaction = this.getTransaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks');
            const request = store.put(task.toJSON());

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(task);
                request.onerror = () => reject(new StorageError('Failed to update task', 'updateTask'));
            });
        } catch (error) {
            throw new StorageError(`Failed to update task: ${error.message}`, 'updateTask');
        }
    }

    /**
     * Delete a task
     */
    async deleteTask(taskId) {
        try {
            const transaction = this.getTransaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks');
            const request = store.delete(taskId);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(true);
                request.onerror = () => reject(new StorageError('Failed to delete task', 'deleteTask'));
            });
        } catch (error) {
            throw new StorageError(`Failed to delete task: ${error.message}`, 'deleteTask');
        }
    }

    /**
     * Get all tasks
     */
    async getAllTasks() {
        try {
            const transaction = this.getTransaction(['tasks'], 'readonly');
            const store = transaction.objectStore('tasks');
            const request = store.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const tasks = event.target.result.map(data => Task.fromJSON(data));
                    resolve(tasks);
                };
                request.onerror = () => reject(new StorageError('Failed to get all tasks', 'getAllTasks'));
            });
        } catch (error) {
            throw new StorageError(`Failed to get all tasks: ${error.message}`, 'getAllTasks');
        }
    }

    /**
     * Get tasks by category
     */
    async getTasksByCategory(category) {
        try {
            const transaction = this.getTransaction(['tasks'], 'readonly');
            const store = transaction.objectStore('tasks');
            const index = store.index('category');
            const request = index.getAll(category);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const tasks = event.target.result.map(data => Task.fromJSON(data));
                    resolve(tasks);
                };
                request.onerror = () => reject(new StorageError('Failed to get tasks by category', 'getTasksByCategory'));
            });
        } catch (error) {
            throw new StorageError(`Failed to get tasks by category: ${error.message}`, 'getTasksByCategory');
        }
    }

    /**
     * Get tasks by status
     */
    async getTasksByStatus(status) {
        try {
            const transaction = this.getTransaction(['tasks'], 'readonly');
            const store = transaction.objectStore('tasks');
            const index = store.index('status');
            const request = index.getAll(status);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const tasks = event.target.result.map(data => Task.fromJSON(data));
                    resolve(tasks);
                };
                request.onerror = () => reject(new StorageError('Failed to get tasks by status', 'getTasksByStatus'));
            });
        } catch (error) {
            throw new StorageError(`Failed to get tasks by status: ${error.message}`, 'getTasksByStatus');
        }
    }

    /**
     * Add a category
     */
    async addCategory(category) {
        try {
            const transaction = this.getTransaction(['categories'], 'readwrite');
            const store = transaction.objectStore('categories');
            const request = store.add(category.toJSON());

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(category);
                request.onerror = () => reject(new StorageError('Failed to add category', 'addCategory'));
            });
        } catch (error) {
            throw new StorageError(`Failed to add category: ${error.message}`, 'addCategory');
        }
    }

    /**
     * Get all categories
     */
    async getAllCategories() {
        try {
            const transaction = this.getTransaction(['categories'], 'readonly');
            const store = transaction.objectStore('categories');
            const request = store.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const categories = event.target.result.map(data => Category.fromJSON(data));
                    resolve(categories);
                };
                request.onerror = () => reject(new StorageError('Failed to get all categories', 'getAllCategories'));
            });
        } catch (error) {
            throw new StorageError(`Failed to get all categories: ${error.message}`, 'getAllCategories');
        }
    }

    /**
     * Update a category
     */
    async updateCategory(category) {
        try {
            const transaction = this.getTransaction(['categories'], 'readwrite');
            const store = transaction.objectStore('categories');
            const request = store.put(category.toJSON());

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(category);
                request.onerror = () => reject(new StorageError('Failed to update category', 'updateCategory'));
            });
        } catch (error) {
            throw new StorageError(`Failed to update category: ${error.message}`, 'updateCategory');
        }
    }

    /**
     * Delete a category
     */
    async deleteCategory(categoryId) {
        try {
            const transaction = this.getTransaction(['categories'], 'readwrite');
            const store = transaction.objectStore('categories');
            const request = store.delete(categoryId);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(true);
                request.onerror = () => reject(new StorageError('Failed to delete category', 'deleteCategory'));
            });
        } catch (error) {
            throw new StorageError(`Failed to delete category: ${error.message}`, 'deleteCategory');
        }
    }

    /**
     * Clear all tasks
     */
    async clearAllTasks() {
        try {
            const transaction = this.getTransaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks');
            const request = store.clear();

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(true);
                request.onerror = () => reject(new StorageError('Failed to clear tasks', 'clearAllTasks'));
            });
        } catch (error) {
            throw new StorageError(`Failed to clear tasks: ${error.message}`, 'clearAllTasks');
        }
    }

    /**
     * Get database size estimate
     */
    async getStorageEstimate() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            return await navigator.storage.estimate();
        }
        return null;
    }

    /**
     * Close the database
     */
    close() {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}

// Create and export a singleton instance
export const dbService = new IndexedDBService();
