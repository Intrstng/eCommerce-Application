import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vitest/config";
import packageJson from './package.json' assert { type: 'json' };
import tsconfigPaths from 'vite-tsconfig-paths';
import addRootDivPlugin from './src/plugins/vite-root-plugin';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'app': path.resolve(__dirname, 'src/app')
    }
  },

  plugins: [react(), tsconfigPaths(), addRootDivPlugin(), svgr({
      svgrOptions: {
        icon: true,
        ref: true,
        titleProp: true,
        svgo: true,
      },
    })
      ],

  build: {
    chunkSizeWarningLimit: 3000,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules/react') ||
    //           id.includes('node_modules/react-dom') ||
    //           id.includes('node_modules/scheduler') ||
    //           id.includes('node_modules/react-router-dom') ||
    //           id.includes('node_modules/react-redux')) {
    //         return 'vendor-react';
    //       }
    //
    //       if (id.includes('node_modules/@mui') ||
    //           id.includes('node_modules/@emotion')) {
    //         return 'vendor-mui';
    //       }
    //
    //       if (id.includes('node_modules')) {
    //         const match = id.match(/node_modules\/(.*?)\//);
    //         if (match) {
    //           const packageName = match[1];
    //           if ([
    //             'axios',
    //             'yup',
    //             'react-hook-form',
    //             '@hookform/resolvers',
    //             'react-toastify',
    //             'uuid',
    //             '@lottiefiles/dotlottie-react'
    //           ].includes(packageName)) {
    //             return `vendor-${packageName.replace(/[^a-zA-Z0-9]/g, '-')}`;
    //           }
    //           return 'vendor-libs';
    //         }
    //       }
    //
    //       if (id.includes('src/features/')) {
    //         const match = id.match(/src\/features\/(.*?)\//);
    //         if (match) {
    //           return `feature-${match[1]}`;
    //         }
    //       }
    //
    //       if (id.includes('src/common')) {
    //         return 'common';
    //       }
    //
    //       if (id.includes('src/assets')) {
    //         return 'assets';
    //       }
    //
    //       if (id.includes('src/app')) {
    //         return 'app-core';
    //       }
    //
    //       if (id.includes('src/app/store')) {
    //         return 'redux-core';
    //       }
    //
    //       if (id.includes('src/common/routes') || id.includes('src/common/pages')) {
    //         const match = id.match(/src\/common\/(routes|pages)\/([^\/]+)/);
    //         if (match) return `route-${match[2]}`;
    //       }
    //     },
    //     chunkFileNames: 'js/[name]-[hash].js',
    //     entryFileNames: 'js/[name]-[hash].js',
    //     assetFileNames: '[ext]/[name]-[hash].[ext]',
    //   },
    // },
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
