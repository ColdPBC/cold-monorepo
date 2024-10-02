import { OrganizationFacilityHooks } from '../hooks/organization-facility.hooks';
import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { AttributeAssurance } from './attribute-assurance';
import { Emission } from './emission';
import { Integration } from './integration';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { UtilityBill } from './utility-bill';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl, OrgContext } from '../../libs/acls/acl_policies';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_facilities' })
export class OrganizationFacility {
	sidecar: OrganizationFacilityHooks;

	constructor() {
		this.sidecar = new OrganizationFacilityHooks();
	}

	@PrimaryKey({ type: 'text' })
	id!: string;

	@ManyToOne({ entity: () => Organization, ref: true, index: 'organization_facilities_organization_id_idx' })
	organization!: Ref<Organization>;

	@Property({ type: 'text' })
	name!: string;

	@Property({ type: 'text', nullable: true })
	city?: string;

	@Property({ type: 'text', nullable: true })
	country?: string;

	@Property({ type: 'datetime', length: 3 })
	createdAt!: Date;

	@Property({ type: 'datetime', length: 3 })
	updatedAt!: Date;

	@Property({ fieldName: 'address_line_2', type: 'text', nullable: true })
	addressLine2?: string;

	@Property({ type: 'text', nullable: true })
	postalCode?: string;

	@Property({ type: 'boolean', default: false })
	deleted = false;

	@Property({ type: 'json', nullable: true })
	metadata?: Record<string, unknown>;

	@Property({ type: 'text', nullable: true })
	stateProvince?: string;

	@Property({ fieldName: 'address_line_1', type: 'text', nullable: true })
	addressLine1?: string;

	@Property({ type: 'boolean', nullable: true, default: false })
	supplier = false;

	@Property({ type: 'integer', nullable: true })
	supplierTier?: number;

	@OneToMany({ entity: () => AttributeAssurance, mappedBy: 'organizationFacility' })
	attributeAssurances = new Collection<AttributeAssurance>(this);

	@OneToMany({ entity: () => Emission, mappedBy: 'organizationFacility' })
	emissions = new Collection<Emission>(this);

	@OneToMany({ entity: () => Integration, mappedBy: 'organizationFacility' })
	integrations = new Collection<Integration>(this);

	@OneToMany({ entity: () => MaterialSupplier, mappedBy: 'organizationFacility' })
	materialSuppliers = new Collection<MaterialSupplier>(this);

	@OneToMany({ entity: () => UtilityBill, mappedBy: 'organizationFacility' })
	utilityBills = new Collection<UtilityBill>(this);

	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
		if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
    return await this.sidecar.beforeCreateHook(params);
	}

	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
    return await this.sidecar.afterCreateHook(params);
	}

	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<typeof OrganizationFacility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
	  return await this.sidecar.beforeReadHook(params);
	}
	
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<typeof OrganizationFacility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
	  return await this.sidecar.afterReadHook(params);
	}
	
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
	  return await this.sidecar.beforeUpdateHook(params);
	}
	
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<typeof OrganizationFacility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
	  return await this.sidecar.afterUpdateHook(params);
	}
	
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<typeof OrganizationFacility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
	  return await this.sidecar.beforeDeleteHook(params);
	}
	
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<typeof OrganizationFacility, OrgContext>) {
	  if(!this.sidecar) {
	    this.sidecar = new OrganizationFacilityHooks();
	  }
	  return await this.sidecar.afterDeleteHook(params);
	}
}
