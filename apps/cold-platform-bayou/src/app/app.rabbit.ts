import { Injectable } from '@nestjs/common';
import { BaseWorker, IAuthenticatedUser } from '@coldpbc/nest';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.decorators';
import { Job, Queue } from 'bull';
import { InjectQueue, OnQueueActive, OnQueueCompleted } from '@nestjs/bull';
import { BayouService } from './bayou.service';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
  constructor(@InjectQueue('bayou') private queue: Queue, private readonly bayou: BayouService) {
    super(RabbitService.name);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} with data ${job.data}...`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Job ${job.id} of type ${job.name} completed`, { data: job.data });
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
  async subscribe(msg): Promise<unknown> {
    try {
      const parsed = msg;
      this.logger.debug(`RPC Request Received from ${msg.from}`, { ...msg });

      switch (parsed.event) {
        case 'organization.deleted': {
          this.logger.warn(`Organization deleted event received from ${msg.from}`, {
            data: msg.data,
            from: msg.from,
            event: msg.event,
          });
          return {
            status: 'done',
            message: 'Organization deleted event received, but Bayou does not support deleting accounts through their api',
          };
        }
        case 'facility.integration.enabled':
          return await this.bayou.createCustomer(parsed.user, parsed['organization']['id'], parsed['facility_id'], this.bayou.toBayouPayload(parsed));
        default:
          return new Nack();
      }
    } catch (err) {
      this.logger.error(err.message, { err, data: msg.data, from: msg.from, event: msg.event });

      if (!err.message.includes('already linked for Facility')) {
        const job = await this.queue.add(msg.event, msg, { backoff: { type: 'exponential' } });
        this.logger.info(` ${msg.event} job (${job.id}) created from message received from ${msg.from}`, {
          data: msg.data,
          from: msg.from,
          event: msg.event,
        });
      }

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
  async asyncMessage(msg: { user: IAuthenticatedUser; data: never; from: string; event: string }): Promise<void | Nack> {
    try {
      this.logger.debug(`ASYNC ${msg.event} triggered by ${msg.user?.coldclimate_claims?.email} message processed from ${msg.from}`, {
        data: msg.data,
        from: msg.from,
        event: msg.event,
      });

      switch (msg.event) {
        case 'facility.integration.enabled': {
          const job = await this.queue.add(msg.event, msg.data, { backoff: { type: 'exponential' } });
          this.logger.info(` ${msg.event} job (${job.id}) created from message received from ${msg.from}`, {
            data: msg.data,
            from: msg.from,
            event: msg.event,
          });
          break;
        }
        // event not recognized for this service
        default:
          return new Nack();
      }
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
}
