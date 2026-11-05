// Focused, offline unit tests. This configuration transpiles TypeScript only;
// repository-wide type checking and Prisma generation are separate checks.
module.exports = {
  displayName: 'rabbitmq',
  rootDir: __dirname,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/lib/rabbit/rabbit.service.spec.ts'],
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          target: 'ES2022',
          module: 'commonjs',
          esModuleInterop: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          suppressImplicitAnyIndexErrors: false,
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
