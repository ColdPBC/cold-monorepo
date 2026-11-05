import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// Unit tests do not need the library's declaration/bundle build plugins.
export default defineConfig({
  root: __dirname,
  plugins: [tsconfigPaths({ projects: [resolve(__dirname, '../../tsconfig.base.json')] })],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    clearMocks: true,
    restoreMocks: true,
    threads: false,
  },
});
