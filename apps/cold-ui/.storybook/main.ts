import { dirname, join } from "path";
import type { StorybookConfig } from '@storybook/react-vite';
import turbosnap from 'vite-plugin-turbosnap';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../../../libs/react/src/components/Introduction.mdoc.mdx',
    '../../../libs/react/src/**/*.@(stories.@(js|jsx|ts|tsx))'
  ],

  addons: [
    getAbsolutePath("@storybook/addon-knobs"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("storybook-addon-cookie"),
    getAbsolutePath("storybook-addon-launchdarkly"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-mdx-gfm"),
    getAbsolutePath("@chromatic-com/storybook")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
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
    reactDocgen: "react-docgen-typescript"
  },

  docs: {
    defaultName: 'Introduction', // Add this
    autodocs: true
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
