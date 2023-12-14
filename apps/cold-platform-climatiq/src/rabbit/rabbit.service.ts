import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import {BaseWorker} from '@coldpbc/nest';
import {Nack, RabbitRPC, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {ClimatiqService} from '../climatiq/climatiq.service';
import {AxiosResponse} from 'axios';
import {Observable} from 'rxjs';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(private readonly ClimatiqService: ClimatiqService) {
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
    routingKey: `cold.platform.climatiq.rpc`,
    queue: `cold.platform.climatiq.rpc`,
    allowNonJsonMessages: false,
  })
  async handleRPCMessages(data: { msg: string }): Promise<unknown> {
    try {
      const parsed = JSON.parse(data.msg);

      this.logger.debug(`RPC Request Received from rabbit`, parsed);
      let response: Observable<AxiosResponse<unknown>>;

      switch (parsed.action) {
        case 'getComputeMetadata':
          response = await this.ClimatiqService.getComputeMetadata();
          return response;
        default:
          return new UnprocessableEntityException(`Unknown action specified: ${parsed.action}`);
      }
    } catch (err) {
      this.logger.error(err.message, { error: err, data: JSON.parse(data.msg) });
      return new Nack();
    }
  }

  /**
   * Handles async messages received from RabbitMQ.
   *
   * @param {object} data - The data object containing the message.
   * @param {string} data.msg - The message received from RabbitMQ.
   *
   * @returns {Promise<unknown>} - A Promise representing the result of handling the message.
   */
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: `cold.platform.climatiq`,
    queue: `cold.platform.climatiq`,
    allowNonJsonMessages: false,
  })
  async handleAsyncMessages(data: { msg: string }): Promise<unknown> {
    try {
      this.logger.debug(`Async Request Received from rabbit`, JSON.parse(data.msg));
      return new Nack();
    } catch (err) {
      this.logger.error(err.message, { error: err, data: JSON.parse(data.msg) });
      return new Nack();
    }
  }
}
