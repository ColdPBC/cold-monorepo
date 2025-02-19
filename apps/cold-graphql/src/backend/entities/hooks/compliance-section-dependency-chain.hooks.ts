
// ComplianceSectionDependencyChain Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ComplianceSectionDependencyChain } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class ComplianceSectionDependencyChainHooks extends BaseSidecar {
	constructor() {
		super(ComplianceSectionDependencyChain, 'compliance_section_dependency_chains');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log('before ComplianceSectionDependencyChain read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceSectionDependencyChain read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log(`before create ComplianceSectionDependencyChain`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["ComplianceSectionDependencyChain"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["ComplianceSectionDependencyChain"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceSectionDependencyChain created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log('before ComplianceSectionDependencyChain update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceSectionDependencyChain updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log('before ComplianceSectionDependencyChain delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceSectionDependencyChain deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
