
// OrganizationComplianceNoteFile Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceNoteFile } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class OrganizationComplianceNoteFileHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceNoteFile, 'organization_compliance_note_files');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log('before OrganizationComplianceNoteFile read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteFile read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceNoteFile`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationComplianceNoteFile"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationComplianceNoteFile"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteFile created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log('before OrganizationComplianceNoteFile update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteFile updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log('before OrganizationComplianceNoteFile delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceNoteFile, OrgContext>) {
		this.logger.log('OrganizationComplianceNoteFile deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
