/**
 * Category Class
 * Represents a task category with color and icon
 */

import { Entity, ValidationError } from './Entity.js';

export class Category extends Entity {
    constructor(data = {}) {
        super(data);

        this.name = data.name || '';
        this.color = data.color || '#2196F3';
        this.icon = data.icon || '📁';
        this.description = data.description || '';
    }

    /**
     * Default categories
     */
    static get DEFAULTS() {
        return [
            { name: 'general', color: '#2196F3', icon: '📁', description: 'General tasks' },
            { name: 'work', color: '#FF9800', icon: '💼', description: 'Work-related tasks' },
            { name: 'personal', color: '#4CAF50', icon: '🏠', description: 'Personal tasks' },
            { name: 'shopping', color: '#E91E63', icon: '🛒', description: 'Shopping lists' },
            { name: 'health', color: '#00BCD4', icon: '💪', description: 'Health and fitness' },
            { name: 'learning', color: '#9C27B0', icon: '📚', description: 'Learning and education' }
        ];
    }

    /**
     * Validate category
     */
    validate() {
        super.validate();

        if (!this.name || this.name.trim().length === 0) {
            throw new ValidationError('Category name is required', 'name');
        }

        if (this.name.length > 50) {
            throw new ValidationError('Category name must be less than 50 characters', 'name');
        }

        if (this.description && this.description.length > 200) {
            throw new ValidationError('Description must be less than 200 characters', 'description');
        }

        if (!this.isValidColor(this.color)) {
            throw new ValidationError('Invalid color format', 'color');
        }

        return true;
    }

    /**
     * Check if color is valid hex color
     */
    isValidColor(color) {
        return /^#[0-9A-F]{6}$/i.test(color);
    }

    /**
     * Update category color
     */
    updateColor(color) {
        if (!this.isValidColor(color)) {
            throw new ValidationError('Invalid color format', 'color');
        }
        this.color = color;
        this.touch();
        return this;
    }

    /**
     * Update category icon
     */
    updateIcon(icon) {
        this.icon = icon;
        this.touch();
        return this;
    }

    /**
     * Convert to JSON
     */
    toJSON() {
        return {
            ...super.toJSON(),
            name: this.name,
            color: this.color,
            icon: this.icon,
            description: this.description
        };
    }

    /**
     * Create Category from JSON
     */
    static fromJSON(json) {
        return new Category(json);
    }

    /**
     * Get lighter color shade for backgrounds
     */
    getLightColor() {
        const hex = this.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        return `rgba(${r}, ${g}, ${b}, 0.1)`;
    }

    /**
     * Get darker color shade for borders
     */
    getDarkColor() {
        const hex = this.color.replace('#', '');
        const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 40);
        const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 40);
        const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 40);

        return `rgb(${r}, ${g}, ${b})`;
    }
}
