import inquirer from "inquirer";
import actions from "./actions/index.js";

console.log("Stax Plugins");

const questions = [
  {
    type: "list",
    name: "action",
    message: "Select action",
    choices: ["create", "update", "delete", "install", "uninstall"],
    filter(val) {
      return val.toLowerCase();
    },
  },
];

inquirer.prompt(questions).then(async ({ action }) => {
  await actions[action]();
});
