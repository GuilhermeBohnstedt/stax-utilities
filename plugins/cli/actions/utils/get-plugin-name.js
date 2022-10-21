import inquirer from "inquirer";

const getPluginName = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: `Enter plugin name:`,
    },
  ]);
};

export default getPluginName;
