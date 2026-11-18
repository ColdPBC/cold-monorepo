// The addon's preset.js uses CommonJS inside a type:module package.
// Load its published preview/manager entry points without that broken wrapper.
module.exports = {
  previewAnnotations: entries => [...entries, { bare: 'storybook-addon-cookie/preview', absolute: require.resolve('storybook-addon-cookie/preview') }],
  managerEntries: entries => [...entries, require.resolve('storybook-addon-cookie/manager')],
};
