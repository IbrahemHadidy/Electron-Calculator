import {
  defineConfig,
  splitVendorChunkPlugin,
  externalizeDepsPlugin,
} from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  publicDir: false,
  main: {
    build: {
      plugins: [externalizeDepsPlugin()],
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("foo")) {
              return "foo";
            }
          },
        },
      },
    },
  },

  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    plugins: [react(), splitVendorChunkPlugin()],
  },
});
