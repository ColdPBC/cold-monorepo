
// ComplianceSectionGroup Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ComplianceSectionGroup } from '../postgresql';
import { GuidPrefixes } from '../../libs/cuid/compliance.enums';
import { Cuid2Generator } from '../../libs/cuid/cuid2-generator.service';
import { set } from 'lodash';

export class ComplianceSectionGroupHooks extends BaseSidecar {
	constructor() {
		super(ComplianceSectionGroup, 'compliance_section_groups');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log('before ComplianceSectionGroup read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log('ComplianceSectionGroup read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log(`before create ComplianceSectionGroup`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["ComplianceSectionGroup"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["ComplianceSectionGroup"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log('ComplianceSectionGroup created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log('before ComplianceSectionGroup update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log('ComplianceSectionGroup updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log('before ComplianceSectionGroup delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		this.logger.log('ComplianceSectionGroup deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
