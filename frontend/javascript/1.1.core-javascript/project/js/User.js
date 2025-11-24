// Constructor function for User (demonstrates 'new' binding)
export function User(name, role) {
  this.userName = name;
  this.role = role;
  this.isLoggedIn = false;
}

User.prototype.login = function () {
  this.isLoggedIn = true;
};

User.prototype.logout = function () {
  this.isLoggedIn = false;
};

User.prototype.getCurrentUser = function () {
  if (!this.isLoggedIn) {
    return "No Active User";
  }
  return this.userName;
};

const permissions = {
  Admin: ["deleteUser", "createUser", "viewDashboard"],
  Member: ["viewDashboard"],
  Viewer: ["readOnly"],
};

User.prototype.hasPermission = function (action) {
  const userRole = permissions[this.role] || "";
  return userRole.includes(action);
};
