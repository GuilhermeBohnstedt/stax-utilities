import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  get: (channel: string) => ipcRenderer.invoke(channel),
});

window.addEventListener("DOMContentLoaded", () => {});
