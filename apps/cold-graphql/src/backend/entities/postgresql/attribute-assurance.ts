import { AttributeAssuranceHooks } from './attribute-assurance.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Entity, Index, ManyToOne, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Organization } from './organization';
import { OrganizationFile } from './organization-file';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'attribute_assurances' })
export class AttributeAssurance {
	sidecar: AttributeAssuranceHooks;

	constructor() {
		this.sidecar = new AttributeAssuranceHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'attribute_assurances_organization_id_idx1' })
	organization!: Ref<Organization>;

	@Property({ type: 'datetime', length: 3 })
	effectiveStartDate!: Date;

	@Property({ type: 'datetime', length: 3 })
	effectiveEndDate!: Date;

	@ManyToOne({ entity: () => OrganizationFile, ref: true, nullable: true, index: 'attribute_assurances_organization_file_id_idx1' })
	organizationFile?: Ref<OrganizationFile>;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Index({ name: 'attribute_assurancess_material_id_idx1' })
	@Property({ type: 'text', nullable: true })
	materialId?: string;

	@Index({ name: 'attribute_assurances_organization_facility_id_idx' })
	@Property({ type: 'text', nullable: true })
	organizationFacilityId?: string;

	@Index({ name: 'attribute_assurances_product_id_idx1' })
	@Property({ type: 'text', nullable: true })
	productId?: string;

	@Index({ name: 'attribute_assurances_attribute_id_idx1' })
	@Property({ type: 'text' })
	sustainabilityAttributeId!: string;

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof AttributeAssurance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof AttributeAssurance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof AttributeAssurance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof AttributeAssurance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof AttributeAssurance, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new AttributeAssuranceHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
