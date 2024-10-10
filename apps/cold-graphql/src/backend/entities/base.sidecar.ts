import { WorkerLogger } from '../libs/logger';
import { MqttService, mqttService } from '../libs/mqtt/mqtt.service';
import { Cuid2Generator } from '../libs/cuid/cuid2-generator.service';
import { CreateOrUpdateHookParams, DeleteHookParams, ReadHookParams } from '@exogee/graphweaver';
import { SustainabilityAttribute } from './postgresql';
import { OrgContext } from '../libs/acls/acl_policies';
import { set } from 'lodash';
import { GuidPrefixes } from '../libs/cuid/compliance.enums';

export class BaseSidecar {
	logger;
	mqtt: MqttService;
	entityName: string;
	secrets: any;
	constructor(entityName: string, entity: any) {
		this.logger = new WorkerLogger('organization');
		this.mqtt = mqttService;
		this.entityName = entity.name;
	}

	async beforeReadHook(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log(`before read ${this.entityName} hook`, { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof SustainabilityAttribute, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		this.logger.log(`after read ${this.entityName} hook`, { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log(`before create ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		for (const item of params.args.items) {
			set(item, 'id', new Cuid2Generator(GuidPrefixes[`${this.entityName}` as keyof typeof GuidPrefixes]).scopedId);
			set(item, 'organization.id', params.context.user.organization.id);
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}

		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		if (this.secrets) {
			await this.mqtt.connect();
		}

		this.logger.log(`after create ${this.entityName} hook`, { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log(`before update ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		if (this.secrets) {
			await this.mqtt.connect();
		}

		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}

		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log(`after update ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		if (this.secrets) {
			await this.mqtt.connect();
		}

		for (const item of params.args.items) {
			if (!params.context.user.isColdAdmin) {
				set(item, 'organization.id', params.context.user.organization.id);
			}
			set(item, 'updatedAt', new Date());
		}

		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log(`before delete ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		if (this.secrets) {
			await this.mqtt.connect();
		}
		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof SustainabilityAttribute, OrgContext>) {
		this.logger.log(`after delete ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		if (this.secrets) {
			await this.mqtt.connect();
		}
		return params;
	}
}
