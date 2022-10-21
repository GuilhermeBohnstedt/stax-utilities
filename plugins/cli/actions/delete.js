import chalk from "chalk";
import inquirer from "inquirer";
import shell from "shelljs";

import getAllPluginsName from "./utils/get-all-plugins.js";

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

export default del;
