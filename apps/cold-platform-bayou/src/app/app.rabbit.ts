import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {AuthenticatedUser, BaseWorker} from '@coldpbc/nest';
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
   * @param { user: AuthenticatedUser; data: never; from: string; event: string } msg - The RPC message.
   * @param msg.user - The user that triggered the event
   *
   * @param msg.from - The name of the service that sent the message.
   * @param msg.event - The event that triggered the message
   *
   * @return - A Promise that resolves to the response of the RPC message.
   *          The response will be of type unknown.
   *          If the RPC message is valid and the action is recognized, the response will be the result of the corresponding action.
   *          If the RPC message is invalid or the action is unknown, an error response will be returned.
   */
  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `cold.platform.bayou.rpc`,
    queue: `cold.platform.bayou.rpc`,
    allowNonJsonMessages: false,
  })
  async subscribe(msg: { data: never; from: string; event: string }): Promise<unknown> {
    try {
      this.logger.debug(`RPC Request Received from ${msg.from}`, { ...msg });

      return await this.processMessage(msg.event, msg.from, msg.data);
    } catch (err) {
      this.logger.error(err.message, { err, data: msg.data, from: msg.from, event: msg.event });

      return err;
    }
  }

  /**
   * Handles ASYNC messages received from RabbitMQ.
   *
   * @param msg - The ASYNC message.
   * @param msg.from - The name of the service that sent the message.
   * @param msg.event - The event that triggered the message
   * @param msg.user - The user that triggered the event
   * @param msg.metadata - The metadata associated with the event
   *
   */
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: `cold.platform.bayou`,
    queue: `cold.platform.bayou`,
    allowNonJsonMessages: false,
  })
  async asyncMessage(msg: { user: AuthenticatedUser; data: never; from: string; event: string }): Promise<void | Nack> {
    try {
      this.logger.debug(`ASYNC ${msg.event} triggered by ${msg.user?.coldclimate_claims?.email} Request processed from ${msg.from}`, {
        data: msg.data,
        from: msg.from,
        event: msg.event,
      });

      await this.processMessage(msg.event, msg.from, msg.data);
    } catch (err) {
      this.logger.error(err.message, {
        error: err,
        user: msg.user,
        from: msg.from,
        data: msg.data,
        event: msg.event,
      });

      return new Nack();
    }
  }

  async processMessage(event: string, from: string, data: never) {
    this.logger.info(`Processing ${event} event triggered by ${data['user']['coldclimate_claims']['email']} from ${from}`, { data });

    const user = data['user'];

    switch (event) {
      case 'integration.enabled':
        return await this.bayou.createCustomer(user, data['organization']['id'], data['location_id'], this.bayou.toBayouPayload(data));
      default:
        throw new UnprocessableEntityException(`Unknown event: ${event}`);
    }
  }
}
