const chalk = require("chalk");
const shell = require("shelljs");
const getPluginName = require("./utils/get-plugin-name");
const pn = require("./utils/plugin-name");

const viteConfig = (name) =>
  `
  import { defineConfig } from "vite";
  import { svelte } from "@sveltejs/vite-plugin-svelte";
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
      svelte({}),
    ],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: 'lib/main.js',
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
    "preview": "vite preview",
    "check": "svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@popperjs/core": "^2.11.6",
    "@sveltejs/vite-plugin-svelte": "^1.0.2",
    "@tsconfig/svelte": "^3.0.0",
    "autoprefixer": "^10.4.10",
    "classnames": "^2.3.2",
    "flowbite": "^1.5.3",
    "flowbite-svelte": "^0.27.8",
    "svelte-check": "^2.8.1",
    "svelte-preprocess": "^4.10.7",
    "tslib": "^2.4.0",
    "tailwindcss": "^3.1.8",
    "typescript": "^4.6.4",
    "vite": "^3.1.0"
  },
  "peerDependencies": {
    "svelte": "^3.49.0"
  }
}
`;

const tailwindCssConfig = () => `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
`

const indexHtml = (name) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/stax-logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body class="bg-white dark:bg-gray-800">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`

const appPostCss = () => `
@tailwind base;

@tailwind components;

@tailwind utilities;

`

const svelteAppExample = (name) => 
`<script lang="ts">
  import { Card, Button, DarkMode } from "flowbite-svelte";

  const btnClass =
    "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5";
</script>

<main class="w-screen h-screen flex justify-center items-center">
  <Card img="stax-logo.png" class="text-center" size="lg" padding="xl">
    <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
      Welcome to ${name} project!
    </h5>
    <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
      Let\`s start writing incredibles plugin for day-to-day?
    </p>
    <div
      class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
    >
      <DarkMode {btnClass} />
      <Button
        on:click={() =>
          window
            .open(
              "https://github.com/GuilhermeBohnstedt/stax-utilities/tree/main/plugins/README.md",
              "_blank"
            )
            .focus()}>Read Docs</Button
      >
    </div>
  </Card>
</main>`



const create = async () => {
  const { name } = await getPluginName();

  const pluginName = pn.generatePluginName(name);


  console.log(chalk.blue("Scaffolding project..."));
  shell.cd("..");
  shell.exec(`npm create vite@latest ${pluginName} -- --template svelte-ts`);
  shell.cd(`./${pluginName}`);

  console.log(chalk.blue("Installing TailwindCss..."));
  shell.exec('npx svelte-add@latest tailwindcss')

  console.log(chalk.blue("\nWriting configuration files..."));
  shell.ShellString(viteConfig(pluginName)).to("vite.config.ts");
  console.log(chalk.greenBright("Writed vite.config.ts file"));

  shell.ShellString(packageJson(pluginName)).to("package.json");
  console.log(chalk.greenBright("Writed package.json file"));

  shell.ShellString(tailwindCssConfig()).to("tailwind.config.cjs");
  console.log(chalk.greenBright("Writed tailwind.config.cjs file"));

  shell.ShellString(indexHtml(pluginName)).to("index.html");
  console.log(chalk.greenBright("Writed index.html file"));

  shell.ShellString(appPostCss()).to("src/app.postcss");
  console.log(chalk.greenBright("Writed app.postcss file"));
  
  console.log(chalk.blue("\nInstalling dependencies..."));
  shell.exec("npm i -D flowbite flowbite-svelte classnames @popperjs/core");
  shell.exec("npm install");

  console.log(chalk.green("\nGiving a final touch..."));
  shell.rm('public/vite.svg');
  shell.cp('../stax-utilities/public/stax-logo.png', 'public');
  shell.rm('src/assets/*');
  shell.rm('src/lib/*');
  shell.ShellString(svelteAppExample(pluginName)).to("src/App.svelte");
  

  console.log(chalk.green("\nDone."));
};

module.exports = create;
