/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/cold-ui',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
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
        'fs' // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill `node:` protocol imports.
      protocolImports: false,
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
