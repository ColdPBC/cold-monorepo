import { getJestProjects } from '@nx/jest';

export default {
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
  projects: getJestProjects(),
};
