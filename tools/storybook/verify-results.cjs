'use strict';
const { readFileSync } = require('node:fs');

try {
  const results = JSON.parse(readFileSync(process.argv[2], 'utf8'));
  const index = JSON.parse(readFileSync(process.argv[3], 'utf8'));
  const storyCount = Object.values(index.entries).filter(entry => entry.type === 'story').length;
  if (results.numTotalTests !== storyCount) throw new Error('Executed test count does not match the built Storybook story count.');
  if (results.success !== true || !Number.isInteger(results.numTotalTests) || results.numTotalTests <= 0 ||
      results.numPassedTests !== results.numTotalTests ||
      ['numFailedTests', 'numPendingTests', 'numTodoTests', 'numRuntimeErrorTestSuites'].some(key => results[key] !== 0)) {
    throw new Error('Storybook must execute and pass every test, with no skipped, todo, or runtime failures.');
  }
  console.log(`Storybook: all ${results.numPassedTests} tests passed.`);
} catch (error) {
  console.error(`Storybook result gate failed: ${error.message}`);
  process.exitCode = 1;
}
