interface PluginConfiguration {
  name: string;
}

class PluginRegistry {
  private registry: PluginConfiguration[] = [];

  constructor(pluginPath: string) {
    this.createRegistry(pluginPath);
  }

  private createRegistry(path: string) {
    console.log(`Plugin Path: ${path}`);
  }

  getPluginConfig(name: string): PluginConfiguration | undefined {
    return this.registry.find((pl) => pl.name === name);
  }
}

export default PluginRegistry;
