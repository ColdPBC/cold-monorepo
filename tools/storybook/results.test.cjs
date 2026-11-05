const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, rmSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const complete = { success: true, numTotalTests: 2, numPassedTests: 2, numFailedTests: 0, numPendingTests: 0, numTodoTests: 0, numRuntimeErrorTestSuites: 0 };
function run(results) {
  const directory = mkdtempSync(join(tmpdir(), 'storybook-results-'));
  try {
    const file = join(directory, 'results.json');
    writeFileSync(file, typeof results === 'string' ? results : JSON.stringify(results));
    return spawnSync(process.execPath, [join(__dirname, 'verify-results.cjs'), file], { encoding: 'utf8' });
  } finally { rmSync(directory, { recursive: true, force: true }); }
}
test('a complete successful suite passes', () => assert.equal(run(complete).status, 0));
for (const [name, result] of Object.entries({
  empty: { ...complete, numTotalTests: 0, numPassedTests: 0 },
  failed: { ...complete, numFailedTests: 1, numPassedTests: 1 },
  skipped: { ...complete, numPendingTests: 1, numPassedTests: 1 },
  todo: { ...complete, numTodoTests: 1, numPassedTests: 1 },
  runtime: { ...complete, numRuntimeErrorTestSuites: 1 },
  incomplete: { ...complete, numPassedTests: 1 },
  unsuccessful: { ...complete, success: false },
  missing: {},
  malformed: '{',
})) test(`${name} results fail closed`, () => assert.notEqual(run(result).status, 0));
