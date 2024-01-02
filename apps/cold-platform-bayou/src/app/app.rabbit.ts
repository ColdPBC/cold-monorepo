import {Injectable} from '@nestjs/common';
import {BaseWorker} from '@coldpbc/nest';
import {Nack, RabbitRPC} from '@golevelup/nestjs-rabbitmq';
import {RabbitSubscribe} from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.decorators';
import {BayouService} from './bayou.service';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(private readonly bayou: BayouService) {
    super(RabbitService.name);
  }

  /**
   * Handles RPC messages received from RabbitMQ.
   *
   * @param data.msg - The RPC message in string format.
   *
   * @return - A Promise that resolves to the response of the RPC message.
   *          The response will be of type unknown.
   *          If the RPC message is valid and the action is recognized, the response will be the result of the corresponding action.
   *          If the RPC message is invalid or the action is unknown, an error response will be returned.
   * @param msg
   */
  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `cold.platform.bayou.rpc`,
    queue: `cold.platform.bayou`,
    allowNonJsonMessages: false,
  })
  async subscribe(msg: { data: unknown; from: string; action: string }): Promise<unknown> {
    try {
      const parsed = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
      this.logger.debug(`RPC Request Received from ${msg.from}`, { data: parsed, from: msg.from, action: msg.action });
    } catch (err) {
      this.logger.error(err.message, { err, data: msg.data, from: msg.from, action: msg.action });

      return err;
    }
  }

  /**
   * Handles RPC messages received from RabbitMQ.
   *
   * @param data.msg - The RPC message in string format.
   * @param data.from - The name of the service that sent the message.
   * @param data.action - The action to be performed.
   *
   * @return - A Promise that resolves to the response of the RPC message.
   *          The response will be of type unknown.
   *          If the RPC message is valid and the action is recognized, the response will be the result of the corresponding action.
   *          If the RPC message is invalid or the action is unknown, an error response will be returned.
   * @param msg
   */
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: `cold.platform.bayou`,
    queue: `cold.platform.bayou`,
    allowNonJsonMessages: false,
  })
  async webhooks(msg: { data: unknown; from: string; action: string }): Promise<unknown> {
    try {
      const parsed = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;

      //const def = await this.integrations.registerService(parsed.name, parsed.type, parsed.label, parsed.definition);

      return parsed;
    } catch (err) {
      this.logger.error(err.message, { error: err, from: msg.data, data: msg.data, action: msg.action });

      return new Nack();
    }
  }
}
