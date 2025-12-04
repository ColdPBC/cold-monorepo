/* eslint-disable */
export default {
  displayName: 'cold-platform-stripe',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.spec.json', isolatedModules: true, diagnostics: { warnOnly: true } },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/cold-platform-stripe',
};
