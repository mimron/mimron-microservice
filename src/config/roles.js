const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers','getVehicles', 'manageVehicles']);
roleRights.set(roles[1], ['getUsers', 'manageUsers','getVehicles', 'manageVehicles']);

module.exports = {
  roles,
  roleRights,
};
