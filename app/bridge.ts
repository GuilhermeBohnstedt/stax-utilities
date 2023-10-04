import { ipcMain, nativeTheme } from "electron";
import logger from "./utils/logger";

import PluginRegistry from "./registry/index.js";
import getPackages from "./utils/get-packages.js";
import db from "./database";

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
    var doc = {
      _id: "mittens",
      name: "Mittens",
      occupation: "kitten",
      age: 3,
      hobbies: [
        "playing with balls of yarn",
        "chasing laser pointers",
        "lookin' hella cute",
      ],
    };
    db.put(doc)
      .then(() => {
        db.get("mittens").then(function (doc) {
          logger({ type: "info", title: "" });
        });
      })
      .catch((error) =>
        logger({
          type: "error",
          title: `${error.name} - ${error.message}`,
        })
      );
  });
};

export default bridge;
