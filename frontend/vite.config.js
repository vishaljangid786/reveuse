import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        format: "es",
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    sourcemap: true,
    minify: "terser",
    target: "esnext",
  },
  server: {
    port: 5173,
  },
  base: "/",
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
