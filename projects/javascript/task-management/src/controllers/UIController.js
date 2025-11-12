/**
 * UI Controller
 * Manages all UI interactions and DOM manipulation
 */

import { Task, TaskStatus, TaskPriority } from '../models/Task.js';
import { Category } from '../models/Category.js';
import { TaskList } from '../models/TaskList.js';
import { appEvents, AppEvents } from '../utils/EventEmitter.js';

export class UIController {
    constructor(dbService, settingsService) {
        this.dbService = dbService;
        this.settingsService = settingsService;
        this.currentView = 'all';
        this.currentFilters = {
            search: '',
            priority: '',
            status: '',
            category: ''
        };
        this.currentSort = {
            by: 'deadline',
            order: 'asc'
        };
        this.editingTaskId = null;
        this.initializeElements();
        this.setupEventListeners();
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        // Header elements
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.searchInput = document.getElementById('searchInput');
        this.searchClear = document.getElementById('searchClear');
        this.syncStatus = document.getElementById('syncStatus');
        this.themeToggle = document.getElementById('themeToggle');
        this.addTaskBtn = document.getElementById('addTaskBtn');

        // Sidebar elements
        this.sidebar = document.getElementById('sidebar');
        this.categoryList = document.getElementById('categoryList');
        this.viewButtons = document.querySelectorAll('[data-view]');

        // Content elements
        this.viewTitle = document.getElementById('viewTitle');
        this.tasksList = document.getElementById('tasksList');
        this.emptyState = document.getElementById('emptyState');
        this.loadingState = document.getElementById('loadingState');

        // Filter elements
        this.priorityFilter = document.getElementById('priorityFilter');
        this.statusFilter = document.getElementById('statusFilter');
        this.sortBy = document.getElementById('sortBy');
        this.sortOrder = document.getElementById('sortOrder');

        // Modal elements
        this.taskModal = document.getElementById('taskModal');
        this.taskForm = document.getElementById('taskForm');
        this.closeTaskModal = document.getElementById('closeTaskModal');
        this.cancelTaskBtn = document.getElementById('cancelTaskBtn');

        // Import/Export
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFile = document.getElementById('importFile');

        // Toast container
        this.toastContainer = document.getElementById('toastContainer');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Sidebar toggle
        this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());

        // Search
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchClear.addEventListener('click', () => {
            this.searchInput.value = '';
            this.handleSearch('');
        });

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Add task
        this.addTaskBtn.addEventListener('click', () => this.openTaskModal());

        // View navigation
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', () => this.switchView(btn.dataset.view));
        });

        // Filters
        this.priorityFilter.addEventListener('change', (e) => this.handleFilterChange('priority', e.target.value));
        this.statusFilter.addEventListener('change', (e) => this.handleFilterChange('status', e.target.value));

        // Sort
        this.sortBy.addEventListener('change', (e) => this.handleSortChange(e.target.value));
        this.sortOrder.addEventListener('click', () => this.toggleSortOrder());

        // Modal
        this.closeTaskModal.addEventListener('click', () => this.closeModal());
        this.cancelTaskBtn.addEventListener('click', () => this.closeModal());
        this.taskForm.addEventListener('submit', (e) => this.handleTaskSubmit(e));

        // Click outside modal to close
        this.taskModal.addEventListener('click', (e) => {
            if (e.target === this.taskModal) {
                this.closeModal();
            }
        });

        // Import/Export
        this.exportBtn.addEventListener('click', () => this.exportTasks());
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (e) => this.importTasks(e));

        // Listen to app events
        appEvents.on(AppEvents.TASK_CREATED, () => this.refreshTasks());
        appEvents.on(AppEvents.TASK_UPDATED, () => this.refreshTasks());
        appEvents.on(AppEvents.TASK_DELETED, () => this.refreshTasks());
        appEvents.on(AppEvents.ONLINE, () => this.updateSyncStatus(true));
        appEvents.on(AppEvents.OFFLINE, () => this.updateSyncStatus(false));
        appEvents.on(AppEvents.SYNC_STARTED, () => this.updateSyncStatus(true, 'syncing'));
        appEvents.on(AppEvents.SYNC_COMPLETED, () => this.updateSyncStatus(true, 'synced'));
        appEvents.on(AppEvents.SYNC_FAILED, () => this.showToast('Sync failed', 'error'));
    }

    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        this.sidebar.classList.toggle('closed');
        this.settingsService.setSidebarOpen(!this.sidebar.classList.contains('closed'));
    }

    /**
     * Switch view
     */
    switchView(view) {
        this.currentView = view;

        // Update active state
        this.viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Update title
        const titles = {
            all: 'All Tasks',
            today: 'Today',
            upcoming: 'Upcoming',
            overdue: 'Overdue',
            completed: 'Completed'
        };
        this.viewTitle.textContent = titles[view] || 'All Tasks';

        // Refresh tasks
        this.refreshTasks();

        // Emit event
        appEvents.emit(AppEvents.VIEW_CHANGED, view);
    }

    /**
     * Handle search
     */
    handleSearch(query) {
        this.currentFilters.search = query;
        this.refreshTasks();
        appEvents.emit(AppEvents.SEARCH_CHANGED, query);
    }

    /**
     * Handle filter change
     */
    handleFilterChange(filterType, value) {
        this.currentFilters[filterType] = value;
        this.refreshTasks();
        appEvents.emit(AppEvents.FILTER_CHANGED, this.currentFilters);
    }

    /**
     * Handle sort change
     */
    handleSortChange(sortBy) {
        this.currentSort.by = sortBy;
        this.refreshTasks();
    }

    /**
     * Toggle sort order
     */
    toggleSortOrder() {
        this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
        this.sortOrder.textContent = this.currentSort.order === 'asc' ? '↓' : '↑';
        this.refreshTasks();
    }

    /**
     * Refresh tasks display
     */
    async refreshTasks() {
        this.showLoading();

        try {
            let tasks = await this.dbService.getAllTasks();

            // Apply view filter
            tasks = this.applyViewFilter(tasks);

            // Apply filters
            tasks = this.applyFilters(tasks);

            // Apply sort
            tasks = this.applySort(tasks);

            // Render tasks
            this.renderTasks(tasks);

            // Update counts
            this.updateCounts();
        } catch (error) {
            console.error('Failed to refresh tasks:', error);
            this.showToast('Failed to load tasks', 'error');
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Apply view filter
     */
    applyViewFilter(tasks) {
        switch (this.currentView) {
            case 'today':
                return TaskList.filterDueToday(tasks);
            case 'upcoming':
                return TaskList.filterDueSoon(tasks, 7);
            case 'overdue':
                return TaskList.filterOverdue(tasks);
            case 'completed':
                return TaskList.filterCompleted(tasks);
            default:
                return TaskList.filterActive(tasks);
        }
    }

    /**
     * Apply filters
     */
    applyFilters(tasks) {
        let filtered = tasks;

        if (this.currentFilters.search) {
            filtered = TaskList.search(filtered, this.currentFilters.search);
        }

        if (this.currentFilters.priority) {
            filtered = TaskList.filterByPriority(filtered, this.currentFilters.priority);
        }

        if (this.currentFilters.status) {
            filtered = TaskList.filterByStatus(filtered, this.currentFilters.status);
        }

        if (this.currentFilters.category) {
            filtered = TaskList.filterByCategory(filtered, this.currentFilters.category);
        }

        return filtered;
    }

    /**
     * Apply sort
     */
    applySort(tasks) {
        const isAsc = this.currentSort.order === 'asc';

        switch (this.currentSort.by) {
            case 'deadline':
                return TaskList.sortByDeadline(tasks, isAsc);
            case 'priority':
                return TaskList.sortByPriority(tasks, !isAsc);
            case 'created':
                return TaskList.sortByCreatedDate(tasks, isAsc);
            case 'updated':
                return TaskList.sortByUpdatedDate(tasks, isAsc);
            case 'title':
                return TaskList.sortByTitle(tasks, isAsc);
            default:
                return tasks;
        }
    }

    /**
     * Render tasks
     */
    renderTasks(tasks) {
        if (tasks.length === 0) {
            this.tasksList.innerHTML = '';
            this.emptyState.style.display = 'block';
            return;
        }

        this.emptyState.style.display = 'none';

        this.tasksList.innerHTML = tasks.map(task => this.createTaskCard(task)).join('');

        // Add event listeners to task cards
        this.attachTaskEventListeners();
    }

    /**
     * Create task card HTML
     */
    createTaskCard(task) {
        const isCompleted = task.status === TaskStatus.COMPLETED;
        const isOverdue = task.isOverdue();
        const deadlineText = task.deadline ? this.formatDeadline(task) : '';

        return `
            <div class="task-card ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}"
                 data-task-id="${task.id}"
                 draggable="true">
                <div class="task-card-header">
                    <div class="task-checkbox ${isCompleted ? 'checked' : ''}"
                         data-action="toggle"
                         data-task-id="${task.id}">
                    </div>
                    <div class="task-content">
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                        ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                        <div class="task-meta">
                            <span class="task-badge task-priority priority-${task.priority}">
                                ${task.getPriorityLabel()}
                            </span>
                            ${task.deadline ? `
                                <span class="task-deadline ${isOverdue ? 'overdue' : ''}">
                                    📅 ${deadlineText}
                                </span>
                            ` : ''}
                            <span class="task-category">
                                📁 ${this.escapeHtml(task.category)}
                            </span>
                            ${task.tags.length > 0 ? `
                                <div class="task-tags">
                                    ${task.tags.map(tag => `<span class="task-tag">${this.escapeHtml(tag)}</span>`).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-action-btn" data-action="edit" data-task-id="${task.id}" title="Edit">
                            ✏️
                        </button>
                        <button class="task-action-btn" data-action="delete" data-task-id="${task.id}" title="Delete">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Format deadline text
     */
    formatDeadline(task) {
        const deadline = new Date(task.deadline);
        const remaining = task.getRemainingTime();

        if (remaining.overdue) {
            return 'Overdue';
        }

        if (task.isDueToday()) {
            return `Today at ${deadline.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
        }

        if (remaining.days === 0) {
            return `${remaining.hours}h ${remaining.minutes}m`;
        }

        return deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    /**
     * Attach event listeners to task cards
     */
    attachTaskEventListeners() {
        // Toggle completion
        document.querySelectorAll('[data-action="toggle"]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTaskCompletion(el.dataset.taskId);
            });
        });

        // Edit task
        document.querySelectorAll('[data-action="edit"]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editTask(el.dataset.taskId);
            });
        });

        // Delete task
        document.querySelectorAll('[data-action="delete"]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTask(el.dataset.taskId);
            });
        });

        // Drag and drop
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('dragstart', (e) => this.handleDragStart(e));
            card.addEventListener('dragover', (e) => this.handleDragOver(e));
            card.addEventListener('drop', (e) => this.handleDrop(e));
            card.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });
    }

    /**
     * Toggle task completion
     */
    async toggleTaskCompletion(taskId) {
        try {
            const task = await this.dbService.getTask(taskId);
            if (task) {
                if (task.status === TaskStatus.COMPLETED) {
                    task.uncomplete();
                } else {
                    task.complete();
                }
                await this.dbService.updateTask(task);
                appEvents.emit(AppEvents.TASK_UPDATED, task);
                this.showToast('Task updated', 'success');
            }
        } catch (error) {
            console.error('Failed to toggle task:', error);
            this.showToast('Failed to update task', 'error');
        }
    }

    /**
     * Edit task
     */
    async editTask(taskId) {
        try {
            const task = await this.dbService.getTask(taskId);
            if (task) {
                this.editingTaskId = taskId;
                this.populateTaskForm(task);
                this.openTaskModal('Edit Task');
            }
        } catch (error) {
            console.error('Failed to load task:', error);
            this.showToast('Failed to load task', 'error');
        }
    }

    /**
     * Delete task
     */
    async deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await this.dbService.deleteTask(taskId);
            appEvents.emit(AppEvents.TASK_DELETED, taskId);
            this.showToast('Task deleted', 'success');
        } catch (error) {
            console.error('Failed to delete task:', error);
            this.showToast('Failed to delete task', 'error');
        }
    }

    /**
     * Open task modal
     */
    openTaskModal(title = 'Add Task') {
        document.getElementById('taskModalTitle').textContent = title;
        this.taskModal.classList.add('active');
        this.populateCategoryDropdown();
    }

    /**
     * Close modal
     */
    closeModal() {
        this.taskModal.classList.remove('active');
        this.taskForm.reset();
        this.editingTaskId = null;
    }

    /**
     * Populate task form with task data
     */
    populateTaskForm(task) {
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskStatus').value = task.status;
        document.getElementById('taskTags').value = task.tags.join(', ');

        if (task.deadline) {
            const date = new Date(task.deadline);
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            document.getElementById('taskDeadline').value = localDate.toISOString().slice(0, 16);
        }
    }

    /**
     * Populate category dropdown
     */
    async populateCategoryDropdown() {
        try {
            const categories = await this.dbService.getAllCategories();
            const categorySelect = document.getElementById('taskCategory');

            categorySelect.innerHTML = categories.map(cat =>
                `<option value="${cat.name}">${cat.icon} ${cat.name}</option>`
            ).join('');
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    }

    /**
     * Handle task form submission
     */
    async handleTaskSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.taskForm);
        const tags = formData.get('tags').split(',').map(t => t.trim()).filter(t => t);

        const taskData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            priority: formData.get('priority'),
            status: formData.get('status'),
            deadline: formData.get('deadline') || null,
            tags
        };

        try {
            if (this.editingTaskId) {
                // Update existing task
                const task = await this.dbService.getTask(this.editingTaskId);
                Object.assign(task, taskData);
                task.touch();
                await this.dbService.updateTask(task);
                appEvents.emit(AppEvents.TASK_UPDATED, task);
                this.showToast('Task updated', 'success');
            } else {
                // Create new task
                const task = new Task(taskData);
                task.validate();
                await this.dbService.addTask(task);
                appEvents.emit(AppEvents.TASK_CREATED, task);
                this.showToast('Task created', 'success');
            }

            this.closeModal();
        } catch (error) {
            console.error('Failed to save task:', error);
            this.showToast(error.message || 'Failed to save task', 'error');
        }
    }

    /**
     * Update counts
     */
    async updateCounts() {
        try {
            const allTasks = await this.dbService.getAllTasks();
            const stats = TaskList.getStatistics(allTasks);

            document.getElementById('countAll').textContent = TaskList.filterActive(allTasks).length;
            document.getElementById('countToday').textContent = stats.dueToday;
            document.getElementById('countUpcoming').textContent = stats.dueSoon;
            document.getElementById('countOverdue').textContent = stats.overdue;
            document.getElementById('countCompleted').textContent = stats.completed;
        } catch (error) {
            console.error('Failed to update counts:', error);
        }
    }

    /**
     * Update sync status
     */
    updateSyncStatus(isOnline, status = 'synced') {
        const statusDot = this.syncStatus.querySelector('.status-dot');
        const statusText = this.syncStatus.querySelector('.status-text');

        statusDot.className = `status-dot ${isOnline ? status : 'offline'}`;

        if (!isOnline) {
            statusText.textContent = 'Offline';
        } else if (status === 'syncing') {
            statusText.textContent = 'Syncing...';
        } else {
            statusText.textContent = 'Synced';
        }
    }

    /**
     * Toggle theme
     */
    toggleTheme() {
        const currentTheme = this.settingsService.getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.settingsService.setTheme(newTheme);
        this.themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
        appEvents.emit(AppEvents.THEME_CHANGED, newTheme);
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        this.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.loadingState.style.display = 'block';
        this.tasksList.style.display = 'none';
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        this.loadingState.style.display = 'none';
        this.tasksList.style.display = 'block';
    }

    /**
     * Export tasks
     */
    async exportTasks() {
        try {
            const tasks = await this.dbService.getAllTasks();
            const data = JSON.stringify(tasks.map(t => t.toJSON()), null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tasks-export-${new Date().toISOString()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            this.showToast('Tasks exported', 'success');
        } catch (error) {
            console.error('Failed to export tasks:', error);
            this.showToast('Failed to export tasks', 'error');
        }
    }

    /**
     * Import tasks
     */
    async importTasks(e) {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const tasksData = JSON.parse(text);

            for (const taskData of tasksData) {
                const task = Task.fromJSON(taskData);
                await this.dbService.addTask(task);
            }

            this.showToast(`Imported ${tasksData.length} tasks`, 'success');
            this.refreshTasks();
        } catch (error) {
            console.error('Failed to import tasks:', error);
            this.showToast('Failed to import tasks', 'error');
        }
    }

    /**
     * Drag and drop handlers
     */
    handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
        e.dataTransfer.setData('taskId', e.target.dataset.taskId);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const card = e.target.closest('.task-card');
        if (card && !card.classList.contains('dragging')) {
            card.classList.add('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        const draggedTaskId = e.dataTransfer.getData('taskId');
        const targetCard = e.target.closest('.task-card');

        if (targetCard && draggedTaskId !== targetCard.dataset.taskId) {
            // Implement reordering logic here
            appEvents.emit(AppEvents.TASK_REORDERED, { draggedTaskId, targetId: targetCard.dataset.taskId });
        }

        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Initialize UI
     */
    async initialize() {
        // Apply saved theme
        const theme = this.settingsService.getTheme();
        this.settingsService.applyTheme(theme);
        this.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';

        // Apply saved sidebar state
        const sidebarOpen = this.settingsService.isSidebarOpen();
        if (!sidebarOpen) {
            this.sidebar.classList.add('closed');
        }

        // Load categories
        await this.loadCategories();

        // Load initial tasks
        await this.refreshTasks();
    }

    /**
     * Load categories
     */
    async loadCategories() {
        try {
            const categories = await this.dbService.getAllCategories();

            this.categoryList.innerHTML = categories.map(cat => `
                <li>
                    <button class="nav-item" data-category="${cat.name}">
                        <span class="nav-icon">${cat.icon}</span>
                        <span class="nav-text">${cat.name}</span>
                    </button>
                </li>
            `).join('');

            // Add event listeners
            this.categoryList.querySelectorAll('[data-category]').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.currentFilters.category = btn.dataset.category;
                    this.refreshTasks();
                });
            });
        } catch (error) {
            console.error('Failed to load categories:', error);
        }
    }
}
