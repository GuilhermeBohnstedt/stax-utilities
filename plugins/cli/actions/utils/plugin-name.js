const prefixName = 'stax-plugin-'

const generatePluginName = (name) => `${prefixName}${name}`

const isPluginName = (name) => String(name).includes(prefixName);

module.exports = {
  generatePluginName,
  isPluginName
};
