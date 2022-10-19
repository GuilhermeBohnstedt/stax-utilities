import fs from "fs/promises";
import logger from "electron-log";

interface PluginConfiguration {
  name: string;
}

class PluginRegistry {
  private registry: PluginConfiguration[] = [];

  constructor(pluginPath: string) {
    this.createRegistry(pluginPath);
  }

  private async createRegistry(path: string) {
    try {
      const plugins = await fs.readdir(path);

      console.log(plugins);
    } catch (error) {
      logger.error(error.message);
    }
  }

  getPluginConfig(name: string): PluginConfiguration | undefined {
    return this.registry.find((pl) => pl.name === name);
  }
}

export default PluginRegistry;
