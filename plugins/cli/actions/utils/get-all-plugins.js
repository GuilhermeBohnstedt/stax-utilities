import shell from "shelljs";
import { isPluginName } from "./plugin-name.js";

const getAllPluginsName = () => {
  return shell
    .ls("-l", "../")
    .map((folder) => folder.name)
    .filter((plg) => isPluginName(plg));
};

export default getAllPluginsName;
