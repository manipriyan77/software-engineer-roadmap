import { Task } from "./task-creation.js";
import { User } from "./User.js";
import { WorkSpace } from "./work-space.js";

const loginForm = document.getElementById("login-form");
const workSpaceModal = document.getElementById("workspace-modal");
const createWorkSpaceBtn = document.getElementById("create-workspace-btn");
const addTaskBtn = document.getElementById("add-task-btn");
const taskModal = document.getElementById("task-modal");
const workspaceForm = document.getElementById("workspace-form");
const workspaceList = document.getElementById("workspace-list");
const themeToggleBtn = document.getElementById("theme-toggle");
const taskForm = document.getElementById("task-form");

let currentWorkSpace = null;
let currentUser = null;
let workspaceManager = new WorkSpace();
const task = new Task();

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usernameInput = document.getElementById("username");
  const roleInput = document.getElementById("role");

  const username = usernameInput.value.trim();
  const role = roleInput.value;

  currentUser = new User(username, role);

  currentUser.login();

  document.getElementById("login-screen").classList.remove("active");
  document.getElementById("app-screen").classList.add("active");

  const userInfoElement = document.getElementById("current-user");
  userInfoElement.textContent = `${currentUser.userName} (${currentUser.role})`;

  usernameInput.value = "";
  roleInput.selectedIndex = 0;
});

createWorkSpaceBtn.addEventListener("click", function (event) {
  workSpaceModal.classList.add("active");
});

// Handle logout button
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", function () {
  if (currentUser) {
    currentUser.logout();
    document.getElementById("app-screen").classList.remove("active");
    document.getElementById("login-screen").classList.add("active");

    currentUser = null;
  }
});

document.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("modal-close") ||
    event.target.classList.contains("modal-cancel")
  ) {
    const modal = event.target.closest(".modal");
    if (modal) {
      modal.classList.remove("active");
    }
  }
});

addTaskBtn.addEventListener("click", function (event) {
  taskModal.classList.add("active");
});

// Function to create workspace HTML element
function createWorkspaceElement(workspace) {
  const workspaceDiv = document.createElement("div");
  workspaceDiv.className = "workspace-item";
  workspaceDiv.dataset.workspaceId = workspace.id;

  workspaceDiv.innerHTML = `
    <div class="workspace-item-header">
      <h4>${workspace.name}</h4>
      <span class="workspace-task-count">${workspace.tasks.length} tasks</span>
    </div>
    <p class="workspace-description">
      ${workspace.description}
    </p>
  `;

  // Add click event to select this workspace as active
  workspaceDiv.addEventListener("click", function () {
    // Remove active class from all workspaces
    document.querySelectorAll(".workspace-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to clicked workspace
    workspaceDiv.classList.add("active");

    // Set as current workspace
    currentWorkSpace = workspace;
    console.log("Active workspace:", currentWorkSpace);
  });

  return workspaceDiv;
}

// Handle workspace form submission
workspaceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("workspace-name-input");
  const descriptionInput = document.getElementById("workspace-description");

  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (name) {
    const newWorkspace = workspaceManager.createWorkSpace(name, description);
    const workspaceElement = createWorkspaceElement(newWorkspace);
    workspaceList.appendChild(workspaceElement);

    // Set as active workspace if it's the first one
    if (workspaceManager.workSpaces.length === 1) {
      workspaceElement.classList.add("active");
      currentWorkSpace = newWorkspace;
    }

    addTaskBtn.disabled = false;
    nameInput.value = "";
    descriptionInput.value = "";
    workSpaceModal.classList.remove("active");
  }
});

themeToggleBtn.addEventListener("click", function () {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
});

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Check if a workspace is selected
  if (!currentWorkSpace) {
    alert("Please select a workspace first!");
    return;
  }

  const taskTitle = document.getElementById("task-title").value.trim();
  const taskDescription = document
    .getElementById("task-description")
    .value.trim();
  const taskAssigne = document.getElementById("task-assignee").value.trim();
  const taskPriority = document.getElementById("task-priority").value;
  const taskStatus = document.getElementById("task-status").value;

  // Create task in the active workspace
  task.createTask(
    taskTitle,
    taskDescription,
    taskAssigne,
    taskPriority,
    taskStatus,
    currentWorkSpace
  );

  console.log("Task added to workspace:", currentWorkSpace);

  // Clear form
  document.getElementById("task-title").value = "";
  document.getElementById("task-description").value = "";
  document.getElementById("task-assigne").value = "";

  // Close modal
  taskModal.classList.remove("active");

  // Update task count in UI
  const activeWorkspaceElement = document.querySelector(
    ".workspace-item.active"
  );
  if (activeWorkspaceElement) {
    const taskCountElement = activeWorkspaceElement.querySelector(
      ".workspace-task-count"
    );
    taskCountElement.textContent = `${currentWorkSpace.tasks.length} tasks`;
  }
});
