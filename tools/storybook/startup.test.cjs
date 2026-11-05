const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const runner = require('../../apps/cold-ui/.storybook/test-runner-jest.config.js');

// Diagnose shared preview failures before hundreds of render tests time out.
// Uses exactly the same offline browser settings as the full suite.
test('the built Storybook preview boots and renders its basic Button story', { timeout: 30000 }, async () => {
  const browser = await chromium.launch(runner.testEnvironmentOptions['jest-playwright'].launchOptions);
  const errors = [];
  try {
    const page = await browser.newPage();
    page.on('requestfailed', request => console.error('Preview failed request:', request.url(), request.failure()?.errorText));
    page.on('pageerror', error => { errors.push(error.message); console.error('Preview page error:', error.message); });
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().includes('ERR_PROXY_CONNECTION_FAILED')) {
        console.error('Preview console error:', message.text().slice(0, 1500));
      }
    });
    await page.goto('http://127.0.0.1:4400/iframe.html?id=atoms-button--default&viewMode=story', { waitUntil: 'domcontentloaded' });
    try {
      await page.getByRole('button', { name: 'Button', exact: true }).waitFor({ timeout: 15000 });
    } catch (error) {
      console.error('Storybook error display:', (await page.locator('.sb-errordisplay').textContent().catch(() => 'unavailable'))?.slice(0, 1500));
      throw error;
    }
    assert.deepEqual(errors, [], 'Preview must not have uncaught browser errors');
  } finally { await browser.close(); }
});
