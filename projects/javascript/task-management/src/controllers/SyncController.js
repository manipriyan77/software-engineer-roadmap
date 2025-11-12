/**
 * Sync Controller
 * Orchestrates synchronization between local storage and remote server
 */

import { appEvents, AppEvents } from '../utils/EventEmitter.js';
import { OperationType } from '../services/SyncQueueService.js';

export class SyncController {
    constructor(dbService, apiService, syncQueueService, settingsService) {
        this.dbService = dbService;
        this.apiService = apiService;
        this.syncQueueService = syncQueueService;
        this.settingsService = settingsService;
        this.isSyncing = false;
        this.autoSyncTimer = null;
        this.isOnline = navigator.onLine;

        this.setupListeners();
    }

    /**
     * Setup event listeners
     */
    setupListeners() {
        // Listen for online/offline events
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());

        // Listen for task changes to queue sync operations
        appEvents.on(AppEvents.TASK_CREATED, (task) => this.queueOperation(OperationType.CREATE, 'task', task));
        appEvents.on(AppEvents.TASK_UPDATED, (task) => this.queueOperation(OperationType.UPDATE, 'task', task));
        appEvents.on(AppEvents.TASK_DELETED, (taskId) => this.queueOperation(OperationType.DELETE, 'task', null, taskId));
    }

    /**
     * Handle online event
     */
    async handleOnline() {
        console.log('Network is online');
        this.isOnline = true;
        appEvents.emit(AppEvents.ONLINE);

        // Start syncing
        await this.sync();

        // Start auto-sync if enabled
        if (this.settingsService.isAutoSyncEnabled()) {
            this.startAutoSync();
        }
    }

    /**
     * Handle offline event
     */
    handleOffline() {
        console.log('Network is offline');
        this.isOnline = false;
        appEvents.emit(AppEvents.OFFLINE);

        // Stop auto-sync
        this.stopAutoSync();
    }

    /**
     * Queue an operation for sync
     */
    async queueOperation(type, entityType, data, entityId = null) {
        try {
            await this.syncQueueService.enqueue({
                type,
                entityType,
                entityId: entityId || data?.id,
                data: data ? (typeof data.toJSON === 'function' ? data.toJSON() : data) : null
            });

            console.log(`Queued ${type} operation for ${entityType}`);
        } catch (error) {
            console.error('Failed to queue operation:', error);
        }
    }

    /**
     * Perform full sync
     */
    async sync() {
        if (this.isSyncing) {
            console.log('Sync already in progress');
            return;
        }

        if (!this.isOnline) {
            console.log('Cannot sync - offline');
            return;
        }

        this.isSyncing = true;
        appEvents.emit(AppEvents.SYNC_STARTED);

        try {
            // Step 1: Pull updates from server
            await this.pullUpdates();

            // Step 2: Push local changes to server
            await this.pushUpdates();

            // Update last sync time
            this.settingsService.setLastSyncTime();

            // Clean old synced operations
            await this.syncQueueService.clearSyncedOperations(7);

            appEvents.emit(AppEvents.SYNC_COMPLETED);
            console.log('Sync completed successfully');
        } catch (error) {
            console.error('Sync failed:', error);
            appEvents.emit(AppEvents.SYNC_FAILED, error);
        } finally {
            this.isSyncing = false;
        }
    }

    /**
     * Pull updates from server
     */
    async pullUpdates() {
        try {
            const lastSyncTime = this.settingsService.getLastSyncTime();
            const serverTasks = await this.apiService.fetchTasks(lastSyncTime);

            // Merge server tasks with local tasks
            for (const serverTask of serverTasks) {
                const localTask = await this.dbService.getTask(serverTask.id);

                if (!localTask) {
                    // New task from server - add it
                    await this.dbService.addTask(serverTask);
                } else {
                    // Resolve conflicts
                    const resolved = this.resolveConflict(localTask, serverTask);
                    await this.dbService.updateTask(resolved);
                }
            }

            console.log(`Pulled ${serverTasks.length} tasks from server`);
        } catch (error) {
            console.error('Failed to pull updates:', error);
            throw error;
        }
    }

    /**
     * Push local changes to server
     */
    async pushUpdates() {
        try {
            // Process sync queue
            await this.syncQueueService.processQueue(async (operation) => {
                await this.syncOperation(operation);
            });

            console.log('Pushed local changes to server');
        } catch (error) {
            console.error('Failed to push updates:', error);
            throw error;
        }
    }

    /**
     * Sync a single operation
     */
    async syncOperation(operation) {
        const { operation: type, entityType, entityId, data } = operation;

        try {
            if (entityType === 'task') {
                switch (type) {
                    case OperationType.CREATE:
                        await this.apiService.createTask(data);
                        break;

                    case OperationType.UPDATE:
                        await this.apiService.updateTask(entityId, data);
                        break;

                    case OperationType.DELETE:
                        await this.apiService.deleteTask(entityId);
                        break;
                }
            } else if (entityType === 'category') {
                switch (type) {
                    case OperationType.CREATE:
                        await this.apiService.createCategory(data);
                        break;

                    case OperationType.UPDATE:
                        await this.apiService.updateCategory(entityId, data);
                        break;

                    case OperationType.DELETE:
                        await this.apiService.deleteCategory(entityId);
                        break;
                }
            }
        } catch (error) {
            console.error(`Failed to sync ${type} operation:`, error);
            throw error;
        }
    }

    /**
     * Resolve conflict between local and server versions
     * Using last-write-wins strategy based on version and updatedAt
     */
    resolveConflict(localTask, serverTask) {
        // Check version numbers
        if (serverTask.version > localTask.version) {
            console.log(`Conflict resolved: Using server version for task ${localTask.id}`);
            appEvents.emit(AppEvents.SYNC_CONFLICT, { local: localTask, server: serverTask, resolution: 'server' });
            return serverTask;
        } else if (localTask.version > serverTask.version) {
            console.log(`Conflict resolved: Using local version for task ${localTask.id}`);
            appEvents.emit(AppEvents.SYNC_CONFLICT, { local: localTask, server: serverTask, resolution: 'local' });
            return localTask;
        }

        // If versions are equal, compare timestamps
        const localTime = new Date(localTask.updatedAt).getTime();
        const serverTime = new Date(serverTask.updatedAt).getTime();

        if (serverTime > localTime) {
            console.log(`Conflict resolved: Using server version for task ${localTask.id} (newer timestamp)`);
            appEvents.emit(AppEvents.SYNC_CONFLICT, { local: localTask, server: serverTask, resolution: 'server' });
            return serverTask;
        } else {
            console.log(`Conflict resolved: Using local version for task ${localTask.id} (newer timestamp)`);
            appEvents.emit(AppEvents.SYNC_CONFLICT, { local: localTask, server: serverTask, resolution: 'local' });
            return localTask;
        }
    }

    /**
     * Start auto-sync timer
     */
    startAutoSync() {
        this.stopAutoSync();

        const interval = this.settingsService.getSyncInterval();
        console.log(`Starting auto-sync with interval: ${interval}ms`);

        this.autoSyncTimer = setInterval(() => {
            if (this.isOnline) {
                this.sync();
            }
        }, interval);
    }

    /**
     * Stop auto-sync timer
     */
    stopAutoSync() {
        if (this.autoSyncTimer) {
            clearInterval(this.autoSyncTimer);
            this.autoSyncTimer = null;
            console.log('Auto-sync stopped');
        }
    }

    /**
     * Force sync now
     */
    async forceSyncNow() {
        return await this.sync();
    }

    /**
     * Get sync status
     */
    async getSyncStatus() {
        const stats = await this.syncQueueService.getStatistics();
        const lastSyncTime = this.settingsService.getLastSyncTime();

        return {
            isSyncing: this.isSyncing,
            isOnline: this.isOnline,
            lastSyncTime,
            pendingOperations: stats.pending,
            failedOperations: stats.failed,
            autoSyncEnabled: this.settingsService.isAutoSyncEnabled()
        };
    }
}
