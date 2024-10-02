import { OrganizationCompliancesOldHooks } from '../hooks/organization-compliances-old.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { ComplianceDefinition } from './compliance-definition';
import { Organization } from './organization';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_compliances_old' })
export class OrganizationCompliancesOld {
	sidecar: OrganizationCompliancesOldHooks;

	constructor() {
		this.sidecar = new OrganizationCompliancesOldHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true })
	organization!: Ref<Organization>;

	@ManyToOne({ entity: () => ComplianceDefinition, ref: true, fieldName: 'compliance_id', index: 'organization_compliances_old_compliance_id_idx' })
	complianceDefinition!: Ref<ComplianceDefinition>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ type: 'json', nullable: true })
	surveysOverride?: Record<string, unknown>;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationCompliancesOld, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationCompliancesOldHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
