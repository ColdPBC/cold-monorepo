
// OrganizationComplianceResponse Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceResponse } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class OrganizationComplianceResponseHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceResponse, 'organization_compliance_responses');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log('before OrganizationComplianceResponse read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceResponse read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceResponse`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationComplianceResponse"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationComplianceResponse"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceResponse created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log('before OrganizationComplianceResponse update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceResponse updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log('before OrganizationComplianceResponse delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceResponse deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
