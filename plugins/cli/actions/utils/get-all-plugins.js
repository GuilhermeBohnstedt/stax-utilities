const shell = require("shelljs");
const fs = require("fs");

const getAllPluginsName = () => {
  return shell.ls('-l', './plugins').map(folder => folder.name).filter((plg) => plg !== "cli");
};

module.exports = getAllPluginsName;
