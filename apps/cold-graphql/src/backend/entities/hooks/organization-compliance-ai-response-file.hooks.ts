
// OrganizationComplianceAiResponseFile Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceAiResponseFile } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class OrganizationComplianceAiResponseFileHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceAiResponseFile, 'organization_compliance_ai_response_files');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log('before OrganizationComplianceAiResponseFile read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponseFile read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceAiResponseFile`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationComplianceAiResponseFile"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationComplianceAiResponseFile"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponseFile created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log('before OrganizationComplianceAiResponseFile update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponseFile updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log('before OrganizationComplianceAiResponseFile delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceAiResponseFile, OrgContext>) {
		this.logger.log('OrganizationComplianceAiResponseFile deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
