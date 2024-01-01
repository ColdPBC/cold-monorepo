import {Injectable} from '@nestjs/common';
import {BaseWorker} from '@coldpbc/nest';
import {ServiceDefinitionsService} from './service_definitions.service';
import {Nack, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(private readonly serviceDefinitions: ServiceDefinitionsService) {
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
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: `cold.integrations.registration`,
    queue: `cold.integrations.registration`,
    allowNonJsonMessages: false,
  })
  async subscribe(msg: { event: string; data: unknown; from: string }): Promise<any> {
    try {
      this.logger.info(`Received ${msg.event} message from ${msg.from}`, {
        data: msg.data,
        from: msg.from,
        event: msg.event,
      });
      const parsed = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;

      await this.serviceDefinitions.registerService(parsed.name, parsed.type, parsed.label, parsed.definition);
    } catch (err) {
      this.logger.error(err.message, { stack: err.stack, data: msg.data, from: msg.from, event: msg.event });

      return new Nack();
    }
  }
}
