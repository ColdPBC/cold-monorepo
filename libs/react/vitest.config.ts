import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import ts from 'typescript';

const { config, error } = ts.readConfigFile(resolve(__dirname, '../../tsconfig.base.json'), ts.sys.readFile);
if (error) throw new Error(ts.flattenDiagnosticMessageText(error.messageText, '\n'));
const paths = config.compilerOptions.paths as Record<string, string[]>;

// Unit tests do not need the library's declaration/bundle build plugins.
export default defineConfig({
  root: __dirname,
  resolve: {
    alias: Object.fromEntries(Object.entries(paths).map(([name, [target]]) => [
      name, resolve(__dirname, '../..', target),
    ])),
  },
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./test-utils/browserStorage.ts'],
    clearMocks: true,
    restoreMocks: true,
    minThreads: 1,
    maxThreads: 2,
    passWithNoTests: false,
  },
});
