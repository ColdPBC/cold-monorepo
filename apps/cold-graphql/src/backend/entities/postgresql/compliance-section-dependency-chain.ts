import { ComplianceSectionDependencyChainHooks } from '../hooks/compliance-section-dependency-chain.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ComplianceSection } from './compliance-section';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'compliance_section_dependency_chains' })
export class ComplianceSectionDependencyChain {
	sidecar: ComplianceSectionDependencyChainHooks;

	constructor() {
		this.sidecar = new ComplianceSectionDependencyChainHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'json' })
	dependencyChain!: Record<string, unknown>;

	@Property({ type: 'text' })
	complianceSectionId!: string;

	@Property({ type: 'text' })
	complianceSectionKey!: string;

	@Property({ type: 'text' })
	complianceSectionGroupId!: string;

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

	@OneToMany({ entity: () => ComplianceSection, mappedBy: 'complianceSectionDependencyChain' })
	complianceSections = new Collection<ComplianceSection>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ComplianceSectionDependencyChain, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionDependencyChainHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
