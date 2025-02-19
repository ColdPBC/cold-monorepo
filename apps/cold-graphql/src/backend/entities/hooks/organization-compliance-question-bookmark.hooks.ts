
// OrganizationComplianceQuestionBookmark Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { OrganizationComplianceQuestionBookmark } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class OrganizationComplianceQuestionBookmarkHooks extends BaseSidecar {
	constructor() {
		super(OrganizationComplianceQuestionBookmark, 'organization_compliance_question_bookmarks');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log('before OrganizationComplianceQuestionBookmark read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log('OrganizationComplianceQuestionBookmark read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log(`before create OrganizationComplianceQuestionBookmark`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["OrganizationComplianceQuestionBookmark"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["OrganizationComplianceQuestionBookmark"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log('OrganizationComplianceQuestionBookmark created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log('before OrganizationComplianceQuestionBookmark update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log('OrganizationComplianceQuestionBookmark updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log('before OrganizationComplianceQuestionBookmark delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof OrganizationComplianceQuestionBookmark, OrgContext>) {
		this.logger.log('OrganizationComplianceQuestionBookmark deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
