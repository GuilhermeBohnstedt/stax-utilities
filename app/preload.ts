import { contextBridge, ipcRenderer } from "electron";
import { ReadDatabaseOptions, WriteDatabaseOptions } from "../models";

contextBridge.exposeInMainWorld("packages", {
  get: () => ipcRenderer.invoke("get:packages"),
});

contextBridge.exposeInMainWorld("plugins", {
  get: () => ipcRenderer.invoke("get:plugins"),
});

contextBridge.exposeInMainWorld("theme", {
  change: (theme: "light" | "dark" | "system") =>
    ipcRenderer.invoke("theme:change", theme),
});

contextBridge.exposeInMainWorld("database", {
  read: (options: ReadDatabaseOptions) =>
    ipcRenderer.invoke("read:database", options),
  write: (options: WriteDatabaseOptions) =>
    ipcRenderer.invoke("read:database", options),
});

window.addEventListener("DOMContentLoaded", () => {
  const themeScript = document.createElement("script");
  themeScript.innerHTML = `
  if (window) {
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? window.document.documentElement.classList.add("dark")
      : window.document.documentElement.classList.remove("dark");
  }`;

  document.body.appendChild(themeScript);
});
