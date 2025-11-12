/**
 * Base Entity Class
 * Provides common functionality for all entities (Task, Category, etc.)
 */

// Custom Error Classes
export class ValidationError extends Error {
    constructor(message, field = null) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

export class NotFoundError extends Error {
    constructor(message, entityType = null) {
        super(message);
        this.name = 'NotFoundError';
        this.entityType = entityType;
    }
}

export class DuplicateError extends Error {
    constructor(message, field = null) {
        super(message);
        this.name = 'DuplicateError';
        this.field = field;
    }
}

export class Entity {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.version = data.version || 1; // For conflict resolution
    }

    /**
     * Generate a unique ID using timestamp and random string
     */
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Update the updatedAt timestamp and increment version
     */
    touch() {
        this.updatedAt = new Date().toISOString();
        this.version++;
    }

    /**
     * Validate the entity - to be overridden by child classes
     */
    validate() {
        // Base validation - check required fields exist
        if (!this.id) {
            throw new ValidationError('ID is required', 'id');
        }
        if (!this.createdAt) {
            throw new ValidationError('Created date is required', 'createdAt');
        }
        return true;
    }

    /**
     * Convert entity to plain JSON object
     */
    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            version: this.version
        };
    }

    /**
     * Create entity from JSON object
     */
    static fromJSON(json) {
        return new this(json);
    }

    /**
     * Clone the entity with a new ID
     */
    clone() {
        const data = this.toJSON();
        delete data.id;
        delete data.createdAt;
        delete data.updatedAt;
        delete data.version;
        return new this.constructor(data);
    }

    /**
     * Check if two entities are equal (by ID)
     */
    equals(other) {
        return other && this.id === other.id;
    }

    /**
     * Compare versions for conflict resolution
     */
    isNewerThan(other) {
        return this.version > other.version ||
               new Date(this.updatedAt) > new Date(other.updatedAt);
    }
}
