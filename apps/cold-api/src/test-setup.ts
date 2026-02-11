import { Test } from '@nestjs/testing';

jest.setTimeout(30000);

process.env.NODE_ENV ??= 'test';
process.env.DD_SERVICE ??= 'cold-api-test';
process.env.DD_VERSION ??= 'test';
process.env.LINEAR_API_KEY ??= 'test-key';

jest.mock('@aws-sdk/client-secrets-manager', () => {
  class MockSecretsManager {
    getSecretValue = jest.fn().mockResolvedValue({ SecretString: '{}' });
  }

  return {
    SecretsManager: MockSecretsManager,
  };
});

const mockFactory = () => {
  const cache = new Map<PropertyKey, unknown>();

  return new Proxy(
    {},
    {
      get: (_target, key: PropertyKey) => {
        if (key === 'then' || key === 'catch' || key === 'finally') {
          return undefined;
        }
        if (!cache.has(key)) {
          cache.set(key, jest.fn());
        }
        return cache.get(key);
      },
    },
  );
};

const globalState = globalThis as typeof globalThis & {
  __coldApiAutoMockPatched?: boolean;
};

if (!globalState.__coldApiAutoMockPatched) {
  const createTestingModule = Test.createTestingModule.bind(Test);

  Test.createTestingModule = ((metadata: Parameters<typeof Test.createTestingModule>[0]) =>
    createTestingModule(metadata).useMocker(() => mockFactory())) as typeof Test.createTestingModule;

  globalState.__coldApiAutoMockPatched = true;
}
