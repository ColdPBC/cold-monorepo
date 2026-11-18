const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const offlineFonts = require('../../apps/cold-ui/.storybook/offline-fonts.cjs');
const stylesheet = '/checkout/apps/cold-ui/src/styles.css';

test('offline Storybook keeps application styles without importing the remote font stylesheet', () => {
  const source = readFileSync('apps/cold-ui/src/styles.css', 'utf8');
  assert.match(source, /fonts\.googleapis\.com/);
  const result = offlineFonts().transform(source, stylesheet);
  assert.doesNotMatch(result.code, /fonts\.googleapis\.com/);
  assert.match(result.code, /@tailwind base/);
  assert.match(result.code, /\.sidebar-item span/);
});

test('only the known font import is removed; local imports and declarations remain', () => {
  const source = '@import "./local.css";\n@import url("https://fonts.googleapis.com/css2?family=Inter");\nbody { color: red; }';
  assert.equal(offlineFonts().transform(source, stylesheet).code, '@import "./local.css";\nbody { color: red; }');
});

test('other stylesheets and non-Google imports are unchanged', () => {
  const source = '@import "https://example.invalid/styles.css"; body { color: red; }';
  assert.equal(offlineFonts().transform(source, stylesheet).code, source);
  assert.equal(offlineFonts().transform(source, '/checkout/other/styles.css'), undefined);
});

test('handles quoted URL syntax and preserves lookalike hosts', () => {
  const source = '@import "https://fonts.googleapis.com/css2?family=Inter";\n@import url( "https://fonts.googleapis.com/css2?family=Inter" );\n@import "https://fonts.googleapis.com.example.invalid/css";';
  assert.equal(offlineFonts().transform(source, stylesheet).code.trim(), '@import "https://fonts.googleapis.com.example.invalid/css";');
});
