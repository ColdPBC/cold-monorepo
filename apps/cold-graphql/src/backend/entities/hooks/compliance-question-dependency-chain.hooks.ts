
// ComplianceQuestionDependencyChain Hooks
import { CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import { BaseSidecar } from '../base.sidecar';
import { OrgContext } from '../../libs/acls/acl_policies';
import { ComplianceQuestionDependencyChain } from '../postgresql';
import { Cuid2Generator, GuidPrefixes } from '@coldpbc/nest';
import { set } from 'lodash';

export class ComplianceQuestionDependencyChainHooks extends BaseSidecar {
	constructor() {
		super(ComplianceQuestionDependencyChain, 'compliance_question_dependency_chains');
	}
	
	async beforeReadHook(params: ReadHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log('before ComplianceQuestionDependencyChain read hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeReadHook(params);
	}

	
	async afterReadHook(params: ReadHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceQuestionDependencyChain read', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterReadHook(params);
		
	}

	
	async beforeCreateHook(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log(`before create ComplianceQuestionDependencyChain`, { user: params.context.user, arguments: params.args });
		for (const item of params.args.items) {
			if(GuidPrefixes["ComplianceQuestionDependencyChain"]) {
				set(item, 'id', new Cuid2Generator(GuidPrefixes["ComplianceQuestionDependencyChain"]).generate().scopedId);
			}
			
			set(item, 'organization.id', params.context.user.organization.id);
			
			set(item, 'updatedAt', new Date());
			set(item, 'createdAt', new Date());
		}
	
	  return super.beforeCreateHook(params);    
	}

	
	async afterCreateHook(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceQuestionDependencyChain created', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterCreateHook(params);
	}

	
	async beforeUpdateHook(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log('before ComplianceQuestionDependencyChain update hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		for (const item of params.args.items) {
			set(item, 'updatedAt', new Date());
		}
		return await super.beforeUpdateHook(params);
	}

	
	async afterUpdateHook(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceQuestionDependencyChain updated', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return await super.afterUpdateHook(params);
	}

	
	async beforeDeleteHook(params: DeleteHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log('before ComplianceQuestionDependencyChain delete hook', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.beforeDeleteHook(params);
	}

	
	async afterDeleteHook(params: DeleteHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		this.logger.log('ComplianceQuestionDependencyChain deleted', { user: params.context.user, organization: params.context.user.organization, arguments: params.args });
		return super.afterDeleteHook(params);
	}

}
