import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dynamicImport from "vite-plugin-dynamic-import";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    dynamicImport(),
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
