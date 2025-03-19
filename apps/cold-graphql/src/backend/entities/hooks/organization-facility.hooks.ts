
// OrganizationFacility Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationFacility } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class OrganizationFacilityHooks extends BaseSidecar {
	constructor() {
		super(OrganizationFacility, 'organization_facilities');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('before OrganizationFacility read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('OrganizationFacility read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log(`before create OrganizationFacility`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('OrganizationFacility created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('before OrganizationFacility update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('OrganizationFacility updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('before OrganizationFacility delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationFacility, OrgContext>) {
		this.logger.log('OrganizationFacility deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
