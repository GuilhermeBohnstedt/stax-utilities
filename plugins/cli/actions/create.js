const shell = require("shelljs");
const getPluginName = require("./utils/plugin-name");

const create = async () => {
  const { name } = await getPluginName();

  shell.cd("plugins");
  shell.exec(`npm create vite@latest ${name} -- --template svelte`);
};

module.exports = create;
