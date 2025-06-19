import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        env: Object.fromEntries(Object.entries(loadEnv('', process.cwd(), '')).map(([key, val]) => [key, String(val)])),
        setupFiles: './vitest.setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            enabled: true,
            all: true,
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage',
            include: ['src/**/*.{ts,tsx}'],
            exclude: [
                'node_modules',
                'src/**/*.test.{ts,tsx}',
                'src/**/*types.ts',
                'src/**/*interfaces.ts',
                '**/*.d.ts',
                '**/styles*',
                'src/vite-env.d.ts',
                'src/setupTests.ts',
                'src/common/utils/test-utilities.tsx',
                'src/plugins/vite-root-plugin.ts',
            ],
        },
        poolOptions: {
            threads: {
                minThreads: 1,
                maxThreads: 2,
            },
        },
        maxConcurrency: 5,
        openHandlesTimeout: 1000,
        clean: true,
        cleanOnRerun: true,
        testTimeout: 10000,
        slowTestThreshold: 1000,
        // maxWorkers: 2,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
