import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vitest/config";
import packageJson from './package.json' assert { type: 'json' };
import tsconfigPaths from 'vite-tsconfig-paths';
import addRootDivPlugin from './src/plugins/vite-root-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'app': path.resolve(__dirname, 'src/app')
    }
  },

  plugins: [react(), tsconfigPaths(), addRootDivPlugin()],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          if (id.includes('src/app')) {
            return 'app';
          }

          if (id.includes('src/assets')) {
            return 'assets';
          }

          if (id.includes('src/common')) {
            return 'common';
          }

          if (id.includes('src/features')) {
            return 'features';
          }

          return 'index';
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },

  server: {
    open: true,
  },

  test: {
    root: import.meta.dirname,
    name: packageJson.name,
    environment: "jsdom",

    typecheck: {
      enabled: true,
      tsconfig: path.join(import.meta.dirname, "tsconfig.json"),
    },

    globals: true,
    watch: false,
    setupFiles: ["./src/setupTests.ts"],
  },
})
