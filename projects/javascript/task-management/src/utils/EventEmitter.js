/**
 * Event Emitter
 * Custom event system for application-wide events
 */

export class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    /**
     * Register an event listener
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
        return this;
    }

    /**
     * Register a one-time event listener
     */
    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    }

    /**
     * Remove an event listener
     */
    off(event, callback) {
        if (!this.events.has(event)) {
            return this;
        }

        if (callback) {
            const callbacks = this.events.get(event);
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        } else {
            this.events.delete(event);
        }

        return this;
    }

    /**
     * Emit an event
     */
    emit(event, ...args) {
        if (!this.events.has(event)) {
            return this;
        }

        const callbacks = this.events.get(event);
        callbacks.forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                console.error(`Error in event listener for "${event}":`, error);
            }
        });

        return this;
    }

    /**
     * Get listener count for an event
     */
    listenerCount(event) {
        return this.events.has(event) ? this.events.get(event).length : 0;
    }

    /**
     * Remove all listeners for all events
     */
    removeAllListeners() {
        this.events.clear();
        return this;
    }

    /**
     * Get all event names
     */
    eventNames() {
        return Array.from(this.events.keys());
    }
}

// Application Events
export const AppEvents = {
    // Task events
    TASK_CREATED: 'task:created',
    TASK_UPDATED: 'task:updated',
    TASK_DELETED: 'task:deleted',
    TASK_COMPLETED: 'task:completed',
    TASK_REORDERED: 'task:reordered',

    // Category events
    CATEGORY_CREATED: 'category:created',
    CATEGORY_UPDATED: 'category:updated',
    CATEGORY_DELETED: 'category:deleted',

    // Sync events
    SYNC_STARTED: 'sync:started',
    SYNC_COMPLETED: 'sync:completed',
    SYNC_FAILED: 'sync:failed',
    SYNC_CONFLICT: 'sync:conflict',

    // Network events
    ONLINE: 'network:online',
    OFFLINE: 'network:offline',

    // UI events
    VIEW_CHANGED: 'ui:view-changed',
    FILTER_CHANGED: 'ui:filter-changed',
    SEARCH_CHANGED: 'ui:search-changed',
    THEME_CHANGED: 'ui:theme-changed',

    // Notification events
    NOTIFICATION_SENT: 'notification:sent',
    NOTIFICATION_CLICKED: 'notification:clicked'
};

// Create and export a singleton instance
export const appEvents = new EventEmitter();
