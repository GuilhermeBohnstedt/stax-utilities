const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const initIPCCommunication = (isDev) => {
  ipcMain.handle("packages", () => {
    try {
      const arrayOfFiles = fs.readdirSync(path.join(__dirname, "../packages"));
      return { data: arrayOfFiles };
    } catch (e) {
      return { error: e.message };
    }
  });
};

module.exports = initIPCCommunication;
