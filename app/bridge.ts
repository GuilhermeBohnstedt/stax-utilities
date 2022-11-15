import { ipcMain, nativeTheme } from "electron";
import logger from "electron-log";


import PluginRegistry from "./registry/index.js";
import getPackages from "./utils/get-packages.js";
import db from './database';

const bridge = (registry: PluginRegistry) => {
  ipcMain.handle("packages:get", () => {
    return getPackages();
  });

  ipcMain.handle("plugins:get", () => {
    try {
      return {
        data: registry.getAllPlugins(),
      };
    } catch (e) {
      return { error: e.message };
    }
  });

  ipcMain.handle(
    "theme:change",
    (_event, theme: typeof nativeTheme.themeSource) => {
      nativeTheme.themeSource = theme;

      return nativeTheme.shouldUseDarkColors;
    }
  );

  ipcMain.handle("read:database", () => {
    db.serialize(() => {
      db.run("CREATE TABLE lorem (info TEXT)");
    
      const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
      for (let i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i);
      }
      stmt.finalize();
    
      db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
          logger.info(row.id + ": " + row.info);
      });
    });
  })
};

export default bridge;
