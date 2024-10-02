// OrganizationFacility Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { set } from 'lodash';
import { OrganizationFacility } from '../postgresql';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';

// These will be used at some point
import { WorkerLogger } from '../../libs/logger';
import { getConnection } from '../../database.config';
import { MikroBackendProvider } from '@exogee/graphweaver-mikroorm';
import { MQTTPayloadType, MqttService } from '../../libs/mqtt/mqtt.service';

export class OrganizationFacilityHooks extends BaseSidecar {
	constructor() {
		super(OrganizationFacilityHooks.name, OrganizationFacility);
	}

	async beforeReadHook(params: ReadHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log(`before create facility hook`, { user: params.context.user, arguments: params.args });
		const { context, args } = params;
		for (const item of args.items) {
			const today = new Date();
			const year = today.getFullYear();
			const month = today.getMonth();
			const day = today.getDate();
			const hours = today.getHours();
			const minutes = today.getMinutes();
			const seconds = today.getSeconds();
			const milliseconds = today.getMilliseconds();

			set(item, 'createdAt', new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds)).toISOString());
			set(item, 'updatedAt', new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds)).toISOString());
			set(item, 'deleted', false);
			set(item, 'id', new Cuid2Generator(GuidPrefixes.OrganizationFacility).scopedId);
		}
		console.log(args);
		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}
}
