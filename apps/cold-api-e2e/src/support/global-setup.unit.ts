import axios from 'axios';
import setupModule = require('./global-setup');

jest.mock('axios', () => ({
  create: jest.fn(),
  defaults: { headers: { common: {}, post: {}, put: {}, patch: {}, delete: {}, get: {} } },
}));
// Do not load environment files, database clients, or process-spawning helpers.
jest.mock('dotenv', () => ({ config: jest.fn() }));
jest.mock('@prisma/client', () => ({ PrismaClient: class {} }));
jest.mock('./enhancedPrimsa', () => ({ enhancePrisma: (client: unknown) => client }));

const setup = setupModule as unknown as () => Promise<void>;
const post = jest.fn();
const password = 'PwQ7x-synthetic-password';
const clientSecret = 'CsR8y-synthetic-client-secret';
const accessToken = 'TkS9z-synthetic-access-token';
const initialEnv = process.env;
let log: jest.SpyInstance;
let errorLog: jest.SpyInstance;

const logged = () => JSON.stringify([...log.mock.calls, ...errorLog.mock.calls]);
function expectPrivateDiagnostics() {
  for (const value of [password, clientSecret, accessToken]) {
    expect(logged()).not.toContain(value);
    expect(logged()).not.toContain(value.slice(0, 5));
  }
}

beforeEach(() => {
  process.env = {
    ...initialEnv,
    API_ADMIN_EMAIL: 'api-user@example.invalid',
    API_ADMIN_PASSWORD: password,
    AUTH0_AUDIENCE: 'synthetic-audience',
    AUTH0_TOKEN_URL: 'https://auth.example.invalid/oauth/token',
    AUTH0_CLIENT_ID: 'synthetic-client-id',
    AUTH0_CLIENT_SECRET: clientSecret,
    AUTH0_ORG_ID: 'synthetic-org-id',
    API_SERVER_URL: 'https://api.example.invalid',
  };
  delete globalThis.auth0Axios;
  delete globalThis.started_utc_on;
  delete globalThis.__TEARDOWN_MESSAGE__;
  delete axios.defaults.baseURL;
  for (const method of ['common', 'post', 'put', 'patch', 'delete', 'get', 'head'] as const) {
    axios.defaults.headers[method] = {};
  }
  post.mockReset().mockResolvedValue({ data: { access_token: accessToken }, status: 200 });
  (axios.create as jest.Mock).mockReturnValue({ post });
  log = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  errorLog = jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  process.env = initialEnv;
  delete globalThis.auth0Axios;
  delete globalThis.started_utc_on;
  delete globalThis.__TEARDOWN_MESSAGE__;
});

describe('isolated E2E setup diagnostics', () => {
  it('keeps successful authentication diagnostics free of credential-derived values', async () => {
    await setup();
    expect(log).toHaveBeenCalled();
    expectPrivateDiagnostics();
    expect(errorLog).not.toHaveBeenCalled();
    expect(logged()).not.toContain('api-user@example.invalid');
    expect(logged()).not.toContain('synthetic-client-id');
    expect(logged()).not.toContain('synthetic-org-id');
  });

  it.each([
    ['https://api.example.invalid', 'https://api.example.invalid'],
    [undefined, 'http://localhost:7001'],
  ])('preserves the authentication request and client setup for API URL %s', async (configuredUrl, expectedUrl) => {
    if (configuredUrl === undefined) delete process.env.API_SERVER_URL;
    else process.env.API_SERVER_URL = configuredUrl;

    await setup();

    expect(post).toHaveBeenCalledTimes(1);
    const [url, body, options] = post.mock.calls[0];
    expect(url).toBe('https://auth.example.invalid/oauth/token?organization=synthetic-org-id');
    expect(body).toBeInstanceOf(URLSearchParams);
    expect(Object.fromEntries(body.entries())).toEqual({
      grant_type: 'password',
      username: 'api-user@example.invalid',
      password,
      audience: 'synthetic-audience',
      scope: 'offline_access, openid, profile, email',
      client_id: 'synthetic-client-id',
      client_secret: clientSecret,
    });
    expect(options).toEqual({ headers: { 'content-type': 'application/x-www-form-urlencoded' } });
    expect(globalThis.auth0Axios).toBe(axios);
    expect(axios.defaults.baseURL).toBe(expectedUrl);
    expect(axios.defaults.headers.common.Authorization).toBe(`Bearer ${accessToken}`);
    for (const method of ['post', 'put', 'patch', 'delete'] as const) {
      expect(axios.defaults.headers[method]['Content-Type']).toBe('application/json');
      expect(axios.defaults.headers[method].Accept).toBe('application/json');
    }
    expect(axios.defaults.headers.get.Accept).toBe('application/json');
    expect(Number.isFinite(Date.parse(globalThis.started_utc_on))).toBe(true);
    expect(globalThis.__TEARDOWN_MESSAGE__).toContain('Tearing down');
  });

  it('reports HTTP authentication failure without logging provider response content', async () => {
    post.mockRejectedValue({
      message: `Authentication failed for ${password}`,
      response: { status: 401, data: { error_description: clientSecret, access_token: accessToken } },
    });
    await setup();
    expect(errorLog).toHaveBeenCalled();
    expect(logged()).toContain('401');
    expectPrivateDiagnostics();
  });

  it.each([clientSecret, 999, Number.NaN])('does not log invalid HTTP status values (%s)', async status => {
    post.mockRejectedValue({ response: { status, data: { password } } });
    await setup();
    expect(errorLog).toHaveBeenCalledWith('Unable to get access token for API tests');
    expectPrivateDiagnostics();
  });

  it('reports a network failure without requiring or printing a provider response', async () => {
    post.mockRejectedValue(new Error(`Network failure ${clientSecret}`));
    await expect(setup()).resolves.toBeUndefined();
    expect(errorLog).toHaveBeenCalled();
    expectPrivateDiagnostics();
  });

  it.each(['API_ADMIN_PASSWORD', 'AUTH0_CLIENT_SECRET'])('rejects missing %s before making an authentication request', async key => {
    delete process.env[key];
    await expect(setup()).rejects.toThrow();
    expect(post).not.toHaveBeenCalled();
    expectPrivateDiagnostics();
  });

  it('keeps the missing-token diagnostic free of response content', async () => {
    post.mockResolvedValue({ status: 200, data: { error_description: password, client_secret: clientSecret } });
    await setup();
    expect(errorLog).toHaveBeenCalled();
    expectPrivateDiagnostics();
  });
});
