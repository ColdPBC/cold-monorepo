import React, { useContext } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '../../test-utils/telemetry';
import { AxiosError, AxiosHeaders } from 'axios';
import { ColdContextProvider } from './coldContextProvider';
import ColdContext from '../context/coldContext';
import { ErrorType } from '../enums/errors';

vi.mock('react-router-dom', () => ({ BrowserRouter: ({ children }) => children }));

const sinks = vi.hoisted(() => ({ log: vi.fn(), addError: vi.fn() }));
vi.mock('@datadog/browser-logs', () => ({ datadogLogs: { logger: { log: sinks.log } } }));
vi.mock('@datadog/browser-rum', () => ({ datadogRum: { addError: sinks.addError } }));
vi.mock('./coldAuthProvider', () => ({ ColdAuthProvider: ({ children }) => children }));
vi.mock('./coldAxiosInterceptorProvider', () => ({ ColdAxiosInterceptorProvider: ({ children }) => children }));
vi.mock('./coldLDProvider', () => ({ ColdLDProvider: ({ children }) => children }));
vi.mock('./coldMQTTProvider', () => ({ ColdMQTTProvider: ({ children }) => children }));
vi.mock('./coldApolloProvider', () => ({ ColdApolloProvider: ({ children }) => children }));

const token = 'sentinel-secret-at-telemetry-boundary';
let context: React.ContextType<typeof ColdContext>;
function CaptureContext() {
  context = useContext(ColdContext);
  return null;
}

beforeEach(() => {
  sessionStorage.clear();
  render(
    <ColdContextProvider auth0Options={{ domain: 'auth.example.test', clientId: 'public-client' }} launchDarklyClientSideId="public-id">
      <CaptureContext />
    </ColdContextProvider>,
  );
});
afterEach(cleanup);

describe('telemetry credential boundary', () => {
  it.each(['Authorization', 'authorization', 'Proxy-Authorization', 'access_token', 'token'])('redacts nested %s without changing the source object', key => {
    const source = { request: { headers: { [key]: token } }, org_id: 'org-1', count: 3 };
    context.logBrowser('Request completed', 'info', source);
    expect(JSON.stringify(sinks.log.mock.calls)).not.toContain(token);
    expect(sinks.log.mock.calls[0][1]).toMatchObject({ org_id: 'org-1', count: 3 });
    expect(source.request.headers[key]).toBe(token);
  });

  it('removes credential query parameters from messages and context URLs', () => {
    const url = `wss://example.test/mqtt?org=org-1&token=${token}&env=test`;
    context.logBrowser(`Connecting to ${url}`, 'info', { url });
    expect(JSON.stringify(sinks.log.mock.calls)).not.toContain(token);
    expect(sinks.log.mock.calls[0][0]).toContain('org=org-1');
    expect(sinks.log.mock.calls[0][1].url).toContain('env=test');
  });

  it('redacts bearer credentials in diagnostic strings', () => {
    context.logBrowser(`Authentication failed: Bearer ${token}`, 'error');
    expect(sinks.log.mock.calls[0][0]).not.toContain(token);
    expect(sinks.log.mock.calls[0][0]).toContain('Authentication failed');
  });

  it('sanitizes Axios errors re-logged by callers while preserving error diagnostics', () => {
    const error = new AxiosError('Request failed with status code 403', 'ERR_BAD_REQUEST', {
      url: '/products', headers: new AxiosHeaders({ Authorization: `Bearer ${token}` }),
    });
    context.logError(error, ErrorType.AxiosError, { error, org_id: 'org-1' });
    const [reportedError, reportedContext] = sinks.addError.mock.calls[0];
    expect(JSON.stringify(sinks.addError.mock.calls)).not.toContain(token);
    expect(reportedError).toBeInstanceOf(Error);
    expect(reportedError.message).toBe('Request failed with status code 403');
    expect(reportedError.name).toBe(ErrorType.AxiosError);
    expect(reportedContext.org_id).toBe('org-1');
    expect(error.config?.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('sanitizes the explicit error argument to browser logs', () => {
    const error = Object.assign(new Error('Request failed'), { token });
    context.logBrowser('Request failed', 'error', undefined, error);
    expect(JSON.stringify(sinks.log.mock.calls)).not.toContain(token);
    expect(sinks.log.mock.calls[0][3]).toBeInstanceOf(Error);
    expect(sinks.log.mock.calls[0][3].message).toBe('Request failed');
    expect(error.token).toBe(token);
  });

  it('handles cyclic diagnostic objects and preserves ordinary structured context', () => {
    const source: Record<string, unknown> = { ids: ['one', 'two'], enabled: true, details: null, token };
    source.self = source;
    context.logBrowser('Context', 'info', source);
    expect(() => JSON.stringify(sinks.log.mock.calls)).not.toThrow();
    expect(JSON.stringify(sinks.log.mock.calls)).not.toContain(token);
    expect(sinks.log.mock.calls[0][1]).toMatchObject({ ids: ['one', 'two'], enabled: true, details: null });
    expect(source.self).toBe(source);
  });
});
