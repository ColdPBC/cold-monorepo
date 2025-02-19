import { WorkerLogger } from '../libs/logger';
import { MqttActionEnum, MqttService, mqttService, MqttStatusEnum } from '../libs/mqtt/mqtt.service';
import { Cuid2Generator } from '../libs/cuid/cuid2-generator.service';
import { CreateOrUpdateHookParams, DeleteHookParams, ReadHookParams } from '@exogee/graphweaver';
import { OrgContext } from '../libs/acls/acl_policies';
import { merge, set } from 'lodash';
import { v4 } from 'uuid';
import { GuidPrefixes } from '../libs/cuid/compliance.enums';
import { Organization } from './postgresql';
import { EntityManager } from '@mikro-orm/core';

export class BaseSidecar {
	logger;
	mqtt: MqttService;
	entityName: string;
	secrets: any;
	isOrgScoped: boolean;
	orgScopedTables = [
		'actions',
		'attribute_assurances',
		'category_data',
		'facility_footprints',
		'integrations',
		'materials',
		'oranization_compliance',
		'organization_compliance_ai_response_files',
		'organization_ai_responses',
		'organization_compliance_statuses',
		'organization_compliances_old',
		'organization_facilities',
		'organizaton_files',
		'organizations',
		'products',
		'survey_data',
		'survey_definitions',
		'survey_status',
		'sustainability_attributes',
		'utility_bills',
	];
	constructor(readonly entity: any, readonly tableName: string) {
		this.logger = new WorkerLogger('organization');
		this.mqtt = mqttService;
		this.entityName = this.entity.name;
		this.isOrgScoped = this.orgScopedTables.includes(this.tableName);
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
		this.logger.log(`after read ${this.entityName} hook`, { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		if (params.args.items.length > 0) {
			this.logger.log(`before create ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

			for (const item of params.args.items) {
				let id: string;
				if (GuidPrefixes[`${this.entity.name}` as keyof typeof GuidPrefixes]) {
					id = new Cuid2Generator(GuidPrefixes[`${this.entity.name}` as keyof typeof GuidPrefixes]).scopedId;
				} else {
					id = v4();
				}

				set(item, 'id', id);
				set(item, 'updatedAt', new Date());
				set(item, 'createdAt', new Date());

				if (this.isOrgScoped) {
					if (!params.context.user.isColdAdmin && item.organization?.id !== params.context.user.organization?.id) {
						set(item, 'organization.id', params.context.user.organization?.id);
					}
				}
			}
		}

		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		if (params.args.items.length > 0) {
			const payload = {
				action: MqttActionEnum.CREATE,
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

		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		if (params.args.items.length === 0) {
			this.logger.log(`before update ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

			for (const item of params.args.items as (typeof this.entity)[]) {
				if (item.metadata) {
					const em = this.entity.prototype.__factory.em as EntityManager;
					const response = await em.findOneOrFail(Organization, { id: item.id });
					// parse the metadata only if it's type is a string
					item.metadata = merge(response.metadata, typeof item.metadata === 'string' ? JSON.parse(item.metadata) : item.metadata);
				}

				set(item, 'updatedAt', new Date());
			}
		}

		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof this.entity, OrgContext>) {
		if (params.args.items.length > 0) {
			this.logger.log(`after update ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

			const payload = {
				action: MqttActionEnum.UPDATE,
				status: MqttStatusEnum.COMPLETE,
				data: params as any,
				swr_key: this.entity.name,
				org_id: params.context.user.organization.id,
				user: params.context.user.email,
			};

			await this.mqtt.publishMQTT(payload, params);

			this.logger.info(`Sent MQTT Message: Updated ${params.args.items.length} ${this.entityName}`);
		}
		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`before delete ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof this.entity, OrgContext>) {
		this.logger.log(`after delete ${this.entityName} hook`, { user: params.context.user, arguments: params.args });

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
