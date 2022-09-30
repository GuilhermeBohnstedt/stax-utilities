import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dynamicImport from "vite-plugin-dynamic-import";
import { join } from "path";
import Icons from "unplugin-icons/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    dynamicImport(),
    Icons({
      compiler: "svelte",
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: "$packages",
        replacement: join(__dirname, "packages"),
      },
    ],
  },
});
