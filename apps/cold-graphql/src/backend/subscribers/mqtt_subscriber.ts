import { EventSubscriber, EventArgs, FlushEventArgs, TransactionEventArgs } from '@mikro-orm/core';
import { BaseSidecar } from '../entities/base.sidecar';
import { MqttService } from '../libs/mqtt/mqtt.service';
import { WorkerLogger } from '../libs/logger'; // Adjust the import path as needed

export class MQTTSubscriber implements EventSubscriber {
	mqtt: MqttService;
	logger: WorkerLogger = new WorkerLogger('MQTTSubscriber');

	constructor() {
		this.mqtt = new MqttService('MQTTSubscriber');
	}

	async init() {
		await this.mqtt.connect();
	}
	// entity life cycle events
	async onLoad<T>(args: EventArgs<T>): Promise<void> {
		this.logger.info(`onLoad: ${args.em.name}`, args.entity);
	}
	async beforeRead<T>(args: EventArgs<T>): Promise<void> {
		this.logger.info(`beforeRead: ${args.em.name}`, args.entity);
	}
	async afterRead<T>(args: EventArgs<T>): Promise<void> {
		this.logger.info(`afterRead: ${args.em.name}`, args.entity);
	}
	async beforeCreate<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`Creating: ${args.em.name}`, args.entity);
	}
	async afterCreate<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`afterCreate: ${args.em.name}`, args.entity);
	}
	async beforeUpdate<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`beforeUpdate: ${args.em.name}`, args.entity);
	}
	async afterUpdate<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`afterUpdate: ${args.em.name}`, args.entity);
	}
	async beforeUpsert<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`beforeUpsert: ${args.em.name}`, args.entity);
	}
	async afterUpsert<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`afterUpsert: ${args.em.name}`, args.entity);
	}
	async beforeDelete<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`beforeDelete: ${args.em.name}`, args.entity);
	}
	async afterDelete<T>(args: EventArgs<T>): Promise<void> {
		this.logger.debug(`afterDelete: ${args.em.name}`, args.entity);
	}

	// flush events
	async beforeFlush<T>(args: FlushEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.uow}`, args);
	}
	async onFlush<T>(args: FlushEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}}`, args);
	}
	async afterFlush<T>(args: FlushEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}`, args);
	}

	// transaction events
	async beforeTransactionStart(args: TransactionEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}`, args);
	}
	async afterTransactionStart(args: TransactionEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}`, args);
	}
	async beforeTransactionCommit(args: TransactionEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}`, args);
	}
	async afterTransactionCommit(args: TransactionEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}`, args);
	}
	async beforeTransactionRollback(args: TransactionEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}`, args);
	}
	async afterTransactionRollback(args: TransactionEventArgs): Promise<void> {
		this.logger.debug(`onLoad: ${args.em.name}`, args);
	}
}
