const fs = require("fs-extra");
const path = require("path");

module.exports = {
  packagerConfig: {
    ignore: (file) => {
      if (!file) return false;

      const isBuildFolder = file.includes("/dist");
      const isPackageJson = file.includes("/package.json");

      if (isPackageJson || isBuildFolder) {
        return false;
      }

      return true;
    },
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "stax_utilities",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  hooks: {
    packageAfterCopy: async (forgeConfig, buildPath) => {
      const pj = await fs.readJson(path.resolve(__dirname, "package.json"));

      pj.main = "dist/electron/main.js";
      pj.devDependencies = {};
      pj.dependencies = {};

      await fs.writeJson(path.resolve(buildPath, "package.json"), pj, {
        spaces: 2,
      });

      await fs.mkdirp(path.resolve(buildPath, "node_modules"));
    },
  },
};
