const prefixName = "stax-plugin-";

const generatePluginName = (name) => `${prefixName}${name}`.toLowerCase();

const isPluginName = (name) => String(name).includes(prefixName);

export { generatePluginName, isPluginName };
