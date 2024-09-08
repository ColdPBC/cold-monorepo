import { Hook, HookRegister, CreateOrUpdateHookParams, ReadHookParams, DeleteHookParams } from '@exogee/graphweaver';
import * as hooks from './organization-facility-hooks';

import { ApplyAccessControlList } from '@exogee/graphweaver-auth';
import { default_acl } from '../../acl_policies';
import { OrgContext } from '../../acl_policies';

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref } from '@mikro-orm/core';
import { Emission } from './emission';
import { Integration } from './integration';
import { MaterialSupplier } from './material-supplier';
import { Organization } from './organization';
import { OrganizationAttribute } from './organization-attribute';
import { UtilityBill } from './utility-bill';

@ApplyAccessControlList(default_acl)
@Entity({ tableName: 'organization_facilities' })
export class OrganizationFacility {
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

	@OneToMany({ entity: () => Emission, mappedBy: 'organizationFacility' })
	emissions = new Collection<Emission>(this);

	@OneToMany({ entity: () => Integration, mappedBy: 'organizationFacility' })
	integrations = new Collection<Integration>(this);

	@OneToMany({ entity: () => MaterialSupplier, mappedBy: 'organizationFacility' })
	materialSuppliers = new Collection<MaterialSupplier>(this);

	@OneToMany({ entity: () => OrganizationAttribute, mappedBy: 'organizationFacility' })
	organizationAttributes = new Collection<OrganizationAttribute>(this);

	@OneToMany({ entity: () => UtilityBill, mappedBy: 'organizationFacility' })
	utilityBills = new Collection<UtilityBill>(this);
	/**
 	** START GENERATED HOOKS SECTION
 	**/
	@Hook(HookRegister.BEFORE_CREATE)
	async beforeCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeCreateHook(params);
	}
	@Hook(HookRegister.AFTER_CREATE)
	async afterCreate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterCreateHook(params);
	}
	@Hook(HookRegister.BEFORE_READ)
	async beforeRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.beforeReadHook(params);
	}
	@Hook(HookRegister.AFTER_READ)
	async afterRead(params: ReadHookParams<unknown, OrgContext>) {
		return hooks.afterReadHook(params);
	}
	@Hook(HookRegister.BEFORE_UPDATE)
	async beforeUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.beforeUpdateHook(params);
	}
	@Hook(HookRegister.AFTER_UPDATE)
	async afterUpdate(params: CreateOrUpdateHookParams<unknown, OrgContext>) {
		return hooks.afterUpdateHook(params);
	}
	@Hook(HookRegister.BEFORE_DELETE)
	async beforeDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.beforeDeleteHook(params);
	}
	@Hook(HookRegister.AFTER_DELETE)
	async afterDelete(params: DeleteHookParams<unknown, OrgContext>) {
		return hooks.afterDeleteHook(params);
	}
	/**
 	** END GENERATED HOOKS SECTION
 	**/
}
