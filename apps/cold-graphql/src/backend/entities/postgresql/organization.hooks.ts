// organization.hooks Sidecar - Entity hooks for organization.hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { OrgContext } from '../../acl_policies';
import { WorkerLogger } from '../../libs/logger';
import { Organization } from './organization';
import { PostgreSqlDriver, ReflectMetadataProvider } from '@mikro-orm/postgresql';
import { entities } from './index';
import { connectionValues } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { connection } from '../../database';
import { DynamicEventSubscriber } from '../../event_subscriber';
import { get, set } from 'lodash';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';

export class OrganizationHooks {
	logger;
	provider;
	entities = entities;
	connection;
	mqtt: MqttService;

	constructor() {
		this.mqtt = new MqttService('Organization');

		this.entities = entities;
		this.connection = {
			connectionManagerId: 'postgresql',
			mikroOrmConfig: {
				driverOptions: {
					connection: process.env.NODE_ENV === 'development' ? {} : { ssl: { rejectUnauthorized: false } },
				},
				entities: entities,
				driver: PostgreSqlDriver,
				metadataProvider: ReflectMetadataProvider,
				...connectionValues(),
				subscribers: [DynamicEventSubscriber],
				pool: { min: 2, max: 50 },
			},
		};

		this.provider = new MikroBackendProvider(Organization, this.connection);
		this.logger = new WorkerLogger('organization');
	}
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.info('beforeCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.info('afterCreateHook', { user: params.context.user, arguments: params.args });

		await this.mqtt.init();

		const payload: MQTTPayloadType = {
			action: 'create',
			status: 'complete',
			org_id: params.context.user.organization.id,
			user: params.context.user,
			swr_key: 'createOrganization',
			data: params,
		};

		this.mqtt.publishMQTT(payload, params.context);

		return params;
	}

	async beforeReadHook(params: ReadHookParams<typeof Organization, OrgContext>) {
		this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });

		if (!params.args.filter) {
			return params;
		}

		if (!params.context.user.roles.includes('cold:admin') && params.context?.organization?.id !== get(params.args, 'filter.id', null)) {
			this.logger.info('User does not have permission to access this organization', params);
			set(params.args, 'filter.id', params?.context?.organization?.id);
		}

		console.info(params);
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof Organization, OrgContext>) {
		this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });

		const payload: MQTTPayloadType = {
			action: 'get',
			status: 'complete',
			org_id: params.context.user.organization.id,
			user: params.context.user,
			swr_key: 'getOrganziation',
			data: params,
		};

		this.mqtt.publishMQTT(payload, params.context);

		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.info('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.info('afterUpdateHook', { user: params.context.user, arguments: params.args });

		const payload: MQTTPayloadType = {
			action: 'update',
			status: 'complete',
			org_id: params.context.user.organization.id,
			user: params.context.user,
			swr_key: 'updateOrganization',
			data: params,
		};

		this.mqtt.publishMQTT(payload, params.context);

		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof Organization, OrgContext>) {
		this.logger.info('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	afterDeleteHook(params: DeleteHookParams<typeof Organization, OrgContext>) {
		this.logger.info('afterDeleteHook', { user: params.context.user, arguments: params.args });

		const payload: MQTTPayloadType = {
			action: 'delete',
			status: 'complete',
			org_id: params.context.user.organization.id,
			user: params.context.user,
			swr_key: 'deleteOrganization',
			data: params,
		};

		this.mqtt.publishMQTT(payload, params.context);

		return params;
	}
}
