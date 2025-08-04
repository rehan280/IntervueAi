import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import rollupConfig from "./rollup.config.js";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["jspdf", "jspdf-autotable"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      ...rollupConfig,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  // Fix for Netlify build issues
  ssr: {
    noExternal: ['@radix-ui/react-icons']
  }
});
