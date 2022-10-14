const shell = require("shelljs");
const fs = require("fs");

const getAllPluginsName = () => {
  return fs.readdirSync("./plugins").filter((plg) => plg !== "cli");
};

module.exports = getAllPluginsName;
