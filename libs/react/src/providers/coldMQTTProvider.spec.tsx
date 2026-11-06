import React, { useContext } from 'react';
import { EventEmitter } from 'events';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, flushEffects } from '../../test-utils/telemetry';
import { ColdMQTTProvider } from './coldMQTTProvider';
import ColdMQTTContext, { ColdMQTTContextType } from '../context/coldMQTTContext';

const dependencies = vi.hoisted(() => ({
  connect: vi.fn(),
  logBrowser: vi.fn(),
  getAccessTokenSilently: vi.fn(),
  logout: vi.fn(),
  mutate: vi.fn(),
  cache: new Map(),
  user: { coldclimate_claims: { roles: ['company:member'] } },
}));

vi.mock('mqtt', () => ({ default: { connect: dependencies.connect } }));
vi.mock('swr', () => ({ useSWRConfig: () => ({ mutate: dependencies.mutate, cache: dependencies.cache }) }));
vi.mock('launchdarkly-react-client-sdk', () => ({ useFlags: () => ({}) }));
vi.mock('@coldpbc/hooks', () => ({
  useColdContext: () => ({ logBrowser: dependencies.logBrowser }),
  useAuth0Wrapper: () => ({
    user: dependencies.user,
    orgId: 'organization-1',
    getAccessTokenSilently: dependencies.getAccessTokenSilently,
    logout: dependencies.logout,
    isAuthenticated: true,
  }),
}));
vi.mock('@coldpbc/fetchers', () => ({ resolveNodeEnv: () => 'test' }));
vi.mock('@coldpbc/lib', () => ({ getQueryMappingsForKey: () => [] }));

const token = 'sentinel-mqtt-token-never-log';
let mqttContext: ColdMQTTContextType;
let client: EventEmitter & {
  subscribe: ReturnType<typeof vi.fn>;
  publish: ReturnType<typeof vi.fn>;
  reconnect: ReturnType<typeof vi.fn>;
  end: ReturnType<typeof vi.fn>;
};

function CaptureContext() {
  mqttContext = useContext(ColdMQTTContext);
  return null;
}

beforeEach(() => {
  vi.stubEnv('VITE_MQTT_URL', 'wss://mqtt.example.test');
  vi.stubEnv('VITE_AUTH0_DOMAIN', 'auth.example.test');
  dependencies.getAccessTokenSilently.mockResolvedValue(token);
  dependencies.mutate.mockResolvedValue(undefined);
  client = Object.assign(new EventEmitter(), {
    subscribe: vi.fn((_topic, callback) => callback?.(null, [])),
    publish: vi.fn(),
    reconnect: vi.fn(),
    end: vi.fn(),
  });
  dependencies.connect.mockReturnValue(client);
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
});

describe('authenticated MQTT telemetry', () => {
  it('authenticates the connection without logging its token-bearing URL', async () => {
    render(<ColdMQTTProvider><CaptureContext /></ColdMQTTProvider>);
    await flushEffects();
    expect(dependencies.connect).toHaveBeenCalled();

    const [url, options] = dependencies.connect.mock.calls[0];
    expect(new URL(url).searchParams.get('token')).toBe(token);
    expect(new URL(url).searchParams.get('x-cold-org')).toBe('organization-1');
    expect(options.clean).toBe(false);
    expect(dependencies.logBrowser).toHaveBeenCalled();
    expect(JSON.stringify(dependencies.logBrowser.mock.calls)).not.toContain(token);
  });

  it('preserves authenticated publish payloads without logging their credentials', async () => {
    render(<ColdMQTTProvider><CaptureContext /></ColdMQTTProvider>);
    await flushEffects();
    expect(dependencies.connect).toHaveBeenCalled();

    act(() => mqttContext.publishMessage('actions/test', JSON.stringify({ action: 'refresh', id: 'product-1' })));

    const [topic, serialized] = client.publish.mock.calls[0];
    expect(topic).toBe('actions/test');
    expect(JSON.parse(serialized)).toEqual({
      action: 'refresh',
      id: 'product-1',
      user: { coldclimate_claims: { roles: ['company:member'] } },
      org_id: 'organization-1',
      token,
    });
    expect(JSON.stringify(dependencies.logBrowser.mock.calls)).not.toContain(token);
  });

  it('preserves organization/public subscriptions and connection status', async () => {
    render(<ColdMQTTProvider><CaptureContext /></ColdMQTTProvider>);
    await flushEffects();
    expect(dependencies.connect).toHaveBeenCalled();
    act(() => { client.emit('connect'); });
    expect(client.subscribe.mock.calls.map(call => call[0])).toEqual([
      'ui/test/organization-1/#',
      'system/test/public/#',
    ]);
    expect(mqttContext.connectionStatus).toBe(true);
    act(() => { client.emit('close'); });
    expect(mqttContext.connectionStatus).toBe(false);
  });

  it('still refreshes cached data for an incoming update', async () => {
    render(<ColdMQTTProvider><CaptureContext /></ColdMQTTProvider>);
    await flushEffects();
    expect(dependencies.connect).toHaveBeenCalled();
    const payload = Buffer.from(JSON.stringify({ swr_key: '/organizations/organization-1/products' }));
    act(() => { client.emit('message', 'ui/test/organization-1/products', payload, { payload }); });
    await flushEffects();
    expect(dependencies.mutate).toHaveBeenCalledWith([
      '/organizations/organization-1/products', 'GET',
    ]);
  });
});
