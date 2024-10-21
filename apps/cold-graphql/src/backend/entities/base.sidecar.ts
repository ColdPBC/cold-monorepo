import { WorkerLogger } from '../libs/logger';
import { MqttActionEnum, MqttService, mqttService, MqttStatusEnum } from '../libs/mqtt/mqtt.service';
import { Cuid2Generator } from '../libs/cuid/cuid2-generator.service';
import { CreateOrUpdateHookParams, DeleteHookParams, ReadHookParams } from '@exogee/graphweaver';
import { OrgContext } from '../libs/acls/acl_policies';
import { set } from 'lodash';
import { GuidPrefixes } from '../libs/cuid/compliance.enums';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { connection } from '../database';
import { getConnection } from '../database.config';

export class BaseSidecar {
	logger;
	mqtt: MqttService;
	entityName: string;
	secrets: any;
	provider: MikroBackendProvider<any>;

	constructor(readonly entity: any, readonly tableName: string) {
		this.logger = new WorkerLogger('organization');
		this.mqtt = mqttService;
		this.entityName = this.entity.name;
		this.provider = new MikroBackendProvider(this.entity, getConnection());
	}

	/**
	 * Before Read Hook
	 * @param params
	 */
	async beforeReadHook(params: ReadHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`before read ${this.entityName} hook`, { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof this.entity, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		this.logger.log(`after read ${this.entityName} hook`, { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`before create ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		for (const item of params.args.items) {
			set(item, 'id', new Cuid2Generator(GuidPrefixes[`${this.entity.name}` as keyof typeof GuidPrefixes]).scopedId);
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());

			if (Object.prototype.hasOwnProperty.call(this.entity.prototype, 'organization')) {
				if (!params.context.user.isColdAdmin) {
					set(item, 'organization.id', params.context.user.organization?.id);
				}
			}
		}

		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		const payload = {
			action: MqttActionEnum.DELETE,
			status: MqttStatusEnum.COMPLETE,
			data: params as any,
			swr_key: this.entity.name,
			org_id: params.context.user.organization.id,
			user: params.context.user.email,
		};

		await this.mqtt.publishMQTT(payload, params);

		this.logger.info(`Created ${this.entityName}`, { params, payload });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`before update ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		if (this.secrets) {
			await this.mqtt.connect();
		}

		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}

		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`after update ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		if (this.secrets) {
			await this.mqtt.connect();
		}

		const payload = {
			action: MqttActionEnum.DELETE,
			status: MqttStatusEnum.COMPLETE,
			data: params as any,
			swr_key: this.entity.name,
			org_id: params.context.user.organization.id,
			user: params.context.user.email,
		};

		await this.mqtt.publishMQTT(payload, params);

		this.logger.info(`Sent MQTT Message: Updated ${params.args.items.length} ${this.entityName}`);

		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`before delete ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`after delete ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		if (this.secrets) {
			await this.mqtt.connect();
		}

		const payload = {
			action: MqttActionEnum.DELETE,
			status: MqttStatusEnum.COMPLETE,
			data: params as any,
			swr_key: this.entity.name,
			org_id: params.context.user.organization.id,
			user: params.context.user.email,
		};

		await this.mqtt.publishMQTT(payload, params);

		this.logger.info(`Sent MQTT Message: Deleted ${this.entityName}`, { params, payload });

		return params;
	}
}
