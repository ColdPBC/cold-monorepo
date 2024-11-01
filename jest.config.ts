import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  codeCoverage: true,
  coverageReporters: ['text', 'lcov', 'clover'],
  detectOpenHandles: true,
  detectLeaks: true,
  forceExit: true,
  verbose: true,
  passWithNoTests: true,
  testTimeout: 30000,
  watchAll: true,
  watch: true,
  projects: await getJestProjectsAsync(),
});
