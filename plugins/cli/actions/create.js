const shell = require("shelljs");
const getPluginName = require("./utils/get-plugin-name");
const pn = require("./utils/plugin-name");

const viteConfig = (name) =>
  `
  import { defineConfig } from "vite";
  import { svelte } from "@sveltejs/vite-plugin-svelte";
  import { resolve } from "path";
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
      svelte({}),
    ],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'lib/main.js'),
        name: "${name}",
        // the proper extensions will be added
        fileName: "${name}"
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['svelte'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            svelte: 'svelte'
          }
        }
      }
    }
  });`;

const packageJson = (name) =>
  `
{
  "name": "${name}",
  "version": "0.0.0",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/${name}.umd.cjs",
  "module": "./dist/${name}.js",
  "exports": {
    ".": {
      "import": "./dist/${name}.js",
      "require": "./dist/${name}.umd.cjs"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^1.0.2",
    "vite": "^3.1.0"
  },
  "peerDependencies": {
    "svelte": "^3.49.0"
  }
}
`;

const create = async () => {
  const { name } = await getPluginName();

  const pluginName = pn.generatePluginName(name);

  shell.cd("..");
  shell.exec(`npm create vite@latest ${pluginName} -- --template svelte-ts`);
  shell.cd(`./${pluginName}`);

  console.log("Writing configuration files...");
  shell.ShellString(viteConfig(pluginName)).to("vite.config.ts");
  shell.ShellString(packageJson(pluginName)).to("package.json");

  console.log("Installing dependencies...");
  shell.exec("npm install");
};

module.exports = create;
