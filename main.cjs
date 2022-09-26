const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const initIPCCommunication = require("./app/ipc-communication.cjs");

const isDev = process.env.NODE_ENV ? process.env.NODE_ENV === "develop" : false;

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "app/preload.js"),
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173/");
  } else {
    win.loadFile("index.html");
  }
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

initIPCCommunication(isDev);
