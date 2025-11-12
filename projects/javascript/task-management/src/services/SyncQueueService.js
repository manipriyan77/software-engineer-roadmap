/**
 * Sync Queue Service
 * Manages offline operations queue and syncs when online
 */

export const OperationType = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete'
};

export class SyncQueueService {
    constructor(dbService) {
        this.dbService = dbService;
        this.isProcessing = false;
        this.listeners = [];
    }

    /**
     * Add operation to sync queue
     */
    async enqueue(operation) {
        try {
            const queueItem = {
                operation: operation.type,
                entityType: operation.entityType,
                entityId: operation.entityId,
                data: operation.data,
                timestamp: new Date().toISOString(),
                synced: false,
                retryCount: 0,
                error: null
            };

            const transaction = this.dbService.getTransaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const request = store.add(queueItem);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    queueItem.id = event.target.result;
                    this.notifyListeners('enqueued', queueItem);
                    resolve(queueItem);
                };
                request.onerror = () => reject(new Error('Failed to enqueue operation'));
            });
        } catch (error) {
            console.error('Failed to enqueue operation:', error);
            throw error;
        }
    }

    /**
     * Get all pending operations
     */
    async getPendingOperations() {
        try {
            const transaction = this.dbService.getTransaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const index = store.index('synced');
            const request = index.getAll(false);

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => resolve(event.target.result);
                request.onerror = () => reject(new Error('Failed to get pending operations'));
            });
        } catch (error) {
            console.error('Failed to get pending operations:', error);
            return [];
        }
    }

    /**
     * Mark operation as synced
     */
    async markAsSynced(queueId) {
        try {
            const transaction = this.dbService.getTransaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const getRequest = store.get(queueId);

            return new Promise((resolve, reject) => {
                getRequest.onsuccess = (event) => {
                    const item = event.target.result;
                    if (item) {
                        item.synced = true;
                        item.syncedAt = new Date().toISOString();
                        const putRequest = store.put(item);

                        putRequest.onsuccess = () => {
                            this.notifyListeners('synced', item);
                            resolve(true);
                        };
                        putRequest.onerror = () => reject(new Error('Failed to update sync status'));
                    } else {
                        resolve(false);
                    }
                };
                getRequest.onerror = () => reject(new Error('Failed to get queue item'));
            });
        } catch (error) {
            console.error('Failed to mark as synced:', error);
            return false;
        }
    }

    /**
     * Mark operation as failed
     */
    async markAsFailed(queueId, error) {
        try {
            const transaction = this.dbService.getTransaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const getRequest = store.get(queueId);

            return new Promise((resolve, reject) => {
                getRequest.onsuccess = (event) => {
                    const item = event.target.result;
                    if (item) {
                        item.retryCount++;
                        item.error = error.message;
                        item.lastAttempt = new Date().toISOString();
                        const putRequest = store.put(item);

                        putRequest.onsuccess = () => {
                            this.notifyListeners('failed', item);
                            resolve(true);
                        };
                        putRequest.onerror = () => reject(new Error('Failed to update error status'));
                    } else {
                        resolve(false);
                    }
                };
                getRequest.onerror = () => reject(new Error('Failed to get queue item'));
            });
        } catch (error) {
            console.error('Failed to mark as failed:', error);
            return false;
        }
    }

    /**
     * Remove operation from queue
     */
    async remove(queueId) {
        try {
            const transaction = this.dbService.getTransaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const request = store.delete(queueId);

            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    this.notifyListeners('removed', { id: queueId });
                    resolve(true);
                };
                request.onerror = () => reject(new Error('Failed to remove from queue'));
            });
        } catch (error) {
            console.error('Failed to remove from queue:', error);
            return false;
        }
    }

    /**
     * Process sync queue
     */
    async processQueue(syncFunction) {
        if (this.isProcessing) {
            console.log('Queue is already being processed');
            return;
        }

        this.isProcessing = true;
        this.notifyListeners('processing-started');

        try {
            const pendingOps = await this.getPendingOperations();

            if (pendingOps.length === 0) {
                console.log('No pending operations to sync');
                this.notifyListeners('processing-completed', { processed: 0, failed: 0 });
                return;
            }

            console.log(`Processing ${pendingOps.length} pending operations`);

            let processed = 0;
            let failed = 0;

            for (const op of pendingOps) {
                // Skip if retry count is too high (max 5 retries)
                if (op.retryCount >= 5) {
                    console.warn(`Skipping operation ${op.id} - max retries reached`);
                    failed++;
                    continue;
                }

                try {
                    // Call the sync function provided
                    await syncFunction(op);

                    // Mark as synced
                    await this.markAsSynced(op.id);
                    processed++;

                    // Small delay to avoid overwhelming the server
                    await new Promise(resolve => setTimeout(resolve, 100));
                } catch (error) {
                    console.error(`Failed to sync operation ${op.id}:`, error);
                    await this.markAsFailed(op.id, error);
                    failed++;
                }
            }

            console.log(`Sync completed: ${processed} processed, ${failed} failed`);
            this.notifyListeners('processing-completed', { processed, failed });
        } catch (error) {
            console.error('Failed to process queue:', error);
            this.notifyListeners('processing-error', error);
        } finally {
            this.isProcessing = false;
        }
    }

    /**
     * Clear synced operations older than specified days
     */
    async clearSyncedOperations(daysOld = 7) {
        try {
            const transaction = this.dbService.getTransaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const index = store.index('synced');
            const request = index.openCursor(true);

            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - daysOld);

            let deletedCount = 0;

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        const item = cursor.value;
                        if (item.synced && new Date(item.syncedAt) < cutoffDate) {
                            cursor.delete();
                            deletedCount++;
                        }
                        cursor.continue();
                    } else {
                        console.log(`Cleared ${deletedCount} old synced operations`);
                        resolve(deletedCount);
                    }
                };
                request.onerror = () => reject(new Error('Failed to clear synced operations'));
            });
        } catch (error) {
            console.error('Failed to clear synced operations:', error);
            return 0;
        }
    }

    /**
     * Get queue statistics
     */
    async getStatistics() {
        try {
            const transaction = this.dbService.getTransaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const request = store.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const items = event.target.result;
                    const pending = items.filter(i => !i.synced).length;
                    const synced = items.filter(i => i.synced).length;
                    const failed = items.filter(i => !i.synced && i.retryCount > 0).length;

                    resolve({
                        total: items.length,
                        pending,
                        synced,
                        failed
                    });
                };
                request.onerror = () => reject(new Error('Failed to get statistics'));
            });
        } catch (error) {
            console.error('Failed to get queue statistics:', error);
            return { total: 0, pending: 0, synced: 0, failed: 0 };
        }
    }

    /**
     * Add event listener
     */
    addEventListener(callback) {
        this.listeners.push(callback);
    }

    /**
     * Remove event listener
     */
    removeEventListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    /**
     * Notify all listeners
     */
    notifyListeners(event, data) {
        this.listeners.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Error in sync queue listener:', error);
            }
        });
    }
}
