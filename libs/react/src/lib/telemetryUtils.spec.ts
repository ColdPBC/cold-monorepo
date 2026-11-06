import { describe, expect, it } from 'vitest';
import { redactTelemetry, redactTelemetryText } from './telemetryUtils';

const secret = 'sentinel-credential-review-case';

describe('telemetry serialization edge cases', () => {
  it('redacts serialized JSON request bodies without changing ordinary fields', () => {
    const source = { config: { data: JSON.stringify({ token: secret, nested: { password: secret }, quantity: 2 }) } };
    const result = redactTelemetry(source) as typeof source;
    expect(result.config.data).not.toContain(secret);
    expect(JSON.parse(result.config.data)).toMatchObject({ quantity: 2 });
    expect(source.config.data).toContain(secret);
  });

  it.each(['token', 'password', 'apiKey', 'access_token'])('redacts %s in form-encoded bodies', key => {
    const source = { config: { data: `product=widget&${key}=${secret}&quantity=2` } };
    const result = redactTelemetry(source) as typeof source;
    expect(result.config.data).not.toContain(secret);
    expect(result.config.data).toContain('product=widget');
    expect(result.config.data).toContain('quantity=2');
  });

  it.each([
    `https://user:${secret}@example.test/products`,
    `https://example.test/products?password=${secret}&page=1`,
    `https://example.test/products?apiKey=${secret}&page=1`,
    `https://example.test/products#access_token=${secret}&state=ok`,
  ])('redacts credentials embedded in URLs: %s', url => {
    expect(redactTelemetryText(`Failed: ${url}`)).not.toContain(secret);
    expect(redactTelemetryText(`Failed: ${url}`)).toContain('example.test/products');
  });

  it('serializes Dates without invoking overridden serialization hooks', () => {
    const date = new Date('2026-01-01T00:00:00.000Z');
    date.toJSON = () => secret;
    expect(redactTelemetry({ date })).toEqual({ date: '2026-01-01T00:00:00.000Z' });
  });

  it('preserves and sanitizes non-enumerable Error diagnostics and causes', () => {
    const cause = new Error(`Unauthorized Bearer ${secret}`);
    const error = new Error(`Failed https://example.test/?token=${secret}`);
    Object.defineProperty(error, 'cause', { value: cause });
    const result = redactTelemetry(error) as Error & { cause: Error };
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toContain('Failed');
    expect(result.message).not.toContain(secret);
    expect(result.stack).not.toContain(secret);
    expect(result.cause).toBeInstanceOf(Error);
    expect(result.cause.message).toContain('Unauthorized');
    expect(result.cause.message).not.toContain(secret);
    expect(result.cause.stack).not.toContain(secret);
    expect(cause.message).toContain(secret);
  });

  it('handles cyclic Error causes without dropping other error diagnostics', () => {
    const error = new Error('Connection failed');
    Object.defineProperty(error, 'cause', { value: error });
    const result = redactTelemetry(error) as Error & { cause: unknown };
    expect(result.message).toBe('Connection failed');
    expect(result.cause).toBe('[Circular]');
  });
});
