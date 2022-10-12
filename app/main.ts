import { app, BrowserWindow } from "electron";
import path from "path";
import initIPCCommunication from "./ipc-communication.js";

const isDev = process.env.NODE_ENV ? process.env.NODE_ENV === "develop" : false;

let win: BrowserWindow;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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
