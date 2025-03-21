import { AmqpConnection, RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { BaseWorker } from '../worker';
import { RabbitMessagePayload } from './rabbit.types';
import { service_definitions } from '../../validation/generated/modelSchema/service_definitionsSchema';
import { omit } from 'lodash';
import { ConfigService } from '@nestjs/config';

export enum WorkerTypes {
	PLATFORM = 'platform',
	PROVIDER = 'provider',
	AFFILIATE = 'affiliate',
	CORE = 'core',
}

export type RabbitMessageOptions = {
	exchange?: string;
	timeout?: number;
};

@Global()
@Injectable()
export class ColdRabbitService extends BaseWorker implements OnModuleInit {
	constructor(private readonly client: AmqpConnection, readonly config: ConfigService) {
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
	 * @param svc
	 */
	public async register_service(svc: { name: string; label: string; service_type: WorkerTypes; definition: service_definitions }): Promise<service_definitions> {
		try {
			this.logger.info('Registering service with COLD_API', { ...svc });
			const response = await this.request(
				'cold.service_definitions',
				{
					data: svc,
					event: 'service_started',
					from: svc.name,
				},
				{
					exchange: 'amq.direct',
					timeout: 30000,
				},
			);

			return response;
		} catch (err: any) {
			this.logger.error(err.message, { error: err });

			throw err;
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
	 * Publishes an async message to a specified exchange with a given routing key.
	 *
	 * @param {string} routingKey
	 * @param payload
	 * @param {RabbitMessageOptions} options
	 * @returns {Promise<void>}
	 * @throws {Error}
	 */
	public async publish(routingKey: string, payload: RabbitMessagePayload, options?: RabbitMessageOptions): Promise<void> {
		await this.client.publish(options?.exchange || 'amq.direct', routingKey, {
			...payload,
		});

		this.logger.info(`message published to ${routingKey.toLowerCase()}`, { ...omit(payload.data, ['survey', 'surveys', 'definition']) });

		//await this.disconnect();
	}

	/***
	 * Publish an RPC message to rabbit
	 * @param {string} routingKey
	 * @param payload
	 * @param {RabbitMessageOptions} options
	 * @returns {any}
	 * @throws {Error}
	 */
	public async request(routingKey: string, payload: RabbitMessagePayload, options?: RabbitMessageOptions): Promise<any> {
		try {
			const requestBody = {
				exchange: 'amq.direct',
				routingKey: routingKey,
				timeout: options?.timeout || 5000,
				payload,
			};
			const response = await this.client?.request(requestBody);

			this.logger.info(`message published to ${routingKey.toLowerCase()}`, { ...omit(requestBody.payload.data, ['survey', 'surveys', 'definition']) });

			return response;
		} catch (err: any) {
			this.logger.error(err.messsage, { error: err });
			throw err;
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

	static async getRabbitConfig(rabbit_url?: string): Promise<RabbitMQConfig> {
		const url = rabbit_url ? rabbit_url : process.env['RABBITMQ_URL'];
		if (!url) {
			throw new Error('RABBITMQ_URL is required');
		}
		return {
			uri: url,
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
			enableControllerDiscovery: false,
		};
	}
}
