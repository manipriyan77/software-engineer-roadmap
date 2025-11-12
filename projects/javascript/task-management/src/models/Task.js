/**
 * Task Class
 * Represents a single task with all its properties and methods
 */

import { Entity, ValidationError } from './Entity.js';

export const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    ARCHIVED: 'archived'
};

export const TaskPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
};

export class Task extends Entity {
    constructor(data = {}) {
        super(data);

        this.title = data.title || '';
        this.description = data.description || '';
        this.category = data.category || 'general';
        this.priority = data.priority || TaskPriority.MEDIUM;
        this.status = data.status || TaskStatus.TODO;
        this.deadline = data.deadline || null;
        this.tags = data.tags || [];
        this.completedAt = data.completedAt || null;
        this.order = data.order || 0; // For drag-and-drop ordering
    }

    /**
     * Validate task data
     */
    validate() {
        super.validate();

        if (!this.title || this.title.trim().length === 0) {
            throw new ValidationError('Title is required', 'title');
        }

        if (this.title.length > 200) {
            throw new ValidationError('Title must be less than 200 characters', 'title');
        }

        if (this.description && this.description.length > 2000) {
            throw new ValidationError('Description must be less than 2000 characters', 'description');
        }

        if (!Object.values(TaskPriority).includes(this.priority)) {
            throw new ValidationError('Invalid priority value', 'priority');
        }

        if (!Object.values(TaskStatus).includes(this.status)) {
            throw new ValidationError('Invalid status value', 'status');
        }

        if (this.deadline) {
            const deadlineDate = new Date(this.deadline);
            if (isNaN(deadlineDate.getTime())) {
                throw new ValidationError('Invalid deadline date', 'deadline');
            }
        }

        if (!Array.isArray(this.tags)) {
            throw new ValidationError('Tags must be an array', 'tags');
        }

        return true;
    }

    /**
     * Update task priority
     */
    updatePriority(priority) {
        if (!Object.values(TaskPriority).includes(priority)) {
            throw new ValidationError('Invalid priority value', 'priority');
        }
        this.priority = priority;
        this.touch();
        return this;
    }

    /**
     * Update task status
     */
    updateStatus(status) {
        if (!Object.values(TaskStatus).includes(status)) {
            throw new ValidationError('Invalid status value', 'status');
        }
        this.status = status;

        if (status === TaskStatus.COMPLETED && !this.completedAt) {
            this.completedAt = new Date().toISOString();
        } else if (status !== TaskStatus.COMPLETED) {
            this.completedAt = null;
        }

        this.touch();
        return this;
    }

    /**
     * Update task deadline
     */
    updateDeadline(deadline) {
        if (deadline) {
            const deadlineDate = new Date(deadline);
            if (isNaN(deadlineDate.getTime())) {
                throw new ValidationError('Invalid deadline date', 'deadline');
            }
            this.deadline = deadlineDate.toISOString();
        } else {
            this.deadline = null;
        }
        this.touch();
        return this;
    }

    /**
     * Mark task as complete
     */
    complete() {
        return this.updateStatus(TaskStatus.COMPLETED);
    }

    /**
     * Mark task as incomplete
     */
    uncomplete() {
        return this.updateStatus(TaskStatus.TODO);
    }

    /**
     * Archive the task
     */
    archive() {
        return this.updateStatus(TaskStatus.ARCHIVED);
    }

    /**
     * Check if task is overdue
     */
    isOverdue() {
        if (!this.deadline || this.status === TaskStatus.COMPLETED) {
            return false;
        }
        return new Date(this.deadline) < new Date();
    }

    /**
     * Check if task is due today
     */
    isDueToday() {
        if (!this.deadline) {
            return false;
        }
        const today = new Date();
        const deadline = new Date(this.deadline);

        return today.getFullYear() === deadline.getFullYear() &&
               today.getMonth() === deadline.getMonth() &&
               today.getDate() === deadline.getDate();
    }

    /**
     * Check if task is due soon (within 3 days)
     */
    isDueSoon(daysAhead = 3) {
        if (!this.deadline || this.status === TaskStatus.COMPLETED) {
            return false;
        }

        const deadline = new Date(this.deadline);
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + daysAhead);

        return deadline <= futureDate && deadline >= new Date();
    }

    /**
     * Get remaining time until deadline
     */
    getRemainingTime() {
        if (!this.deadline) {
            return null;
        }

        const now = new Date();
        const deadline = new Date(this.deadline);
        const diff = deadline - now;

        if (diff < 0) {
            return { overdue: true, days: 0, hours: 0, minutes: 0 };
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return { overdue: false, days, hours, minutes };
    }

    /**
     * Add a tag
     */
    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
            this.touch();
        }
        return this;
    }

    /**
     * Remove a tag
     */
    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
        this.touch();
        return this;
    }

    /**
     * Check if task has a specific tag
     */
    hasTag(tag) {
        return this.tags.includes(tag);
    }

    /**
     * Convert to JSON
     */
    toJSON() {
        return {
            ...super.toJSON(),
            title: this.title,
            description: this.description,
            category: this.category,
            priority: this.priority,
            status: this.status,
            deadline: this.deadline,
            tags: [...this.tags],
            completedAt: this.completedAt,
            order: this.order
        };
    }

    /**
     * Create Task from JSON
     */
    static fromJSON(json) {
        return new Task(json);
    }

    /**
     * Get priority label
     */
    getPriorityLabel() {
        const labels = {
            [TaskPriority.LOW]: 'Low',
            [TaskPriority.MEDIUM]: 'Medium',
            [TaskPriority.HIGH]: 'High',
            [TaskPriority.URGENT]: 'Urgent'
        };
        return labels[this.priority] || 'Medium';
    }

    /**
     * Get status label
     */
    getStatusLabel() {
        const labels = {
            [TaskStatus.TODO]: 'To Do',
            [TaskStatus.IN_PROGRESS]: 'In Progress',
            [TaskStatus.COMPLETED]: 'Completed',
            [TaskStatus.ARCHIVED]: 'Archived'
        };
        return labels[this.status] || 'To Do';
    }

    /**
     * Get priority color
     */
    getPriorityColor() {
        const colors = {
            [TaskPriority.LOW]: '#4CAF50',
            [TaskPriority.MEDIUM]: '#2196F3',
            [TaskPriority.HIGH]: '#FF9800',
            [TaskPriority.URGENT]: '#F44336'
        };
        return colors[this.priority] || '#2196F3';
    }
}
