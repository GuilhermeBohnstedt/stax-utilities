import create from "./create.js";
import del from "./delete.js";
import update from "./update.js";
import install from "./install.js";
import uninstall from "./uninstall.js";

const actions = {
  create,
  update,
  delete: del,
  install,
  uninstall,
};

export default actions;
