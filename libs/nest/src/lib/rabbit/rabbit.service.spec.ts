import { strict as assert } from 'node:assert';
import type { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import type { ConfigService } from '@nestjs/config';
import { ColdRabbitService } from './rabbit.service';

// BaseWorker starts tracing and metrics clients. Keep these tests offline.
jest.mock('../worker', () => ({
  BaseWorker: class {
    logger = { info() {}, error() {}, warn() {} };
  },
}));

const payload = { event: 'example.event', from: 'test-service', data: { value: 1 } };

const createService = (client: object) => new ColdRabbitService(client as AmqpConnection, {} as ConfigService);

describe('ColdRabbitService', () => {
  describe('disconnect', () => {
    it('closes a live connection', async () => {
      let connected = true;
      const service = createService({
        managedConnection: {
          isConnected: () => connected,
          close: async () => { connected = false; },
        },
      });

      await service.disconnect();

      assert.equal(connected, false);
    });

    it('closes a disconnected manager to stop reconnection attempts', async () => {
      let closed = false;
      const service = createService({
        managedConnection: {
          isConnected: () => false,
          close: async () => { closed = true; },
        },
      });

      await service.disconnect();

      assert.equal(closed, true);
    });

    it('does not fail when the managed connection is unavailable', async () => {
      await assert.doesNotReject(createService({}).disconnect());
    });

    it('waits for connection cleanup before resolving', async () => {
      let finishClose!: () => void;
      let finished = false;
      const service = createService({
        managedConnection: {
          isConnected: () => true,
          close: () => new Promise<void>(resolve => { finishClose = resolve; }),
        },
      });

      const disconnecting = service.disconnect().then(() => { finished = true; });
      await Promise.resolve();
      assert.equal(finished, false);
      finishClose();
      await disconnecting;
      assert.equal(finished, true);
    });

    it('propagates a connection cleanup failure', async () => {
      const failure = new Error('cleanup failed');
      const service = createService({
        managedConnection: {
          isConnected: () => true,
          close: async () => { throw failure; },
        },
      });

      await assert.rejects(service.disconnect(), error => error === failure);
    });
  });

  describe('request', () => {
    it('preserves an explicit empty exchange for RabbitMQ default-exchange routing', async () => {
      let sent: unknown;
      const service = createService({ request: async (message: unknown) => { sent = message; } });

      await service.request('destination.queue', payload, { exchange: '' });

      assert.deepEqual(sent, { exchange: '', routingKey: 'destination.queue', timeout: 5000, payload });
    });

    it('uses the requested exchange and timeout', async () => {
      let sent: unknown;
      const response = { accepted: true };
      const service = createService({ request: async (message: unknown) => { sent = message; return response; } });

      const result = await service.request('events.example', payload, { exchange: 'custom.exchange', timeout: 12000 });

      assert.deepEqual(sent, { exchange: 'custom.exchange', routingKey: 'events.example', timeout: 12000, payload });
      assert.equal(result, response);
    });

    it('keeps the default exchange and timeout when options are omitted', async () => {
      let sent: unknown;
      const service = createService({ request: async (message: unknown) => { sent = message; } });

      await service.request('events.example', payload);

      assert.deepEqual(sent, { exchange: 'amq.direct', routingKey: 'events.example', timeout: 5000, payload });
    });

    it('keeps the default exchange when only a timeout is provided', async () => {
      let sent: unknown;
      const service = createService({ request: async (message: unknown) => { sent = message; } });

      await service.request('events.example', payload, { timeout: 12000 });

      assert.deepEqual(sent, { exchange: 'amq.direct', routingKey: 'events.example', timeout: 12000, payload });
    });

    it('propagates request failures', async () => {
      const failure = new Error('request failed');
      const service = createService({ request: async () => { throw failure; } });

      await assert.rejects(service.request('events.example', payload), error => error === failure);
    });
  });

  describe('publish', () => {
    it('preserves explicit exchange routing and the message payload', async () => {
      let sent: unknown[] = [];
      const service = createService({ publish: async (...args: unknown[]) => { sent = args; } });

      await service.publish('events.example', payload, { exchange: 'custom.exchange' });

      assert.deepEqual(sent, ['custom.exchange', 'events.example', payload]);
    });

    it('preserves default exchange routing', async () => {
      let sent: unknown[] = [];
      const service = createService({ publish: async (...args: unknown[]) => { sent = args; } });

      await service.publish('events.example', payload);

      assert.deepEqual(sent, ['amq.direct', 'events.example', payload]);
    });
  });
});
