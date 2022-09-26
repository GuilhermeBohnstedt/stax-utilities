const { ipcMain } = require("electron");

const getPackages = require("./utils/get-packages.cjs");

const initIPCCommunication = (isDev) => {
  ipcMain.handle("packages", () => {
    return getPackages();
  });
};

module.exports = initIPCCommunication;
