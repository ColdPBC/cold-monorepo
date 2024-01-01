import {Injectable} from '@nestjs/common';
import {BackOffStrategies, BaseWorker} from '@coldpbc/nest';
import {Nack, RabbitRPC, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {ClimatiqService} from '../climatiq/climatiq.service';
import {InjectQueue} from '@nestjs/bull';
import {Queue} from 'bull';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(private readonly ClimatiqService: ClimatiqService, @InjectQueue('climatiq') private queue: Queue) {
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
    routingKey: `cold.platform.climatiq.rpc`,
    queue: `cold.platform.climatiq.rpc`,
    allowNonJsonMessages: false,
  })
  async handleRPCMessages(msg: { event: string; data: never; from: string }): Promise<unknown> {
    try {
      const parsed = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
      this.logger.debug(`RPC Request Received from rabbit`, parsed);
      const job = await this.queue.add(parsed, { backoff: BackOffStrategies.EXPONENTIAL });
      this.logger.info(`climatiq job added to queue`, { job });
      return job;
    } catch (err) {
      this.logger.error(err.message, { error: err, data: JSON.parse(msg.data) });
      return new Nack();
    }
  }

  /**
   * let response: Observable<AxiosResponse<unknown>>;
   *
   *       switch (parsed.action) {
   *         case 'getComputeMetadata':
   *           response = await this.ClimatiqService.getComputeMetadata();
   *           return response;
   *         case 'getEmissionEstimate':
   *           response = await this.ClimatiqService.getEmissionEstimate(parsed.data);
   *           return response;
   *         default:
   *           return new UnprocessableEntityException(`Unknown action specified: ${parsed.action}`);
   *       }
   */

  /**
   * Handles async messages received from RabbitMQ.
   *
   * @param {object} msg - The data object containing the message.
   * @param {string} msg.data - The message received from RabbitMQ.
   * @param {string} msg.from - The name of the service that sent the message.
   * @param {string} msg.action - The action to be performed.
   *
   * @returns {Promise<unknown>} - A Promise representing the result of handling the message.
   */
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: `cold.platform.climatiq`,
    queue: `cold.platform.climatiq`,
    allowNonJsonMessages: false,
  })
  async handleAsyncMessages(msg: { event: string; data: string; from: string }): Promise<unknown> {
    try {
      const parsed = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
      this.logger.info(`Async rabbit request received from ${msg.from}`, { parsed, from: msg.from });
      const job = await this.queue.add(msg.event, parsed, { backoff: BackOffStrategies.EXPONENTIAL });
      this.logger.info(`Job added to ${job.queue['keyPrefix']} ${job.queue.name} ${job.name} queue`, {
        id: job.id,
        data: job.data,
        from: msg.from,
      });
    } catch (err) {
      this.logger.error(err.message, { ...msg });
      return new Nack();
    }
  }
}
