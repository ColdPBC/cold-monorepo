// Organization Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { Organization } from './organization';

export class OrganizationHooks extends BaseSidecar {
	constructor() {
		super(OrganizationHooks.name, Organization);
	}

	async beforeReadHook(params: ReadHookParams<typeof Organization, OrgContext>) {
		//this.logger.log('beforeReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterReadHook(params: ReadHookParams<typeof Organization, OrgContext>) {
		this.logger.log('afterReadHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log('beforeCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterCreateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log('afterCreateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log('beforeUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof Organization, OrgContext>) {
		this.logger.log('afterUpdateHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async beforeDeleteHook(params: DeleteHookParams<typeof Organization, OrgContext>) {
		this.logger.log('beforeDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}

	async afterDeleteHook(params: DeleteHookParams<typeof Organization, OrgContext>) {
		this.logger.log('afterDeleteHook', { user: params.context.user, arguments: params.args });
		return params;
	}
}
