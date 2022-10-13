import { ipcMain } from "electron";

import getPackages from "./utils/get-packages.js";

const initIPCCommunication = () => {
  ipcMain.handle("packages", () => {
    return getPackages();
  });
};

export default initIPCCommunication;
