
// OrganizationComplianceStatus Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceStatus } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class OrganizationComplianceStatusHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceStatus, 'organization_compliance_statuses');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log('before OrganizationComplianceStatus read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log('OrganizationComplianceStatus read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceStatus`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationComplianceStatus"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationComplianceStatus"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log('OrganizationComplianceStatus created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log('before OrganizationComplianceStatus update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log('OrganizationComplianceStatus updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log('before OrganizationComplianceStatus delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceStatus, OrgContext>) {
		this.logger.log('OrganizationComplianceStatus deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
