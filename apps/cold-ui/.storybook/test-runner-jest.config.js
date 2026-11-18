const { resolve } = require('node:path');
const { getJestConfig } = require('@storybook/test-runner');
const offlineBrowser = require('../../../tools/storybook/offline-browser.cjs');

const defaults = getJestConfig();
module.exports = {
  ...defaults,
  rootDir: resolve(__dirname, '../../..'),
  testTimeout: 20000,
  testEnvironmentOptions: {
    ...defaults.testEnvironmentOptions,
    'jest-playwright': {
      ...defaults.testEnvironmentOptions['jest-playwright'],
      browsers: ['chromium'],
      launchOptions: offlineBrowser,
    },
  },
};
