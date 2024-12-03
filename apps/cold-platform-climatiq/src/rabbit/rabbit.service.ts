import { Injectable } from '@nestjs/common';
import { BackOffStrategies, BaseWorker, RabbitMessagePayload } from '@coldpbc/nest';
import { Nack, RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ClimatiqService } from '../climatiq/climatiq.service';

/**
 * RabbitService class.
 */
@Injectable()
export class RabbitService extends BaseWorker {
	constructor(@InjectQueue('climatiq') private queue: Queue, private readonly climatiq: ClimatiqService) {
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
		queue: `cold.platform.climatiq`,
		allowNonJsonMessages: false,
	})
	async handleRPCMessages(msg: RabbitMessagePayload): Promise<unknown> {
		try {
			const parsed = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
			this.logger.debug(`received RPC ${msg.event} request from ${msg.from}`, parsed);
			const job = await this.queue.add(parsed, { backoff: BackOffStrategies.EXPONENTIAL });
			this.logger.info(`${job.name} job added to ${job.queue['keyPrefix']} ${job.queue.name} queue`, {
				id: job.id,
				data: job.data,
				from: msg.from,
			});
			return job;
		} catch (err) {
			this.logger.error(err.message, { error: err, data: JSON.parse(msg.data) });
			return new Nack();
		}
	}

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
	async handleAsyncMessages(msg: RabbitMessagePayload): Promise<unknown> {
		try {
			const parsed = typeof msg.data == 'string' ? JSON.parse(msg.data) : msg.data;
			this.logger.info(`received async ${msg.event} request from ${msg.from}`, { parsed, from: msg.from });

			const job = await this.queue.add(msg.event, parsed, { backoff: { type: BackOffStrategies.EXPONENTIAL } });
			this.logger.info(`${job.name} job added to ${job.queue['keyPrefix']} ${job.queue.name} queue`, {
				id: job.id,
				event: msg.event,
				from: msg.from,
				data: job.data,
			});
			return job;
		} catch (err) {
			this.logger.error(err.message, { ...msg });
			return new Nack(true);
		}
	}
}
