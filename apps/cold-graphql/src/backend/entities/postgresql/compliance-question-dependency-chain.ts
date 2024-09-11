import { ComplianceQuestionDependencyChainHooks } from './compliance-question-dependency-chain.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, Index, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'compliance_question_dependency_chains' })
export class ComplianceQuestionDependencyChain {
	sidecar: ComplianceQuestionDependencyChainHooks;

	constructor() {
		this.sidecar = new ComplianceQuestionDependencyChainHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'json' })
	dependencyChain!: Record<string, unknown>;

	@Index({ name: 'compliance_question_dependency_chains_compliance_question_i_idx' })
	@Unique({ name: 'compliance_question_dependency_chains_compliance_question_i_key' })
	@Property({ type: 'text' })
	complianceQuestionId!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_question_k_idx' })
	@Property({ type: 'text' })
	complianceQuestionKey!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_section_id_idx' })
	@Property({ type: 'text' })
	complianceSectionId!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_section_ke_idx' })
	@Property({ type: 'text' })
	complianceSectionKey!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_section_gr_idx' })
	@Property({ type: 'text' })
	complianceSectionGroupId!: string;

	@Index({ name: 'compliance_question_dependency_chains_compliance_definition_idx' })
	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'text' })
	dependencyExpression!: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@OneToMany({ entity: () => ComplianceQuestion, mappedBy: 'complianceQuestionDependencyChain' })
	complianceQuestions = new Collection<ComplianceQuestion>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ComplianceQuestionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceQuestionDependencyChainHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
