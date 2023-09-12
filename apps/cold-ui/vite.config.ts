/// <reference types="vitest" />
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/cold-ui',

  server: {
    port: 4200,
    host: 'localhost',
    fs: {
      // Allow serving files from one level up to the project root
      allow: [searchForWorkspaceRoot(process.cwd()), '../../libs/react'],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  resolve: {
    alias: {
      '@coldpbc/animations': path.resolve(
        __dirname,
        '../../libs/react/src/animations/index.ts',
      ),
      '@coldpbc/assets': path.resolve(
        __dirname,
        '../../libs/react/src/assets/index.ts',
      ),
      '@coldpbc/components': path.resolve(
        __dirname,
        '../../libs/react/src/components',
      ),
      '@coldpbc/context': path.resolve(
        __dirname,
        '../../libs/react/src/context',
      ),
      '@coldpbc/enums': path.resolve(__dirname, '../../libs/react/src/enums'),
      '@coldpbc/fetchers': path.resolve(
        __dirname,
        '../../libs/react/src/fetchers',
      ),
      '@coldpbc/hooks': path.resolve(__dirname, '../../libs/react/src/hooks'),
      '@coldpbc/interfaces': path.resolve(
        __dirname,
        '../../libs/react/src/interfaces',
      ),
      '@coldpbc/lib': path.resolve(__dirname, '../../libs/react/src/lib'),
      '@coldpbc/mocks': path.resolve(
        __dirname,
        '../../libs/react/src/__mocks__',
      ),
      '@coldpbc/providers': path.resolve(
        __dirname,
        '../../libs/react/src/providers',
      ),
      '@coldpbc/routes': path.resolve(__dirname, '../../libs/react/src/routes'),
      '@coldpbc/styles': path.resolve(__dirname, '../../libs/react/src/styles'),
      '@coldpbc/themes': path.resolve(__dirname, '../../libs/react/src/themes'),
    },
  },
  plugins: [
    react(),
    nxViteTsPaths(),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        'assert',
        'buffer',
        'console',
        'constants',
        'child_process',
        'readline',
        'cluster',
        'dgram',
        'dns',
        'http2',
        'crypto',
        'domain',
        'events',
        'net',
        'repl',
        // 'http',
        // 'https',
        // 'os',
        'module',
        'path',
        'punycode',
        'process',
        'querystring',
        // 'stream',
        '_stream_duplex',
        '_stream_passthrough',
        '_stream_readable',
        '_stream_transform',
        '_stream_writable',
        'string_decoder',
        'sys',
        'timers',
        'tls',
        // 'tty',
        'url',
        //'util',
        'vm',
        'timers/promises',
        // 'zlib',
        'fs', // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill `node:` protocol imports.
      protocolImports: false,
    }),
  ],

  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/main.tsx',
      name: 'cold-ui',
      fileName: 'cold-ui.ts',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
