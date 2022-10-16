const chalk = require("chalk");
const inquirer = require("inquirer");
const shell = require("shelljs");

const getAllPluginsName = require("./utils/get-all-plugins");

const del = async () => {
  const plugins = getAllPluginsName();

  if (plugins.length === 0) {
    console.log(chalk.redBright("No plugins to delete!"));
    return;
  }

  const { name } = await inquirer.prompt([
    {
      type: "list",
      name: "name",
      message: "What plugin want delete?",
      choices: plugins,
    },
  ]);

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Really want delete plugin ${name}?`,
      default: false,
    },
  ]);

  if (confirm) {
    shell.rm("-rf", `../${name}`);
    console.log(chalk.green("Done."));
  }
};

module.exports = del;
