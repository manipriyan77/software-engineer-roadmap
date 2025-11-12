/**
 * TaskList Class
 * Manages collections of tasks with filtering, sorting, and searching
 */

import { Task, TaskStatus, TaskPriority } from './Task.js';

export class TaskList {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    /**
     * Add a task to the list
     */
    add(task) {
        if (!(task instanceof Task)) {
            throw new Error('Only Task instances can be added');
        }
        this.tasks.push(task);
        return this;
    }

    /**
     * Remove a task by ID
     */
    remove(taskId) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Get task by ID
     */
    getById(taskId) {
        return this.tasks.find(t => t.id === taskId) || null;
    }

    /**
     * Update a task
     */
    update(taskId, updates) {
        const task = this.getById(taskId);
        if (task) {
            Object.assign(task, updates);
            task.touch();
            return task;
        }
        return null;
    }

    /**
     * Get all tasks
     */
    getAll() {
        return [...this.tasks];
    }

    /**
     * Get count of tasks
     */
    count() {
        return this.tasks.length;
    }

    /**
     * Clear all tasks
     */
    clear() {
        this.tasks = [];
        return this;
    }

    /**
     * Filter by category
     */
    static filterByCategory(tasks, category) {
        return tasks.filter(task => task.category === category);
    }

    /**
     * Filter by priority
     */
    static filterByPriority(tasks, priority) {
        return tasks.filter(task => task.priority === priority);
    }

    /**
     * Filter by status
     */
    static filterByStatus(tasks, status) {
        return tasks.filter(task => task.status === status);
    }

    /**
     * Filter by date range
     */
    static filterByDateRange(tasks, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return tasks.filter(task => {
            if (!task.deadline) return false;
            const deadline = new Date(task.deadline);
            return deadline >= start && deadline <= end;
        });
    }

    /**
     * Filter overdue tasks
     */
    static filterOverdue(tasks) {
        return tasks.filter(task => task.isOverdue());
    }

    /**
     * Filter tasks due today
     */
    static filterDueToday(tasks) {
        return tasks.filter(task => task.isDueToday());
    }

    /**
     * Filter tasks due soon
     */
    static filterDueSoon(tasks, daysAhead = 3) {
        return tasks.filter(task => task.isDueSoon(daysAhead));
    }

    /**
     * Filter completed tasks
     */
    static filterCompleted(tasks) {
        return tasks.filter(task => task.status === TaskStatus.COMPLETED);
    }

    /**
     * Filter active tasks (not completed or archived)
     */
    static filterActive(tasks) {
        return tasks.filter(task =>
            task.status !== TaskStatus.COMPLETED &&
            task.status !== TaskStatus.ARCHIVED
        );
    }

    /**
     * Filter by tag
     */
    static filterByTag(tasks, tag) {
        return tasks.filter(task => task.hasTag(tag));
    }

    /**
     * Search tasks by text (searches title and description)
     */
    static search(tasks, query) {
        if (!query || query.trim().length === 0) {
            return tasks;
        }

        const searchTerm = query.toLowerCase().trim();

        return tasks.filter(task => {
            const titleMatch = task.title.toLowerCase().includes(searchTerm);
            const descMatch = task.description.toLowerCase().includes(searchTerm);
            const tagMatch = task.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            return titleMatch || descMatch || tagMatch;
        });
    }

    /**
     * Sort by deadline (ascending - earliest first)
     */
    static sortByDeadline(tasks, ascending = true) {
        return [...tasks].sort((a, b) => {
            if (!a.deadline && !b.deadline) return 0;
            if (!a.deadline) return 1;
            if (!b.deadline) return -1;

            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);

            return ascending ? dateA - dateB : dateB - dateA;
        });
    }

    /**
     * Sort by priority (urgent first)
     */
    static sortByPriority(tasks, ascending = false) {
        const priorityOrder = {
            [TaskPriority.URGENT]: 4,
            [TaskPriority.HIGH]: 3,
            [TaskPriority.MEDIUM]: 2,
            [TaskPriority.LOW]: 1
        };

        return [...tasks].sort((a, b) => {
            const priorityA = priorityOrder[a.priority] || 0;
            const priorityB = priorityOrder[b.priority] || 0;

            return ascending ? priorityA - priorityB : priorityB - priorityA;
        });
    }

    /**
     * Sort by created date
     */
    static sortByCreatedDate(tasks, ascending = false) {
        return [...tasks].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);

            return ascending ? dateA - dateB : dateB - dateA;
        });
    }

    /**
     * Sort by updated date
     */
    static sortByUpdatedDate(tasks, ascending = false) {
        return [...tasks].sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);

            return ascending ? dateA - dateB : dateB - dateA;
        });
    }

    /**
     * Sort alphabetically by title
     */
    static sortByTitle(tasks, ascending = true) {
        return [...tasks].sort((a, b) => {
            const comparison = a.title.localeCompare(b.title);
            return ascending ? comparison : -comparison;
        });
    }

    /**
     * Sort by order property (for drag-and-drop)
     */
    static sortByOrder(tasks, ascending = true) {
        return [...tasks].sort((a, b) => {
            return ascending ? a.order - b.order : b.order - a.order;
        });
    }

    /**
     * Get statistics about tasks
     */
    static getStatistics(tasks) {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
        const inProgress = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
        const todo = tasks.filter(t => t.status === TaskStatus.TODO).length;
        const overdue = tasks.filter(t => t.isOverdue()).length;
        const dueToday = tasks.filter(t => t.isDueToday()).length;
        const dueSoon = tasks.filter(t => t.isDueSoon()).length;

        const byPriority = {
            [TaskPriority.URGENT]: tasks.filter(t => t.priority === TaskPriority.URGENT).length,
            [TaskPriority.HIGH]: tasks.filter(t => t.priority === TaskPriority.HIGH).length,
            [TaskPriority.MEDIUM]: tasks.filter(t => t.priority === TaskPriority.MEDIUM).length,
            [TaskPriority.LOW]: tasks.filter(t => t.priority === TaskPriority.LOW).length
        };

        const byCategory = {};
        tasks.forEach(task => {
            byCategory[task.category] = (byCategory[task.category] || 0) + 1;
        });

        const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

        return {
            total,
            completed,
            inProgress,
            todo,
            overdue,
            dueToday,
            dueSoon,
            byPriority,
            byCategory,
            completionRate
        };
    }

    /**
     * Paginate tasks
     */
    static paginate(tasks, page = 1, pageSize = 20) {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const totalPages = Math.ceil(tasks.length / pageSize);

        return {
            tasks: tasks.slice(start, end),
            currentPage: page,
            pageSize,
            totalTasks: tasks.length,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        };
    }

    /**
     * Group tasks by category
     */
    static groupByCategory(tasks) {
        return tasks.reduce((groups, task) => {
            const category = task.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(task);
            return groups;
        }, {});
    }

    /**
     * Group tasks by status
     */
    static groupByStatus(tasks) {
        return tasks.reduce((groups, task) => {
            const status = task.status;
            if (!groups[status]) {
                groups[status] = [];
            }
            groups[status].push(task);
            return groups;
        }, {});
    }

    /**
     * Group tasks by priority
     */
    static groupByPriority(tasks) {
        return tasks.reduce((groups, task) => {
            const priority = task.priority;
            if (!groups[priority]) {
                groups[priority] = [];
            }
            groups[priority].push(task);
            return groups;
        }, {});
    }

    /**
     * Export to JSON
     */
    toJSON() {
        return this.tasks.map(task => task.toJSON());
    }

    /**
     * Import from JSON
     */
    static fromJSON(jsonArray) {
        const tasks = jsonArray.map(json => Task.fromJSON(json));
        return new TaskList(tasks);
    }
}
