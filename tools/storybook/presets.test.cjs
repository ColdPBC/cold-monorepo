const { test } = require('node:test');
const assert = require('node:assert/strict');
const { resolve } = require('node:path');
const { loadAllPresets } = require('storybook/internal/common');

test('Storybook loads its real addons and retains cookie and feature-flag decorators', async () => {
  const presets = await loadAllPresets({ configDir: resolve(__dirname, '../../apps/cold-ui/.storybook'), corePresets: [], overridePresets: [], isCritical: true });
  const annotations = await presets.apply('previewAnnotations', []);
  assert.ok(annotations.some(path => (typeof path === 'string' ? path : path.bare).includes('storybook-addon-cookie')), 'Cookie decorator must remain enabled');
  assert.ok(annotations.some(path => (typeof path === 'string' ? path : path.bare).includes('storybook-addon-launchdarkly')), 'Mocked feature flags must remain enabled');
});
