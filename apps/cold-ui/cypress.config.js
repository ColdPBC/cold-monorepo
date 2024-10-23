import { defineConfig } from 'cypress';

export default defineConfig({
	projectId: 'cold-monorepo',
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
	component: {
		devServer: {
			framework: 'react',
			bundler: 'vite',
		},
	},
});
