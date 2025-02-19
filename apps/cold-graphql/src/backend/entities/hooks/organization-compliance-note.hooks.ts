
// OrganizationComplianceNote Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceNote } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class OrganizationComplianceNoteHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceNote, 'organization_compliance_notes');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log('before OrganizationComplianceNote read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log('OrganizationComplianceNote read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceNote`, { user: params.context.user, arguments: params.args });
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log('OrganizationComplianceNote created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log('before OrganizationComplianceNote update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log('OrganizationComplianceNote updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log('before OrganizationComplianceNote delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceNote, OrgContext>) {
		this.logger.log('OrganizationComplianceNote deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
