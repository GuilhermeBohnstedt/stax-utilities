import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "main.cjs"),
      name: "electron-main",
      fileName: "electron-main",
      formats: ["cjs"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: "node",
      output: { dir: resolve(__dirname, "../build/main") },
    },
  },
});
