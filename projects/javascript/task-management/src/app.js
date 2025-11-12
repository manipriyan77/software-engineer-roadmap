/**
 * Main Application Entry Point
 * Initializes and orchestrates all services and controllers
 */

import { dbService } from './services/IndexedDBService.js';
import { settingsService } from './services/SettingsService.js';
import { SyncQueueService } from './services/SyncQueueService.js';
import { apiService } from './services/APIService.js';
import { wsService } from './services/WebSocketService.js';
import { SyncController } from './controllers/SyncController.js';
import { UIController } from './controllers/UIController.js';
import { Category } from './models/Category.js';

class TaskManagerApp {
    constructor() {
        this.initialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('Initializing Task Manager...');

            // Step 1: Initialize IndexedDB
            await this.initDatabase();

            // Step 2: Initialize default categories
            await this.initCategories();

            // Step 3: Initialize services
            this.syncQueueService = new SyncQueueService(dbService);

            // Step 4: Initialize controllers
            this.syncController = new SyncController(
                dbService,
                apiService,
                this.syncQueueService,
                settingsService
            );

            this.uiController = new UIController(
                dbService,
                settingsService
            );

            // Step 5: Initialize UI
            await this.uiController.initialize();

            // Step 6: Start auto-sync if enabled and online
            if (settingsService.isAutoSyncEnabled() && navigator.onLine) {
                this.syncController.startAutoSync();
            }

            // Step 7: Connect to WebSocket (optional - can be disabled)
            // Uncomment if you have a WebSocket server
            // wsService.connect();

            // Step 8: Register service worker for offline support (optional)
            await this.registerServiceWorker();

            // Step 9: Request notification permissions
            await this.requestNotificationPermission();

            // Step 10: Setup periodic tasks
            this.setupPeriodicTasks();

            this.initialized = true;
            console.log('Task Manager initialized successfully!');

            // Show welcome message for first-time users
            if (this.isFirstVisit()) {
                this.showWelcomeMessage();
            }
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }

    /**
     * Initialize database
     */
    async initDatabase() {
        try {
            await dbService.init();
            console.log('Database initialized');
        } catch (error) {
            console.error('Database initialization failed:', error);
            throw error;
        }
    }

    /**
     * Initialize default categories
     */
    async initCategories() {
        try {
            const existingCategories = await dbService.getAllCategories();

            if (existingCategories.length === 0) {
                console.log('Creating default categories...');

                for (const catData of Category.DEFAULTS) {
                    const category = new Category(catData);
                    await dbService.addCategory(category);
                }

                console.log('Default categories created');
            }
        } catch (error) {
            console.error('Failed to initialize categories:', error);
            // Non-critical error, continue initialization
        }
    }

    /**
     * Register service worker for offline support
     */
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                // Note: You would need to create a service-worker.js file for this to work
                // Commented out for now as it's an advanced feature
                // const registration = await navigator.serviceWorker.register('/service-worker.js');
                // console.log('Service Worker registered:', registration);
            } catch (error) {
                console.warn('Service Worker registration failed:', error);
            }
        }
    }

    /**
     * Request notification permission
     */
    async requestNotificationPermission() {
        if ('Notification' in window && settingsService.areNotificationsEnabled()) {
            if (Notification.permission === 'default') {
                const permission = await Notification.requestPermission();
                console.log('Notification permission:', permission);
            }
        }
    }

    /**
     * Setup periodic tasks
     */
    setupPeriodicTasks() {
        // Check for overdue tasks every 5 minutes
        setInterval(() => {
            this.checkOverdueTasks();
        }, 5 * 60 * 1000);

        // Check for upcoming deadlines every 15 minutes
        setInterval(() => {
            this.checkUpcomingDeadlines();
        }, 15 * 60 * 1000);

        // Clean up old synced operations daily
        setInterval(() => {
            this.syncQueueService.clearSyncedOperations(7);
        }, 24 * 60 * 60 * 1000);
    }

    /**
     * Check for overdue tasks and notify
     */
    async checkOverdueTasks() {
        try {
            const tasks = await dbService.getAllTasks();
            const overdueTasks = tasks.filter(task => task.isOverdue());

            if (overdueTasks.length > 0 && settingsService.areNotificationsEnabled()) {
                this.showNotification(
                    'Overdue Tasks',
                    `You have ${overdueTasks.length} overdue task(s)`
                );
            }
        } catch (error) {
            console.error('Failed to check overdue tasks:', error);
        }
    }

    /**
     * Check for upcoming deadlines and notify
     */
    async checkUpcomingDeadlines() {
        try {
            const tasks = await dbService.getAllTasks();
            const notificationTime = settingsService.getNotificationTime();

            // Find tasks due within notification time
            const upcomingTasks = tasks.filter(task => {
                if (!task.deadline) return false;

                const deadline = new Date(task.deadline);
                const now = new Date();
                const diffMinutes = (deadline - now) / (1000 * 60);

                return diffMinutes > 0 && diffMinutes <= notificationTime;
            });

            if (upcomingTasks.length > 0 && settingsService.areNotificationsEnabled()) {
                for (const task of upcomingTasks) {
                    this.showNotification(
                        'Upcoming Deadline',
                        `"${task.title}" is due soon!`
                    );
                }
            }
        } catch (error) {
            console.error('Failed to check upcoming deadlines:', error);
        }
    }

    /**
     * Show browser notification
     */
    showNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/favicon.ico',
                badge: '/favicon.ico'
            });
        }
    }

    /**
     * Check if first visit
     */
    isFirstVisit() {
        const visited = localStorage.getItem('taskManagerVisited');
        if (!visited) {
            localStorage.setItem('taskManagerVisited', 'true');
            return true;
        }
        return false;
    }

    /**
     * Show welcome message
     */
    showWelcomeMessage() {
        if (this.uiController) {
            this.uiController.showToast('Welcome to Task Manager! 👋', 'info');
        }
    }

    /**
     * Show error message
     */
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ef4444;
            color: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            max-width: 400px;
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <h2 style="margin-bottom: 1rem;">Error</h2>
            <p>${message}</p>
            <button onclick="location.reload()" style="
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: white;
                color: #ef4444;
                border: none;
                border-radius: 0.25rem;
                cursor: pointer;
                font-weight: 600;
            ">Reload Page</button>
        `;
        document.body.appendChild(errorDiv);
    }

    /**
     * Get current sync status
     */
    async getSyncStatus() {
        if (this.syncController) {
            return await this.syncController.getSyncStatus();
        }
        return null;
    }

    /**
     * Force sync now
     */
    async syncNow() {
        if (this.syncController) {
            return await this.syncController.forceSyncNow();
        }
    }

    /**
     * Get database statistics
     */
    async getStatistics() {
        try {
            const tasks = await dbService.getAllTasks();
            const categories = await dbService.getAllCategories();
            const storage = await dbService.getStorageEstimate();

            return {
                totalTasks: tasks.length,
                totalCategories: categories.length,
                storage
            };
        } catch (error) {
            console.error('Failed to get statistics:', error);
            return null;
        }
    }

    /**
     * Export all data
     */
    async exportAllData() {
        try {
            const tasks = await dbService.getAllTasks();
            const categories = await dbService.getAllCategories();
            const settings = settingsService.getAll();

            const data = {
                version: '1.0.0',
                exportDate: new Date().toISOString(),
                tasks: tasks.map(t => t.toJSON()),
                categories: categories.map(c => c.toJSON()),
                settings
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `task-manager-backup-${new Date().toISOString()}.json`;
            a.click();
            URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error('Failed to export data:', error);
            return false;
        }
    }

    /**
     * Import all data
     */
    async importAllData(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);

            // Clear existing data
            await dbService.clearAllTasks();

            // Import tasks
            for (const taskData of data.tasks) {
                await dbService.addTask(taskData);
            }

            // Import categories
            for (const categoryData of data.categories) {
                await dbService.addCategory(categoryData);
            }

            // Import settings
            if (data.settings) {
                settingsService.update(data.settings);
            }

            // Refresh UI
            if (this.uiController) {
                await this.uiController.refreshTasks();
                await this.uiController.loadCategories();
            }

            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }

    /**
     * Clear all data (reset app)
     */
    async clearAllData() {
        if (!confirm('Are you sure you want to clear all data? This cannot be undone!')) {
            return false;
        }

        try {
            await dbService.clearAllTasks();
            settingsService.reset();

            // Reinitialize
            await this.initCategories();

            if (this.uiController) {
                await this.uiController.refreshTasks();
                await this.uiController.loadCategories();
            }

            return true;
        } catch (error) {
            console.error('Failed to clear data:', error);
            return false;
        }
    }
}

// Create and initialize the application
const app = new TaskManagerApp();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Export app instance for debugging in console
window.taskManagerApp = app;

// Handle page visibility changes to pause/resume sync
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('App is hidden, pausing sync');
        if (app.syncController) {
            app.syncController.stopAutoSync();
        }
    } else {
        console.log('App is visible, resuming sync');
        if (app.syncController && settingsService.isAutoSyncEnabled()) {
            app.syncController.startAutoSync();
        }
    }
});

// Handle before unload (cleanup)
window.addEventListener('beforeunload', () => {
    if (app.syncController) {
        app.syncController.stopAutoSync();
    }
    if (wsService) {
        wsService.disconnect();
    }
    dbService.close();
});

console.log('Task Manager App loaded');
