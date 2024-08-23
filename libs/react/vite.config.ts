/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import alias from '@rollup/plugin-alias';
import { InputPluginOption } from 'rollup';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/react',
  plugins: [
    dts({
      entryRoot: 'src',
    }),
    react(),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'react',
      fileName: 'library',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      plugins: [
        alias({
          entries: {
            '@coldpbc/animations': path.resolve(__dirname, './src/animations/index.ts'),
            '@coldpbc/assets': path.resolve(__dirname, './src/assets/index.ts'),
            '@coldpbc/components': path.resolve(__dirname, './src/components'),
            '@coldpbc/context': path.resolve(__dirname, './src/context'),
            '@coldpbc/enums': path.resolve(__dirname, './src/enums'),
            '@coldpbc/fetchers': path.resolve(__dirname, './src/fetchers'),
            '@coldpbc/hooks': path.resolve(__dirname, './src/hooks'),
            '@coldpbc/interfaces': path.resolve(__dirname, './src/interfaces'),
            '@coldpbc/lib': path.resolve(__dirname, './src/lib'),
            '@coldpbc/mocks': path.resolve(__dirname, './src/__mocks__'),
            '@coldpbc/providers': path.resolve(__dirname, './src/providers'),
            '@coldpbc/routes': path.resolve(__dirname, './src/routes'),
            '@coldpbc/styles': path.resolve(__dirname, './src/styles'),
            '@coldpbc/themes': path.resolve(__dirname, './src/themes'),
          },
        }) as InputPluginOption,
      ],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
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
