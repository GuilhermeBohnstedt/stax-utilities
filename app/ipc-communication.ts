import { ipcMain } from "electron";

import getPackages from "./utils/get-packages.js";

const initIPCCommunication = (isDev: boolean) => {
  ipcMain.handle("packages", () => {
    return getPackages();
  });
};

export default initIPCCommunication;
