import { ipcMain, nativeTheme } from "electron";
import PluginRegistry from "./registry/index.js";

import getPackages from "./utils/get-packages.js";

const bridge = (registry: PluginRegistry) => {
  ipcMain.handle("get:packages", () => {
    return getPackages();
  });

  ipcMain.handle("get:plugins", () => {
    try {
      return {
        data: registry.getAllPlugins(),
      };
    } catch (e) {
      return { error: e.message };
    }
  });

  ipcMain.handle(
    "theme:change",
    (_event, theme: typeof nativeTheme.themeSource) => {
      nativeTheme.themeSource = theme;

      return nativeTheme.shouldUseDarkColors;
    }
  );
};

export default bridge;
