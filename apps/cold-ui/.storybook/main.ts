import type { StorybookConfig } from '@storybook/react-vite';
import turbosnap from 'vite-plugin-turbosnap';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|tsx|ts|mdx)', '../src/**/*.mdx', '../../../libs/react/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-essentials',
    'storybook-addon-auth0-react',
    'storybook-addon-cookie',
    'storybook-addon-launchdarkly',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
    '@storybook/addon-themes',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'apps/cold-ui/vite.config.ts',
      },
    },
  },

  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins:
        configType === 'PRODUCTION'
          ? [
              turbosnap({
                // This should be the base path of your storybook.  In monorepos, you may only need process.cwd().
                rootDir: process.cwd(),
              }),
            ]
          : [],
    });
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  docs: {},
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs
