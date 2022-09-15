const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV ? process.env.NODE_ENV === "develop" : false;

console.log("variavel de ambiente: " + JSON.stringify(process.env))

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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
