/// <reference types="vitest" />
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	root: __dirname,
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
	plugins: [
		react(),
		nxViteTsPaths(),
		nodePolyfills({
			// To exclude specific polyfills, add them to this list.
			exclude: [],
			// Whether to polyfill `node:` protocol imports.
			protocolImports: true,
		}),
	],
	build: {
		manifest: true,
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
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
