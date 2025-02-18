import { Injectable } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { LinearService } from './linear.service';
import { processing_status } from '@prisma/client';

/**
 * RabbitService class.
 */
@Injectable()
export class LinearRabbitService extends BaseWorker {
	constructor(private readonly linearService: LinearService) {
		super(LinearRabbitService.name);
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
		routingKey: `cold.core.linear.events`,
		queue: `cold.core.linear.events`,
		allowNonJsonMessages: false,
	})
	async subscribe(msg: { event: string; data: unknown; from: string; isRPC: boolean }): Promise<void | Nack | boolean> {
		try {
			this.logger.info(`Received ${msg.isRPC ? 'RPC' : 'Async'} ${msg.event} message from ${msg.from}`, {
				data: msg.data,
				from: msg.from,
				event: msg.event,
			});
			const parsed = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;

			let issue: any;

			switch (msg.event) {
				case processing_status.MANUAL_REVIEW:
					issue = await this.linearService.createIngestionIssue(parsed);
					break;
				case processing_status.PROCESSING_ERROR:
					issue = await this.linearService.createIngestionFailedIssue(parsed);
					break;
				default:
					this.logger.warn(`Unknown event: ${msg.event}`, { data: msg.data, from: msg.from, event: msg.event });
					return new Nack();
			}

			return issue;
		} catch (err) {
			this.logger.error(err.message, { stack: err.stack, data: msg.data, from: msg.from, event: msg.event });

			return new Nack();
		}
	}
}
