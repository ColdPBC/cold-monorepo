
// OrganizationCompliancesOld Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationCompliancesOld } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class OrganizationCompliancesOldHooks extends BaseSidecar {
	constructor() {
		super(OrganizationCompliancesOld, 'organization_compliances_old');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log('before OrganizationCompliancesOld read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log('OrganizationCompliancesOld read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log(`before create OrganizationCompliancesOld`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationCompliancesOld"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationCompliancesOld"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log('OrganizationCompliancesOld created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log('before OrganizationCompliancesOld update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log('OrganizationCompliancesOld updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log('before OrganizationCompliancesOld delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		this.logger.log('OrganizationCompliancesOld deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
