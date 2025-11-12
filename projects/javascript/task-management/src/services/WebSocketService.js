/**
 * WebSocket Service
 * Manages real-time WebSocket connection for live updates
 * Note: This is a mock service - you'll need a WebSocket server
 */

import { appEvents, AppEvents } from '../utils/EventEmitter.js';

export class WebSocketService {
    constructor(url = 'ws://localhost:3000') {
        this.url = url;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000; // 1 second
        this.heartbeatInterval = 30000; // 30 seconds
        this.heartbeatTimer = null;
        this.isConnecting = false;
        this.isManuallyDisconnected = false;
        this.messageQueue = [];
    }

    /**
     * Connect to WebSocket server
     */
    connect() {
        if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
            console.log('WebSocket already connected or connecting');
            return;
        }

        this.isConnecting = true;
        this.isManuallyDisconnected = false;

        try {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => this.handleOpen();
            this.ws.onmessage = (event) => this.handleMessage(event);
            this.ws.onerror = (error) => this.handleError(error);
            this.ws.onclose = (event) => this.handleClose(event);
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
            this.isConnecting = false;
            this.scheduleReconnect();
        }
    }

    /**
     * Handle WebSocket open event
     */
    handleOpen() {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;

        // Start heartbeat
        this.startHeartbeat();

        // Process queued messages
        this.processMessageQueue();

        // Emit connection event
        appEvents.emit(AppEvents.ONLINE);
    }

    /**
     * Handle incoming WebSocket messages
     */
    handleMessage(event) {
        try {
            const message = JSON.parse(event.data);
            this.processMessage(message);
        } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
        }
    }

    /**
     * Process WebSocket message
     */
    processMessage(message) {
        const { type, data } = message;

        switch (type) {
            case 'task:created':
                appEvents.emit(AppEvents.TASK_CREATED, data);
                break;

            case 'task:updated':
                appEvents.emit(AppEvents.TASK_UPDATED, data);
                break;

            case 'task:deleted':
                appEvents.emit(AppEvents.TASK_DELETED, data);
                break;

            case 'category:created':
                appEvents.emit(AppEvents.CATEGORY_CREATED, data);
                break;

            case 'category:updated':
                appEvents.emit(AppEvents.CATEGORY_UPDATED, data);
                break;

            case 'category:deleted':
                appEvents.emit(AppEvents.CATEGORY_DELETED, data);
                break;

            case 'sync:conflict':
                appEvents.emit(AppEvents.SYNC_CONFLICT, data);
                break;

            case 'pong':
                // Heartbeat response
                break;

            default:
                console.warn('Unknown message type:', type);
        }
    }

    /**
     * Handle WebSocket error
     */
    handleError(error) {
        console.error('WebSocket error:', error);
    }

    /**
     * Handle WebSocket close event
     */
    handleClose(event) {
        console.log('WebSocket closed:', event.code, event.reason);
        this.isConnecting = false;
        this.stopHeartbeat();

        appEvents.emit(AppEvents.OFFLINE);

        // Attempt to reconnect if not manually disconnected
        if (!this.isManuallyDisconnected) {
            this.scheduleReconnect();
        }
    }

    /**
     * Schedule reconnection attempt
     */
    scheduleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

        console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`);

        setTimeout(() => {
            this.connect();
        }, delay);
    }

    /**
     * Send message through WebSocket
     */
    send(type, data) {
        const message = JSON.stringify({ type, data });

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            // Queue message for later
            this.messageQueue.push({ type, data });
        }
    }

    /**
     * Process queued messages
     */
    processMessageQueue() {
        while (this.messageQueue.length > 0 && this.ws.readyState === WebSocket.OPEN) {
            const { type, data } = this.messageQueue.shift();
            this.send(type, data);
        }
    }

    /**
     * Start heartbeat to keep connection alive
     */
    startHeartbeat() {
        this.stopHeartbeat();

        this.heartbeatTimer = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.send('ping', { timestamp: Date.now() });
            }
        }, this.heartbeatInterval);
    }

    /**
     * Stop heartbeat
     */
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    /**
     * Disconnect WebSocket
     */
    disconnect() {
        this.isManuallyDisconnected = true;
        this.stopHeartbeat();

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    /**
     * Check if connected
     */
    isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    /**
     * Get connection state
     */
    getState() {
        if (!this.ws) return 'DISCONNECTED';

        switch (this.ws.readyState) {
            case WebSocket.CONNECTING:
                return 'CONNECTING';
            case WebSocket.OPEN:
                return 'CONNECTED';
            case WebSocket.CLOSING:
                return 'CLOSING';
            case WebSocket.CLOSED:
                return 'DISCONNECTED';
            default:
                return 'UNKNOWN';
        }
    }

    /**
     * Broadcast task change
     */
    broadcastTaskChange(type, task) {
        this.send(type, task.toJSON());
    }

    /**
     * Broadcast category change
     */
    broadcastCategoryChange(type, category) {
        this.send(type, category.toJSON());
    }
}

// Create and export a singleton instance
export const wsService = new WebSocketService();
