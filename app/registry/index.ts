import fs from "fs";
import logger from "electron-log";
import "../../plugins/installed/installed-lock.json";

interface PluginConfiguration {
  name: string;
  path: string;
  version: string;
}

interface InstalledLock {
  version: string;
  path: string;
}

class PluginRegistry {
  private registry: PluginConfiguration[] = [];

  constructor(pluginPath: string) {
    this.createRegistry(pluginPath);
  }

  private async createRegistry(path: string) {
    try {
      const data = fs.readFileSync(`${path}/installed/installed-lock.json`, {
        encoding: "utf8",
      });

      this.registry = Object.entries<InstalledLock>(
        JSON.parse(data)
      ).map(([key, value]) => {
        return {
          name: key,
          path: value.path,
          version: value.version,
        };
      });

      logger.info("Found installed plugins:");
      logger.info(this.registry);
    } catch (error) {
      logger.error(error.message);
    }
  }

  getPluginConfig(name: string): PluginConfiguration | undefined {
    return this.registry.find((pl) => pl.name === name);
  }

  getAllPlugins(): PluginConfiguration[] {
    return this.registry;
  }
}

export default PluginRegistry;
