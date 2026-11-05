const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { once } = require('node:events');
const { chromium } = require('playwright');

// Both endpoints are local fixtures. Nothing in this test contacts the internet.
test('browser and service worker can use localhost but cannot bypass the offline proxy', async () => {
  let unexpectedRequests = 0;
  const blocked = createServer((req, res) => {
    unexpectedRequests++;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('unexpected external access');
  }).listen(0, '127.0.0.2');
  await once(blocked, 'listening');
  const target = `http://127.0.0.2:${blocked.address().port}/blocked`;
  const allowed = createServer((req, res) => {
    if (req.url === '/worker.js') {
      res.setHeader('Content-Type', 'application/javascript');
      res.end(`self.addEventListener('install', e => self.skipWaiting()); self.addEventListener('activate', e => e.waitUntil(self.clients.claim())); self.addEventListener('message', async e => { try { await fetch(${JSON.stringify(target)}); e.ports[0].postMessage('escaped'); } catch { e.ports[0].postMessage('blocked'); } });`);
    } else { res.setHeader('Content-Type', 'text/html'); res.end('<!doctype html><p>local fixture</p>'); }
  }).listen(0, '127.0.0.1');
  await once(allowed, 'listening');
  let browser;
  try {
    // Baseline options have no egress protection; the test catches that behavior.
    let options = {};
    try { options = require('./offline-browser.cjs'); } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }
    browser = await chromium.launch({ ...options, executablePath: process.env.STORYBOOK_BROWSER_EXECUTABLE || undefined });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${allowed.address().port}`);
    assert.equal(await page.locator('p').textContent(), 'local fixture');
    const direct = await page.evaluate(async url => { try { await fetch(url); return 'escaped'; } catch { return 'blocked'; } }, target);
    assert.equal(direct, 'blocked', 'Direct requests must not escape the offline browser');
    const fromWorker = await page.evaluate(async () => {
      await navigator.serviceWorker.register('/worker.js');
      const registration = await navigator.serviceWorker.ready;
      return new Promise(resolve => {
        const channel = new MessageChannel();
        channel.port1.onmessage = e => resolve(e.data);
        registration.active.postMessage('probe', [channel.port2]);
      });
    });
    assert.equal(fromWorker, 'blocked', 'Service workers must not bypass network isolation');
    assert.equal(unexpectedRequests, 0, 'No request may reach the blocked server');
  } finally {
    await browser?.close();
    await Promise.all([new Promise(r => allowed.close(r)), new Promise(r => blocked.close(r))]);
  }
});
