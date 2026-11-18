// Isolated support tests must never load the remote E2E setup or teardown hooks.
export default {
  displayName: 'cold-api-e2e-support-unit',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/support/**/*.unit.ts'],
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  clearMocks: true,
  restoreMocks: true,
};
