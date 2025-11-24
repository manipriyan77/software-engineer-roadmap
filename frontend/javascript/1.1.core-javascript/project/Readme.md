Project: Task Manager with Team Workspaces
Build a browser-based task management system where multiple teams can create, assign, and track tasks with different permission levels.
Core Features to Implement:

1. Workspace System

Create multiple team workspaces (uses closures for private workspace data)
Each workspace maintains its own task list and member list
Workspace factory function that returns methods with closure over private state

2. User Authentication & Context

User login system demonstrating this binding in different contexts
User object with methods that properly bind this (login, logout, getCurrentUser)
Role-based permissions (Admin, Member, Viewer) using this context

3. Task Management

Create tasks with: title, description, assignee, priority, status
Task filtering by status/priority (demonstrates scope and closures)
Task counter using closure to maintain private count
Each task method properly manages this context when updating

4. Event System

Custom event handlers for task creation/update/deletion
Event handlers that demonstrate this binding issues and solutions
Use bind(), call(), apply() to fix context in callbacks

5. Theme Toggle & Settings

Settings object using closure to maintain private preferences
Theme switcher with proper this binding in event handlers
Demonstrates arrow functions vs regular functions for event listeners

Technical Requirements:

No classes - use constructor functions, factory functions, and object literals only
Mix var, let, const appropriately to demonstrate scope differences
Create at least 3 closures with practical purposes (module pattern, private variables, counters)
Demonstrate hoisting with at least 2 examples that would break if reordered
Show Temporal Dead Zone with let/const
Use all binding methods: implicit, explicit (call, apply, bind), new, arrow functions
Include inline comments explaining scope chain and execution context at key points

This single project forces you to apply every concept multiple times in realistic scenarios while building something functional.
