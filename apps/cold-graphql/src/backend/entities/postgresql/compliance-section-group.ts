import { ComplianceSectionGroupHooks } from './compliance-section-group.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { ComplianceSection } from './compliance-section';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'compliance_section_groups' })
export class ComplianceSectionGroup {
	sidecar: ComplianceSectionGroupHooks;

	constructor() {
		this.sidecar = new ComplianceSectionGroupHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Property({ type: 'integer' })
	order!: number;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'text' })
	complianceDefinitionName!: string;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, nullable: true, index: 'compliance_section_groups_compliance_definition_id_idx' })
	complianceDefinition?: Ref<ComplianceDefinition>;

	@OneToMany({ entity: () => ComplianceSection, mappedBy: 'complianceSectionGroup' })
	complianceSections = new Collection<ComplianceSection>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ComplianceSectionGroup, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ComplianceSectionGroup, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ComplianceSectionGroup, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ComplianceSectionGroup, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ComplianceSectionGroup, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceSectionGroupHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
