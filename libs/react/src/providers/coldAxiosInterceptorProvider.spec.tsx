import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '../../test-utils/telemetry';
import axios, { AxiosError, AxiosHeaders } from 'axios';
import { ColdAxiosInterceptorProvider } from './coldAxiosInterceptorProvider';

const auth = vi.hoisted(() => ({
  getAccessTokenSilently: vi.fn(),
  logout: vi.fn(),
}));
const logs = vi.hoisted(() => ({ logBrowser: vi.fn(), logError: vi.fn() }));

vi.mock('@auth0/auth0-react', () => ({ useAuth0: () => auth }));
vi.mock('@coldpbc/hooks', () => ({ useColdContext: () => logs }));
vi.mock('@coldpbc/fetchers', () => ({
  resolveAPIUrl: () => 'https://api.example.test',
  resolveStripeIntegrationUrl: () => 'https://stripe.example.test',
  resolveOpenAIServiceURL: () => 'https://ai.example.test',
}));

const token = 'sentinel-access-token-never-log';

const telemetry = () => JSON.stringify([
  ...logs.logBrowser.mock.calls,
  ...logs.logError.mock.calls,
]);

beforeEach(() => {
  axios.interceptors.request.clear();
  axios.interceptors.response.clear();
  auth.getAccessTokenSilently.mockResolvedValue(token);
  auth.logout.mockResolvedValue(undefined);
});

afterEach(() => {
  cleanup();
  axios.interceptors.request.clear();
  axios.interceptors.response.clear();
});

describe('authenticated Axios telemetry', () => {
  it.each([
    'https://api.example.test',
    'https://stripe.example.test',
    'https://ai.example.test',
  ])('keeps credentials on %s requests but out of request/response logs', async baseURL => {
    render(<ColdAxiosInterceptorProvider><div /></ColdAxiosInterceptorProvider>);
    let authorization: unknown;
    const response = await axios({
      baseURL,
      url: '/products',
      method: 'POST',
      data: { name: 'Existing product behavior' },
      adapter: async config => {
        authorization = config.headers.Authorization;
        return { config, status: 201, statusText: 'Created', headers: {}, data: { id: 'product-1' } };
      },
    });

    expect(authorization).toBe(`Bearer ${token}`);
    expect(response.data).toEqual({ id: 'product-1' });
    expect(response.status).toBe(201);
    expect(logs.logBrowser).toHaveBeenCalled();
    expect(telemetry()).not.toContain(token);
    expect(telemetry()).toContain('/products');
  });

  it('preserves rejected HTTP errors without logging nested credentials', async () => {
    render(<ColdAxiosInterceptorProvider><div /></ColdAxiosInterceptorProvider>);
    const config = { url: '/products', method: 'patch', headers: new AxiosHeaders({ Authorization: `Bearer ${token}` }) };
    const response = { config, status: 403, statusText: 'Forbidden', headers: {}, data: {} };
    const failure = new AxiosError('Request failed with status code 403', 'ERR_BAD_REQUEST', config, {}, response);

    await expect(axios({
      baseURL: 'https://api.example.test',
      url: '/products',
      adapter: async () => { throw failure; },
    })).rejects.toBe(failure);

    expect(logs.logError).toHaveBeenCalled();
    expect(logs.logBrowser).toHaveBeenCalled();
    expect(telemetry()).not.toContain(token);
    expect(telemetry()).toContain('403');
    expect(failure.config?.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('does not add authentication to unrelated service requests', async () => {
    render(<ColdAxiosInterceptorProvider><div /></ColdAxiosInterceptorProvider>);
    let authorization: unknown;
    await axios({
      baseURL: 'https://external.example.test',
      url: '/public',
      adapter: async config => {
        authorization = config.headers.Authorization;
        return { config, status: 200, statusText: 'OK', headers: {}, data: 'public data' };
      },
    });
    expect(authorization).toBeUndefined();
    expect(auth.getAccessTokenSilently).not.toHaveBeenCalled();
  });

  it('keeps category 404 responses out of error reporting', async () => {
    render(<ColdAxiosInterceptorProvider><div /></ColdAxiosInterceptorProvider>);
    const config = { url: '/categories', headers: new AxiosHeaders() };
    const failure = new AxiosError('Not found', 'ERR_BAD_REQUEST', config, {}, {
      config, status: 404, statusText: 'Not Found', headers: {}, data: {},
    });
    await expect(axios({
      baseURL: 'https://api.example.test',
      url: '/categories',
      adapter: async () => { throw failure; },
    })).rejects.toBe(failure);
    expect(logs.logError).not.toHaveBeenCalled();
  });
});
