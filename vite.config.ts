import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import inject from "@rollup/plugin-inject";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@styles": "/src/assets/styles",
      "@images": "/src/assets/images",
      "@components": "/src/components",
      "@config": "/src/config",
      "@utils": "/src/utils",
      buffer: "buffer",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // @ts-ignore
        rollupNodePolyFill(),
        inject({
          process: "process/browser",
        }),
      ],
      manualChunks: {
        vendor: [
          "react",
          "react-dom",
          "sass",
          "@primuslabs/zktls-js-sdk",
          "autoprefixer",
          "dayjs",
        ],
      },
    },
  },
  define: {
    "process.env": process.env || {},
  },
});
