
// OrganizationComplianceNoteLink Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceNoteLink } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class OrganizationComplianceNoteLinkHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceNoteLink, 'organization_compliance_note_links');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log('before OrganizationComplianceNoteLink read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteLink read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceNoteLink`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationComplianceNoteLink"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationComplianceNoteLink"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteLink created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log('before OrganizationComplianceNoteLink update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteLink updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log('before OrganizationComplianceNoteLink delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceNoteLink, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteLink deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
