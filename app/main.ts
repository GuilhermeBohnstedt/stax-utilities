import { app, BrowserWindow } from "electron";
import path from "path";
import initIPCCommunication from "./ipc-communication";
import PluginRegistry from "./registry";
import getPluginsPath from "./utils/get-plugins-path";

let win: BrowserWindow;
let registry: PluginRegistry;

const createWindow = () => {
  registry = new PluginRegistry(getPluginsPath());

  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }

  registry.getPluginConfig("");

  initIPCCommunication(registry);
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
