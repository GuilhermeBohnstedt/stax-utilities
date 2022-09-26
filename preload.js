const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  get: (channel) => ipcRenderer.invoke(channel),
});

window.addEventListener("DOMContentLoaded", () => {});
