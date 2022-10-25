import chalk from "chalk";
import shell from "shelljs";
import getPluginName from "./utils/get-plugin-name.js";
import { generatePluginName } from "./utils/plugin-name.js";
import { create as createSvelte } from "create-svelte";

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
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body class="bg-white dark:bg-gray-800 w-screen h-screen overflow-hidden">
		<div class="h-full">%sveltekit.body%</div>
	</body>
</html>
`;

const appPostCss = () => `
@tailwind base;

@tailwind components;

@tailwind utilities;

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

  console.log(chalk.blue("Installing TailwindCss..."));
  shell.exec("npx svelte-add@latest tailwindcss");

  shell.ShellString(tailwindCssConfig()).to("tailwind.config.cjs");
  console.log(chalk.greenBright("Writed tailwind.config.cjs file"));

  shell.ShellString(appHtml(pluginName)).to("src/app.html");
  console.log(chalk.greenBright("Writed app.html file"));

  console.log(chalk.blue("\nInstalling dependencies..."));
  shell.exec("npm i -D flowbite flowbite-svelte classnames @popperjs/core");
  shell.exec("npm install");

  console.log(chalk.green("\nGiving a final touch..."));

  shell.rm("static/favicon.png");
  shell.cp(`${projectFolder}/public/stax-logo.png`, "static/");
  shell.rm("src/lib/*");
  shell.ShellString(svelteAppExample(pluginName)).to("src/lib/index.svelte");
  shell.ShellString(indexJs).to("src/lib/index.js");
  shell.ShellString(sveltePage).to("src/routes/+page.svelte");

  console.log(chalk.green("\nDone."));
};

export default create;
