// OrganizationFacility Hooks
import { CreateOrUpdateHookParams, DeleteHookParams, ReadHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationFacility } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';

// These will be used at some point
import { setEntityDefaults } from '../../libs/utilities/entity_utils';

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

		setEntityDefaults(args, GuidPrefixes.OrganizationFacility);

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
