export function WorkSpace(name) {
  this.workSpaces = [];
}

WorkSpace.prototype.totalWorkSpaceCount = function () {
  return this.workSpaces?.length;
};

WorkSpace.prototype.createWorkSpace = function (name, description) {
  const newObj = {
    id: Date.now(),
    name,
    description,
    tasks: [],
  };
  this.workSpaces.push(newObj);
  return newObj;
};
