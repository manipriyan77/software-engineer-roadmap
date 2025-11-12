/**
 * Settings Service
 * Manages user preferences using LocalStorage
 */

export const DefaultSettings = {
    theme: 'light',
    defaultView: 'all',
    sortBy: 'deadline',
    sortOrder: 'asc',
    pageSize: 20,
    sidebarOpen: true,
    showCompleted: true,
    showArchived: false,
    notifications: true,
    notificationTime: 60, // minutes before deadline
    autoSync: true,
    syncInterval: 30000, // 30 seconds
    language: 'en'
};

export class SettingsService {
    constructor(storageKey = 'taskManagerSettings') {
        this.storageKey = storageKey;
        this.settings = this.load();
        this.listeners = [];
    }

    /**
     * Load settings from localStorage
     */
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                return { ...DefaultSettings, ...parsed };
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
        return { ...DefaultSettings };
    }

    /**
     * Save settings to localStorage
     */
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
            this.notifyListeners('settings-updated', this.settings);
            return true;
        } catch (error) {
            console.error('Failed to save settings:', error);
            return false;
        }
    }

    /**
     * Get a setting value
     */
    get(key) {
        return this.settings[key] ?? DefaultSettings[key];
    }

    /**
     * Set a setting value
     */
    set(key, value) {
        this.settings[key] = value;
        this.save();
        return this;
    }

    /**
     * Update multiple settings at once
     */
    update(updates) {
        Object.assign(this.settings, updates);
        this.save();
        return this;
    }

    /**
     * Reset all settings to defaults
     */
    reset() {
        this.settings = { ...DefaultSettings };
        this.save();
        return this;
    }

    /**
     * Get all settings
     */
    getAll() {
        return { ...this.settings };
    }

    /**
     * Theme management
     */
    getTheme() {
        return this.get('theme');
    }

    setTheme(theme) {
        if (!['light', 'dark', 'auto'].includes(theme)) {
            throw new Error('Invalid theme value');
        }
        this.set('theme', theme);
        this.applyTheme(theme);
        return this;
    }

    applyTheme(theme) {
        const effectiveTheme = theme === 'auto' ? this.getSystemTheme() : theme;
        document.documentElement.setAttribute('data-theme', effectiveTheme);
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /**
     * View settings
     */
    getDefaultView() {
        return this.get('defaultView');
    }

    setDefaultView(view) {
        this.set('defaultView', view);
        return this;
    }

    /**
     * Sort settings
     */
    getSortBy() {
        return this.get('sortBy');
    }

    setSortBy(sortBy) {
        this.set('sortBy', sortBy);
        return this;
    }

    getSortOrder() {
        return this.get('sortOrder');
    }

    setSortOrder(order) {
        if (!['asc', 'desc'].includes(order)) {
            throw new Error('Invalid sort order');
        }
        this.set('sortOrder', order);
        return this;
    }

    /**
     * Notification settings
     */
    areNotificationsEnabled() {
        return this.get('notifications');
    }

    setNotifications(enabled) {
        this.set('notifications', enabled);
        return this;
    }

    getNotificationTime() {
        return this.get('notificationTime');
    }

    setNotificationTime(minutes) {
        this.set('notificationTime', minutes);
        return this;
    }

    /**
     * Sync settings
     */
    isAutoSyncEnabled() {
        return this.get('autoSync');
    }

    setAutoSync(enabled) {
        this.set('autoSync', enabled);
        return this;
    }

    getSyncInterval() {
        return this.get('syncInterval');
    }

    setSyncInterval(interval) {
        this.set('syncInterval', interval);
        return this;
    }

    /**
     * Display settings
     */
    isSidebarOpen() {
        return this.get('sidebarOpen');
    }

    setSidebarOpen(open) {
        this.set('sidebarOpen', open);
        return this;
    }

    shouldShowCompleted() {
        return this.get('showCompleted');
    }

    setShowCompleted(show) {
        this.set('showCompleted', show);
        return this;
    }

    shouldShowArchived() {
        return this.get('showArchived');
    }

    setShowArchived(show) {
        this.set('showArchived', show);
        return this;
    }

    /**
     * Pagination settings
     */
    getPageSize() {
        return this.get('pageSize');
    }

    setPageSize(size) {
        this.set('pageSize', size);
        return this;
    }

    /**
     * Last sync timestamp
     */
    getLastSyncTime() {
        return this.get('lastSyncTime');
    }

    setLastSyncTime(timestamp = new Date().toISOString()) {
        this.set('lastSyncTime', timestamp);
        return this;
    }

    /**
     * Export settings
     */
    export() {
        return JSON.stringify(this.settings, null, 2);
    }

    /**
     * Import settings
     */
    import(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            this.settings = { ...DefaultSettings, ...imported };
            this.save();
            return true;
        } catch (error) {
            console.error('Failed to import settings:', error);
            return false;
        }
    }

    /**
     * Event listeners
     */
    addEventListener(callback) {
        this.listeners.push(callback);
    }

    removeEventListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners(event, data) {
        this.listeners.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Error in settings listener:', error);
            }
        });
    }

    /**
     * Clear all data (for debugging or reset)
     */
    clearStorage() {
        localStorage.removeItem(this.storageKey);
        this.settings = { ...DefaultSettings };
        return this;
    }
}

// Create and export a singleton instance
export const settingsService = new SettingsService();
