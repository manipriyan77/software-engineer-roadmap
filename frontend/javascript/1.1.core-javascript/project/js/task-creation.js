export function Task() {}

Task.prototype.createTask = function (
  title,
  description,
  assignee,
  priority,
  status,
  workSpace
) {
  let newTask = {
    id: Date.now(),
    title,
    description,
    assignee,
    priority,
    status,
    createdAt: new Date().toISOString(),
  };
  workSpace.tasks.push(newTask);
  return newTask;
};
