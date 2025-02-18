
// OrganizationComplianceAiResponse Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceAiResponse } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class OrganizationComplianceAiResponseHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceAiResponse, 'organization_compliance_ai_responses');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log('before OrganizationComplianceAiResponse read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponse read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceAiResponse`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationComplianceAiResponse"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationComplianceAiResponse"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponse created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log('before OrganizationComplianceAiResponse update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponse updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log('before OrganizationComplianceAiResponse delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceAiResponse, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponse deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
