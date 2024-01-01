import { AmqpConnection, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker } from '../worker';
import { ConfigService } from '@nestjs/config';

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
  definition: any;

  constructor(private readonly config: ConfigService, private readonly client: AmqpConnection) {
    super(ColdRabbitService.name);
  }

  override async onModuleInit(): Promise<void> {
    await this.initializeExitHandlers();
  }

  /**
   * Registers a service with the given definition.
   *
   * @return {Promise<void>} - A promise that resolves to void when the service registration is complete.
   * @throws {Error} - If an unknown WorkerType is specified in the definition.
   * @param pkg
   */
  public async register_service(pkg: { name: string; label: string; service_type: WorkerTypes; definition: any }): Promise<void> {
    try {
      this.definition = pkg.definition;

      await this.publish(
        'cold.service_definitions.registration',
        {
          name: pkg.name,
          label: pkg.label,
          type: pkg.service_type,
          definition: pkg.definition,
        },
        'service_started',
      );

      this.registered = true;
    } catch (err: any) {
      this.logger.error(err.message, { error: err });
    }
  }

  /**
   * Disconnects the RabbitMQ connection.
   *
   * @returns {Promise<void>} A Promise that resolves once the connection is closed.
   */
  public async disconnect(): Promise<void> {
    if (!this.client?.managedConnection?.isConnected()) {
      await this.client?.managedConnection.close();
    }
    //this.logger.info(`rabbit connection closed`);
  }

  /**
   * Publishes a message to a specified exchange with a given routing key.
   *
   * @param {string} routingKey - The routing key for the message.
   * @param {Object} [data] - The data to be included in the message.
   * @param {string} event - The event to be included in the message.
   * @param {string} [exchange='amq.direct'] - (Optional) The exchange to publish the message to.
   * @returns {Promise<string>} A promise that resolves to 'success' if the message was successfully published, or an error message otherwise.
   */
  public async publish(routingKey: string, data: any, event: string, exchange = 'amq.direct'): Promise<string> {
    try {
      await this.client?.publish(exchange, routingKey, {
        data,
        event: event,
        from: this.config.getOrThrow('DD_SERVICE'),
      });

      this.logger.info(`message published to ${routingKey.toLowerCase()}`, { ...data });

      await this.disconnect();

      return 'success';
    } catch (err: any) {
      this.logger.error(err.messsage, { error: err });
      return err.message;
    }
  }

  /***
   * Create RPC message to rabbit
   * @param routingKey
   * @param data
   * @param event
   * @param exchange
   */
  public async request(routingKey: string, data: any, event: string, exchange = 'amq.direct'): Promise<any> {
    try {
      if (this.client?.managedConnection) {
        return;
      }
      const response = await this.client?.request({
        exchange: exchange,
        routingKey: routingKey,
        payload: { msg: { data, event, from: this.config.getOrThrow('DD_SERVICE') } },
      });

      this.logger.info(`message published to ${routingKey.toLowerCase()}`, { ...data });

      await this.client?.managedConnection.close();
      return response;
    } catch (err: any) {
      this.logger.error(err.messsage, { error: err });
    }
  }

  private async exitHandler(options: any, exitCode: number) {
    if (options.cleanup) {
      //this.logger.warn('disconnecting from rabbit...');
      await this.disconnect();
      this.logger.info(`done!`);
    }

    if (exitCode || exitCode === 0) {
      this.logger.warn(`received ${exitCode}`);
    }

    if (options.exit) {
      this.logger.warn(`shutting down...`);
      process.exit();
    }
  }

  private async initializeExitHandlers() {
    //do something when app is closing
    process.on('exit', this.exitHandler.bind(this, { cleanup: true }));

    //catches ctrl+c event
    process.on('SIGINT', this.exitHandler.bind(this, { exit: true }));

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', this.exitHandler.bind(this, { exit: true }));
    process.on('SIGUSR2', this.exitHandler.bind(this, { exit: true }));
    //catches uncaught exceptions
    process.on('uncaughtException', this.exitHandler.bind(this, { cleanup: false, exit: false }));
  }

  static getRabbitConfig(): RabbitMQConfig {
    return {
      uri: process.env['RABBIT_MQ_URL'] || 'amqp://localhost:5672',
      connectionManagerOptions: {
        heartbeatIntervalInSeconds: 30,
        reconnectTimeInSeconds: 3,
        connectionOptions: {
          clientProperties: {
            connection_name: `${process.env['DD_SERVICE']}`,
          },
        },
      },
      registerHandlers: true,
      connectionInitOptions: { wait: false, timeout: 3000 },
      prefetchCount: 1,
    };
  }
}
