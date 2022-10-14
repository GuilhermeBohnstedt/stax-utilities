const create = require("./create");
const del = require("./delete");
const update = require("./update");
const install = require("./install");
const uninstall = require("./uninstall");

const actions = {
  create,
  update,
  delete: del,
  install,
  uninstall,
};

module.exports = actions;
