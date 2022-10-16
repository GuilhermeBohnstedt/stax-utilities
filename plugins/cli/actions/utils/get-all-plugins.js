const shell = require("shelljs");
const pn = require("./plugin-name");

const getAllPluginsName = () => {
  return shell.ls('-l', '../').map(folder => folder.name).filter((plg) => pn.isPluginName(plg));
};

module.exports = getAllPluginsName;
