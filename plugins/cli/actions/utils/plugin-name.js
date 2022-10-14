const inquirer = require("inquirer");

const getPluginName = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: `Enter plugin name:`,
    },
  ]);
};

module.exports = getPluginName;
