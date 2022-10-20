import { defineConfig, normalizePath, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dynamicImport from "vite-plugin-dynamic-import";
import { resolve } from "path";
import Icons from "unplugin-icons/vite";
import electron from "vite-plugin-electron";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: normalizePath(resolve(__dirname, "plugins/installed")),
            dest: normalizePath(resolve(__dirname, "dist/plugins")),
          },
        ],
      }),
      svelte({}),
      dynamicImport(),
      Icons({
        compiler: "svelte",
        autoInstall: true,
      }),
      electron({
        main: {
          entry: "app/main.ts",
        },
        preload: {
          input: "app/preload.ts",
        },
      }),
    ],
  };
});
