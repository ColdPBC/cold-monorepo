import { AmqpConnection, RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker } from '../worker';

export enum WorkerTypes {
  PLATFORM = 'platform',
  PROVIDER = 'provider',
  AFFILIATE = 'affiliate',
  CORE = 'core',
}

@Global()
@Injectable()
export class ColdRabbitService extends BaseWorker implements OnModuleInit {
  public registered = false;
  client: AmqpConnection | null = null;
  definition: any;

  constructor(definition: any) {
    super(ColdRabbitService.name);
    this.initializeExitHandlers();

    this.definition = definition;
  }

  async onModuleInit() {
    await this.register_service(this.definition);
  }

  public async register_service(definition: any): Promise<void> {
    this.client = await RabbitMQModule.AmqpConnectionFactory(ColdRabbitService.getRabbitConfig());
    let routingKey: string;

    switch (definition.type) {
      case WorkerTypes.PLATFORM:
        routingKey = 'cold.platform.registration';
        break;
      case WorkerTypes.PROVIDER:
        routingKey = 'cold.provider.registration';
        break;
      case WorkerTypes.AFFILIATE:
        routingKey = 'cold.affiliate.registration';
        break;
      case WorkerTypes.CORE:
        routingKey = 'cold.core.registration';
        break;
      default:
        throw new Error(`Unknown WorkerType specified: ${definition.type}`);
    }

    const response = await this.client.request({
      exchange: 'amq.direct',
      routingKey: routingKey,
      payload: { msg: definition },
    });

    this.logger.info('service registration sent', { response, tags: this.tags });
    this.registered = true;
  }

  public async disconnect(): Promise<void> {
    await this.client?.managedConnection.close();
    this.logger.warn(`rabbit connection closed`);
  }

  /***
   * Publish message to rabbit
   * @param data
   * @param routingKey
   * @param exchange
   */
  public async publish(data: any, routingKey = `yardstik.logs`, exchange = 'amq.direct'): Promise<void> {
    try {
      await this.client?.publish(exchange, routingKey, { msg: data });
      this.logger.info(`message published to ${routingKey.toLowerCase()}`, { ...data });
    } catch (err: any) {
      this.logger.error(err.messsage, { error: err });
    }
  }

  /***
   * Create RPC message to rabbit
   * @param routingKey
   * @param data
   * @param exchange
   */
  public async request(routingKey: string, data: any, exchange = 'amq.direct'): Promise<any> {
    try {
      if (this.client?.managedConnection) {
        return;
      }
      const response = await this.client?.request({
        exchange: exchange,
        routingKey: routingKey,
        payload: { msg: data },
      });

      this.logger.info(`message published to ${routingKey.toLowerCase()}`, { ...data });

      return response;
    } catch (err: any) {
      this.logger.error(err.messsage, { error: err });
    }
  }

  private async exitHandler(options: any, exitCode: number) {
    if (options.cleanup) {
      this.logger.warn('disconnecting from rabbit...');
      await this.disconnect();
      this.logger.warn(`done!`);
    }

    if (exitCode || exitCode === 0) {
      this.logger.warn(`received ${exitCode}`);
    }

    if (options.exit) {
      this.logger.warn(`shutting down...`);
      process.exit();
    }
  }

  private initializeExitHandlers() {
    //do something when app is closing
    process.on('exit', this.exitHandler.bind(this, { cleanup: true }));

    //catches ctrl+c event
    process.on('SIGINT', this.exitHandler.bind(this, { cleanup: true, exit: true }));

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', this.exitHandler.bind(this, { exit: true }));
    process.on('SIGUSR2', this.exitHandler.bind(this, { exit: true }));

    //catches uncaught exceptions
    process.on('uncaughtException', this.exitHandler.bind(this, { cleanup: true, exit: true }));
  }

  static getRabbitConfig(): RabbitMQConfig {
    return {
      uri: process.env['RABBIT_MQ_URL'] || 'amqp://localhost:5672',
      connectionManagerOptions: {
        heartbeatIntervalInSeconds: 15,
        reconnectTimeInSeconds: 3,
        connectionOptions: {
          clientProperties: {
            connection_name: `${process.env['DD_SERVICE']}`,
          },
        },
      },
      registerHandlers: true,
      connectionInitOptions: { wait: true, timeout: 3000 },
      prefetchCount: 1,
    };
  }
}
