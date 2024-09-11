import { ComplianceDefinitionHooks } from './compliance-definition.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ComplianceQuestion } from './compliance-question';
import { ComplianceSection } from './compliance-section';
import { ComplianceSectionGroup } from './compliance-section-group';
import { OrganizationCompliance } from './organization-compliance';
import { OrganizationCompliancesOld } from './organization-compliances-old';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { read_only_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

@ApplyAccessControlList(read_only_acl)
@Entity({ tableName: 'compliance_definitions' })
export class ComplianceDefinition {
	sidecar: ComplianceDefinitionHooks;

	constructor() {
		this.sidecar = new ComplianceDefinitionHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@Unique({ name: 'compliance_definitions_name_key' })
	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text' })
	logoUrl!: string;

	@Property({ type: 'json' })
	surveys!: Record<string, unknown>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'text' })
	title!: string;

	@Property({ type: 'text', nullable: true })
	imageUrl?: string;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'integer', nullable: true })
	order?: number;

	@Property({ type: 'integer', nullable: true })
	version?: number;

	@Property({ type: 'boolean', default: false })
	visible = false;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@OneToMany({ entity: () => ComplianceQuestion, mappedBy: 'complianceDefinition' })
	complianceQuestions = new Collection<ComplianceQuestion>(this);

	@OneToMany({ entity: () => ComplianceSectionGroup, mappedBy: 'complianceDefinition' })
	complianceSectionGroups = new Collection<ComplianceSectionGroup>(this);

	@OneToMany({ entity: () => ComplianceSection, mappedBy: 'complianceDefinition' })
	complianceSections = new Collection<ComplianceSection>(this);

	@OneToMany({ entity: () => OrganizationCompliance, mappedBy: 'complianceDefinition' })
	organizationCompliances = new Collection<OrganizationCompliance>(this);

	@OneToMany({ entity: () => OrganizationCompliancesOld, mappedBy: 'complianceDefinition' })
	organizationCompliancesOlds = new Collection<OrganizationCompliancesOld>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof ComplianceDefinition, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof ComplianceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof ComplianceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof ComplianceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof ComplianceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof ComplianceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof ComplianceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof ComplianceDefinition, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new ComplianceDefinitionHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
