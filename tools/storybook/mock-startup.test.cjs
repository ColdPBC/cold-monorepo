const { test } = require('node:test');
const assert = require('node:assert/strict');
const { resolve } = require('node:path');
const { chromium } = require('playwright');
const { setupPage } = require('@storybook/test-runner');
const offlineBrowser = require('./offline-browser.cjs');

test('Storybook waits for MSW before rendering data-dependent stories', { timeout: 30000 }, async () => {
  process.env.TARGET_URL = 'http://127.0.0.1:4400';
  process.env.STORYBOOK_CONFIG_DIR = resolve(__dirname, '../../apps/cold-ui/.storybook');
  const browser = await chromium.launch(offlineBrowser);
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const responses = [];
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      const pathname = new URL(response.url()).pathname;
      if (pathname.startsWith('/members/') || /^\/organizations\/[^/]+$/.test(pathname)) {
        responses.push({ pathname, status: response.status(), mocked: response.fromServiceWorker() });
      }
    });
    await page.addInitScript(() => {
      const register = navigator.serviceWorker.register.bind(navigator.serviceWorker);
      navigator.serviceWorker.register = async (...args) => {
        // Reproduce slow worker registration while leaving the real worker,
        // handlers, component, and play function intact.
        await new Promise(resolve => setTimeout(resolve, 1500));
        return register(...args);
      };
    });

    // Use the same bare-iframe preparation and story execution as test-storybook.
    await setupPage(page, context);
    await page.evaluate(() => __test('pages-usersettingspage--default'));

    assert.ok(responses.some(response => response.pathname.startsWith('/members/')), 'Member data was requested');
    assert.ok(responses.some(response => response.pathname.startsWith('/organizations/')), 'Organization data was requested');
    assert.ok(responses.every(response => response.status === 200 && response.mocked), JSON.stringify(responses));
    assert.deepEqual(errors, [], 'Preview must not have uncaught browser errors');
  } finally {
    await browser.close();
  }
});
