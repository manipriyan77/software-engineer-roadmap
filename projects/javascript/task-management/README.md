# Task Management App with Real-time Sync

A comprehensive, modern task management application built with vanilla JavaScript featuring offline support, real-time synchronization, and a beautiful responsive UI.

## Features

### Core Functionality
- **Task Management**: Create, read, update, and delete tasks with rich metadata
- **Categories**: Organize tasks into customizable categories with colors and icons
- **Priority Levels**: Four priority levels (Low, Medium, High, Urgent)
- **Status Tracking**: Track tasks through different states (To Do, In Progress, Completed, Archived)
- **Deadlines**: Set and track task deadlines with overdue notifications
- **Tags**: Add multiple tags to tasks for better organization
- **Search & Filter**: Powerful search and filtering capabilities
- **Sorting**: Sort tasks by multiple criteria (deadline, priority, date, title)

### Advanced Features
- **Offline Support**: Full functionality works offline using IndexedDB
- **Real-time Sync**: Synchronize tasks across devices (WebSocket support)
- **Conflict Resolution**: Automatic conflict resolution using version control
- **Drag & Drop**: Reorder tasks with intuitive drag and drop
- **Import/Export**: Backup and restore your tasks in JSON format
- **Dark Mode**: Beautiful dark theme with automatic switching
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Notifications**: Browser notifications for upcoming deadlines
- **Progressive Enhancement**: Works even when JavaScript features are unsupported

## Project Structure

```
task-management/
├── index.html                          # Main HTML file
├── styles/
│   └── main.css                        # All styles with CSS variables
├── src/
│   ├── app.js                          # Application entry point
│   ├── models/
│   │   ├── Entity.js                   # Base entity class
│   │   ├── Task.js                     # Task model with business logic
│   │   ├── Category.js                 # Category model
│   │   └── TaskList.js                 # Task collection management
│   ├── services/
│   │   ├── IndexedDBService.js         # IndexedDB operations
│   │   ├── SyncQueueService.js         # Offline sync queue
│   │   ├── SettingsService.js          # User preferences (LocalStorage)
│   │   ├── APIService.js               # HTTP API client
│   │   └── WebSocketService.js         # Real-time WebSocket connection
│   ├── controllers/
│   │   ├── SyncController.js           # Sync orchestration
│   │   └── UIController.js             # DOM manipulation & UI logic
│   └── utils/
│       └── EventEmitter.js             # Custom event system
└── README.md
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for development)
- Optional: Node.js (for running a development server)

### Installation

1. **Clone or download this project**

2. **Serve the files using a local web server**

   Using Python:
   ```bash
   cd task-management
   python -m http.server 8000
   ```

   Using Node.js (http-server):
   ```bash
   npm install -g http-server
   cd task-management
   http-server -p 8000
   ```

   Using VS Code Live Server:
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

3. **Open your browser and navigate to**
   ```
   http://localhost:8000
   ```

### First Run
On first run, the application will:
- Initialize IndexedDB database
- Create default categories
- Set up default settings
- Request notification permissions (optional)

## Architecture

### Data Models

#### Entity (Base Class)
- Common properties: `id`, `createdAt`, `updatedAt`, `version`
- Methods: `validate()`, `toJSON()`, `fromJSON()`, `clone()`

#### Task
Properties:
- `title`: Task name (required, max 200 chars)
- `description`: Detailed description (max 2000 chars)
- `category`: Category name
- `priority`: low | medium | high | urgent
- `status`: todo | in_progress | completed | archived
- `deadline`: ISO date string
- `tags`: Array of strings
- `order`: Number (for drag-and-drop)

Methods:
- `updatePriority()`, `updateStatus()`, `updateDeadline()`
- `complete()`, `uncomplete()`, `archive()`
- `isOverdue()`, `isDueToday()`, `isDueSoon()`
- `addTag()`, `removeTag()`, `hasTag()`

#### Category
Properties:
- `name`: Category name (required, max 50 chars)
- `color`: Hex color code
- `icon`: Emoji icon
- `description`: Category description

### Services Layer

#### IndexedDBService
Handles all database operations:
- CRUD operations for tasks and categories
- Indexed queries for efficient filtering
- Transaction management
- Error handling

Object Stores:
- `tasks`: Main task storage with indexes on category, priority, status, deadline
- `categories`: Category storage
- `settings`: Application settings
- `syncQueue`: Pending sync operations

#### SyncQueueService
Manages offline operations:
- Queues operations when offline
- Processes queue when online
- Retry logic with exponential backoff
- Conflict resolution support

#### SettingsService
Manages user preferences:
- Theme (light/dark/auto)
- View preferences
- Sort/filter defaults
- Notification settings
- Sync settings

#### APIService
HTTP client for backend communication:
- RESTful API calls
- Retry logic with exponential backoff
- Request/response interceptors
- Error handling

#### WebSocketService
Real-time updates:
- WebSocket connection management
- Automatic reconnection
- Heartbeat/ping-pong
- Message queue
- Event broadcasting

### Controllers

#### SyncController
Orchestrates synchronization:
- Pull updates from server
- Push local changes
- Conflict resolution (last-write-wins)
- Auto-sync timer
- Online/offline handling

#### UIController
Manages all UI interactions:
- DOM manipulation
- Event handling
- Task rendering
- Modal management
- Toast notifications
- Drag and drop
- Import/export

### Event System

Custom EventEmitter for loose coupling:

Events:
- `task:created`, `task:updated`, `task:deleted`
- `category:created`, `category:updated`, `category:deleted`
- `sync:started`, `sync:completed`, `sync:failed`
- `network:online`, `network:offline`
- `ui:view-changed`, `ui:filter-changed`, `ui:search-changed`

## Features Deep Dive

### Offline Support

The app works completely offline using:
1. **IndexedDB** for data storage
2. **Sync Queue** to track pending operations
3. **Online/Offline detection** to adapt behavior
4. **Automatic sync** when connection is restored

### Real-time Sync

Sync strategy:
1. **Incremental sync**: Only sync changed items
2. **Conflict resolution**: Version-based with timestamp fallback
3. **Optimistic updates**: Update UI immediately, sync in background
4. **Queue processing**: Batch operations for efficiency

### Search and Filtering

Search across:
- Task titles
- Descriptions
- Tags

Filters:
- By category
- By priority
- By status
- By date range
- Combined filters

### Import/Export

Export format:
```json
{
  "version": "1.0.0",
  "exportDate": "2025-01-01T00:00:00.000Z",
  "tasks": [...],
  "categories": [...],
  "settings": {...}
}
```

## API Integration

To connect to a backend server:

1. **Configure API endpoint**:
   ```javascript
   // In src/services/APIService.js
   const apiService = new APIService('https://your-api.com/api');
   ```

2. **Implement backend endpoints**:
   ```
   GET    /api/tasks              - Get all tasks
   GET    /api/tasks?since=...    - Get tasks since timestamp
   POST   /api/tasks              - Create task
   PUT    /api/tasks/:id          - Update task
   DELETE /api/tasks/:id          - Delete task
   POST   /api/tasks/batch        - Batch operations

   GET    /api/categories         - Get all categories
   POST   /api/categories         - Create category
   PUT    /api/categories/:id     - Update category
   DELETE /api/categories/:id     - Delete category
   ```

3. **WebSocket integration**:
   ```javascript
   // In src/services/WebSocketService.js
   const wsService = new WebSocketService('wss://your-api.com');
   ```

   WebSocket message format:
   ```json
   {
     "type": "task:created" | "task:updated" | "task:deleted",
     "data": { ...taskData }
   }
   ```

## Customization

### Adding Custom Categories

```javascript
// Default categories can be modified in src/models/Category.js
static get DEFAULTS() {
    return [
        { name: 'custom', color: '#FF5733', icon: '⭐', description: 'Custom category' },
        // ... more categories
    ];
}
```

### Changing Theme Colors

```css
/* In styles/main.css, modify CSS variables */
:root {
    --color-primary: #2563eb;
    --color-success: #10b981;
    /* ... more colors */
}
```

### Modifying Sync Interval

```javascript
// In src/services/SettingsService.js
export const DefaultSettings = {
    // ...
    syncInterval: 30000, // 30 seconds (in milliseconds)
    // ...
};
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14+)
- Opera: Full support

Required browser features:
- ES6+ (Classes, Modules, Arrow Functions)
- IndexedDB API
- LocalStorage API
- Fetch API
- WebSocket API (optional)
- Notification API (optional)

## Performance Considerations

### Optimization Techniques
1. **Lazy loading**: Load categories and archived tasks on demand
2. **Virtual scrolling**: For large task lists (implement if needed)
3. **Debouncing**: Search input debounced to 300ms
4. **Pagination**: Built-in pagination support in TaskList class
5. **Indexed queries**: IndexedDB indexes for fast filtering

### Storage Limits
- IndexedDB: ~50MB minimum (browser-dependent)
- LocalStorage: ~5-10MB (for settings only)

Check storage usage:
```javascript
const stats = await taskManagerApp.getStatistics();
console.log(stats.storage);
```

## Security Considerations

1. **XSS Prevention**: All user input is escaped before rendering
2. **CSRF Protection**: Implement CSRF tokens if connecting to backend
3. **Authentication**: Add JWT/OAuth if multi-user support needed
4. **Data Validation**: All inputs validated on client and server
5. **HTTPS**: Use HTTPS in production for API and WebSocket

## Development

### Debug Mode

Access the app instance in console:
```javascript
// Available in browser console
window.taskManagerApp.getStatistics()
window.taskManagerApp.getSyncStatus()
window.taskManagerApp.syncNow()
window.taskManagerApp.exportAllData()
```

### Adding New Features

1. **New Task Property**:
   - Update `Task` class in `src/models/Task.js`
   - Update form in `index.html`
   - Update render logic in `src/controllers/UIController.js`

2. **New Filter**:
   - Add filter UI in `index.html`
   - Add static filter method to `TaskList` class
   - Update `applyFilters()` in `UIController`

3. **New View**:
   - Add view button in sidebar
   - Add filter logic in `applyViewFilter()`
   - Update view titles mapping

## Troubleshooting

### Tasks not saving
- Check browser console for errors
- Verify IndexedDB is enabled in browser
- Check storage quota

### Sync not working
- Verify API endpoint configuration
- Check network connection
- Review sync queue status
- Check browser console for error messages

### Performance issues
- Clear old data: Settings > Clear Data
- Export tasks, reset app, re-import
- Check number of tasks (consider pagination for >1000 tasks)

### Styling issues
- Clear browser cache
- Check for CSS conflicts
- Verify CSS variables are supported

## Future Enhancements

Potential features to add:
- [ ] Subtasks/Checklist support
- [ ] Task recurrence (daily, weekly, monthly)
- [ ] Time tracking
- [ ] File attachments
- [ ] Collaboration features
- [ ] Calendar view
- [ ] Kanban board view
- [ ] Task templates
- [ ] Bulk operations
- [ ] Advanced statistics and charts
- [ ] Email reminders
- [ ] Integration with calendar apps
- [ ] Voice input
- [ ] Keyboard shortcuts

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Areas for improvement:
- Additional tests
- Accessibility enhancements
- Performance optimizations
- New features
- Bug fixes
- Documentation improvements

## Credits

Built with vanilla JavaScript, HTML5, and CSS3. No frameworks required!

## Support

For issues and questions:
1. Check this README
2. Review browser console for errors
3. Check browser compatibility
4. Verify all files are properly served

---

**Happy Task Managing!** 🎯
