import { ipcMain, nativeTheme } from "electron";

import getPackages from "./utils/get-packages.js";

const initIPCCommunication = () => {
  ipcMain.handle("get:packages", () => {
    return getPackages();
  });

  ipcMain.handle("theme:change", (_event, theme: typeof nativeTheme.themeSource) => {
    nativeTheme.themeSource = theme;

    return nativeTheme.shouldUseDarkColors;
  });
};

export default initIPCCommunication;
