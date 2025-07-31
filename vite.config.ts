import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
    },
  },
});
