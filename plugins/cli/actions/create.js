import chalk from "chalk";
import shell from "shelljs";
import { create as createSvelte } from "create-svelte";

import getPluginName from "./utils/get-plugin-name.js";
import { generatePluginName } from "./utils/plugin-name.js";

const tailwindCssConfig = () => `
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {}
	},

	plugins: [require('flowbite/plugin')],
	darkMode: 'class',
};

module.exports = config;
`;

const appHtml = () => `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/stax-logo.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body class="bg-white dark:bg-gray-800 w-screen h-screen overflow-hidden">
		<div class="h-full">%sveltekit.body%</div>
	</body>
</html>
`;

const indexJs = `
// Reexport your entry components here
export { default as default } from './index.svelte';
`;

const sveltePage = `
<script lang="ts">
  import Index from '$lib/index.svelte';
</script>

<Index />
`;

const svelteLayout = `
<script lang="ts">
	import '../app.postcss';
	import { browser } from '$app/environment';

	if (browser) {
		window.database = {
			read: async <T>() => {
				const data = {};

				return data as T;
			},
			write: async () => {
				return true;
			}
		};
	}
</script>

<slot />

`;

const svelteAppExample = (name) =>
  `<script lang="ts">
	import { Card, Button, DarkMode } from 'flowbite-svelte';

	export const isPreview = false;
	export const resourcePath = '';

	const btnClass =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5';
</script>

<main class="w-screen h-screen flex justify-center items-center">
	<Card img="stax-logo.png" class="text-center" size="lg" padding="xl">
		<h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
			Welcome to ${name} project!
		</h5>
		<p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
			Let\`s start writing incredibles plugin for day-to-day?
		</p>
		<div class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
			<DarkMode {btnClass} />
			<Button
				on:click={() =>
					window
						?.open(
							'https://github.com/GuilhermeBohnstedt/stax-utilities/tree/main/plugins/README.md',
							'_blank'
						)
						?.focus()}>Read Docs</Button
			>
		</div>
	</Card>
</main>
`;

const pluginTypes = (types) => `
/**
 * Verify if new feature are implemented in 
 * https://github.com/GuilhermeBohnstedt/stax-utilities/blob/main/models/plugins.ts
 */

${types}

declare global {
  interface Window extends WindowDatabase {
   
  }
}
`;

const jsCongigJson = `
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true
	},
	// Path aliases are handled by https://kit.svelte.dev/docs/configuration#alias and https://kit.svelte.dev/docs/configuration#files
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
  "include": [
		".svelte-kit/ambient.d.ts",
		".svelte-kit/types/**/$types.d.ts",
		"vite.config.ts",
		"src/**/*.js",
		"src/**/*.ts",
		"src/**/*.svelte",
		"src/**/*.js",
		"src/**/*.ts",
		"src/**/*.svelte",
		"tests/**/*.js",
		"tests/**/*.ts",
		"tests/**/*.svelte",
    "@types"
	],
}
`;

const create = async () => {
  const { name } = await getPluginName();

  const pluginName = generatePluginName(name);
  const projectFolder = shell.pwd();

  console.log(chalk.blue("Scaffolding project..."));
  shell.cd("..");

  await createSvelte(pluginName, {
    name: pluginName,
    template: "skeletonlib",
    types: "checkjs",
    prettier: true,
    eslint: true,
    playwright: true,
  });

  shell.cd(`./${pluginName}`);

  console.log(chalk.blue("\nInstalling TailwindCss..."));
  shell.exec("npx svelte-add@latest tailwindcss");

  shell.ShellString(tailwindCssConfig()).to("tailwind.config.cjs");
  console.log(chalk.greenBright("Writed tailwind.config.cjs file"));

  shell.ShellString(appHtml(pluginName)).to("src/app.html");
  console.log(chalk.greenBright("Writed app.html file"));

  console.log(chalk.blue("\nInstalling dependencies..."));
  shell.exec("npm i -D flowbite flowbite-svelte classnames @popperjs/core");
  shell.exec("npm install");

  console.log(chalk.blue("\nGiving a final touch..."));

  shell.rm("static/favicon.png");
  shell.cp(`${projectFolder}/public/stax-logo.png`, "static/");
  console.log(chalk.greenBright("Stax logo copied."));

  shell.rm("src/lib/*");
  shell.ShellString(svelteAppExample(pluginName)).to("src/lib/index.svelte");
  shell.ShellString(indexJs).to("src/lib/index.js");
  console.log(chalk.greenBright("Created lib index and svelte component."));

  shell.ShellString(sveltePage).to("src/routes/+page.svelte");
  console.log(chalk.greenBright("Writed +page.svelte file."));

  shell.ShellString(svelteLayout).to("src/routes/+layout.svelte");
  console.log(chalk.greenBright("Writed +layout.svelte file."));

  shell.ShellString(jsCongigJson).to("jsconfig.json");
  console.log(chalk.greenBright("Writed jsconfig.json file."));

  jsCongigJson;

  shell.mkdir("@types");
  shell
    .ShellString(pluginTypes(shell.cat(`${projectFolder}/models/database.ts`)))
    .to("@types/window.d.ts");
  console.log(chalk.greenBright("Writed types for Stax Plugin System."));

  console.log(chalk.green("\nDone."));
};

export default create;
