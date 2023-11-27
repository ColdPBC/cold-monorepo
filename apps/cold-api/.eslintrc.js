module.exports = {
  extends: ['../../.eslintrc.json'],
  ignorePatterns: ['!**/*', '.eslintrc.js', 'jest.config.ts', '**/*.spec.ts', 'prisma/**/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'apps/cold-api/tsconfig.app.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {},
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
  ],
};
