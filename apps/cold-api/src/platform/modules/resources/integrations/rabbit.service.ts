import {Injectable} from '@nestjs/common';
import {BaseWorker} from '@coldpbc/nest';
import {RabbitRPC} from '@golevelup/nestjs-rabbitmq';
import {IntegrationsService} from './integrations.service';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(private readonly integrations: IntegrationsService) {
    super(RabbitService.name);
  }

  /**
   * Handles RPC messages received from RabbitMQ.
   *
   * @param data - The data object containing the RPC message.
   * @param data.msg - The RPC message in string format.
   *
   * @return - A Promise that resolves to the response of the RPC message.
   *          The response will be of type unknown.
   *          If the RPC message is valid and the action is recognized, the response will be the result of the corresponding action.
   *          If the RPC message is invalid or the action is unknown, an error response will be returned.
   */
  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: `cold.integrations.registration`,
    queue: `cold.integrations.registration`,
    allowNonJsonMessages: false,
  })
  async subscribe(data: { msg: string }): Promise<any> {
    try {
      const parsed = typeof data.msg === 'string' ? JSON.parse(data.msg) : data.msg;

      const def = await this.integrations.registerService(parsed.name, parsed.type, parsed.label, parsed.definition);

      return def;
    } catch (err) {
      this.logger.error(err.message, { error: err, data: JSON.parse(data.msg) });

      return err;
    }
  }
}
